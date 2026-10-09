# WEFT project website

Static research website for **WEFT: Scaling Tool-Use Post-Training for General-Purpose Agents**. No build step or third-party JavaScript dependencies.

## Local preview

From this directory:

```sh
python3 -m http.server 4187 --bind 127.0.0.1
```

Open [the preview](http://127.0.0.1:4187/). The current development preview uses this address.

## Contents

- `index.html`: the concise bilingual research narrative, paper links, figures, and citation.
- `styles.css`: a consistent reading grid, responsive typography, proportional figure frames, and the image viewer.
- `app.js`: full-page English/Chinese switching, framework tabs, keyboard navigation, full-size figure viewing, and citation copying.
- `assets/`: the original WEFT mark, complete figure exports from the paper, and platform marks for the paper links.

The site uses relative asset paths for GitHub Pages project hosting. The hero links point to the paper on arXiv, alphaXiv, and Hugging Face; code and model releases are not implied.

## GitHub Pages

This website is maintained under the personal account **Marble66666**, not an organization.

- Repository: [Marble66666/WEFT](https://github.com/Marble66666/WEFT)
- Website: [WEFT](https://marble66666.github.io/WEFT/)
- Publishing source: the root of the `main` branch, using **Deploy from a branch** in repository Settings → Pages.

Publish only `index.html`, `styles.css`, `app.js`, `README.md`, `.gitignore`, `.nojekyll`, and `assets/`. Keep `.preview/`, manuscript projects, and local screenshots out of the repository. The `.nojekyll` file serves the static files without Jekyll processing. Changes pushed to `main` are republished by GitHub Pages.

## Platform assets

Retrieved from the platforms' own pages on October 9, 2026. Marks identify the linked destinations, not an affiliation or endorsement. They remain the property of their respective owners.

- `arxiv.svg`: unmodified small logomark from the [official arXiv brand page](https://info.arxiv.org/brand/brand-guidelines.html), via its [SVG download](https://cornell.box.com/v/arxiv-logomark-small-svg). Observe arXiv's brand and acknowledgement guidelines for public reuse; no general-purpose logo license is implied.
- `alphaxiv.svg`: the header mark embedded on the [official alphaXiv paper page](https://www.alphaxiv.org/abs/2609.36887). Original geometry retained; the website's default light-theme logo color is resolved in the SVG so it displays independently of alphaXiv's stylesheet.
- `huggingface.svg`: the [official borderless logo](https://huggingface.co/front/assets/huggingface_logo-noborder.svg), also used on the [Hugging Face brand page](https://huggingface.co/brand). File unchanged.

All three destinations were checked against the title **WEFT: Scaling Tool-Use Post-Training for General-Purpose Agents**. The Hugging Face destination is its [paper page](https://huggingface.co/papers/2609.36887).

## Editing

Keep the paper's citation metadata, numerical results, and figure contents consistent with the manuscript. Update the `width` and `height` attributes if a figure's aspect ratio changes. All figures can be enlarged without leaving the page.

The hero contains the title, a brief summary, and the three paper links. It intentionally omits a separate author list, affiliations, and correspondence details; the complete author list remains in the original arXiv BibTeX. Keep body copy concise, avoiding repeated explanations already provided by a figure or another section.

The body text, all six figure containers, and their captions share one 48rem reading column with the same responsive side margins. All complete figures use their original aspect ratios; no diagram is cropped or hidden in a disclosure. Detailed figures can be enlarged in the image viewer. The single-panel evolution plot is centered at a maximum width of 34rem without an outer frame; its caption stays aligned to the reading column. Detailed architecture diagrams keep the full column width. MegaMCP is visible within the training section. Construction, self-evolution, and stable training form the main narrative; environment breadth, task complexity, and interaction diversity remain subtopics of construction.

The redesign was informed by the clear paper identity on [Nerfies](https://nerfies.github.io/), the complete method illustrations on [Diffusion Policy](https://diffusion-policy.cs.columbia.edu/), and the article rhythm on [Physical Intelligence's π0.5 page](https://www.pi.website/blog/pi05). No source code or research visuals were copied from these reference sites.

## Languages and citation

English is the initial default. The EN / 中文 control translates navigation, narrative, captions, and viewer controls. The preference is retained locally and can be shared with `?lang=en` or `?lang=zh`. Paper figures and citation metadata stay in their original form. Chinese strings live next to their English counterparts in `data-zh` attributes; translated accessible labels use `data-zh-label` and `data-zh-alt`.

The citation was copied verbatim from **Export BibTeX Citation** on the [arXiv paper page](https://arxiv.org/abs/2609.36887) on October 9, 2026. It is the `@misc{mao2026weftscalingtooluseposttraining,...}` entry, not a reconstructed journal citation. Keep the entry unchanged in both language modes.
