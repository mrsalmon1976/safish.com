# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

This is `software.safish.com`, Matt Salmon's personal technical blog, built on **Jekyll** with the **Beautiful Jekyll** theme (v5.0.0, vendored directly into this repo rather than pulled in as a remote theme — `_layouts/`, `_includes/`, `assets/`, `_data/ui-text.yml`, etc. are all local, editable copies of the theme). Deployed as a static site (CNAME configured), likely GitHub Pages.

## Commands

```bash
# Install Ruby dependencies
bundle install

# Serve locally with live reload (site available at http://localhost:4000)
bundle exec jekyll serve

# Build the site (matches CI)
bundle exec jekyll build --future
```

CI (`.github/workflows/ci.yml`) builds the site on every push/PR using the `jekyll/builder:3.8` Docker image — there is no test suite; a successful `jekyll build --future` is the only check. If changing Ruby dependencies or plugins, verify the Docker-based build still works, since local Jekyll versions can drift from what CI uses.

### Local development on Windows (Docker)

Jekyll's native gems (`ffi`, `kramdown`, etc.) are painful to compile with a native Windows Ruby install, so local dev runs Jekyll inside Docker instead via `Dockerfile` + `docker-compose.yml`. The compose file bind-mounts the whole repo into the container (`.:/srv/jekyll`), so the running container always sees the current state of your working tree.

```bash
# First run, or after editing Gemfile/Dockerfile (installs/updates gems)
docker compose up --build

# Every other time
docker compose up

# Stop
docker compose down
```

Then browse to `http://localhost:4000`.

- **Editing a post, page, or `_config.yml`**: just save the file. The container runs `jekyll serve --force_polling`, which polls the bind-mounted files (inotify doesn't propagate reliably through Windows bind mounts) and regenerates automatically — no rebuild or restart needed.
- **Editing `Gemfile` or `Dockerfile`**: rerun with `--build` so gems get reinstalled into the image.
- The first `Generating...` pass after a fresh `--build` takes 2-3 minutes (Windows bind-mount overhead across 20+ years of posts in `_posts/`); incremental regenerations after that are much faster.
- Gems are cached in a named volume (`jekyll-bundle`) separate from the bind-mounted source, so they persist across `docker compose up` runs without needing a rebuild.

## Content architecture

- **Blog posts** live in `_posts/<year>/`, one subfolder per year (e.g. `_posts/2026/`), not flat as in stock Jekyll. Filenames follow `YYYY-MM-DD-slug.markdown` and use the standard `layout: post` front matter (`title`, `date`, `tags`, `published`).
- **Static pages** (About, Books, Links, software project pages, tool pages) live in `_pages/` and its subfolders (`_pages/software/`, `_pages/tools/`), not in the repo root. This is wired up via `include: ['_pages','_pages/tools']` in `_config.yml`, since Jekyll excludes underscore-prefixed directories by default.
- **Root-level `.md`/`.html` files** (`index.html`, `all-articles.md`, `sticky-articles.md`, `tags.html`) are thin wrappers that select a special layout (`home`, `all-articles`, `sticky-articles`) to render collections of posts — the actual page content isn't in these files.
- **Navigation** is defined centrally in `_config.yml` under `navbar-links`, grouped into sections (Blog, Software, Online Tools, Links, About). Adding a new page under `_pages/` requires also adding it here to make it reachable from the nav.

## Interactive tool pages

Pages under `_pages/tools/` (mortgage calculator, compound/future value calculators, etc.) are Jekyll pages whose front matter references a dedicated client-side script via `js: /assets/js/<name>.js`. Markup uses Vue.js directives (`v-model`, `v-on`, `v-bind`, `v-if`) directly in the HTML form, with the matching Vue app logic in `assets/js/<name>.js`. When adding a new calculator/tool, follow this same pattern: a page in `_pages/tools/`, a matching JS file in `assets/js/`, and a `navbar-links` entry under "Online Tools" in `_config.yml`.

## Site configuration

Nearly all site-wide behavior (title, author, nav links, social links, colors, analytics IDs, comments provider, RSS, permalink format) is controlled from `_config.yml` rather than scattered across templates — check there first before hunting through `_layouts`/`_includes` for a setting. Per-page overrides use Jekyll front matter parameters as documented in `README.md` (title, subtitle, tags, cover-img, comments, layout, custom css/js, etc.).

Comments currently use **Utterances** (GitHub issues-backed); other providers (Disqus, Facebook, Staticman, giscus, CommentBox) are wired up in `_includes/` and `_config.yml` but commented out/unused.

## Excluded from production build

`_config.yml`'s `exclude` list keeps `CHANGELOG.md`, `CNAME`, `Gemfile`, `LICENSE`, `README.md`, and `docs/` out of the built site — `CHANGELOG.md` in particular is upstream Beautiful Jekyll's changelog, not a log of changes made in this repo.
