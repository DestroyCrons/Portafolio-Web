/* ==========================================================================
   OFFLINE BILINGUAL TRANSLATOR ENGINE (100% Client-Side, No Internet Required)
   Motor de traducción autónomo y offline para portafolio de autor
   ========================================================================== */

const OfflineTranslator = (function() {
  // 1. Specific Multi-word Expressions & Idiomatic Phrases (Checked First)
  const PHRASE_PAIRS = [
    ["Portafolio", "Portfolio"],
    ["Diseño Gráfico, Diseño Editorial & Arte Sacro Contemporáneo · Selección de Proyectos & Perfil Profesional", "Graphic Design, Editorial Design & Contemporary Sacred Art · Selected Projects & Professional Profile"],
    ["Obras Seleccionadas & Proyectos", "Selected Works & Projects"],
    ["Obras Seleccionadas y Proyectos", "Selected Works & Projects"],
    ["Obras Seleccionadas", "Selected Works"],
    ["Proyectos Seleccionados", "Selected Projects"],
    ["Diez Obras Seleccionadas", "Ten Selected Works"],
    ["Diez Obras", "Ten Works"],
    ["Colección 2024–2026", "2024–2026 Collection"],
    ["Colección 2024-2026", "2024-2026 Collection"],
    ["Catálogo Completo · Archivo", "Complete Catalog · Archive"],
    ["Catálogo Completo", "Complete Catalog"],
    ["Esfera 3D", "3D Sphere"],
    ["Contacto Directo", "Direct Contact"],
    ["Ver Video Inicial", "Watch Intro Video"],
    ["Índice de 10 Obras", "10 Works Index"],
    ["10 Obras Seleccionadas", "10 Selected Works"],
    ["Manifiesto de Autor", "Author's Manifesto"],
    ["Filosofía Visual", "Visual Philosophy"],
    ["Archivo Visual", "Visual Archive"],
    ["Capacidades de Estudio", "Studio Capabilities"],
    ["Pilares Creativos", "Creative Pillars"],
    ["Iniciar Diálogo", "Start a Dialogue"],
    ["Iniciar Colaboración", "Start Collaboration"],
    ["Enviar Propuesta", "Submit Proposal"],
    ["Propuesta de Proyecto", "Project Proposal"],
    ["Disponible para proyectos", "Available for projects"],
    ["Atención remota internacional", "International remote service"],
    ["Presencial bajo agenda", "In-person by appointment"],
    ["Diseño Visual", "Visual Design"],
    ["Diseño Editorial & Tipografía", "Editorial Design & Typography"],
    ["Diseño Editorial", "Editorial Design"],
    ["Diseño Gráfico & Editorial", "Graphic & Editorial Design"],
    ["Diseño Gráfico", "Graphic Design"],
    ["Arte Gráfico & Portadas", "Graphic Art & Covers"],
    ["Arte Gráfico", "Graphic Art"],
    ["Concepto de Portada de Álbum", "Album Cover Concept"],
    ["Portada Conceptual", "Conceptual Cover"],
    ["Arte Sacro Contemporáneo", "Contemporary Sacred Art"],
    ["Arte Sacro", "Sacred Art"],
    ["Fotografía Conceptual & Retrato", "Conceptual Photography & Portraiture"],
    ["Fotografía Conceptual", "Conceptual Photography"],
    ["Fotografía Callejera · Retrato en Terreno", "Street Photography · Field Portrait"],
    ["Fotografía Callejera", "Street Photography"],
    ["Fotografía Urbana", "Urban Photography"],
    ["Retrato de Estudio · Sesión Editorial", "Studio Portrait · Editorial Session"],
    ["Retrato de Estudio", "Studio Portrait"],
    ["Sesión Editorial", "Editorial Session"],
    ["Identidad de Marca & Tipografía", "Brand Identity & Typography"],
    ["Identidad de Marca", "Brand Identity"],
    ["Identidad Visual", "Visual Identity"],
    ["Tipografía de Autor", "Bespoke Typography"],
    ["Tipografía Y2K", "Y2K Typography"],
    ["Tipografía Gótica", "Gothic Typography"],
    ["Diseño de Cartel · Archivo Heráldico 2024", "Poster Design · Heraldic Archive 2024"],
    ["Diseño de Cartel", "Poster Design"],
    ["Archivo Heráldico", "Heraldic Archive"],
    ["Ensayo Visual · Diseño Editorial", "Visual Essay · Editorial Design"],
    ["Ensayo Visual", "Visual Essay"],
    ["Libro de Artista", "Artist Book"],
    ["Serie Devocional", "Devotional Series"],
    ["Instante Decisivo", "Decisive Moment"],
    ["Luz Natural", "Natural Light"],
    ["Alto Contraste", "High Contrast"],
    ["Blanco y Negro", "Black & White"],
    ["Espacio Negativo", "Negative Space"],
    ["Espacio en Blanco", "White Space"],
    ["Semiótica Visual", "Visual Semiotics"],
    ["Orla Dorada", "Golden Halo Border"],
    ["Iluminación Volumétrica", "Volumetric Lighting"],
    ["Inevitable Ocaso", "Inevitable Sunset"],
    ["Conflicto en la Mente", "Conflict in the Mind"],
    ["Vuelo Urbano", "Urban Flight"],
    ["Conexión Íntima", "Intimate Connection"],
    ["Divino Angel", "Divine Angel"],
    ["Divino Ángel", "Divine Angel"],
    ["Prisión Interior", "Inner Prison"],
    ["Monster / Prisión Interior", "Monster / Inner Prison"],
    ["El Camino", "The Way"],
    ["Journey / El Camino", "Journey / The Way"],
    ["Amor Verdadero", "True Love"],
    ["Catedral de Silencio", "Cathedral of Silence"],
    ["Formas de la Ausencia", "Shapes of Absence"],
    ["Nocturno Urbano", "Urban Nocturne"],
    ["Monolito Tipográfico", "Typographic Monolith"],
    ["Salmo 23", "Psalm 23"],
    ["Retrato en Penumbra", "Portrait in Penumbra"],
    ["Geometría de la Fe", "Geometry of Faith"],
    ["Réquiem Visual", "Visual Requiem"],
    ["Retorno a la Esencia", "Return to Essence"],
    ["Trascendencia Sacra", "Sacred Transcendence"],
    ["Catedral Iluminada", "Illuminated Cathedral"],
    ["Dualidad Cromática", "Chromatic Duality"],
    ["El Reino", "The Kingdom"],
    ["a través de", "through"],
    ["frente al", "in front of the"],
    ["frente a", "in front of"]
  ];

  // 2. Domain-Specific Dictionary (Spanish -> English)
  const DICT_ES_EN = {
    // Curatorial / Art & Design
    "obra": "work", "obras": "works", "proyecto": "project", "proyectos": "projects",
    "arte": "art", "artista": "artist", "artistas": "artists", "autor": "author", "autores": "authors",
    "diseño": "design", "diseñador": "designer", "diseñadores": "designers",
    "editorial": "editorial", "gráfico": "graphic", "gráfica": "graphic", "gráficos": "graphics",
    "sacro": "sacred", "sacra": "sacred", "sacros": "sacred", "sacras": "sacred",
    "fotografía": "photography", "fotográfico": "photographic", "fotográfica": "photographic",
    "retrato": "portrait", "retratos": "portraits", "sesión": "session", "sesiones": "sessions",
    "cartel": "poster", "carteles": "posters", "afiche": "poster", "afiches": "posters",
    "portada": "cover", "portadas": "covers", "álbum": "album", "concepto": "concept",
    "tipografía": "typography", "tipográfico": "typographic", "tipográfica": "typographic",
    "retícula": "grid", "sistema": "system", "sistemas": "systems", "publicación": "publication",
    "catálogo": "catalog", "catálogos": "catalogs", "libro": "book", "libros": "books",
    "fanzine": "fanzine", "archivo": "archive", "archivos": "archives", "colección": "collection",
    "índice": "index", "selección": "selection", "seleccionado": "selected", "seleccionada": "selected",
    "seleccionados": "selected", "seleccionadas": "selected", "curaduría": "curation",
    "curatorial": "curatorial", "manifiesto": "manifesto", "filosofía": "philosophy",
    "declaración": "statement", "memoria": "memory", "visión": "vision", "misticismo": "mysticism",
    "místico": "mystical", "mística": "mystical", "fe": "faith", "devoción": "devotion",
    "devocional": "devotional", "sagrado": "sacred", "sagrada": "sacred", "celestial": "celestial",
    "ángel": "angel", "ángeles": "angels", "divino": "divine", "divina": "divine",
    "cielo": "sky", "cielos": "skies", "nube": "cloud", "nubes": "clouds", "estrella": "star",
    "estrellas": "stars", "estelar": "stellar", "horizonte": "horizon", "infinito": "infinite",
    "luz": "light", "luces": "lights", "sombra": "shadow", "sombras": "shadows", "penumbra": "penumbra",
    "claroscuro": "chiaroscuro", "zenital": "zenithal", "cenital": "zenithal", "volumétrico": "volumetric",
    "volumétrica": "volumetric", "iluminación": "lighting", "resplandor": "glow",
    "color": "color", "colores": "colors", "cromático": "chromatic", "cromática": "chromatic",
    "monocromático": "monochromatic", "monocromo": "monochrome", "tonalidad": "tonality",
    "textura": "texture", "texturas": "textures", "grano": "grain", "analógico": "analog",
    "analógica": "analog", "digital": "digital", "composición": "composition", "estructura": "structure",
    "forma": "form", "formas": "forms", "espacio": "space", "vacío": "void", "tensión": "tension",
    "armonía": "harmony", "dualidad": "duality", "equilibrio": "balance", "rigor": "rigor",
    "profundidad": "depth", "emotivo": "emotional", "emotiva": "emotional", "crudo": "raw",
    "cruda": "raw", "intimidad": "intimacy", "cómplice": "accomplice", "complicidad": "complicity",
    "pareja": "couple", "sujeto": "subject", "instante": "moment", "momento": "moment",
    "decisivo": "decisive", "decisiva": "decisive", "espontáneo": "spontaneous", "espontánea": "spontaneous",
    "encuadre": "framing", "enfoque": "focus", "focal": "focal", "circular": "circular",
    "fondo": "backdrop", "degradado": "gradient", "paloma": "pigeon", "palomas": "pigeons",
    "vuelo": "flight", "despegue": "takeoff", "sincronizado": "synchronized", "sincronizada": "synchronized",
    "tiempo": "time", "ocaso": "sunset", "caída": "fall", "poder": "power", "reino": "kingdom",
    "imperio": "empire", "escultura": "sculpture", "esculturas": "sculptures", "vegetación": "vegetation",
    "renacentista": "renaissance", "gótico": "gothic", "gótica": "gothic", "heráldico": "heraldic",
    "heráldica": "heraldic", "serpiente": "serpent", "sabiduría": "wisdom", "misterio": "mystery",
    "arcano": "arcane", "arcana": "arcane", "orla": "halo", "monstruo": "monster",
    "prisión": "prison", "interior": "inner", "encierro": "confinement", "mente": "mind",
    "mental": "mental", "camino": "way", "viaje": "journey", "recorrido": "journey",
    "solitario": "solitary", "solitaria": "solitary", "narrativa": "narrative", "viñeta": "panel",
    "viñetas": "panels", "amor": "love", "verdadero": "true", "verdadera": "true",
    "ensayo": "essay", "futurista": "futuristic", "trascendencia": "transcendence",
    "humano": "human", "humana": "human", "cinético": "kinetic", "cinética": "kinetic",
    "acento": "accent", "acentos": "accents",
    "surrealismo": "surrealism", "oscuro": "dark", "oscura": "dark", "experimental": "experimental",
    "modelado": "modeling", "escultórico": "sculptural", "escultórica": "sculptural",
    "inexorable": "inexorable", "paso": "passage", "reflexión": "reflection",
    "callejero": "street", "callejera": "street", "terreno": "field", "entorno": "environment",
    "centrado": "centered", "centrada": "centered", "puntos": "points", "punto": "point",
    "neutro": "neutral", "neutra": "neutral", "yuxtaponiendo": "juxtaposing",
    "enroscado": "coiled", "enroscada": "coiled", "complementado": "complemented", "complementada": "complemented",
    "marco": "frame", "autoexigencia": "perfectionism", "semitono": "halftone",
    "inspirado": "inspired", "inspirada": "inspired", "desglosan": "break down",
    "espacio-tiempo": "spacetime", "retratística": "portraiture",
    "título": "title", "subtítulo": "subtitle", "descripción": "description", "resumen": "summary",
    "nuevo": "new", "nueva": "new", "nuevos": "new", "nuevas": "new", "mi": "my",

    // Connectors, prepositions & common words
    "de": "of", "del": "of the", "en": "in", "sobre": "on", "con": "with", "sin": "without",
    "y": "and", "e": "and", "o": "or", "u": "or", "a": "to", "al": "to the", "por": "by",
    "para": "for", "hacia": "toward", "desde": "from", "entre": "between", "que": "that",
    "el": "the", "la": "the", "los": "the", "las": "the", "un": "a", "una": "a", "unos": "some", "unas": "some",
    "su": "its", "sus": "their", "este": "this", "esta": "this", "estos": "these", "estas": "these",
    "combina": "combines", "fusiona": "fuses", "fusionando": "fusing", "explora": "explores",
    "exploración": "exploration", "evoca": "evokes", "evocando": "evoking", "captura": "captures",
    "capturando": "capturing", "desafía": "challenges", "dialoga": "dialogues", "diálogo": "dialogue",
    "representa": "represents", "aborda": "addresses",

    // Numbers
    "uno": "one", "dos": "two", "tres": "three", "cuatro": "four", "cinco": "five",
    "seis": "six", "siete": "seven", "ocho": "eight", "nueve": "nine", "diez": "ten",
    "primer": "first", "primero": "first", "primera": "first", "segundo": "second", "segunda": "second"
  };

  function preserveCase(original, replacement) {
    if (!original || !replacement) return replacement;
    if (original === original.toUpperCase() && original.length > 1) {
      return replacement.toUpperCase();
    }
    if (original[0] === original[0].toUpperCase()) {
      return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    }
    return replacement.toLowerCase();
  }

  function toEn(text) {
    if (!text || typeof text !== 'string') return '';
    let res = text.trim();
    if (!res) return '';

    // Step 1: Replace multi-word known phrases
    for (const [esPhrase, enPhrase] of PHRASE_PAIRS) {
      const regex = new RegExp('\\b' + esPhrase.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'gi');
      res = res.replace(regex, (match) => {
        if (match === match.toUpperCase()) return enPhrase.toUpperCase();
        return enPhrase;
      });
    }

    // Step 2: Replace individual vocabulary words
    res = res.replace(/[a-záéíóúñüÁÉÍÓÚÑÜ]+/gi, (word) => {
      const lower = word.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(DICT_ES_EN, lower)) {
        return preserveCase(word, DICT_ES_EN[lower]);
      }
      return word;
    });

    // Cleanup double spaces if any
    res = res.replace(/\s{2,}/g, ' ').trim();
    return res;
  }

  function toEs(text) {
    if (!text || typeof text !== 'string') return '';
    let res = text.trim();
    if (!res) return '';

    for (const [esPhrase, enPhrase] of PHRASE_PAIRS) {
      const regex = new RegExp('\\b' + enPhrase.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'gi');
      res = res.replace(regex, esPhrase);
    }
    return res;
  }

  return {
    toEn,
    toEs
  };
})();

// Export for node or browser



/* ==========================================================================
   BILINGUAL TRANSLATION SYSTEM (ES / EN)
   ========================================================================== */
const I18N = {
  es: {
    lang: "ES",
    viewGrid: "Cuadrícula",
    viewSphere: "Esfera 3D",
    console: "Consola",
    close: "Cerrar",
    videoBrand: "ARCHIVO VISUAL",
    videoBadge: "PRÓLOGO INTERACTIVO",
    videoGreetingTag: "Portafolio Oficial · 2026",
    videoGreeting: "Hola, Soy Wilmar",
    videoGreetingRole: "Diseñador Gráfico & Artista Visual",
    videoHint: "Gira la rueda del ratón o desliza para hacer zoom · Scroll to explore",
    videoPlay: "Reproducir",
    videoPause: "Pausar",
    videoSkip: "Omitir",
    stages: {
      overview: "Vista General",
      zoom: "Acercamiento",
      gaze: "Mirada",
      iris: "Iris",
      archive: "Hacia el Archivo"
    },
    headlineTitle: "Portafolio",
    headlineSubtitle: "Diseño Gráfico, Diseño Editorial & Arte Sacro Contemporáneo · Selección de Proyectos & Perfil Profesional",
    menuSphere: "Esfera 3D",
    menuGrid: "Catálogo Completo",
    menuReplay: "◉ Ver Video Inicial",
    menuStatement: "Manifiesto de Autor",
    menuContact: "Contacto Directo",
    menuMaster: "⚙ Consola Maestra",
    menuFooterLeft: "Valledupar · Colombia · Alcance Global",
    menuFooterRight: "Diseño Gráfico · Diseño Editorial · Arte Sacro",
    gridTitle: "Catálogo Completo",
    gridSubtitle: "Diez Obras Seleccionadas · 10 Works Index",
    gridClose: "← Esfera 3D",
    lbClose: "× Cerrar",
    modeFinal: "Obra Final",
    modeProcess: "Boceto & Proceso",
    modeTexture: "Macro Textura",
    specRole: "Rol Creativo:",
    specMedium: "Técnica / Soporte:",
    specTypo: "Tipografía de Autor:",
    specClient: "Cliente / Editorial:",
    lbDrive: "Ver en Google Drive ➚",
    inquireSimilar: "Encargar Proyecto Similar",
    statementTag: "FILOSOFÍA VISUAL · STUDIO ARCHIVE",
    statementTitle: "Manifiesto de Autor",
    statementSubtitle: "La tensión entre el misticismo sacro, la disciplina editorial y el claroscuro",
    statementQuote: "“El diseño no es ornamento superficial; es la arquitectura visual de la memoria y la tensión plástica de la forma.”",
    bioP1: "Mi trabajo como creador visual y diseñador se sitúa en el umbral donde el rigor conceptual se encuentra con la profundidad emotiva. Cada obra parte del respeto por el espacio en blanco, la contundencia tipográfica y una narrativa que desafía la superficialidad de la inmediatez digital.",
    bioP2: "Desde Valledupar hacia el panorama visual contemporáneo, concibo el arte sacro, las publicaciones editoriales y la fotografía de estudio no como elementos aislados, sino como un diálogo continuo sobre la identidad, la fe, la soledad y la trascendencia estética.",
    capHeading: "CAPACIDADES DE ESTUDIO · PILARES CREATIVOS",
    cap1Title: "Arte Gráfico & Portadas",
    cap1Desc: "Identidad visual y cartelería conceptual para proyectos musicales, lanzamientos discográficos, fanzines de autor y portadas de gran impacto estético.",
    cap2Title: "Diseño Editorial & Tipografía",
    cap2Desc: "Sistemas reticulares suizos, composiciones volumétricas Y2K, tipografía gótica y renacentista aplicada a publicaciones, catlogos de arte y libros de autor.",
    cap3Title: "Arte Sacro Contemporáneo",
    cap3Desc: "Reinterpretación de la iconografía celestial y mística mediante técnicas digitales, orlas doradas, iluminación cenital volumétrica y simbolismo trascendente.",
    cap4Title: "Fotografía Conceptual & Retrato",
    cap4Desc: "Captura del instante urbano decisivo, sesiones editoriales de estudio con esquemas de luz suave y exploración de la psique mediante grano analógico.",
    stmtCtaText: "Iniciar Colaboración con Wilmar",
    contactTag: "CONTRATACIONES · COMISIONES 2026",
    contactHeading: "Iniciar Diálogo",
    contactSubtitle: "Diseño Gráfico · Diseño Editorial · Arte Sacro Contemporáneo",
    availBadge: "DISPONIBLE PARA PROYECTOS · Q4 2026 / 2027",
    clockLabel: "Hora en Valledupar (UTC-5):",
    chEmailLabel: "Correo Electrónico Oficial",
    btnCopy: "Copiar",
    btnWrite: "Escribir",
    chWaLabel: "WhatsApp Directo",
    btnOpenChat: "Abrir Chat",
    chIgLabel: "Instagram / Archivo Visual",
    btnViewProfile: "Ver Perfil",
    chBeLabel: "Behance Portfolio",
    btnPortfolio: "Portafolio",
    chLocLabel: "Ubicación & Modalidad",
    locSub: "Atención remota internacional · Presencial bajo agenda",
    formTitle: "Enviar Propuesta de Proyecto",
    labelName: "Nombre / Estudio o Marca *",
    phName: "Ej: Elena Torres o Galería Meridiano",
    labelEmail: "Correo Electrónico *",
    phEmail: "contacto@estudio.com",
    labelService: "Tipo de Obra / Disciplina *",
    services: [
      "Arte Gráfico & Portada de Autor",
      "Diseño Editorial & Maquetación",
      "Arte Sacro Contemporáneo",
      "Identidad de Marca & Tipografía",
      "Fotografía Conceptual & Retrato",
      "Diseño Visual & Asesoría Creativa",
      "Otro Proyecto Personalizado"
    ],
    labelBudget: "Presupuesto / Cronograma",
    phBudget: "Ej: $500 - $1,500 USD · Entrega en 3 semanas",
    labelMessage: "Descripción del Proyecto & Visión *",
    phMessage: "Cuéntame sobre el concepto, objetivos, referencias y alcance...",
    btnSubmitText: "Enviar Propuesta · Iniciar Diálogo",
    feedbackTitle: "¡Propuesta preparada correctamente!",
    feedbackSub: "Haz clic para abrir tu cliente de correo automáticamente o copia el texto de la propuesta.",
    btnOpenMail: "Abrir en Correo",
    btnCopySummary: "Copiar Mensaje",
    toastCopied: "¡Correo copiado al portapapeles!",
    toastMsgCopied: "¡Mensaje copiado al portapapeles!",
    toastProposalReady: "¡Propuesta preparada correctamente!",
    authTitle: "Consola Maestra",
    authDesc: "Acceso exclusivo para el autor (Wilmar Machado) para gestionar contenidos, proyectos y estilos del portafolio.",
    authPlaceholder: "Introduce la clave maestra...",
    authLoginBtn: "Acceder a Consola",
    authCancelBtn: "Cancelar",
    videoSoundMute: "Silenciar",
    videoSoundUnmute: "Sonido",
    filterAll: "Todas",
    filterSacro: "Arte Sacro",
    filterEditorial: "Diseño Editorial",
    filterFoto: "Fotografía",
    filterGrafico: "Arte Gráfico",
    lbWhatsApp: "Consultar por WhatsApp",
    lbShare: "Compartir Obra",
    signatureRole: "Diseñador Gráfico & Artista Visual · Valledupar, Colombia",
    toastLinkCopied: "¡Enlace a la obra copiado al portapapeles!",
    searchBtn: "Buscar",
    searchPlaceholder: "Buscar por obra, disciplina, cliente, técnica...",
    spotlightHint: "Enter para seleccionar · Esc para cerrar",
    spotlightEmpty: "No se encontraron obras con ese término.",
    focusMode: "Enfoque",
    focusModeDeactivate: "Salir de Enfoque",
    orbitPause: "Pausar Giro",
    orbitResume: "Reanudar Giro",
    shareModalTitle: "Compartir Obra",
    shareModalBadge: "DIFUSIÓN CULTURAL",
    shareLinkLabel: "Enlace Directo a la Obra:",
    shareBtnCopy: "Copiar",
    shareMoreApps: "Más Apps",
    ambientSoundOn: "Sonido",
    ambientSoundOff: "Silencio",
    ambientSoundTipPlaying: "Música Jazz Hop activa · Clic para silenciar (M)",
    ambientSoundTipMuted: "Música Jazz Hop silenciada · Clic para activar (M)",
    ambientToastOn: "Música Jazz Hop activada",
    ambientToastOff: "Música Jazz Hop silenciada"
  },
  en: {
    lang: "EN",
    viewGrid: "Grid View",
    viewSphere: "3D Sphere",
    console: "Console",
    close: "Close",
    videoBrand: "VISUAL ARCHIVE",
    videoBadge: "INTERACTIVE PROLOGUE",
    videoGreetingTag: "Official Portfolio · 2026",
    videoGreeting: "Hello, I'm Wilmar",
    videoGreetingRole: "Graphic Designer & Visual Artist",
    videoHint: "Scroll wheel or swipe to explore · Zoom to enter",
    videoPlay: "Play",
    videoPause: "Pause",
    videoSkip: "Skip",
    stages: {
      overview: "Overview",
      zoom: "Zooming In",
      gaze: "Gaze",
      iris: "Iris",
      archive: "Into Archive"
    },
    headlineTitle: "Portfolio",
    headlineSubtitle: "Graphic Design, Editorial Design & Contemporary Sacred Art · Selected Projects & Professional Profile",
    menuSphere: "3D Sphere",
    menuGrid: "Complete Catalog",
    menuReplay: "◉ Watch Intro Video",
    menuStatement: "Author's Manifesto",
    menuContact: "Direct Contact",
    menuMaster: "⚙ Master Console",
    menuFooterLeft: "Valledupar · Colombia · Global Reach",
    menuFooterRight: "Graphic Design · Editorial Design · Sacred Art",
    gridTitle: "Complete Catalog",
    gridSubtitle: "Ten Selected Works · 10 Works Index",
    gridClose: "← 3D Sphere",
    lbClose: "× Close",
    modeFinal: "Final Work",
    modeProcess: "Sketch & Process",
    modeTexture: "Macro Texture",
    specRole: "Creative Role:",
    specMedium: "Medium / Substrate:",
    specTypo: "Typography:",
    specClient: "Client / Publisher:",
    lbDrive: "View on Google Drive ➚",
    inquireSimilar: "Commission Similar Project",
    statementTag: "VISUAL PHILOSOPHY · STUDIO ARCHIVE",
    statementTitle: "Author's Manifesto",
    statementSubtitle: "The tension between sacred mysticism, editorial discipline, and chiaroscuro",
    statementQuote: "“Design is not superficial ornament; it is the visual architecture of memory and the sculptural tension of form.”",
    bioP1: "My work as a visual creator and designer is situated on the threshold where conceptual rigor meets emotional depth. Each piece stems from reverence for negative space, typographic conviction, and a narrative that defies the superficiality of digital immediacy.",
    bioP2: "From Valledupar to the contemporary visual sphere, I conceive sacred art, editorial publications, and studio photography not as isolated disciplines, but as a continuous dialogue on identity, faith, solitude, and aesthetic transcendence.",
    capHeading: "STUDIO CAPABILITIES · CREATIVE PILLARS",
    cap1Title: "Graphic Art & Cover Design",
    cap1Desc: "Visual identity and conceptual poster design for music projects, record releases, art fanzines, and high-impact covers.",
    cap2Title: "Editorial Design & Typography",
    cap2Desc: "Swiss grid systems, Y2K volumetric compositions, gothic and renaissance typography applied to publications, art catalogs, and author books.",
    cap3Title: "Contemporary Sacred Art",
    cap3Desc: "Reinterpretation of celestial and mystical iconography through digital techniques, golden halos, volumetric zenithal lighting, and transcendent symbolism.",
    cap4Title: "Conceptual Photography & Portraiture",
    cap4Desc: "Capturing the decisive urban moment, studio editorial sessions with soft lighting schemes, and psychic exploration through analog grain.",
    stmtCtaText: "Start Collaboration with Wilmar",
    contactTag: "BOOKINGS & COMMISSIONS 2026",
    contactHeading: "Start a Dialogue",
    contactSubtitle: "Graphic Design · Editorial Design · Contemporary Sacred Art",
    availBadge: "AVAILABLE FOR PROJECTS · Q4 2026 / 2027",
    clockLabel: "Valledupar Time (UTC-5):",
    chEmailLabel: "Official Email Address",
    btnCopy: "Copy",
    btnWrite: "Compose",
    chWaLabel: "Direct WhatsApp",
    btnOpenChat: "Open Chat",
    chIgLabel: "Instagram / Visual Archive",
    btnViewProfile: "View Profile",
    chBeLabel: "Behance Portfolio",
    btnPortfolio: "Portfolio",
    chLocLabel: "Location & Scope",
    locSub: "International remote service · In-person by appointment",
    formTitle: "Submit Project Proposal",
    labelName: "Name / Studio or Brand *",
    phName: "e.g., Elena Torres or Meridian Gallery",
    labelEmail: "Email Address *",
    phEmail: "contact@studio.com",
    labelService: "Work Type / Discipline *",
    services: [
      "Graphic Art & Author Cover",
      "Editorial Design & Layout",
      "Contemporary Sacred Art",
      "Brand Identity & Typography",
      "Conceptual Photography & Portrait",
      "Visual Design & Creative Consultation",
      "Other Custom Project"
    ],
    labelBudget: "Budget / Timeline",
    phBudget: "e.g., $500 - $1,500 USD · 3 weeks timeline",
    labelMessage: "Project Description & Vision *",
    phMessage: "Tell me about the concept, objectives, references, and scope...",
    btnSubmitText: "Submit Proposal · Start Dialogue",
    feedbackTitle: "Proposal prepared successfully!",
    feedbackSub: "Click to open your email client automatically or copy the proposal text.",
    btnOpenMail: "Open in Email",
    btnCopySummary: "Copy Message",
    toastCopied: "Email copied to clipboard!",
    toastMsgCopied: "Message copied to clipboard!",
    toastProposalReady: "Proposal prepared successfully!",
    authTitle: "Master Console",
    authDesc: "Exclusive author access (Wilmar Machado) to manage portfolio content, projects, and styling.",
    authPlaceholder: "Enter master password...",
    authLoginBtn: "Access Console",
    authCancelBtn: "Cancel",
    videoSoundMute: "Mute",
    videoSoundUnmute: "Sound",
    filterAll: "All",
    filterSacro: "Sacred Art",
    filterEditorial: "Editorial Design",
    filterFoto: "Photography",
    filterGrafico: "Graphic Art",
    lbWhatsApp: "Inquire via WhatsApp",
    lbShare: "Share Artwork",
    signatureRole: "Graphic Designer & Visual Artist · Valledupar, Colombia",
    toastLinkCopied: "Artwork direct link copied to clipboard!",
    searchBtn: "Search",
    searchPlaceholder: "Search by work, discipline, client, technique...",
    spotlightHint: "Enter to select · Esc to close",
    spotlightEmpty: "No artworks found matching your search.",
    focusMode: "Focus",
    focusModeDeactivate: "Exit Focus",
    orbitPause: "Pause Orbit",
    orbitResume: "Resume Orbit",
    shareModalTitle: "Share Artwork",
    shareModalBadge: "CULTURAL DISSEMINATION",
    shareLinkLabel: "Direct Link to Artwork:",
    shareBtnCopy: "Copy",
    shareMoreApps: "More Apps",
    ambientSoundOn: "Sound",
    ambientSoundOff: "Mute",
    ambientSoundTipPlaying: "Jazz Hop music active · Click to mute (M)",
    ambientSoundTipMuted: "Jazz Hop music muted · Click to activate (M)",
    ambientToastOn: "Jazz Hop music activated",
    ambientToastOff: "Jazz Hop music muted"
  }
};

let currentLang = 'es';
try {
  const savedLang = localStorage.getItem('wilmar_portfolio_lang');
  if (savedLang === 'en' || savedLang === 'es') currentLang = savedLang;
} catch(e) {}

// Dynamic cards language updater
function updateCardsLanguage(lang) {
  const isEn = (lang === 'en');
  const cfg = STATE.config || DEFAULT_CONFIG;
  const items = cfg.projects || [];

  // Update sphere cards
  const sphereCards = document.querySelectorAll('#world .card');
  sphereCards.forEach((card) => {
    const idx = parseInt(card.getAttribute('data-index'), 10);
    if (isNaN(idx) || !items[idx]) return;
    const item = items[idx];
    const titleEl = card.querySelector('.card-title');
    const placeEl = card.querySelector('.card-place');
    if (titleEl) {
      titleEl.textContent = isEn ? (item.title_en || OfflineTranslator.toEn(item.title)) : item.title;
    }
    if (placeEl) {
      placeEl.textContent = isEn ? (item.place_en || OfflineTranslator.toEn(item.place)) : item.place;
    }
    card.setAttribute('aria-label', `${titleEl ? titleEl.textContent : item.title}, ${placeEl ? placeEl.textContent : item.place}`);
  });

  // Update grid items
  const gridItems = document.querySelectorAll('#grid-container .grid-item');
  gridItems.forEach((gridItem) => {
    const idx = parseInt(gridItem.getAttribute('data-index'), 10);
    if (isNaN(idx) || !items[idx]) return;
    const item = items[idx];
    const titleEl = gridItem.querySelector('.grid-title');
    const placeEl = gridItem.querySelector('.grid-place');
    if (titleEl) {
      titleEl.textContent = isEn ? (item.title_en || OfflineTranslator.toEn(item.title)) : item.title;
    }
    if (placeEl) {
      placeEl.textContent = isEn ? (item.place_en || OfflineTranslator.toEn(item.place)) : item.place;
    }
  });
}

// Lightbox language updater
function updateLightboxLanguage(lang) {
  const isEn = (lang === 'en');
  const dict = I18N[lang] || I18N.es;
  const cfg = STATE.config || DEFAULT_CONFIG;

  const setT = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  const setHtml = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };

  setT('ui-lb-close-label', dict.close);
  setT('ui-mode-final-label', dict.modeFinal);
  setT('ui-mode-process-label', dict.modeProcess);
  setT('ui-mode-texture-label', dict.modeTexture);
  setT('ui-spec-role-label', dict.specRole);
  setT('ui-spec-medium-label', dict.specMedium);
  setT('ui-spec-typo-label', dict.specTypo);
  setT('ui-spec-client-label', dict.specClient);
  setT('ui-lb-inquire-label', dict.inquireSimilar);
  setT('ui-lb-share-label', dict.lbShare);

  const lb = document.getElementById('lightbox');
  if (lb && lb.classList.contains('active')) {
    const idx = STATE.currentLightboxIndex !== undefined ? STATE.currentLightboxIndex : 0;
    const item = cfg.projects && cfg.projects[idx];
    if (item) {
      const tEl = document.getElementById('lightbox-title');
      const pEl = document.getElementById('lightbox-place');
      const nEl = document.getElementById('lightbox-note');
      const rEl = document.getElementById('lightbox-role');
      const mEl = document.getElementById('lightbox-medium');
      const cEl = document.getElementById('lightbox-client');

      if (tEl) tEl.textContent = isEn ? (item.title_en || OfflineTranslator.toEn(item.title)) : item.title;
      if (pEl) pEl.textContent = isEn ? (item.place_en || OfflineTranslator.toEn(item.place)) : item.place;
      if (nEl) nEl.textContent = isEn ? (item.note_en || OfflineTranslator.toEn(item.note)) : item.note;
      if (rEl) rEl.textContent = isEn ? (item.role_en || OfflineTranslator.toEn(item.role || 'Graphic Design & Composition')) : (item.role || 'Diseño Gráfico & Composición');
      if (mEl) mEl.textContent = isEn ? (item.medium_en || OfflineTranslator.toEn(item.medium || 'Digital Composition & Fine Art Print')) : (item.medium || 'Composición Digital & Impresión Fine Art');
      if (cEl) cEl.textContent = isEn ? (item.client_en || OfflineTranslator.toEn(item.client || "Author's Collection")) : (item.client || 'Colección Autoral');
    }
  }
}

// Master Language Switcher function
function applyLanguage(lang) {
  currentLang = (lang === 'en') ? 'en' : 'es';
  try { localStorage.setItem('wilmar_portfolio_lang', currentLang); } catch(e) {}
  const dict = I18N[currentLang];
  const isEn = (currentLang === 'en');
  const cfg = STATE.config || DEFAULT_CONFIG;

  // Active pills in nav
  const optEs = document.getElementById('lang-opt-es');
  const optEn = document.getElementById('lang-opt-en');
  if (optEs && optEn) {
    optEs.classList.toggle('active', currentLang === 'es');
    optEn.classList.toggle('active', currentLang === 'en');
  }

  // Active pills in lightbox topbar
  const lbOptEs = document.getElementById('lb-lang-opt-es');
  const lbOptEn = document.getElementById('lb-lang-opt-en');
  if (lbOptEs && lbOptEn) {
    lbOptEs.classList.toggle('active', currentLang === 'es');
    lbOptEn.classList.toggle('active', currentLang === 'en');
  }

  const setT = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  const setHtml = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };
  const setPh = (id, ph) => {
    const el = document.getElementById(id);
    if (el) el.placeholder = ph;
  };

  // Nav
  setT('ui-console-nav-label', dict.console);
  setT('ui-nav-search-label', dict.searchBtn);
  setT('ui-nav-focus-label', dict.focusMode);
  if (window.AmbientMusicEngine && typeof window.AmbientMusicEngine.updateLang === 'function') {
    window.AmbientMusicEngine.updateLang();
  } else {
    const ambLabel = document.getElementById('ui-ambient-sound-label');
    const ambBtn = document.getElementById('ambient-music-btn');
    const isPlay = ambBtn && ambBtn.classList.contains('playing');
    if (ambLabel) ambLabel.textContent = isPlay ? dict.ambientSoundOn : dict.ambientSoundOff;
    if (ambBtn) ambBtn.title = isPlay ? dict.ambientSoundTipPlaying : dict.ambientSoundTipMuted;
  }
  setPh('spotlight-search-input', dict.searchPlaceholder);
  setT('ui-spotlight-hint', dict.spotlightHint);
  setT('ui-share-title', dict.shareModalTitle);
  setT('ui-share-badge', dict.shareModalBadge);
  setT('ui-share-link-label', dict.shareLinkLabel);
  setT('ui-share-copy-btn-text', dict.shareBtnCopy);
  setT('ui-share-more-apps', dict.shareMoreApps);
  const orbitLabel = document.getElementById('ui-orbit-label');
  if (orbitLabel) {
    orbitLabel.textContent = STATE.orbitPaused ? dict.orbitResume : dict.orbitPause;
  }
  const viewLabel = document.getElementById('view-label');
  const gridView = document.getElementById('grid-view');
  const isGrid = gridView && gridView.classList.contains('active');
  if (viewLabel) viewLabel.textContent = isGrid ? dict.viewSphere : dict.viewGrid;

  // Video Stage
  setT('ui-video-brand', dict.videoBrand);
  setT('ui-video-badge', dict.videoBadge);
  setT('ui-video-greeting-tag', dict.videoGreetingTag);
  setT('ui-video-greeting', dict.videoGreeting);
  setT('ui-video-greeting-role', dict.videoGreetingRole);
  setT('ui-video-hint-text', dict.videoHint);
  setT('ui-video-play-label', dict.videoPlay);
  setT('ui-video-skip-label', dict.videoSkip);
  if (window.AmbientMusicEngine && typeof window.AmbientMusicEngine.updateLang === 'function') {
    window.AmbientMusicEngine.updateLang();
  }

  // Main 3D Sphere Headline & Subtitle (Guaranteed Bilingual Sync)
  const hTitle = document.getElementById('ui-headline-title');
  const hSub = document.getElementById('ui-headline-subtitle');
  if (hTitle) {
    hTitle.textContent = dict.headlineTitle;
  }
  if (hSub) {
    hSub.textContent = dict.headlineSubtitle;
  }

  // Update floating skill tags in video stage
  if (typeof window.updateFloatingTagsLanguage === 'function') {
    window.updateFloatingTagsLanguage(currentLang);
  }

  // If lightbox is currently open, live refresh the artwork in new language!
  const lbModal = document.getElementById('lightbox');
  if (lbModal && lbModal.classList.contains('active') && STATE.currentLightboxIndex !== undefined) {
    openLightbox(STATE.currentLightboxIndex);
  }

  // Update sphere & grid cards
  updateCardsLanguage(currentLang);

  // Menu
  setT('menu-link-sphere', dict.menuSphere);
  setT('menu-link-grid', dict.menuGrid);
  setT('menu-link-replay', dict.menuReplay);
  setT('menu-link-statement', dict.menuStatement);
  setT('menu-link-contact', dict.menuContact);
  setHtml('menu-link-master', '&#9881; ' + dict.menuMaster);
  setT('ui-menu-footer-left', dict.menuFooterLeft);
  setT('ui-menu-footer-right', dict.menuFooterRight);
  setHtml('menu-close-btn', '&times; ' + dict.close);

  // Grid View Header
  const gTitle = document.getElementById('ui-grid-title');
  const gSub = document.getElementById('ui-grid-subtitle');
  if (gTitle) {
    gTitle.textContent = isEn
      ? (cfg.profile.gridTitle_en || OfflineTranslator.toEn(cfg.profile.gridTitle) || dict.gridTitle)
      : (cfg.profile.gridTitle || 'Catálogo Completo');
  }
  if (gSub) {
    gSub.textContent = isEn
      ? (cfg.profile.gridSubtitle_en || OfflineTranslator.toEn(cfg.profile.gridSubtitle) || dict.gridSubtitle)
      : (cfg.profile.gridSubtitle || 'Diez Obras Seleccionadas · 10 Works Index');
  }
  setT('ui-filter-all', dict.filterAll);
  setT('ui-filter-sacro', dict.filterSacro);
  setT('ui-filter-editorial', dict.filterEditorial);
  setT('ui-filter-foto', dict.filterFoto);
  setT('ui-filter-grafico', dict.filterGrafico);

  const filterBar = document.getElementById('curatorial-filter-bar');
  if (filterBar) {
    filterBar.setAttribute('aria-label', isEn ? 'Filter by discipline' : 'Filtrar por disciplina');
  }
  const fPrev = document.getElementById('filter-scroll-prev');
  if (fPrev) {
    fPrev.setAttribute('aria-label', isEn ? 'View previous filters' : 'Ver filtros anteriores');
    fPrev.setAttribute('title', isEn ? 'Scroll filters left' : 'Desplazar filtros a la izquierda');
  }
  const fNext = document.getElementById('filter-scroll-next');
  if (fNext) {
    fNext.setAttribute('aria-label', isEn ? 'View more filters' : 'Ver más filtros');
    fNext.setAttribute('title', isEn ? 'Scroll filters right' : 'Desplazar filtros a la derecha');
  }

  // Lightbox
  updateLightboxLanguage(currentLang);

  // Statement
  setT('ui-statement-tag', dict.statementTag);
  const stTitle = document.getElementById('ui-statement-title');
  if (stTitle) {
    stTitle.textContent = isEn ? (cfg.profile.statementTitle_en || dict.statementTitle) : (cfg.profile.statementTitle || dict.statementTitle);
  }
  const stSub = document.getElementById('ui-statement-subtitle');
  if (stSub) {
    stSub.textContent = isEn ? (cfg.profile.statementSubtitle_en || dict.statementSubtitle) : (cfg.profile.statementSubtitle || dict.statementSubtitle);
  }
  const stQuote = document.getElementById('ui-statement-quote');
  if (stQuote) {
    const qText = isEn ? (cfg.profile.statementQuote_en || dict.statementQuote) : (cfg.profile.statementQuote || dict.statementQuote);
    stQuote.innerHTML = qText.startsWith('“') ? qText : `&ldquo;${qText}&rdquo;`;
  }
  setHtml('statement-close-btn', '&times; ' + dict.close);
  const stBio = document.getElementById('ui-statement-bio');
  if (stBio) {
    if (isEn && cfg.profile.statementBio_en) {
      stBio.innerHTML = cfg.profile.statementBio_en.includes('<p>') ? cfg.profile.statementBio_en : `<p>${cfg.profile.statementBio_en.replace(/\n\n/g, '</p><p>')}</p>`;
    } else if (!isEn && cfg.profile.statementBio) {
      stBio.innerHTML = cfg.profile.statementBio.includes('<p>') ? cfg.profile.statementBio : `<p>${cfg.profile.statementBio.replace(/\n\n/g, '</p><p>')}</p>`;
    } else {
      stBio.innerHTML = '<p>' + dict.bioP1 + '</p><p>' + dict.bioP2 + '</p>';
    }
  }
  setT('ui-cap-heading', dict.capHeading);
  setT('ui-cap1-title', dict.cap1Title);
  setT('ui-cap1-desc', dict.cap1Desc);
  setT('ui-cap2-title', dict.cap2Title);
  setT('ui-cap2-desc', dict.cap2Desc);
  setT('ui-cap3-title', dict.cap3Title);
  setT('ui-cap3-desc', dict.cap3Desc);
  setT('ui-cap4-title', dict.cap4Title);
  setT('ui-cap4-desc', dict.cap4Desc);
  setT('ui-stmt-cta-text', dict.stmtCtaText);
  setT('ui-statement-sig-role', dict.signatureRole);

  // Contact Section
  setT('ui-contact-tag', dict.contactTag);
  setT('ui-contact-heading', dict.contactHeading);
  setT('ui-contact-subtitle', dict.contactSubtitle);
  setHtml('contact-close-btn', '&times; ' + dict.close);
  setT('ui-availability-badge', dict.availBadge);
  setT('ui-clock-label', dict.clockLabel);
  setT('ui-ch-email-label', dict.chEmailLabel);
  setT('copy-email-btn', dict.btnCopy);
  setT('mail-email-btn', dict.btnWrite);
  setT('ui-ch-ig-label', dict.chIgLabel);
  setT('instagram-link-btn', dict.btnViewProfile);
  setT('ui-ch-be-label', dict.chBeLabel);
  setT('behance-link-btn', dict.btnPortfolio);
  setT('ui-ch-loc-label', dict.chLocLabel);
  setT('ui-loc-sub', dict.locSub);

  // Contact Form
  setT('ui-form-title', dict.formTitle);
  setT('ui-label-name', dict.labelName);
  setPh('form-name', dict.phName);
  setT('ui-label-email', dict.labelEmail);
  setPh('form-email', dict.phEmail);
  setT('ui-label-service', dict.labelService);
  const serviceSelect = document.getElementById('form-service');
  if (serviceSelect && dict.services) {
    const selIdx = serviceSelect.selectedIndex >= 0 ? serviceSelect.selectedIndex : 0;
    serviceSelect.innerHTML = dict.services.map((s, idx) => '<option value="' + s + '" ' + (idx === selIdx ? 'selected' : '') + '>' + s + '</option>').join('');
  }
  setT('ui-label-budget', dict.labelBudget);
  setPh('form-budget', dict.phBudget);
  setT('ui-label-message', dict.labelMessage);
  setPh('form-message', dict.phMessage);
  setT('ui-submit-btn-text', dict.btnSubmitText);
  setT('ui-feedback-title', dict.feedbackTitle);
  setT('ui-feedback-sub', dict.feedbackSub);
  setT('ui-btn-open-mail', dict.btnOpenMail);
  setT('ui-btn-copy-summary', dict.btnCopySummary);

  // Master Auth Modal
  const authTitle = document.querySelector('#master-auth-modal .auth-title');
  if (authTitle) authTitle.textContent = dict.authTitle;
  const authDesc = document.querySelector('#master-auth-modal .auth-desc');
  if (authDesc) authDesc.textContent = dict.authDesc;
  setPh('master-password-input', dict.authPlaceholder);
  setT('master-login-btn', dict.authLoginBtn);
  setT('auth-cancel-btn', dict.authCancelBtn);
}



/* ==========================================================================
   DEFAULT CONFIGURATION & DATA REPOSITORY
   ========================================================================== */
const DEFAULT_CONFIG = {
  "profile": {
    "name": "Wilmar Machado",
    "role": "Diseño Gráfico & Editorial · Arte Sacro",
    "role_en": "Graphic & Editorial Design · Sacred Art",
    "brandTitle": "Wilmar Machado · Archivo Visual",
    "brandSubtitle": "Colección de Obras & Proyectos · 2024–2026",
    "headlineTitle": "Portafolio",
    "headlineTitle_en": "Portfolio",
    "headlineSubtitle": "Diseño Gráfico, Diseño Editorial & Arte Sacro Contemporáneo · Selección de Proyectos & Perfil Profesional",
    "headlineSubtitle_en": "Graphic Design, Editorial Design & Contemporary Sacred Art · Selected Projects & Professional Profile",
    "gridTitle": "Catálogo Completo",
    "gridTitle_en": "Complete Catalog",
    "gridSubtitle": "Diez Obras Seleccionadas · Índice de 10 Obras",
    "gridSubtitle_en": "Ten Selected Works · 10 Works Index",
    "videoBrand": "ARCHIVO VISUAL",
    "videoBrand_en": "VISUAL ARCHIVE",
    "videoBadge": "PRÓLOGO INTERACTIVO",
    "videoGreeting": "Hola, Soy Wilmar",
    "videoSrc": "video.mp4",
    "statementTitle": "Manifiesto de Autor",
    "statementTitle_en": "Author's Manifesto",
    "statementSubtitle": "La tensión entre el misticismo sacro, la disciplina editorial y el claroscuro",
    "statementSubtitle_en": "The tension between sacred mysticism, editorial discipline, and chiaroscuro",
    "statementQuote": "“El diseño no es ornamento superficial; es la arquitectura visual de la memoria y la tensión plástica de la forma.”",
    "statementQuote_en": "“Design is not superficial ornament; it is the visual architecture of memory and the sculptural tension of form.”",
    "statementBio": "<p>Mi trabajo como creador visual y diseñador se sitúa en el umbral donde el rigor conceptual se encuentra con la profundidad emotiva. Cada obra parte del respeto por el espacio en blanco, la contundencia tipográfica y una narrativa que desafía la superficialidad de la inmediatez digital.</p><p>Desde Valledupar hacia el panorama visual contemporáneo, concibo el arte sacro, las publicaciones editoriales y la fotografía de estudio no como elementos aislados, sino como un diálogo continuo sobre la identidad, la fe, la soledad y la trascendencia estética.</p>",
    "statementBio_en": "<p>My work as a visual creator and designer is situated on the threshold where conceptual rigor meets emotional depth. Each piece stems from reverence for negative space, typographic conviction, and a narrative that defies the superficiality of digital immediacy.</p><p>From Valledupar to the contemporary visual sphere, I conceive sacred art, editorial publications, and studio photography not as isolated disciplines, but as a continuous dialogue on identity, faith, solitude, and aesthetic transcendence.</p>",
    "location": "Valledupar, Cesar, Colombia",
    "availability": "DISPONIBLE PARA PROYECTOS · Q4 2026 / 2027",
    "email": "wamimcim2@gmail.com",
    "instagram": "@wilmar.machado",
    "instagramUrl": "https://www.instagram.com/",
    "behance": "behance.net/wilmarmachado",
    "behanceUrl": "https://www.behance.net/",
    "menuFooterLeft": "Valledupar · Colombia · Alcance Global",
    "menuFooterRight": "Diseño Gráfico · Diseño Editorial · Arte Sacro"
  },
  "projects": [
    {
      "image": "images/obra-01.jpg",
      "id": "1kUdMl7BScjHoLJLuKhEM9zcM0SWR4BrU",
      "year": "2024",
      "category": "grafico",
      "title": "Conflict in the Mind",
      "title_en": "Conflict in the Mind",
      "place": "Arte Gráfico · Concepto de Portada de Álbum",
      "place_en": "Graphic Art · Album Cover Concept",
      "note": "Surrealismo oscuro y composición tipográfica experimental. Exploración visual de la dualidad mental a través de texturas analógicas y modelado escultórico en alto contraste.",
      "note_en": "Dark surrealism and experimental typographic composition. Visual exploration of mental duality through analog textures and sculptural modeling in high contrast.",
      "role": "Diseño Gráfico & Composición Tipográfica",
      "role_en": "Graphic Design & Typographic Composition",
      "medium": "Técnica Mixta Digital · Impresión Fine Art 310g",
      "medium_en": "Digital Mixed Media · 310g Fine Art Print",
      "typography": "Neue Haas Grotesk & Fraktur Custom",
      "client": "Sello Musical Independiente",
      "client_en": "Independent Music Label",
      "driveUrl": "https://drive.google.com/file/d/1kUdMl7BScjHoLJLuKhEM9zcM0SWR4BrU/view?usp=drivesdk"
    },
    {
      "image": "images/obra-02.jpg",
      "id": "1s6lwti7WrcAAWXN1FDCvncLIevFg2kgv",
      "year": "2025",
      "category": "sacro",
      "title": "Inevitable Ocaso",
      "title_en": "Inevitable Sunset",
      "place": "El Reino · Wilmar Machado 2025",
      "place_en": "The Kingdom · Wilmar Machado 2025",
      "note": "Diseño editorial y portada conceptual que combina escultura renacentista, vegetación y tipografía gótica. Reflexión visual sobre la caída del poder y el paso inexorable del tiempo.",
      "note_en": "Editorial design and conceptual cover combining renaissance sculpture, vegetation, and gothic typography. Visual reflection on the fall of power and the inexorable passage of time.",
      "role": "Diseño Editorial & Conceptualización Gráfica",
      "role_en": "Editorial Design & Graphic Conceptualization",
      "medium": "Composición Digital · Papel Hahnemühle 308g",
      "medium_en": "Digital Composition · Hahnemühle 308g Paper",
      "typography": "Cinzel Decorative & Cloister Black",
      "client": "Editorial The Kingdom",
      "client_en": "The Kingdom Publishing",
      "driveUrl": "https://drive.google.com/file/d/1s6lwti7WrcAAWXN1FDCvncLIevFg2kgv/view?usp=drivesdk"
    },
    {
      "image": "images/obra-03.jpg",
      "id": "1_f7I4HgQ7w51u2Kwo2yQ7S8itjpbozEZ",
      "year": "2024",
      "category": "foto",
      "title": "Vuelo Urbano",
      "title_en": "Urban Flight",
      "place": "Fotografía Callejera · Retrato en Terreno",
      "place_en": "Street Photography · Field Portrait",
      "note": "Fotografía urbana capturando un instante decisivo: el despegue sincronizado de las palomas frente al sujeto en un entorno de luz natural y encuadre espontáneo.",
      "note_en": "Urban street photography capturing a decisive moment: synchronized pigeon takeoff in front of the subject in natural light and spontaneous framing.",
      "role": "Fotografía Documental & Retrato en Terreno",
      "role_en": "Documentary Photography & Field Portraiture",
      "medium": "Fotografía Digital 35mm · Óptica 50mm f/1.4",
      "medium_en": "35mm Digital Photography · 50mm f/1.4 Lens",
      "typography": "Space Mono & Helvetica Neue",
      "client": "Archivo Documental Urbano",
      "client_en": "Urban Documentary Archive",
      "driveUrl": "https://drive.google.com/file/d/1_f7I4HgQ7w51u2Kwo2yQ7S8itjpbozEZ/view?usp=drivesdk"
    },
    {
      "image": "images/obra-04.jpg",
      "id": "1nC_BG7yBIWBaNgvXPQ-g6JebPmVihbNc",
      "year": "2025",
      "category": "foto",
      "title": "Conexión Íntima",
      "title_en": "Intimate Connection",
      "place": "Retrato de Estudio · Sesión Editorial",
      "place_en": "Studio Portrait · Editorial Session",
      "note": "Sesión fotográfica de estudio centrada en la intimidad y la complicidad de pareja. Esquema de iluminación suave de tres puntos con fondo neutro de degradado suave.",
      "note_en": "Studio portrait session centered on intimacy and couple complicity. Soft three-point lighting scheme with a neutral gradient backdrop.",
      "role": "Fotografía de Estudio & Esquema de Iluminación",
      "role_en": "Studio Photography & Lighting Design",
      "medium": "Formato Medio Digital · Iluminación Continua",
      "medium_en": "Digital Medium Format · Continuous Lighting",
      "typography": "Playfair Display & Inter Light",
      "client": "Sesión Editorial Privada",
      "client_en": "Private Editorial Session",
      "driveUrl": "https://drive.google.com/file/d/1nC_BG7yBIWBaNgvXPQ-g6JebPmVihbNc/view?usp=drivesdk"
    },
    {
      "image": "images/obra-05.jpg",
      "id": "1tErfd_njfYEoTHsJ3E90KcgJ9KI8OcfE",
      "year": "2025",
      "category": "editorial",
      "title": "Complex Xpress",
      "title_en": "Complex Xpress",
      "place": "Diseño Editorial · Tipografía Y2K",
      "place_en": "Editorial Design · Y2K Typography",
      "note": "Retrato editorial de moda con estética Y2K, yuxtaponiendo fotografía en blanco y negro con tipografía volumétrica iridiscente y texturas cromáticas de alto impacto.",
      "note_en": "Fashion editorial portrait with Y2K aesthetics, juxtaposing black-and-white photography with volumetric iridescent typography and high-impact chromatic textures.",
      "role": "Dirección Creativa & Tipografía Volumétrica",
      "role_en": "Creative Direction & Volumetric Typography",
      "medium": "Render 3D & Retoque Editorial Avanzado",
      "medium_en": "3D Render & Advanced Editorial Retouching",
      "typography": "Futura Bold & Liquid Chrome Bespoke",
      "client": "Revista Xpress Fashion",
      "client_en": "Xpress Fashion Magazine",
      "driveUrl": "https://drive.google.com/file/d/1tErfd_njfYEoTHsJ3E90KcgJ9KI8OcfE/view?usp=drivesdk"
    },
    {
      "image": "images/obra-06.jpg",
      "id": "1qdrQwLAgcDBnami8tUD-YsaOfW6fYwWu",
      "year": "2024",
      "category": "grafico",
      "title": "Serpent",
      "title_en": "Serpent",
      "place": "Diseño de Cartel · Archivo Heráldico 2024",
      "place_en": "Poster Design · Heraldic Archive 2024",
      "note": "Póster de arte gráfico e iconografía heráldica moderna. La serpiente enroscada representa el misterio y la sabiduría arcana, complementada con retícula geométrica y tipografía gótica.",
      "note_en": "Graphic art and modern heraldic iconography poster. The coiled serpent represents mystery and arcane wisdom, complemented by a geometric grid and gothic typography.",
      "role": "Diseño de Cartel & Vectorización Heráldica",
      "role_en": "Poster Design & Heraldic Vectorization",
      "medium": "Serigrafía Digital 3 Tintas · Papel Fedrigoni 250g",
      "medium_en": "3-Color Digital Serigraphy · Fedrigoni 250g Paper",
      "typography": "Ogg Roman & Gothic Bastarda",
      "client": "Colección Heráldica Wilmar Machado",
      "client_en": "Wilmar Machado Heraldic Collection",
      "driveUrl": "https://drive.google.com/file/d/1qdrQwLAgcDBnami8tUD-YsaOfW6fYwWu/view?usp=drivesdk"
    },
    {
      "image": "images/obra-07.jpg",
      "id": "1rPtZU7lpYOb1EnY-IPAfzicwce119xRq",
      "year": "2024",
      "category": "sacro",
      "title": "Divino Angel",
      "title_en": "Divine Angel",
      "place": "Arte Sacro Contemporáneo · Cartel Digital 2024",
      "place_en": "Contemporary Sacred Art · Digital Poster 2024",
      "note": "Composición de arte sacro contemporáneo que evoca el misticismo celestial. Marco de orla dorada, iluminación volumétrica entre nubes y diagramación simbólica estelar.",
      "note_en": "Contemporary sacred art composition evoking celestial mysticism. Golden halo border, volumetric lighting through clouds, and symbolic stellar diagramming.",
      "role": "Arte Sacro Digital & Tratamiento Dorado",
      "role_en": "Digital Sacred Art & Gold Leaf Finishing",
      "medium": "Pintura Digital & Orlas en Pan de Oro",
      "medium_en": "Digital Painting & Gold Leaf Accents",
      "typography": "Cormorant Garamond & Trajan Serif",
      "client": "Comisión Capilla Contemporánea",
      "client_en": "Contemporary Chapel Commission",
      "driveUrl": "https://drive.google.com/file/d/1rPtZU7lpYOb1EnY-IPAfzicwce119xRq/view?usp=drivesdk"
    },
    {
      "image": "images/obra-08.jpg",
      "id": "114uYCmwvhuasuLE6hxt1T00XsVsqpDY7",
      "year": "2024",
      "category": "foto",
      "title": "Monster / Prisión Interior",
      "title_en": "Monster / Inner Prison",
      "place": "Fotografía Conceptual · Narrativa Visual",
      "place_en": "Conceptual Photography · Visual Narrative",
      "note": "Obra de fotografía conceptual sobre el encierro mental y la autoexigencia. Encuadre circular focal con textura de semitono analógico y contraste emocional crudo.",
      "note_en": "Conceptual photography work exploring mental confinement and perfectionism. Circular focal framing with analog halftone texture and raw emotional contrast.",
      "role": "Fotografía Conceptual & Texturizado Analógico",
      "role_en": "Conceptual Photography & Analog Texturing",
      "medium": "Fotografía Analógica Forzada · Semitono Gráfico",
      "medium_en": "Pushed Analog Photography · Graphic Halftone",
      "typography": "GT America Mono & Editorial New",
      "client": "Exposición Colectiva 'Interior'",
      "client_en": "'Interior' Group Exhibition",
      "driveUrl": "https://drive.google.com/file/d/114uYCmwvhuasuLE6hxt1T00XsVsqpDY7/view?usp=drivesdk"
    },
    {
      "image": "images/obra-09.jpg",
      "id": "1q2x-CI2n4NgZx6ozDmosiFNJazhQyN8s",
      "year": "2024",
      "category": "editorial",
      "title": "Journey / El Camino",
      "title_en": "Journey / The Way",
      "place": "Estética Manga · Cartel Narrativo",
      "place_en": "Manga Aesthetic · Storyboard Poster",
      "note": "Diseño de cartel narrativo inspirado en la estética del cómic y manga japonés. Estructura de viñetas que desglosan un recorrido solitario hacia el horizonte.",
      "note_en": "Narrative poster design inspired by comic and Japanese manga aesthetics. Panel layout breaking down a solitary journey toward the horizon.",
      "role": "Composición Narrativa & Estética Gráfica",
      "role_en": "Narrative Composition & Graphic Aesthetics",
      "medium": "Entintado Digital & Retícula Cinematográfica",
      "medium_en": "Digital Inking & Cinematic Grid Layout",
      "typography": "Syne ExtraBold & Kanji Type",
      "client": "Serie Narrativa Visual",
      "client_en": "Visual Narrative Series",
      "driveUrl": "https://drive.google.com/file/d/1q2x-CI2n4NgZx6ozDmosiFNJazhQyN8s/view?usp=drivesdk"
    },
    {
      "image": "images/obra-10.jpg",
      "id": "1jMfHQDqfKzhL9SYMTy4GKvI8nFcyX0E_",
      "year": "2025",
      "category": "editorial",
      "title": "Amor Verdadero",
      "title_en": "True Love",
      "place": "Ensayo Visual · Diseño Editorial",
      "place_en": "Visual Essay · Editorial Design",
      "note": "Ensayo visual y diagramación editorial futurista que aborda la trascendencia del amor a través del espacio-tiempo, fusionando retratística humana con acentos cinéticos.",
      "note_en": "Visual essay and futuristic editorial layout exploring the transcendence of love across spacetime, fusing human portraiture with kinetic accents.",
      "role": "Ensayo Visual & Diagramación Editorial",
      "role_en": "Visual Essay & Editorial Layout",
      "medium": "Diseño Editorial Suizo · Acabado Barniz UVI",
      "medium_en": "Swiss Editorial Layout · Spot UV Finish",
      "typography": "Akzidenz-Grotesk & Bodoni Poster",
      "client": "Edición Limitada de Autor",
      "client_en": "Author's Limited Edition",
      "driveUrl": "https://drive.google.com/file/d/1jMfHQDqfKzhL9SYMTy4GKvI8nFcyX0E_/view?usp=drivesdk"
    }
  ],
  "categories": [
    {
      "id": "editorial",
      "name": "Diseño Editorial"
    },
    {
      "id": "sacro",
      "name": "Arte Sacro Contemporáneo"
    },
    {
      "id": "foto",
      "name": "Fotografía & Retrato"
    },
    {
      "id": "grafico",
      "name": "Arte Gráfico & Portadas"
    }
  ],
  "style": {
    "accent": "#c8a96e",
    "accentDim": "#9f824c",
    "bgPrimary": "#050507",
    "bgSurface": "#0e0e12",
    "sphereRadius": 950,
    "camZ": -180,
    "rotationSpeed": 0.003,
    "showVideoIntro": true
  },
  "styles": {
    "fontSerif": "Playfair Display, Georgia, serif",
    "fontSans": "Inter, -apple-system, sans-serif",
    "fontMono": "Space Mono, monospace",
    "accentColor": "#c8a96e",
    "bgDark": "#050507",
    "cardBg": "#0e0e12",
    "sphereRadius": 950,
    "cameraZ": -180,
    "sphereFriction": 0.94,
    "sphereRotateSpeed": 0.003
  }
};

// Application State Store
const STATE = {
  config: null,
  isAuthenticated: false,
  orbitPaused: false,
  cards: [],
  spherePositions: [],
  yaw: 0,
  pitch: 0,
  targetYaw: 0,
  targetPitch: 0,
  dollyZ: 0,
  targetDollyZ: 0,
  isDragging: false,
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0,
  velX: 0,
  velY: 0
};

// Storage manager & Cloud Bridge
function loadStoredConfig() {
  try {
    const saved = localStorage.getItem('wilmar_portfolio_config_v3');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_CONFIG,
        ...parsed,
        profile: { ...DEFAULT_CONFIG.profile, ...(parsed.profile || {}) },
        style: { ...DEFAULT_CONFIG.style, ...(parsed.style || {}) },
        projects: (parsed.projects && parsed.projects.length) ? parsed.projects : DEFAULT_CONFIG.projects
      };
    }
  } catch(e) {
    console.warn('Could not read stored config:', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
}

function saveConfigToStorage(cfg) {
  try {
    localStorage.setItem('wilmar_portfolio_config_v3', JSON.stringify(cfg));
  } catch(e) {
    console.warn('Could not save to localStorage:', e);
  }
}

// Live sync listener across tabs / mobile admin
window.addEventListener('storage', (e) => {
  if (e.key === 'wilmar_portfolio_config_v3' && e.newValue) {
    try {
      const updated = JSON.parse(e.newValue);
      STATE.config = updated;
      applyConfigToUI(updated);
      showToast('✦ Portafolio actualizado desde la Consola');
    } catch(err) {
      console.warn('Error applying storage update:', err);
    }
  }
});


// Toast notification system
function showToast(message) {
  const toast = document.getElementById('toast-msg');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

// Helper: Resolve image src (Local separate image files first, fallback to URL/Drive)
function getProjectImageSrc(item) {
  if (item.image) return item.image;
  if (item.url) return item.url;
  if (item.id) {
    if (item.id.startsWith('http://') || item.id.startsWith('https://')) return item.id;
    return `https://lh3.googleusercontent.com/d/${item.id}`;
  }
  return '';
}

function attachImageErrorFallback(imgEl, itemId) {
  if (!itemId || itemId.startsWith('http')) return;
  imgEl.onerror = function() {
    if (!this.dataset.retry) {
      this.dataset.retry = '1';
      this.src = `https://drive.google.com/thumbnail?id=${itemId}&sz=w1600`;
    }
  };
}

/* ==========================================================================
   DOM BINDING & LIVE UI UPDATE ENGINE
   ========================================================================== */
function applyConfigToUI(cfg) {
  const isEn = (currentLang === 'en');

  // Document title
  document.title = `${cfg.profile.name} — Portafolio de Proyectos & Archivo Visual`;

  // Logos & Brands
  const logo = document.getElementById('ui-brand-logo');
  if (logo) {
    const rawName = cfg.profile.name || 'Wilmar Machado';
    const parts = rawName.split(' ');
    if (parts.length >= 2) {
      const first = parts[0];
      const rest = parts.slice(1).join(' ');
      logo.innerHTML = `<span class="brand-first">${first}</span> <span class="brand-last">${rest}</span>`;
    } else {
      logo.textContent = rawName;
    }
  }
  const menuBrand = document.getElementById('ui-menu-brand');
  if (menuBrand) menuBrand.textContent = cfg.profile.name;
  const videoBrand = document.getElementById('ui-video-brand');
  if (videoBrand) videoBrand.textContent = isEn ? (cfg.profile.videoBrand_en || I18N.en.videoBrand) : (cfg.profile.videoBrand || I18N.es.videoBrand);
  const videoBadge = document.getElementById('ui-video-badge');
  if (videoBadge) videoBadge.textContent = cfg.profile.videoBadge || 'PRÓLOGO INTERACTIVO';
  const videoGreetingEl = document.getElementById('ui-video-greeting');
  if (videoGreetingEl) videoGreetingEl.textContent = cfg.profile.videoGreeting || 'Hola, Soy Wilmar';

  // Headlines with Language Awareness
  const hTitle = document.getElementById('ui-headline-title');
  if (hTitle) {
    hTitle.textContent = isEn ? I18N.en.headlineTitle : I18N.es.headlineTitle;
  }
  const hSub = document.getElementById('ui-headline-subtitle');
  if (hSub) {
    hSub.textContent = isEn ? I18N.en.headlineSubtitle : I18N.es.headlineSubtitle;
  }

  const gTitle = document.getElementById('ui-grid-title');
  if (gTitle) {
    gTitle.textContent = isEn
      ? (cfg.profile.gridTitle_en || OfflineTranslator.toEn(cfg.profile.gridTitle) || 'Complete Catalog')
      : (cfg.profile.gridTitle || 'Catálogo Completo');
  }
  const gSub = document.getElementById('ui-grid-subtitle');
  if (gSub) gSub.textContent = cfg.profile.gridSubtitle;

  // Menu footers
  const mfLeft = document.getElementById('ui-menu-footer-left');
  if (mfLeft) mfLeft.textContent = cfg.profile.menuFooterLeft;
  const mfRight = document.getElementById('ui-menu-footer-right');
  if (mfRight) mfRight.textContent = cfg.profile.menuFooterRight;

  // Statement Section
  const stTitle = document.getElementById('ui-statement-title');
  if (stTitle) stTitle.textContent = cfg.profile.statementTitle || 'Manifiesto de Autor';
  const stQuote = document.getElementById('ui-statement-quote');
  if (stQuote) stQuote.innerHTML = `&ldquo;${cfg.profile.statementQuote}&rdquo;`;
  const stBio = document.getElementById('ui-statement-bio');
  if (stBio) {
    stBio.innerHTML = cfg.profile.statementBio.includes('<p>') ? cfg.profile.statementBio : `<p>${cfg.profile.statementBio.replace(/\n\n/g, '</p><p>')}</p>`;
  }

  // Contact Section
  const availBadge = document.getElementById('ui-availability-badge');
  if (availBadge) availBadge.textContent = cfg.profile.availability.toUpperCase();

  const emailLink = document.getElementById('ui-contact-email-link');
  if (emailLink) {
    emailLink.textContent = cfg.profile.email;
    emailLink.href = `mailto:${cfg.profile.email}`;
  }
  const mailBtn = document.getElementById('mail-email-btn');
  if (mailBtn) mailBtn.href = `mailto:${cfg.profile.email}`;



  const igDisplay = document.getElementById('ui-instagram-display');
  if (igDisplay) igDisplay.textContent = cfg.profile.instagram || '@wilmar.machado';
  const igBtn = document.getElementById('instagram-link-btn');
  if (igBtn) igBtn.href = cfg.profile.instagramUrl || 'https://www.instagram.com/';

  const beDisplay = document.getElementById('ui-behance-display');
  if (beDisplay) beDisplay.textContent = cfg.profile.behance || 'Portafolio Behance';
  const beBtn = document.getElementById('behance-link-btn');
  if (beBtn) beBtn.href = cfg.profile.behanceUrl || 'https://www.behance.net/';

  const locDisplay = document.getElementById('ui-location-display');
  if (locDisplay) locDisplay.textContent = cfg.profile.location;

  // Apply Styles (CSS variables) with safe fallback
  const root = document.documentElement;
  const st = cfg.style || cfg.styles || {};
  const accentVal = st.accent || st.accentColor || '#c8a96e';
  const bgVal = st.bgPrimary || st.bgDark || '#050507';
  const surfVal = st.bgSurface || st.cardBg || '#0e0e12';
  const radVal = st.sphereRadius || 950;
  const camVal = st.camZ !== undefined ? st.camZ : (st.cameraZ !== undefined ? st.cameraZ : -180);

  root.style.setProperty('--accent', accentVal);
  if (st.accentDim) root.style.setProperty('--accent-dim', st.accentDim);
  root.style.setProperty('--bg-primary', bgVal);
  root.style.setProperty('--bg-surface', surfVal);

  if (window.innerWidth > 900) {
    root.style.setProperty('--sphere-radius', `${radVal}px`);
    root.style.setProperty('--cam-z', `${camVal}px`);
  } else {
    root.style.removeProperty('--sphere-radius');
    root.style.removeProperty('--cam-z');
  }

  // Regenerate Sphere & Grid
  rebuildSphereAndGrid(cfg);
}

// Rebuild Sphere and Grid cards according to config
function rebuildSphereAndGrid(cfg) {
  const world = document.getElementById('world');
  const gridContainer = document.getElementById('grid-container');
  if (!world || !gridContainer) return;

  // Remove existing cards
  const existingCards = world.querySelectorAll('.card');
  existingCards.forEach(c => c.remove());
  gridContainer.innerHTML = '';

  STATE.cards = [];
  const items = cfg.projects;
  const N = items.length;

  items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-index', i);
    card.setAttribute('data-category', item.category || 'all');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${item.title}, ${item.place}`);

    const imageSrc = getProjectImageSrc(item);
    card.innerHTML = `
      <div class="card-inner">
        <img class="card-img" src="${imageSrc}" alt="${item.title}" loading="eager" decoding="async" draggable="false" oncontextmenu="return false;">
        <div class="card-overlay"></div>
        <div class="card-meta">
          <div class="card-idx">${String(i + 1).padStart(2, '0')} / ${String(N).padStart(2, '0')}</div>
          <div class="card-title">${item.title}</div>
          <div class="card-place">${item.place}</div>
        </div>
      </div>
    `;
    const imgEl = card.querySelector('img');
    attachImageErrorFallback(imgEl, item.id);

    card.addEventListener('click', () => {
      if (STATE.touchMoved) {
        STATE.touchMoved = false;
        return;
      }
      card.classList.add('opening-pulse');
      setTimeout(() => card.classList.remove('opening-pulse'), 450);
      openLightbox(i);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.add('opening-pulse');
        setTimeout(() => card.classList.remove('opening-pulse'), 450);
        openLightbox(i);
      }
    });

    world.appendChild(card);
    STATE.cards.push(card);

    // Grid Item
    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    gridItem.setAttribute('data-index', i);
    gridItem.setAttribute('data-category', item.category || 'all');
    gridItem.setAttribute('role', 'button');
    gridItem.setAttribute('tabindex', '0');
    gridItem.innerHTML = `
      <div class="grid-thumb">
        <img src="${imageSrc}" alt="${item.title}" loading="eager" decoding="async" draggable="false" oncontextmenu="return false;">
      </div>
      <div class="grid-info">
        <div class="grid-idx">${String(i + 1).padStart(2, '0')} / ${String(N).padStart(2, '0')}</div>
        <div class="grid-title">${item.title}</div>
        <div class="grid-place">${item.place}</div>
      </div>
    `;
    const gImgEl = gridItem.querySelector('img');
    attachImageErrorFallback(gImgEl, item.id);

    gridItem.addEventListener('click', () => {
      gridItem.classList.add('opening-pulse');
      setTimeout(() => gridItem.classList.remove('opening-pulse'), 450);
      openLightbox(i);
    });
    gridItem.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        gridItem.classList.add('opening-pulse');
        setTimeout(() => gridItem.classList.remove('opening-pulse'), 450);
        openLightbox(i);
      }
    });
    gridContainer.appendChild(gridItem);
  });

  // Re-layout Fibonacci Sphere
  layoutSphere();

  // Re-apply curatorial filter if any
  if (typeof window.applyCurrentCategoryFilter === 'function') {
    window.applyCurrentCategoryFilter();
  }

  // Attach hover cursor state
  const customCursor = document.getElementById('custom-cursor');
  document.querySelectorAll('button, a, .card, .grid-item, .project-admin-row').forEach(el => {
    el.addEventListener('mouseenter', () => customCursor && customCursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => customCursor && customCursor.classList.remove('hovered'));
  });
}

// Curatorial Discipline Filter Controller
// Curatorial Discipline Filter Controller
function setCategoryFilter(category) {
  STATE.currentFilter = category || 'all';
  const isAll = (STATE.currentFilter === 'all');
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    const filterVal = pill.getAttribute('data-filter');
    const isActive = (filterVal === STATE.currentFilter);
    pill.classList.toggle('active', isActive);
    if (isActive && window.innerWidth <= 900) {
      try {
        pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } catch(e) {}
    }
  });

  const cards = document.querySelectorAll('#world .card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category') || 'all';
    const matches = (isAll || cardCat === STATE.currentFilter);
    if (isAll) {
      card.classList.remove('filtered-out');
      card.classList.remove('filtered-in');
      card.style.pointerEvents = 'auto';
    } else if (matches) {
      card.classList.remove('filtered-out');
      card.classList.add('filtered-in');
      card.style.pointerEvents = 'auto';
    } else {
      card.classList.add('filtered-out');
      card.classList.remove('filtered-in');
      card.style.pointerEvents = 'none';
    }
  });

  const gridItems = document.querySelectorAll('#grid-container .grid-item');
  gridItems.forEach(item => {
    const itemCat = item.getAttribute('data-category') || 'all';
    const matches = (isAll || itemCat === STATE.currentFilter);
    if (isAll) {
      item.classList.remove('filtered-out');
      item.classList.remove('filtered-in');
    } else if (matches) {
      item.classList.remove('filtered-out');
      item.classList.add('filtered-in');
    } else {
      item.classList.add('filtered-out');
      item.classList.remove('filtered-in');
    }
  });
}
window.setCategoryFilter = setCategoryFilter;
window.applyCurrentCategoryFilter = function() {
  setCategoryFilter(STATE.currentFilter || 'all');
};

// Wire curatorial discipline filter pills
function setupFilterPillEvents() {
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.onclick = (e) => {
      e.stopPropagation();
      const filter = pill.getAttribute('data-filter');
      setCategoryFilter(filter);
      pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      const isEn = (currentLang === 'en');
      const label = pill.querySelector('.filter-pill-name')?.textContent || filter;
      showToast(`✦ ${isEn ? 'Filter' : 'Filtro'}: ${label}`);
    };
  });
}
setupFilterPillEvents();

// Curatorial Filter Bar Mobile Scroll Controller
function initCuratorialFilterBar() {
  const bar = document.getElementById('curatorial-filter-bar');
  const container = document.getElementById('filter-pills-container');
  if (!bar || !container) return;

  function updateScrollState() {
    const sl = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    bar.classList.toggle('scrolled-left', sl > 6);
    bar.classList.toggle('scrolled-end', sl >= maxScroll - 6 || maxScroll <= 0);
  }

  container.addEventListener('scroll', updateScrollState, { passive: true });
  window.addEventListener('resize', updateScrollState, { passive: true });
  setTimeout(updateScrollState, 100);

  const btnPrev = document.getElementById('filter-scroll-prev');
  const btnNext = document.getElementById('filter-scroll-next');

  if (btnPrev) {
    btnPrev.onclick = (e) => {
      e.stopPropagation();
      container.scrollBy({ left: -140, behavior: 'smooth' });
    };
  }

  if (btnNext) {
    btnNext.onclick = (e) => {
      e.stopPropagation();
      container.scrollBy({ left: 140, behavior: 'smooth' });
    };
  }

  // Smooth mouse drag on desktop (never blocks pill taps or click events)
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let hasDragged = false;

  container.addEventListener('mousedown', (e) => {
    if (e.target.closest('.filter-pill, .filter-scroll-arrow')) return;
    isDown = true;
    hasDragged = false;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 8) {
      hasDragged = true;
      e.preventDefault();
      container.scrollLeft = scrollLeft - walk;
    }
  });
}

// Kinetic peek hint for mobile filter bar to visually demonstrate scrollability
function hintFilterBarScroll() {
  const container = document.getElementById('filter-pills-container');
  if (!container) return;
  if (window.innerWidth <= 900 && container.scrollWidth > container.clientWidth) {
    setTimeout(() => {
      container.scrollTo({ left: 45, behavior: 'smooth' });
      setTimeout(() => {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      }, 550);
    }, 750);
  }
}

function layoutSphere() {
  const style = getComputedStyle(document.documentElement);
  const defaultRadius = window.innerWidth <= 640 ? 540 : (window.innerWidth <= 900 ? 700 : 950);
  const radius = parseFloat(style.getPropertyValue('--sphere-radius')) || defaultRadius;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const N = STATE.cards.length;

  STATE.spherePositions = [];

  for (let i = 0; i < N; i++) {
    const y = N === 1 ? 0 : 1 - (i / (N - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    const px = x * radius;
    const py = y * radius;
    const pz = z * radius;

    const rotY = Math.atan2(x, z) * (180 / Math.PI);
    const rotX = -Math.asin(y) * (180 / Math.PI);

    STATE.spherePositions.push({ px, py, pz, rotX, rotY });

    if (STATE.cards[i]) {
      STATE.cards[i].style.transform = `translate3d(${px}px, ${py}px, ${pz}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    }
  }
}

/* ==========================================================================
   VIDEO PARALLAX INTRO CONTROLLER (HIGH FLUIDITY & ZERO LAG)
   ========================================================================== */
(function() {
  const videoStage = document.getElementById('video-stage');
  const videoFrame = document.getElementById('video-frame');
  const introVideo = document.getElementById('intro-video');
  const skipBtn = document.getElementById('video-skip-btn');
  const soundBtn = document.getElementById('video-sound-btn');
  const videoGreeting = document.getElementById('video-greeting');

  if (!introVideo || !videoStage) return;

  introVideo.controlsList = "nodownload nofullscreen noremoteplayback";
  introVideo.disablePictureInPicture = true;

  // Primary source: Load original high-quality video
  const vSrc = (STATE.config && STATE.config.profile && STATE.config.profile.videoSrc) || 'video.mp4';
  if (!introVideo.src || !introVideo.src.includes('.mp4')) {
    introVideo.src = vSrc;
  }

  let videoDuration = 5.50;
  let targetProgress = 0.0;
  let currentProgress = 0.0;
  let videoEnded = false;
  let queuedSeekTime = null;
  let lastLabelText = '';
  let playbackRateResetTimer = null;

  let mouseX = 0;
  let mouseY = 0;
  let currentTiltX = 0;
  let currentTiltY = 0;

  function hideGreeting() {
    if (videoGreeting) {
      videoGreeting.classList.add('faded');
      videoGreeting.setAttribute('data-hidden', 'true');
      videoGreeting.style.opacity = '0';
      videoGreeting.style.visibility = 'hidden';
      videoGreeting.style.pointerEvents = 'none';
    }
  }

  function showGreeting() {
    if (videoGreeting && !videoEnded && introVideo.paused && currentProgress <= 0.008) {
      videoGreeting.classList.remove('faded');
      videoGreeting.removeAttribute('data-hidden');
      videoGreeting.style.opacity = '1';
      videoGreeting.style.visibility = 'visible';
    }
  }

  /* ==========================================================================
     FLOATING SKILLS & WORK AREAS CONTROLLER (Dynamic Drifting Trajectories)
     ========================================================================== */
  const FLOATING_SKILLS = [
    {
      title_es: "Diseño Gráfico",
      title_en: "Graphic Design",
      start: 0.05,
      peak: 0.20,
      end: 0.35,
      startX: 47,
      startY: 17,
      endX: 53,
      endY: 23
    },
    {
      title_es: "Diseño Editorial",
      title_en: "Editorial Design",
      start: 0.30,
      peak: 0.44,
      end: 0.58,
      startX: 53,
      startY: 20,
      endX: 47,
      endY: 26
    },
    {
      title_es: "Arte Sacro",
      title_en: "Sacred Art",
      start: 0.53,
      peak: 0.67,
      end: 0.81,
      startX: 47,
      startY: 18,
      endX: 53,
      endY: 24
    },
    {
      title_es: "Fotografía",
      title_en: "Photography",
      start: 0.74,
      peak: 0.86,
      end: 0.96,
      startX: 53,
      startY: 21,
      endX: 47,
      endY: 27
    }
  ];

  function initFloatingTags() {
    const container = document.getElementById('video-floating-tags');
    if (!container) return;
    container.innerHTML = '';
    const isEn = (currentLang === 'en');

    FLOATING_SKILLS.forEach(item => {
      const div = document.createElement('div');
      div.className = 'floating-tag';
      div.style.left = `${item.startX}%`;
      div.style.top = `${item.startY}%`;

      const dot = document.createElement('span');
      dot.className = 'floating-tag-dot';

      const title = document.createElement('span');
      title.className = 'floating-tag-title';
      title.textContent = isEn ? item.title_en : item.title_es;

      div.appendChild(dot);
      div.appendChild(title);
      container.appendChild(div);

      item.element = div;
      item.titleEl = title;
    });
  }

  function updateFloatingTags(p) {
    if (videoEnded || videoStage.style.display === 'none') return;
    FLOATING_SKILLS.forEach(item => {
      const el = item.element;
      if (!el) return;

      if (p < item.start || p > item.end || p >= 0.96) {
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
        return;
      }

      // Normalized progress within this tag's lifespan (0.0 to 1.0)
      const normProgress = Math.max(0, Math.min(1.0, (p - item.start) / (item.end - item.start)));

      // Dynamic position interpolation along its drifting path
      const curX = item.startX + (item.endX - item.startX) * normProgress;
      const curY = item.startY + (item.endY - item.startY) * normProgress;

      el.style.left = `${curX.toFixed(2)}%`;
      el.style.top = `${curY.toFixed(2)}%`;

      let opacity = 0;
      let scale = 0.92;
      let tz = -15;

      if (p <= item.peak) {
        const inNorm = (p - item.start) / (item.peak - item.start);
        opacity = inNorm;
        scale = 0.92 + inNorm * 0.08;
        tz = -15 + inNorm * 20;
      } else {
        const outNorm = (p - item.peak) / (item.end - item.peak);
        opacity = Math.max(0, 1 - outNorm);
        scale = 1.0 + outNorm * 0.06;
        tz = 5 + outNorm * 15;
      }

      const parallaxX = currentTiltY * 6;
      const parallaxY = currentTiltX * 6;

      el.style.visibility = 'visible';
      el.style.opacity = opacity.toFixed(3);
      el.style.transform = `translate(-50%, -50%) translate3d(${parallaxX.toFixed(1)}px, ${parallaxY.toFixed(1)}px, ${tz.toFixed(1)}px) scale(${scale.toFixed(3)})`;
    });
  }

  window.updateFloatingTagsLanguage = function(lang) {
    const isEn = (lang === 'en');
    FLOATING_SKILLS.forEach(item => {
      if (item.titleEl) item.titleEl.textContent = isEn ? item.title_en : item.title_es;
    });
  };

  initFloatingTags();

  function syncVideoDuration() {
    if (introVideo.duration && !isNaN(introVideo.duration) && introVideo.duration > 0.5) {
      videoDuration = introVideo.duration;
    }
  }
  if (introVideo.readyState >= 1) {
    syncVideoDuration();
    if (introVideo.currentTime < 0.001) introVideo.currentTime = 0.001;
  } else {
    introVideo.addEventListener('loadedmetadata', () => {
      syncVideoDuration();
      introVideo.currentTime = 0.001;
    });
  }

  // Ensure video is strictly paused on load & refresh (never autoplay)
  introVideo.pause();

  let isAutoPlaying = false;

  // Toggle play / pause on click
  function startOrPauseVideo() {
    if (videoEnded) return;
    if (introVideo.paused) {
      if (introVideo.currentTime >= videoDuration - 0.25) {
        introVideo.currentTime = 0;
        currentProgress = 0;
      }
      hideGreeting();
      const playOverlay = document.getElementById('video-play-overlay');
      if (playOverlay) playOverlay.classList.add('hidden');
      isAutoPlaying = true;
      introVideo.play().catch(err => console.warn('Play notice:', err));
    } else {
      isAutoPlaying = false;
      introVideo.pause();
      const playOverlay = document.getElementById('video-play-overlay');
      if (playOverlay) playOverlay.classList.remove('hidden');
    }
  }

  // Mousemove: gentle tilt parallax for desktop viewing
  window.addEventListener('mousemove', (e) => {
    if (videoEnded || videoStage.style.display === 'none') return;
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  introVideo.addEventListener('play', () => {
    isAutoPlaying = true;
    hideGreeting();
    const playOverlay = document.getElementById('video-play-overlay');
    if (playOverlay) playOverlay.classList.add('hidden');
  });

  introVideo.addEventListener('pause', () => {
    isAutoPlaying = false;
    const playOverlay = document.getElementById('video-play-overlay');
    if (playOverlay) playOverlay.classList.remove('hidden');
    if (currentProgress <= 0.008 && !videoEnded) showGreeting();
  });

  // Clicking on video frame toggles play/pause (never skipping unintentionally)
  if (videoFrame) {
    videoFrame.addEventListener('click', (e) => {
      if (e.target.closest('.video-topbar-actions') || e.target.closest('.video-topbar') || e.target.closest('#video-greeting')) return;
      startOrPauseVideo();
    });
  }

  introVideo.addEventListener('error', (err) => {
    console.warn('Video notice:', err);
  });

  // Keyboard shortcut: Escape or Enter skips intro
  window.addEventListener('keydown', (e) => {
    if (videoStage && videoStage.style.display !== 'none' && !videoEnded) {
      if (e.key === 'Escape' || e.key === 'Enter') {
        e.preventDefault();
        completeVideoAndEnterArchive();
      }
    }
  });

  introVideo.addEventListener('ended', () => {
    completeVideoAndEnterArchive();
  });

  // Skip button inside video topbar
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      completeVideoAndEnterArchive();
    });
  }

  // Sound toggle button inside video topbar (Unified with Jazz Hop Engine)
  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.AmbientMusicEngine) {
        window.AmbientMusicEngine.toggle();
      }
    });
  }

  const replayLinks = document.querySelectorAll('[data-replay-video]');
  replayLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      replayVideoIntro();
    });
  });

  window.replayVideoIntro = function() {
    videoEnded = false;
    targetProgress = 0.0;
    currentProgress = 0.0;
    isAutoPlaying = false;
    introVideo.currentTime = 0;
    introVideo.pause();
    showGreeting();
    const playOverlay = document.getElementById('video-play-overlay');
    if (playOverlay) playOverlay.classList.remove('hidden');
    updateFloatingTags(0.0);

    const menu = document.getElementById('menu');
    const burger = document.getElementById('burger-btn');
    if (menu && menu.classList.contains('open')) {
      menu.classList.remove('open');
      if (burger) burger.setAttribute('aria-expanded', 'false');
    }

    const veil = document.getElementById('veil');
    if (veil) veil.classList.add('active');

    document.body.classList.remove('revealed');

    setTimeout(() => {
      videoStage.classList.remove('transitioning-out');
      videoStage.style.display = 'flex';
      videoStage.style.opacity = '1';
      videoStage.style.pointerEvents = 'auto';

      if (veil) veil.classList.remove('active');
      requestAnimationFrame(renderVideoLoop);
    }, 350);
  };

  window.completeVideoAndEnterArchive = function() {
    if (videoEnded) return;
    videoEnded = true;
    introVideo.pause();

    const videoStage = document.getElementById('video-stage');
    const veil = document.getElementById('veil');
    const flare = document.getElementById('portal-flare');

    // 1. Dynamic optical dive & flare shockwave
    if (videoStage) videoStage.classList.add('transitioning-out');
    if (veil) veil.classList.add('active');
    if (flare) flare.classList.add('flash');

    // 2. Prepare 3D Fibonacci Sphere starting from deep space with majestic angular sweep
    STATE.dollyZ = -550;
    STATE.targetDollyZ = 0;
    STATE.yaw -= 40;
    STATE.targetYaw += 80;

    setTimeout(() => {
      // 3. Dispatch enter-archive: reveals scene & triggers card entrance
      window.dispatchEvent(new CustomEvent('enter-archive'));

      // 4. Smoothly dissipate veil & flare
      setTimeout(() => {
        if (flare) flare.classList.remove('flash');
        if (veil) veil.classList.remove('active');
        if (videoStage) {
          videoStage.style.display = 'none';
          videoStage.classList.remove('transitioning-out');
        }
      }, 450);
    }, 400);
  };

  function renderVideoLoop() {
    if (videoEnded || videoStage.style.display === 'none') return;

    if (!introVideo.paused) {
      currentProgress = Math.max(0, Math.min(1.0, introVideo.currentTime / videoDuration));
      targetProgress = currentProgress;
      hideGreeting();
      const playOverlay = document.getElementById('video-play-overlay');
      if (playOverlay) playOverlay.classList.add('hidden');

      if (introVideo.currentTime >= videoDuration - 0.12 || currentProgress >= 0.985) {
        window.completeVideoAndEnterArchive();
        return;
      }
    } else {
      if (currentProgress <= 0.01 && !videoEnded) {
        showGreeting();
        const playOverlay = document.getElementById('video-play-overlay');
        if (playOverlay) playOverlay.classList.remove('hidden');
      }
    }

    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      videoFrame.style.transform = 'none';
    } else {
      currentTiltX += (mouseY - currentTiltX) * 0.06;
      currentTiltY += (mouseX - currentTiltY) * 0.06;

      const scale = 0.88 + Math.pow(currentProgress, 1.35) * 0.22;
      const rotX = -currentTiltX * 3.5;
      const rotY = currentTiltY * 4.0;
      const transX = currentTiltY * 12;
      const transY = currentTiltX * 12;

      videoFrame.style.transform = `scale(${scale}) translate3d(${transX}px, ${transY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }

    updateFloatingTags(currentProgress);
    requestAnimationFrame(renderVideoLoop);
  }

  // Check if video intro is enabled in config
  const initialCfg = loadStoredConfig();
  if (initialCfg.style && initialCfg.style.showVideoIntro === false) {
    videoStage.style.display = 'none';
    window.dispatchEvent(new CustomEvent('enter-archive'));
  } else {
    requestAnimationFrame(renderVideoLoop);
  }
})();

/* ==========================================================================
   3D FIBONACCI PHOTO SPHERE SCENE ENGINE
   ========================================================================== */
(function() {
  const world = document.getElementById('world');
  const viewport = document.getElementById('viewport');
  const headline = document.getElementById('headline');
  const gridView = document.getElementById('grid-view');
  const viewToggle = document.getElementById('view-toggle');
  const viewLabel = document.getElementById('view-label');
  const gridCloseBtn = document.getElementById('grid-close-btn');
  const customCursor = document.getElementById('custom-cursor');

  viewport.addEventListener('mousedown', (e) => {
    if (e.target.closest('.card')) return;
    STATE.isDragging = true;
    STATE.startX = e.clientX;
    STATE.startY = e.clientY;
    STATE.lastX = e.clientX;
    STATE.lastY = e.clientY;
    STATE.velX = 0;
    STATE.velY = 0;
  });

  window.addEventListener('mousemove', (e) => {
    if (customCursor) {
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
    }

    if (!STATE.isDragging) return;
    const dx = e.clientX - STATE.lastX;
    const dy = e.clientY - STATE.lastY;
    STATE.lastX = e.clientX;
    STATE.lastY = e.clientY;

    STATE.velX = dx * 0.25;
    STATE.velY = dy * 0.25;

    STATE.targetYaw += STATE.velX;
    STATE.targetPitch = Math.max(-55, Math.min(55, STATE.targetPitch - STATE.velY));
  });

  window.addEventListener('mouseup', () => {
    STATE.isDragging = false;
  });

  // Mobile Touch Support for 3D Fibonacci Sphere (Touch anywhere, even on cards, to rotate smoothly)
  viewport.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      STATE.isDragging = true;
      STATE.touchMoved = false;
      STATE.startX = e.touches[0].clientX;
      STATE.startY = e.touches[0].clientY;
      STATE.lastX = e.touches[0].clientX;
      STATE.lastY = e.touches[0].clientY;
      STATE.velX = 0;
      STATE.velY = 0;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!STATE.isDragging || e.touches.length !== 1) return;
    const curX = e.touches[0].clientX;
    const curY = e.touches[0].clientY;
    const dx = curX - STATE.lastX;
    const dy = curY - STATE.lastY;
    if (Math.abs(curX - STATE.startX) > 8 || Math.abs(curY - STATE.startY) > 8) {
      STATE.touchMoved = true;
    }
    STATE.lastX = curX;
    STATE.lastY = curY;

    STATE.velX = dx * 0.28;
    STATE.velY = dy * 0.28;

    STATE.targetYaw += STATE.velX;
    STATE.targetPitch = Math.max(-55, Math.min(55, STATE.targetPitch - STATE.velY));
  }, { passive: true });

  window.addEventListener('touchend', () => {
    STATE.isDragging = false;
    setTimeout(() => {
      STATE.touchMoved = false;
    }, 100);
  }, { passive: true });

  window.addEventListener('wheel', (e) => {
    const videoStage = document.getElementById('video-stage');
    if (videoStage && videoStage.style.display !== 'none') return;
    if (gridView.classList.contains('active')) return;
    const modals = document.querySelectorAll('.overlay-modal.active, #lightbox.active, #master-console.active');
    if (modals.length > 0) return;

    STATE.targetDollyZ = Math.max(-450, Math.min(300, STATE.targetDollyZ - e.deltaY * 0.45));
  }, { passive: true });

  function animateSphereLoop() {
    const currentSpeed = (STATE.config && STATE.config.style && STATE.config.style.rotationSpeed !== undefined)
      ? STATE.config.style.rotationSpeed
      : 0.04;

    if (!STATE.isDragging) {
      STATE.velX *= 0.94;
      STATE.velY *= 0.94;
      STATE.targetYaw += STATE.velX;
      STATE.targetPitch = Math.max(-55, Math.min(55, STATE.targetPitch - STATE.velY));
      if (!STATE.orbitPaused) {
        STATE.targetYaw += currentSpeed; // rotation velocity
      }
    }

    if (window.AmbientMusicEngine && window.AmbientMusicEngine.isActive) {
      const motion = Math.abs(STATE.velX) + Math.abs(STATE.velY);
      window.AmbientMusicEngine.modulate(motion);
    }

    STATE.yaw += (STATE.targetYaw - STATE.yaw) * 0.08;
    STATE.pitch += (STATE.targetPitch - STATE.pitch) * 0.08;
    STATE.dollyZ += (STATE.targetDollyZ - STATE.dollyZ) * 0.08;

    const style = getComputedStyle(document.documentElement);
    const defaultCamZ = window.innerWidth <= 640 ? -220 : (window.innerWidth <= 900 ? -200 : -180);
    const baseCamZ = parseFloat(style.getPropertyValue('--cam-z')) || defaultCamZ;
    const currentCamZ = baseCamZ + STATE.dollyZ;

    if (world) {
      world.style.transform = `translateZ(${currentCamZ}px) rotateX(${STATE.pitch}deg) rotateY(${STATE.yaw}deg)`;
    }

    if (headline) {
      headline.style.transform = `translate(-50%, -50%) rotateY(${-STATE.yaw}deg) rotateX(${-STATE.pitch}deg)`;
    }

    requestAnimationFrame(animateSphereLoop);
  }

  animateSphereLoop();

  window.addEventListener('enter-archive', () => {
    layoutSphere();
    document.body.classList.add('revealed');

    setTimeout(() => {
      if (typeof hintFilterBarScroll === 'function') hintFilterBarScroll();
    }, 600);
  });

  function syncViewModeUI(isGrid) {
    const btnSphere = document.getElementById('btn-view-sphere');
    const btnGrid = document.getElementById('btn-view-grid');
    if (btnSphere && btnGrid) {
      if (isGrid) {
        btnSphere.classList.remove('active');
        btnGrid.classList.add('active');
        btnSphere.setAttribute('aria-pressed', 'false');
        btnGrid.setAttribute('aria-pressed', 'true');
      } else {
        btnSphere.classList.add('active');
        btnGrid.classList.remove('active');
        btnSphere.setAttribute('aria-pressed', 'true');
        btnGrid.setAttribute('aria-pressed', 'false');
      }
    }
    const dict = I18N[currentLang] || I18N.es;
    if (viewLabel) {
      viewLabel.textContent = isGrid ? dict.viewSphere : dict.viewGrid;
    }
  }

  function toggleGrid(forceGrid) {
    const isGrid = (typeof forceGrid === 'boolean') ? forceGrid : !gridView.classList.contains('active');
    if (isGrid) {
      gridView.classList.add('active');
      document.body.style.overflowY = 'auto';
    } else {
      gridView.classList.remove('active');
      document.body.style.overflowY = 'hidden';
      layoutSphere();
    }
    syncViewModeUI(isGrid);
    if (navigator.vibrate) {
      try { navigator.vibrate(18); } catch(e) {}
    }
  }

  // Segmented Switch event listeners (100% Icon-Based)
  const btnViewSphere = document.getElementById('btn-view-sphere');
  const btnViewGrid = document.getElementById('btn-view-grid');
  if (btnViewSphere) {
    btnViewSphere.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleGrid(false);
    });
  }
  if (btnViewGrid) {
    btnViewGrid.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleGrid(true);
    });
  }

  if (viewToggle) {
    viewToggle.addEventListener('click', (e) => {
      if (!e.target.closest('.view-mode-btn')) {
        toggleGrid();
      }
    });
  }

  // Quick-action grid toggle in bottom orbit bar
  const btnOrbitGridToggle = document.getElementById('btn-orbit-grid-toggle');
  if (btnOrbitGridToggle) {
    btnOrbitGridToggle.addEventListener('click', () => {
      toggleGrid(true);
    });
  }

  // Bilingual toggle button listener
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', (e) => {
      const targetOpt = e.target.closest('.lang-opt');
      if (targetOpt) {
        if (targetOpt.id.includes('en')) {
          applyLanguage('en');
        } else if (targetOpt.id.includes('es')) {
          applyLanguage('es');
        } else {
          applyLanguage(currentLang === 'es' ? 'en' : 'es');
        }
      } else {
        applyLanguage(currentLang === 'es' ? 'en' : 'es');
      }
      showToast(currentLang === 'es' ? 'Idioma: Español' : 'Language: English');
    });
  }

  // Bilingual toggle button listener inside Lightbox Topbar
  const lbLangToggleBtn = document.getElementById('lightbox-lang-toggle');
  if (lbLangToggleBtn) {
    lbLangToggleBtn.addEventListener('click', (e) => {
      const targetOpt = e.target.closest('.lang-opt');
      if (targetOpt) {
        if (targetOpt.id.includes('en')) {
          applyLanguage('en');
        } else if (targetOpt.id.includes('es')) {
          applyLanguage('es');
        } else {
          applyLanguage(currentLang === 'es' ? 'en' : 'es');
        }
      } else {
        applyLanguage(currentLang === 'es' ? 'en' : 'es');
      }
      showToast(currentLang === 'es' ? 'Idioma: Español' : 'Language: English');
    });
  }

  if (gridCloseBtn) {
    gridCloseBtn.addEventListener('click', toggleGrid);
  }
  window.toggleGridView = toggleGrid;

  window.addEventListener('resize', () => {
    const root = document.documentElement;
    const cfg = STATE.config || DEFAULT_CONFIG;
    const st = cfg.style || cfg.styles || {};
    const radVal = st.sphereRadius || 950;
    const camVal = st.camZ !== undefined ? st.camZ : (st.cameraZ !== undefined ? st.cameraZ : -180);
    if (window.innerWidth > 900) {
      root.style.setProperty('--sphere-radius', `${radVal}px`);
      root.style.setProperty('--cam-z', `${camVal}px`);
    } else {
      root.style.removeProperty('--sphere-radius');
      root.style.removeProperty('--cam-z');
    }
    layoutSphere();
  });
})();

/* ==========================================================================
   LIGHTBOX CONTROLLER
   ========================================================================== */
/* ==========================================================================
   ENHANCED LIGHTBOX CONTROLLER: BILINGUAL SPECS, PROCESS MODES & INQUIRE
   ========================================================================== */

let currentProcessMode = 'final';

function setLightboxProcessMode(mode) {
  currentProcessMode = mode || 'final';
  const img = document.getElementById('lightbox-img');
  const overlay = document.getElementById('process-overlay');
  const btns = document.querySelectorAll('.lb-switch-btn');

  btns.forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-mode') === currentProcessMode);
  });

  if (!img) return;

  if (currentProcessMode === 'final') {
    img.style.transform = 'scale(1)';
    img.style.filter = 'none';
    if (overlay) overlay.classList.remove('active');
  } else if (currentProcessMode === 'process') {
    img.style.transform = 'scale(1)';
    img.style.filter = 'grayscale(100%) contrast(155%) brightness(105%)';
    if (overlay) overlay.classList.add('active');
  } else if (currentProcessMode === 'texture') {
    img.style.transform = 'scale(2.2)';
    img.style.filter = 'contrast(120%) brightness(100%)';
    if (overlay) overlay.classList.remove('active');
  }
}

function openLightbox(index) {
  const cfg = STATE.config || DEFAULT_CONFIG;
  const items = cfg.projects;
  if (!items || !items[index]) return;
  STATE.currentLightboxIndex = index;
  const item = items[index];
  const N = items.length;

  if (window.AmbientMusicEngine && typeof window.AmbientMusicEngine.duck === 'function') {
    window.AmbientMusicEngine.duck(true);
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxIndex = document.getElementById('lightbox-index');
  const lightboxYear = document.getElementById('lightbox-year');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxPlace = document.getElementById('lightbox-place');
  const lightboxNote = document.getElementById('lightbox-note');

  // Specs Elements
  const lbRole = document.getElementById('lightbox-role');
  const lbMedium = document.getElementById('lightbox-medium');
  const lbTypo = document.getElementById('lightbox-typography');
  const lbClient = document.getElementById('lightbox-client');

  // Reset visual mode to 'final'
  setLightboxProcessMode('final');

  const imageSrc = getProjectImageSrc(item);
  if (lightboxImg) {
    if (lightbox && lightbox.classList.contains('active') && lightboxImg.src !== imageSrc) {
      lightboxImg.style.opacity = '0.35';
      lightboxImg.style.transform = 'scale(0.97)';
      setTimeout(() => {
        lightboxImg.src = imageSrc;
        lightboxImg.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
      }, 70);
    } else {
      lightboxImg.src = imageSrc;
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transform = 'scale(1)';
    }
    attachImageErrorFallback(lightboxImg, item.id);
  }

  // Display texts according to currentLang
  const isEn = (currentLang === 'en');
  if (lightboxIndex) lightboxIndex.textContent = `${String(index + 1).padStart(2, '0')} / ${String(N).padStart(2, '0')}`;
  if (lightboxYear) lightboxYear.textContent = item.year || '2025';

  const topBadge = document.getElementById('lightbox-top-badge');
  if (topBadge) {
    topBadge.textContent = `${String(index + 1).padStart(2, '0')} / ${String(N).padStart(2, '0')} · ${isEn ? 'ARCHIVE' : 'ARCHIVO'}`;
  }

  if (lightboxTitle) {
    lightboxTitle.textContent = isEn ? (item.title_en || OfflineTranslator.toEn(item.title)) : item.title;
  }
  if (lightboxPlace) {
    lightboxPlace.textContent = isEn ? (item.place_en || OfflineTranslator.toEn(item.place)) : item.place;
  }
  if (lightboxNote) {
    lightboxNote.textContent = isEn ? (item.note_en || OfflineTranslator.toEn(item.note)) : item.note;
  }

  // Populate technical specifications
  if (lbRole) {
    const rVal = isEn ? (item.role_en || OfflineTranslator.toEn(item.role || 'Graphic Design & Composition')) : (item.role || 'Diseño Gráfico & Composición');
    lbRole.textContent = rVal;
  }
  if (lbMedium) {
    const mVal = isEn ? (item.medium_en || OfflineTranslator.toEn(item.medium || 'Digital Composition & Fine Art Print')) : (item.medium || 'Composición Digital & Impresión Fine Art');
    lbMedium.textContent = mVal;
  }
  if (lbTypo) {
    lbTypo.textContent = item.typography || 'Cormorant Garamond & Cinzel Custom';
  }
  if (lbClient) {
    const cVal = isEn ? (item.client_en || OfflineTranslator.toEn(item.client || "Author's Collection")) : (item.client || 'Colección Autoral');
    lbClient.textContent = cVal;
  }


  // Populate Share Button (Opens Multi-App Share Modal)
  const shareBtn = document.getElementById('lightbox-share-btn');
  if (shareBtn) {
    shareBtn.onclick = () => {
      if (typeof openShareModal === 'function') {
        openShareModal(index);
      }
    };
  }

  // Render quickstrip navigation
  renderLightboxQuickstrip(index, N);

  // Sync URL hash
  try {
    history.replaceState(null, '', `#obra-${index + 1}`);
  } catch(e) {}

  if (lightbox) lightbox.classList.add('active');
}

function renderLightboxQuickstrip(currentIndex, totalCount) {
  const container = document.getElementById('lightbox-quickstrip');
  if (!container) return;
  const cfg = STATE.config || DEFAULT_CONFIG;
  const items = cfg.projects || [];
  const isEn = (currentLang === 'en');

  container.innerHTML = '';
  for (let i = 0; i < totalCount; i++) {
    const dot = document.createElement('button');
    dot.className = 'quickstrip-dot' + (i === currentIndex ? ' active' : '');
    dot.type = 'button';
    const item = items[i];
    const dotTitle = item ? (isEn ? (item.title_en || item.title) : item.title) : `Obra ${i + 1}`;
    dot.title = `${String(i + 1).padStart(2, '0')}. ${dotTitle}`;
    dot.setAttribute('aria-label', dot.title);
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(i);
    });
    container.appendChild(dot);
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) lightbox.classList.remove('active');
  setLightboxProcessMode('final');

  if (window.AmbientMusicEngine && typeof window.AmbientMusicEngine.duck === 'function') {
    window.AmbientMusicEngine.duck(false);
  }

  try {
    if (window.location.hash.startsWith('#obra-')) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  } catch(e) {}
}

// Lightbox Prev / Next Handlers
function lightboxPrev() {
  const cfg = STATE.config || DEFAULT_CONFIG;
  const N = cfg.projects.length;
  if (!N) return;
  const idx = ((STATE.currentLightboxIndex || 0) - 1 + N) % N;
  openLightbox(idx);
}

function lightboxNext() {
  const cfg = STATE.config || DEFAULT_CONFIG;
  const N = cfg.projects.length;
  if (!N) return;
  const idx = ((STATE.currentLightboxIndex || 0) + 1) % N;
  openLightbox(idx);
}

// Inquire Similar Project Action
function inquireSimilarProject() {
  const cfg = STATE.config || DEFAULT_CONFIG;
  const idx = STATE.currentLightboxIndex !== undefined ? STATE.currentLightboxIndex : 0;
  const item = cfg.projects[idx] || cfg.projects[0];
  if (!item) return;

  closeLightbox();

  // Open contact modal
  const contactModal = document.getElementById('contact-modal');
  if (contactModal) contactModal.classList.add('active');

  const isEn = (currentLang === 'en');
  const projTitle = isEn ? (item.title_en || item.title) : item.title;
  const projPlace = isEn ? (item.place_en || item.place) : item.place;

  // Pre-fill message
  const msgEl = document.getElementById('form-message');
  if (msgEl) {
    if (isEn) {
      msgEl.value = `Hello Wilmar, I am interested in commissioning an artwork or project similar to "${projTitle}" (${projPlace}). I would like to discuss availability and scope.`;
    } else {
      msgEl.value = `Hola Wilmar, me interesa encargar una obra o proyecto similar a "${projTitle}" (${projPlace}). Quisiera conversar sobre disponibilidad y presupuesto.`;
    }
  }

  // Pre-select service if possible
  const svcEl = document.getElementById('form-service');
  if (svcEl && item.place) {
    const pLower = item.place.toLowerCase();
    if (pLower.includes('sacro') || pLower.includes('sacred')) {
      for (let i = 0; i < svcEl.options.length; i++) {
        if (svcEl.options[i].value.toLowerCase().includes('sacro') || svcEl.options[i].value.toLowerCase().includes('sacred')) {
          svcEl.selectedIndex = i;
          break;
        }
      }
    } else if (pLower.includes('editorial') || pLower.includes('tipograf') || pLower.includes('typograph')) {
      for (let i = 0; i < svcEl.options.length; i++) {
        if (svcEl.options[i].value.toLowerCase().includes('editorial')) {
          svcEl.selectedIndex = i;
          break;
        }
      }
    } else if (pLower.includes('fotograf') || pLower.includes('portrait') || pLower.includes('retrato')) {
      for (let i = 0; i < svcEl.options.length; i++) {
        if (svcEl.options[i].value.toLowerCase().includes('fotograf') || svcEl.options[i].value.toLowerCase().includes('portrait')) {
          svcEl.selectedIndex = i;
          break;
        }
      }
    }
  }

  const nameInput = document.getElementById('form-name');
  if (nameInput) setTimeout(() => nameInput.focus(), 300);

  showToast(isEn ? 'Project linked to proposal form!' : '¡Proyecto vinculado al formulario de contacto!');
}

// Lightbox Listeners
const lbCloseBtn = document.getElementById('lightbox-close-btn');
if (lbCloseBtn) lbCloseBtn.addEventListener('click', closeLightbox);

const lbEl = document.getElementById('lightbox');
if (lbEl) {
  lbEl.addEventListener('click', (e) => {
    if (e.target === lbEl) closeLightbox();
  });
}

const lbPrevBtn = document.getElementById('lightbox-prev-btn');
if (lbPrevBtn) lbPrevBtn.addEventListener('click', lightboxPrev);

const lbNextBtn = document.getElementById('lightbox-next-btn');
if (lbNextBtn) lbNextBtn.addEventListener('click', lightboxNext);

const lbInquireBtn = document.getElementById('lightbox-inquire-btn');
if (lbInquireBtn) lbInquireBtn.addEventListener('click', inquireSimilarProject);

// Lightbox Process Mode Buttons
const modeBtns = document.querySelectorAll('.lb-switch-btn');
modeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.getAttribute('data-mode');
    setLightboxProcessMode(mode);
  });
});

// Keyboard Navigation for Lightbox & Modals
window.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (lb && lb.classList.contains('active')) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      lightboxPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      lightboxNext();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeLightbox();
    }
  }
});

// Mobile Touch Swipe Navigation for Lightbox (Left / Right swipe to switch artworks)
(function initLightboxSwipe() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  let startX = 0;
  let startY = 0;
  let isSwiping = false;

  lb.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwiping = true;
    }
  }, { passive: true });

  lb.addEventListener('touchend', (e) => {
    if (!isSwiping || e.changedTouches.length !== 1) return;
    isSwiping = false;
    const diffX = e.changedTouches[0].clientX - startX;
    const diffY = e.changedTouches[0].clientY - startY;

    // Trigger only on clear horizontal gesture (min 45px distance and 1.6x horizontal dominance)
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.6) {
      if (diffX < 0) {
        lightboxNext();
      } else {
        lightboxPrev();
      }
    }
  }, { passive: true });
})();

/* ==========================================================================
   MENU & MODAL OVERLAYS (Contact & Statement)
   ========================================================================== */
(function() {
  const menu = document.getElementById('menu');
  const burgerBtn = document.getElementById('burger-btn');
  const menuCloseBtn = document.getElementById('menu-close-btn');

  const contactModal = document.getElementById('contact-modal');
  const contactCloseBtn = document.getElementById('contact-close-btn');

  const statementModal = document.getElementById('statement-modal');
  const statementCloseBtn = document.getElementById('statement-close-btn');

  function openMenu() {
    menu.classList.add('open');
    burgerBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menu.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
  }

  burgerBtn.addEventListener('click', () => {
    if (menu.classList.contains('open')) closeMenu();
    else openMenu();
  });

  menuCloseBtn.addEventListener('click', closeMenu);

  function openContact() {
    closeMenu();
    closeLightbox();
    statementModal.classList.remove('active');
    contactModal.classList.add('active');
  }

  function closeContact() {
    contactModal.classList.remove('active');
  }

  function openStatement() {
    closeMenu();
    closeLightbox();
    contactModal.classList.remove('active');
    statementModal.classList.add('active');
  }

  function closeStatement() {
    statementModal.classList.remove('active');
  }

  contactCloseBtn.addEventListener('click', closeContact);
  statementCloseBtn.addEventListener('click', closeStatement);

  window.openContactModal = openContact;
  window.openStatementModal = openStatement;

  const stmtToContact = document.getElementById('statement-to-contact-btn');
  if (stmtToContact) {
    stmtToContact.addEventListener('click', () => {
      closeStatement();
      openContact();
    });
  }

  // Menu links routing
  document.querySelectorAll('[data-menu-action]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const action = link.getAttribute('data-menu-action');
      closeMenu();

      const gridView = document.getElementById('grid-view');
      if (action === 'grid') {
        if (!gridView.classList.contains('active')) window.toggleGridView();
      } else if (action === 'sphere') {
        if (gridView.classList.contains('active')) window.toggleGridView();
      } else if (action === 'contact') {
        openContact();
      } else if (action === 'statement') {
        openStatement();
      }
    });
  });

  // Valledupar Real-Time Clock Widget (UTC-5)
  function updateValleduparClock() {
    const clockEl = document.getElementById('clock-time');
    if (!clockEl) return;
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('es-CO', {
        timeZone: 'America/Bogota',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      clockEl.textContent = formatter.format(now);
    } catch(e) {
      clockEl.textContent = new Date().toLocaleTimeString();
    }
  }
  updateValleduparClock();
  setInterval(updateValleduparClock, 1000);

  // Email Copy button
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = STATE.config?.profile?.email || 'wamimcim2@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('¡Correo copiado al portapapeles!');
      }).catch(() => {
        showToast(`Correo: ${email}`);
      });
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  const feedbackBox = document.getElementById('form-feedback-box');
  let preparedMailto = '';
  let preparedText = '';

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const service = document.getElementById('form-service').value;
      const budget = document.getElementById('form-budget').value.trim();
      const message = document.getElementById('form-message').value.trim();

      const recipient = STATE.config?.profile?.email || 'wamimcim2@gmail.com';
      const subject = encodeURIComponent(`Propuesta de Proyecto [${service}] — ${name}`);
      const body = encodeURIComponent(
        `Hola Wilmar,

Mi nombre es ${name} (${email}).
Tipo de Obra: ${service}
Presupuesto / Cronograma: ${budget || 'A definir'}

Descripción del Proyecto:
${message}

---
Enviado desde el Portafolio Oficial de Wilmar Machado`
      );

      preparedMailto = `mailto:${recipient}?subject=${subject}&body=${body}`;
      preparedText = `Propuesta de ${name} (${email})
Disciplina: ${service}
Presupuesto: ${budget}
Mensaje:
${message}`;

      // Automatically register order into Studio Master Console Inbox
      const newInquiry = {
        id: 'ped_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        timestamp: new Date().toISOString(),
        dateFormatted: new Intl.DateTimeFormat('es-CO', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }).format(new Date()),
        name: name,
        email: email,
        service: service,
        budget: budget || (currentLang === 'en' ? 'To be agreed' : 'A convenir'),
        message: message,
        status: 'unread',
        read: false
      };

      try {
        const storedOrders = JSON.parse(localStorage.getItem('wm_orders_inbox') || '[]');
        storedOrders.unshift(newInquiry);
        localStorage.setItem('wm_orders_inbox', JSON.stringify(storedOrders));

        if (typeof BroadcastChannel !== 'undefined') {
          const bc = new BroadcastChannel('wm_orders_channel');
          bc.postMessage({ type: 'NEW_ORDER', order: newInquiry });
          bc.close();
        }

        // Direct Cloud Sync to Supabase Database (Guarantees instant global delivery to Wilmar's phone)
        const SB_URL = 'https://kigexuraqzhplvacghcq.supabase.co';
        const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpZ2V4dXJhcXpocGx2YWNnaGNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5MTE4NjcsImV4cCI6MjEwNjQ4Nzg2N30.JI69bv1oBpv0_11J3XRyv7FI8obkXzqDdQWMeF_kgA0';
        fetch(`${SB_URL}/rest/v1/inquiries`, {
          method: 'POST',
          headers: {
            'apikey': SB_KEY,
            'Authorization': `Bearer ${SB_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            id: newInquiry.id,
            name: newInquiry.name,
            email: newInquiry.email,
            service: newInquiry.service,
            budget: newInquiry.budget,
            message: newInquiry.message,
            date_formatted: newInquiry.dateFormatted,
            status: 'unread'
          })
        }).catch(err => console.warn('Supabase order upload note:', err));

        if (typeof firebase !== 'undefined' && firebase.apps && firebase.apps.length) {
          try {
            firebase.firestore().collection('inquiries').add(newInquiry).catch(e => console.warn(e));
          } catch(e) {}
        }
      } catch (err) {
        console.warn('Could not store order locally:', err);
      }

      if (feedbackBox) {
        feedbackBox.classList.add('success');
        const dict = I18N[currentLang] || I18N.es;
        feedbackBox.innerHTML = `
          <div class="feedback-success-inner">
            <div class="feedback-badge-row">
              <span class="feedback-check">✓</span>
              <h4 class="feedback-title">${dict.feedbackTitle}</h4>
            </div>
            <p class="feedback-desc">${dict.feedbackSub}</p>
            <div class="feedback-actions">
              <a href="${preparedMailto}" class="channel-btn feedback-action-btn primary" id="open-mailto-btn">
                ✉ ${dict.btnOpenMail}
              </a>
              <button type="button" class="channel-btn feedback-action-btn" id="copy-summary-btn">
                📋 ${dict.btnCopySummary}
              </button>
            </div>
          </div>
        `;

        const copyBtn = document.getElementById('copy-summary-btn');
        if (copyBtn) {
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(preparedText).then(() => {
              showToast(dict.toastMsgCopied || '¡Mensaje copiado al portapapeles!');
              copyBtn.textContent = '✓ ' + (currentLang === 'en' ? 'Copied' : 'Copiado');
              setTimeout(() => {
                copyBtn.textContent = '📋 ' + dict.btnCopySummary;
              }, 2500);
            });
          });
        }
      }

      showToast(I18N[currentLang]?.toastProposalReady || '¡Propuesta preparada correctamente!');
    });
  }
})();

/* ==========================================================================
   GLOBAL ESCAPE KEY & INITIALIZATION
   ========================================================================== */
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    const contactModal = document.getElementById('contact-modal');
    if (contactModal) contactModal.classList.remove('active');
    const statementModal = document.getElementById('statement-modal');
    if (statementModal) statementModal.classList.remove('active');
    const menu = document.getElementById('menu');
    const burgerBtn = document.getElementById('burger-btn');
    if (menu && menu.classList.contains('open')) {
      menu.classList.remove('open');
      if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'false');
    }
  }
});

// URL Deep-Linking & Routing Controller (#obra-1 .. #obra-10, #contacto, #manifiesto, #archivo)
function handleUrlHash() {
  const hash = (window.location.hash || '').toLowerCase();
  if (!hash) return;

  if (hash.startsWith('#obra-')) {
    const idx = parseInt(hash.replace('#obra-', ''), 10) - 1;
    const cfg = STATE.config || DEFAULT_CONFIG;
    if (!isNaN(idx) && idx >= 0 && cfg.projects && idx < cfg.projects.length) {
      if (typeof window.completeVideoAndEnterArchive === 'function') {
        window.completeVideoAndEnterArchive();
      }
      setTimeout(() => {
        openLightbox(idx);
      }, 350);
    }
  } else if (hash === '#contacto' || hash === '#contact') {
    if (typeof window.completeVideoAndEnterArchive === 'function') {
      window.completeVideoAndEnterArchive();
    }
    if (typeof window.openContactModal === 'function') window.openContactModal();
  } else if (hash === '#manifiesto' || hash === '#statement') {
    if (typeof window.completeVideoAndEnterArchive === 'function') {
      window.completeVideoAndEnterArchive();
    }
    if (typeof window.openStatementModal === 'function') window.openStatementModal();
  } else if (hash === '#archivo' || hash === '#grid') {
    if (typeof window.completeVideoAndEnterArchive === 'function') {
      window.completeVideoAndEnterArchive();
    }
    const gridView = document.getElementById('grid-view');
    if (gridView && !gridView.classList.contains('active') && typeof window.toggleGridView === 'function') {
      window.toggleGridView();
    }
  }
}
window.addEventListener('hashchange', handleUrlHash);

// Initial boot
(function initApp() {
  STATE.config = loadStoredConfig();
  applyConfigToUI(STATE.config);
  applyLanguage(currentLang);
  if (typeof setupFilterPillEvents === 'function') setupFilterPillEvents();
  if (typeof initCuratorialFilterBar === 'function') initCuratorialFilterBar();
  if (typeof initSpotlightSearch === 'function') initSpotlightSearch();
  if (typeof initFocusMode === 'function') initFocusMode();
  if (typeof initOrbitControl === 'function') initOrbitControl();
  if (typeof initShareModal === 'function') initShareModal();
  if (typeof initAmbientMusic === 'function') initAmbientMusic();
  if (window.location.hash) {
    handleUrlHash();
  }

  // Connect to Cloud Firestore if configured
  try {
    const fbSaved = localStorage.getItem('wilmar_firebase_config_v1');
    if (fbSaved && window.firebase) {
      const fbConfig = JSON.parse(fbSaved);
      if (fbConfig.apiKey && fbConfig.projectId) {
        let app = firebase.apps.length ? firebase.app() : firebase.initializeApp(fbConfig);
        const db = app.firestore();
        db.collection('settings').doc('portfolio').onSnapshot((doc) => {
          if (doc.exists) {
            const cloudCfg = doc.data();
            if (cloudCfg && cloudCfg.projects) {
              STATE.config = cloudCfg;
              applyConfigToUI(cloudCfg);
              localStorage.setItem('wilmar_portfolio_config_v3', JSON.stringify(cloudCfg));
            }
          }
        }, (err) => console.warn('Public cloud listener note:', err));
      }
    }
  } catch(e) {
    console.warn('Cloud listener init error:', e);
  }

  // Triple-click on brand logo to access Admin Console
  let brandClicks = 0;
  let brandTimer = null;
  const brandEl = document.getElementById('ui-brand-logo');
  if (brandEl) {
    brandEl.addEventListener('click', (e) => {
      brandClicks++;
      clearTimeout(brandTimer);
      if (brandClicks >= 3) {
        e.preventDefault();
        window.location.href = 'admin.html';
      } else {
        brandTimer = setTimeout(() => { brandClicks = 0; }, 800);
      }
    });
  }
})();

/* ==========================================================================
   SPOTLIGHT CURATORIAL SEARCH CONTROLLER (Instant Live Filter & Quick Nav)
   ========================================================================== */
function initSpotlightSearch() {
  const triggerBtn = document.getElementById('search-trigger-btn');
  const modal = document.getElementById('spotlight-search-modal');
  const backdrop = document.getElementById('spotlight-backdrop');
  const closeBtn = document.getElementById('spotlight-close-btn');
  const input = document.getElementById('spotlight-search-input');
  const resultsContainer = document.getElementById('spotlight-results');

  if (!modal || !input || !resultsContainer) return;

  let activeIndex = -1;
  let currentMatchedIndices = [];

  function openSpotlight() {
    modal.classList.add('active');
    input.value = '';
    renderResults('');
    setTimeout(() => input.focus(), 80);
  }

  function closeSpotlight() {
    modal.classList.remove('active');
    input.blur();
  }

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    const cfg = STATE.config || DEFAULT_CONFIG;
    const items = cfg.projects || [];
    const isEn = (currentLang === 'en');
    const dict = I18N[currentLang] || I18N.es;

    resultsContainer.innerHTML = '';
    currentMatchedIndices = [];
    activeIndex = -1;

    items.forEach((item, idx) => {
      const matchTitle = (item.title && item.title.toLowerCase().includes(q)) ||
                         (item.title_en && item.title_en.toLowerCase().includes(q));
      const matchPlace = (item.place && item.place.toLowerCase().includes(q)) ||
                         (item.place_en && item.place_en.toLowerCase().includes(q));
      const matchRole = (item.role && item.role.toLowerCase().includes(q)) ||
                        (item.role_en && item.role_en.toLowerCase().includes(q));
      const matchMedium = (item.medium && item.medium.toLowerCase().includes(q)) ||
                          (item.medium_en && item.medium_en.toLowerCase().includes(q));
      const matchClient = (item.client && item.client.toLowerCase().includes(q)) ||
                          (item.client_en && item.client_en.toLowerCase().includes(q));
      const matchDisc = (item.discipline && item.discipline.toLowerCase().includes(q));
      const matchNote = (item.note && item.note.toLowerCase().includes(q)) ||
                        (item.note_en && item.note_en.toLowerCase().includes(q));

      if (!q || matchTitle || matchPlace || matchRole || matchMedium || matchClient || matchDisc || matchNote) {
        currentMatchedIndices.push(idx);

        const row = document.createElement('div');
        row.className = 'spotlight-item';
        row.setAttribute('data-index', idx);
        row.setAttribute('role', 'option');

        const titleText = isEn ? (item.title_en || OfflineTranslator.toEn(item.title)) : item.title;
        const placeText = isEn ? (item.place_en || OfflineTranslator.toEn(item.place)) : item.place;
        const roleText = isEn ? (item.role_en || OfflineTranslator.toEn(item.role || 'Graphic Design')) : (item.role || 'Diseño Gráfico');

        row.innerHTML = `
          <div class="spotlight-item-thumb">
            <img src="${item.thumb || item.image}" alt="${titleText}" loading="lazy">
          </div>
          <div class="spotlight-item-info">
            <div class="spotlight-item-title">${titleText}</div>
            <div class="spotlight-item-meta">
              <span class="spotlight-item-badge">${placeText}</span>
              <span>·</span>
              <span>${roleText}</span>
            </div>
          </div>
        `;

        row.addEventListener('click', () => {
          closeSpotlight();
          openLightbox(idx);
        });

        resultsContainer.appendChild(row);
      }
    });

    if (currentMatchedIndices.length === 0) {
      resultsContainer.innerHTML = `<div class="spotlight-empty">${dict.spotlightEmpty}</div>`;
    } else {
      highlightActive(0);
    }
  }

  function highlightActive(index) {
    const rows = resultsContainer.querySelectorAll('.spotlight-item');
    rows.forEach(r => r.classList.remove('selected'));
    if (index >= 0 && index < rows.length) {
      activeIndex = index;
      rows[index].classList.add('selected');
      rows[index].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else {
      activeIndex = -1;
    }
  }

  input.addEventListener('input', (e) => {
    renderResults(e.target.value);
  });

  input.addEventListener('keydown', (e) => {
    const rows = resultsContainer.querySelectorAll('.spotlight-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (rows.length > 0) {
        const next = (activeIndex + 1) % rows.length;
        highlightActive(next);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (rows.length > 0) {
        const prev = activeIndex <= 0 ? rows.length - 1 : activeIndex - 1;
        highlightActive(prev);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && currentMatchedIndices[activeIndex] !== undefined) {
        const targetIdx = currentMatchedIndices[activeIndex];
        closeSpotlight();
        openLightbox(targetIdx);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeSpotlight();
    }
  });

  if (triggerBtn) {
    triggerBtn.addEventListener('click', openSpotlight);
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeSpotlight);
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSpotlight);
  }

  // Global Keyboard Shortcut: Ctrl+K / Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (modal.classList.contains('active')) {
        closeSpotlight();
      } else {
        openSpotlight();
      }
    }
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeSpotlight();
    }
  });
}

/* ==========================================================================
   FOCUS EXHIBITION MODE CONTROLLER (Immersive Exhibition Lighting)
   ========================================================================== */
function initFocusMode() {
  const btn = document.getElementById('focus-mode-btn');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = document.body.classList.toggle('focus-mode-active');
    const isEn = (currentLang === 'en');
    if (isActive) {
      showToast(isEn ? 'Focus Mode Active · Tap screen to exit' : 'Modo Enfoque Activo · Toca la pantalla para salir');
    } else {
      showToast(isEn ? 'Exited Focus Mode' : 'Modo Normal Restablecido');
    }
  });

  document.addEventListener('click', (e) => {
    if (!document.body.classList.contains('focus-mode-active')) return;
    if (e.target.closest('#focus-mode-btn, .card, #lightbox, #menu-overlay, #master-console, .spotlight-box')) return;
    document.body.classList.remove('focus-mode-active');
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('focus-mode-active')) {
      document.body.classList.remove('focus-mode-active');
    }
  });
}

/* ==========================================================================
   ORBIT ROTATION CONTROLLER (Play/Pause 3D Automatic Spin)
   ========================================================================== */
function initOrbitControl() {
  const btn = document.getElementById('orbit-toggle-btn');
  const icon = document.getElementById('orbit-icon');
  const label = document.getElementById('ui-orbit-label');
  if (!btn) return;

  STATE.orbitPaused = false;

  btn.addEventListener('click', () => {
    STATE.orbitPaused = !STATE.orbitPaused;
    btn.classList.toggle('paused', STATE.orbitPaused);
    const dict = I18N[currentLang] || I18N.es;
    const isEn = (currentLang === 'en');

    if (icon) icon.innerHTML = STATE.orbitPaused ? '&#9658;' : '&#10074;&#10074;';
    if (label) label.textContent = STATE.orbitPaused ? dict.orbitResume : dict.orbitPause;

    showToast(STATE.orbitPaused
      ? (isEn ? '3D Orbit Paused' : 'Giro 3D Pausado')
      : (isEn ? '3D Orbit Resumed' : 'Giro 3D Reanudado')
    );
  });
}

/* ==========================================================================
   MULTI-APP SHARE MODAL CONTROLLER (WhatsApp, Telegram, X, LinkedIn, FB & Native)
   ========================================================================== */
function initShareModal() {
  const modal = document.getElementById('share-modal');
  const backdrop = document.getElementById('share-backdrop');
  const closeBtn = document.getElementById('share-close-btn');
  const copyBtn = document.getElementById('share-copy-action-btn');

  if (!modal) return;

  function closeShare() {
    modal.classList.remove('active');
  }

  if (backdrop) backdrop.addEventListener('click', closeShare);
  if (closeBtn) closeBtn.addEventListener('click', closeShare);

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const inputEl = document.getElementById('share-link-input');
      const isEn = (currentLang === 'en');
      if (inputEl && inputEl.value) {
        navigator.clipboard.writeText(inputEl.value).then(() => {
          showToast(isEn ? 'Link copied to clipboard!' : '¡Enlace copiado al portapapeles!');
          const btnText = document.getElementById('ui-share-copy-btn-text');
          if (btnText) {
            btnText.textContent = isEn ? '✓ Copied' : '✓ Copiado';
            setTimeout(() => {
              btnText.textContent = isEn ? 'Copy' : 'Copiar';
            }, 2000);
          }
        }).catch(() => {
          showToast(inputEl.value);
        });
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeShare();
    }
  });
}

function openShareModal(index) {
  const modal = document.getElementById('share-modal');
  if (!modal) return;
  const cfg = STATE.config || DEFAULT_CONFIG;
  const items = cfg.projects || [];
  const item = items[index];
  if (!item) return;

  const isEn = (currentLang === 'en');
  const currentTitle = isEn ? (item.title_en || OfflineTranslator.toEn(item.title)) : item.title;
  const currentPlace = isEn ? (item.place_en || OfflineTranslator.toEn(item.place)) : item.place;
  const shareUrl = `${window.location.origin}${window.location.pathname}#obra-${index + 1}`;
  const shareText = isEn
    ? `Explore "${currentTitle}" (${currentPlace}) by visual artist Wilmar Machado:`
    : `Explora la obra "${currentTitle}" (${currentPlace}) del artista visual Wilmar Machado:`;

  const imgEl = document.getElementById('share-preview-img');
  const titleEl = document.getElementById('share-preview-title');
  const metaEl = document.getElementById('share-preview-meta');
  const inputEl = document.getElementById('share-link-input');

  if (imgEl) imgEl.src = item.thumb || item.image;
  if (titleEl) titleEl.textContent = currentTitle;
  if (metaEl) metaEl.textContent = `Wilmar Machado · ${currentPlace}`;
  if (inputEl) inputEl.value = shareUrl;

  const waBtn = document.getElementById('share-app-wa');
  if (waBtn) {
    waBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
  }

  const tgBtn = document.getElementById('share-app-tg');
  if (tgBtn) {
    tgBtn.href = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
  }

  const xBtn = document.getElementById('share-app-x');
  if (xBtn) {
    xBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  }

  const liBtn = document.getElementById('share-app-li');
  if (liBtn) {
    liBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  }

  const fbBtn = document.getElementById('share-app-fb');
  if (fbBtn) {
    fbBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  }

  const nativeBtn = document.getElementById('share-app-native');
  if (nativeBtn) {
    nativeBtn.onclick = () => {
      if (navigator.share) {
        navigator.share({
          title: `Wilmar Machado · ${currentTitle}`,
          text: `${currentTitle} (${currentPlace}) — Portafolio Oficial de Wilmar Machado`,
          url: shareUrl
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(shareUrl).then(() => {
          showToast(isEn ? 'Direct link copied!' : '¡Enlace directo copiado!');
        });
      }
    };
  }

  modal.classList.add('active');
}

/* ==========================================================================
   AMBIENT MUSIC ENGINE (Zero-Download Web Audio Soundscape)
   Procedural Cathedral Harmonics, D Dorian Celestial Chords & Bell Rings
   ========================================================================== */
const AmbientMusicEngine = (function() {
  let ctx = null;
  let masterGain = null;
  let duckGain = null;
  let isInitialized = false;
  let isPlaying = false;
  let lookaheadTimer = null;
  let vinylNode = null;

  // Tempo & Timing (Classic Chillhop / Jazz Hop Tempo)
  const BPM = 82;
  const secondsPerBeat = 60 / BPM; // ~0.7317s
  const stepTime = secondsPerBeat / 4; // 16th note ~0.1829s
  const SWING = 0.026; // Chillhop swung 16th delay

  let currentStep = 0; // 0 to 127 (8 bars of 16 steps = 128 steps total)
  let nextStepTime = 0.0;
  const scheduleAheadTime = 0.12;

  // 8-Bar Jazz Chord Progression (Lush extended harmonies)
  const CHORDS = [
    // Bar 0: Dm9 (D3, F3, A3, C4, E4)
    { name: 'Dm9', freqs: [146.83, 174.61, 220.00, 261.63, 329.63], bass: 73.42 },
    // Bar 1: G13 (G2, F3, A3, B3, E4)
    { name: 'G13', freqs: [98.00, 174.61, 220.00, 246.94, 329.63], bass: 49.00 },
    // Bar 2: Cmaj9 (C3, E3, G3, B3, D4)
    { name: 'Cmaj9', freqs: [130.81, 164.81, 196.00, 246.94, 293.66], bass: 65.41 },
    // Bar 3: Am9 (A2, G3, C4, D4, E4)
    { name: 'Am9', freqs: [110.00, 196.00, 261.63, 293.66, 329.63], bass: 55.00 },
    // Bar 4: Fmaj9 (F2, E3, A3, C4, G4)
    { name: 'Fmaj9', freqs: [87.31, 164.81, 220.00, 261.63, 392.00], bass: 43.65 },
    // Bar 5: Em9 (E2, D3, G3, B3, F#4)
    { name: 'Em9', freqs: [82.41, 146.83, 196.00, 246.94, 369.99], bass: 41.20 },
    // Bar 6: Dm9 (D3, F3, A3, C4, E4)
    { name: 'Dm9', freqs: [146.83, 174.61, 220.00, 261.63, 329.63], bass: 73.42 },
    // Bar 7: A7alt (A2, G3, C4, Eb4, F4)
    { name: 'A7alt', freqs: [110.00, 196.00, 261.63, 311.13, 349.23], bass: 55.00 }
  ];

  // Procedural Convolution Reverb Buffer
  let reverbNode = null;
  function createReverb(duration = 2.4, decay = 2.0) {
    const rate = ctx.sampleRate;
    const length = Math.floor(rate * duration);
    const impulse = ctx.createBuffer(2, length, rate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);
    for (let i = 0; i < length; i++) {
      const n = i / length;
      const env = Math.pow(1 - n, decay);
      left[i] = (Math.random() * 2 - 1) * env;
      right[i] = (Math.random() * 2 - 1) * env;
    }
    const conv = ctx.createConvolver();
    conv.buffer = impulse;
    return conv;
  }

  // Master lowpass filter (breathing with 3D sphere)
  let masterFilter = null;

  function initAudioContext() {
    if (isInitialized) return true;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return false;

    try {
      ctx = new AudioCtx();

      // Master Compressor / Limiter
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-12, ctx.currentTime);
      compressor.knee.setValueAtTime(20, ctx.currentTime);
      compressor.ratio.setValueAtTime(4.5, ctx.currentTime);
      compressor.attack.setValueAtTime(0.008, ctx.currentTime);
      compressor.release.setValueAtTime(0.2, ctx.currentTime);
      compressor.connect(ctx.destination);

      masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.connect(compressor);

      duckGain = ctx.createGain();
      duckGain.gain.setValueAtTime(1.0, ctx.currentTime);
      duckGain.connect(masterGain);

      masterFilter = ctx.createBiquadFilter();
      masterFilter.type = 'lowpass';
      masterFilter.frequency.setValueAtTime(2800, ctx.currentTime);
      masterFilter.Q.setValueAtTime(1.0, ctx.currentTime);
      masterFilter.connect(duckGain);

      reverbNode = createReverb(2.2, 2.0);
      const wetGain = ctx.createGain();
      wetGain.gain.setValueAtTime(0.38, ctx.currentTime);
      reverbNode.connect(wetGain);
      wetGain.connect(duckGain);

      // Start subtle vinyl crackle loop
      startVinylCrackle();

      isInitialized = true;
      return true;
    } catch(e) {
      console.warn('JazzHop init error:', e);
      return false;
    }
  }

  // Vinyl Texture Generator
  function startVinylCrackle() {
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const hiss = (Math.random() * 2 - 1) * 0.015;
      const click = (Math.random() > 0.9996) ? (Math.random() * 2 - 1) * 0.12 : 0;
      data[i] = hiss + click;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const vFilter = ctx.createBiquadFilter();
    vFilter.type = 'bandpass';
    vFilter.frequency.setValueAtTime(1200, ctx.currentTime);
    vFilter.Q.setValueAtTime(0.8, ctx.currentTime);

    const vGain = ctx.createGain();
    vGain.gain.setValueAtTime(0.022, ctx.currentTime);

    source.connect(vFilter);
    vFilter.connect(vGain);
    vGain.connect(duckGain);
    source.start();
    vinylNode = source;
  }

  // --- INSTRUMENT SYNTHESIS ---

  // 1. Kick Drum (Punchy Low-End Hip Hop Kick)
  function triggerKick(time, vel = 0.75) {
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(130, time);
    osc.frequency.exponentialRampToValueAtTime(42, time + 0.075);

    gain.gain.setValueAtTime(vel * 0.75, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);

    osc.connect(gain);
    gain.connect(masterFilter);

    osc.start(time);
    osc.stop(time + 0.3);
  }

  // 2. Snare / Rimshot (Crisp, organic 90s boom-bap / jazz snare)
  function triggerSnare(time, vel = 0.7) {
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, time);
    osc.frequency.exponentialRampToValueAtTime(115, time + 0.04);
    oscGain.gain.setValueAtTime(vel * 0.45, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
    osc.connect(oscGain);
    oscGain.connect(masterFilter);
    osc.start(time);
    osc.stop(time + 0.15);

    const noiseBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.18), ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(2200, time);
    noiseFilter.Q.setValueAtTime(1.8, time);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(vel * 0.55, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterFilter);

    if (reverbNode) {
      const splashSend = ctx.createGain();
      splashSend.gain.setValueAtTime(vel * 0.22, time);
      noiseFilter.connect(splashSend);
      splashSend.connect(reverbNode);
    }

    noiseSource.start(time);
    noiseSource.stop(time + 0.2);
  }

  // 3. Hi-Hat (Swung, velocity-sensitive jazzy closed/open hat)
  function triggerHat(time, vel = 0.35, isOpen = false) {
    if (!ctx) return;
    const dur = isOpen ? 0.22 : 0.048;
    const noiseBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const source = ctx.createBufferSource();
    source.buffer = noiseBuffer;

    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(7500, time);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vel * 0.38, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    source.connect(hp);
    hp.connect(gain);
    gain.connect(masterFilter);

    source.start(time);
    source.stop(time + dur + 0.02);
  }

  // 4. Jazz Rhodes Chords (Warm electric piano with soft tine chime)
  function triggerRhodesChord(time, freqs, duration = 1.4, vel = 0.5) {
    if (!ctx) return;
    const noteGain = (vel * 0.09) / Math.sqrt(freqs.length);

    freqs.forEach((f) => {
      const oscBody = ctx.createOscillator();
      oscBody.type = 'sine';
      oscBody.frequency.setValueAtTime(f, time);

      const oscTine = ctx.createOscillator();
      oscTine.type = 'sine';
      oscTine.frequency.setValueAtTime(f * 3, time);

      const tineGain = ctx.createGain();
      tineGain.gain.setValueAtTime(noteGain * 0.35, time);
      tineGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.24);

      const vGain = ctx.createGain();
      vGain.gain.setValueAtTime(0.0001, time);
      vGain.gain.linearRampToValueAtTime(noteGain, time + 0.025);
      vGain.gain.exponentialRampToValueAtTime(noteGain * 0.45, time + duration * 0.6);
      vGain.gain.linearRampToValueAtTime(0.0001, time + duration);

      const toneFilter = ctx.createBiquadFilter();
      toneFilter.type = 'lowpass';
      toneFilter.frequency.setValueAtTime(1500, time);

      oscBody.connect(toneFilter);
      oscTine.connect(tineGain);
      tineGain.connect(toneFilter);
      toneFilter.connect(vGain);

      vGain.connect(masterFilter);
      if (reverbNode) {
        const revSend = ctx.createGain();
        revSend.gain.setValueAtTime(0.35, time);
        vGain.connect(revSend);
        revSend.connect(reverbNode);
      }

      oscBody.start(time);
      oscTine.start(time);
      oscBody.stop(time + duration + 0.05);
      oscTine.stop(time + 0.3);
    });
  }

  // 5. Walking / Melodic Jazz Bass
  function triggerBass(time, freq, duration = 0.42, vel = 0.65) {
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const sub = ctx.createOscillator();
    const bFilter = ctx.createBiquadFilter();
    const bGain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    sub.type = 'sine';
    sub.frequency.setValueAtTime(freq, time);

    bFilter.type = 'lowpass';
    bFilter.frequency.setValueAtTime(340, time);
    bFilter.frequency.exponentialRampToValueAtTime(180, time + duration);

    bGain.gain.setValueAtTime(vel * 0.36, time);
    bGain.gain.exponentialRampToValueAtTime(vel * 0.18, time + duration * 0.7);
    bGain.gain.linearRampToValueAtTime(0.0001, time + duration);

    osc.connect(bFilter);
    sub.connect(bFilter);
    bFilter.connect(bGain);
    bGain.connect(masterFilter);

    osc.start(time);
    sub.start(time);
    osc.stop(time + duration + 0.05);
    sub.stop(time + duration + 0.05);
  }

  // --- STEP SEQUENCER & LOOKAHEAD SCHEDULER ---
  function scheduleStep(stepIndex, stepTimePos) {
    const barIndex = Math.floor(stepIndex / 16) % CHORDS.length;
    const stepInBar = stepIndex % 16;
    const chord = CHORDS[barIndex];

    const isSwung = (stepInBar % 2 === 1);
    const time = stepTimePos + (isSwung ? SWING : 0);

    // Drums
    if (stepInBar === 0) {
      triggerKick(time, 0.78);
    } else if (stepInBar === 6) {
      triggerKick(time, 0.62);
    } else if (stepInBar === 10 && (barIndex % 2 === 1)) {
      triggerKick(time, 0.58);
    }

    if (stepInBar === 4) {
      triggerSnare(time, 0.72);
    } else if (stepInBar === 12) {
      triggerSnare(time, 0.78);
    } else if (stepInBar === 14 && barIndex === 7) {
      triggerSnare(time, 0.28);
    }

    if (stepInBar % 2 === 0) {
      const isAccent = (stepInBar === 0 || stepInBar === 8);
      triggerHat(time, isAccent ? 0.42 : 0.28, false);
    } else if (stepInBar === 14 && (barIndex % 4 === 3)) {
      triggerHat(time, 0.38, true);
    } else {
      triggerHat(time, 0.18, false);
    }

    // Jazz Rhodes Chords
    if (stepInBar === 0) {
      triggerRhodesChord(time, chord.freqs, stepTime * 5.2, 0.55);
    } else if (stepInBar === 6) {
      triggerRhodesChord(time, chord.freqs, stepTime * 3.8, 0.46);
    } else if (stepInBar === 14) {
      const nextChord = CHORDS[(barIndex + 1) % CHORDS.length];
      triggerRhodesChord(time, nextChord.freqs, stepTime * 2.2, 0.42);
    }

    // Walking Jazz Bass
    if (stepInBar === 0) {
      triggerBass(time, chord.bass, stepTime * 3.5, 0.68);
    } else if (stepInBar === 6) {
      triggerBass(time, chord.bass * 1.25, stepTime * 2.2, 0.58);
    } else if (stepInBar === 8) {
      triggerBass(time, chord.bass * 1.5, stepTime * 3.0, 0.62);
    } else if (stepInBar === 12) {
      const nextBass = CHORDS[(barIndex + 1) % CHORDS.length].bass;
      triggerBass(time, nextBass * 0.94, stepTime * 2.5, 0.54);
    }
  }

  function schedulerLoop() {
    if (!isPlaying || !ctx) return;
    while (nextStepTime < ctx.currentTime + scheduleAheadTime) {
      scheduleStep(currentStep, nextStepTime);
      nextStepTime += stepTime;
      currentStep = (currentStep + 1) % (CHORDS.length * 16);
    }
    lookaheadTimer = setTimeout(schedulerLoop, 25);
  }

  function updateButtonUI(active) {
    const btn = document.getElementById('ambient-music-btn');
    const label = document.getElementById('ui-ambient-sound-label');
    const icon = document.getElementById('ui-ambient-sound-icon');
    const videoBtn = document.getElementById('video-sound-btn');
    const videoLabel = document.getElementById('ui-video-sound-label');
    const videoIcon = videoBtn ? videoBtn.querySelector('.sound-icon') : null;
    const dict = I18N[currentLang] || I18N.es;

    const iconStr = active ? '🔊' : '🔇';
    const textStr = active ? dict.ambientSoundOn : dict.ambientSoundOff;
    const titleStr = active ? dict.ambientSoundTipPlaying : dict.ambientSoundTipMuted;

    if (btn) {
      if (active) {
        btn.classList.add('playing');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('playing');
        btn.setAttribute('aria-pressed', 'false');
      }
      btn.title = titleStr;
    }
    if (label) label.textContent = textStr;
    if (icon) icon.textContent = iconStr;

    // Keep video topbar sound button in sync
    if (videoBtn) {
      videoBtn.title = titleStr;
    }
    if (videoLabel) videoLabel.textContent = textStr;
    if (videoIcon) videoIcon.textContent = iconStr;
  }

  return {
    get isActive() {
      return isPlaying;
    },
    start: function(showNotice = false) {
      if (!initAudioContext()) return;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      isPlaying = true;
      const now = ctx.currentTime;
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setValueAtTime(masterGain.gain.value, now);
      masterGain.gain.linearRampToValueAtTime(0.48, now + 1.2);

      nextStepTime = ctx.currentTime + 0.05;
      clearTimeout(lookaheadTimer);
      schedulerLoop();

      updateButtonUI(true);
      try {
        localStorage.setItem('wilmar_ambient_music', 'enabled');
      } catch(e) {}

      if (showNotice) {
        const dict = I18N[currentLang] || I18N.es;
        showToast(dict.ambientToastOn);
      }
    },
    stop: function(showNotice = false) {
      if (!ctx || !masterGain) return;
      isPlaying = false;
      const now = ctx.currentTime;
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setValueAtTime(masterGain.gain.value, now);
      masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);

      clearTimeout(lookaheadTimer);

      updateButtonUI(false);
      try {
        localStorage.setItem('wilmar_ambient_music', 'muted');
      } catch(e) {}

      if (showNotice) {
        const dict = I18N[currentLang] || I18N.es;
        showToast(dict.ambientToastOff);
      }
    },
    toggle: function() {
      if (isPlaying) {
        this.stop(true);
      } else {
        this.start(true);
      }
    },
    duck: function(shouldDuck) {
      if (!ctx || !duckGain) return;
      const now = ctx.currentTime;
      duckGain.gain.cancelScheduledValues(now);
      duckGain.gain.setValueAtTime(duckGain.gain.value, now);
      if (shouldDuck) {
        duckGain.gain.linearRampToValueAtTime(0.22, now + 0.8);
      } else {
        duckGain.gain.linearRampToValueAtTime(1.0, now + 1.0);
      }
    },
    modulate: function(speed) {
      if (!ctx || !masterFilter || !isPlaying) return;
      const targetFreq = Math.min(3800, 2400 + speed * 600);
      masterFilter.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.3);
    },
    updateLang: function() {
      updateButtonUI(isPlaying);
    }
  };
})();

window.AmbientMusicEngine = AmbientMusicEngine;

function initAmbientMusic() {
  const btn = document.getElementById('ambient-music-btn');
  const videoBtn = document.getElementById('video-sound-btn');

  if (btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      AmbientMusicEngine.toggle();
    });
  }

  if (videoBtn) {
    videoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      AmbientMusicEngine.toggle();
    });
  }

  // Keyboard shortcut: Press M to toggle ambient music
  window.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
        return;
      }
      AmbientMusicEngine.toggle();
    }
  });

  // Check saved state: default is ENABLED / PLAYING, unless explicitly set to muted
  let isMutedPref = false;
  try {
    isMutedPref = (localStorage.getItem('wilmar_ambient_music') === 'muted');
  } catch(e) {}

  if (!isMutedPref) {
    // Enabled predeterminadamente! Set UI to active state immediately
    AmbientMusicEngine.updateLang();
    const btnEl = document.getElementById('ambient-music-btn');
    if (btnEl) btnEl.classList.add('playing');

    // Attempt starting immediately
    AmbientMusicEngine.start(false);

    // Global interaction unlocker for browser autoplay policy
    const unlockAudioOnGesture = () => {
      if (localStorage.getItem('wilmar_ambient_music') !== 'muted') {
        AmbientMusicEngine.start(false);
      }
      window.removeEventListener('pointerdown', unlockAudioOnGesture);
      window.removeEventListener('touchstart', unlockAudioOnGesture);
      window.removeEventListener('scroll', unlockAudioOnGesture);
      window.removeEventListener('wheel', unlockAudioOnGesture);
      window.removeEventListener('keydown', unlockAudioOnGesture);
    };

    window.addEventListener('pointerdown', unlockAudioOnGesture, { passive: true, once: true });
    window.addEventListener('touchstart', unlockAudioOnGesture, { passive: true, once: true });
    window.addEventListener('scroll', unlockAudioOnGesture, { passive: true, once: true });
    window.addEventListener('wheel', unlockAudioOnGesture, { passive: true, once: true });
    window.addEventListener('keydown', unlockAudioOnGesture, { passive: true, once: true });
  } else {
    AmbientMusicEngine.updateLang();
  }
}

/* ==========================================================================
   CONTENT SECURITY & MEDIA PROTECTION (Anti-Copy / Anti-Download Controller)
   ========================================================================== */
(function initMediaProtection() {
  // Prevent context menu (right click / long press) on all imagery, videos, and portfolio cards
  document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('img, video, .card, .grid-thumb, #video-frame, .lightbox-img, .lightbox-img-wrapper, #video-stage, .media-protection-guard')) {
      e.preventDefault();
      return false;
    }
  }, { passive: false });

  // Prevent drag and drop of media assets
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO' || e.target.closest('img, video, .card, .lightbox-img-wrapper, #video-frame')) {
      e.preventDefault();
      return false;
    }
  }, { passive: false });

  // Prevent standard save keyboard shortcuts (Ctrl+S / Cmd+S)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
    }
  });
})();

