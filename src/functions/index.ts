import * as df from "durable-functions";
import {
  monitorOrchestrator,
  statusCheck,
  statusCheckActivityName,
} from "./monitor";
import { parallelOrchestrator, doubleInputActivityName, doubleInputActivity } from "./parallel";

df.app.orchestration("monitorOrchestrator", monitorOrchestrator);
df.app.activity(statusCheckActivityName, { handler: statusCheck });

df.app.orchestration("parallelOrchestrator", parallelOrchestrator);
df.app.activity(doubleInputActivityName, { handler: doubleInputActivity });
