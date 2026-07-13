export const APP_NAME = "Portal de Transparencia Fiscal";
export const APP_SUBTITLE = "Público";

export const CONTACT_INFO = {
  phone: "777 329 2200",
  extension: "123",
  email: "utfiscal@morelos.gob.mx",
  address: "Palacio de Gobierno del Estado de Morelos, Plaza de Armas s/n, Colonia Centro, Cuernavaca, Morelos, México",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
  },
};

// Años disponibles para visualización de documentos (2025 hasta el año actual)
export const ANIOS_DISPONIBLES = (() => {
  const currentYear = new Date().getFullYear();
  const startYear = 2025;
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
})();