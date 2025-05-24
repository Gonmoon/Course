document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('accessibility');

  const fontSizeSelector = document.getElementById('font-size');
  const colorSchemeSelector = document.getElementById('color-scheme');
  const disableImagesCheckbox = document.getElementById('disable-images');

  const originalBackgrounds = new WeakMap();

  fontSizeSelector.addEventListener('change', () => {
    const scaleValues = {
      normal: 1,
      large: 1.5,
      xlarge: 2
    };
    const scale = scaleValues[fontSizeSelector.value] || 1;
    document.documentElement.style.setProperty('--font-scale', scale);
  });

  colorSchemeSelector.addEventListener('change', () => {
    document.body.classList.remove(
      'scheme-white-black', 'scheme-green-black', 'scheme-black-white',
      'scheme-brown-beige', 'scheme-blue-darkblue'
    );
    document.body.classList.add('scheme-' + colorSchemeSelector.value);
  });

  disableImagesCheckbox.addEventListener('change', () => {
    const hideImages = disableImagesCheckbox.checked;

    document.querySelectorAll('img').forEach(img => {
      if (hideImages) {
        img.setAttribute('hidden', true);
        if (!img.nextElementSibling || !img.nextElementSibling.classList.contains('img-alt')) {
          const altText = img.alt || 'Image description unavailable';
          const desc = document.createElement('div');
          desc.classList.add('img-alt');
          desc.innerText = altText;
          img.after(desc);
        }
      } else {
        img.removeAttribute('hidden');
        if (img.nextElementSibling && img.nextElementSibling.classList.contains('img-alt')) {
          img.nextElementSibling.remove();
        }
      }
    });

    document.querySelectorAll('*').forEach(el => {
      const bg = getComputedStyle(el).backgroundImage;
      if (hideImages) {
        if (!originalBackgrounds.has(el)) {
          originalBackgrounds.set(el, el.style.backgroundImage);
        }
        el.style.backgroundImage = 'none';
      } else {
        if (originalBackgrounds.has(el)) {
          el.style.backgroundImage = originalBackgrounds.get(el);
          originalBackgrounds.delete(el);
        }
      }
    });
  });
});
