const names = [
  'Leanne',
  'Ervin',
  'Clementine',
  'Patricia',
  'Chelsey',
  'Dennis',
  'Kurtis',
  'Nicholas',
  'Glenna',
  'Clementina',
];

const lastNames = [
  'Graham',
  'Howell',
  'Bauch',
  'Lebsack',
  'Dietrich',
  'Schulist',
  'Weissnat',
  'Runolfsdottir',
  'Reichert',
  'DuBuque',
];

const companies = [
  'Yahoo',
  'Microsoft',
  'Google',
  'Tesla',
  'Adobe',
  'Foxtrot',
  'Comfy',
  'Feacebook',
  'Rozetca',
  'Adidas',
];

const countries = [
  'Ukraine',
  'United States',
  'Israel',
  'France',
  'Germany',
  'Türkiye',
  'Spain',
  'Greece',
  'Denmark',
  'Norway',
];

const statuses = ['Active', 'Inactive'];

const operatorCode = [
  '(205)',
  '(302)',
  '(252)',
  '(629)',
  '(406)',
  '(208)',
  '(704)',
  '(050)',
  '(067)',
  '(099)',
];

const num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const randomElem = arr => {
  const randomIndex = Math.floor(Math.random() * companies.length);
  const statusesIndex = Math.floor(Math.random() * statuses.length);

  if (arr === statuses) return arr[statusesIndex];
  return arr[randomIndex];
};

export const createCustomer = () => {
  // let name = randomElem(names);
  let lastName = randomElem(lastNames);
  let company = randomElem(companies);
  let phoneNumder = `${randomElem(operatorCode)} 555-${randomElem(
    num
  )}${randomElem(num)}${randomElem(num)}${randomElem(num)}`;
  let country = randomElem(countries);
  let email = `@${company.toLowerCase()}.com`;
  let status = randomElem(statuses);

  return {
    id: Date.now(),
    // name,
    lastName,
    company,
    phoneNumder,
    email,
    country,
    status,
  };
};

// export const objCustomer = createCustomer();
// ===============================================================
