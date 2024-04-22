const TIMEOUT = 10000;
import loginUser from "./loginUser";

async function tapVisibleButton(buttonId) {
    await waitFor(element(by.id(buttonId))).toBeVisible().withTimeout(TIMEOUT);
    await element(by.id(buttonId)).tap();
}

describe('Add payment test', () => {
  beforeEach(async () => {
      await device.launchApp({newInstance: true});
  });

  afterEach(async () => {
    //await detox.cleanup();
    await device.terminateApp();
  });

  it('should go to add payment screen, add payment, and save', async () => {
      await loginUser();
      console.log("Logged in");
      await waitFor(element(by.id('home-screen')))
        .toBeVisible()
        .withTimeout(10000)
        .catch(e => {
            console.error("Failed to find settings-button within timeout: ", e);
      });
      await tapVisibleButton('settings-button');
      await tapVisibleButton('tab-account');
      await tapVisibleButton('to-payment-methods');
      await tapVisibleButton('add-payment-button');
      await waitFor(element(by.id('input-nickname'))).toBeVisible().withTimeout(TIMEOUT);

      await element(by.id('input-nickname')).typeText('My Debit Card');
      await element(by.id('safe-area')).tap();
      await element(by.id('input-credit-card')).typeText('1234567890123456');
      await element(by.id('safe-area')).tap();
      await element(by.id('input-cvc')).typeText('123');
      await element(by.id('safe-area')).tap();
      await element(by.id('input-exp-month')).typeText('12');
      await element(by.id('safe-area')).tap();
      await element(by.id('input-exp-year')).typeText('2025');
      await element(by.id('safe-area')).tap();
      await element(by.id('input-name')).typeText('John Doe');
      await element(by.id('safe-area')).tap();
      await element(by.id('input-zip')).typeText('12345');
      await element(by.id('safe-area')).tap();

      await tapVisibleButton('button-save-payment-method');
      await element(by.text('OK')).tap();
  });
});