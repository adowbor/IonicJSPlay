import { defineCustomElements } from '@ionic/core/loader';

import {
  loadingController,
  modalController,
  pickerController,
  toastController,
} from '@ionic/core';

/* Core CSS required for Ionic components to work properly */
import '@ionic/core/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/core/css/normalize.css';
import '@ionic/core/css/structure.css';
import '@ionic/core/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/core/css/padding.css';
import '@ionic/core/css/float-elements.css';
import '@ionic/core/css/text-alignment.css';
import '@ionic/core/css/text-transformation.css';
import '@ionic/core/css/flex-utils.css';
import '@ionic/core/css/display.css';

/* Theme variables */
import './theme/variables.css';

defineCustomElements();

(window as any).loadingController = loadingController;
(window as any).modalController = modalController;
(window as any).pickerController = pickerController;
(window as any).toastController = toastController;

const myList = ['Apples 🍎', 'Bananas 🍌', 'Toilet Paper 🧻'];
// refreshList(myList, "list");

(async () => {
  const data = await getData();
  console.log(data);
  refreshList(data, 'list');
})();

//////// FUNCTIONS //////////

async function getData() {
  await presentToast('bottom', 'Loading data, please wait...');
  const r = await fetch('https://jsonplaceholder.typicode.com/users');
  return await r.json();
}

async function refreshList(data, listId) {
  const icons = [
    'bookmarks-outline',
    'body-outline',
    'headset-outline',
    'cart-outline',
    'car-outline',
  ];

  const e = window.document.getElementById(listId);
  for (let i = 0; i < data.length; i++) {
    const icon = icons[Math.floor(Math.random() * icons.length)];
    const item = document.createElement('ion-item');
    item.innerHTML = `<ion-label>${data[i].name}</ion-label>`;
    item.innerHTML += `<ion-icon slot="start" name="${icon}"></ion-icon>`;
    item.innerHTML += `<ion-badge start>${data[i].id}</ion-badge>`;

    e.appendChild(item);
  }
}

async function presentToast(position, msg) {
  const toast = await toastController.create({
    message: msg,
    duration: 500,
    position: position,
  });

  await toast.present();
}
