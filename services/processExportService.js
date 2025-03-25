const { importDataFromSheets } = require('./importService');
const { transformAndExportDataToExcel } = require('./brokerService');


// TODO ESTO ES UN PLACEHOLDER, PARA CUANDO COMENCEMOS A TRABAJAR, TENERLO DE GUÍA Y DE REFERENCIA...

async function processAndExport() {
  try {
    // Importar datos desde Google Sheets
    const data = await importDataFromSheets();

    if (data && data.length > 0) {
      // Transformar y exportar a Excel
      transformAndExportDataToExcel(data);
    } else {
      console.log('No se encontraron datos para procesar.');
    }
  } catch (error) {
    console.error('Error en el proceso de importación y exportación:', error);
  }
}

// Ejecutar el proceso
processAndExport();
