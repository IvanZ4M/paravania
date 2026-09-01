# paravania — regalo primer mes

Página web de regalo para Vania, primer mes de novios. De Ivan.
Proyecto personal. Se abre desde el navegador in-app de WhatsApp en celular.

---

## Restricciones técnicas (no negociables)

- **HTML + CSS + JS vanilla.** Sin frameworks, sin npm, sin build step, sin librerías
  de animación. Todo se sirve tal cual está en el repo.
- **Archivos:** `index.html`, `style.css`, `script.js`, `manifest.json`, `/img`,
  más los tres íconos generados (`apple-touch-icon.png`, `icon-192.png`,
  `icon-512.png`). Nada más. Peso total del repo: ~3.3 MB, casi todo fotos.
- **Rutas siempre relativas:** `./img/foto-01.jpg`. **Nunca** con `/` inicial.
  El sitio vive en un subdirectorio (`/paravania/`) y una ruta absoluta rompe todo.
- **Deploy:** GitHub Pages, repo `paravania` en la cuenta `IvanZ4M`.
  URL: https://ivanz4m.github.io/paravania/
  (El subdirectorio `/paravania/` es lo que importa, no la cuenta: como todas
  las rutas son relativas, la página funciona igual en cualquier usuario.)
- **`<meta name="robots" content="noindex, nofollow">`** — esto es privado.
- **PWA ligera:** `manifest.json` + `apple-touch-icon` para "agregar a pantalla de inicio".
  Sin service worker (no hace falta y complica).

## Entorno de ejecución: WhatsApp in-app browser

Esto manda sobre varias decisiones:

- **Nada de autoplay de audio/video.** Todo sonido nace de un tap explícito del usuario.
  El iframe de YouTube se inyecta *al tocar*, nunca antes.
- **Usar `dvh`, no `vh`.** Las barras de UI del navegador in-app se mueven y `vh`
  provoca saltos y cortes.
- **Sin dependencias externas más allá de Google Fonts y el iframe de YouTube.**
- Asumir touch primero. Los hovers son decoración, nunca la única forma de interactuar.
- Asumir conexión mediocre: imágenes con `loading="lazy"` salvo las primeras,
  `decoding="async"`, y fuentes precargadas.

## Responsive

- **Mobile-first a 380px.** Ese es el ancho de diseño base.
- **Tablet/iPad (768–1024px):** debe escalar con gracia — ni estirada ni vacía.
  Se logra con un contenedor de ancho máximo centrado + tipografía fluida
  (`clamp()`), no con un layout distinto.
- Sin scroll horizontal en la página. El único scroll horizontal es el carrusel.

## Accesibilidad y movimiento

- **Respetar `prefers-reduced-motion: reduce`:** desactiva pétalos, parallax,
  y reduce todas las transiciones a un fade mínimo. La página sigue siendo
  navegable y completa.
- Contraste suficiente entre texto y fondo oscuro.
- Elementos interactivos con área táctil ≥ 44px.
- `aria-label` en los botones que son solo íconos.

---

## Estructura: 7 secciones a pantalla completa

Navegación: botón "siguiente" + swipe vertical. Indicador discreto de progreso.
Transición suave entre secciones.

1. **Portada** — Sobre cerrado que se abre al tocar. Revela "Vania · 1 mes" y la fecha.
   Entrada elegante, sin apuro.
2. **Contador en vivo** — Días, horas, minutos juntos. Inicio: **1 de agosto de 2026**.
3. **La canción** — Play grande → inyecta iframe de YouTube ("Te quiero tanto",
   Kevin Kaarl). Mientras suena, pétalos cayendo. **Va aquí a propósito, no
   más abajo:** la canción sigue sonando al avanzar, así que puesta en tercer
   lugar acompaña la galería, la carta, las tarjetas y el cierre.
4. **Galería** — Fotos de `/img` en carrusel horizontal con `scroll-snap`,
   inercia táctil natural.
5. **La carta** — Texto fijo, línea por línea con fade.
6. **Cosas que me gustan de ti** — 6 tarjetas que se voltean al tocar.
7. **Cierre** — Cuenta regresiva a la próxima vez que se vean.
   Última línea: "Y ya estoy contando los días."
   La página vive en la pantalla de inicio de su iPhone, así que **no puede
   ser igual siempre**:
   - El contador **no se muere**: al pasar el reencuentro se pasa solo al
     próximo mes que cumplen y se renueva mes con mes. A los 12, "para
     nuestro primer año".
   - **La nota del día** rota una frase de `NOTAS_DEL_DIA` según el día:
     igual todo el día, distinta mañana.
   - El día que cumplen mes, ese mismo bloque se vuelve el saludo de
     aniversario ("Hoy cumplimos dos meses.") y se lleva el acento rojo.

### Constantes editables (arriba de `script.js`)

```js
const FECHA_INICIO      = ...; // 1 agosto 2026
const FECHA_REENCUENTRO = ...; // 2 septiembre 2026, 15:30
const YOUTUBE_ID        = ...;
const GALERIA           = [...]; // orden, momento y línea de cada foto
const GUSTOS            = [...]; // las 6 tarjetas
const NOTAS_DEL_DIA     = [...]; // frases que rotan en el cierre
```

Van al principio del archivo, agrupadas y comentadas, para que se editen sin
leer el resto del código.

---

## Dirección visual

### Flores (motivo gráfico central)

Gerberas rojas, lilis y rosas blancas. **Todas dibujadas a mano en SVG inline.**
Nada de stock, nada de emojis, nada de íconos de librería.

Usos:
- Pétalos flotando de fondo (sutiles, lentos).
- Una gerbera abriéndose como transición entre secciones.
- Ornamentos discretos en esquinas.

### Paleta

Derivada de esas flores. Fondo oscuro **cálido**, nunca negro puro — vino muy
oscuro / café tinto, para que el blanco cremoso y el rojo resalten.

| Rol | Token | Valor |
|---|---|---|
| Fondo base | `--bg` | `#1a0d10` (vino muy oscuro) |
| Fondo elevado | `--bg-2` | `#241316` |
| Rojo gerbera | `--rojo` | `#c2384a` |
| Rojo profundo | `--rojo-hondo` | `#8e1f30` |
| Blanco rosa | `--crema` | `#f5ece4` |
| Texto cuerpo | `--texto` | `#e3d5cd` |
| Texto tenue | `--tenue` | `#a48d88` |
| Verde tallo | `--verde` | `#6f8466` |
| Verde claro | `--verde-claro` | `#9bab8e` |

**Regla:** un solo acento por sección. Nada saturado. Si una sección es roja,
no mete verde también.

### Tipografía

- **Títulos:** Cormorant Garamond (serif elegante), pesos 300/400/600, itálica disponible.
- **Cuerpo:** una sans limpia y neutra.
- Google Fonts con `<link rel="preconnect">` + `<link rel="preload">` para que
  **no haya salto de texto (FOUT)**. `font-display: swap` con fallback métrico cercano.

### Profundidad y ambiente

- **Luz de ambiente por sección.** `--ambiente` y `--ambiente-2` son colores
  registrados con `@property` (por eso se pueden animar) y cambian de tono
  según `[data-seccion]`, en 1600ms. Cada sección tiene la temperatura de su
  acento. Es lo que evita que el fondo se sienta un plano fijo.
- **Las secciones inactivas se quedan atrás** (`scale(.935)`). Al deslizar,
  la que entra crece hasta su tamaño real: el movimiento gana capas en vez
  de ser un carrusel plano.
- **Los pétalos tienen planos.** Tamaño, velocidad y opacidad van
  correlacionados: grande = rápido = más visible = cerca de la cámara.
  Sortearlos por separado los aplana a todos en un mismo plano.
- **El papel es el mismo en toda la página**: la tarjeta de la portada y la
  hoja de la carta comparten canto que atrapa luz, bordes que se curvan y
  grano de 2%.

### La floración

Al abrir el sobre, las flores inundan la pantalla ~2.5s y al retirarse dejan
la tarjeta puesta. Reglas para no romperla:

- **Se animan las TRES capas, nunca las 52 flores.** Cada capa crece desde su
  centro, así que las flores se separan hacia afuera solas. Animar flor por
  flor ahoga un celular; así van 3 elementos en movimiento (medido: 143 fps,
  cero cuadros perdidos).
- **Las flores se siembran solo en el centro** (`span` por capa). Como la capa
  crece, lo que se siembra en la orilla nunca llega a verse.
- **Rejilla con desorden, no azar puro.** Al azar quedan huecos y racimos, y
  se ve el fondo entre flores.
- El retraso de cada flor sale de su distancia al centro: se lee como algo
  que florece hacia afuera y no como un telón que cae.

### Movimiento — "que se sienta caro"

- **Duraciones: 600–900ms.** Nada de 200ms nerviosos.
- **Easing:** `cubic-bezier` suave siempre. **Nunca `linear`.**
  Base del proyecto: `--ease: cubic-bezier(0.22, 0.61, 0.36, 1)`.
- **Prohibido:** rebotes, parpadeos, `bounce`, `elastic`, cosas que llamen la atención
  sobre sí mismas.
- Las apariciones al hacer scroll se disparan con **IntersectionObserver**, nunca
  con listeners de `scroll` a pelo.
- Animar solo `transform` y `opacity`. Nada que provoque layout/reflow.
- Stagger entre elementos hermanos: 80–120ms.

---

## Cómo se trabaja este proyecto

- **Sección por sección**, no todo de golpe. Avisar a Ivan al terminar cada una.
- Se le enseña el resultado antes de seguir con la siguiente.
- El texto de la carta y de las 6 tarjetas es **literal**: se copia tal cual,
  no se reescribe, no se "mejora", no se corrigen sus comas.

## Trampas ya pisadas (no volver a caer)

- **Colisión de nombres de clase.** La tarjeta final del carrusel se llamaba
  `.cierre` con `height: 100%`, y al crear la sección 7 (`.cierre`) esa altura
  se midió contra el riel de 7 pantallas: la sección medía 6251px y su
  contenido quedaba fuera de vista. La del carrusel ahora es `.ultima`.
  Antes de bautizar un bloque, buscarlo en `style.css`.
- **La galería no hereda `text-align: center`.** Sangra a todo lo ancho y no
  usa `.seccion__caja`, así que hay que declararlo en `.galeria__todo` o los
  textos de dos renglones se van a la izquierda.
- **No elegir la foto activa por `intersectionRatio`.** En pantallas anchas
  caben varias fotos completas y todas empatan; se elige por distancia al eje
  del carril.
- **Los cambios de texto con fundido necesitan memoria del destino.** Comparar
  contra el texto en pantalla hace que se salten cambios al pasar fotos rápido.
- **Una pista de 10px en mayúsculas debajo de un bloque no la ve nadie.**
  La instrucción de que las tarjetas se voltean estaba ahí y pasaba
  desapercibida en celular. Va arriba, en serif, con ícono — y sobre todo,
  la primera tarjeta se asoma sola: el movimiento explica mejor que el texto.
- **Las unidades de contenedor (`cqw`) van en los hijos, nunca en el
  contenedor.** El `cqw` se mide contra la caja de contenido, y `padding`
  es lo que define esa caja: usarlo en el propio contenedor es circular y
  el navegador acaba calculando disparates (79px de padding en la tarjeta
  de la portada). Al revisar, comparar la caja de contenido contra el
  tamaño del elemento — si la interior es mayor, algo está mal.
- **Una pestaña en segundo plano congela `requestAnimationFrame`.** Si al
  revisar parece que "no corren las animaciones" o fallan las capturas,
  comprobar `document.visibilityState` antes de buscar el bug en el código.
- **Ocultar con `opacity: 0` no libera el espacio.** Si un elemento oculto
  sigue en el flujo, descentra a sus vecinos (pasó con el contador de la
  galería en la tarjeta de cierre).

## Convenciones de código

- CSS: custom properties en `:root`, nombres en español, ordenado por sección
  en el mismo orden que el HTML.
- JS: sin clases, funciones puras cuando se pueda, una función `init<Seccion>()`
  por sección, todas llamadas desde un único punto de arranque.
- Comentarios en español, solo donde el porqué no sea obvio.
- Nombres de archivos de imagen: `foto-01.jpg` … `foto-NN.jpg`. Sin espacios,
  sin paréntesis, sin acentos — evita tener que URL-encodear en producción.
