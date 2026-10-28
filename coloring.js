/* Sugar skull paint-by-numbers, drawn locally as SVG. No images or services required. */
(() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const palette = [
    { number: 1, name: 'Marigold', hex: '#f7c647' },
    { number: 2, name: 'Orange', hex: '#f28b42' },
    { number: 3, name: 'Rose', hex: '#ed79aa' },
    { number: 4, name: 'Turquoise', hex: '#5ecbca' },
    { number: 5, name: 'Leaf green', hex: '#94cb86' },
    { number: 6, name: 'Violet', hex: '#b39ade' }
  ];
  const regions = [];
  function add(shape, number, x, y) {
    regions.push({ shape, number, x, y });
  }
  function petal(x, y, rx, ry, rotation, number) {
    add('<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="' + rx + '" ry="' + ry + '" transform="rotate(' + rotation.toFixed(1) + ' ' + x.toFixed(1) + ' ' + y.toFixed(1) + ')" />', number, x, y);
  }
  // Six colorful petals around each eye.
  [180, 340].forEach((cx, side) => {
    for (let i = 0; i < 6; i++) {
      const radians = (-90 + 60 * i) * Math.PI / 180;
      const x = cx + Math.cos(radians) * 58;
      const y = 312 + Math.sin(radians) * 58;
      petal(x, y, 16, 23, -90 + 60 * i + 90, [1, 4, 3, 2, 5, 6][(i + side * 2) % 6]);
    }
  });
  // The flower on the forehead.
  for (let i = 0; i < 6; i++) {
    const deg = -90 + i * 60, r = deg * Math.PI / 180;
    petal(260 + Math.cos(r) * 34, 177 + Math.sin(r) * 34, 14, 20, deg + 90, [3, 2, 1, 5, 4, 6][i]);
  }
  add('<circle cx="260" cy="177" r="16" />', 1, 260, 177);
  // Three little flowers on each cheek.
  [165, 355].forEach((cx, side) => {
    for (let i = 0; i < 3; i++) {
      const deg = -90 + i * 120, r = deg * Math.PI / 180;
      petal(cx + Math.cos(r) * 19, 432 + Math.sin(r) * 19, 13, 17, deg + 90, [3, 4, 2][(i + side) % 3]);
    }
  });
  // Six small colorful teeth across the lower jaw.
  for (let i = 0; i < 6; i++) {
    const x = 195 + i * 22;
    add('<rect x="' + x + '" y="492" width="20" height="39" rx="5" />', [1, 3, 4, 5, 2, 6][i], x + 10, 511);
  }
  // A heart on the chin.
  add('<path d="M260 567 C248 554 228 545 228 533 C228 521 247 516 260 531 C273 516 292 521 292 533 C292 545 272 554 260 567 Z" />', 3, 260, 539);

  function sanitizeFill(value) {
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter(i => Number.isInteger(i) && i >= 0 && i < regions.length))].sort((a, b) => a - b);
  }
  function hasPainting(assignment) {
    return !!(assignment && assignment.coloring && assignment.coloring.type === 'sugar-skull');
  }
  function markup(filled, interactive) {
    const done = new Set(sanitizeFill(filled));
    const lines = [];
    lines.push('<rect x="0" y="0" width="520" height="630" rx="18" fill="#fffaf0"/>');
    lines.push('<g fill="none" stroke="#d8c7a9" stroke-width="2"><path d="M24 75 Q24 30 69 30 M451 30 Q496 30 496 75 M24 550 Q24 600 69 600 M451 600 Q496 600 496 550"/></g>');
    lines.push('<path d="M260 74 C180 74 108 126 108 219 C108 258 98 287 116 331 C123 351 138 365 149 380 C152 429 168 454 190 471 L190 519 Q190 551 220 551 L300 551 Q330 551 330 519 L330 471 C352 454 368 429 371 380 C382 365 397 351 404 331 C422 287 412 258 412 219 C412 126 340 74 260 74 Z" fill="#fffdf6" stroke="#30233f" stroke-width="8" stroke-linejoin="round"/>');
    // Uncolored regions show their number. Matching with the palette colors them in.
    regions.forEach((r, index) => {
      const isDone = done.has(index);
      const color = palette[r.number - 1].hex;
      const label = 'Section ' + (index + 1) + ': color ' + r.number + ', ' + palette[r.number - 1].name;
      lines.push('<g data-region="' + index + '"' + (interactive ? ' tabindex="0" role="button" aria-label="' + label + '"' : '') + ' style="' + (interactive ? 'cursor:pointer;' : '') + '">');
      lines.push('<g fill="' + (isDone ? color : '#fffdf6') + '" stroke="#30233f" stroke-width="2.5" stroke-linejoin="round">' + r.shape + '</g>');
      if (!isDone) {
        lines.push('<text x="' + r.x + '" y="' + (r.y + 4) + '" fill="#30233f" stroke="#fffdf6" stroke-width="3" paint-order="stroke" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="800" pointer-events="none">' + r.number + '</text>');
      }
      lines.push('</g>');
    });
    // Ink details make it a recognizable decorative sugar skull while keeping color areas tappable.
    lines.push('<g fill="#30233f"><circle cx="180" cy="312" r="29"/><circle cx="340" cy="312" r="29"/></g>');
    lines.push('<g fill="#fffdf6"><circle cx="170" cy="300" r="7"/><circle cx="330" cy="300" r="7"/></g>');
    lines.push('<path d="M260 364 C249 376 239 387 243 400 C247 410 257 408 260 401 C263 408 273 410 277 400 C281 387 271 376 260 364 Z" fill="#30233f"/>');
    lines.push('<g fill="none" stroke="#30233f" stroke-width="3" stroke-linecap="round"><path d="M220 466 Q260 478 300 466"/><path d="M217 545 Q260 558 303 545"/><path d="M146 221 Q167 197 192 211"/><path d="M328 211 Q353 197 374 221"/></g>');
    lines.push('<g fill="#30233f"><circle cx="127" cy="266" r="4"/><circle cx="393" cy="266" r="4"/><circle cx="145" cy="367" r="4"/><circle cx="375" cy="367" r="4"/><circle cx="260" cy="255" r="4"/></g>');
    lines.push('<g fill="none" stroke="#30233f" stroke-width="2.5"><path d="M238 245 Q260 232 282 245"/><path d="M233 275 Q260 289 287 275"/></g>');
    lines.push('<g fill="#30233f" font-family="Georgia,serif" font-size="18" text-anchor="middle"><text x="260" y="53">✦</text><text x="72" y="321">✦</text><text x="448" y="321">✦</text></g>');
    return lines.join('');
  }
  function createArt(filled, interactive = false) {
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('xmlns', NS);
    svg.setAttribute('viewBox', '0 0 520 630');
    svg.setAttribute('width', '520');
    svg.setAttribute('height', '630');
    svg.setAttribute('aria-label', 'Decorative Día de los Muertos sugar skull paint by numbers');
    svg.setAttribute('class', 'skull-art');
    svg.innerHTML = markup(filled, interactive);
    return svg;
  }
  function render(container, initial, onChange) {
    const panel = document.createElement('div');
    panel.className = 'coloring-panel';
    const artWrap = document.createElement('div');
    artWrap.className = 'coloring-art-wrap';
    const controls = document.createElement('div');
    controls.className = 'coloring-controls';
    const intro = document.createElement('p');
    intro.textContent = 'Choose a numbered color, then select a matching number on the skull. Complete every section to include your finished artwork in your assignment PDF.';
    const paletteTitle = document.createElement('h3');
    paletteTitle.textContent = 'Choose a color';
    const buttons = document.createElement('div');
    buttons.className = 'color-palette';
    const status = document.createElement('p');
    status.className = 'coloring-message';
    status.setAttribute('role', 'status');
    status.textContent = 'Start with color 1, then find a section marked 1.';
    const count = document.createElement('p');
    count.className = 'coloring-count';
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'nav-button secondary';
    reset.textContent = 'START OVER';
    const filled = new Set(sanitizeFill(initial));
    let selected = 1;
    let art = null;
    function update() {
      count.textContent = filled.size + ' of ' + regions.length + ' sections colored';
      buttons.querySelectorAll('button').forEach(b => {
        const active = +b.dataset.number === selected;
        b.classList.toggle('selected', active);
        b.setAttribute('aria-pressed', String(active));
      });
      const next = createArt([...filled], true);
      if (art) art.replaceWith(next); else artWrap.append(next);
      art = next;
      art.addEventListener('click', e => {
        const g = e.target.closest('[data-region]');
        if (g) paint(+g.dataset.region);
      });
      art.addEventListener('keydown', e => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const g = e.target.closest('[data-region]');
        if (g) { e.preventDefault(); paint(+g.dataset.region); }
      });
    }
    function paint(index) {
      const region = regions[index];
      if (!region || filled.has(index)) return;
      if (region.number !== selected) {
        status.textContent = 'That section is number ' + region.number + '. Pick color ' + region.number + ' in the palette.';
        return;
      }
      filled.add(index);
      onChange([...filled].sort((a, b) => a - b));
      status.textContent = filled.size === regions.length ?
        'Beautiful! All sections are complete. Your colored skull will appear on the final PDF.' :
        'Nice! You colored section ' + (index + 1) + '. Keep going!';
      update();
    }
    palette.forEach(c => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'palette-choice';
      button.dataset.number = c.number;
      button.style.setProperty('--swatch', c.hex);
      button.textContent = c.number + ' · ' + c.name;
      button.addEventListener('click', () => { selected = c.number; status.textContent = 'Color ' + c.number + ' selected. Tap a section marked ' + c.number + '.'; update(); });
      buttons.append(button);
    });
    reset.addEventListener('click', () => {
      if (!window.confirm('Erase all your colored sections and start again?')) return;
      filled.clear();
      selected = 1;
      onChange([]);
      status.textContent = 'Ready to start again!';
      update();
    });
    controls.append(intro, paletteTitle, buttons, count, status, reset);
    panel.append(artWrap, controls);
    container.append(panel);
    update();
  }
  async function snapshot(filled) {
    const svg = createArt(filled, false);
    const svgText = new XMLSerializer().serializeToString(svg);
    const blobURL = URL.createObjectURL(new Blob([svgText], {type: 'image/svg+xml;charset=utf-8'}));
    try {
      const image = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Unable to prepare the colored skull.'));
        img.src = blobURL;
      });
      const canvas = document.createElement('canvas');
      canvas.width = 1040; canvas.height = 1260;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Unable to create the artwork image.');
      ctx.fillStyle = '#fffaf0'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const b64 = canvas.toDataURL('image/jpeg', 0.91).split(',')[1];
      return { width: canvas.width, height: canvas.height, binary: atob(b64) };
    } finally {
      URL.revokeObjectURL(blobURL);
    }
  }
  window.DerbyColoring = { hasPainting, render, complete: value => sanitizeFill(value).length === regions.length, count: regions.length, snapshot };
})();
