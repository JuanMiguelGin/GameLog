# Documentación de componentes

## StatusBadge

**Archivo**: `src/components/StatusBadge.tsx`

Badge de color que representa el estado de un juego. Recibe el estado como prop y aplica la clase de color correspondiente usando la utilidad `statusColor`.

```tsx
<StatusBadge status="playing" />
<StatusBadge status="completed" />
```

**Props**:
- `status: GameStatus` — uno de: `playing`, `completed`, `abandoned`, `pending`

---

## GameCard

**Archivo**: `src/components/GameCard.tsx`

Tarjeta de juego para el grid de la biblioteca. Al hacer clic navega al detalle del juego. Muestra título, género, plataforma, horas totales y estado.

```tsx
<GameCard game={game} />
```

**Props**:
- `game: Game` — objeto juego completo

**Comportamiento**: usa `useNavigate` internamente para redirigir a `/games/:id` al hacer clic.

---

## StatCard

**Archivo**: `src/components/StatCard.tsx`

Tarjeta de métrica para el dashboard. Muestra una etiqueta, un valor destacado y un subtexto opcional.

```tsx
<StatCard label="Horas totales" value="86h" sub="Desde que empezaste" />
```

**Props**:
- `label: string` — texto descriptivo pequeño
- `value: string | number` — valor principal
- `sub?: string` — subtexto opcional

---

## GameForm

**Archivo**: `src/components/GameForm.tsx`

Formulario controlado para crear o editar un juego. Si recibe `initial`, actúa como formulario de edición y rellena los campos con los datos existentes. Si no, actúa como formulario de creación.

```tsx
<GameForm onSubmit={handleSubmit} onCancel={handleCancel} />
<GameForm initial={game} onSubmit={handleEdit} onCancel={handleCancel} />
```

**Props**:
- `initial?: Partial<Game>` — datos iniciales para edición
- `onSubmit: (dto: CreateGameDTO) => Promise<void>` — callback al enviar
- `onCancel: () => void` — callback al cancelar

**Validación**: el título es obligatorio. Si está vacío, muestra un mensaje de error debajo del campo y no envía el formulario.

**Campos**: título, plataforma (select), género (select), estado (botones), notas (textarea)

---

## SessionForm

**Archivo**: `src/components/SessionForm.tsx`

Formulario para registrar una sesión de juego. Pide las horas jugadas y la fecha. La fecha por defecto es el día actual y no permite seleccionar fechas futuras.

```tsx
<SessionForm gameId={game.id} onSubmit={handleAddSession} onCancel={handleCancel} />
```

**Props**:
- `gameId: string` — id del juego al que pertenece la sesión
- `onSubmit: (dto: CreateSessionDTO) => Promise<void>` — callback al enviar
- `onCancel: () => void` — callback al cancelar

**Validación**: las horas deben ser un número positivo. Acepta decimales (ej: 2.5 horas).

---

## Sidebar

**Archivo**: `src/components/Sidebar.tsx`

Navegación lateral fija. Usa `NavLink` de React Router para marcar automáticamente el enlace activo con estilos de color púrpura. Los enlaces son: Dashboard, Mis juegos e Historial.

No recibe props. Se renderiza una sola vez en `App.tsx` y persiste entre rutas.
