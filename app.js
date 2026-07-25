const toggle = document.querySelector('[data-simple-toggle]');

function setSimpleMode(enabled) {
  document.body.classList.toggle('simple-view', enabled);
  toggle.setAttribute('aria-pressed', String(enabled));
  toggle.textContent = enabled ? '完整模式' : '简历模式';
  if (enabled) {
    document.querySelector('#resume')?.scrollIntoView({ block: 'start' });
  }
}

toggle?.addEventListener('click', () => {
  setSimpleMode(!document.body.classList.contains('simple-view'));
});

/* ---------- Image lightbox (offline, no dependency) ---------- */
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.hidden = true;
lightbox.setAttribute('role', 'dialog');
lightbox.setAttribute('aria-label', '图片放大预览，点击任意处关闭');
const lightboxImg = document.createElement('img');
lightbox.appendChild(lightboxImg);
document.body.appendChild(lightbox);

function openLightbox(img) {
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || '放大预览';
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.removeAttribute('src');
  document.body.style.overflow = '';
}

document.querySelectorAll('.zoomable img').forEach((img) => {
  img.addEventListener('click', () => openLightbox(img));
});

lightbox.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
});
