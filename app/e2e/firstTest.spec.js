describe('login', () => {
  beforeEach(async () => {
  
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });

 it('try login OK', async () => {
    await element(by.id('userInput')).typeText('jlong');
    await element(by.id('passwordInput')).typeText('spring');
    await element(by.id('ButtonSubmit')).tap();  
    await expect(element(by.id('homeTab'))).toBeVisible();
  });

  it('try login KO', async () => {
    await element(by.id('userInput')).typeText('iujfiujer');
    await element(by.id('passwordInput')).typeText('okfoike');
    await element(by.id('ButtonSubmit')).tap();  
    await expect(element(by.text('Can\'t authenticate'))).toBeVisible();
  });




})
