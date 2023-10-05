import {
  OrchestrationContext,
} from "durable-functions/types/orchestration";
import { monitorOrchestrator } from "./monitor";
import { Task } from "durable-functions/types/task";

describe("monitor orchestrator", () => {
  it("polls 2 times until status is DONE", () => {
    const mockContext: unknown = {
      df: {
        callActivity: jest.fn(),
        currentUtcDateTime: Date.now(),
        createTimer: jest.fn()
      },
    };

    // 1. creates the generator function
    const generator = monitorOrchestrator(mockContext as OrchestrationContext);

    let result: IteratorResult<Task, unknown>
    // 2. runs until the first yield
    result = generator.next() 
    expect(result.done).toBe(false)
    
    // 3. yields the status check value to be PENDING
    result = generator.next('PENDING')
    expect(result.done).toBe(false)
    
    // 4. yields the timer
    result = generator.next()
    expect(result.done).toBe(false)
    
    // 5. yields the status check value to be DONE
    result = generator.next('DONE')
    expect(result.done).toBe(true)


    expect(result.value).toEqual('Activity Completed, polled 2 times')
  });
});
