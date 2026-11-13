# Trikafta para Noemí

Sitio web de la campaña **#TrikaftaParaNoemí — Sonríe en cada respiro**, que informa sobre la
fibrosis quística (FQ) en México y apoya a Noemí Fuentes en el acceso a su tratamiento.

🌐 **[trikaftaparanoemi.com](https://trikaftaparanoemi.com)**

## Contexto

El sitio original era una SPA en Angular: Google solo veía un `<app-root>` vacío y no podía
indexar su contenido. Lo rediseñé y migré a **Astro con generación estática**, para que
todo el contenido llegue en el HTML, con cero JavaScript innecesario.

## Resultados

- **Lighthouse 100/100/100/100** (rendimiento, accesibilidad, buenas prácticas y SEO) en móvil y escritorio.
- Imágenes de **~24 MB a ~1.4 MB**, con formatos y tamaños responsivos generados en el build.
- Migración SEO sin perder enlaces: redirecciones 301 de las rutas anteriores, sitemap y Search Console.

## Decisiones técnicas

- **Astro + TypeScript estricto:** HTML estático; JavaScript solo donde aporta (compartir, reproductor de video bajo demanda).
- **Content collections con Zod:** proyectos, comunidad y páginas validados por schema. Si un dato no cumple el contrato, el build falla y no se publica.
- **Tailwind CSS 4 con tokens semánticos** (`primary`, `ink`, `surface`…), con la paleta por defecto deshabilitada para mantener la consistencia.
- **Accesibilidad:** menú responsive sin JavaScript (`<details>`), "saltar al contenido", `aria-current`, textos alternativos y contraste AA.
- **Rendimiento:** fuentes servidas desde el propio dominio, CSS incrustado, fachada para el video de YouTube (el reproductor solo se carga al hacer clic).

## CI/CD

GitHub Actions revisa tipos (`astro check`), compila y publica por **FTPS** en Hostinger:

| Rama | Entorno |
|---|---|
| `astro` | staging (`noindex`) |
| `main` | producción |

Además, un rebuild diario mantiene actualizados el contenido con fecha de vigencia y el año del pie de página.

## Desarrollo local

```bash
nvm use        # Node 24 (ver .nvmrc)
npm install
npm run dev    # http://localhost:4321
npm run check  # revisión de tipos
npm run build  # genera dist/
```

## Créditos y licencia

El **código** está disponible bajo licencia MIT. Los **textos, fotografías, logotipo y
contenido de la campaña** pertenecen a Noemí Fuentes, se usan con su autorización y **no**
están cubiertos por esa licencia.