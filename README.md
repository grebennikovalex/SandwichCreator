# SandwichCreator

Russian / English presentation website for SandwichCreator, a Windows application for sandwich panel and flashing layouts in Archicad via Tapir.

- Website: https://grebennikovalex.github.io/SandwichCreator/
- English: https://grebennikovalex.github.io/SandwichCreator/en/index.html
- Static files: `docs/` (HTML, CSS, JavaScript, local assets and the Windows download).
- GitHub Pages source: `main` branch, `/docs` directory. No build or external runtime dependencies.
- Sitemap: https://grebennikovalex.github.io/SandwichCreator/sitemap.xml

The Windows application source code and Archicad project files are not included. App screenshots currently show the Russian-language interface. This is a draft presentation site.

## Local preview

```sh
python -m http.server 8765 --bind 127.0.0.1 --directory docs
```

Open http://127.0.0.1:8765/ . To update the website, replace files in `docs/` and push to `main`.
