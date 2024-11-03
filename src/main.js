import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { ImageServer } from './js/pixabay-api';
import { createGalleryMarkup, renderListGallery } from './js/render-functions';

const galleryMarkup = createGalleryMarkup();

const body = document.querySelector('body');
body.insertAdjacentHTML('afterbegin', galleryMarkup);

const formEl = document.querySelector('form');
const loader = document.querySelector('.loader');
const loaderSecond = document.querySelector('[data-loader]');

const gallery = document.querySelector('.gallery');
const input = document.querySelector('input');
const button = document.querySelector('button');
const btnLoad = document.querySelector('.btn-load');

const images = new ImageServer();
const show = new SimpleLightbox('.gallery a');

function showIziToast(text) {
  return iziToast.show({
    message: text,
    messageSize: '16px',
    messageWeight: '400',
    backgroundColor: '#ef4040',
    messageColor: '#fff',
    position: 'topRight',
    iconUrl: './img/error.svg',
  });
}

let page;
let maxPages;
let q;

formEl.addEventListener('submit', async e => {
  e.preventDefault();
  btnLoad.classList.add('is-hidden');
  gallery.innerHTML = '';

  page = 1;
  q = e.target.elements.picture.value.trim();
  if (!q) {
    e.target.reset();
    showIziToast('The form field must be filled in!');
    return;
  }
  loader.classList.remove('is-hidden');

  try {
    const data = await images.getImages(q, page);
    maxPages = Math.ceil(data.totalHits / images.pageSize);
    if (data.hits.length === 0) {
      showIziToast(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    } else if (page >= maxPages) {
      btnLoad.classList.add('is-hidden');
      const galleryHtml = renderListGallery(data.hits);
      gallery.innerHTML = galleryHtml;
      showIziToast(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      const galleryHtml = renderListGallery(data.hits);
      gallery.innerHTML = galleryHtml;
      btnLoad.classList.remove('is-hidden');
    }
    show.refresh();
  } catch (error) {
    console.log(error);
  } finally {
    loader.classList.add('is-hidden');
    e.target.reset();
  }
});
// ==================== button "Load more" =================================== //
btnLoad.addEventListener('click', addPictures);

async function addPictures(e) {
  e.preventDefault();
  btnLoad.classList.add('is-hidden');
  loaderSecond.classList.remove('is-hidden');

  page += 1;
  try {
    const data = await images.getImages(q, page);
    maxPages = Math.ceil(data.totalHits / images.pageSize);
    if (page >= maxPages) {
      btnLoad.classList.add('is-hidden');
      const galleryAddImages = renderListGallery(data.hits);
      gallery.insertAdjacentHTML('beforeend', galleryAddImages);
      showIziToast(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      const galleryAddImages = renderListGallery(data.hits);
      gallery.insertAdjacentHTML('beforeend', galleryAddImages);

      btnLoad.classList.remove('is-hidden');
    }
    const heidhtElem = gallery.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
      behavior: 'smooth',
      top: heidhtElem * 2,
    });
    show.refresh();
  } catch (error) {
    console.log(error);
  } finally {
    loaderSecond.classList.add('is-hidden');
  }
}
