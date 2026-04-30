# Testing y pruebas

## Metodología

Las pruebas realizadas son manuales, comprobando cada funcionalidad de forma sistemática en el navegador y verificando las respuestas de la API directamente.

---

## Pruebas del backend (API)

Todas las pruebas de API se hicieron accediendo a las URLs directamente en el navegador para los GETs, y usando el cliente del frontend para el resto.

| Endpoint | Prueba | Resultado |
|----------|--------|-----------|
| GET /health | Acceder a localhost:3001/health | ✅ Devuelve `{"status":"ok"}` |
| GET /api/v1/games | Acceder a localhost:3001/api/v1/games | ✅ Devuelve los juegos precargados |
| POST /api/v1/games | Crear un juego desde el formulario | ✅ Aparece en la biblioteca |
| PATCH /api/v1/games/:id | Editar un juego desde el detalle | ✅ Se actualiza correctamente |
| DELETE /api/v1/games/:id | Eliminar un juego | ✅ Desaparece de la lista y sus sesiones también |
| POST /api/v1/sessions | Registrar una sesión desde el detalle | ✅ Las horas se suman al total del juego |
| DELETE /api/v1/sessions/:id | Eliminar una sesión | ✅ Las horas se restan del juego |
| GET /api/v1/sessions | Cargar sesiones en el historial | ✅ Aparecen ordenadas por fecha |
| Ruta inexistente | Acceder a /api/v1/xyz | ✅ Devuelve 404 con mensaje claro |

---

## Pruebas del frontend

### Navegación
- [x] Todos los enlaces del sidebar llevan a la página correcta
- [x] El enlace activo se resalta en púrpura
- [x] El botón "Volver" en GameDetail y NewGame funciona correctamente
- [x] Las URLs son correctas (/, /games, /games/:id, /games/new, /sessions)
- [x] Acceder a una ruta inexistente muestra la página 404

### Dashboard
- [x] Las estadísticas se calculan correctamente (totales, jugando, completados, horas)
- [x] La sección "Jugando ahora" muestra solo los juegos con estado "playing"
- [x] La actividad reciente muestra las últimas sesiones
- [x] Si no hay datos, se muestran los mensajes vacíos correctamente

### Biblioteca de juegos
- [x] Se muestran todos los juegos en el grid
- [x] El filtro por estado funciona (Todos, Jugando, Completados, Pendientes, Abandonados)
- [x] El buscador filtra por título correctamente
- [x] Al hacer clic en una tarjeta navega al detalle del juego
- [x] Si no hay resultados, muestra el mensaje vacío

### Formulario de creación
- [x] Si el título está vacío y se intenta enviar, muestra el error
- [x] Al seleccionar el estado se resalta el botón correspondiente
- [x] Al enviar correctamente redirige a la lista de juegos
- [x] El nuevo juego aparece en la biblioteca

### Detalle de juego
- [x] Muestra correctamente todos los datos del juego
- [x] El botón Editar abre el formulario con los datos rellenados
- [x] Al guardar los cambios se actualiza la vista
- [x] El botón Eliminar muestra una confirmación antes de borrar
- [x] Al eliminar redirige a la lista de juegos
- [x] Registrar una sesión actualiza las horas totales del juego
- [x] Eliminar una sesión resta las horas correctamente
- [x] Si se accede a un id que no existe, muestra el mensaje de juego no encontrado

### Historial de sesiones
- [x] Muestra todas las sesiones de todos los juegos
- [x] El botón eliminar borra la sesión de la lista

### Diseño responsive
- [x] El layout funciona en pantallas de escritorio
- [x] El grid de juegos se adapta al número de columnas según el ancho

---

## Errores encontrados y corregidos

- **Import no usado**: `StatusBadge` importado en Dashboard sin usar → eliminado
- **Tipo no usado**: `Platform` importado en GamesPage sin usar → eliminado
- Ambos errores fueron detectados por el compilador de TypeScript al hacer `npm run build` y corregidos antes de la entrega
