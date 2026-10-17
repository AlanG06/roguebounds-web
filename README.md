# Web de Roguebounds

Página del juego: HTML, CSS y JS sin dependencias. Los enlaces de donación y de la alpha se cambian al principio de `main.js`.

## Interruptor de la alpha: `estado.json`

El juego lo lee al arrancar.

- `"alpha": "abierta"` se juega. `"cerrada"` cierra todas las copias de la alpha (para siempre) y muestra `mensaje` con un botón a `enlace`.
- `"version_minima"`: las copias con una versión anterior piden descargar la nueva.

Se cambia, se hace push, y Netlify lo publica en un minuto.
