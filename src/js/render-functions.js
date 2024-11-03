export function renderCustomer(user) {
  console.log('user: ', user);
  const { name, lastName, company, phoneNumder, email, country, status } = user;
  return `
          <li>
            <span class='customer-info-name'> ${name} ${lastName}</span>
            <span class='customer-info-company'> ${company}</span>
            <span class='customer-info-phoneNumder'> ${phoneNumder}</span>
            <span class='customer-info-email'> ${email}</span>
            <span class='customer-info-country'> ${country}</span>
            <span class='customer-info-status'> ${status}</span>
          </li>
      `;
}
