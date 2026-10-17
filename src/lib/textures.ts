/**
 * Embossed-paper textures, generated as inline SVG data URIs so there are
 * zero extra network requests and nothing to shift layout.
 * Light + dark copies of the same florals, offset by 1px, read as relief.
 */
const motif = `
<g transform="translate(58 60)">
  ${[0, 72, 144, 216, 288].map((r) => `<ellipse cx="0" cy="-15" rx="8" ry="14" transform="rotate(${r})"/>`).join("")}
  <circle r="4.5"/>
</g>
<g transform="translate(158 152) scale(.75)">
  ${[0, 72, 144, 216, 288].map((r) => `<ellipse cx="0" cy="-15" rx="8" ry="14" transform="rotate(${r})"/>`).join("")}
  <circle r="4.5"/>
</g>
<path d="M104 214 C112 184 138 166 150 128 M126 176 C136 172 142 164 142 156 M118 192 C106 188 100 180 100 170 M136 150 C146 150 152 144 154 136"/>
<path d="M18 130 C30 150 44 156 60 150 M30 150 C28 162 32 170 42 176 M200 40 C190 60 174 66 160 62 M186 56 C188 46 196 40 204 44"/>
`;

const tile = (stroke: string, dx: number) =>
  `<g transform="translate(${dx} ${dx})" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round">${motif}</g>`;

const floralSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">${tile(
  "rgba(20,0,4,.55)",
  1.4,
)}${tile("rgba(190,90,100,.34)", -0.6)}</svg>`;

const noiseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .1  0 0 0 0 0  0 0 0 0 .03  0 0 0 .55 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;

const url = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

export const EMBOSSED_BURGUNDY = [
  url(noiseSvg),
  url(floralSvg),
  "radial-gradient(120% 90% at 50% 40%, #6a1a26 0%, #4a0e17 55%, #35080e 100%)",
].join(", ");
