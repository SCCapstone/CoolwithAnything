describe('Register Test', () => {
    beforeEach(async () => {
        await device.launchApp({newInstance: true});
    });

    afterEach(async () => {
        //await detox.cleanup();
        await device.terminateApp();
      });

    it('should click register button and show register screen', async () => {
        await waitFor(element(by.id('register-button')))
            .toBeVisible()
            .withTimeout(5000);
        await element(by.id('register-button')).tap();

        await expect(element(by.id('register-screen-id'))).toBeVisible();
    });
});
