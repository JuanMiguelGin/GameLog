# Formularios e interacción

## Formularios controlados

Todos los formularios de GameLog son formularios controlados: el valor de cada input está vinculado al estado de React y se actualiza con cada cambio del usuario. Esto permite validar en tiempo real y tener control total sobre los datos antes de enviarlos.

---

## GameForm

**Archivo**: `src/components/GameForm.tsx`

Formulario para crear o editar un juego. Gestiona un objeto de estado con todos los campos:

```tsx
const [form, setForm] = useState<CreateGameDTO>({
  title: initial?.title ?? '',
  platform: initial?.platform ?? 'PC (Steam)',
  genre: initial?.genre ?? 'RPG',
  status: initial?.status ?? 'pending',
  notes: initial?.notes ?? '',
})
```

### Actualización de campos

Una función genérica actualiza cualquier campo del formulario y limpia su error si lo tenía:

```tsx
function field(key: keyof CreateGameDTO, value: string) {
  setForm(prev => ({ ...prev, [key]: value }))
  if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }))
}
```

### Validación

La validación ocurre al intentar enviar el formulario. Si hay errores, se muestran debajo del campo correspondiente y el formulario no se envía:

```tsx
function validate(): boolean {
  const newErrors: typeof errors = {}
  if (!form.title.trim()) newErrors.title = 'El título es obligatorio'
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}
```

### Estado de envío

Se usa un estado `submitting` para deshabilitar el botón mientras se procesa la petición y evitar envíos duplicados:

```tsx
const [submitting, setSubmitting] = useState(false)

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  if (!validate()) return
  setSubmitting(true)
  try {
    await onSubmit(form)
  } finally {
    setSubmitting(false)
  }
}
```

### Campo de estado

El estado del juego no es un select sino un grupo de botones para hacerlo más visual e intuitivo. Cada botón aplica estilos diferentes según si está seleccionado:

```tsx
{STATUSES.map(s => (
  <button
    type="button"
    onClick={() => field('status', s.value)}
    className={form.status === s.value ? 'bg-purple-600 text-white' : 'border-gray-300'}
  >
    {s.label}
  </button>
))}
```

---

## SessionForm

**Archivo**: `src/components/SessionForm.tsx`

Formulario más simple para registrar una sesión de juego. Solo tiene dos campos:

- **Horas**: input numérico que acepta decimales (ej: 1.5). Validación: debe ser un número mayor que 0.
- **Fecha**: input de tipo date con el día actual como valor por defecto y `max` fijado a hoy para no permitir fechas futuras.

```tsx
const today = new Date().toISOString().split('T')[0]
const [hours, setHours] = useState('')
const [date, setDate] = useState(today)
```

### Validación

```tsx
const h = parseFloat(hours)
if (!hours || isNaN(h) || h <= 0) {
  setError('Introduce un número de horas válido')
  return
}
```

---

## Resumen de campos y validaciones

| Formulario | Campo | Tipo | Validación |
|------------|-------|------|------------|
| GameForm | Título | text | Obligatorio |
| GameForm | Plataforma | select | Sin validación (tiene valor por defecto) |
| GameForm | Género | select | Sin validación (tiene valor por defecto) |
| GameForm | Estado | botones | Sin validación (tiene valor por defecto) |
| GameForm | Notas | textarea | Opcional |
| SessionForm | Horas | number | Obligatorio, mayor que 0 |
| SessionForm | Fecha | date | No puede ser futura |
