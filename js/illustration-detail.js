document.addEventListener('DOMContentLoaded', () => {
    const illustrationDetailContainer = document.getElementById('illustration-detail');
    let currentIllustration;
    let illustrations = [];

    const fetchIllustrations = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/illustrations');
            illustrations = await response.json();
            initializeIllustration();
        } catch (error) {
            console.error('Error fetching illustrations:', error);
        }
    };

    const initializeIllustration = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const illustrationId = urlParams.get('id');
        currentIllustration = illustrations.find(ill => ill._id === illustrationId) || illustrations[0];
        renderIllustrationDetail();
    };

    const renderIllustrationDetail = () => {
        if (currentIllustration) {
            const baseUrl = 'http://localhost:5000/'; // Adjust this if your backend URL is different
            console.log('Current Illustration:', currentIllustration); // Log the current illustration object
    
            illustrationDetailContainer.innerHTML = `
                <div class="detail_head">
                    <div class="detail_back"><a href="Illustration.html" id="prevIllustration">Back</a></div>
                    <div class="illustration_name">${currentIllustration.name}</div>
                    <div class="detail_next"><a href="#" id="nextIllustration">Next</a></div>
                </div>
                <div class="detail_content">
                    <div class="detail_main_img">
                        <img src="${baseUrl}${currentIllustration.image}" alt="${currentIllustration.name}" onerror="this.onerror=null; this.src='path/to/placeholder.jpg'; console.error('Failed to load image:', this.src);">
                    </div>
                    <div class="story">
                        <h2>Story</h2>
                        <p>${currentIllustration.story || 'No story available for this illustration.'}</p>
                    </div>
                    <div class="detail_img_grid">
                        <img src="${baseUrl}${currentIllustration.image1}" alt="${currentIllustration.name} Detail 1" onerror="this.onerror=null; this.src='path/to/placeholder.jpg'; console.error('Failed to load gridImage1:', this.src);">
                        <img src="${baseUrl}${currentIllustration.image2}" alt="${currentIllustration.name} Detail 2" onerror="this.onerror=null; this.src='path/to/placeholder.jpg'; console.error('Failed to load gridImage2:', this.src);">
                    </div>
                    <div class="detail_bottom_img">
                        <img src="${baseUrl}${currentIllustration.image3}" alt="${currentIllustration.name} Detail 3" onerror="this.onerror=null; this.src='path/to/placeholder.jpg'; console.error('Failed to load gridImage3:', this.src);">
                    </div>
                </div> 
                <div class="detail_end">
                    <a href="#" id="prevIllustrationBottom">Back</a>
                    <a href="Illustration.html">All Illustrations</a>
                    <a href="#" id="nextIllustrationBottom">Next</a>
                </div>
            `;

            document.getElementById('nextIllustration').addEventListener('click', navigateToNext);
            document.getElementById('nextIllustrationBottom').addEventListener('click', navigateToNext);
            document.getElementById('prevIllustration').addEventListener('click', navigateToPrev);
            document.getElementById('prevIllustrationBottom').addEventListener('click', navigateToPrev);
        } else {
            illustrationDetailContainer.innerHTML = '<p>Illustration not found.</p>';
        }
    };

    const navigateToNext = (e) => {
        e.preventDefault();
        const currentIndex = illustrations.findIndex(ill => ill._id === currentIllustration._id);
        const nextIndex = (currentIndex + 1) % illustrations.length;
        currentIllustration = illustrations[nextIndex];
        updateURL();
        renderIllustrationDetail();
    };

    const navigateToPrev = (e) => {
        e.preventDefault();
        const currentIndex = illustrations.findIndex(ill => ill._id === currentIllustration._id);
        const prevIndex = (currentIndex - 1 + illustrations.length) % illustrations.length;
        currentIllustration = illustrations[prevIndex];
        updateURL();
        renderIllustrationDetail();
    };

    const updateURL = () => {
        const newUrl = `${window.location.pathname}?id=${currentIllustration._id}`;
        history.pushState(null, '', newUrl);
    };

    fetchIllustrations();
});