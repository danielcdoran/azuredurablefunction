import { OrchestrationContext } from "durable-functions";
import { parallelOrchestrator } from "../src/functions/parallel";

describe("parallel orchestrator", () => {
  it("calculates sum of all parallel activities results", () => {
    const mockContext: OrchestrationContext = {
      df: {
        callActivity: jest.fn(),
        Task: {
          all: jest.fn(),
        },
      },
    } as unknown as OrchestrationContext;

    const generator = parallelOrchestrator(mockContext);
    
    // 1. Runs until the Task.all() yield
    generator.next();
    expect(mockContext.df.callActivity).toHaveBeenCalledTimes(5);

    // 2. Yields Task.all() with an array of results
    const result = generator.next([1, 2, 3, 4, 5]);
    expect(result.value).toEqual("The sum is 15");
    expect(result.done).toBe(true);
  });
});
