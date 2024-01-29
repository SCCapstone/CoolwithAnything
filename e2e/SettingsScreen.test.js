describe('SelectProfile screen', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    beforeEach(async () => {
      await device.reloadReactNative();
    });
  
    it('Back button should be visible', async () => {
      await expect(element(by.id('back-button'))).toBeVisible();
    });
  
    it('Edit button should open modal', async () => {
      await element(by.id('edit-button')).tap();
      await expect(element(by.text('Edit Profile Information'))).toBeVisible();
    });
  
    it('Save button should save changes', async () => {
      // Open modal
      await element(by.id('edit-button')).tap();

      // Test values
      const newAddress = 'Green St.\nColumbia, SC\n29201';
      const newMobile = '(123) 456-7890';
      const newEmail = 'admin@email.com';

      // Enter new address, mobile, and email
      await element(by.type('TextInput')).atIndex(0).typeText(newAddress);
      await element(by.type('TextInput')).atIndex(1).typeText(newMobile);
      await element(by.type('TextInput')).atIndex(2).typeText(newEmail);
      // Save changes
      await element(by.id('save-button')).tap();

      // Verify changes
      await expect(element(by.text(newAddress))).toBeVisible();
      await expect(element(by.text(newMobile))).toBeVisible();
      await expect(element(by.text(newEmail))).toBeVisible();
    });
  });
  