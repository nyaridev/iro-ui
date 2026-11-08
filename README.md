# Iro UI

React components with swappable styles. An app picks its look with one attribute: **blombo** (dark, flat and
precise; made for web apps) or **forge** (deep ink, glows and ornaments; made for desktop apps), and more styles can be
added without touching the components. A Design Lab shows every component in every style.

> Work in progress: nothing is released yet. See [docs/adr/README.md](docs/adr/README.md) for the plan.

## Run the Design Lab

```bash
pnpm install
pnpm lab
```

Then open http://localhost:4400.

## Develop

`pnpm check` runs the type check, Biome, the tests and the file size check. The architecture and its decisions are in
[docs/adr/](docs/adr/README.md).

## License

[MIT](LICENSE)
