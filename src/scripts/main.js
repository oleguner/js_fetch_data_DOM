'use strict';

const listUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const detailsUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const getPhones = () => {
  return new Promise((resolve, reject) => {
    fetch(listUrl)
      .then(response => resolve(response.json()));

    setTimeout(
      () => reject(new Error('Response was rejected'),
        5000,
      ));
  });
};

const createPhonesList = (phones) => {
  const phonesList = document.createElement('ul');

  document.body.append(phonesList);

  phonesList.insertAdjacentHTML(
    'afterbegin',
    `${phones.map(phone => `<li>${phone.name}</li>`).join('')}`,
  );

  return phones;
};

const getPhonesDetails = (ids) => {
  const phonesDetails = ids.map(id => fetch(`${detailsUrl}${id}.json`));

  return Promise.all(phonesDetails);
};

getPhones()
  .then(createPhonesList)
  .then(phones => phones.map(phone => phone.id))
  .then(getPhonesDetails)
  .catch(new Error('Something went wrong'));
