# Azure Durable Function examples

This repo contains 2 example use cases of Azure Durable Functions, and their unit tests.

## Scenario 1: Monitor use case

This scenario involves an orchestrator that polls another activity until the returned status is `DONE`. The HTTP API will wait until the orchestration is finished, transforming an async operation into a sync one.

## Scenario 2: Parallel execution use case

This scenario has an orchestrator that starts multiple activities in parallel. It waits for all activities to complete and aggregates the result. 

## Running the tests

You can run the tests by executing the `npm test` command.

## Running Azure durable function on local

- Install the modules by `npm install`.
- Install Azure's CLI by running the following command `npm i azure-functions-core-tools`
- Install the Azurite emulator following these [instructions](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite?tabs=visual-studio). The Visual Studio Code approach is recommended.
- In Visual Studio Code, add the `Azurite` extension.
- Start the Azurite emulator by using the `Azurite: Start` command from `Command Palette` and make sure `http:127.0.0.1:10000` is open.
- Run: `npm start` to start all functions.


https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite?tabs=visual-studio-code%2Cblob-storage

https://github.com/anavarromartin/azure-durable-functions-examples

https://learn.microsoft.com/en-us/azure/azure-functions/durable/quickstart-ts-vscode?pivots=nodejs-model-v4
https://levelup.gitconnected.com/azure-durable-functions-ec535551751b
https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-node-model-upgrade?tabs=nodejs-v4&pivots=programming-language-javascript
https://vinayak-kedari-14357.medium.com/azure-durable-functions-for-long-running-apis-in-javascript-d214454123b5
https://github.com/Azure/azure-functions-nodejs-library not durable
https://turbo360.com/guide/azure-functions
https://github.com/Azure/azure-functions-durable-js/tree/v3.x not durable
https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-phone-verification?tabs=javascript-v4
https://learn.microsoft.com/en-us/azure/developer/javascript/how-to/develop-serverless-apps?tabs=v4-ts
https://learn.microsoft.com/en-us/azure/azure-functions/functions-core-tools-reference?tabs=v2


https://github.com/william-liebenberg/azure-durable-functions-ts
https://github.com/anavarromartin/azure-durable-functions-examples/tree/main
https://blogs.vmware.com/tanzu/azure-durable-functions-and-unit-testing-in-typescript/

