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

describe('Add workout test', () => {
  beforeEach(async () => {
      await device.launchApp({newInstance: true});
  });

  afterEach(async () => {
    //await detox.cleanup();
    await device.terminateApp();
  });

  it('should add workout', async () => {
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
      await element(by.text('Create Workout')).tap();
      console.log('add workout pressed');
      await waitFor(element(by.id('add-workout-test'))).toBeVisible().withTimeout(TIMEOUT);
      console.log('Add workout screen open');
      await element(by.id('workout-name')).tap();
      await element(by.id('workout-name')).typeText('Bicep Curls');
      await element(by.id('workout-type')).typeText('Biceps');
      await tapVisibleText('workout-muscle', 'Biceps');
      await tapVisibleText('workout-equipment', 'Dumbbells');
      await device.pressBack();
      await tapVisibleText('workout-difficulty', 'Easy');
      await device.pressBack();
      await tapVisibleText('workout-instructions', 'Grab dumbbells and curl up');
      await device.pressBack();
      await tapVisibleButton('submit-workout');
      await element(by.text("CREATE")).tap();
  });
});