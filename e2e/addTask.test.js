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

describe('Add meal task', () => {
  beforeEach(async () => {
      await device.launchApp({newInstance: true});
  });

  afterEach(async () => {
    //await detox.cleanup();
    await device.terminateApp();
  });

  it('should add task', async () => {
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
      await element(by.text('Create Task')).tap();
      console.log('add task pressed');
      await waitFor(element(by.id('add-task-test'))).toBeVisible().withTimeout(TIMEOUT);
      console.log('Add task screen open');
      await tapVisibleText('task-name', 'Homework');
      await tapVisibleText('task-location', 'Library');
      await device.pressBack();
      await tapVisibleButton('task-type-School');
      await tapVisibleText('task-notes', 'Do math and computer science homework');
      await device.pressBack();
      await tapVisibleButton('submit-task');
  });
});