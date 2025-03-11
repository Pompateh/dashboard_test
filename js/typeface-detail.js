document.addEventListener('DOMContentLoaded', () => {
    const typefaceDetailContainer = document.getElementById('typeface-detail');
    let currentTypeface;
    let typefaces = [];
    // Keep track of the current carousel page (each page shows 2 images)
    let carouselIndex = 0;
    const pageSize = 2; // number of images per carousel page

    // Add cache busting parameter to force fresh data from the API.
    const fetchTypefaces = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/typefaces?timestamp=' + new Date().getTime(), { cache: 'no-cache' });
            typefaces = await response.json();
            initializeTypeface();
        } catch (error) {
            console.error('Error fetching typefaces:', error);
        }
    };

    const initializeTypeface = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const typefaceId = urlParams.get('id');
        // Use _id property to match the fetched data.
        currentTypeface = typefaces.find(typeface => typeface._id === typefaceId) || typefaces[0];
        carouselIndex = 0; // reset carousel index when initializing
        renderTypefaceDetail();
    };

    const renderTypefaceDetail = () => {
        if (currentTypeface) {
            // Build an array of available image fields.
            const images = [];
            if (currentTypeface.image1) images.push(currentTypeface.image1);
            if (currentTypeface.image2) images.push(currentTypeface.image2);
            if (currentTypeface.image3) images.push(currentTypeface.image3);
            if (currentTypeface.image4) images.push(currentTypeface.image4);
            if (currentTypeface.image5) images.push(currentTypeface.image5);
            const totalPages = Math.ceil(images.length / pageSize);

            // Function to build the image carousel HTML for the current page.
            const buildCarouselHTML = () => {
                const start = carouselIndex * pageSize;
                const currentImages = images.slice(start, start + pageSize)
                    .map(img => {
                        const src = img.startsWith('http') ? img : 'http://localhost:5000/' + img;
                        return `<img src="${src}" alt="${currentTypeface.name} Detail" style="max-width:48%; margin-right:2%;">`;
                    })
                    .join('');
                return `
                    <div class="img-container">
                        ${currentImages}
                    </div>
                    ${ totalPages > 1 ? `<button class="carousel-arrow next-arrow" style="font-size:24px; background:none; border:none; color:white; cursor:pointer;">&#8250;</button>` : '' }
                `;
            };

            typefaceDetailContainer.innerHTML = `
                <div class="detail_head">
                    <div class="detail_back"><a href="typeface.html" id="prevTypeface">Back</a></div>
                    <div class="typeface_name">${currentTypeface.name}</div>
                    <div class="detail_next"><a href="#" id="nextTypeface">Next</a></div>
                </div>
                <div class="detail_content">
                    <div class="detail_left">
                        <h2>DETAIL</h2>
                        <div class="detail_character">
                            <div class="metric_diagram_container">
                                <svg width="100%" height="auto" viewBox="0 0 670 382" preserveAspectRatio="xMinYMin meet" id="metricSvg">
                                    <!-- Cap Height -->
                                    <line x1="0" y1="50" x2="670" y2="50" stroke="white" stroke-width="1" data-metric-line="capHeight"/>
                                    <text x="10" y="45" font-family="Literata" font-style="normal" font-weight="400" font-size="16" fill="white" data-metric="capHeight">Cap Height</text>
                                    <text x="660" y="45" font-family="Literata" font-style="normal" font-weight="400" font-size="16" fill="white" text-anchor="end" data-metric-value="capHeight">716</text>
                                    <!-- X-Height -->
                                    <line x1="0" y1="150" x2="670" y2="150" stroke="white" stroke-width="1" data-metric-line="xHeight"/>
                                    <text x="10" y="145" font-family="Literata" font-style="normal" font-weight="400" font-size="16" fill="white" data-metric="xHeight">X Height</text>
                                    <text x="660" y="145" font-family="Literata" font-style="normal" font-weight="400" font-size="16" fill="white" text-anchor="end" data-metric-value="xHeight">484</text>
                                    <!-- Base Line -->
                                    <line x1="0" y1="300" x2="670" y2="300" stroke="white" stroke-width="1" data-metric-line="baseLine"/>
                                    <text x="10" y="295" font-family="Literata" font-style="normal" font-weight="400" font-size="16" fill="white" data-metric="baseLine">Base Line</text>
                                    <text x="660" y="295" font-family="Literata" font-style="normal" font-weight="400" font-size="16" fill="white" text-anchor="end" data-metric-value="baseLine">0</text>
                                    <!-- Descender -->
                                    <line x1="0" y1="350" x2="670" y2="350" stroke="white" stroke-width="1" data-metric-line="descender"/>
                                    <text x="10" y="345" font-family="Literata" font-style="normal" font-weight="400" font-size="16" fill="white" data-metric="descender">Descender</text>
                                    <text x="660" y="345" font-family="Literata" font-style="normal" font-weight="400" font-size="16" fill="white" text-anchor="end" data-metric-value="descender">-211</text>
                                    <!-- Sample character -->
                                    <text x="335" y="300" font-size="250" text-anchor="middle" fill="white" class="imported-font" id="sampleChar">P</text>
                                </svg>
                            </div>
                            <div class="character-input-container">
                                <div class="search-label">SEARCH</div>
                                <div class="input-wrapper">
                                    <div id="characterInput" contenteditable="true" class="imported-font">P</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="detail_right">
                        <h2>GLYPHS</h2>
                        <div class="glyphs_content imported-font">
                            <div class="alphabet">
                                ${['Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh', 'Ii', 'Jj', 'Kk', 'Ll', 'Mm', 'Nn', 'Oo', 'Pp', 'Qq', 'Rr', 'Ss', 'Tt', 'Uu', 'Vv', 'Ww', 'Xx', 'Yy', 'Zz'].map(char => `<span>${char}</span>`).join(' ')}
                            </div>
                            <div class="numbers">
                                ${['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => `<span>${num}</span>`).join(' ')}
                            </div>
                            <div class="symbols">
                                ${['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', '[', ']', '_', '+', '=', '|', '\\', ':', '"', "'", '<', '>', ',', '.', '/', '?'].map(sym => `<span>${sym}</span>`).join(' ')}
                            </div>
                        </div>
                        <div class="preview_section">
                            <h2>PREVIEW</h2>
                            <div id="previewText" class="imported-font">
                                The quick brown fox jumps over the lazy dog.
                            </div>
                            <div class="preview_controls">
                                <button id="uppercaseBtn">Uppercase</button>
                                <button id="titlecaseBtn">Title case</button>
                                <button id="lowercaseBtn">Lowercase</button>
                            </div>
                        </div>
                    </div>
                </div>
                <style id="dynamicFontStyle"></style>
                <div class="typeface_info">
                    <p>Design By: ${currentTypeface.designer}</p>
                    <p>Public On: ${currentTypeface.publicOn}</p>
                    <p>Version: ${currentTypeface.version}</p>
                    <p>Update: ${currentTypeface.updateDate}</p>
                </div>
                <div class="typeface_story">
                    <h3>Story</h3>
                    <p>${currentTypeface.story ? currentTypeface.story : 'No story available for this typeface.'}</p>
                </div>
                <div class="detail_img_grid">
                    <div class="img-carousel">
                        ${ images.length > 0 ? `
                            ${buildCarouselHTML()}
                        ` : 'No images available' }
                    </div>
                </div>
                <div class="typeface_features">
                    <h3>Features:</h3>
                    <p>${currentTypeface.features || 'Glyph set: 394 / Uppercase & lowercase / Alternates / Numbers & fractions / Punctuation / Diacritics / Symbols & arrows / Currency Symbols / Ligatures / En & Vi / Variable'}</p>
                </div>
                <div class="detail_end">
                    <a href="#" id="prevTypefaceBottom">Back</a>
                    <a href="Typeface.html">All Typefaces</a>
                    <a href="#" id="nextTypefaceBottom">Next</a>
                </div>
            `;

            // Navigation buttons for next/prev typeface
            document.getElementById('nextTypeface').addEventListener('click', navigateToNext);
            document.getElementById('nextTypefaceBottom').addEventListener('click', navigateToNext);
            document.getElementById('prevTypeface').addEventListener('click', navigateToPrev);
            document.getElementById('prevTypefaceBottom').addEventListener('click', navigateToPrev);

            // Set up carousel arrow if it exists
            const carouselArrow = document.querySelector('.carousel-arrow.next-arrow');
            if (carouselArrow) {
                carouselArrow.addEventListener('click', () => {
                    carouselIndex = (carouselIndex + 1) % totalPages;
                    const imgContainer = document.querySelector('.img-container');
                    if (imgContainer) {
                        imgContainer.innerHTML = images.slice(carouselIndex * pageSize, carouselIndex * pageSize + pageSize)
                            .map(img => {
                                const src = img.startsWith('http') ? img : 'http://localhost:5000/' + img;
                                return `<img src="${src}" alt="${currentTypeface.name} Detail" style="max-width:48%; margin-right:2%;">`;
                            }).join('');
                    }
                });
            }}};

    const navigateToNext = (e) => {
        e.preventDefault();
        const currentIndex = typefaces.findIndex(typeface => typeface._id === currentTypeface._id);
        const nextIndex = (currentIndex + 1) % typefaces.length;
        currentTypeface = typefaces[nextIndex];
        updateURL();
        renderTypefaceDetail();
    };

    const navigateToPrev = (e) => {
        e.preventDefault();
        const currentIndex = typefaces.findIndex(typeface => typeface._id === currentTypeface._id);
        const prevIndex = (currentIndex - 1 + typefaces.length) % typefaces.length;
        currentTypeface = typefaces[prevIndex];
        updateURL();
        renderTypefaceDetail();
    };

    const updateURL = () => {
        const newUrl = `${window.location.pathname}?id=${currentTypeface._id}`;
        history.pushState(null, '', newUrl);
    };

    fetchTypefaces();
});
