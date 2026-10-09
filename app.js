const translatedContent = [...document.querySelectorAll('[data-zh]')].map((element) => ({
  element, english: element.innerHTML, chinese: element.dataset.zh,
}));
const translatedAttributes = [
  ['[data-zh-label]', 'aria-label', 'zhLabel'],
  ['[data-zh-alt]', 'alt', 'zhAlt'],
  ['[data-zh-title]', 'data-title', 'zhTitle'],
  ['[data-zh-tooltip]', 'title', 'zhTooltip'],
].flatMap(([selector, attribute, key]) => [...document.querySelectorAll(selector)].map((element) => ({
  element, attribute, english: element.getAttribute(attribute), chinese: element.dataset[key],
})));
let language = 'en';
const languageButtons = [...document.querySelectorAll('[data-language]')];
const uiText = (english, chinese) => language === 'zh' ? chinese : english;

function setLanguage(nextLanguage, remember = false) {
  const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom;
  const anchor = remember ? [...document.querySelectorAll('main [data-zh]')].find((element) => {
    const rect = element.getBoundingClientRect();
    return rect.height > 0 && rect.top >= headerBottom && rect.top < window.innerHeight;
  }) : null;
  const previousTop = anchor?.getBoundingClientRect().top;
  language = nextLanguage === 'zh' ? 'zh' : 'en';
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  for (const { element, english, chinese } of translatedContent) {
    if (language === 'zh') element.textContent = chinese;
    else element.innerHTML = english;
  }
  for (const { element, attribute, english, chinese } of translatedAttributes) {
    element.setAttribute(attribute, language === 'zh' ? chinese : english);
  }
  languageButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
  document.querySelector('.copy-status').textContent = '';
  if (dialog.open && figureTrigger) {
    dialogTitle.textContent = figureTrigger.dataset.title;
    dialogImage.alt = figureTrigger.closest('figure').querySelector('img').alt;
  }
  zoomButton.textContent = imageArea.classList.contains('is-zoomed')
    ? uiText('Fit to window', '适应窗口') : uiText('Actual size', '原始尺寸');
  if (remember) {
    try { localStorage.setItem('weft-language', language); } catch { /* Storage is optional. */ }
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    history.replaceState(null, '', url);
    if (anchor) window.scrollBy({ top: anchor.getBoundingClientRect().top - previousTop, behavior: 'instant' });
  }
}

const dialog = document.querySelector('#figure-dialog');
const dialogImage = document.querySelector('#dialog-image');
const dialogTitle = document.querySelector('#dialog-title');
const imageArea = document.querySelector('.dialog-image-area');
const zoomButton = document.querySelector('#figure-zoom');
let figureTrigger = null;

function resetZoom() {
  imageArea.classList.remove('is-zoomed');
  zoomButton.textContent = uiText('Actual size', '原始尺寸');
  zoomButton.setAttribute('aria-pressed', 'false');
  imageArea.scrollTo(0, 0);
}

document.querySelectorAll('[data-figure]').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    if (!dialog || typeof dialog.showModal !== 'function') return;
    event.preventDefault();
    figureTrigger = trigger;
    dialogTitle.textContent = trigger.dataset.title;
    dialogImage.src = trigger.dataset.figure;
    dialogImage.alt = trigger.closest('figure').querySelector('img').alt;
    resetZoom();
    dialog.showModal();
    document.body.classList.add('dialog-open');
    document.querySelector('#figure-close').focus();
  });
});

zoomButton.addEventListener('click', () => {
  const zoomed = imageArea.classList.toggle('is-zoomed');
  zoomButton.textContent = zoomed ? uiText('Fit to window', '适应窗口') : uiText('Actual size', '原始尺寸');
  zoomButton.setAttribute('aria-pressed', String(zoomed));
  imageArea.scrollTo(0, 0);
});
document.querySelector('#figure-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  resetZoom();
  figureTrigger?.focus({ preventScroll: true });
});

const navLinks = [...document.querySelectorAll('.site-header nav a[href^="#"]')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navLinks.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('#home, #overview, #construction, #evolution, #training, #results, #citation').forEach((section) => observer.observe(section));
}

const stageTabs = [...document.querySelectorAll('.stage-tab')];
function selectStage(tab, focus = false) {
  stageTabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
  if (focus) tab.focus();
}
stageTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectStage(tab));
  tab.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % stageTabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + stageTabs.length) % stageTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = stageTabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectStage(stageTabs[next], true);
    }
  });
});

document.querySelector('#copy-citation')?.addEventListener('click', async () => {
  const text = document.querySelector('#citation-text').textContent;
  const status = document.querySelector('.copy-status');
  try {
    await navigator.clipboard.writeText(text);
    status.textContent = uiText('Citation copied.', '引用已复制。');
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('#citation-text'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = uiText('Select and copy the highlighted citation.', '请复制已选中的引用文本。');
  }
});

languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language, true)));
let initialLanguage = new URLSearchParams(window.location.search).get('lang');
if (initialLanguage !== 'en' && initialLanguage !== 'zh') {
  try { initialLanguage = localStorage.getItem('weft-language'); } catch { initialLanguage = 'en'; }
}
setLanguage(initialLanguage);
