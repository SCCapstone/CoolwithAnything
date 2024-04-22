const TIMEOUT = 10000;
import loginUser from "./loginUser";

async function tapVisibleButton(buttonId) {
    await waitFor(element(by.id(buttonId))).toBeVisible().withTimeout(TIMEOUT);
    await element(by.id(buttonId)).tap();
}

async function tapVisibleText(buttonId, text) {
    await waitFor(element(by.id(buttonId))).toBeVisible().withTimeout(TIMEOUT);
    await element(by.id(buttonId)).tap();
    await element(by.id(buttonId)).typeText(text);
}

describe('Search workouts test', () => {
  beforeEach(async () => {
      await device.launchApp({newInstance: true});
  });

  afterEach(async () => {
    //await detox.cleanup();
    await device.terminateApp();
  });

  it('should search biceps in workouts', async () => {
      await loginUser();
      console.log("Logged in");
      await waitFor(element(by.id('home-screen')))
        .toBeVisible()
        .withTimeout(10000)
        .catch(e => {
            console.error("Failed to find home screen within timeout: ", e);
      });

      await tapVisibleButton('workout-test');
      console.log("Workout search bar displayed");
      await tapVisibleText('search-workout', 'Biceps');
      await tapVisibleButton('search-workout-button');
  });
});