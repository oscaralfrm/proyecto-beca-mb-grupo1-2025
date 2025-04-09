const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const fs = require('fs');

// TODO ESTO ES UN PLACEHOLDER, PARA CUANDO COMENCEMOS A TRABAJAR, TENERLO DE GUÍA Y DE REFERENCIA...


// Configuración de credenciales
const credentials = JSON.parse(fs.readFileSync('credentials.json'));
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const spreadsheetId = 'TU_SPREADSHEET_ID';  // Reemplaza con tu ID de hoja de cálculo
const range = 'Sheet1!A1:Z1000';  // Rango de celdas que quieres obtener (puedes ajustarlo)

// Autenticación con OAuth2
const oAuth2Client = new OAuth2Client(
  credentials.installed.client_id,
  credentials.installed.client_secret,
  credentials.installed.redirect_uris[0]
);

// Función para autenticar y obtener los datos de Google Sheets
async function importDataFromSheets() {
  try {
    // Genera un token de acceso (este paso es necesario solo la primera vez)
    const tokenPath = 'token.json';
    let token;
    if (fs.existsSync(tokenPath)) {
      token = JSON.parse(fs.readFileSync(tokenPath));
    } else {
      const { tokens } = await oAuth2Client.getToken('AUTORIZAR_URL_AQUI'); // Se debe autorizar una vez
      token = tokens;
      fs.writeFileSync(tokenPath, JSON.stringify(token));
    }

    // Autenticación con el token
    oAuth2Client.setCredentials(token);

    const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

    // Llamada a la API de Google Sheets
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return res.data.values;  // Devuelve los valores de las celdas
  } catch (error) {
    console.error('Error al importar los datos:', error);
  }
}

module.exports = { importDataFromSheets };
