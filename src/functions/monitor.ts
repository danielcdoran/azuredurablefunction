import {
  app,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  InvocationContext,
} from "@azure/functions";
import * as df from "durable-functions";
import {
  ActivityHandler,
  OrchestrationContext,
  OrchestrationHandler,
} from "durable-functions";
import { DateTime } from "luxon";

const statusCheckActivityName = "statusCheck";

export const monitorOrchestrator: OrchestrationHandler = function* (
  context: OrchestrationContext
) {
  let polledTimes = 0;

  while (true) {
    polledTimes++;
    const status = yield context.df.callActivity(statusCheckActivityName);

    if (status === "DONE") {
      break;
    }

    const deadline = DateTime.fromJSDate(context.df.currentUtcDateTime, {
      zone: "utc",
    }).plus({ seconds: 5 });
    yield context.df.createTimer(deadline.toJSDate());
  }

  return `Activity Completed, polled ${polledTimes} times`;
};

df.app.orchestration("monitorOrchestrator", monitorOrchestrator);

const statusCheck: ActivityHandler = (): "DONE" | "PENDING" => {
  return Math.random() < 0.5 ? "DONE" : "PENDING";
};

df.app.activity(statusCheckActivityName, { handler: statusCheck });

const monitorHttpStart: HttpHandler = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponse> => {
  const client = df.getClient(context);
  const instanceId: string = await client.startNew("monitorOrchestrator");

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
  route: "orchestrators/monitorOrchestrator",
  extraInputs: [df.input.durableClient()],
  handler: monitorHttpStart,
});
