document.addEventListener('DOMContentLoaded', () => {
    const brandListContainer = document.getElementById('brand-list');
    let brands = [];

    // Shared function to show the detail page
    function showDetail(item, type) {
        localStorage.setItem(`current${type}`, JSON.stringify(item));
        window.location.href = `${type.toLowerCase()}-detail.html?id=${item._id}`;
    }

    // Fetch the brand data
    fetch('http://localhost:5000/api/brands')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(brandsData => {
            console.log('Brands data loaded:', brandsData);
            brands = brandsData;
            renderBrandList();
        })
        .catch(error => {
            console.error('Error loading brand data:', error);
            alert('Failed to load brand data. Please try again later.');
        });
        function renderBrandList() {
            brandListContainer.innerHTML = '';
            brands.forEach(brand => {
                const id = brand._id;
                let imageUrl = brand.image || 'placeholder-image-url';
    
                // Check if the image URL is a relative path and prepend the backend URL
                if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
                    imageUrl = `http://localhost:5000/${imageUrl}`;
                }
    
                const card = document.createElement('div');
                card.classList.add('card');
                card.dataset.id = id;
                card.innerHTML = `
                    <div class="card-image" style="background-image: url('${imageUrl}');">
                        <img src="${imageUrl}" alt="${brand.name}" style="display: none;" onerror="this.onerror=null; this.parentNode.style.backgroundImage='url(placeholder-image-url)';">
                    </div>
                    <div class="card-content">
                        <h1>${brand.name}</h1>
                    </div>
                `;
                card.addEventListener('click', () => showDetail(brand, 'Brand'));
                brandListContainer.appendChild(card);
            });
        }
});
