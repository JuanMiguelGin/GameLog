# Idea del proyecto: GameLog

## ¿De dónde viene la idea?

La idea surge de un problema muy concreto: llevo años jugando a videojuegos en varias plataformas y nunca sé con certeza qué juegos he terminado, cuáles tengo a medias y cuántas horas le he metido a cada uno. Steam guarda las horas, sí, pero solo de sus propios juegos. ¿Y los de PlayStation? ¿Los de Game Pass? ¿Los de Nintendo Switch? Cada plataforma tiene su propio sistema y no hay ningún sitio donde tenerlo todo junto.

GameLog es mi biblioteca de videojuegos personal: un lugar donde puedo registrar cualquier juego independientemente de la plataforma, marcar en qué estado está, apuntar cuántas horas le he dedicado y escribir una nota si quiero. Sin anuncios, sin algoritmos, solo tu historial.

## El problema que resuelve

Hay webs como HowLongToBeat o Backloggd que hacen algo parecido, pero tienen sus limitaciones: están en inglés, son lentas y están pensadas más para la comunidad que para el uso personal. Lo que quiero con GameLog es algo simple y tuyo: que entres, veas de un vistazo en qué juego estás ahora mismo, cuántas horas llevas y qué tienes pendiente. Sin ruido.

## Usuario objetivo

- Gamers que juegan en varias plataformas y quieren tener todo su historial en un solo sitio
- Gente con una lista interminable de juegos sin terminar que quiere organizarse de una vez
- Cualquiera que quiera llevar un registro honesto de cuánto tiempo pasa jugando y a qué

## Funcionalidades principales (MVP)

- **Añadir juegos**: título, plataforma, género, estado (jugando / completado / abandonado / pendiente) y notas
- **Estados y filtros**: filtrar la biblioteca por estado o plataforma
- **Panel de inicio**: resumen rápido con juegos en progreso, sesiones recientes y horas acumuladas
- **Historial de sesiones**: registrar cada sesión con fecha y horas jugadas; el total por juego se calcula automáticamente
- **Notas por juego**: campo de texto libre para apuntar lo que quieras
- **API REST**: backend con Node.js y Express, endpoints para juegos y sesiones con GET, POST, PATCH y DELETE

## Funcionalidades opcionales

- Buscador conectado a la API de RAWG para autocompletar título y carátula
- Gráfico de horas jugadas por semana
- Sistema de listas personalizadas ("Quiero jugar esto", "Los mejores que he jugado"...)
- Modo oscuro

## Ideas para el futuro

- Puntuaciones y reseñas propias por juego
- Estadísticas anuales al estilo Spotify Wrapped pero de videojuegos
- Importación automática desde Steam usando su API pública
- Sistema de cuentas para que el historial sea tuyo vayas donde vayas
