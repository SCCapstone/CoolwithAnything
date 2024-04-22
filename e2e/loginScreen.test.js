import loginUser from "./loginUser";

describe('Login Screen Tests', () => {
    beforeEach(async () => {
        await device.launchApp({newInstance: true});
    });

    afterEach(async () => {
        //await detox.cleanup();
        await device.terminateApp();
      });

    it('should fill email and password inputs and log the user in', async () => {
        await loginUser();
    });
});
