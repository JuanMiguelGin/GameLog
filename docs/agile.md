# Metodologías de desarrollo ágil

## ¿Qué es Agile?

Agile es una forma de entender el desarrollo de software que surgió como respuesta a los métodos tradicionales, donde todo el proyecto se planificaba al detalle antes de escribir una sola línea de código. El problema con ese enfoque es que el mundo cambia, los requisitos cambian, y cuando llegabas al final te dabas cuenta de que lo que habías construido ya no era lo que se necesitaba.

La idea de Agile es simple: en lugar de intentar predecir todo desde el principio, divides el trabajo en partes pequeñas, entregas algo funcional rápido, recibes feedback y ajustas. El objetivo no es seguir un plan a rajatabla, sino adaptarse a la realidad.

En 2001 un grupo de desarrolladores publicó el Manifiesto Ágil, que resume la filosofía en cuatro valores:

- Las personas y las interacciones por encima de los procesos y las herramientas
- El software que funciona por encima de la documentación exhaustiva
- La colaboración con el cliente por encima de la negociación de contratos
- La respuesta al cambio por encima de seguir un plan

Agile no es una metodología en sí misma, es más bien un paraguas bajo el que se agrupan varias metodologías concretas, como Scrum o Kanban.

---

## Scrum

Scrum es probablemente la metodología ágil más usada en equipos de desarrollo. La idea es organizar el trabajo en ciclos cortos llamados **sprints**, normalmente de dos semanas, al final de los cuales tienes que entregar algo funcional.

### Roles principales

- **Product Owner**: la persona que representa los intereses del cliente o del negocio. Define qué hay que construir y en qué orden, y es el responsable del backlog.
- **Scrum Master**: no es el jefe del equipo, sino la persona que se asegura de que el equipo trabaja bien, elimina los obstáculos que aparecen y hace que se sigan las reglas de Scrum.
- **Equipo de desarrollo**: los que construyen el producto. Son autónomos, deciden cómo hacer el trabajo técnico.

### Conceptos clave

- **Product Backlog**: la lista completa de todo lo que hay que hacer en el producto. Lo gestiona el Product Owner y está ordenado por prioridad.
- **Sprint Backlog**: el subconjunto del backlog que el equipo se compromete a completar durante un sprint.
- **Sprint**: el ciclo de trabajo, normalmente de 1 a 4 semanas. Al final de cada sprint se entrega algo que funciona.
- **Daily Scrum**: una reunión diaria de 15 minutos donde cada miembro del equipo cuenta qué hizo ayer, qué hará hoy y si tiene algún bloqueo.
- **Sprint Review**: al final del sprint, el equipo muestra lo que ha construido al Product Owner y a los stakeholders.
- **Sprint Retrospective**: también al final del sprint, pero esta reunión es interna. El equipo reflexiona sobre cómo ha trabajado y qué puede mejorar.

---

## Kanban

Kanban viene del mundo de la fabricación japonesa (Toyota lo popularizó) y se basa en una idea muy visual: representar el trabajo en un tablero con columnas que representan los estados por los que pasa una tarea.

Las columnas más habituales son: **Backlog → Todo → In Progress → Review → Done**, aunque cada equipo las adapta a su flujo de trabajo.

Lo más característico de Kanban es el concepto de **Work In Progress (WIP) limit**: hay un límite máximo de tareas que pueden estar en cada columna a la vez. Si la columna "In Progress" tiene límite 3, no puedes mover una tarea nueva a esa columna hasta que termines una de las que ya están ahí. Esto evita que el equipo empiece muchas cosas a la vez y no termine ninguna.

A diferencia de Scrum, Kanban no tiene sprints ni roles fijos. El trabajo fluye de forma continua y se van añadiendo y priorizando tareas según las necesidades del momento.

---

## Diferencias entre Scrum y Kanban

| | Scrum | Kanban |
|---|---|---|
| Ciclos de trabajo | Sprints de duración fija | Flujo continuo sin iteraciones |
| Roles | Product Owner, Scrum Master, equipo | No define roles |
| Cambios durante el trabajo | No se cambia lo comprometido en el sprint | Se puede cambiar en cualquier momento |
| Métricas | Velocidad del equipo (puntos por sprint) | Tiempo de ciclo (cuánto tarda una tarea) |
| Reuniones | Daily, Review, Retrospective | No hay reuniones obligatorias |
| Curva de aprendizaje | Más alta, requiere adoptar el framework | Más baja, se adapta al flujo existente |

---

## ¿Cuándo usar cada una?

**Scrum encaja mejor cuando:**
- El equipo trabaja en un producto con funcionalidades nuevas que hay que planificar y priorizar
- Hay un cliente o stakeholder que quiere ver progreso regularmente
- El equipo puede comprometerse a un volumen de trabajo por sprint
- Se trabaja en proyectos con fecha de entrega definida

**Kanban encaja mejor cuando:**
- El trabajo es impredecible o llega de forma continua (como soporte técnico o mantenimiento)
- El equipo necesita flexibilidad para cambiar prioridades en cualquier momento
- No hay ciclos fijos de entrega
- Se quiere mejorar un proceso existente sin cambiar toda la estructura del equipo
