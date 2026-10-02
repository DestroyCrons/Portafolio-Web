# Wilmar Machado — Portafolio Oficial de Autor & Archivo Visual (Edición 2026)

Portafolio interactivo tridimensional, bilingüe y modular para **Wilmar Machado** (Dirección de Arte, Diseño Editorial y Arte Sacro Contemporáneo).

---

## 📁 Estructura del Proyecto (Optimizado para GitHub & Despliegue Web)

El proyecto está organizado de manera completamente modular y desacoplada, separando la estructura, los estilos, la lógica y los activos multimedia para que puedas subirlo directamente a GitHub (o GitHub Pages) con un código liviano y organizado:

```
portafolio_wilmar_machado/
│
├── index.html        # Estructura semántica HTML5 (Prólogo interactivo, Esfera 3D, Cuadrícula, Lightbox, Modales)
├── styles.css        # Hoja de estilos completa, variables CSS, tipografías y efectos visuales
├── main.js           # Motor de la esfera 3D, traductor offline autónomo, controlador del lightbox y consola
├── video.mp4         # Video prólogo en alta definición, 30 FPS y fotogramas clave intra-frame optimizados
├── images/           # Carpeta dedicada con las 10 obras en formato WebP de alta fidelidad
│   ├── img1.webp     # Conflict in the Mind
│   ├── img2.webp     # Inevitable Ocaso
│   ├── img3.webp     # Vuelo Urbano
│   ├── img4.webp     # Conexión Íntima
│   ├── img5.webp     # Complex Xpress
│   ├── img6.webp     # Serpent
│   ├── img7.webp     # Divino Angel
│   ├── img8.webp     # Monster / Prisión Interior
│   ├── img9.webp     # Journey / El Camino
│   └── img10.webp    # Sacro Contemporáneo
└── README.md         # Documentación oficial del proyecto y guía de uso
```

---

## 🚀 Cómo Ejecutar el Portafolio

1. **Apertura Directa:**
   Simplemente haz doble clic en `index.html` para abrirlo en cualquier navegador web moderno (Google Chrome, Safari, Mozilla Firefox, Microsoft Edge, Brave, Opera).

2. **Servidor Local (Recomendado para desarrollo):**
   Puedes iniciar un servidor web rápido desde la terminal en esta carpeta:
   ```bash
   # Con Python 3:
   python3 -m http.server 8000
   ```
   Luego abre en tu navegador: `http://localhost:8000/index.html`

3. **Publicación en GitHub Pages:**
   Sube la carpeta a un repositorio de GitHub y activa **GitHub Pages** desde la rama `main` en la configuración del repositorio. ¡Tu portafolio estará online al instante!

---

## ✨ Características Principales y Mejoras Recientes

### 1. Prólogo Interactivo en Video (`video.mp4`)
- El video se carga como un archivo independiente (`video.mp4`), con **calidad visual de alta fidelidad (CRF 20) y 30 FPS nativos**.
- **Reproducción Fluida al Hacer Scroll:** Al girar la rueda del ratón o deslizar, el video se reproduce de forma continua y acelerada por hardware, sin tirones ni caídas de fotogramas.
- **Desaparición Inmediata del Saludo:** El texto *"Hola, Soy Wilmar"* se desvanece de inmediato en cuanto se detecta la interacción de scroll o reproducción.
- Controles multimedia accesibles: botón de pausa/reproducción, barra de progreso con scrub interactivo, botón para saltar la intro, y atajos de teclado (`Enter` o `Escape`).

### 2. Archivo en Esfera 3D Fibonacci
- Disposición matemática armónica de las **10 obras seleccionadas** en una esfera tridimensional fluida.
- **Titular Central Bilingüe Garantizado:** El titular del centro de la esfera traduce fielmente entre:
  - **Español:** *Obras Seleccionadas & Proyectos* · *Diez Obras Seleccionadas · Colección 2024–2026*
  - **Inglés:** *Selected Works & Projects* · *Ten Selected Works · 2024–2026 Collection*
- Botón en la barra de navegación para alternar instantáneamente entre la **Esfera 3D** y la **Cuadrícula (Grid View)**.

### 3. Ficha Técnica Completa y Selector de Idioma en el Lightbox
- Al hacer clic en cualquiera de las 10 obras, se abre el visor curatorial:
  - **Selector de Idioma en la Cabecera:** Permite al cliente alternar entre **ES / EN** en tiempo real *durante la revisión de la obra*, actualizando instantáneamente el título, la categoría, la nota conceptual y todos los datos de la ficha técnica sin cerrar el visor.
  - **Ficha Técnica Detallada:** Rol Creativo, Técnica / Soporte, Tipografía de Autor, Cliente / Editorial, Año de Creación.
  - **Selector de Modos Visuales:**
    - ◉ **Obra Final:** Visualización completa de alta resolución.
    - ✎ **Boceto & Proceso:** Modo de análisis gráfico monocromático de alto contraste y retícula.
    - 🔍 **Macro Textura:** Zoom de alta fidelidad (220%) para inspeccionar pinceladas y grano analógico.
  - **Botón "Encargar Proyecto Similar":** Conecta directamente la obra seleccionada con el formulario de contacto, pre-rellenando el servicio y redactando un mensaje personalizado.
  - **Navegación Fluida:** Botones de anterior/siguiente (❮ y ❯) y navegación mediante flechas del teclado (`←` y `→`).

### 4. Imágenes Desacopladas en Carpeta `images/`
- Todas las imágenes de las obras se encuentran en archivos independientes en `images/img1.webp` hasta `images/img10.webp`.
- El código ya no contiene pesadas cadenas base64, lo que facilita subir el proyecto a GitHub, clonarlo y gestionar nuevos proyectos.

### 5. Consola Maestra de Personalización (100% Funcional)
- Acceso seguro mediante contraseña (por defecto: `wilmar2026`).
- **Gestión Completa de Obras (Añadir y Editar):**
  - El modal de edición de proyectos ahora se superpone correctamente en primer plano (z-index corregido).
  - Permite crear nuevas obras o editar las existentes con títulos, categorías y descripciones en español e inglés.
  - Botón de auto-traducción offline dentro del editor de proyectos.
  - Previsualización en tiempo real de la imagen.
  - Reordenamiento ascendente y descendente (▲ / ▼) y eliminación.
- Personalización de identidad visual, tipografías, colores de acento y parámetros de la esfera 3D.
- Exportación y restauración de copias de seguridad en formato JSON.
