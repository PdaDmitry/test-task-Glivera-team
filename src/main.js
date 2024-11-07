import { createCustomer } from './js/api.js';
import { CustomServer } from './js/pixabay-api.js';
import {
  renderBattons,
  renderCustomer,
  renderPaginationText,
} from './js/render-functions.js';

const nameCustom = new CustomServer();

const body = document.querySelector('body');

const sidebarList = document.querySelector('.sidebar__list');
const sidebarButtons = document.querySelectorAll('.sidebar__btn');
const contents = document.querySelectorAll('.content');
const customersList = document.querySelector('.custom__info');
const sidebar = document.querySelector('.sidebar'); //!!!!!!!!!!!!!!!!!
const contView = document.querySelector('.cont__view');
const header = document.querySelector('.header');

// ==========================================================================
const customBtn = document.getElementById('customers');

// =============================pagination=============================================
const paginationElemtText = document.querySelector('.pagination__text');
const pageButtonsCont = document.querySelector('.page__buttons');
// const paginationElement = document.querySelector('.page-buttons');
const prevBtn = document.querySelector('.prev__btn');
const nextBtn = document.querySelector('.next__btn');
// let paginText;

let page = 1;
let maxPages;

sidebarButtons.forEach(sidebarButton => {
  sidebarButton.addEventListener('click', () => {
    const targetContent = sidebarButton.getAttribute('data-content');
    contents.forEach(content => content.classList.remove('active'));

    if (window.innerWidth <= 767) {
      sidebar.classList.add('display__none');
    }

    document.getElementById(targetContent).classList.add('active');
    header.classList.remove('display__none');

    if (targetContent === 'customers') {
      addCustomers(page);
    }
  });
});
// ============================Back button for all tabs мobile version========================================
contents.forEach(section => {
  const backButton = document.createElement('button');
  sidebar.classList.remove('display__none');
  sidebar.classList.add('sidebar');
  backButton.textContent = 'Back';
  backButton.classList.add('back__button');
  section.prepend(backButton);

  backButton.addEventListener('click', () => {
    section.classList.remove('active');
    sidebar.classList.remove('display__none');
    header.classList.add('display__none');
  });
});
// ========================================================================
async function addCustomers(page) {
  customersList.innerHTML = '';
  try {
    if (page > maxPages) {
      page = 1;
    }
    const data = await nameCustom.getCustomName(page);
    maxPages = Math.ceil(data.totalHits / nameCustom.pageSize);

    const customerHtml = renderCustomer(data.hits, createCustomer);
    customersList.insertAdjacentHTML('beforeend', customerHtml);
    const paginationText = renderPaginationText(page);
    paginationElemtText.innerHTML = paginationText;
    renderPagination();
  } catch (error) {
    console.log(error);
  } finally {
    page += 1;
  }
}

async function renderPagination() {
  pageButtonsCont.innerHTML = '';

  const buttons = await renderBattons(page, maxPages);

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      let content = button.textContent;

      if (content === '>') {
        if (page < maxPages - 5) {
          page++;
          addCustomers(page);
          renderPaginationText(page);
        }
      } else if (content === '<') {
        if (page > 1) {
          page--;
          addCustomers(page);
          renderPaginationText(page);
        }
      } else if (content !== '...') {
        if (content === maxPages) {
          page = content;
        }

        addCustomers(content); //!!!!!!!!!!!!!!!!!
        renderPaginationText(content); //!!!!!!!!!!!!
      }
    });
    pageButtonsCont.appendChild(button);
  });
}
