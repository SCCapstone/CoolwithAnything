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

  it('should go to cookbook and click meat', async () => {
      await loginUser();
      console.log("Logged in");
      await waitFor(element(by.id('home-screen')))
        .toBeVisible()
        .withTimeout(10000)
        .catch(e => {
            console.error("Failed to find home screen within timeout: ", e);
      });

      await tapVisibleButton('cookbook-test');
      await tapVisibleButton('browse-cookbook-test');
      await tapVisibleButton('browse-cookbook-meat-test');
  });
});