# Retrospectiva final

## Qué he construido

GameLog es una aplicación fullstack para registrar y gestionar una biblioteca personal de videojuegos. Permite añadir juegos de cualquier plataforma, llevar un historial de sesiones con las horas jugadas, filtrar la biblioteca por estado y ver estadísticas en el dashboard.

La app conecta un frontend en React con TypeScript y Tailwind con una API REST desplegada junto al frontend en Vercel (Serverless Functions), comunicándose mediante HTTP/JSON.

---

## Qué he aprendido

### Conexión frontend–backend

Lo más valioso del proyecto ha sido entender cómo se conectan las dos partes. No basta con que la API devuelva datos; hay que pensar en los contratos de tipos, en qué pasa cuando la petición falla, en los estados de carga, y en cómo mantener el frontend sincronizado con el backend sin tener que recargar la página.

El cliente de API tipado (`src/api/client.ts`) fue clave para esto: al tener una función genérica `request<T>` con los tipos correctos, el compilador de TypeScript avisaba si intentaba usar los datos de una forma que no correspondía con lo que devolvía la API.

### TypeScript en un proyecto real

En proyectos pequeños TypeScript puede parecer que añade trabajo sin aportar mucho. En un proyecto de este tamaño, con tipos compartidos entre formularios, contexto, cliente de API y componentes, se nota la diferencia: el autocompletado funciona bien, los errores de tipo se detectan antes de ejecutar el código y los refactors son más seguros.

### Context API con useReducer

Antes de este proyecto usaba Context API solo con useState. Usar useReducer hace que el estado sea más predecible porque cada cambio pasa por una acción nombrada, y el reducer deja claro cómo cambia el estado en cada caso. Es más código inicial pero el resultado es más fácil de entender y de depurar.

### Arquitectura por capas en el backend

Separar routes, controllers y services puede parecer excesivo para un proyecto pequeño, pero cuando tuve que cambiar cómo se calculaban las horas totales (al añadir o eliminar sesiones) solo tuve que tocar el servicio, sin tocar los controllers ni las rutas. Eso justifica la separación.

---

## Problemas que encontré

### Tipos no usados
Al compilar el frontend para producción con `npm run build`, TypeScript detectó dos imports que no se estaban usando (`StatusBadge` en Dashboard y `Platform` en GamesPage). En desarrollo no fallaba porque Vite es más permisivo, pero el compilador estricto los marcó como error. Se corrigieron eliminando los imports.

### CORS
Al arrancar el frontend y el backend Express en local en puertos distintos (5173 y 3001), el navegador bloqueaba las peticiones por CORS. Se resolvió instalando el paquete `cors` en Express y añadiéndolo como middleware. En producción (Vercel), el frontend llama a la API con `/api/v1` y no hay CORS entre dominios.

### Sincronización de horas
Al eliminar una sesión había que restar las horas del juego correspondiente. Al principio olvidé implementar esta lógica en el servicio y las horas del juego no se actualizaban al borrar sesiones. Se corrigió en `services/store.ts` en la función `deleteSession`.

---

## Cómo usé la IA durante el desarrollo

La IA fue útil principalmente para:

- Generar la estructura inicial del proyecto y los archivos de configuración (Tailwind, tsconfig, Vite)
- Escribir los tipos TypeScript de forma consistente entre frontend y backend
- Implementar partes repetitivas como los endpoints REST y los reducers del contexto
- Detectar y corregir errores de compilación
- Redactar la documentación de la carpeta docs/

Lo importante es que usar IA no significa no entender el código. Cada parte del proyecto la revisé, la entendí y la probé manualmente. La IA acelera la escritura pero las decisiones de arquitectura y la verificación de que todo funciona correctamente son responsabilidad del desarrollador.

---

## Qué mejoraría

- Añadir una base de datos real (Supabase) para que los datos persistan entre reinicios del servidor
- Autenticación de usuario para que cada persona tenga su propia biblioteca
- Tests automatizados con Vitest para los hooks y las funciones de utilidad
- Conectar la API de RAWG para autocompletar los datos del juego al escribir el título
