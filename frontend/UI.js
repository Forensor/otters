import OtterService from './services/OtterService';
const otterService = new OtterService();

import { format } from 'timeago.js';

class UI {

  async renderOtters() {
    const otters = await otterService.getOtters();
    const ottersCardContainer = document.getElementById('otters-cards');
    ottersCardContainer.innerHTML = '';
    otters.forEach((otter) => {
      const div = document.createElement('div');
      div.className = 'animated fadeInRight';
      div.innerHTML = `
      <div class="card m-2">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="${otter.imagePath}" class="img-fluid" alt="">
            </div>
            <div class="col-md-8">
                <div class="card-block px-2">
                    <h4 class="card-title font-weight-bold mt-3">${otter.title}</h4>
                    <p class="card-text">${otter.author}</p>
                    <a href="#" class="btn btn-danger delete mb-3" _id="${otter._id}">Delete</a>
                </div>
            </div>
        </div>
        <div class="card-footer w-100 text-muted">
          ${format(otter.created_at)}
        </div>
      </div>
      `;
      ottersCardContainer.appendChild(div);
    });
  }

  async addANewOtter(otter) {
    await otterService.postOtter(otter);
    this.renderOtters();
    this.clearOtterForm();
  }

  clearOtterForm() {
    document.getElementById('otter-form').reset();
    document.getElementById('title').focus();
  }

  renderMessage(message, colorMessage, secondsToRemove) {
    const div = document.createElement('div');
    div.className = `message ${colorMessage}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.col-md-4');
    const otterForm = document.querySelector('#otter-form');
    container.insertBefore(div, otterForm);
    setTimeout(() => {
      document.querySelector('.message').remove();
    }, secondsToRemove);
  }

  async deleteOtter(otterId) {
    await otterService.deleteOtter(otterId);
    this.renderOtters();
  }

}

export default UI;
