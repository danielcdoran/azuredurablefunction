import {
  ActivityHandler,
  OrchestrationContext,
  OrchestrationHandler,
  Task,
} from "durable-functions";

export const doubleInputActivityName = "doubleInputActivity";

export const parallelOrchestrator: OrchestrationHandler = function* (
  context: OrchestrationContext
) {
  const tasks: Task[] = [];

  // 1. Start all parallel activities
  for (let i = 0; i < 5; i++) {
    tasks.push(context.df.callActivity(doubleInputActivityName, i));
  }

  // 2. Wait for all parallel activities to complete
  const results = yield context.df.Task.all(tasks);

  // 3. Process the results
  const total = results.reduce((val : number, acc : number) => (acc += val));

  return `The sum is ${total}`;
};

export const doubleInputActivity: ActivityHandler = (input: number): number => {
  return input * 2;
};
