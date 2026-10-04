# Wilmar Machado — Portafolio Oficial de Autor & Archivo Visual (Edición 2026)

Portafolio interactivo tridimensional, bilingüe y modular para **Wilmar Machado** (Diseño Gráfico, Diseño Editorial y Arte Sacro Contemporáneo).

- **Repositorio Oficial:** [github.com/DestroyCrons/portafolio-wilmar-machado](https://github.com/DestroyCrons/portafolio-wilmar-machado)

---

## 📁 Estructura del Proyecto

El proyecto está organizado de manera completamente modular, separando estructura, estilos, interactividad y medios:

```
portafolio-wilmar-machado/
│
├── index.html        # Estructura semántica HTML5 (Prólogo interactivo, Esfera 3D, Cuadrícula, Lightbox, Modales)
├── styles.css        # Sistema completo de diseño, variables CSS, tipografías y efectos visuales
├── main.js           # Motor de la esfera 3D, traductor offline autónomo, controlador del lightbox y consola
├── video.mp4         # Video prólogo original en alta definición y 30 FPS (archivo separado de alto rendimiento)
└── README.md         # Documentación oficial del proyecto y guía de uso
```

---

## 🚀 Cómo Ejecutar el Portafolio

1. **Apertura Directa:**
   Simplemente haz doble clic en `index.html` para abrirlo en cualquier navegador web moderno (Google Chrome, Safari, Mozilla Firefox, Microsoft Edge, Brave, Opera).

2. **Servidor Local (Recomendado para producción o desarrollo):**
   Puedes iniciar un servidor web rápido desde la terminal en esta carpeta:
   ```bash
   # Con Python 3:
   python3 -m http.server 8000
   ```
   Luego abre en tu navegador: `http://localhost:8000/index.html`

---

## ✨ Características Principales

### 1. Prólogo Interactivo en Video (`video.mp4`)
- El video ahora se carga como un archivo independiente (`video.mp4`), preservando la **calidad original completa y 30 FPS fluidos**.
- **Interactividad Parallax:** Desliza o gira la rueda del ratón para acercarte hacia el iris de Wilmar y entrar al archivo 3D.
- Controles de reproducción: botón de pausa/reproducción, botón para saltar la intro, y atajos de teclado (`Enter` o `Escape` para acceder directamente al archivo).

### 2. Archivo en Esfera 3D Fibonacci
- Disposición matemática armónica de las **10 obras seleccionadas** en una esfera tridimensional fluida.
- Interacción táctil y con ratón: arrastra para orbitar con inercia física suave, rueda del ratón para zoom espacial, y auto-rotación cinemática.
- Botón en la barra superior para alternar instantáneamente entre la **Esfera 3D** y la **Cuadrícula (Grid View)**.

### 3. Ficha Técnica Completa y Modos de Visualización en el Lightbox
- Al hacer clic en cualquiera de las 10 obras, se abre el visor curatorial detallado:
  - **Ficha Técnica Detallada:** Rol Creativo, Técnica / Soporte, Tipografía de Autor, Cliente / Editorial, Año de Creación.
  - **Selector de Modos Visuales:**
    - ◉ **Obra Final:** Visualización completa de alta resolución.
    - ✎ **Boceto & Proceso:** Modo de análisis gráfico monocromático de alto contraste y retícula.
    - 🔍 **Macro Textura:** Zoom de alta fidelidad (220%) para inspeccionar pinceladas, grano analógico y microdetalles.
  - **Botón "Encargar Proyecto Similar":** Conecta directamente la obra seleccionada con el formulario de contacto, pre-rellenando el servicio y redactando un mensaje personalizado con el título y categoría de la obra.
  - **Navegación Fluida:** Botones de anterior/siguiente (❮ y ❯) y navegación mediante flechas del teclado (`←` y `→`).

### 4. Sistema Bilingüe (Español / Inglés) con Traductor Offline Integrado
- **Traducción 100% Autónoma:** No requiere internet ni APIs externas. Incluye un motor léxico en JavaScript con vocabulario especializado en artes visuales, diseño editorial, fotografía y arte sacro.
- **Sincronización Exacta de la Esfera 3D:**
  - *Español:* **Obras Seleccionadas & Proyectos** · *Diez Obras Seleccionadas · Colección 2024–2026*
  - *Inglés:* **Selected Works & Projects** · *Ten Selected Works · 2024–2026 Collection*
- Al alternar entre `ES` y `EN`:
  - Los titulares centrales de la esfera cambian en tiempo real.
  - **Las 10 tarjetas dentro de la esfera 3D y en la cuadrícula** actualizan sus títulos y subtítulos al inglés.
  - La ficha técnica, curaduría, manifiesto y formulario de contacto se traducen íntegramente.

### 5. Consola Maestra de Autor (Studio Control V3.0)
- **Acceso Exclusivo:** Haz clic en **⚙ Consola** en la barra superior (o triple clic en el logo de autor) e introduce la clave maestra (predeterminada: `wilmar2026`).
- **Pestaña 1 (Perfil & Textos):** Modifica los títulos de la esfera 3D, cuadrícula, manifiesto y biografía en español e inglés, con botón de **"Auto-traducir a Inglés (Offline)"**.
- **Pestaña 2 (Gestor de Proyectos):** Edita, añade o reordena las 10 obras con campos bilingües y previsualización en tiempo real.
- **Pestaña 3 (Estilos & Motor 3D):** Personaliza el color de acento dorado, fondo, radio de la esfera y velocidad de rotación.
- **Pestaña 4 (Contacto):** Actualiza WhatsApp, correo electrónico, Instagram y Behance.
- **Pestaña 5 (Exportar & Copias):** Descarga una copia de seguridad en JSON o exporta el proyecto completo actualizado.

---

## 🎨 Obras Seleccionadas Incluidas (Colección 2024–2026)

1. **Conflict in the Mind** — Arte Gráfico · Concepto de Portada de Álbum
2. **Inevitable Ocaso** (*Inevitable Sunset*) — El Reino · Wilmar Machado 2025
3. **Vuelo Urbano** (*Urban Flight*) — Fotografía Callejera · Retrato en Terreno
4. **Conexión Íntima** (*Intimate Connection*) — Retrato de Estudio · Sesión Editorial
5. **Complex Xpress** — Diseño Editorial · Tipografía Y2K
6. **Serpent** — Diseño de Cartel · Archivo Heráldico 2024
7. **Divino Angel** (*Divine Angel*) — Arte Sacro Contemporáneo · Cartel Digital 2024
8. **Monster / Prisión Interior** (*Monster / Inner Prison*) — Fotografía Conceptual · Narrativa Visual
9. **Journey / El Camino** (*Journey / The Way*) — Estética Manga · Cartel Narrativo
10. **Amor Verdadero** (*True Love*) — Ensayo Visual · Diseño Editorial

---

© 2026 Wilmar Machado · Valledupar, Colombia · Alcance Global. Todos los derechos reservados.
