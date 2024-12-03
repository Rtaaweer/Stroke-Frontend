import { assert } from 'chai';
import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

let driver;
const imagePath = 'C:/Users/miral/OneDrive/Escritorio/Dev/Stroke/Stroke/stroke-front/test/test.jpg'; // Asegúrate de que esta ruta sea correcta

describe('Smoke Testing - Carga de Imagen', function () {
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

  it('Debería cargar la página de carga de imagen correctamente', async function () {
    await driver.get('http://localhost:3000/carga_img');
    await driver.wait(until.titleIs('Carga de Imagen'), 5000);
    const title = await driver.getTitle();
    assert.strictEqual(title, 'Carga de Imagen'); // Verificar que el título sea 'Carga de Imagen'
  });

  it('Debería permitir cargar una imagen', async function () {
    // Espera hasta que el elemento de entrada (file input) sea visible
    const fileInput = await driver.wait(until.elementLocated(By.id('file-input')), 10000);
    await fileInput.sendKeys('C:/Users/miral/OneDrive/Escritorio/Dev/Stroke/Stroke/stroke-front/test/test.jpg'); 
    // // Espera a que el botón sea visible y habilitado
    // const submitButton = await driver.wait(until.elementLocated(By.id('analizar')), 10000);
    // await submitButton.click();
  });
  
  

  
  
  
});
