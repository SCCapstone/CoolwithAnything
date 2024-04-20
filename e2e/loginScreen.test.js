describe('Login Screen Tests', () => {
    beforeEach(async () => {
        await device.launchApp({newInstance: true});
    });

    it('should fill email and password inputs and click the register button', async () => {
        await waitFor(element(by.id('register-button')))
            .toBeVisible()
            .withTimeout(5000);
        console.log('Login username input should now be visible');
        await element(by.id('login-username-input')).typeText('dp8@email.sc.edu');

        await element(by.id('login-password-input')).typeText('CWA843');

        //await device.disableSynchronization();
        console.log('Tapping login button now...');
        await element(by.id('login-submit-button')).tap();
        console.log('Button tapped, proceeding without waiting for network...');

        await waitFor(element(by.text('Login Successful'))).toBeVisible().withTimeout(15000);

        //await device.enableSynchronization();

        await element(by.text("OK")).tap();
    });
});
