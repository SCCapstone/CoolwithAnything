const TIMEOUT = 10000;
import loginUser from "./loginUser";

async function tapVisibleButton(buttonId) {
    await waitFor(element(by.id(buttonId))).toBeVisible().withTimeout(TIMEOUT);
    await element(by.id(buttonId)).tap();
}

async function tapVisibleText(buttonId, text) {
    await waitFor(element(by.id(buttonId))).toBeVisible().withTimeout(TIMEOUT);
    await element(by.id(buttonId)).typeText(text);
}

describe('Add meal test', () => {
  beforeEach(async () => {
      await device.launchApp({newInstance: true});
  });

  it('should add meal', async () => {
      await loginUser();
      console.log("Logged in");
      await waitFor(element(by.id('home-screen')))
        .toBeVisible()
        .withTimeout(10000)
        .catch(e => {
            console.error("Failed to find home screen within timeout: ", e);
      });

      await tapVisibleButton('add-test');
      console.log('add button tapped');
      await element(by.text('Create Meal')).tap();
      console.log('add meal pressed');
      await waitFor(element(by.id('add-meal-test'))).toBeVisible().withTimeout(TIMEOUT);
      console.log('Add meal screen open');
      await element(by.id('meal-name')).tap();
      await element(by.id('meal-name')).typeText('Tacos');
      await element(by.id('meal-ingredients')).typeText('Tortilla, Beef, Cheese');
      await tapVisibleText('meal-servings', '4');
      await tapVisibleText('meal-instructions', 'Assemble and eat');
      await device.pressBack();
      await tapVisibleButton('submit-meal');
      await element(by.text("CREATE")).tap();
  });
});