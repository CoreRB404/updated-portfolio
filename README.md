# Portfolio

Run from this folder:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open http://localhost:8000. Serve the site over HTTP so JavaScript modules work.

## Structure

- `index.html`: page content and native lazy-loaded project images.
- `assets/css/main.css`: styles, including the project hover effect.
- `assets/js/main.js`: navigation and section-based module loading.
- `assets/js/portfolio.js`: project filters, loaded near the gallery.
- `assets/js/contact.js`: form submission, loaded near the contact section.
- `assets/images/`: optimized WebP images used by the site.
- `files (1)/` and root PNG files: original pictures, preserved for editing.
- `tools/optimize_images.py`: regenerate WebP images with Python and Pillow.

`style.css` and `script.js` are compatibility entries. Edit files under `assets`.

## Production

Publish `index.html`, `assets/`, `Photoroom.png` (favicon), and
`REAL BLESS AGORDE CV 1234.pdf`. Original PNGs and the tools folder do not need
to be included in the deployed website. The page still uses external icon
stylesheets and Google Fonts. No build step is required.
