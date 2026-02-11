// Datos globales de noticias para reutilización en toda la aplicación

export interface NewsItem {
  id: number
  title: string
  date: string
  excerpt: string
  image: string
  imageAlt: string
  url: string
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Garantiza Morelos finanzas sanas hacia el cierre de 2025",
    date: "Diciembre 2025",
    excerpt: "Funcionarios estatales presentan nuevas iniciativas para promover la cultura fiscal y educación financiera entre la ciudadanía morelense.",
    image: "/images/noticia3.jpg",
    imageAlt: "Garantiza Morelos finanzas sanas hacia el cierre de 2025",
    url: "https://www.morelos.gob.mx/ultimas-noticias/garantiza-morelos-finanzas-sanas-hacia-el-cierre-de-2025"
  },
  {
    id: 2,
    title: "Inaugura la titular del Poder Ejecutivo, Margarita González Saravia, el foro 'Finanzas públicas sostenibles y fomento de la inversión para gobiernos subnacionales: movilidad vehicular, catastro e inversiones'",
    date: "Noviembre 2025",
    excerpt: "La gobernadora Margarita González Saravia encabezó un foro nacional para fortalecer las finanzas públicas locales, impulsar la inversión y promover una gestión fiscal responsable y sostenible.",
    image: "/images/noticia1.jpeg",
    imageAlt: "Inaugura la titular del Poder Ejecutivo, Margarita González Saravia, el foro 'Finanzas públicas sostenibles y fomento de la inversión para gobiernos subnacionales: movilidad vehicular, catastro e inversiones'",
    url: "https://www.morelos.gob.mx/ultimas-noticias/impulsa-gobierno-de-morelos-la-tierra-que-nos-une-finanzas-publicas-sostenibles-para-atender-necesidades-de-la-poblacion"
  },
  {
    id: 3,
    title: "Impartirá Gobierno de Morelos la primera especialidad en administración pública",
    date: "Julio 2025",
    excerpt: "El Gobierno de Morelos anunció la apertura de la primera Especialidad en Administración Pública, un programa gratuito y con validez oficial dirigido al personal del Poder Ejecutivo.",
    image: "/images/noticia2.jpeg",
    imageAlt: "Impartirá Gobierno de Morelos la primera especialidad en administración pública",
    url: "https://www.morelos.gob.mx/ultimas-noticias/impartira-gobierno-de-morelos-la-primera-especialidad-en-administracion-publica"
  },
]