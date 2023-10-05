import {
  app,
  HttpHandler,
  HttpRequest,
  InvocationContext,
  HttpResponse,
} from "@azure/functions";
import * as df from "durable-functions";

const monitorHttpStart: HttpHandler = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponse> => {
  const client = df.getClient(context);
  const orchestratorName = request.params.orchestratorName;
  const instanceId: string = await client.startNew(orchestratorName);

  context.log(`Started orchestration with ID = '${instanceId}'.`);

  return await client.waitForCompletionOrCreateCheckStatusResponse(
    request,
    instanceId,
    {
      timeoutInMilliseconds: 30000,
    }
  );
};

app.http("monitorHttpStart", {
  route: "orchestrators/{orchestratorName}",
  extraInputs: [df.input.durableClient()],
  handler: monitorHttpStart,
});
