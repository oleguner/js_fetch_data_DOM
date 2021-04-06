'use strict';

const listUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const detailsUrl
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';

const getPhones = () => {
  return new Promise((resolve, reject) => {
    fetch(listUrl)
      .then(response => response.json())
      .then(result => {
        resolve(result);

        if (!result) {
          setTimeout(
            () => reject(new Error('Response was rejected'),
              5000),
          );
        }
      });
  });
};

const getPhonesDetails = (phones) => {
  const gottenList = phones.map(phone => {
    const id = phone.id;

    return fetch(`${detailsUrl}${id}.json`);
  });

  return Promise.all(gottenList);
};

getPhones()
  .then((response) => {
    const phonesList = document.createElement('ul');

    document.body.append(phonesList);

    phonesList.insertAdjacentHTML(
      'afterbegin',
      `${response.map(phone => `<li>${phone.name}</li>`).join('')}`,
    );

    return response;
  })
  .then(getPhonesDetails)
  .catch(new Error('Something went wrong'));
