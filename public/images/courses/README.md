# Course Illustration Style Guide

All SVGs in this folder follow a strict style spec so every card looks consistent across the site.

## Spec

| Property | Value |
|----------|-------|
| **viewBox** | `0 0 600 400` |
| **Attributes** | `xmlns`, `role="img"`, descriptive `aria-label` |
| **Background** | Full-size `<rect>` filled with a **diagonal `linearGradient`** (`x1="0" y1="0" x2="1" y2="1"`) |
| **Ambient circles** | Two large translucent white circles (`opacity ~0.08`) in opposite corners, partly off-canvas |
| **Main subject** | Flat shapes only — `<rect>`, `<circle>`, `<path>`, `<line>`. White (`#ffffff`) and light tints for surfaces; dark neutral (`#0f172a` / `#111827`) only for contrast elements |
| **Accent badge** | One small badge shape (circle + icon) in a corner of the subject |
| **Size limit** | Under **6 KB** |
| **No** | Text/letters, external fonts, embedded raster images, external `href`/`url()`, logos, brands |

## Gradient IDs (must be unique per file)

Each file uses a unique `id` prefix to avoid collisions when multiple SVGs appear on the same page.

| File | Background gradient id | Notes |
|------|------------------------|-------|
| `hci.svg` | `bg` | indigo → purple |
| `web-development.svg` | `bg` | sky → blue |
| `cybersecurity.svg` | `bg`, `shield` | dark navy → dark green |
| `programming-fundamentals.svg` | `bg-pf` | lime → emerald |
| `ui-ux-design.svg` | `bg-ux` | rose → pink |
| `software-engineering.svg` | `bg-se` | amber → orange |
| `database-systems.svg` | `bg-db`, `cyl-db` | teal → sky |
| `computer-networks.svg` | `bg-cn` | fuchsia → violet |

> ⚠️ **Important:** `hci.svg` and `web-development.svg` both use `id="bg"`. This is fine while they are not on the same page at the same time, but new files **must** use a unique id like `bg-<slug>`.

## Adding a new course illustration

1. Pick a hue not yet used (see table above).
2. Copy the structure of an existing file.
3. Use a unique gradient id: `bg-<course-slug>`.
4. Name the file `<course-slug>.svg` matching the `id` field in `mock-data.ts`.
5. Update `src/data/mock-data.ts` — set `image: '/images/courses/<course-slug>.svg'`.
6. Add a row to this table.
7. Run `npm run build` to verify no errors.
