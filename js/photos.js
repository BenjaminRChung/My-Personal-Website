/**
 * Gallery entries in /data/photos.json:
 * { "src", "alt", "category", "place", "focus"? }
 */
const FILTER_ALL = 'All';

function normalizeItem(raw) {
    if (!raw || typeof raw.src !== 'string' || !raw.src) {
        return null;
    }
    const category = typeof raw.category === 'string' ? raw.category.trim() : '';
    const place = typeof raw.place === 'string' ? raw.place.trim() : '';
    if (!category || !place) {
        return null;
    }
    return {
        src: raw.src,
        alt: typeof raw.alt === 'string' ? raw.alt : '',
        category,
        place,
        focus: typeof raw.focus === 'string' && raw.focus ? raw.focus.trim() : null,
    };
}

function uniqueCategories(items) {
    const set = new Set();
    for (const item of items) {
        set.add(item.category);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function itemMatchesFilter(item, filter) {
    return filter === FILTER_ALL || item.category === filter;
}

function initPhotoGallery() {
    const filtersEl = document.getElementById('photo-filters');
    const grid = document.getElementById('photo-grid');
    const dialog = document.getElementById('photo-lightbox');
    if (!filtersEl || !grid || !dialog) {
        return;
    }

    const imgEl = dialog.querySelector('.photo-lightbox__img');
    const captionEl = document.getElementById('photo-lightbox-caption');
    const closeBtn = dialog.querySelector('.photo-lightbox__close');
    if (!imgEl || !captionEl || !closeBtn) {
        return;
    }

    let activeFilter = FILTER_ALL;
    let lastFocus = null;

    function closeLightbox() {
        if (dialog.open) {
            dialog.close();
        }
    }

    function openLightbox(item, opener) {
        lastFocus = opener || document.activeElement;
        imgEl.src = item.src;
        imgEl.alt = item.alt || item.place;
        captionEl.textContent = item.place;
        if (item.focus) {
            imgEl.style.objectPosition = item.focus;
        } else {
            imgEl.style.removeProperty('object-position');
        }
        dialog.showModal();
        closeBtn.focus();
    }

    closeBtn.addEventListener('click', () => closeLightbox());
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            closeLightbox();
        }
    });
    dialog.addEventListener('close', () => {
        imgEl.removeAttribute('src');
        imgEl.alt = '';
        captionEl.textContent = '';
        if (lastFocus && typeof lastFocus.focus === 'function') {
            lastFocus.focus();
        }
        lastFocus = null;
    });

    function applyFilter() {
        const tiles = grid.querySelectorAll('.photo-tile');
        tiles.forEach((tile) => {
            const cat = tile.getAttribute('data-category') || '';
            const show = activeFilter === FILTER_ALL || cat === activeFilter;
            tile.hidden = !show;
        });

        const buttons = filtersEl.querySelectorAll('.photo-filters__btn');
        buttons.forEach((btn) => {
            const f = btn.getAttribute('data-filter') || FILTER_ALL;
            const pressed = f === activeFilter;
            btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
        });
    }

    function setFilter(filter) {
        activeFilter = filter;
        applyFilter();
    }

    function renderFilters(categories) {
        filtersEl.replaceChildren();
        const labels = [FILTER_ALL, ...categories];
        for (const label of labels) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'photo-filters__btn';
            btn.setAttribute('data-filter', label);
            btn.textContent = label;
            btn.setAttribute('aria-pressed', label === activeFilter ? 'true' : 'false');
            btn.addEventListener('click', () => setFilter(label));
            filtersEl.appendChild(btn);
        }
    }

    function renderGrid(list) {
        grid.replaceChildren();
        const fragment = document.createDocumentFragment();
        for (const item of list) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'photo-tile';
            btn.setAttribute('data-category', item.category);
            btn.setAttribute(
                'aria-label',
                `Open larger view: ${item.place}${item.alt ? ` — ${item.alt}` : ''}`,
            );

            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt;
            img.loading = 'lazy';
            img.decoding = 'async';
            if (item.focus) {
                img.style.setProperty('--focus', item.focus);
            }

            const place = document.createElement('span');
            place.className = 'photo-tile__place';
            place.textContent = item.place;

            btn.appendChild(img);
            btn.appendChild(place);
            btn.addEventListener('click', () => openLightbox(item, btn));
            fragment.appendChild(btn);
        }
        grid.appendChild(fragment);
    }

    async function load() {
        let raw;
        try {
            const res = await fetch('/data/photos.json', { cache: 'no-store' });
            if (!res.ok) {
                throw new Error(String(res.status));
            }
            raw = await res.json();
        } catch {
            filtersEl.hidden = true;
            const p = document.createElement('p');
            p.className = 'light';
            p.textContent = 'Could not load the photo list.';
            grid.replaceWith(p);
            return;
        }

        if (!Array.isArray(raw)) {
            return;
        }

        const items = raw.map(normalizeItem).filter(Boolean);
        if (items.length === 0) {
            const p = document.createElement('p');
            p.className = 'light';
            p.textContent = 'No photos yet.';
            grid.replaceWith(p);
            filtersEl.hidden = true;
            return;
        }

        const categories = uniqueCategories(items);
        renderFilters(categories);
        renderGrid(items);
        applyFilter();
    }

    load();
}

document.addEventListener('DOMContentLoaded', initPhotoGallery);
