document.addEventListener('DOMContentLoaded', () => {
    const illustrationListContainer = document.getElementById('illustration-list');
    let illustrations = [];

    // Fetch the illustration data
    fetch('http://localhost:5000/api/illustrations')  // Adjusted path to match the correct location
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(illustrationsData => {
            console.log('Illustrations data loaded:', illustrationsData);
            illustrations = illustrationsData;
            renderIllustrationList();
        })
        .catch(error => {
            console.error('Error loading Illustration data:', error);
            alert('Failed to load Illustration data. Please try again later.');
        });

        function renderIllustrationList() {
            illustrationListContainer.innerHTML = '';
            illustrations.forEach(illustration => {
                const id = illustration._id;
                let imageUrl = illustration.image || 'placeholder-image-url';
    
                // Check if the image URL is a relative path and prepend the backend URL
                if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
                    imageUrl = `http://localhost:5000/${imageUrl}`;
                }
    
                const card = document.createElement('div');
                card.classList.add('card');
                card.dataset.id = id;
                card.innerHTML = `
                    <div class="card-image" style="background-image: url('${imageUrl}');">
                        <img src="${imageUrl}" alt="${illustration.name}" style="display: none;" onerror="this.onerror=null; this.parentNode.style.backgroundImage='url(placeholder-image-url)';">
                    </div>
                    <div class="card-content">
                        <h1>${illustration.name}</h1>
                    </div>
                `;
                card.addEventListener('click', () => showIllustrationDetail(illustration._id));
                illustrationListContainer.appendChild(card);
            });
        }
    
        const showIllustrationDetail = (illustrationId) => {
            const illustration = illustrations.find(i => i._id === illustrationId);
            if (illustration) {
                console.log('Showing illustration detail for:', illustration);
                localStorage.setItem('currentIllustration', JSON.stringify(illustration));
                window.location.href = `illustration-detail.html?id=${illustration._id}`;
            } else {
                console.error(`Illustration not found for id: ${illustrationId}`);
            }
        };
    // The addDatatoHTML function is kept here in case you use it elsewhere.
    const addDatatoHTML = () => {
        listIllustrationHTML.innerHTML = '';
        if (illustrations.length > 0) {
            illustrations.forEach(illustration => {
                let newIllustration = document.createElement('div');
                newIllustration.classList.add('item');
                newIllustration.dataset.id = illustration._id || illustration.id;
                newIllustration.innerHTML = `
                    <img src="${illustration.image}" alt="${illustration.name}">
                    <h2>${illustration.name}</h2>
                    <p>${illustration.description}</p>
                `;
                newIllustration.addEventListener('click', () => {
                    showIllustrationDetail(illustration._id || illustration.id);
                });
                listIllustrationHTML.appendChild(newIllustration);
            });
        }
    };
});
