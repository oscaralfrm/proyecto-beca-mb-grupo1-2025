const xlsx = require('xlsx');

// TODO ESTO ES UN PLACEHOLDER, PARA CUANDO COMENCEMOS A TRABAJAR, TENERLO DE GUÍA Y DE REFERENCIA...

// Función para transformar los datos y exportarlos en formato Excel
function transformAndExportDataToExcel(data) {
  try {
    // Transforma los datos del formato de Google Sheets (matriz de arreglos) a formato de filas y columnas deseado.
    const transformedData = data.map(row => {
      return {
        Nombre: row[0],  // Asumiendo que la primera columna es "Nombre"
        Integrante1: row[1],  // Asumiendo que la segunda columna es "Integrante1"
        Integrante2: row[2],  // Asumiendo que la tercera columna es "Integrante2"
        // ... Agregar más columnas según sea necesario
      };
    });

    // Crear un libro de trabajo (workbook) con la información transformada
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(transformedData);
    xlsx.utils.book_append_sheet(wb, ws, 'Equipos');

    // Exportar el archivo Excel
    const filePath = './output.xlsx';
    xlsx.writeFile(wb, filePath);

    console.log('El archivo Excel ha sido creado en:', filePath);
  } catch (error) {
    console.error('Error al transformar y exportar los datos:', error);
  }
}

module.exports = { transformAndExportDataToExcel };
