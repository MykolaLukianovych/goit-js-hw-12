export default reflectionPictures;


function reflectionPictures(pictures) {
    return pictures.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <a class="gallery-item" href="${largeImageURL}">
        <div class="all-gallery">
        <img src="${webformatURL}" alt="${tags}">
        <div class="discription">
        <p class="discr-text">Likes <span>${likes}</span></p>
        <p class="discr-text">Views <span>${views}</span></p>
        <p class="discr-text">Comments <span>${comments}</span></p>
        <p class="discr-text">Downloads <span>${downloads}</span></p>
        </div>
        </div>
        </a>
    
    `).join("");
}

