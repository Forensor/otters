import "./styles/app.css";

import Otter from './models/Otter.js';
import UI from './UI.js';

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  ui.renderOtters();
});

document.getElementById('otter-form')
  .addEventListener('submit', function(e) {

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    
    const image = document.getElementById('image').files;

    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('author', author);

    const ui = new UI();

    const otter = new Otter(title, author);

    if (title === '' || author === '') {
      ui.renderMessage('Please fill all the fields', 'error', 3000);
    } else {
      ui.addANewOtter(formData);
      ui.renderMessage('New Otter Added Successfully', 'success', 2000);
    }

    e.preventDefault();
  });

document.getElementById('otters-cards')
  .addEventListener('click', e => {
    const ui = new UI();
    if (e.target.classList.contains('delete')) {
      ui.deleteOtter(e.target.getAttribute('_id'));
      ui.renderMessage('Otter Deleted Successfully', 'success', 3000);
    }
    e.preventDefault();
  });
