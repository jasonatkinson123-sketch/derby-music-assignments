(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const themeNames = ['Arcade', 'Notebook', 'Retro 1970s', 'Space Age', 'Jazz Poster'];
  const themeIds = ['arcade', 'notebook', 'retro', 'space', 'jazz'];
  const today = new Date();
  let themeIndex = Math.floor(new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime() / 86400000) % 5;
  let assignment = window.DEFAULT_ASSIGNMENT;
  let step = 0;
  let responses = { name: '', choice: null, short: ['', ''] };

  function validAssignment(a) {
    return a && typeof a.title === 'string' && a.title.trim() && Array.isArray(a.reading) && a.reading.length === 3 && a.reading.every(x => typeof x === 'string' && x.trim()) && a.multipleChoice && typeof a.multipleChoice.question === 'string' && a.multipleChoice.question.trim() && Array.isArray(a.multipleChoice.options) && a.multipleChoice.options.length >= 2 && a.multipleChoice.options.every(x => typeof x === 'string' && x.trim()) && Array.isArray(a.shortAnswers) && a.shortAnswers.length === 2 && a.shortAnswers.every(x => typeof x === 'string' && x.trim());
  }
  function parseAssignment() {
    if (!location.hash.startsWith('#assignment=')) return window.DEFAULT_ASSIGNMENT;
    try {
      const parsed = JSON.parse(decodeURIComponent(location.hash.slice(12)));
      return validAssignment(parsed) ? parsed : window.DEFAULT_ASSIGNMENT;
    } catch { return window.DEFAULT_ASSIGNMENT; }
  }
  function safeImage(url) {
    if (url === 'vivaldi.jpg') return url;
    try { const u = new URL(url); return u.protocol === 'https:' ? u.href : ''; } catch { return ''; }
  }
  function node(tag, text, cls) {
    const el = document.createElement(tag);
    if (text != null) el.textContent = text;
    if (cls) el.className = cls;
    return el;
  }
  function setTheme() {
    document.body.dataset.theme = themeIds[themeIndex];
    $('themeLabel').textContent = themeNames[themeIndex];
  }
  function storeDraft() {
    try { sessionStorage.setItem('music-draft:' + location.hash, JSON.stringify(responses)); } catch {}
  }
  function loadDraft() {
    try {
      const value = JSON.parse(sessionStorage.getItem('music-draft:' + location.hash));
      if (value && typeof value.name === 'string' && Array.isArray(value.short)) responses = value;
    } catch {}
  }
  function showAssignment() {
    assignment = parseAssignment();
    if (!validAssignment(assignment)) assignment = window.DEFAULT_ASSIGNMENT;
    responses = { name: '', choice: null, short: ['', ''] };
    loadDraft(); step = 0;
    $('assignmentView').hidden = false; $('builderView').hidden = true;
    $('teacherLink').hidden = false;
    document.title = assignment.title + ' · Derby Music';
    $('title').textContent = assignment.title;
    $('eyebrow').textContent = assignment.eyebrow || 'MUSIC CLASS · READING';
    render();
  }
  function setHeading(stage, label, heading) {
    stage.append(node('p', label, 'eyebrow-card'), node('h2', heading));
  }
  function render() {
    const stage = $('stage'); stage.replaceChildren();
    const labels = ['THE READING', 'QUESTION 01', 'QUESTION 02', 'QUESTION 03', 'FINISH'];
    $('stepLabel').textContent = labels[step];
    $('stepCounter').textContent = (step + 1) + ' / 5';
    $('segments').replaceChildren(...labels.map((_, i) => node('span', null, 'segment' + (i <= step ? ' active' : ''))));
    $('status').textContent = '';
    $('backButton').disabled = step === 0;
    $('nextButton').textContent = step === 4 ? 'DOWNLOAD PDF ↓' : 'NEXT →';
    $('navHint').textContent = step === 4 ? 'SAVE YOUR WORK' : 'YOUR ANSWERS ARE SAVED AS YOU GO';
    if (step === 0) renderReading(stage);
    if (step === 1) renderChoice(stage);
    if (step === 2 || step === 3) renderShort(stage, step - 2);
    if (step === 4) renderFinish(stage);
  }
  function renderReading(stage) {
    setHeading(stage, 'THE STORY · 3 SHORT PARAGRAPHS', 'Can music paint a picture?');
    const layout = node('div', null, 'reading-layout');
    const copy = node('div', null, 'reading-copy');
    assignment.reading.forEach(p => copy.append(node('p', p)));
    layout.append(copy);
    const image = safeImage(assignment.image);
    if (image) {
      const figure = node('figure', null, 'art-frame');
      const img = node('img'); img.src = image; img.alt = assignment.imageAlt || 'Image for the reading';
      img.onerror = () => figure.remove();
      const caption = node('figcaption');
      const source = safeImage(assignment.imageSource);
      if (source) { const link = node('a', assignment.imageCredit || 'Image source'); link.href = source; link.target = '_blank'; link.rel = 'noopener noreferrer'; caption.append(link); }
      else caption.textContent = assignment.imageCredit || '';
      figure.append(img, caption); layout.append(figure);
    }
    stage.append(layout);
  }
  function renderChoice(stage) {
    setHeading(stage, 'PICK ONE ANSWER', assignment.multipleChoice.question);
    stage.append(node('p', 'Choose the answer you think fits the reading best.', 'question-intro'));
    const choices = node('div', null, 'choices');
    assignment.multipleChoice.options.forEach((answer, index) => {
      const label = node('label', null, 'choice' + (responses.choice === index ? ' selected' : ''));
      const input = node('input'); input.type = 'radio'; input.name = 'multipleChoice'; input.value = String(index); input.checked = responses.choice === index;
      input.addEventListener('change', () => { responses.choice = index; storeDraft(); choices.querySelectorAll('.choice').forEach((el, i) => el.classList.toggle('selected', i === index)); });
      label.append(input, node('span', answer)); choices.append(label);
    });
    stage.append(choices);
  }
  function renderShort(stage, index) {
    setHeading(stage, 'WRITE A SHORT ANSWER · ' + (index + 1) + ' OF 2', assignment.shortAnswers[index]);
    const label = node('label', 'Your answer', 'answer-label');
    const field = node('textarea', null, 'answer-box'); field.id = 'shortAnswer'; field.placeholder = 'Type your answer here…'; field.value = responses.short[index] || '';
    field.addEventListener('input', () => { responses.short[index] = field.value; storeDraft(); });
    label.htmlFor = field.id;
    stage.append(label, field, node('p', 'A sentence or two is enough. You can go back and edit your answer.', 'hint'));
  }
  function renderFinish(stage) {
    setHeading(stage, 'FINAL STEP', 'Ready to turn in your work?');
    stage.append(node('p', 'Check your answers and enter your name. The PDF will contain your name, the title, and your three answers.', 'question-intro'));
    const grid = node('div', null, 'finish-grid');
    const one = node('div'); one.append(node('b', 'MULTIPLE CHOICE'), node('p', responses.choice == null ? 'No answer yet' : assignment.multipleChoice.options[responses.choice] || 'No answer yet'));
    const two = node('div'); two.append(node('b', 'SHORT ANSWERS'), node('p', responses.short.filter(x => x && x.trim()).length + ' of 2 entered'));
    grid.append(one, two); stage.append(grid);
    const label = node('label', 'Your name', 'answer-label'); label.htmlFor = 'studentName';
    const field = node('input', null, 'name-box'); field.type = 'text'; field.id = 'studentName'; field.autocomplete = 'name'; field.placeholder = 'First and last name'; field.maxLength = 100; field.value = responses.name;
    field.addEventListener('input', () => { responses.name = field.value; storeDraft(); });
    stage.append(label, field, node('p', 'After downloading, attach the PDF to your Google Classroom assignment and select Turn in.', 'hint'));
  }
  function goNext() {
    if (step < 4) { step++; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const missing = [];
    if (responses.choice == null || !assignment.multipleChoice.options[responses.choice]) missing.push('multiple-choice question');
    responses.short.forEach((answer, i) => { if (!answer || !answer.trim()) missing.push('short answer ' + (i + 1)); });
    if (!responses.name.trim()) missing.push('your name');
    if (missing.length) { $('status').textContent = 'Please complete ' + missing.join(', ') + ' before downloading.'; return; }
    try {
      const pdf = makePdf();
      const url = URL.createObjectURL(pdf);
      const a = node('a'); a.href = url;
      a.download = (responses.name.trim() + ' - ' + assignment.title).replace(/[\\/:*?"<>|]/g, '').slice(0, 130) + '.pdf';
      document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 60000);
      $('status').textContent = 'Downloaded! Attach the PDF in Google Classroom and select Turn in.';
    } catch { $('status').textContent = 'The PDF could not be created. Please try again.'; }
  }
  // Small self-contained PDF writer: text-only, with wrapped answers and automatic pages.
  function makePdf() {
    const map = { '‘': "'", '’': "'", '“': '"', '”': '"', '—': '-', '–': '-', '…': '...', '•': '*', '€': 'EUR', '™': '(TM)' };
    const normalized = s => String(s).replace(/[‘’“”—–…•€™]/g, c => map[c] || '').replace(/[^\x20-\x7e\xa0-\xff\n]/g, '?');
    const wrap = (text, width) => {
      const lines = [];
      normalized(text).split('\n').forEach(paragraph => {
        let line = '';
        paragraph.split(/\s+/).forEach(word => {
          if (!word) return;
          while (word.length > width) { if (line) { lines.push(line); line = ''; } lines.push(word.slice(0, width)); word = word.slice(width); }
          if ((line + ' ' + word).trim().length > width) { lines.push(line); line = word; } else line += (line ? ' ' : '') + word;
        }); lines.push(line);
      }); return lines;
    };
    const esc = s => normalized(s).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    const pages = [[]]; let y = 738;
    const line = (text, size = 11, bold = false, spacing = 17) => {
      if (y < 64) { pages.push([]); y = 738; }
      pages[pages.length - 1].push(`BT /F${bold ? 2 : 1} ${size} Tf 55 ${y} Td (${esc(text)}) Tj ET`);
      y -= spacing;
    };
    const block = (heading, body) => { if (y < 130) { pages.push([]); y = 738; } wrap(heading, 78).forEach(x => line(x, 11, true, 17)); y -= 3; wrap(body, 78).forEach(x => line(x, 11, false, 16)); y -= 18; };
    wrap(assignment.title, 45).forEach(x => line(x, 19, true, 25)); y -= 6;
    line('Student: ' + responses.name.trim(), 11, false, 20);
    line('Date: ' + new Date().toLocaleDateString(), 10, false, 29);
    block('1. ' + assignment.multipleChoice.question, assignment.multipleChoice.options[responses.choice]);
    assignment.shortAnswers.forEach((q, i) => block((i + 2) + '. ' + q, responses.short[i].trim()));
    const objects = [null, '<< /Type /Catalog /Pages 2 0 R >>', '', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'];
    const pageRefs = [];
    pages.forEach(commands => {
      const p = objects.length; const c = p + 1; pageRefs.push(p + ' 0 R');
      objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${c} 0 R >>`);
      const stream = commands.join('\n') + '\n'; objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}endstream`);
    });
    objects[2] = `<< /Type /Pages /Kids [${pageRefs.join(' ')}] /Count ${pages.length} >>`;
    let pdf = '%PDF-1.4\n'; const offsets = [0];
    for (let i = 1; i < objects.length; i++) { offsets[i] = pdf.length; pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`; }
    const start = pdf.length; pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
    for (let i = 1; i < objects.length; i++) pdf += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
    pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${start}\n%%EOF`;
    return new Blob([Uint8Array.from(pdf, c => c.charCodeAt(0))], { type: 'application/pdf' });
  }
  function readEditor() {
    const a = JSON.parse($('editor').value);
    if (!validAssignment(a)) throw new Error('Use three reading paragraphs, at least two multiple-choice options, and two short-answer questions.');
    return a;
  }
  function studentLink(a) { return location.origin + location.pathname + '#assignment=' + encodeURIComponent(JSON.stringify(a)); }
  function showBuilder() {
    $('assignmentView').hidden = true; $('builderView').hidden = false; $('teacherLink').hidden = true;
    $('editor').value = JSON.stringify(parseAssignment(), null, 2);
    document.title = 'Teacher Builder · Derby Music';
  }
  $('backButton').addEventListener('click', () => { if (step > 0) { step--; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); } });
  $('nextButton').addEventListener('click', goNext);
  $('themeButton').addEventListener('click', () => { themeIndex = (themeIndex + 1) % 5; setTheme(); });
  $('previewButton').addEventListener('click', () => {
    try { const a = readEditor(); location.href = studentLink(a); showAssignment(); window.scrollTo(0, 0); }
    catch (e) { $('builderStatus').textContent = e.message; }
  });
  $('copyButton').addEventListener('click', async () => {
    try { const link = studentLink(readEditor()); await navigator.clipboard.writeText(link); $('builderStatus').textContent = 'Student link copied. Paste it into Google Classroom.'; }
    catch (e) { $('builderStatus').textContent = e instanceof SyntaxError ? 'Check the JSON formatting and try again.' : (e.message || 'Could not copy. Try previewing the assignment and copying the address.'); }
  });
  window.addEventListener('hashchange', () => { if (!$('builderView').hidden) return; showAssignment(); });
  setTheme();
  if (new URLSearchParams(location.search).has('builder')) showBuilder(); else showAssignment();
})();
