document.addEventListener('DOMContentLoaded', () => {
    const typefaceListContainer = document.getElementById('typeface-list');
    let typefaces = [];

    // Fetch the typeface data from your new API endpoint
    fetch('http://localhost:5000/api/typefaces')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(typefacesData => {
            console.log('Typefaces data loaded:', typefacesData);
            typefaces = typefacesData;
            renderTypefaceList();
        })
        .catch(error => {
            console.error('Error loading Typeface data:', error);
            alert('Failed to load Typeface data. Please try again later.');
        });

        function renderTypefaceList() {
            typefaceListContainer.innerHTML = '';
            typefaces.forEach(typeface => {
                const id = typeface._id;
                let imageUrl = typeface.image || 'placeholder-image-url';
        
                // Check if the image URL is a relative path and prepend the backend URL
                if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
                    imageUrl = `http://localhost:5000/${imageUrl}`;
                }
        
                const card = document.createElement('div');
                card.classList.add('card');
                card.dataset.id = id;
                card.innerHTML = `
                    <div class="card-image" style="background-image: url('${imageUrl}');">
                        <img src="${imageUrl}" alt="${typeface.name}" style="display: none;" onerror="this.onerror=null; this.parentNode.style.backgroundImage='url(placeholder-image-url)';">
                    </div>
                    <div class="card-content">
                        <h1>${typeface.name}</h1>
                        <p>${typeface.description || ''}</p>
                    </div>
                `;
                card.addEventListener('click', () => showTypefaceDetail(id));
                typefaceListContainer.appendChild(card);
            });
        }

    const showTypefaceDetail = (typefaceId) => {
        const typeface = typefaces.find(t => t._id === typefaceId);
        if (typeface) {
            console.log('Showing typeface detail for:', typeface);
            localStorage.setItem('currentTypeface', JSON.stringify(typeface));
            window.location.href = `typeface-detail.html?id=${typeface._id}`;
        } else {
            console.error(`Typeface not found for id: ${typefaceId}`);
        }
    };

    // Remove the addDatatoHTML function as it's no longer needed
});