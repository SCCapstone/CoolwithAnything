const detox = require('detox');
const config = require('../package.json').detox;

beforeAll(async () => {
  await detox.init(config);
}, 300000); // Timeout for the beforeAll block

beforeEach(async () => {
  await device.reloadReactNative();
});

afterAll(async () => {
  await detox.cleanup();
});
