export function renderCustomer(customers, customerHtml) {
  const item = customers
    .map(el => {
      let { id, user } = el;
      const { lastName, company, phoneNumder, email, country, status } =
        customerHtml();
      if (user.length > 10) {
        user = 'Bob';
      }
      return `
          <li class='customer-item'>
          <span class='customer-info-name'> ${user[0].toUpperCase()}${user.slice(
        1
      )} ${lastName}</span>
            <span class='customer-info-company'> ${company}</span>
            <span class='customer-info-phoneNumder'> ${phoneNumder}</span>
            <span class='customer-info-email'> ${user.toLowerCase()}${email}</span>
            <span class='customer-info-country'> ${country}</span>
            <span class='customer-info-status'> ${status}</span>
          </li>
      `;
    })
    .join('');

  return item;
}

export async function renderBattons(page, maxPages) {
  let buttons = [];

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '<';
  prevBtn.classList.add('prev-btn');
  buttons.push(prevBtn);

  const nextBtn = document.createElement('button');
  nextBtn.textContent = '>';
  nextBtn.classList.add('next-btn');

  let ellipsisBtn = document.createElement('button');
  ellipsisBtn.textContent = '...';
  ellipsisBtn.classList.add('page-btn');

  const lastBtn = document.createElement('button');
  lastBtn.textContent = maxPages;
  lastBtn.classList.add('page-btn');

  for (let i = page; i <= page + 3; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.classList.add('page-btn');
    buttons.push(button);
  }

  buttons.push(ellipsisBtn, lastBtn, nextBtn);
  // console.log(buttons);

  return buttons;
}
