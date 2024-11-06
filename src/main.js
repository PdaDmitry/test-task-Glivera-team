import { createCustomer } from './js/api.js';
import { CustomServer } from './js/pixabay-api.js';
import {
  renderBattons,
  renderCustomer,
  renderPaginationText,
} from './js/render-functions.js';

const nameCustom = new CustomServer();

const body = document.querySelector('body');

const sidebarList = document.querySelector('.sidebar-list');
const sidebarButtons = document.querySelectorAll('.sidebar-btn');
const contents = document.querySelectorAll('.content');
const customersList = document.querySelector('.custom-info');

// ==========================================================================
const customBtn = document.getElementById('customers');

// =============================pagination=============================================
const paginationElemtText = document.querySelector('.pagination-text');
const pageButtonsCont = document.querySelector('.page-buttons');
// const paginationElement = document.querySelector('.page-buttons');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let paginText;

let page = 1;
let maxPages;
// const visibleButtons = 4;
let startPage = 3;
let endPage = 3;

sidebarButtons.forEach(sidebarButton => {
  sidebarButton.addEventListener('click', () => {
    const targetContent = sidebarButton.getAttribute('data-content');
    // console.log(targetContent);

    contents.forEach(content => content.classList.remove('active'));

    document.getElementById(targetContent).classList.add('active');

    if (targetContent === 'customers') {
      addCustomers(page);
    }
  });
});

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
        addCustomers(content);
        renderPaginationText(content);
        // renderBattons(content, maxPages);
      }
    });
    pageButtonsCont.appendChild(button);
  });
}
