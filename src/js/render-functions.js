export function createGalleryMarkup() {
  return `
  <div class="container">
   <form class="form">
    <input class="input" type="text" name="picture" placeholder="Search images..." />
    <button class="btn-search" type="submit">Search</button>
  </form>
  <span class="loader is-hidden">Loading images, please wait...</span>
  <ul class="gallery"></ul>
  <div class="cont-load">
  <button class="btn-load btn-search is-hidden" type="button">Load more</button>
  <span class="loader second-load is-hidden" data-loader>Loading images, please wait...</span>
  </div>
  </div>`;
}

export function renderListGallery(images) {
  const item = images
    .map(el => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = el;
      return `<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img
      class="gallery-image"
      src="${webformatURL}"
      data-source="${largeImageURL}"
      alt=""
      title="${tags}"
    />
    <ul class="image-info">
      <li class="info-item">
        <span class="info-item">Likes</span>
        <span class="item-quantity">${likes}</span>
      </li>
       <li class="info-item">
        <span class="info-item">Views</span>
        <span class="item-quantity">${views}</span>
      </li>
       <li class="info-item">
        <span class="info-item">Comments</span>
        <span class="item-quantity">${comments}</span>
      </li>
       <li class="info-item">
        <span class="info-item">Downloads</span>
        <span class="item-quantity">${downloads}</span>
      </li>
    </ul>
  </a>
  </li>`;
    })
    .join('\n\n');

  return item;
}
