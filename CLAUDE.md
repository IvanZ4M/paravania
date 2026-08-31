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

### Constantes editables (arriba de `script.js`)

```js
const FECHA_INICIO   = ...; // 1 agosto 2026
const FECHA_REENCUENTRO = ...; // la pone Ivan
const YOUTUBE_ID     = ...;
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
