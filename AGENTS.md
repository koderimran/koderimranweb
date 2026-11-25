<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep scroll-dependent header appearance in SiteChrome with semantic CSS tokens; a passive listener with separate enter/exit thresholds prevents shrink-induced flicker.
- Use the shared Portrait component for visible owner photos so home and about always render the same uploaded portrait in every theme.
- Home uses Portrait as an absolute, unframed hero background with theme-token edge overlays; never filter or regenerate the source photo, to preserve the owner's face.
- The portrait is one transparent cut-out (black suit) for both themes (`src/assets/koder-imran-portrait.png`). Its lower edge is blended only by the `--hero-portrait-mask` radial mask in styles.css, which starts below the shoulders; never fade the suit through a long band of partial opacity on the light canvas (it reads as grey smoke), and keep the face region fully opaque.
- Keep site-wide theme state in ThemeProvider and colors in semantic CSS tokens; apply and persist preferences after hydration so every route shares the theme without SSR mismatches. Render theme-dependent assets (logos) as a single element whose source is chosen in code from the active theme — two elements toggled with CSS display get overridden by more specific descendant selectors.
