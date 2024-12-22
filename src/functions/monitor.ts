import {
  ActivityHandler,
  OrchestrationContext,
  OrchestrationHandler,
} from "durable-functions";
import { DateTime } from 'luxon';

export const statusCheckActivityName = "statusCheck";

export const monitorOrchestrator: OrchestrationHandler = function* (
  context: OrchestrationContext
) {
  let polledTimes = 0;

  // 1. Infinite loop until completion
  while (true) {
    // 2. Invoke activity function to check status
    const status = yield context.df.callActivity(statusCheckActivityName);

    polledTimes++;

    if (status === "DONE") {
      // 3. Break out of the loop once it's completed
      break;
    }

    const deadline = DateTime.fromJSDate(context.df.currentUtcDateTime, {
      zone: "utc",
    }).plus({ seconds: 5 });
    // 4. While not completed pause the execution for 5 seconds
    yield context.df.createTimer(deadline.toJSDate());
  }

  return `Activity Completed, polled ${polledTimes} times`;
};

export const statusCheck: ActivityHandler = (): "DONE" | "PENDING" => {
  return Math.random() < 0.5 ? "DONE" : "PENDING";
};
