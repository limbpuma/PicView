const accessKey = process.env.UNSPLASH_ACCESS_KEY;
//

const count = 4;

let currentCategory = '';

const fetchImages = async(query = '') => {
    try {
        let url = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;
        if (query !== '') {
            url += `&query=${query}`;
        }
        if (currentCategory !== '') {
            url += `&collections=${currentCategory}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        const imageRow = document.getElementById('image-row');
        imageRow.innerHTML = '';

        data.forEach(image => {
            const card = document.createElement('div');
            card.className = 'col-md-5 col-lg-3 mx-auto';
            card.innerHTML = `
                <div class="card">
                    <img src="${image.urls.regular}" class="card-img-top" alt="${image.alt_description}">
                    <div class="card-body">
                        <p class="username">${image.user.name}</p>
                        <p class="likes"><i class="far fa-heart"></i> ${image.likes} Likes</p>
                        <p class="change-image" onclick="changeImage(this)"><i class="fas fa-sync-alt"></i> Change image</p>
                    </div>
                </div>
            `;
            imageRow.appendChild(card);
        });
    } catch (error) {
        console.log('Error al obtener las imágenes:', error);
    }
};

const changeImage = async(element) => {
    try {
        const card = element.closest('.card');
        const image = card.querySelector('img');

        const response = await fetch(
            `https://api.unsplash.com/photos/random/?client_id=${accessKey}`
        );
        const data = await response.json();

        image.src = data.urls.regular;
        image.alt = data.alt_description;
    } catch (error) {
        console.log('Error al cambiar la imagen:', error);
    }
};

const setCategory = (category) => {
    currentCategory = category;
    fetchImages(category);
};

const searchImages = () => {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();
    fetchImages(query);
};

const fetchCarouselImages = async() => {
    try {
        const response = await fetch(
            `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=2&query=background`
        );
        const data = await response.json();

        const carouselItem1 = document.getElementById('carousel-item-1');
        const carouselItem2 = document.getElementById('carousel-item-2');

        carouselItem1.innerHTML = `<img src="${data[0].urls.regular}" class="d-block w-100" alt="${data[0].alt_description}">`;
        carouselItem2.innerHTML = `<img src="${data[1].urls.regular}" class="d-block w-100" alt="${data[1].alt_description}">`;
    } catch (error) {
        console.log('Error al obtener las imágenes del carrusel:', error);
    }
};

window.onload = () => {
    fetchImages();
    fetchCarouselImages();
};