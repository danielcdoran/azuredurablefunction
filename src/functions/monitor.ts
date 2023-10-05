import {
  ActivityHandler,
  OrchestrationContext,
  OrchestrationHandler,
} from "durable-functions";
import { DateTime } from "luxon";

export const statusCheckActivityName = "statusCheck";

export const monitorOrchestrator: OrchestrationHandler = function* (
  context: OrchestrationContext
) {
  let polledTimes = 0;

  while (true) {
    // 1
    polledTimes++;
    const status = yield context.df.callActivity(statusCheckActivityName); // 2

    if (status === "DONE") {
      break; // 3
    }

    const deadline = DateTime.fromJSDate(context.df.currentUtcDateTime, {
      zone: "utc",
    }).plus({ seconds: 5 });
    yield context.df.createTimer(deadline.toJSDate()); // 4
  }

  return `Activity Completed, polled ${polledTimes} times`;
};

export const statusCheck: ActivityHandler = (): "DONE" | "PENDING" => {
  return Math.random() < 0.5 ? "DONE" : "PENDING";
};
