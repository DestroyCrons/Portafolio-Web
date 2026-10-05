/* ==========================================================================
   CONSOLA WILMAR MACHADO 2026 · MOBILE PWA CONTROLLER
   Gestor Integral del Portafolio: Huella Dactilar, Google Auth, Obras & Sincronización
   ========================================================================== */

(function() {
  'use strict';

  // Master Constants
  const STORAGE_KEY = 'wilmar_portfolio_config_v3';
  const FIREBASE_KEY = 'wilmar_firebase_config_v1';
  const BIO_CRED_KEY = 'wilmar_biometric_cred_id';
  const OWNER_EMAIL_DEFAULT = 'wamimcim2@gmail.com';
  // Hashed admin pass (SHA-256) - Never exposed in plaintext
  const MASTER_BACKUP_HASH = '9723f7d2f440d29d038c38275d5aea00492072dc5c7334ddb9d57d918a74e3e9';

  async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Default Fallback Config (Identical to Portfolio Architecture)
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
      "videoRole": "Diseñador Gráfico & Artista Visual",
      "videoSrc": "video.mp4",
      "statementTitle": "Manifiesto de Autor",
      "statementTitle_en": "Author's Manifesto",
      "statementSubtitle": "La tensión entre el misticismo sacro, la disciplina editorial y el claroscuro",
      "statementSubtitle_en": "The tension between sacred mysticism, editorial discipline, and chiaroscuro",
      "statementQuote": "El diseño no es ornamento superficial; es la arquitectura visual de la memoria y la tensión plástica de la forma.",
      "statementQuote_en": "Design is not superficial ornament; it is the visual architecture of memory and the sculptural tension of form.",
      "statementBio": "Mi trabajo como creador visual y diseñador se sitúa en el umbral donde el rigor conceptual se encuentra con la profundidad emotiva. Cada obra parte del respeto por el espacio en blanco, la contundencia tipográfica y una narrativa que desafía la superficialidad de la inmediatez digital.\n\nDesde Valledupar hacia el panorama visual contemporáneo, concibo el arte sacro, las publicaciones editoriales y la fotografía de estudio no como elementos aislados, sino como un diálogo continuo sobre la identidad, la fe, la soledad y la trascendencia estética.",
      "statementBio_en": "My work as a visual creator and designer is situated on the threshold where conceptual rigor meets emotional depth. Each piece stems from reverence for negative space, typographic conviction, and a narrative that defies the superficiality of digital immediacy.\n\nFrom Valledupar to the contemporary visual sphere, I conceive sacred art, editorial publications, and studio photography not as isolated disciplines, but as a continuous dialogue on identity, faith, solitude, and aesthetic transcendence.",
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
        "client_en": "Independent Music Label"
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
        "client_en": "The Kingdom Publishing"
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
        "client_en": "Urban Documentary Archive"
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
        "note": "Retrato editorial íntimo en penumbra con esquema de luz de ventana suave. Tono emocional contemplativo enfocado en la vulnerabilidad y la serenidad del sujeto.",
        "note_en": "Intimate editorial portrait in half-light with soft window illumination. Contemplative emotional tone focused on vulnerability and serenity of the subject.",
        "role": "Dirección Visual & Fotografía de Retrato",
        "role_en": "Visual Direction & Portrait Photography",
        "medium": "Formato Medio Digital · Luz Natural Modelada",
        "medium_en": "Medium Format Digital · Modeled Natural Light",
        "typography": "Cormorant Garamond Light",
        "client": "Sesión Editorial Personal",
        "client_en": "Personal Editorial Session"
      },
      {
        "image": "images/obra-05.jpg",
        "id": "1kIe1HhJ24N0xVbY1sV5o0c8o9qN4k0Lp",
        "year": "2024",
        "category": "editorial",
        "title": "Complex Xpress",
        "title_en": "Complex Xpress",
        "place": "Tipografía Y2K · Diseño de Cartel",
        "place_en": "Y2K Typography · Poster Design",
        "note": "Composición tipográfica inspirada en el movimiento Y2K y el diseño futurista de principios de los 2000. Formas cromadas líquidas y retícula suiza de alta densidad.",
        "note_en": "Typographic composition inspired by Y2K aesthetics and early 2000s futurism. Liquid chrome shapes and high-density Swiss grid layout.",
        "role": "Diseño Tipográfico & Composición Digital",
        "role_en": "Typographic Design & Digital Composition",
        "medium": "Modelado 3D & Vectorial · Impresión Cromogénica",
        "medium_en": "3D Modeling & Vector · Chromogenic Print",
        "typography": "Custom Y2K Chrome & Eurostile Extended",
        "client": "Proyecto Experimental Autoral",
        "client_en": "Author's Experimental Project"
      },
      {
        "image": "images/obra-06.jpg",
        "id": "1wLg6Vp29K4Z0a_dJ8m7Q9vL4bF1N0rT",
        "year": "2024",
        "category": "grafico",
        "title": "Serpent",
        "title_en": "Serpent",
        "place": "Diseño de Cartel · Archivo Heráldico 2024",
        "place_en": "Poster Design · Heraldic Archive 2024",
        "note": "Ilustración heráldica contemporánea y grabado digital. La figura de la serpiente como arquetipo místico entre el renacimiento y el simbolismo barroco oscuro.",
        "note_en": "Contemporary heraldic illustration and digital engraving. The serpent archetype between renaissance and dark baroque symbolism.",
        "role": "Ilustración Vectorial & Grabado Digital",
        "role_en": "Vector Illustration & Digital Engraving",
        "medium": "Grabado Digital · Papel Verjurado 280g",
        "medium_en": "Digital Engraving · Laid Paper 280g",
        "typography": "Gothic Fraktur & Cinzel Decorative",
        "client": "Archivo Heráldico Personal",
        "client_en": "Personal Heraldic Archive"
      },
      {
        "image": "images/obra-07.jpg",
        "id": "1qM9tP2vL4bF1N0rTwLg6Vp29K4Z0a_dJ",
        "year": "2024",
        "category": "sacro",
        "title": "Divino Angel",
        "title_en": "Divine Angel",
        "place": "Arte Sacro Contemporáneo · Cartel Digital",
        "place_en": "Contemporary Sacred Art · Digital Poster",
        "note": "Reinterpretación de la iconografía sacra celestial. Iluminación volumétrica y orlas doradas enmarcando la serenidad trascendente del ser alado.",
        "note_en": "Reinterpretation of celestial sacred iconography. Volumetric lighting and golden halo borders framing the transcendent serenity of the winged figure.",
        "role": "Pintura Digital & Tratamiento Sacro",
        "role_en": "Digital Painting & Sacred Treatment",
        "medium": "Pintura Digital · Impresión Fine Art con Foil Dorado",
        "medium_en": "Digital Painting · Fine Art Print with Gold Foil",
        "typography": "Cinzel Decorative & Garamond Antiqua",
        "client": "Colección Sacra Personal",
        "client_en": "Personal Sacred Collection"
      },
      {
        "image": "images/obra-08.jpg",
        "id": "1tP2vL4bF1N0rTwLg6Vp29K4Z0a_dJqM9",
        "year": "2024",
        "category": "foto",
        "title": "Monster / Prisión Interior",
        "title_en": "Monster / Inner Prison",
        "place": "Fotografía Conceptual & Retrato de Estudio",
        "place_en": "Conceptual Photography & Studio Portrait",
        "note": "Exploración psicológica del confinamiento emocional mediante sombras densas, texturas rugosas y lenguaje corporal de tensión visceral.",
        "note_en": "Psychological exploration of emotional confinement through dense shadows, tactile textures, and body language of visceral tension.",
        "role": "Dirección Conceptual & Fotografía de Estudio",
        "role_en": "Conceptual Direction & Studio Photography",
        "medium": "Fotografía en Blanco y Negro · Gelatina de Plata Digital",
        "medium_en": "Black & White Photography · Digital Silver Gelatin",
        "typography": "Futura Bold & Courier Prime",
        "client": "Serie Psique & Claroscuro",
        "client_en": "Psyche & Chiaroscuro Series"
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
        "client_en": "Visual Narrative Series"
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
        "client_en": "Author's Limited Edition"
      }
    ],
    "style": {
      "accent": "#d4a359",
      "accentDim": "#8b6b3a",
      "bgPrimary": "#060608",
      "bgSurface": "#0e0e13",
      "sphereRadius": 950,
      "rotationSpeed": 0.003
    }
  };

  // State Management
  let appConfig = null;
  let currentFilter = 'all';
  let isCloudConnected = false;
  let firebaseApp = null;
  let firestoreDb = null;
  let firebaseAuth = null;
  let firebaseStorage = null;

  /* ==========================================================================
     1. STORAGE & CONFIG MANAGER
     ========================================================================== */
  function loadLocalConfig() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          profile: { ...DEFAULT_CONFIG.profile, ...(parsed.profile || {}) },
          style: { ...DEFAULT_CONFIG.style, ...(parsed.style || {}) },
          projects: (parsed.projects && parsed.projects.length) ? parsed.projects : DEFAULT_CONFIG.projects
        };
      }
    } catch (e) {
      console.warn('Error reading stored config:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  }

  function saveLocalConfig(cfg) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
    } catch (e) {
      console.error('Error saving local config:', e);
    }
  }

  /* ==========================================================================
     2. WEBAUTHN & BIOMETRICS ENGINE (HUELLA DACTILAR)
     ========================================================================== */
  async function checkBiometricSupport() {
    const statTitle = document.getElementById('bio-stat-title');
    const statDesc = document.getElementById('bio-stat-desc');
    const bioStatusText = document.getElementById('biometric-status');

    if (window.PublicKeyCredential && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
      try {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        if (available) {
          if (statTitle) statTitle.textContent = "Sensor Biométrico Listo";
          if (statDesc) statDesc.textContent = "Tu dispositivo cuenta con lector de huella dactilar / biometría nativa disponible.";
          if (bioStatusText) bioStatusText.textContent = "Toca para verificar con tu huella dactilar";
          return true;
        }
      } catch (e) {
        console.warn('Biometrics check error:', e);
      }
    }
    
    if (statTitle) statTitle.textContent = "Biometría no disponible";
    if (statDesc) statDesc.textContent = "Este navegador no soporta WebAuthn o no cuenta con lector biométrico configurado.";
    if (bioStatusText) bioStatusText.textContent = "Usa Google o clave de respaldo";
    return false;
  }

  async function registerBiometrics() {
    if (!window.PublicKeyCredential) {
      showAuthAlert("Tu navegador no soporta autenticación biométrica WebAuthn.", "error");
      return;
    }

    try {
      triggerHaptic(30);
      const bioStatusText = document.getElementById('biometric-status');
      if (bioStatusText) bioStatusText.textContent = "Registrando en Google Llaves...";

      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const userId = new Uint8Array(16);
      window.crypto.getRandomValues(userId);

      const ownerEmail = getOwnerEmail();
      const rpId = window.location.hostname;

      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: challenge,
          rp: {
            name: "Wilmar Machado Portfolio",
            id: rpId
          },
          user: {
            id: userId,
            name: ownerEmail,
            displayName: "Wilmar Machado"
          },
          pubKeyCredParams: [
            { alg: -7, type: "public-key" },  // ES256
            { alg: -257, type: "public-key" } // RS256
          ],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "preferred",
            residentKey: "preferred"
          },
          timeout: 60000,
          attestation: "none"
        }
      });

      if (credential) {
        // Save credential id for future verifications
        const rawId = Array.from(new Uint8Array(credential.rawId));
        localStorage.setItem(BIO_CRED_KEY, JSON.stringify(rawId));
        triggerHaptic([40, 60, 40]);
        showToast("¡Huella guardada en Google Llaves!");
        unlockAppShell("Huella Registrada en Google Llaves");
      }
    } catch (err) {
      console.warn('Error en registro de huella:', err);
      const bioStatusText = document.getElementById('biometric-status');
      if (bioStatusText) bioStatusText.textContent = "Toca para desbloquear o registrar huella";
      if (err.name === 'NotAllowedError') {
        showAuthAlert("Operación cancelada en el sensor de huella.", "error");
      } else {
        showAuthAlert("Error al registrar en Google Llaves: " + (err.message || err.name), "error");
      }
    }
  }

  async function authenticateWithBiometrics() {
    triggerHaptic(20);
    const bioStatusText = document.getElementById('biometric-status');
    if (bioStatusText) bioStatusText.textContent = "Esperando lectura de huella...";

    if (!window.PublicKeyCredential) {
      showAuthAlert("Este dispositivo no cuenta con soporte biométrico. Inicia con contraseña.", "error");
      return;
    }

    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const storedCred = localStorage.getItem(BIO_CRED_KEY);
      const allowCredentials = [];

      if (storedCred) {
        try {
          const rawIdArr = JSON.parse(storedCred);
          allowCredentials.push({
            id: new Uint8Array(rawIdArr),
            type: "public-key"
          });
        } catch(e) {}
      }

      const getOptions = {
        publicKey: {
          challenge: challenge,
          timeout: 60000,
          userVerification: "preferred",
          rpId: window.location.hostname
        }
      };

      if (allowCredentials.length > 0) {
        getOptions.publicKey.allowCredentials = allowCredentials;
      }

      const assertion = await navigator.credentials.get(getOptions);

      if (assertion) {
        triggerHaptic([40, 60, 40]);
        unlockAppShell("Huella Dactilar Verificada");
      }
    } catch (err) {
      console.warn('Biometric auth error:', err);
      const bioStatusText = document.getElementById('biometric-status');
      if (bioStatusText) bioStatusText.textContent = "Toca para desbloquear o registrar huella";

      if (err.name === 'NotFoundError' || err.name === 'NotAllowedError') {
        showAuthAlert("No se encontró una llave previa en Google Llaves. Toca el botón abajo para registrarla con tu huella ahora.", "error");
        const regPromptBtn = document.getElementById('btn-register-passkey-prompt');
        if (regPromptBtn) regPromptBtn.style.display = 'inline-block';
      } else {
        showAuthAlert("Lectura biométrica no completada. Intenta de nuevo o usa contraseña.", "error");
      }
    }
  }

  async function handleBiometricClick() {
    triggerHaptic(20);
    const storedCred = localStorage.getItem(BIO_CRED_KEY);
    // If not registered yet on this device, launch registration directly in Google Llaves
    if (!storedCred) {
      await registerBiometrics();
      return;
    }
    await authenticateWithBiometrics();
  }

  /* ==========================================================================
     3. GOOGLE AUTH & WHITELIST SECURITY
     ========================================================================== */
  function getOwnerEmail() {
    const input = document.getElementById('cfg-ownerEmail');
    if (input && input.value.trim()) return input.value.trim().toLowerCase();
    const stored = localStorage.getItem('wilmar_owner_email');
    return stored ? stored.toLowerCase() : OWNER_EMAIL_DEFAULT;
  }

  async function loginWithGoogle() {
    triggerHaptic(25);
    const ownerEmail = getOwnerEmail();

    // If Firebase is initialized with Auth
    if (firebaseAuth) {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        const result = await firebaseAuth.signInWithPopup(provider);
        const user = result.user;

        if (user && user.email && user.email.toLowerCase() === ownerEmail) {
          triggerHaptic(50);
          unlockAppShell(`Bienvenido, ${user.displayName || user.email}`);
        } else {
          await firebaseAuth.signOut();
          triggerHaptic([80, 80, 80]);
          showAuthAlert(`Acceso denegado: El correo (${user ? user.email : 'desconocido'}) no tiene permisos de administrador. Solo "${ownerEmail}".`, "error");
        }
      } catch (err) {
        console.error('Google Auth Error:', err);
        showAuthAlert(`Error al conectar con Google: ${err.message}`, "error");
      }
    } else {
      // Professional feedback when Firebase is not yet connected in this browser
      showAuthAlert("Para usar el inicio de sesión oficial con Google, ingresa primero tus credenciales de Firebase en la pestaña Seguridad. Despliega abajo el acceso con contraseña temporal.", "error");
      const backupForm = document.getElementById('backup-auth-form');
      if (backupForm) {
        backupForm.classList.remove('hidden');
        const passInput = document.getElementById('input-backup-password');
        if (passInput) passInput.focus();
      }
    }
  }

  async function loginWithBackupPassword(password) {
    const hashed = await sha256(password);
    if (hashed === MASTER_BACKUP_HASH) {
      triggerHaptic(40);
      unlockAppShell("Acceso con Clave Maestra");
      return true;
    } else {
      triggerHaptic([60, 60, 60]);
      showAuthAlert("Contraseña de administrador incorrecta.", "error");
      return false;
    }
  }

  /* ==========================================================================
     4. UNLOCK & LOCK SESSION
     ========================================================================== */
  function unlockAppShell(welcomeMsg) {
    const authScreen = document.getElementById('screen-auth');
    const appShell = document.getElementById('app-shell');
    const authAlert = document.getElementById('auth-alert');

    if (authAlert) authAlert.classList.add('hidden');
    if (authScreen) authScreen.classList.add('hidden');
    if (appShell) appShell.classList.remove('hidden');

    showToast(welcomeMsg || "Consola Desbloqueada");

    // Populate data into UI
    renderInquiriesList();
    renderWorksList();
    populatePortfolioForm();
    populateStyleForm();
    populateSecurityForm();
  }

  function lockAppShell() {
    triggerHaptic(30);
    const authScreen = document.getElementById('screen-auth');
    const appShell = document.getElementById('app-shell');
    if (appShell) appShell.classList.add('hidden');
    if (authScreen) authScreen.classList.remove('hidden');
    showToast("Consola bloqueada por seguridad");
  }

  // Graceful auto-lock after 5 minutes in background (prevents accidental lockout while switching apps)
  let backgroundTimestamp = 0;
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      backgroundTimestamp = Date.now();
    } else if (document.visibilityState === 'visible') {
      if (backgroundTimestamp && (Date.now() - backgroundTimestamp > 5 * 60 * 1000)) {
        lockAppShell();
      }
      backgroundTimestamp = 0;
      updateInquiriesBadge();
      renderInquiriesList();
    }
  });

  /* ==========================================================================
     5. FIREBASE CLOUD SYNC
     ========================================================================== */
  function initFirebaseIfConfigured() {
    try {
      const savedConfig = localStorage.getItem(FIREBASE_KEY);
      if (savedConfig) {
        const config = JSON.parse(savedConfig);
        if (config.apiKey && config.projectId) {
          if (!firebase.apps.length) {
            firebaseApp = firebase.initializeApp(config);
          } else {
            firebaseApp = firebase.app();
          }
          firestoreDb = firebase.firestore();
          firebaseAuth = firebase.auth();
          try { firebaseStorage = firebase.storage(); } catch(e){}

          isCloudConnected = true;
          updateSyncIndicator(true);

          // Listen to real-time changes from Firestore
          firestoreDb.collection('settings').doc('portfolio').onSnapshot((doc) => {
            if (doc.exists) {
              const cloudData = doc.data();
              if (cloudData && cloudData.projects) {
                appConfig = { ...appConfig, ...cloudData };
                saveLocalConfig(appConfig);
                renderWorksList();
                populatePortfolioForm();
              }
            }
          }, (err) => {
            console.warn('Firestore snapshot error:', err);
          });
        }
      }
    } catch (e) {
      console.warn('Firebase init note:', e);
      updateSyncIndicator(false);
    }
  }

  async function saveConfigToCloudAndLocal(cfg) {
    // 1. Always save local immediately
    saveLocalConfig(cfg);
    appConfig = cfg;
    updateSyncIndicator(isCloudConnected);

    // 2. If Firestore is active, push to Cloud
    if (isCloudConnected && firestoreDb) {
      try {
        await firestoreDb.collection('settings').doc('portfolio').set(cfg, { merge: true });
        showToast("¡Cambios publicados en la Nube y Portafolio!");
      } catch (err) {
        console.warn('Error saving to Firestore:', err);
        showToast("Guardado localmente (sin conexión a la nube)");
      }
    } else {
      showToast("Cambios guardados localmente");
    }
  }

  function updateSyncIndicator(online) {
    const dot = document.querySelector('.sync-dot');
    const text = document.getElementById('sync-text');
    if (!dot || !text) return;
    if (online) {
      dot.classList.remove('offline');
      text.textContent = "Nube Conectada";
    } else {
      dot.classList.add('offline');
      text.textContent = "Almacenamiento Local";
    }
  }

  /* ==========================================================================
     5.5 INQUIRIES & ORDERS CONTROLLER (NOTIFICATIONS & LIVE INBOX)
     ========================================================================== */
  let currentInquiryFilter = 'all';

  function getStoredInquiries() {
    try {
      return JSON.parse(localStorage.getItem('wm_orders_inbox') || '[]');
    } catch(e) {
      return [];
    }
  }

  function saveStoredInquiries(orders) {
    try {
      localStorage.setItem('wm_orders_inbox', JSON.stringify(orders));
      updateInquiriesBadge();
    } catch(e) {}
  }

  function playOrderNotificationChime() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch(e) {}
  }

  function triggerOrderAlert(order) {
    triggerHaptic([50, 70, 50]);
    playOrderNotificationChime();
    showToast(`🔔 ¡Nuevo pedido de ${order.name}!`);

    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`Nuevo Pedido: ${order.name}`, {
          body: `${order.service} · ${order.budget}\n"${(order.message || '').slice(0, 90)}..."`,
          icon: 'icons/icon-192.svg'
        });
      } catch(e) {}
    }
  }

  function updateInquiriesBadge() {
    const orders = getStoredInquiries();
    const unreadCount = orders.filter(o => o.status === 'unread' || !o.read).length;
    const totalCount = orders.length;

    const badge = document.getElementById('badge-inquiries-count');
    const dot = document.getElementById('header-unread-dot');
    const totalEl = document.getElementById('inquiries-total-count');
    const countAllEl = document.getElementById('inquiry-count-all');
    const countUnreadEl = document.getElementById('inquiry-count-unread');
    const countContactedEl = document.getElementById('inquiry-count-contacted');

    if (badge) {
      if (unreadCount > 0) {
        badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
        badge.style.display = 'inline-block';
      } else {
        badge.style.display = 'none';
      }
    }

    if (dot) {
      dot.style.display = unreadCount > 0 ? 'block' : 'none';
    }

    if (totalEl) totalEl.textContent = totalCount;
    if (countAllEl) countAllEl.textContent = totalCount;
    if (countUnreadEl) countUnreadEl.textContent = unreadCount;
    if (countContactedEl) countContactedEl.textContent = orders.filter(o => o.status === 'contacted').length;
  }

  function renderInquiriesList() {
    const listEl = document.getElementById('inquiries-list');
    if (!listEl) return;

    updateInquiriesBadge();
    const orders = getStoredInquiries();

    const filtered = orders.filter(o => {
      if (currentInquiryFilter === 'unread') return o.status === 'unread' || !o.read;
      if (currentInquiryFilter === 'contacted') return o.status === 'contacted';
      return true;
    });

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 48px 16px; color: var(--fg-secondary);">
          <div style="font-size: 38px; margin-bottom: 12px; opacity: 0.7;">📭</div>
          <h3 style="font-family: var(--font-display); font-size: 16px; color: var(--fg-primary); margin-bottom: 6px;">Bandeja al día</h3>
          <p style="font-size: 12px; line-height: 1.45; max-width: 320px; margin: 0 auto; color: var(--fg-tertiary);">
            Cuando un cliente envíe una propuesta o cotización desde el formulario de contacto, aparecerá aquí en tiempo real con sus datos y presupuesto.
          </p>
          <button type="button" class="admin-btn-ghost" id="btn-create-sample-order" style="margin-top: 16px; font-size: 11px; display: inline-flex; align-items: center; gap: 6px;">
            <span>+ Generar Pedido de Demostración</span>
          </button>
        </div>
      `;
      const btnSample = document.getElementById('btn-create-sample-order');
      if (btnSample) {
        btnSample.onclick = () => {
          const sample = {
            id: 'ped_demo_' + Date.now(),
            timestamp: new Date().toISOString(),
            dateFormatted: new Intl.DateTimeFormat('es-CO', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }).format(new Date()),
            name: 'Galería & Editorial Meridiano',
            email: 'curaduria@editorialmeridiano.com',
            service: 'Diseño Editorial & Maquetación',
            budget: '$1,200 - $2,500 USD',
            message: 'Hola Wilmar, nos ha impresionado tu dirección visual y dominio del claroscuro. Deseamos contratar la dirección de arte y diseño de portada para un libro de ensayo visual de 240 páginas.',
            status: 'unread',
            read: false
          };
          const cur = getStoredInquiries();
          cur.unshift(sample);
          saveStoredInquiries(cur);
          triggerOrderAlert(sample);
          renderInquiriesList();
        };
      }
      return;
    }

    listEl.innerHTML = '';
    filtered.forEach((order) => {
      const isUnread = order.status === 'unread' || !order.read;
      const card = document.createElement('div');
      card.className = `inquiry-card ${isUnread ? 'unread' : ''}`;

      const replySubject = encodeURIComponent(`Respuesta a tu propuesta de proyecto [${order.service}] — Wilmar Machado`);
      const replyBody = encodeURIComponent(`Hola ${order.name},

Gracias por ponerte en contacto y compartir tu visión para este proyecto de ${order.service}.

He revisado tu propuesta con atención:
"${order.message}"

Con gusto podemos agendar una llamada o continuar por este medio para definir detalles y cronograma.

Un cordial saludo,
Wilmar Machado
Diseño Gráfico & Arte Sacro
Valledupar · Colombia`);

      const mailtoUrl = `mailto:${encodeURIComponent(order.email)}?subject=${replySubject}&body=${replyBody}`;

      card.innerHTML = `
        <div class="inquiry-card-header">
          <div class="inquiry-client-info">
            <span class="inquiry-client-name">${escapeHtml(order.name)}</span>
            <a href="mailto:${escapeHtml(order.email)}" class="inquiry-client-email">${escapeHtml(order.email)}</a>
          </div>
          <span class="inquiry-badge-status ${isUnread ? 'new' : 'contacted'}">
            ${isUnread ? '● NUEVO' : 'ATENDIDO'}
          </span>
        </div>

        <div class="inquiry-meta-row">
          <span class="inquiry-pill service">${escapeHtml(order.service || 'Diseño Visual')}</span>
          <span class="inquiry-pill budget">${escapeHtml(order.budget || 'A convenir')}</span>
          <span class="inquiry-pill date">${escapeHtml(order.dateFormatted || 'Reciente')}</span>
        </div>

        <div class="inquiry-message-box">
          <p class="inquiry-message-text">${escapeHtml(order.message || 'Sin mensaje adicional.')}</p>
        </div>

        <div class="inquiry-actions-row">
          <button type="button" class="inquiry-btn copy" data-id="${order.id}" title="Copiar resumen">
            <span>📋 Copiar</span>
          </button>
          <button type="button" class="inquiry-btn toggle-status" data-id="${order.id}">
            <span>${isUnread ? '✓ Marcar Atendido' : '↺ Marcar Nuevo'}</span>
          </button>
          <a href="${mailtoUrl}" class="inquiry-btn reply">
            <span>✉ Responder</span>
          </a>
          <button type="button" class="inquiry-btn delete" data-id="${order.id}" title="Eliminar propuesta">
            <span>✕</span>
          </button>
        </div>
      `;

      const copyBtn = card.querySelector('.inquiry-btn.copy');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          triggerHaptic(15);
          const summary = `Cliente: ${order.name} (${order.email})\nDisciplina: ${order.service}\nPresupuesto: ${order.budget}\nMensaje:\n${order.message}`;
          navigator.clipboard.writeText(summary).then(() => {
            showToast('✓ Resumen copiado al portapapeles');
          });
        });
      }

      const toggleBtn = card.querySelector('.inquiry-btn.toggle-status');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          triggerHaptic(20);
          toggleInquiryStatus(order.id);
        });
      }

      const delBtn = card.querySelector('.inquiry-btn.delete');
      if (delBtn) {
        delBtn.addEventListener('click', () => {
          triggerHaptic(30);
          if (confirm(`¿Eliminar la propuesta de ${order.name}?`)) {
            deleteInquiry(order.id);
          }
        });
      }

      listEl.appendChild(card);
    });
  }

  function toggleInquiryStatus(id) {
    const orders = getStoredInquiries();
    const target = orders.find(o => o.id === id);
    if (!target) return;
    if (target.status === 'unread' || !target.read) {
      target.status = 'contacted';
      target.read = true;
      showToast('Propuesta marcada como atendida');
    } else {
      target.status = 'unread';
      target.read = false;
      showToast('Propuesta marcada como nueva');
    }
    saveStoredInquiries(orders);
    renderInquiriesList();
  }

  function deleteInquiry(id) {
    let orders = getStoredInquiries();
    orders = orders.filter(o => o.id !== id);
    saveStoredInquiries(orders);
    renderInquiriesList();
    showToast('Propuesta eliminada de la bandeja');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     6. TAB 1: GESTOR DE OBRAS (CRUD & REORDER)
     ========================================================================== */
  function renderWorksList() {
    const listContainer = document.getElementById('works-list');
    const countAllEl = document.getElementById('count-all');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    const works = appConfig.projects || [];
    if (countAllEl) countAllEl.textContent = works.length;

    const filteredWorks = works.filter((w, idx) => {
      w._originalIndex = idx;
      if (currentFilter === 'all') return true;
      return (w.category || '').toLowerCase() === currentFilter.toLowerCase();
    });

    if (filteredWorks.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--fg-secondary);">
          <p style="font-size: 14px; margin-bottom: 8px;">No hay obras en esta categoría.</p>
          <button type="button" class="action-btn-gold" id="btn-empty-add">+ Crear Primera Obra</button>
        </div>
      `;
      const btnEmpty = document.getElementById('btn-empty-add');
      if (btnEmpty) btnEmpty.onclick = () => openArtworkEditor(-1);
      return;
    }

    filteredWorks.forEach((item) => {
      const idx = item._originalIndex;
      const card = document.createElement('div');
      card.className = 'work-item-card';

      const imgSrc = item.image || item.url || (item.id ? `https://lh3.googleusercontent.com/d/${item.id}` : 'images/obra-01.jpg');

      card.innerHTML = `
        <div class="work-thumb-box">
          <img src="${imgSrc}" alt="${item.title}" loading="lazy" onerror="this.src='images/obra-01.jpg'">
          <span class="work-idx-badge">${String(idx + 1).padStart(2, '0')}</span>
        </div>
        <div class="work-content-box">
          <div class="work-card-top">
            <span class="work-cat-tag">${formatCategoryName(item.category)}</span>
            <h3 class="work-title-text">${item.title || 'Sin Título'}</h3>
            <p class="work-subtitle-text">${item.place || ''}</p>
          </div>
          <div class="work-card-actions">
            <span class="work-year-pill">${item.year || '2026'}</span>
            <div class="work-btn-group">
              <button type="button" class="card-action-btn edit" data-index="${idx}">
                <span>&#9998; Editar</span>
              </button>
              <button type="button" class="card-action-btn up" data-index="${idx}" title="Subir orden" ${idx === 0 ? 'disabled style="opacity:0.3"' : ''}>
                <span>&uarr;</span>
              </button>
              <button type="button" class="card-action-btn down" data-index="${idx}" title="Bajar orden" ${idx === works.length - 1 ? 'disabled style="opacity:0.3"' : ''}>
                <span>&darr;</span>
              </button>
            </div>
          </div>
        </div>
      `;

      // Event listeners for cards
      const editBtn = card.querySelector('.card-action-btn.edit');
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openArtworkEditor(idx);
      });

      const upBtn = card.querySelector('.card-action-btn.up');
      if (upBtn) {
        upBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          moveArtwork(idx, -1);
        });
      }

      const downBtn = card.querySelector('.card-action-btn.down');
      if (downBtn) {
        downBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          moveArtwork(idx, 1);
        });
      }

      listContainer.appendChild(card);
    });
  }

  function formatCategoryName(cat) {
    switch((cat || '').toLowerCase()) {
      case 'sacro': return 'Arte Sacro';
      case 'editorial': return 'Diseño Editorial';
      case 'foto': return 'Fotografía';
      case 'grafico': return 'Arte Gráfico';
      default: return cat || 'Obra';
    }
  }

  function moveArtwork(index, direction) {
    const works = appConfig.projects;
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= works.length) return;

    triggerHaptic(20);
    const item = works.splice(index, 1)[0];
    works.splice(targetIndex, 0, item);

    saveConfigToCloudAndLocal(appConfig);
    renderWorksList();
  }

  /* ==========================================================================
     7. ARTWORK EDITOR MODAL
     ========================================================================== */
  function openArtworkEditor(index) {
    triggerHaptic(25);
    const modal = document.getElementById('modal-artwork-editor');
    const modalTitle = document.getElementById('editor-modal-title');
    const idxInput = document.getElementById('edit-work-index');
    const deleteBtn = document.getElementById('btn-delete-artwork');
    const previewImg = document.getElementById('editor-img-preview');

    idxInput.value = index;

    if (index >= 0 && appConfig.projects[index]) {
      const item = appConfig.projects[index];
      modalTitle.textContent = `Editar Obra #${index + 1}`;
      deleteBtn.style.display = 'block';

      document.getElementById('edit-title').value = item.title || '';
      document.getElementById('edit-title-en').value = item.title_en || '';
      document.getElementById('edit-year').value = item.year || '2026';
      document.getElementById('edit-category').value = item.category || 'grafico';
      document.getElementById('edit-place').value = item.place || '';
      document.getElementById('edit-place-en').value = item.place_en || '';
      document.getElementById('edit-note').value = item.note || '';
      document.getElementById('edit-note-en').value = item.note_en || '';
      document.getElementById('edit-role').value = item.role || '';
      document.getElementById('edit-role-en').value = item.role_en || '';
      document.getElementById('edit-medium').value = item.medium || '';
      document.getElementById('edit-medium-en').value = item.medium_en || '';
      document.getElementById('edit-typography').value = item.typography || '';
      document.getElementById('edit-client').value = item.client || '';
      document.getElementById('edit-client-en').value = item.client_en || '';
      document.getElementById('edit-image-src').value = item.image || item.url || '';

      const imgSrc = item.image || item.url || (item.id ? `https://lh3.googleusercontent.com/d/${item.id}` : 'images/obra-01.jpg');
      previewImg.src = imgSrc;
    } else {
      // New artwork
      modalTitle.textContent = 'Crear Nueva Obra';
      deleteBtn.style.display = 'none';

      document.getElementById('edit-title').value = '';
      document.getElementById('edit-title-en').value = '';
      document.getElementById('edit-year').value = new Date().getFullYear();
      document.getElementById('edit-category').value = 'grafico';
      document.getElementById('edit-place').value = '';
      document.getElementById('edit-place-en').value = '';
      document.getElementById('edit-note').value = '';
      document.getElementById('edit-note-en').value = '';
      document.getElementById('edit-role').value = 'Diseño Gráfico & Composición';
      document.getElementById('edit-role-en').value = 'Graphic Design & Composition';
      document.getElementById('edit-medium').value = 'Técnica Mixta · Fine Art';
      document.getElementById('edit-medium-en').value = 'Mixed Media · Fine Art';
      document.getElementById('edit-typography').value = 'Cormorant Garamond & Cinzel';
      document.getElementById('edit-client').value = 'Colección Autoral';
      document.getElementById('edit-client-en').value = "Author's Collection";
      document.getElementById('edit-image-src').value = '';
      previewImg.src = 'images/obra-01.jpg';
    }

    modal.classList.add('active');
  }

  function closeArtworkEditor() {
    const modal = document.getElementById('modal-artwork-editor');
    if (modal) modal.classList.remove('active');
  }

  function saveArtworkFromEditor() {
    const index = parseInt(document.getElementById('edit-work-index').value, 10);
    const title = document.getElementById('edit-title').value.trim();

    if (!title) {
      showToast('Por favor escribe al menos el título de la obra');
      document.getElementById('edit-title').focus();
      return;
    }

    triggerHaptic(40);
    const newWorkData = {
      title: title,
      title_en: document.getElementById('edit-title-en').value.trim() || title,
      year: document.getElementById('edit-year').value.trim() || '2026',
      category: document.getElementById('edit-category').value,
      place: document.getElementById('edit-place').value.trim(),
      place_en: document.getElementById('edit-place-en').value.trim() || document.getElementById('edit-place').value.trim(),
      note: document.getElementById('edit-note').value.trim(),
      note_en: document.getElementById('edit-note-en').value.trim(),
      role: document.getElementById('edit-role').value.trim(),
      role_en: document.getElementById('edit-role-en').value.trim(),
      medium: document.getElementById('edit-medium').value.trim(),
      medium_en: document.getElementById('edit-medium-en').value.trim(),
      typography: document.getElementById('edit-typography').value.trim(),
      client: document.getElementById('edit-client').value.trim(),
      client_en: document.getElementById('edit-client-en').value.trim(),
      image: document.getElementById('edit-image-src').value.trim() || 'images/obra-01.jpg'
    };

    if (index >= 0) {
      // Update existing
      appConfig.projects[index] = {
        ...appConfig.projects[index],
        ...newWorkData
      };
      showToast('Obra actualizada correctamente');
    } else {
      // Append new
      appConfig.projects.push(newWorkData);
      showToast('Nueva obra añadida al portafolio');
    }

    saveConfigToCloudAndLocal(appConfig);
    closeArtworkEditor();
    renderWorksList();
  }

  function deleteCurrentArtwork() {
    const index = parseInt(document.getElementById('edit-work-index').value, 10);
    if (index < 0 || !appConfig.projects[index]) return;

    const currentTitle = appConfig.projects[index].title;
    if (confirm(`¿Seguro que deseas eliminar la obra "${currentTitle}" del portafolio?`)) {
      triggerHaptic(50);
      appConfig.projects.splice(index, 1);
      saveConfigToCloudAndLocal(appConfig);
      closeArtworkEditor();
      renderWorksList();
      showToast('Obra eliminada del catálogo');
    }
  }

  // Mobile image upload handler (FileReader to Data URL or Storage)
  function handleImageUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    triggerHaptic(20);
    showToast('Procesando imagen...');

    // Resize/Compress image in client browser before saving
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1600;
        const MAX_HEIGHT = 2000;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        // Update preview & input
        document.getElementById('editor-img-preview').src = dataUrl;
        document.getElementById('edit-image-src').value = dataUrl;
        triggerHaptic(40);
        showToast('Imagen cargada y optimizada');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  /* ==========================================================================
     8. TAB 2: PERSONALIZACIÓN DEL PORTAFOLIO
     ========================================================================== */
  function populatePortfolioForm() {
    const p = appConfig.profile || {};
    setVal('cfg-availability', p.availability);
    setVal('cfg-email', p.email);
    setVal('cfg-instagram', p.instagram);
    setVal('cfg-instagramUrl', p.instagramUrl);
    setVal('cfg-behance', p.behance);
    setVal('cfg-behanceUrl', p.behanceUrl);
    setVal('cfg-location', p.location);
    setVal('cfg-videoGreeting', p.videoGreeting);
    setVal('cfg-videoRole', p.videoRole);
    setVal('cfg-videoBrand', p.videoBrand);
    setVal('cfg-statementQuote', p.statementQuote);
    setVal('cfg-statementQuote_en', p.statementQuote_en);
    setVal('cfg-statementBio', p.statementBio);
    setVal('cfg-statementBio_en', p.statementBio_en);
  }

  function savePortfolioForm() {
    triggerHaptic(40);
    appConfig.profile = appConfig.profile || {};
    appConfig.profile.availability = getVal('cfg-availability');
    appConfig.profile.email = getVal('cfg-email');
    appConfig.profile.instagram = getVal('cfg-instagram');
    appConfig.profile.instagramUrl = getVal('cfg-instagramUrl');
    appConfig.profile.behance = getVal('cfg-behance');
    appConfig.profile.behanceUrl = getVal('cfg-behanceUrl');
    appConfig.profile.location = getVal('cfg-location');
    appConfig.profile.videoGreeting = getVal('cfg-videoGreeting');
    appConfig.profile.videoRole = getVal('cfg-videoRole');
    appConfig.profile.videoBrand = getVal('cfg-videoBrand');
    appConfig.profile.statementQuote = getVal('cfg-statementQuote');
    appConfig.profile.statementQuote_en = getVal('cfg-statementQuote_en');
    appConfig.profile.statementBio = getVal('cfg-statementBio');
    appConfig.profile.statementBio_en = getVal('cfg-statementBio_en');

    saveConfigToCloudAndLocal(appConfig);
  }

  /* ==========================================================================
     9. TAB 3: ESTILO & ESFERA 3D
     ========================================================================== */
  function populateStyleForm() {
    const s = appConfig.style || {};
    const accent = s.accent || '#d4a359';
    setVal('cfg-accent-picker', accent);
    setVal('cfg-accent-text', accent);
    setVal('cfg-sphereRadius', s.sphereRadius || 950);
    setVal('cfg-rotationSpeed', s.rotationSpeed || 0.003);

    const radiusLabel = document.getElementById('label-sphere-radius');
    if (radiusLabel) radiusLabel.textContent = `${s.sphereRadius || 950} px`;

    const speedLabel = document.getElementById('label-sphere-speed');
    if (speedLabel) speedLabel.textContent = s.rotationSpeed || '0.003';
  }

  function saveStyleForm() {
    triggerHaptic(40);
    appConfig.style = appConfig.style || {};
    appConfig.style.accent = getVal('cfg-accent-picker') || '#d4a359';
    appConfig.style.sphereRadius = parseInt(getVal('cfg-sphereRadius'), 10) || 950;
    appConfig.style.rotationSpeed = parseFloat(getVal('cfg-rotationSpeed')) || 0.003;

    saveConfigToCloudAndLocal(appConfig);
  }

  /* ==========================================================================
     10. TAB 4: NUBE & SEGURIDAD
     ========================================================================== */
  function populateSecurityForm() {
    const ownerEmailInput = document.getElementById('cfg-ownerEmail');
    if (ownerEmailInput) ownerEmailInput.value = getOwnerEmail();

    try {
      const savedFirebase = localStorage.getItem(FIREBASE_KEY);
      if (savedFirebase) {
        const fb = JSON.parse(savedFirebase);
        setVal('cfg-firebase-apiKey', fb.apiKey);
        setVal('cfg-firebase-projectId', fb.projectId);
        setVal('cfg-firebase-authDomain', fb.authDomain);
        setVal('cfg-firebase-storageBucket', fb.storageBucket);
      }
    } catch(e) {}
  }

  function saveFirebaseConfig() {
    triggerHaptic(40);
    const fb = {
      apiKey: getVal('cfg-firebase-apiKey'),
      projectId: getVal('cfg-firebase-projectId'),
      authDomain: getVal('cfg-firebase-authDomain'),
      storageBucket: getVal('cfg-firebase-storageBucket')
    };

    if (!fb.apiKey || !fb.projectId) {
      showToast('Ingresa al menos API Key y Project ID de Firebase');
      return;
    }

    localStorage.setItem(FIREBASE_KEY, JSON.stringify(fb));
    showToast('Configuración Firebase guardada');
    initFirebaseIfConfigured();
  }

  // Backup JSON Export & Import
  function exportBackupJSON() {
    triggerHaptic(30);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appConfig, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `wilmar_portafolio_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showToast("Copia de seguridad descargada");
  }

  function importBackupJSON(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
      try {
        const parsed = JSON.parse(evt.target.result);
        if (parsed && parsed.projects) {
          appConfig = parsed;
          saveConfigToCloudAndLocal(appConfig);
          renderWorksList();
          populatePortfolioForm();
          populateStyleForm();
          showToast("¡Respaldo importado y restaurado exitosamente!");
        } else {
          showToast("Archivo JSON no válido para el portafolio.");
        }
      } catch (err) {
        showToast("Error al leer el archivo JSON: " + err.message);
      }
    };
    reader.readAsText(file);
  }

  function factoryReset() {
    if (confirm("¿Estás seguro de restablecer el portafolio a los 10 proyectos originales de fábrica? Se sobrescribirán los cambios.")) {
      triggerHaptic([50, 50]);
      appConfig = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
      saveConfigToCloudAndLocal(appConfig);
      renderWorksList();
      populatePortfolioForm();
      populateStyleForm();
      showToast("Portafolio restablecido a configuración original.");
    }
  }

  /* ==========================================================================
     11. HELPERS & UTILITIES
     ========================================================================== */
  function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined && val !== null) el.value = val;
  }

  function showToast(message) {
    const toast = document.getElementById('admin-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  function showAuthAlert(msg, type) {
    const alertBox = document.getElementById('auth-alert');
    if (!alertBox) return;
    alertBox.textContent = msg;
    alertBox.className = `auth-alert ${type}`;
  }

  function triggerHaptic(duration) {
    if (navigator.vibrate) {
      try { navigator.vibrate(duration); } catch(e) {}
    }
  }

  /* ==========================================================================
     12. EVENT LISTENERS INITIALIZATION
     ========================================================================== */
  function initEvents() {
    // Biometric Unlock & Smart Passkey Trigger
    const btnBiometric = document.getElementById('btn-biometric-unlock');
    if (btnBiometric) {
      btnBiometric.addEventListener('click', handleBiometricClick);
    }

    const btnRegisterPrompt = document.getElementById('btn-register-passkey-prompt');
    if (btnRegisterPrompt) {
      btnRegisterPrompt.addEventListener('click', registerBiometrics);
    }

    // Google Sign-In Trigger
    const btnGoogle = document.getElementById('btn-google-login');
    if (btnGoogle) {
      btnGoogle.addEventListener('click', loginWithGoogle);
    }

    // Backup Password Toggle & Submit
    const btnToggleBackup = document.getElementById('btn-toggle-backup');
    const backupForm = document.getElementById('backup-auth-form');
    if (btnToggleBackup && backupForm) {
      btnToggleBackup.addEventListener('click', () => {
        backupForm.classList.toggle('hidden');
        if (!backupForm.classList.contains('hidden')) {
          document.getElementById('input-backup-password').focus();
        }
      });

      backupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pass = document.getElementById('input-backup-password').value;
        loginWithBackupPassword(pass);
      });
    }

    // Lock session button
    const btnLock = document.getElementById('btn-lock-session');
    if (btnLock) {
      btnLock.addEventListener('click', lockAppShell);
    }

    // Bottom Navigation Bar Tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        triggerHaptic(15);
        navTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const targetId = tab.getAttribute('data-target');
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        const activePanel = document.getElementById(targetId);
        if (activePanel) activePanel.classList.add('active');
      });
    });

    // Discipline Filter Chips
    const chips = document.querySelectorAll('.filter-chips-scroller .chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        triggerHaptic(15);
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.getAttribute('data-filter') || 'all';
        renderWorksList();
      });
    });

    // Add Artwork button
    const btnAddWork = document.getElementById('btn-add-artwork');
    if (btnAddWork) {
      btnAddWork.addEventListener('click', () => openArtworkEditor(-1));
    }

    // Close Artwork Editor button
    const btnCloseEditor = document.getElementById('btn-close-artwork-editor');
    if (btnCloseEditor) {
      btnCloseEditor.addEventListener('click', closeArtworkEditor);
    }

    // Save Artwork Item button
    const btnSaveItem = document.getElementById('btn-save-artwork-item');
    if (btnSaveItem) {
      btnSaveItem.addEventListener('click', saveArtworkFromEditor);
    }

    // Delete Artwork Item button
    const btnDeleteWork = document.getElementById('btn-delete-artwork');
    if (btnDeleteWork) {
      btnDeleteWork.addEventListener('click', deleteCurrentArtwork);
    }

    // Image file upload input
    const inputUploadImg = document.getElementById('input-upload-image');
    if (inputUploadImg) {
      inputUploadImg.addEventListener('change', handleImageUpload);
    }

    // Save Portfolio Settings button
    const btnSavePortfolio = document.getElementById('btn-save-portfolio-settings');
    if (btnSavePortfolio) {
      btnSavePortfolio.addEventListener('click', savePortfolioForm);
    }

    // Save Style Settings button
    const btnSaveStyle = document.getElementById('btn-save-style-settings');
    if (btnSaveStyle) {
      btnSaveStyle.addEventListener('click', saveStyleForm);
    }

    // Color picker syncing
    const picker = document.getElementById('cfg-accent-picker');
    const pickerText = document.getElementById('cfg-accent-text');
    if (picker && pickerText) {
      picker.addEventListener('input', () => { pickerText.value = picker.value; });
      pickerText.addEventListener('input', () => { picker.value = pickerText.value; });
    }

    // Color preset pills
    const colorPills = document.querySelectorAll('.color-preset-pill');
    colorPills.forEach(pill => {
      pill.addEventListener('click', () => {
        colorPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const col = pill.getAttribute('data-color');
        if (picker) picker.value = col;
        if (pickerText) pickerText.value = col;
      });
    });

    // Slider value live labels
    const radiusSlider = document.getElementById('cfg-sphereRadius');
    const radiusLabel = document.getElementById('label-sphere-radius');
    if (radiusSlider && radiusLabel) {
      radiusSlider.addEventListener('input', () => {
        radiusLabel.textContent = `${radiusSlider.value} px`;
      });
    }

    const speedSlider = document.getElementById('cfg-rotationSpeed');
    const speedLabel = document.getElementById('label-sphere-speed');
    if (speedSlider && speedLabel) {
      speedSlider.addEventListener('input', () => {
        speedLabel.textContent = speedSlider.value;
      });
    }

    // Biometrics Enroll & Test buttons
    const btnEnrollBio = document.getElementById('btn-enroll-biometrics');
    if (btnEnrollBio) {
      btnEnrollBio.addEventListener('click', registerBiometrics);
    }

    const btnTestBio = document.getElementById('btn-test-biometrics');
    if (btnTestBio) {
      btnTestBio.addEventListener('click', authenticateWithBiometrics);
    }

    // Save Firebase configuration button
    const btnSaveFb = document.getElementById('btn-save-firebase-config');
    if (btnSaveFb) {
      btnSaveFb.addEventListener('click', saveFirebaseConfig);
    }

    const btnTestSync = document.getElementById('btn-test-cloud-sync');
    if (btnTestSync) {
      btnTestSync.addEventListener('click', () => {
        if (isCloudConnected) {
          showToast('✓ Conexión en la nube verificada correctamente');
        } else {
          showToast('Configura tus credenciales de Firebase para sincronizar en la nube');
        }
      });
    }

    // Export & Import backup buttons
    const btnExportJson = document.getElementById('btn-export-json');
    if (btnExportJson) {
      btnExportJson.addEventListener('click', exportBackupJSON);
    }

    const inputImportJson = document.getElementById('input-import-json');
    if (inputImportJson) {
      inputImportJson.addEventListener('change', importBackupJSON);
    }

    const btnFactory = document.getElementById('btn-factory-reset');
    if (btnFactory) {
      btnFactory.addEventListener('click', factoryReset);
    }

    // Inquiries / Orders Filter Chips
    const inquiryChips = document.querySelectorAll('[data-inquiry-filter]');
    inquiryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        triggerHaptic(15);
        inquiryChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentInquiryFilter = chip.getAttribute('data-inquiry-filter') || 'all';
        renderInquiriesList();
      });
    });

    // Header Bell Button: Quick jump to Inquiries Tab
    const btnHeaderInquiries = document.getElementById('btn-header-inquiries');
    if (btnHeaderInquiries) {
      btnHeaderInquiries.addEventListener('click', () => {
        triggerHaptic(20);
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        const inqTab = document.getElementById('nav-tab-inquiries');
        if (inqTab) inqTab.classList.add('active');

        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        const inqPanel = document.getElementById('tab-inquiries');
        if (inqPanel) inqPanel.classList.add('active');

        renderInquiriesList();
      });
    }

    // Request Web Push Notifications for incoming orders
    const btnReqNotif = document.getElementById('btn-request-notifications');
    if (btnReqNotif) {
      if ('Notification' in window && Notification.permission === 'granted') {
        btnReqNotif.innerHTML = '<span>✓ Avisos Activos</span>';
        btnReqNotif.style.opacity = '0.7';
      }
      btnReqNotif.addEventListener('click', async () => {
        triggerHaptic(20);
        if ('Notification' in window) {
          try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
              showToast('✓ Notificaciones activadas para nuevos pedidos');
              btnReqNotif.innerHTML = '<span>✓ Avisos Activos</span>';
              btnReqNotif.style.opacity = '0.7';
              new Notification('Consola Wilmar Machado', {
                body: 'Avisos configurados correctamente. Recibirás una notificación cuando un cliente envíe una propuesta.',
                icon: 'icons/icon-192.svg'
              });
            } else {
              showToast('Permiso de notificaciones denegado en el navegador');
            }
          } catch(e) {
            showToast('No se pudieron activar las notificaciones');
          }
        } else {
          showToast('Tu navegador móvil no soporta notificaciones de sistema');
        }
      });
    }

    // Cross-tab real-time sync for orders
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const bc = new BroadcastChannel('wm_orders_channel');
        bc.onmessage = (event) => {
          if (event.data && event.data.type === 'NEW_ORDER') {
            triggerOrderAlert(event.data.order);
            renderInquiriesList();
          }
        };
      } catch(e) {}
    }

    window.addEventListener('storage', (e) => {
      if (e.key === 'wm_orders_inbox') {
        updateInquiriesBadge();
        renderInquiriesList();
      }
    });
  }

  /* ==========================================================================
     13. INITIAL BOOTSTRAP
     ========================================================================== */
  async function init() {
    appConfig = loadLocalConfig();
    initFirebaseIfConfigured();
    initEvents();
    updateInquiriesBadge();
    await checkBiometricSupport();

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(err => {
        console.warn('SW registration:', err);
      });
    }

    // Auto-prompt biometrics on launch if credential exists
    const hasBiometricCred = localStorage.getItem(BIO_CRED_KEY);
    if (hasBiometricCred && window.PublicKeyCredential) {
      setTimeout(() => {
        authenticateWithBiometrics();
      }, 500);
    }
  }

  window.addEventListener('DOMContentLoaded', init);
})();
