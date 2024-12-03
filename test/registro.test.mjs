import { assert } from 'chai';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

let driver;
describe('Smoke Testing - Registro', function () {
  // Inicializar el driver antes de todas las pruebas
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

  // Cerrar el driver después de todas las pruebas
  after(async function () {
    if (driver) {
      await driver.quit(); // Cerrar el driver después de las pruebas
    }
  });
  this.timeout(15000)
  it('Debería cargar la página de registro correctamente', async function () {
    await driver.get('http://localhost:3000/registro');
    await driver.wait(until.titleIs('Crea tu cuenta en Stroke'), 5000);
    const title = await driver.getTitle();
    assert.strictEqual(title, 'Crea tu cuenta en Stroke'); // Verificar que el título sea 'Registro'
  });

  it('Debería permitir registrar un nuevo usuario', async function () {
    const emailField = await driver.findElement(By.name('correo'));
    const passwordField = await driver.findElement(By.name('password'));
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));

    await emailField.sendKeys('miralriohugo24@gmail.com');
    await passwordField.sendKeys('Hame070133$$');
    await submitButton.click();

    await driver.wait(until.urlIs('http://localhost:3000/home'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl, 'http://localhost:3000/home'); // Verificar que se redirige a la página de inicio
  });
});
