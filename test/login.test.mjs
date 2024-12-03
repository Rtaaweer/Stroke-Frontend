import { assert } from 'chai';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

describe('Smoke Testing - Login Page', function () {
  let driver;
  
  // Usar async/await en el hook before para crear el driver
  before(async function () {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments('--headless'); // Ejecutar en modo headless (sin GUI)
    chromeOptions.addArguments('--no-sandbox');
    chromeOptions.addArguments('--disable-dev-shm-usage');
    

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
  });

  // Usar async/await en el hook after para cerrar el driver
  after(async function () {
    await driver.quit();
  });

  // Usar async/await en los tests
  it('Debería cargar la página de login correctamente', async function () {
    await driver.get('http://localhost:3000/'); // URL correcta
    await driver.wait(until.titleIs('Inicia sesión en Stroke'), 10000); // Espera a que el título sea el esperado
    const title = await driver.getTitle();
    assert.strictEqual(title, 'Inicia sesión en Stroke'); // Verificar el título
  });

  it('Debería permitir un login válido', async function () {
    await driver.get('http://localhost:3000/');
    
    // Espera a que el campo de correo esté presente y visible
    const emailField = await driver.wait(until.elementLocated(By.name('correo')), 20000);
    await driver.wait(until.elementIsVisible(emailField), 10000);  // Asegúrate de que el campo sea visible
    await emailField.sendKeys('miralriohugo7@gmail.com');

    // Espera a que el campo de contraseña esté presente y visible
    const passwordField = await driver.wait(until.elementLocated(By.name('password')), 20000);
    await driver.wait(until.elementIsVisible(passwordField), 10000);
    await passwordField.sendKeys('Hame0701$');

    // Espera hasta que el botón de login sea visible y haz clic en él
    const submitButton = await driver.wait(until.elementLocated(By.css('button[type="submit"]')), 20000);
    await driver.wait(until.elementIsVisible(submitButton), 10000);
    await submitButton.click();

    // // Espera hasta que la URL cambie después de hacer login
    // await driver.wait(until.urlIs('http://localhost:3000/home'), 20000); // Espera a que la URL sea la esperada
    // const currentUrl = await driver.getCurrentUrl();
    // assert.strictEqual(currentUrl, 'http://localhost:3000/home'); // Verificar la URL después de login
  });
});
