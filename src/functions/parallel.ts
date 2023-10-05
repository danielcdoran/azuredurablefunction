import {
  ActivityHandler,
  OrchestrationContext,
  OrchestrationHandler,
} from "durable-functions";

export const doubleInputActivityName = "doubleInputActivity";

export const parallelOrchestrator: OrchestrationHandler = function* (
  context: OrchestrationContext
) {
  const tasks = [];

  // Start all parallel activities
  for (let i = 0; i < 5; i++) {
    tasks.push(context.df.callActivity(doubleInputActivityName, i));
  }

  // Wait for all parallel activities to complete
  const results = yield context.df.Task.all(tasks);

  // Process the results
  const total = results.reduce((val, acc) => (acc += val));

  return `The sum is ${total}`;
};

export const doubleInputActivity: ActivityHandler = (input: number): number => {
  return input * 2;
};
