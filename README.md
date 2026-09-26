# React + TypeScript + Vite

## Portfolio Visual Modes

One component tree serves Base and Super Saiyan modes. `src/index.css` defines
the semantic `--t-*` tokens under `:root` and `[data-theme="super"]`. Keep
layout and content independent of those tokens when extending a section.

`ThemeProvider` restores `portfolio-theme` from localStorage, defaults to Base,
and tolerates unavailable storage. The small bootstrap in `index.html` restores
the saved palette before React loads. `PowerToggle` is reused in the hero,
floating navigation, and mobile menu.

Framer Motion honors the system reduced-motion preference. The character's CSS
aura uses a transform animation and stops under reduced motion; no canvas,
WebGL, additional artwork downloads, or animation dependencies are required.

Run `npm run dev` for a local preview, `npm run build` for TypeScript and the
production build, and `npm run lint` for lint checks.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
