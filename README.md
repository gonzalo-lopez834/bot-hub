# Bot Hub · Landing Page

SPA creada con React y Vite para presentar el catálogo de servicios de automatización de Bot Hub. Incluye listados, detalle de cada servicio y un formulario de contacto UI-only listo para conectarse con una API real.

## Características principales
- Grid responsiva de servicios con cartas interactivas y jerarquía visual clara.
- Vista de detalle con ventajas, iconografía y formulario contextual.
- Configuración centralizada (`Provider`) para rutas, enlaces y modo de contacto.
- Accesibilidad reforzada: skip link, navegación con `NavLink` + `aria-current`, estados de foco visibles.
- Estilos con Tailwind CSS y utilidades personalizadas en `src/styles/index.css`.

## Requisitos
- Node.js 18+
- npm (o pnpm/yarn adaptando los comandos)

## Scripts útiles
```bash
npm install      # dependencias
npm run dev      # modo desarrollo (http://localhost:5173)
npm run build    # build de producción
npm run preview  # sirve el build para verificación manual
```

## Estructura relevante
- `src/App.jsx`: layout principal, skip link, navbar y routers.
- `src/components/Container.jsx`: contenedor reutilizable para el ancho máximo.
- `src/components/LandingGrid.jsx`: listado de servicios con cards hover.
- `src/components/ServiceDetailView.jsx`: detalle, ventajas y `FormsDetail`.
- `src/components/FormsDetail.jsx`: formulario accesible (envío simulado).
- `src/provider/Provider.jsx`: configuración global de la app.
- `src/styles/index.css`: directivas de Tailwind y ajustes globales.

## Próximos pasos sugeridos
- Conectar `FormsDetail` con un endpoint real (webhook o ruta interna).
- Agregar más secciones en la barra de navegación usando `Navbar`.
- Extender la data en `src/data/services.json` o integrar un CMS.

¡Listo! Con `npm run dev` podés revisar la SPA, validar la accesibilidad básica y ajustar el contenido según la necesidad del equipo de marketing o ventas.

