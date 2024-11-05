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
