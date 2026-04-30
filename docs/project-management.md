# Gestión del proyecto

## Metodología

Para este proyecto he optado por una mezcla entre Scrum y Kanban. La estructura general sigue Scrum (hay un backlog claro con funcionalidades definidas desde el principio y el trabajo se divide en bloques), pero el día a día se gestiona más al estilo Kanban porque al ser un proyecto individual no tiene mucho sentido hacer sprints formales ni dailies.

## Tablero de Trello

El tablero está organizado con las siguientes columnas:

- **Backlog**: todas las funcionalidades identificadas al definir la idea
- **Todo**: las tareas priorizadas para hacer próximamente
- **In Progress**: lo que está en desarrollo en este momento
- **Review**: terminado pero pendiente de revisar o testear
- **Done**: completado y verificado

Enlace al tablero: *(añadir enlace una vez creado en Trello)*

## Organización de las funcionalidades

Las funcionalidades se dividieron en tarjetas de Trello, y cada tarjeta en subtareas técnicas. Por ejemplo:

**Tarjeta: Gestión de juegos**
- Definir tipos TypeScript (Game, CreateGameDTO, UpdateGameDTO)
- Crear endpoints GET, POST, PATCH, DELETE en el backend
- Crear el componente GameForm con validación
- Crear la página GamesPage con filtros
- Crear la página GameDetail con edición y eliminación

**Tarjeta: Historial de sesiones**
- Definir tipos Session y CreateSessionDTO
- Crear endpoints GET, POST, DELETE de sesiones
- Implementar lógica de suma/resta de horas en el store
- Crear el componente SessionForm
- Crear la página SessionsPage

**Tarjeta: Dashboard**
- Calcular estadísticas con useMemo
- Mostrar juegos en progreso
- Mostrar actividad reciente

**Tarjeta: Estado global**
- Implementar GamesContext con useReducer
- Definir todas las acciones del reducer
- Crear el hook useGames
- Integrar el Provider en App.tsx

## Orden de desarrollo

El proyecto se desarrolló en este orden aproximado:

1. Configuración inicial (Vite, Tailwind, React Router, estructura de carpetas)
2. Tipos TypeScript compartidos
3. Backend completo (store, controllers, routes)
4. Cliente de API tipado en el frontend
5. Context API y estado global
6. Componentes reutilizables
7. Páginas: Dashboard → GamesPage → GameDetail → NewGame → SessionsPage → NotFound
8. Documentación
