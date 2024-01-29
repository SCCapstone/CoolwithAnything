beforeAll(async () => {
    await detox.init();
  }, 300000);  // Timeout for the beforeAll block
  
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  
  afterAll(async () => {
    await detox.cleanup();
  });
  