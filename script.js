/* ══════════════════════════════════════════════════════════════════════════
   paravania — script
   ══════════════════════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  /* ════════════════════════════════════════════════════════════════════════
     CONSTANTES EDITABLES  ·  lo único que hay que tocar para ajustar la página
     ════════════════════════════════════════════════════════════════════════ */

  /* Cuándo empezó todo. (mes: 0 = enero, así que 7 = agosto) */
  const FECHA_INICIO = new Date(2026, 7, 1, 0, 0, 0);

  /* La próxima vez que se vean: 2 de septiembre de 2026.
     3:30 de la tarde. (año, mes-1, día, hora, minuto)                        */
  const FECHA_REENCUENTRO = new Date(2026, 8, 2, 15, 30, 0);

  /* La canción: "Te quiero tanto" — Kevin Kaarl. Solo el ID del video.       */
  const YOUTUBE_ID = 'q07Gd6Q-7dY';

  /* La galería, en orden. Cada renglón es una foto de ./img/foto-NN.jpg con:
       momento — la etiqueta chica de abajo. Déjala vacía y hereda la anterior,
                 así todo un momento comparte etiqueta sin parpadear.
       linea   — el texto grande. Este sí es propio de cada foto.            */
  const GALERIA = [
    { foto:  1, momento: 'las primeras flores',
                linea: 'veniste riéndote todo el camino' },
    { foto:  2, momento: '',
                linea: 'una foto random en el espejo, el mismo día que te di las flores' },

    { foto:  3, momento: 'antes de tu viaje',
                linea: 'te llevaste mi chamarra' },

    { foto: 10, momento: 'el día que te pregunté',
                linea: 'el camino de pétalos, y tú al final' },
    { foto:  5, momento: '', linea: 'cuando venías caminando hacia mí' },
    { foto:  7, momento: '', linea: 'las gerberas rojas que te di, y nuestras iniciales' },
    { foto:  4, momento: '', linea: 'y dijiste que sí' },
    { foto:  8, momento: '', linea: 'un beso en la mejilla y ya éramos otra cosa' },
    { foto:  9, momento: '', linea: 'esta es la cara con la que empezó todo' },
    { foto: 12, momento: '', linea: 'estaba demasiado feliz' },
    { foto: 11, momento: '', linea: 'salió movida, y así la quiero' },

    { foto:  6, momento: 'de regreso a tu casa',
                linea: 'no soltaste las flores en todo el camino' },

    { foto: 13, momento: 'una tarde en la alberca',
                linea: 'te reías de algo que ya no me acuerdo' },
    { foto: 15, momento: '', linea: 'los dos, y el cielo de ese día' },
    { foto: 16, momento: '', linea: 'recuerdo ese día con mucho cariño' },
    { foto: 14, momento: '', linea: 'siempre jugando, hasta dentro del agua' },
    { foto: 19, momento: '', linea: 'la foto para tu papá, yo hasta atrás' },
    { foto: 20, momento: '', linea: 'un beso mientras se juntaban las nubes' },
    { foto: 17, momento: '', linea: 'y otro sin acordarnos de la cámara' },
    { foto: 18, momento: '', linea: 'y esa forma tuya de mirarme' },

    { foto: 21, momento: 'la cena con tu papá',
                linea: 'salimos de ahí y te besé' },
    { foto: 22, momento: '', linea: 'los dos, ya sin nada que explicar' }
  ];

  /* ⚠️  ESTAS FRASES SON UN BORRADOR MÍO, NO TUYAS. Reescríbelas.
     La página muestra una según el día y va rotando: se queda igual todo el
     día y mañana cambia. Puedes poner las que quieras, cuantas quieras —
     entre más haya, más tarda en repetirse.                                */
  const NOTAS_DEL_DIA = [
    'hoy también amanecí pensando en ti',
    'me haces mucho bien, amor',
    'sigo eligiéndote, todos los días',
    'eres mi parte favorita del día',
    'te amo, y hoy más',
    'me encanta cómo piensas, amor. es lo que más me gusta de ti',
    'admiro mucho la mujer que eres',
    'nmchs qué bonita eres, y no hablo nada más de lo de afuera',
    'me gusta la forma en que ves las cosas',
    'eres muy buena en lo que haces y me da orgullo',
    'ya quiero que sea la próxima vez que nos veamos en el súper jajaja',
    'otra vez se nos van a hacer las 3, ya sé',
    'quién iba a decir que del servicio iba a salir esto',
    'el 1 de agosto sigue siendo el mejor día',
    'todavía me acuerdo de tu cara cuando te quité la venda',
    'no necesito hacer nada, con estar contigo ya estoy bien',
    'te extraño, amor, aunque te haya visto ayer',
    'siempre quiero estar contigo, ya te lo he dicho',
    'hoy te extrañé más de lo normal',
    'si estás leyendo esto es porque te quiero mucho jajaja',
    'no tenía nada importante que decirte, nada más quería decirte algo',
    'amor, ya te extrañé otra vez jajaja',
    'spoiler: te amo',
    'vas a poder con todo, amor. yo sé',
    'si hoy fue pesado, aquí estoy',
    'descansa, amor, te lo mereces',
    'no tienes que estar bien todos los días',
    'contigo todo se siente fácil, y eso no me había pasado',
    'me haces querer hacer las cosas bien',
    'nunca me habían dado tantas ganas de ver a alguien',
    'gracias por dejarme quererte así',
    'esto es lo más bonito que me ha pasado, amor',
    'osea de verdad, qué suerte tengo',
    'sigo sin creerme que seas mi novia'
  ];

  /* Las 6 tarjetas que se voltean. Texto literal de Ivan.
     `flor` es cuál de las tres flores lleva: gerbera, rosa o lili.          */
  const GUSTOS = [
    { flor: 'gerbera', titulo: 'Tu paciencia',
      texto: 'Que nunca me presionas ni me exiges, simplemente estás.' },
    { flor: 'rosa',    titulo: 'Cómo cuidas',
      texto: 'Que cuidas profundamente a las personas que quieres, y se nota en cada detalle.' },
    { flor: 'lili',    titulo: 'Tu forma de querer',
      texto: 'Que piensas en mí incluso cuando estás ocupada o de viaje.' },
    { flor: 'gerbera', titulo: 'Tu vocación',
      texto: 'Tu dedicación como médico, tu inteligencia, y esa pasión por lo que haces.' },
    { flor: 'rosa',    titulo: 'Lo simple contigo',
      texto: 'Que con un helado o dando vueltas en el carro todo se siente especial.' },
    { flor: 'lili',    titulo: 'Lo que provocas',
      texto: 'Que me haces querer ser mi mejor versión sin siquiera pedírmelo.' }
  ];

  /* La última "foto" del carrusel no es una foto: es la tarjeta de cierre,
     para lo que vivimos este mes y no alcanzamos a fotografiar.             */
  const CIERRE_GALERIA = {
    titulo:  'Y todo lo que no salió en foto',
    texto:   'Vivimos mucho más de lo que cupo aquí.',
    momento: 'lo que sigue',
    linea:   'y vamos por muchos momentos más'
  };

  /* ════════════════════════════════════════════════════════════════════════
     Utilidades
     ════════════════════════════════════════════════════════════════════════ */

  const raiz = document.documentElement;
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
  const azar = (min, max) => min + Math.random() * (max - min);

  /* ════════════════════════════════════════════════════════════════════════
     Alto real de la ventana
     El navegador in-app de WhatsApp miente con vh; fijamos px reales y los
     refrescamos solo cuando el cambio es de verdad (giro de pantalla).
     ════════════════════════════════════════════════════════════════════════ */

  function medirAlto() {
    const alto = window.visualViewport?.height || window.innerHeight;
    raiz.style.setProperty('--alto', `${Math.round(alto)}px`);
  }

  function vigilarAlto() {
    let anterior = window.innerHeight;
    let temporizador;
    const alRedimensionar = () => {
      clearTimeout(temporizador);
      temporizador = setTimeout(() => {
        /* Ignora los micro-ajustes de la barra de direcciones */
        if (Math.abs(window.innerHeight - anterior) < 90) return;
        anterior = window.innerHeight;
        medirAlto();
      }, 160);
    };
    window.addEventListener('resize', alRedimensionar);
    window.addEventListener('orientationchange', () => {
      setTimeout(() => { anterior = window.innerHeight; medirAlto(); }, 320);
    });
  }

  /* ════════════════════════════════════════════════════════════════════════
     Navegación entre secciones
     ════════════════════════════════════════════════════════════════════════ */

  const pista     = $('#pista');
  const secciones = $$('.seccion');
  const total     = secciones.length;
  const btnSig    = $('#siguiente');
  const barra     = $('#progreso');

  let indice    = 0;
  let bloqueado = false;

  function construirProgreso() {
    barra.innerHTML = secciones.map((sec, i) => {
      const nombre = sec.getAttribute('aria-label') || `Sección ${i + 1}`;
      return `<button class="progreso__punto" type="button"
                      data-va="${i}" aria-label="${nombre}"
                      aria-current="${i === 0}"></button>`;
    }).join('');

    barra.addEventListener('click', (e) => {
      const punto = e.target.closest('[data-va]');
      if (punto) ir(Number(punto.dataset.va));
    });
  }

  function ir(n) {
    const destino = Math.max(0, Math.min(total - 1, n));
    if (bloqueado || destino === indice) return;

    const sale  = secciones[indice];
    const entra = secciones[destino];

    indice = destino;
    bloqueado = true;

    raiz.style.setProperty('--i', indice);
    raiz.dataset.seccion = entra.id;
    entra.classList.add('lista');   /* dispara ornamentos y entradas propias */
    secciones.forEach((s) => s.classList.toggle('esta-activa', s === entra));

    $$('.progreso__punto', barra).forEach((p, i) => {
      p.setAttribute('aria-current', String(i === indice));
    });

    btnSig.hidden = indice === total - 1;

    sale.dispatchEvent(new CustomEvent('seccion:sale'));
    entra.dispatchEvent(new CustomEvent('seccion:entra'));

    /* Suelta el candado cuando termina la transición (con red de seguridad) */
    const soltar = () => { bloqueado = false; };
    const duracion = menosMovimiento.matches ? 60 : 940;
    setTimeout(soltar, duracion);
  }

  function siguiente() { ir(indice + 1); }
  function anterior()  { ir(indice - 1); }

  /* ════════════════════════════════════════════════════════════════════════
     Gestos: swipe vertical, rueda y teclado
     ════════════════════════════════════════════════════════════════════════ */

  function activarGestos() {
    let y0 = 0, x0 = 0, t0 = 0, enScrollH = false;

    document.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      y0 = t.clientY;
      x0 = t.clientX;
      t0 = Date.now();
      /* Si el dedo empezó dentro de un carrusel horizontal, no navegamos */
      enScrollH = !!e.target.closest('[data-scroll-h]');
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (enScrollH) return;
      /* Corta el rebote elástico de iOS: la página nunca hace scroll */
      if (e.cancelable) e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchend', (e) => {
      const t  = e.changedTouches[0];
      const dy = t.clientY - y0;
      const dx = t.clientX - x0;
      const dt = Date.now() - t0;

      if (Math.abs(dy) <= Math.abs(dx)) return;          /* fue horizontal */

      /* Si el dedo salió de un carrusel, solo navegamos si el gesto fue
         claramente vertical: si no, el swipe de las fotos cambiaría de sección */
      if (enScrollH && (Math.abs(dy) < 70 || Math.abs(dy) < Math.abs(dx) * 1.8)) return;

      const rapido = Math.abs(dy) > 45 && dt < 700;
      const largo  = Math.abs(dy) > 95;
      if (!rapido && !largo) return;

      dy < 0 ? siguiente() : anterior();
    }, { passive: true });

    /* Rueda / trackpad, para cuando lo abras en la compu */
    let ruedaLibre = true;
    document.addEventListener('wheel', (e) => {
      if (e.target.closest('[data-scroll-h]')) return;
      if (!ruedaLibre || Math.abs(e.deltaY) < 18) return;
      ruedaLibre = false;
      setTimeout(() => { ruedaLibre = true; }, 950);
      e.deltaY > 0 ? siguiente() : anterior();
    }, { passive: true });

    document.addEventListener('keydown', (e) => {
      const teclas = {
        ArrowDown: siguiente, PageDown: siguiente, ' ': siguiente,
        ArrowUp: anterior,    PageUp: anterior,
        Home: () => ir(0),    End: () => ir(total - 1)
      };
      const accion = teclas[e.key];
      if (!accion) return;
      /* No robamos la barra espaciadora si el foco está en un botón */
      if (e.key === ' ' && e.target.closest('button')) return;
      e.preventDefault();
      accion();
    });

    btnSig.addEventListener('click', siguiente);
  }

  /* ════════════════════════════════════════════════════════════════════════
     Pétalos flotando
     ════════════════════════════════════════════════════════════════════════ */

  const TINTES = [
    'rgba(245, 236, 228, .9)',   /* rosa blanca  */
    'rgba(245, 236, 228, .9)',
    'rgba(194, 56, 74, .9)',     /* gerbera roja */
    'rgba(155, 171, 142, .8)'    /* tallo verde  */
  ];

  /**
   * Siembra pétalos dentro de un contenedor.
   * @param {HTMLElement} destino
   * @param {number} cuantos
   * @param {{opacidad?: [number, number], escala?: number}} opciones
   */
  function sembrarPetalos(destino, cuantos, opciones = {}) {
    if (menosMovimiento.matches) return;

    const [opMin, opMax] = opciones.opacidad || [.05, .14];
    const escala = opciones.escala || 1;
    const trozos = [];

    for (let i = 0; i < cuantos; i++) {
      /* Profundidad: los pétalos "cerca de la cámara" son más grandes, caen
         más rápido y se ven más; los de atrás son chicos, lentos y tenues.
         Antes tamaño y velocidad se sorteaban por separado y todo caía en
         un mismo plano. */
      const cerca = Math.random();
      const ancho    = (11 + cerca * 17) * escala;
      const duracion = 30 - cerca * 13;
      trozos.push(`
        <svg class="petalo" aria-hidden="true" viewBox="0 0 24 36" style="
          --x: ${azar(-4, 98).toFixed(2)}%;
          --w: ${ancho.toFixed(1)}px;
          --c: ${TINTES[Math.floor(Math.random() * TINTES.length)]};
          --op: ${(opMin + (opMax - opMin) * (.25 + cerca * .75)).toFixed(3)};
          --dx: ${azar(-70, 70).toFixed(0)}px;
          --giro: ${azar(-320, 320).toFixed(0)}deg;
          --dur: ${duracion.toFixed(1)}s;
          --retraso: -${azar(0, duracion).toFixed(1)}s;
        "><use href="#fl-petalo"/></svg>`);
    }
    destino.insertAdjacentHTML('beforeend', trozos.join(''));
  }

  /* ════════════════════════════════════════════════════════════════════════
     La floración
     Tres capas de flores que crecen desde el centro hasta tapar la pantalla
     y luego se disuelven. Se anima la CAPA, no cada flor: así son tres
     elementos en movimiento y no treinta.
     ════════════════════════════════════════════════════════════════════════ */

  const FLORES = ['fl-gerbera', 'fl-rosa', 'fl-rosa', 'fl-lili'];   /* la roja puntúa, no domina */

  /* Cada capa es un plano. `span` es el trozo del centro donde se siembran:
     como la capa CRECE, lo que está fuera de ese centro nunca llega a verse.
     Sembrar en toda la pantalla desperdiciaba la mayoría de las flores. */
  const CAPAS = [
    { cols: 5, filas: 4, span: 76, w: [5, 10],  e0: .55, e1: 1.45, e2: 1.95, giro: -13, espera: 360, dur: 2450 },
    { cols: 5, filas: 4, span: 60, w: [10, 18], e0: .34, e1: 1.85, e2: 2.50, giro:   9, espera: 450, dur: 2500 },
    { cols: 4, filas: 3, span: 44, w: [20, 34], e0: .18, e1: 2.45, e2: 3.30, giro:  -6, espera: 540, dur: 2520 }
  ];

  function initFloracion() {
    const capa = $('#floracion');
    if (menosMovimiento.matches) return;

    capa.innerHTML = CAPAS.map((c) => {
      const flores = [];
      const paso = { x: c.span / c.cols, y: c.span / c.filas };
      const orilla = (100 - c.span) / 2;

      /* Rejilla con desorden: al azar puro quedan huecos y racimos */
      for (let f = 0; f < c.filas; f++) {
        for (let col = 0; col < c.cols; col++) {
          const x = orilla + paso.x * (col + .5) + azar(-paso.x * .42, paso.x * .42);
          const y = orilla + paso.y * (f + .5) + azar(-paso.y * .42, paso.y * .42);

          /* Las del centro abren primero: se lee como floración hacia afuera */
          const dist = Math.hypot(x - 50, y - 50) / (c.span * .72);
          const cual = FLORES[Math.floor(Math.random() * FLORES.length)];
          const rojo = cual === 'fl-gerbera';

          flores.push(`<svg class="floracion__flor" viewBox="0 0 100 100" style="
              --x:${x.toFixed(1)}%; --y:${y.toFixed(1)}%;
              --w:${azar(c.w[0], c.w[1]).toFixed(1)}vmin;
              --r:${azar(-180, 180).toFixed(0)}deg;
              --retraso:${(c.espera + dist * 560).toFixed(0)}ms;
              ${rojo
                ? `--fl-rojo:${Math.random() < .5 ? '#c2384a' : '#a3283a'};
                   --fl-rojo-hondo:#7e1a2b; --fl-centro:#571020;`
                : `--fl-crema:#f2e6dc; --fl-crema-2:#dcc8ba; --fl-linea:#bd9d8b;
                   --fl-vena:#d8c2b4; --fl-tallo:#7d8f73;`}
            "><use href="#${cual}"/></svg>`);
        }
      }

      return `<div class="floracion__capa" style="
        --e0:${c.e0}; --e1:${c.e1}; --e1b:${(c.e1 * 1.08).toFixed(2)}; --e2:${c.e2};
        --giro:${c.giro}deg; --giro2:${c.giro * 1.9}deg;
        --espera:${c.espera}ms; --dur:${c.dur}ms;
      ">${flores.join('')}</div>`;
    }).join('');
  }

  /** Dispara la floración una sola vez */
  function florecer() {
    const capa = $('#floracion');
    if (menosMovimiento.matches || capa.classList.contains('floreciendo')) return;
    capa.classList.add('floreciendo');
    /* Al terminar se apaga: no debe quedar tapando nada */
    setTimeout(() => capa.classList.remove('floreciendo'), 3200);
  }

  function initFondo() {
    const fondo = $('#fondo');
    const cuantos = window.innerWidth < 600 ? 9 : 14;
    sembrarPetalos(fondo, cuantos);
  }

  /* ════════════════════════════════════════════════════════════════════════
     Revelado al entrar en pantalla
     Las secciones se desplazan con transform, así que sus hijos sí entran y
     salen del viewport de verdad: el IntersectionObserver funciona.
     ════════════════════════════════════════════════════════════════════════ */

  let observador;

  function initObservador() {
    observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('visible');
        if (entrada.target.dataset.revelar !== 'siempre') {
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: .2 });

    observar(document);
  }

  /** Registra los [data-revelar] de un trozo del DOM (útil tras inyectar HTML) */
  function observar(ambito) {
    $$('[data-revelar]', ambito).forEach((el) => observador.observe(el));
  }

  /** Aplica un retraso escalonado a una lista de elementos */
  function escalonar(elementos, paso = 90, inicio = 0) {
    elementos.forEach((el, i) => {
      el.style.setProperty('--retraso', `${inicio + i * paso}ms`);
    });
  }

  /* ════════════════════════════════════════════════════════════════════════
     1 · Portada — el sobre que se abre
     ════════════════════════════════════════════════════════════════════════ */

  function initPortada() {
    const seccion = $('#s-portada');
    const sobre   = $('#sobre');
    const fecha   = $('#portadaFecha');

    /* El rango del mes, calculado desde FECHA_INICIO para que siga cuadrando
       si alguna vez se cambia la constante. El año solo se escribe una vez
       cuando las dos fechas caen en el mismo año. */
    const cumple = new Date(FECHA_INICIO);
    cumple.setMonth(cumple.getMonth() + 1);

    const mismoAno = cumple.getFullYear() === FECHA_INICIO.getFullYear();
    const desde = FECHA_INICIO.toLocaleDateString('es-MX',
      mismoAno ? { day: 'numeric', month: 'long' }
               : { day: 'numeric', month: 'long', year: 'numeric' });
    const hasta = cumple.toLocaleDateString('es-MX',
      { day: 'numeric', month: 'long', year: 'numeric' });

    fecha.textContent = `${desde} — ${hasta}`;

    /* El botón de siguiente no aparece hasta que el sobre está abierto */
    btnSig.classList.add('esta-fuera');

    /* Entrada: se deja un cuadro para que el navegador pinte el estado inicial */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => seccion.classList.add('lista'));
    });

    let abierto = false;

    sobre.addEventListener('click', () => {
      if (abierto) return;
      abierto = true;
      seccion.classList.add('abierta');
      sobre.setAttribute('aria-disabled', 'true');

      if (menosMovimiento.matches) {
        sobre.classList.add('abriendo', 'saliendo', 'abierto');
        btnSig.classList.remove('esta-fuera');
        return;
      }

      /* Lacre → solapa → LAS FLORES INUNDAN LA PANTALLA → detrás de ellas
         la tarjeta sale y se asienta → las flores se retiran y ahí está */
      sobre.classList.add('abriendo');
      florecer();
      setTimeout(() => sobre.classList.add('saliendo'), 640);
      setTimeout(() => sobre.classList.add('abierto'), 1560);
      setTimeout(() => btnSig.classList.remove('esta-fuera'), 2500);
    });
  }

  /* ════════════════════════════════════════════════════════════════════════
     2 · Contador en vivo
     ════════════════════════════════════════════════════════════════════════ */

  function initContador() {
    $('#contadorDesde').textContent = FECHA_INICIO.toLocaleDateString('es-MX', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    const campos = {
      dias:    $('#cDias'),
      horas:   $('#cHoras'),
      minutos: $('#cMinutos')
    };

    let primera = true;

    /* Cambia el dígito con un fundido, no con un rodillo */
    function pintar(el, valor) {
      if (el.textContent === valor) return;
      if (primera || menosMovimiento.matches) { el.textContent = valor; return; }

      el.classList.add('cambiando');
      setTimeout(() => {
        el.textContent = valor;
        el.classList.remove('cambiando');
      }, 420);
    }

    function tic() {
      const transcurrido = Math.max(0, Date.now() - FECHA_INICIO.getTime());
      const minutos = Math.floor(transcurrido / 60000);

      pintar(campos.dias,    String(Math.floor(minutos / 1440)));
      pintar(campos.horas,   String(Math.floor(minutos / 60) % 24).padStart(2, '0'));
      pintar(campos.minutos, String(minutos % 60).padStart(2, '0'));

      primera = false;
    }

    tic();
    setInterval(tic, 1000);

    /* ── La nota del día ─────────────────────────────────────────────────
       Un día normal muestra una frase que rota. El día que cumplen mes,
       el mismo bloque se convierte en el saludo de aniversario. */
    const nota   = $('#notaDia');
    const marca  = $('#notaDiaMarca');
    const texto  = $('#notaDiaTexto');

    const CANTIDAD = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis',
                      'siete', 'ocho', 'nueve', 'diez', 'once', 'doce'];

    function cuantoLlevamos(meses) {
      if (meses % 12 === 0) {
        const anos = meses / 12;
        return anos === 1 ? 'un año' : `${CANTIDAD[anos] || anos} años`;
      }
      return meses === 1 ? 'un mes' : `${CANTIDAD[meses] || meses} meses`;
    }

    function pintarNota() {
      const hoy = new Date();
      const aCero = (f) => new Date(f.getFullYear(), f.getMonth(), f.getDate());
      const dias = Math.round((aCero(hoy) - aCero(FECHA_INICIO)) / 86400000);

      const meses = (hoy.getFullYear() - FECHA_INICIO.getFullYear()) * 12
                  + (hoy.getMonth() - FECHA_INICIO.getMonth());
      const esAniversario = hoy.getDate() === FECHA_INICIO.getDate() && meses >= 1;

      nota.classList.toggle('es-aniversario', esAniversario);

      if (esAniversario) {
        texto.textContent = `Hoy cumplimos ${cuantoLlevamos(meses)}.`;
      } else {
        marca.textContent = `día ${dias}`;
        texto.textContent = NOTAS_DEL_DIA[dias % NOTAS_DEL_DIA.length];
      }
    }

    pintarNota();
    /* Por si deja la página abierta y cruza la medianoche */
    setInterval(pintarNota, 60000);
  }

  /* ════════════════════════════════════════════════════════════════════════
     3 · La canción
     El iframe NO existe hasta que se toca el botón: los navegadores móviles
     bloquean el autoplay si no nace de un gesto del usuario, y además así no
     se descarga nada de YouTube para quien nunca le da play.
     ════════════════════════════════════════════════════════════════════════ */

  function initCancion() {
    const seccion = $('#s-cancion');
    const marco   = $('#cancionMarco');
    const boton   = $('#cancionPlay');
    const capa    = $('#cancionPetalos');

    boton.addEventListener('click', () => {
      if (seccion.classList.contains('sonando')) return;
      seccion.classList.add('sonando');

      const parametros = new URLSearchParams({
        autoplay: '1',        /* permitido: venimos de un tap */
        playsinline: '1',     /* en iOS, que no salte a pantalla completa */
        rel: '0',
        modestbranding: '1'
      });

      const video = document.createElement('iframe');
      video.className = 'cancion__video';
      video.src = `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?${parametros}`;
      video.title = 'Te quiero tanto — Kevin Kaarl';
      video.allow = 'autoplay; encrypted-media; picture-in-picture';
      video.setAttribute('allowfullscreen', '');

      /* Se deja salir al botón antes de meter el video */
      const meter = () => {
        boton.remove();
        marco.appendChild(video);
      };
      menosMovimiento.matches ? meter() : setTimeout(meter, 380);

      /* Pétalos densos, encima de los del fondo */
      sembrarPetalos(capa, window.innerWidth < 600 ? 14 : 20, {
        opacidad: [.10, .24],
        escala: 1.2
      });
    });
  }

  /* ════════════════════════════════════════════════════════════════════════
     4 · Galería
     ════════════════════════════════════════════════════════════════════════ */

  function initGaleria() {
    const carril   = $('#galeriaPista');
    const numero   = $('#galeriaN');
    const elLinea  = $('#galeriaLinea');
    const elMoment = $('#galeriaMomento');
    const elCuenta = $('#galeriaCuenta');
    const cuantas  = GALERIA.length;

    $('#galeriaTotal').textContent = String(cuantas).padStart(2, '0');

    /* Un momento vacío hereda el de la foto anterior */
    const momentos = [];
    const lineas   = [];
    GALERIA.forEach((f, i) => {
      momentos[i] = f.momento || momentos[i - 1] || '';
      lineas[i]   = f.linea || '';
    });
    momentos.push(CIERRE_GALERIA.momento);
    lineas.push(CIERRE_GALERIA.linea);

    /* Todas las fotos son 960×1280: se declaran para que no salte el layout */
    const fotos = GALERIA.map((f, i) => {
      const nn = String(f.foto).padStart(2, '0');
      const temprana = i < 3;
      return `<figure class="diapo">
        <img src="./img/foto-${nn}.jpg" alt="${lineas[i]}"
             width="960" height="1280" decoding="async"
             loading="${temprana ? 'eager' : 'lazy'}"${i === 0 ? ' fetchpriority="high"' : ''}>
      </figure>`;
    });

    /* Y al final, la tarjeta de cierre */
    fotos.push(`<figure class="diapo diapo--cierre">
      <div class="ultima">
        <svg class="ultima__flor" viewBox="0 0 100 100" aria-hidden="true">
          <use href="#fl-lili"/>
        </svg>
        <p class="ultima__titulo">${CIERRE_GALERIA.titulo}</p>
        <span class="ultima__raya" aria-hidden="true"></span>
        <p class="ultima__texto">${CIERRE_GALERIA.texto}</p>
      </div>
    </figure>`);

    carril.innerHTML = fotos.join('');

    const diapos  = $$('.diapo', carril);
    const ultima  = diapos.length - 1;
    let actual = -1;
    let relojCuenta;

    /* Cambia el texto con un fundido.
       Se compara contra el texto que va EN CAMINO, no contra el que está en
       pantalla: si no, al pasar fotos rápido se saltan cambios y se queda
       texto viejo pegado. Y se cancela el cambio anterior si aún no ocurrió. */
    const enCamino = new WeakMap();

    function mudar(el, texto) {
      const previo = enCamino.get(el);
      const destinoActual = previo ? previo.destino : el.textContent.trim();
      if (destinoActual === texto) return;

      if (previo) clearTimeout(previo.reloj);

      if (menosMovimiento.matches) {
        el.textContent = texto;
        enCamino.set(el, { destino: texto, reloj: 0 });
        return;
      }

      el.classList.add('mudando');
      const reloj = setTimeout(() => {
        el.textContent = texto;
        el.classList.remove('mudando');
      }, 380);

      enCamino.set(el, { destino: texto, reloj });
    }

    /* ¿Cuál foto está sobre el eje del carril?
       Se mide por distancia al centro, NO por cuánta se ve: en pantallas
       anchas caben cuatro fotos completas a la vez y todas tienen la misma
       "visibilidad", así que el pie se quedaba clavado en la primera. */
    function centrada() {
      const caja = carril.getBoundingClientRect();
      const eje  = caja.left + caja.width / 2;

      let mejor = 0;
      let menor = Infinity;
      diapos.forEach((d, i) => {
        const r = d.getBoundingClientRect();
        const dist = Math.abs(r.left + r.width / 2 - eje);
        if (dist < menor) { menor = dist; mejor = i; }
      });
      return mejor;
    }

    function aplicar() {
      const i = centrada();
      if (i === actual) return;
      actual = i;

      diapos.forEach((d, k) => d.classList.toggle('centro', k === i));
      mudar(elLinea, lineas[i]);
      mudar(elMoment, momentos[i]);

      /* En la tarjeta de cierre no hay número que contar: se van el contador
         y su punto separador. No basta con desvanecerlos — si siguen ocupando
         su lugar, descentran la etiqueta. Se sacan del flujo a los 380 ms,
         que es cuando todo el renglón está invisible a media transición. */
      const esCierre = i === ultima;
      const meta = elCuenta.parentElement;

      elCuenta.classList.toggle('se-fue', esCierre);
      meta.classList.toggle('sin-cuenta', esCierre);
      if (!esCierre) numero.textContent = String(i + 1).padStart(2, '0');

      clearTimeout(relojCuenta);
      if (!esCierre) {
        meta.classList.remove('sin-hueco');
      } else if (menosMovimiento.matches) {
        meta.classList.add('sin-hueco');
      } else {
        relojCuenta = setTimeout(() => meta.classList.add('sin-hueco'), 380);
      }
    }

    /* El observador dispara el recálculo. La banda del rootMargin deja una
       franja estrecha justo en el eje del carril, así solo avisa cuando una
       foto cruza el centro y no cada vez que una asoma por la orilla. */
    const ojo = new IntersectionObserver(aplicar, {
      root: carril,
      rootMargin: '0px -45% 0px -45%',
      threshold: 0
    });

    diapos.forEach((d) => ojo.observe(d));

    /* Flechas ← → : una foto completa, no los ~40px del scroll nativo.
       Se lleva una "intención" aparte del índice visible, porque si se
       aprietan varias flechas seguidas el scroll suave todavía va en camino
       y leer el índice visible haría que todas apunten a la misma foto. */
    let intencion = 0;

    carril.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();

      intencion = Math.max(0, Math.min(
        diapos.length - 1,
        intencion + (e.key === 'ArrowRight' ? 1 : -1)
      ));
      const d = diapos[intencion];

      /* scrollTo sobre el carril y no scrollIntoView: así no se arrastra
         ningún ancestro de la página, que va toda montada en transform */
      carril.scrollTo({
        left: d.offsetLeft - (carril.clientWidth - d.offsetWidth) / 2,
        behavior: menosMovimiento.matches ? 'auto' : 'smooth'
      });
    });

    /* Cuando el carrusel se queda quieto, la intención vuelve a ser lo que
       de verdad se está viendo (por si se movió con el dedo) */
    let relojQuieto;
    carril.addEventListener('scroll', () => {
      clearTimeout(relojQuieto);
      relojQuieto = setTimeout(() => {
        aplicar();
        intencion = actual;
      }, 140);
    }, { passive: true });

    /* "desliza" desaparece en cuanto se usa el carrusel */
    const desliza = $('#galeriaDesliza');
    carril.addEventListener('scroll', () => desliza.classList.add('se-fue'),
                            { once: true, passive: true });
  }

  /* ════════════════════════════════════════════════════════════════════════
     5 · La carta
     Los bloques aparecen a ritmo de lectura, no a ritmo de decoración: 460 ms
     entre uno y otro en vez de los 80–120 ms del resto de la página.
     ════════════════════════════════════════════════════════════════════════ */

  function initCarta() {
    /* Primero se posa la hoja, y ya sobre ella va apareciendo la tinta */
    $('#s-carta .hoja').style.setProperty('--retraso', '0ms');
    escalonar($$('#s-carta .hoja__texto [data-revelar]'), 340, 560);
  }

  /* ════════════════════════════════════════════════════════════════════════
     6 · Cosas que me gustan de ti
     ════════════════════════════════════════════════════════════════════════ */

  function initGustos() {
    const seccion = $('#s-tarjetas');
    const rejilla = $('#gustosRejilla');
    const pista   = $('#gustosPista');

    rejilla.innerHTML = GUSTOS.map((g, i) => {
      const n = String(i + 1).padStart(2, '0');
      /* La misma flor va dos veces: chica y nítida arriba del título, y
         enorme y casi transparente detrás, como filigrana impresa */
      const flor = `<svg viewBox="0 0 100 100" aria-hidden="true"><use href="#fl-${g.flor}"/></svg>`;

      return `<li data-revelar>
        <button class="gusto" type="button" aria-expanded="false">
          <span class="gusto__giro">

            <span class="gusto__cara gusto__cara--frente">
              <span class="gusto__marca" aria-hidden="true">${flor}</span>
              <span class="gusto__num" aria-hidden="true">${n}</span>
              <span class="gusto__voltear" aria-hidden="true">
                <svg viewBox="0 0 24 24"><use href="#ic-voltear"/></svg>
              </span>
              <span class="gusto__flor" aria-hidden="true">${flor}</span>
              <span class="gusto__titulo">${g.titulo}</span>
              <span class="gusto__raya" aria-hidden="true"></span>
            </span>

            <span class="gusto__cara gusto__cara--atras">
              <span class="gusto__marca" aria-hidden="true">${flor}</span>
              <span class="gusto__num" aria-hidden="true">${n}</span>
              <span class="gusto__texto">${g.texto}</span>
            </span>

          </span>
        </button>
      </li>`;
    }).join('');

    /* Entrada escalonada de las 6, este sí a ritmo de decoración */
    const celdas = $$('.gustos__rejilla > li', seccion);
    escalonar(celdas, 90, 220);
    observar(rejilla);

    /* Al llegar a la sección, la primera tarjeta se asoma: gira un poco y
       regresa. Es la señal más clara de que son objetos que se voltean,
       mucho más que cualquier texto. Pasa una sola vez. */
    let yaSeAsomo = false;
    seccion.addEventListener('seccion:entra', () => {
      if (yaSeAsomo || menosMovimiento.matches) return;
      yaSeAsomo = true;
      const primera = $('.gusto', rejilla);
      setTimeout(() => {
        primera.classList.add('asoma');
        setTimeout(() => primera.classList.remove('asoma'), 1800);
      }, 1000);
    });

    seccion.addEventListener('click', (e) => {
      const tarjeta = e.target.closest('.gusto');
      if (!tarjeta) return;

      tarjeta.classList.remove('asoma');   /* que no pelee con el giro real */

      const abierta = tarjeta.getAttribute('aria-expanded') === 'true';
      tarjeta.setAttribute('aria-expanded', String(!abierta));

      /* La levantada: la tarjeta crece un poco a medio giro, como si se
         despegara de la mesa para voltearse */
      if (!menosMovimiento.matches) {
        tarjeta.classList.remove('girando');
        void tarjeta.offsetWidth;              /* reinicia la animación */
        tarjeta.classList.add('girando');
        setTimeout(() => tarjeta.classList.remove('girando'), 820);
      }

      /* Se van quedando volteadas las que quiera: no se cierran entre sí */
      pista.classList.add('se-fue');
    });
  }

  /* ════════════════════════════════════════════════════════════════════════
     7 · Cierre
     La gerbera se arma aquí y no en el HTML porque cada pétalo necesita su
     propio retraso: florece del centro hacia afuera, dando la vuelta.
     ════════════════════════════════════════════════════════════════════════ */

  function initCierre() {
    const seccion = $('#s-cierre');
    const flor    = $('#cierreFlor');

    const partes = [];

    /* Primero los de afuera en el DOM, para que los de adentro y el corazón
       queden pintados encima */
    for (let i = 0; i < 12; i++) {
      partes.push(`<use class="petalo-g petalo-g--fuera" href="#p-ger-fuera"
        style="--giro:${i * 30}deg; --retraso:${520 + i * 46}ms"/>`);
    }
    for (let i = 0; i < 12; i++) {
      partes.push(`<use class="petalo-g petalo-g--dentro" href="#p-ger-dentro"
        style="--giro:${15 + i * 30}deg; --retraso:${210 + i * 46}ms"/>`);
    }
    partes.push('<circle class="cierre__ojo" cx="50" cy="50" r="10" style="--retraso:0ms"/>');
    partes.push('<circle class="cierre__anillo" cx="50" cy="50" r="5.5" style="--retraso:120ms"/>');

    flor.innerHTML = partes.join('');

    /* Abre cuando de verdad se llega a la sección, no antes */
    let abierta = false;
    seccion.addEventListener('seccion:entra', () => {
      if (abierta) return;
      abierta = true;
      flor.classList.add('abierta');
    });

    /* ── La cuenta regresiva ─────────────────────────────────────────────── */
    const campos = {
      dias:    $('#fDias'),
      horas:   $('#fHoras'),
      minutos: $('#fMinutos')
    };
    const etiqueta = $('#cierreSobre');

    const ORDINALES = ['', 'primer', 'segundo', 'tercer', 'cuarto', 'quinto',
                       'sexto', 'séptimo', 'octavo', 'noveno', 'décimo',
                       'onceavo', 'doceavo'];

    /* El próximo día del mes en que cumplen, siempre en el futuro */
    function proximoMes(desde) {
      const d = new Date(FECHA_INICIO);
      d.setFullYear(desde.getFullYear(), desde.getMonth(), FECHA_INICIO.getDate());
      if (d.getTime() <= desde.getTime()) d.setMonth(d.getMonth() + 1);
      return d;
    }

    function comoSeLlama(fecha) {
      const meses = (fecha.getFullYear() - FECHA_INICIO.getFullYear()) * 12
                  + (fecha.getMonth() - FECHA_INICIO.getMonth());
      if (meses > 0 && meses % 12 === 0) {
        const anos = meses / 12;
        return `para nuestro ${ORDINALES[anos] || anos + 'º'} año`;
      }
      return ORDINALES[meses]
        ? `para nuestro ${ORDINALES[meses]} mes`
        : `para nuestro mes ${meses}`;
    }

    /* Mientras la fecha del reencuentro no llegue, se cuenta hacia ella.
       Cuando pasa, el contador NO se queda en cero: se pasa solo al próximo
       mes que cumplen, y se renueva mes con mes sin que nadie lo toque. */
    function objetivo() {
      const ahora = new Date();
      if (FECHA_REENCUENTRO.getTime() > ahora.getTime()) {
        return { fecha: FECHA_REENCUENTRO, texto: 'para volver a verte' };
      }
      const prox = proximoMes(ahora);
      return { fecha: prox, texto: comoSeLlama(prox) };
    }

    let primera = true;

    function pintar(el, valor) {
      if (el.textContent === valor) return;
      if (primera || menosMovimiento.matches) { el.textContent = valor; return; }

      el.classList.add('cambiando');
      setTimeout(() => {
        el.textContent = valor;
        el.classList.remove('cambiando');
      }, 420);
    }

    function tic() {
      const meta = objetivo();
      if (etiqueta.textContent !== meta.texto) etiqueta.textContent = meta.texto;

      const falta = Math.max(0, meta.fecha.getTime() - Date.now());
      const minutos = Math.floor(falta / 60000);

      pintar(campos.dias,    String(Math.floor(minutos / 1440)));
      pintar(campos.horas,   String(Math.floor(minutos / 60) % 24).padStart(2, '0'));
      pintar(campos.minutos, String(minutos % 60).padStart(2, '0'));

      primera = false;
    }

    tic();
    setInterval(tic, 1000);
  }

  /* ════════════════════════════════════════════════════════════════════════
     Arranque
     ════════════════════════════════════════════════════════════════════════ */

  let arrancado = false;

  function init() {
    if (arrancado) return;
    arrancado = true;

    medirAlto();
    vigilarAlto();
    raiz.style.setProperty('--n', total);
    raiz.style.setProperty('--i', 0);
    raiz.dataset.seccion = secciones[0].id;
    secciones[0].classList.add('esta-activa');

    construirProgreso();
    activarGestos();
    initFondo();
    initFloracion();
    initObservador();
    initPortada();
    initContador();
    initCancion();
    initGaleria();
    initCarta();
    initGustos();
    initCierre();

    document.body.classList.add('listo');
  }

  /* Las fuentes ya vienen precargadas; esperamos a que estén listas para que
     nada aparezca con la tipografía de respaldo. */
  if (document.fonts?.ready) {
    document.fonts.ready.then(init);
    /* Red de seguridad corta: con mala señal, esperar a las fuentes deja la
       pantalla en negro. Vale más arrancar y que la tipografía entre tarde. */
    setTimeout(init, 1200);
  } else {
    init();
  }

  /* Se exponen para los módulos de cada sección (se añaden más abajo) */
  window.PV = {
    ir, siguiente, anterior,
    observar, escalonar, sembrarPetalos,
    menosMovimiento, azar, $, $$,
    FECHA_INICIO, FECHA_REENCUENTRO, YOUTUBE_ID, GALERIA,
    seccion: (id) => document.getElementById(id)
  };
})();
