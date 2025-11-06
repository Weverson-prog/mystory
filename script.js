document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modalImg');
    const closeModal = document.getElementsByClassName('close')[0];
    const prevBtn = document.getElementsByClassName('prev')[0];
    const nextBtn = document.getElementsByClassName('next')[0];

    let currentAlbumImages = [];
    let currentImageIndex = 0;

    const kits = {
        "kit 1": ["Cópia de IMG_0014.jpg", "Cópia de IMG_0017.jpg", "Cópia de IMG_0020.jpg", "Cópia de IMG_0029.jpg", "Cópia de IMG_0031.jpg", "Cópia de IMG_0033.jpg", "Cópia de IMG_0048.jpg"],
        "kit 2": ["Cópia de IMG_0060.jpg", "Cópia de IMG_0062.jpg", "Cópia de IMG_0076.jpg", "Cópia de IMG_0078.jpg", "Cópia de IMG_0081.jpg", "Cópia de IMG_0097.jpg", "roupa (6).jpg"],
        "kit 3": ["Cópia de IMG_0099.jpg", "Cópia de IMG_0100.jpg", "Cópia de IMG_0108.jpg", "Cópia de IMG_0112.jpg", "roupa (3).jpg"],
        "kit 4": ["Cópia de IMG_0165.jpg", "Cópia de IMG_0166.jpg", "Cópia de IMG_0170.jpg", "Cópia de IMG_0173.jpg", "Cópia de IMG_0175.jpg", "Cópia de IMG_0179.jpg", "roupa (25).jpg"],
        "kit 5": ["Cópia de IMG_0189.jpg", "Cópia de IMG_0194.jpg", "Cópia de IMG_0197.jpg", "Cópia de IMG_0204.jpg", "Cópia de IMG_0214.jpg", "Cópia de IMG_0218.jpg", "Cópia de IMG_0221.jpg", "Cópia de IMG_0227.jpg", "Cópia de IMG_0235.jpg", "Cópia de IMG_0245.jpg", "Cópia de IMG_0248.jpg", "roupa (10).jpg"],
        "kit 6": ["Cópia de IMG_0249.jpg", "Cópia de IMG_0254.jpg", "Cópia de IMG_0257.jpg", "Cópia de IMG_0266.jpg", "Cópia de IMG_0269.jpg", "Cópia de IMG_0276.jpg", "roupa (18).jpg"],
        "kit 7": ["Cópia de IMG_0283.jpg", "Cópia de IMG_0285.jpg", "Cópia de IMG_0290.jpg", "Cópia de IMG_0293.jpg", "Cópia de IMG_0296.jpg", "Cópia de IMG_0299.jpg", "Cópia de IMG_0302.jpg"],
        "kit 8": ["Cópia de IMG_0305.jpg", "Cópia de IMG_0320.jpg", "Cópia de IMG_0324.jpg", "Cópia de IMG_0330.jpg", "Cópia de IMG_0332.jpg", "roupa (19).jpg"],
        "kit 9": ["Cópia de IMG_0335.jpg", "Cópia de IMG_0336.jpg", "Cópia de IMG_0342.jpg", "Cópia de IMG_0344.jpg", "Cópia de IMG_0359.jpg", "Cópia de IMG_0362.jpg", "roupa (27).jpg"],
        "kit 10": ["Cópia de IMG_0371.jpg", "Cópia de IMG_0373.jpg", "Cópia de IMG_0378.jpg", "Cópia de IMG_0387.jpg", "Cópia de IMG_0388.jpg", "Cópia de IMG_0394.jpg", "roupa (21).jpg", "roupa (8).jpg"],
        "kit 11": ["Cópia de IMG_9706.jpg", "Cópia de IMG_9709.jpg", "Cópia de IMG_9714.jpg", "Cópia de IMG_9718.jpg", "Cópia de IMG_9726.jpg", "roupa (9).jpg"],
        "kit 12": ["Cópia de IMG_9737.jpg", "Cópia de IMG_9741.jpg", "Cópia de IMG_9743.jpg", "Cópia de IMG_9751.jpg", "Cópia de IMG_9755.jpg", "Cópia de IMG_9756.jpg", "Cópia de IMG_9758.jpg", "roupa (17).jpg"],
        "kit 13": ["Cópia de IMG_9761.jpg", "Cópia de IMG_9779.jpg", "Cópia de IMG_9782.jpg", "Cópia de IMG_9794.jpg", "Cópia de IMG_9798.jpg", "Cópia de IMG_9805.jpg", "roupa (4).jpg"],
        "kit 14": ["Cópia de IMG_9809.jpg", "Cópia de IMG_9813.jpg", "Cópia de IMG_9824.jpg", "Cópia de IMG_9830.jpg", "roupa.jpg"],
        "kit 16": ["roupa (22).jpg"],
        "kit 17": ["roupa (29).jpg"],
        "kit 18": ["roupa (13).jpg"],
        "kit 19": ["IMG_6771.JPG", "IMG_6774.JPG", "IMG_6777.JPG", "IMG_6780(1).JPG", "IMG_6780.JPG", "IMG_6782.jpeg", "IMG_6784.JPG", "IMG_6788.JPG", "roupa (12).jpg"],
        "kit 20": ["IMG_6979.JPG", "IMG_6980.JPG", "IMG_6983.JPG", "IMG_6986.JPG", "IMG_6988.JPG", "IMG_6990.JPG", "IMG_6994.JPG", "IMG_6997.JPG", "roupa (15).jpg"],
        "kit 21": ["IMG_7005.JPG", "IMG_7007.JPG", "IMG_7011.JPG", "IMG_7018.JPG", "IMG_7027.JPG", "roupa (1).jpg", "roupa (7).jpg"],
        "kit 22": ["IMG_7032.JPG", "IMG_7035.JPG", "IMG_7038.JPG", "IMG_7040.JPG", "IMG_7043.JPG", "IMG_7045.jpeg", "IMG_7048.JPG", "roupa (20).jpg"],
        "kit 23": ["IMG_7053.JPG", "IMG_7060.JPG", "IMG_7069.JPG", "IMG_7079.JPG", "IMG_7084.JPG", "roupa (14).jpg"],
        "kit 24": ["IMG_7093.JPG", "IMG_7095.JPG", "IMG_7099.JPG", "IMG_7103.JPG", "IMG_7113.JPG", "roupa (24).jpg"],
        "kit 25": ["IMG_7118.JPG", "IMG_7120.JPG", "IMG_7122.JPG", "IMG_7123.JPG", "IMG_7124.JPG", "IMG_7127.JPG", "IMG_7129.JPG", "IMG_7130.JPG", "Roupa (23).jpg", "roupa (16).jpg"],
        "kit 26": ["IMG_7136.JPG", "IMG_7139.JPG", "IMG_7141.JPG", "IMG_7143.JPG", "IMG_7145.JPG", "IMG_7152.JPG", "IMG_7155.JPG", "roupa (28).jpg"]
    };

    // Configuração do banner para desktop e mobile
    const BANNER_DESKTOP = 'assets/images/banner.png';
    const BANNER_MOBILE = 'assets/images/bannerM.JPG';
    // (remoção do bloco anterior: o carregamento do banner está mais abaixo, integrado ao fluxo)

    // Extrai ID do Google Drive de vários formatos
    function extractDriveId(input) {
        if (!input) return '';
        if (typeof input === 'string') {
            if (/^[a-zA-Z0-9_-]{20,}$/.test(input)) {
                return input;
            }
            const fileMatch = input.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
            const openMatch = !fileMatch && input.match(/[?&]id=([a-zA-Z0-9_-]+)/);
            return fileMatch ? fileMatch[1] : (openMatch ? openMatch[1] : '');
        }
        return '';
    }

    // Converte links/IDs do Drive em URL direta de imagem utilizando endpoint de thumbnail
    function toDirectDriveUrl(input, size = 3840) {
        const id = extractDriveId(input);
        if (!id) return input;
        return `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`;
    }

    // URL de visualização do arquivo original (melhor qualidade, preserva PNG)
    function toDriveOriginalViewUrl(input) {
        const id = extractDriveId(input);
        if (!id) return input;
        return `https://drive.google.com/uc?export=view&id=${id}`;
    }

    // Resolve o caminho/URL da imagem: aceita nome local, URL completa, ID do Drive ou objeto { driveId }
    function resolveSrc(kitName, item) {
        if (!item) return '';
        // Objeto com driveId
        if (typeof item === 'object' && item.driveId) {
            return toDirectDriveUrl(item.driveId);
        }
        // String: URL completa
        if (typeof item === 'string' && item.startsWith('http')) {
            return toDirectDriveUrl(item);
        }
        // String: ID puro do Drive
        if (typeof item === 'string' && /^[a-zA-Z0-9_-]{20,}$/.test(item)) {
            return toDirectDriveUrl(item);
        }
        // Caso padrão: arquivo local na pasta looks
        return `assets/images/looks/${kitName}/${item}`;
    }

    // Carrega o banner com fallback e respeita <picture> responsivo no HTML
    const bannerImgEl = document.getElementById('banner-img');
    const hasPictureSource = !!document.querySelector('.site-banner picture source');
    if (bannerImgEl) {
        bannerImgEl.onerror = () => {
            console.warn('Banner local não carregou — aplicando fallback.');
            bannerImgEl.src = 'assets/images/looks/kit 1/Cópia de IMG_0014.jpg';
        };
    }
    // Se não houver <picture>, faz o swap via JS
    if (bannerImgEl && !hasPictureSource) {
        const setBannerSrc = () => {
            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            bannerImgEl.src = isMobile ? BANNER_MOBILE : BANNER_DESKTOP;
        };
        setBannerSrc();
        window.addEventListener('resize', setBannerSrc);
    }

    // Ajusta dinamicamente a altura da navbar como variável CSS
    const headerEl = document.querySelector('header');
    // Toggle do menu mobile (três pontinhos no canto direito)
    const mobileToggleBtn = document.querySelector('.mobile-menu-toggle');
    if (mobileToggleBtn && headerEl) {
        const updateToggleAria = () => {
            const expanded = headerEl.classList.contains('menu-open');
            mobileToggleBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        };
        mobileToggleBtn.addEventListener('click', () => {
            headerEl.classList.toggle('menu-open');
            updateToggleAria();
        });
        // Fecha ao clicar fora
        document.addEventListener('click', (e) => {
            const isInsideHeader = headerEl.contains(e.target) || mobileToggleBtn.contains(e.target);
            if (!isInsideHeader && headerEl.classList.contains('menu-open')) {
                headerEl.classList.remove('menu-open');
                updateToggleAria();
            }
        });
        // Fecha ao sair do breakpoint mobile
        window.addEventListener('resize', () => {
            if (!window.matchMedia('(max-width: 768px)').matches) {
                headerEl.classList.remove('menu-open');
                updateToggleAria();
            }
        });
        // Fecha com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                headerEl.classList.remove('menu-open');
                updateToggleAria();
            }
        });
    }
    function updateNavbarHeightVar() {
        const h = headerEl ? headerEl.offsetHeight : 0;
        document.documentElement.style.setProperty('--navbar-height', `${h}px`);
    }
    // Atualiza na carga e ao redimensionar
    updateNavbarHeightVar();
    window.addEventListener('resize', updateNavbarHeightVar);
    // Atualiza após imagens/fontes carregarem
    window.addEventListener('load', updateNavbarHeightVar);

    // Opacidade fluida da navbar baseada no scroll
    function updateNavOpacity() {
        const min = 0.45; // topo mais translúcido
        const max = 0.9;  // rolado mais opaco
        const range = max - min;
        const y = window.scrollY;
        const norm = Math.min(1, y / 240); // 0 a 240px de scroll
        const alpha = (min + range * norm).toFixed(3);
        document.documentElement.style.setProperty('--nav-opacity', alpha);
        if (headerEl) {
            if (norm > 0.1) headerEl.classList.add('scrolled');
            else headerEl.classList.remove('scrolled');
        }
    }
    updateNavOpacity();
    window.addEventListener('scroll', updateNavOpacity);

    Object.keys(kits).forEach(kitName => {
        const images = kits[kitName];
        if (images.length > 0) {
            const albumItem = document.createElement('div');
            albumItem.className = 'album-item';
            albumItem.dataset.kit = kitName;

            const img = document.createElement('img');
            img.src = resolveSrc(kitName, images[0]);
            img.alt = kitName;
            albumItem.appendChild(img);

            albumItem.addEventListener('click', () => {
                currentAlbumImages = images.map(image => resolveSrc(kitName, image));
                currentImageIndex = 0;
                openModal(currentAlbumImages[currentImageIndex]);
            });

            galleryGrid.appendChild(albumItem);
        }
    });

    function openModal(imageSrc) {
        modal.style.display = 'block';
        modalImg.src = imageSrc;
    }

    function closeModalFunction() {
        modal.style.display = 'none';
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentAlbumImages.length;
        modalImg.src = currentAlbumImages[currentImageIndex];
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentAlbumImages.length) % currentAlbumImages.length;
        modalImg.src = currentAlbumImages[currentImageIndex];
    }

    closeModal.onclick = closeModalFunction;
    prevBtn.onclick = showPrevImage;
    nextBtn.onclick = showNextImage;

    window.onclick = function(event) {
        if (event.target == modal) {
            closeModalFunction();
        }
    }
});