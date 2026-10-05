/**
 * ==========================================================================
 * WILMAR MACHADO 2026 — CINEMATIC EXPERIENCE PRELOADER & ASSET CACHE ENGINE
 * Motor de Precarga Forzada y Almacenamiento en Caché de Alta Fidelidad
 * ==========================================================================
 */
(function() {
  'use strict';

  const STORAGE_CFG_KEY = 'wilmar_portfolio_config_v3';
  const SESSION_PRELOAD_KEY = 'wm_preload_done_v2026';

  // DOM Elements
  const preloader = document.getElementById('experience-preloader');
  if (!preloader) return;

  const statusText = document.getElementById('preloader-status-text');
  const detailText = document.getElementById('preloader-detail-text');
  const percentNum = document.getElementById('preloader-percent-num');
  const progressFill = document.getElementById('preloader-progress-fill');
  const skipBtn = document.getElementById('preloader-skip-btn');

  // Prevent scroll during loading
  document.body.classList.add('loading');

  // Determine current language from localStorage or default 'es'
  let isEn = false;
  try {
    isEn = (localStorage.getItem('wilmar_portfolio_lang') === 'en');
  } catch(e) {}

  // Curatorial phrases for status
  const PHRASES = {
    es: {
      init: "Iniciando archivo y preparando arquitectura...",
      fonts: "Sincronizando tipografías y proporciones áureas...",
      images: "Descargando catálogo de obras en alta resolución...",
      decode: "Decodificando texturas en memoria GPU...",
      video: "Preparando prólogo visual en alta fidelidad...",
      audio: "Sincronizando banda sonora Jazz Hop...",
      sphere: "Construyendo espacio tridimensional...",
      ready: "Experiencia lista · Revelando portafolio",
      detail: "Precargando recursos en caché del dispositivo",
      skip: "Continuar de todos modos →"
    },
    en: {
      init: "Initializing archive & visual framework...",
      fonts: "Synchronizing bespoke typography & golden ratio...",
      images: "Downloading high-resolution masterworks...",
      decode: "Compiling GPU image textures in memory...",
      video: "Buffering visual prologue in high fidelity...",
      audio: "Synchronizing Jazz Hop soundtrack...",
      sphere: "Assembling 3D Fibonacci space...",
      ready: "Experience ready · Unveiling portfolio",
      detail: "Caching assets in device memory",
      skip: "Continue anyway →"
    }
  };

  const texts = isEn ? PHRASES.en : PHRASES.es;

  // Retrieve asset targets dynamically from configuration or defaults
  function getAssetTargets() {
    let videoSrc = 'video.mp4';
    let videoPosterSrc = 'video_poster.jpg';
    let audioSrc = 'Midnight_Blueprint.mp3';
    let imageSources = [
      'images/obra-01.jpg',
      'images/obra-02.jpg',
      'images/obra-03.jpg',
      'images/obra-04.jpg',
      'images/obra-05.jpg',
      'images/obra-06.jpg',
      'images/obra-07.jpg',
      'images/obra-08.jpg',
      'images/obra-09.jpg',
      'images/obra-10.jpg'
    ];

    try {
      const stored = localStorage.getItem(STORAGE_CFG_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.profile && parsed.profile.videoSrc) {
          videoSrc = parsed.profile.videoSrc;
        }
        if (Array.isArray(parsed.projects) && parsed.projects.length > 0) {
          imageSources = parsed.projects.map((p, idx) => {
            return p.imageSrc || p.image || `images/obra-${String(idx + 1).padStart(2, '0')}.jpg`;
          });
        }
      }
    } catch(e) {
      console.warn('Preloader config read note:', e);
    }

    return { videoSrc, videoPosterSrc, audioSrc, imageSources };
  }

  const { videoSrc, videoPosterSrc, audioSrc, imageSources } = getAssetTargets();

  // Optimized Progress Weights for Rapid Responsiveness:
  // Fonts: 10%
  // Video Poster & Frame: 30%
  // Audio Track: 20%
  // Images: 40%
  const FONT_WEIGHT = 10;
  const VIDEO_WEIGHT = 30;
  const AUDIO_WEIGHT = 20;
  const IMAGES_WEIGHT = 40;
  const PER_IMAGE_WEIGHT = imageSources.length > 0 ? (IMAGES_WEIGHT / imageSources.length) : 4;

  let currentTargetProgress = 0;
  let currentDisplayProgress = 0;
  let isCompleted = false;
  let animFrameId = null;

  // Update Status Text with smooth fade
  function setStatus(msg) {
    if (!statusText) return;
    statusText.style.opacity = '0.6';
    setTimeout(() => {
      statusText.textContent = msg;
      statusText.style.opacity = '1';
    }, 120);
  }

  // Smooth 60fps counter & bar rendering
  function renderProgressLoop() {
    if (isCompleted && currentDisplayProgress >= 99.8) {
      currentDisplayProgress = 100;
      updateDOMProgress(100);
      return;
    }

    // Lerp smoothly toward target
    const speed = (currentTargetProgress >= 100) ? 0.16 : 0.08;
    currentDisplayProgress += (currentTargetProgress - currentDisplayProgress) * speed;

    if (currentDisplayProgress > 99.5 && currentTargetProgress >= 100) {
      currentDisplayProgress = 100;
    }

    updateDOMProgress(currentDisplayProgress);

    if (currentDisplayProgress < 100 || !isCompleted) {
      animFrameId = requestAnimationFrame(renderProgressLoop);
    }
  }

  function updateDOMProgress(val) {
    const clamped = Math.min(100, Math.max(0, val));
    if (percentNum) {
      percentNum.textContent = `${Math.floor(clamped)}%`;
    }
    if (progressFill) {
      progressFill.style.width = `${clamped.toFixed(1)}%`;
    }
  }

  // 1. Preload Fonts
  async function preloadFonts() {
    try {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
    } catch(e) {}
    currentTargetProgress += FONT_WEIGHT;
    setStatus(texts.images);
  }

  // 2. Preload & Decode an Image into GPU Texture Memory
  function preloadAndDecodeImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      let resolved = false;

      const finish = () => {
        if (!resolved) {
          resolved = true;
          currentTargetProgress = Math.min(100, currentTargetProgress + PER_IMAGE_WEIGHT);
          resolve(src);
        }
      };

      img.onload = async () => {
        // img.decode() forces asynchronous decompression ahead of time into GPU VRAM
        if ('decode' in img) {
          try {
            await img.decode();
          } catch(e) {}
        }
        finish();
      };

      img.onerror = () => {
        // Never halt on individual image failure
        finish();
      };

      img.src = src;
    });
  }

  // 3. Preload Video Poster into GPU Memory & Video Buffer
  async function preloadCinematicVideo(src, posterSrc) {
    // Phase A: Guarantee the poster frame is decoded into GPU memory FIRST
    if (posterSrc) {
      try {
        await preloadAndDecodeImage(posterSrc);
      } catch(e) {}
    }

    return new Promise((resolve) => {
      let resolved = false;
      const finish = () => {
        if (!resolved) {
          resolved = true;
          currentTargetProgress = Math.min(100, currentTargetProgress + VIDEO_WEIGHT);
          setStatus(texts.audio);
          resolve();
        }
      };

      const vidEl = document.getElementById('intro-video');
      if (vidEl) {
        vidEl.preload = 'auto';
        if (posterSrc && (!vidEl.poster || !vidEl.poster.includes(posterSrc))) {
          vidEl.poster = posterSrc;
        }
        if (!vidEl.src || !vidEl.src.includes('.mp4')) {
          vidEl.src = src;
        }

        // If video already has first frame ready (HAVE_CURRENT_DATA = 2, HAVE_FUTURE_DATA = 3, HAVE_ENOUGH_DATA = 4)
        if (vidEl.readyState >= 2) {
          finish();
          return;
        }

        const onDataReady = () => {
          if (vidEl.readyState >= 2) {
            vidEl.removeEventListener('loadeddata', onDataReady);
            vidEl.removeEventListener('canplay', onDataReady);
            finish();
          }
        };

        vidEl.addEventListener('loadeddata', onDataReady, { once: true });
        vidEl.addEventListener('canplay', onDataReady, { once: true });

        try {
          vidEl.load();
        } catch(e) {}
      } else {
        finish();
      }

      // Fast timeout: poster is already in GPU, so 1.6s max wait for video buffer
      setTimeout(finish, 1600);
    });
  }

  // 4. Preload Ambient Audio Track (Midnight Blueprint)
  async function preloadAudioTrack(audioSrc) {
    return new Promise((resolve) => {
      let resolved = false;
      const finish = () => {
        if (!resolved) {
          resolved = true;
          currentTargetProgress = Math.min(100, currentTargetProgress + AUDIO_WEIGHT);
          setStatus(texts.sphere);
          resolve();
        }
      };

      const audioEl = document.getElementById('ambient-audio-track');
      if (audioEl) {
        audioEl.preload = 'auto';
        if (!audioEl.src || !audioEl.src.includes('.mp3')) {
          audioEl.src = audioSrc;
        }

        if (audioEl.readyState >= 2) { // HAVE_CURRENT_DATA
          finish();
          return;
        }

        audioEl.addEventListener('canplay', finish, { once: true });
        audioEl.addEventListener('loadeddata', finish, { once: true });

        try {
          audioEl.load();
        } catch(e) {}
      } else {
        finish();
      }

      // Fast timeout: 1.2s max wait for audio metadata
      setTimeout(finish, 1200);
    });
  }

  // 5. Reveal Experience Gracefully
  function revealExperience() {
    if (isCompleted) return;
    isCompleted = true;
    currentTargetProgress = 100;
    currentDisplayProgress = 100;
    updateDOMProgress(100);
    setStatus(texts.ready);

    try {
      sessionStorage.setItem(SESSION_PRELOAD_KEY, '1');
    } catch(e) {}

    // Allow user to perceive 100% completion for 200ms
    setTimeout(() => {
      preloader.classList.add('fade-out');
      document.body.classList.remove('loading');

      // Dispatch event to announce all assets are hot in memory
      window.dispatchEvent(new CustomEvent('experience-preloaded', {
        detail: { videoSrc, videoPosterSrc, audioSrc, imageSources }
      }));

      // Fully hide and inert after transition finishes
      setTimeout(() => {
        preloader.style.display = 'none';
        preloader.setAttribute('aria-hidden', 'true');
        if (animFrameId) cancelAnimationFrame(animFrameId);
      }, 700);
    }, 200);
  }

  // 6. Main Preload Execution Pipeline
  async function startPreloader() {
    // Start animation loop
    animFrameId = requestAnimationFrame(renderProgressLoop);

    // Initial message
    setStatus(texts.fonts);

    // Setup skip button fallback (shown after 2.5s on slow mobile networks)
    const skipTimer = setTimeout(() => {
      if (!isCompleted && skipBtn) {
        skipBtn.textContent = texts.skip;
        skipBtn.style.display = 'inline-block';
        skipBtn.addEventListener('click', () => {
          revealExperience();
        }, { once: true });
      }
    }, 2500);

    // Absolute failsafe: reveal after 3.8s maximum so no visitor is ever kept waiting
    const failsafeTimer = setTimeout(() => {
      if (!isCompleted) {
        revealExperience();
      }
    }, 3800);

    try {
      // Step A: Load fonts
      await preloadFonts();

      // Step B: Load all images concurrently with GPU decoding
      setStatus(texts.images);
      const imagePromises = imageSources.map(src => preloadAndDecodeImage(src));

      // Step C: Preload cinematic video (with poster GPU decode) and audio track
      setStatus(texts.video);
      const videoPromise = preloadCinematicVideo(videoSrc, videoPosterSrc);
      const audioPromise = preloadAudioTrack(audioSrc);

      // Wait for all assets concurrently
      await Promise.all([...imagePromises, videoPromise, audioPromise]);

      clearTimeout(skipTimer);
      clearTimeout(failsafeTimer);
      revealExperience();
    } catch(err) {
      console.warn('Preloader pipeline note:', err);
      clearTimeout(skipTimer);
      clearTimeout(failsafeTimer);
      revealExperience();
    }
  }

  // Run immediately on script evaluation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startPreloader);
  } else {
    startPreloader();
  }

})();
