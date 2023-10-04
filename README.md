
### Running Azure durable function on local

- Install Azurite emulator with [instruction](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite?tabs=visual-studio). Visual Studio Code approach is suggested
- In Visual Studio Code, add extension of `Azurite`
- Start Azurite emulator by using `Azurite: Start` from `Command Palette` and make sure `http:127.0.0.1:10000` is open
- Default `local.settings.json` is provided in the root directory w
- Run: `npm run start` to start all functions 