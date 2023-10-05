# Azure Durable Function examples

This repo contains 2 example use cases of Azure Durable Functions, and their unit tests.

## Scenario 1: Monitor use case

This scenario involves an orchestrator that polls another activity until the returned status is `DONE`. The HTTP API will wait until the orchestration is finished, transforming an async operation into a sync one.

## Scenario 2: Parallel execution use case

This scenario has an orchestrator that starts multiple activities in parallel. It waits for all activities to complete and aggregates the result. 

## Running the tests

You can run the tests by executing the `npm test` command.

## Running Azure durable function on local

- Install the Azurite emulator following these [instructions](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite?tabs=visual-studio). The Visual Studio Code approach is recommended.
- In Visual Studio Code, add the `Azurite` extension.
- Start the Azurite emulator by using the `Azurite: Start` command from `Command Palette` and make sure `http:127.0.0.1:10000` is open.
- Run: `npm start` to start all functions.