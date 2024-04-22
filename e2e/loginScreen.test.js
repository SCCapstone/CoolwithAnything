import loginUser from "./loginUser";

describe('Login Screen Tests', () => {
    beforeEach(async () => {
        await device.launchApp({newInstance: true});
    });

    it('should fill email and password inputs and log the user in', async () => {
        loginUser();
    });
});
