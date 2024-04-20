describe("Login Screen", () => {
    beforeEach(async () => {
        await device.launchApp();
    });

    it("Expect to see login button", async () => {
        await waitFor(element(by.id('login-submit-button'))).toBeVisible().withTimeout(5000);
    });

    it("Should login", async () =>  {
      await waitFor(element(by.id('login-submit-button'))).toBeVisible().withTimeout(5000);
      await element(by.id('login-username-input')).typeText('dp8@email.sc.edu');
      await element(by.id('login-password-input')).typeText('CWA843');
      await element(by.id('login-submit-button')).tap();
      await waitFor(element(by.id('settings-button'))).toBeVisible().withTimeout(5000);
    });
});
