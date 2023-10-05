import {
  OrchestrationContext,
} from "durable-functions/types/orchestration";
import { monitorOrchestrator } from "./monitor";

describe("monitor orchestrator", () => {
  it("polls until status is DONE", () => {
    const mockContext: unknown = {
      df: {
        callActivity: jest.fn(),
        currentUtcDateTime: Date.now(),
        createTimer: jest.fn()
      },
    };

    const generator = monitorOrchestrator(mockContext as OrchestrationContext);

    // runs until the first yield
    generator.next() 
    // yields the status check value to be PENDING
    generator.next('PENDING')
    // yields the timer
    generator.next()
    // yields the status check value to be PENDING
    generator.next('PENDING')
    // yields the timer
    generator.next()
    // yields the status check value to be DONE
    const result = generator.next('DONE')


    expect(result.done).toBe(true)
    expect(result.value).toEqual('Activity Completed, polled 3 times')
  });
});
