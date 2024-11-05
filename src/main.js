import { createCustomer } from './js/api.js';
import { CustomServer } from './js/pixabay-api.js';
import { renderCustomer } from './js/render-functions.js';

const nameCustom = new CustomServer();

const body = document.querySelector('body');

const sidebarList = document.querySelector('.sidebar-list');
const sidebarButtons = document.querySelectorAll('.sidebar-btn');
const contents = document.querySelectorAll('.content');
const customersList = document.querySelector('.custom-info');
// ==========================================================================

// const customBtn = document.querySelector('.custom-btn');
const customBtn = document.getElementById('customers');
// customBtn.addEventListener('click', addCustomers);

let page = 1;
let maxPages;

sidebarButtons.forEach(sidebarButton => {
  sidebarButton.addEventListener('click', () => {
    const targetContent = sidebarButton.getAttribute('data-content');
    // console.log(targetContent);

    contents.forEach(content => content.classList.remove('active'));

    document.getElementById(targetContent).classList.add('active');

    if (targetContent === 'customers') {
      addCustomers();
    }
  });
});

async function addCustomers() {
  // e.preventDefault();
  customersList.innerHTML = '';

  try {
    const data = await nameCustom.getCustomName(page);
    maxPages = Math.ceil(data.totalHits / nameCustom.pageSize);
    if (page >= maxPages) {
      page = 1;
    }
    // console.log(data.totalHits);
    const customerHtml = renderCustomer(data.hits, createCustomer);
    customersList.insertAdjacentHTML('beforeend', customerHtml);
  } catch (error) {
    console.log(error);
  } finally {
    page += 1;
  }
}
