async function loginUser() {
    await waitFor(element(by.id('register-button')))
            .toBeVisible()
            .withTimeout(10000);
    console.log('Login username input should now be visible');
    await element(by.id('login-username-input')).typeText('dp8@email.sc.edu');

    await element(by.id('login-password-input')).typeText('CWA843');

    console.log('Tapping login button now...');
    await device.disableSynchronization();
    await waitFor(element(by.id('login-submit-button')))
        .toBeVisible()
        .withTimeout(10000);
    await element(by.id('login-submit-button')).tap();
    await waitFor(element(by.text('Login Successful' || 'Logged in successfully.'))).toBeVisible().withTimeout(5000);
    await waitFor(element(by.text("OK")))
    .toBeVisible()
    .withTimeout(10000);
    await element(by.text("OK")).tap(); 
}

export default loginUser;