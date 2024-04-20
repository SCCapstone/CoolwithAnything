describe('AddPaymentMethodsScreen', () => {
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
      await waitFor(element(by.id('add-payment-button'))).toBeVisible().withTimeout(5000);
      await element(by.id('add-payment-button')).tap();
    });
  
    beforeEach(async () => {
      await device.reloadApp(); //reloadReactNative
    });
  
    it('should display all input fields and the save button', async () => {
      await expect(element(by.id('input-nickname'))).toBeVisible();
      await expect(element(by.id('input-credit-card'))).toBeVisible();
      await expect(element(by.id('input-cvc'))).toBeVisible();
      await expect(element(by.id('input-exp-month'))).toBeVisible();
      await expect(element(by.id('input-exp-year'))).toBeVisible();
      await expect(element(by.id('input-name'))).toBeVisible();
      await expect(element(by.id('input-zip'))).toBeVisible();
      await expect(element(by.id('button-save-payment-method'))).toBeVisible();
    });
  
    it('should allow entering data into the credit card field and save the payment method', async () => {
      await element(by.id('input-nickname')).typeText('My Debit Card');
      await element(by.id('input-credit-card')).typeText('1234567890123456');
      await element(by.id('input-cvc')).typeText('123');
      await element(by.id('input-exp-month')).typeText('12');
      await element(by.id('input-exp-year')).typeText('2025');
      await element(by.id('input-name')).typeText('John Doe');
      await element(by.id('input-zip')).typeText('12345');
  
      await element(by.id('button-save-payment-method')).tap();
  
      // Check for success alert or navigation event
      await expect(element(by.text('Your payment method was saved successfully!'))).toBeVisible();
    });
  });
  