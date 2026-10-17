/* Configuración de la PWA. Estos dos valores NO son secretos (los ve cualquier navegador):
 * la seguridad la da la verificación del token de Google en el backend contra tu email. */
window.MCF_CONFIG = {
  // URL de la implementación de Apps Script para la PWA (acceso "Cualquiera", protegida por token)
  API_URL: 'https://script.google.com/macros/s/AKfycbznkBD9OWVe5H93WSFkqs1RVFk5Xd7sH985Qp_B-RYs5Jnyf7s-VnCMykgtDh89PQXY/exec',
  // ID de cliente OAuth (tipo "Aplicación web") del proyecto de Google Cloud "Mi Centro Financiero"
  CLIENT_ID: '235621397677-8tohf209q8d430cu222e60264bab94r4.apps.googleusercontent.com'
};
