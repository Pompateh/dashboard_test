document.addEventListener('DOMContentLoaded', () => {
    const productDetailContainer = document.getElementById('product-detail');
    let currentProduct;
    let products = [];

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            products = await response.json();
            initializeProduct();
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const initializeProduct = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        currentProduct = products.find(prod => prod._id === productId) || products[0];
        console.log('Current product:', currentProduct); // For debugging
        renderProductDetail();
    };

    const renderProductDetail = () => {
        if (currentProduct) {
            const baseUrl = 'http://localhost:5000/'; // Adjust this if your backend URL is different
            productDetailContainer.innerHTML = `
                <div class="detail_head">
                    <div class="detail_back"><a href="shop.html">Back</a></div>
                    <div class="product_name">${currentProduct.name}</div>
                    <div class="detail_next"><a href="#" id="nextProduct">Next</a></div>
                </div>
                <div class="detail_content">
                    <div class="detail_main_img">
                        <img src="${baseUrl}${currentProduct.image}" alt="${currentProduct.name}">
                    </div>
                    <div class="product_story">
                        <h3>Story</h3>
                        <p>${currentProduct.story || 'No story available for this product.'}</p>
                    </div>
                    <div class="detail_img_grid">
                        <img src="${baseUrl}${currentProduct.image1}" alt="${currentProduct.name} Detail 1">
                        <img src="${baseUrl}${currentProduct.image2}" alt="${currentProduct.name} Detail 2">
                    </div>
                    <div class="detail_bottom_img">
                        <img src="${baseUrl}${currentProduct.image3}" alt="${currentProduct.name} Detail 3">
                    </div>
                </div>
                <div class="detail_end">
                    <a href="#" id="prevProductBottom">Previous</a>
                    <div class="get_btn"><a href="#" id="addToCart">Add to Cart</a></div>
                    <a href="#" id="nextProductBottom">Next</a>
                </div>
            `;

            document.getElementById('addToCart').addEventListener('click', (e) => {
                e.preventDefault();
                addToCart(currentProduct._id);
                alert('Product added to cart!');
            });

            document.getElementById('nextProduct').addEventListener('click', navigateToNext);
            document.getElementById('nextProductBottom').addEventListener('click', navigateToNext);
            document.getElementById('prevProductBottom').addEventListener('click', navigateToPrev);
        } else {
            productDetailContainer.innerHTML = '<p>Product not found.</p>';
        }
    };

    const navigateToNext = (e) => {
        e.preventDefault();
        const currentIndex = products.findIndex(prod => prod._id === currentProduct._id);
        const nextIndex = (currentIndex + 1) % products.length;
        currentProduct = products[nextIndex];
        updateURL();
        renderProductDetail();
    };

    const navigateToPrev = (e) => {
        e.preventDefault();
        const currentIndex = products.findIndex(prod => prod._id === currentProduct._id);
        const prevIndex = (currentIndex - 1 + products.length) % products.length;
        currentProduct = products[prevIndex];
        updateURL();
        renderProductDetail();
    };

    const updateURL = () => {
        const newUrl = `${window.location.pathname}?id=${currentProduct._id}`;
        history.pushState(null, '', newUrl);
    };

    const addToCart = (product_id) => {
        if (!product_id) {
            console.error('Invalid product_id:', product_id);
            return;
        }
        let carts = JSON.parse(localStorage.getItem('cart')) || [];
        let positionThisProductInCart = carts.findIndex(value => value.product_id === product_id);
        if (positionThisProductInCart < 0) {
            carts.push({
                product_id: product_id,
                quantity: 1
            });
        } else {
            carts[positionThisProductInCart].quantity += 1;
        }
        localStorage.setItem('cart', JSON.stringify(carts));
        updateCartIcon();
    };

    const updateCartIcon = () => {
        const carts = JSON.parse(localStorage.getItem('cart')) || [];
        const totalQuantity = carts.reduce((total, item) => total + item.quantity, 0);
        const iconCartSpan = document.querySelector('.icon_cart span');
        if (iconCartSpan) {
            iconCartSpan.innerText = totalQuantity;
        }
    };

    fetchProducts();
    updateCartIcon();
});