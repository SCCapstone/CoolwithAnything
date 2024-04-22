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

  it('should go to workouts and click biceps', async () => {
      await loginUser();
      console.log("Logged in");
      await waitFor(element(by.id('home-screen')))
        .toBeVisible()
        .withTimeout(10000)
        .catch(e => {
            console.error("Failed to find home screen within timeout: ", e);
      });

      await tapVisibleButton('workouts-test');
      await tapVisibleButton('browse-workouts-test');
      await tapVisibleButton('browse-workouts-biceps-test');
  });
});