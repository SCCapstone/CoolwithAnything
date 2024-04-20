describe('PaymentMethodsScreen', () => {
    beforeAll(async () => {
      await device.launchApp();
      await element(by.id('login-username-input')).typeText('dp8@email.sc.edu');
      await element(by.id('login-password-input')).typeText('CWA843');
      await element(by.id('login-submit-button')).tap();
      await waitFor(element(by.id('settings-button'))).toBeVisible().withTimeout(5000);
      await element(by.id('settings-button')).tap();
      await waitFor(element(by.id('tab-account'))).toBeVisible().withTimeout(5000);
      await element(by.id('tab-account')).tap();
      await waitFor(element(by.id('to-payment-methods'))).toBeVisible().withTimeout(5000);
      await element(by.id('to-payment-methods')).tap();
    });
  
    beforeEach(async () => {
      await device.reloadApp();
    });
  
    it('should display the "Add payment method" button', async () => {
      await expect(element(by.id('add-payment-button'))).toBeVisible();
    });
  
    it('should navigate to AddPaymentMethods screen after tapping "Add a payment method" button', async () => {
      await element(by.id('add-payment-button')).tap();
      // Check for an element that is unique to the AddPaymentMethods screen
      await expect(element(by.text('Add Payment Method'))).toBeVisible();
    });
  });
  