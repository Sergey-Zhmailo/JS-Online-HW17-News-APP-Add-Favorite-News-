class UI {
    constructor() {
        this.container = document.querySelector(".news-container .container .row");
        this.messageContainer = document.querySelector(".container.message");
    }
    addNews (news, index) {
        const template = `
        <div class="col s12 m6">
          <div class="card left-align">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${news.urlToImage}">
              </div>
              <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${news.title}<i class="material-icons right">more_vert</i></span>
                  <div class="buttons-group">
                      <p><a href="${news.url}"class="waves-effect waves-light btn blue darken-3 read-more left"><i class="material-icons left">visibility</i>Read more</a></p>
                      <button data-index="${index}" class="waves-effect waves-light btn blue darken-3 add-favorite right"><i class="material-icons left add-favorite">star</i>Add to favorite</button>
                      <p style="clear: both"></p>
                  </div>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">${news.title}<i class="material-icons right">close</i></span>
                  <p>${news.description}</p>
              </div>
          </div>
      </div>
        `;
    this.container.insertAdjacentHTML("beforeend", template);
    }

    addFavoriteNews (news, id) {
        const template = `
        <div class="col s12 m6">
          <div class="card left-align">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${news.urlToImage}">
              </div>
              <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${news.title}<i class="material-icons right">more_vert</i></span>
                  <div class="buttons-group">
                      <p><a href="${news.url}"class="waves-effect waves-light btn blue darken-3 read-more left"><i class="material-icons left">visibility</i>Read more</a></p>
                      <button data-id="${id}" class="waves-effect waves-light btn red darken-2 remove-favorite right"><i class="material-icons left remove-favorite">delete</i>Remove favorite</button>
                      <p style="clear: both"></p>
                  </div>
              </div>
              <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">${news.title}<i class="material-icons right">close</i></span>
                  <p>${news.description}</p>
              </div>
          </div>
      </div>
        `;
        this.container.insertAdjacentHTML("beforeend", template);
    }

    clearContainer () {
        this.container.innerHTML = "";
    }

    showLoader () {
        this.clearContainer();

        const template = `
        <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
                 <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>    
        `;

        this.container.insertAdjacentHTML("beforeend", template);
    }

    showInfo(msg) {
        this.clearContainer();

        const template = `
        <div class="card blue lighten-4">
            <div class="card-content">
                <p>${msg}</p>
            </div>
        </div>
        `;

        this.container.insertAdjacentHTML("beforeend", template);
    }
    showError(err) {
        this.clearContainer();

        const template = `
        <div class="card red lighten-4">
            <div class="card-content">
                <span class="card-title">Error: </span>
                <p>${err}</p>
            </div>
        </div>
        `;

        this.container.insertAdjacentHTML("beforeend", template);
    }
    showAddToFavoriteMessage(text, info) {
        this.messageContainer.innerHTML = "";
        const template = `
        <div class="card blue lighten-4">
            <div class="card-content">
                <span class="card-title">${text}: </span>
                <p>${info}</p>
            </div>
        </div>
        `;

        this.messageContainer.insertAdjacentHTML("beforeend", template);
        const self = this;
        setTimeout(function () {
            self.messageContainer.innerHTML = "";
        }, 4000);
    }

}
class LoginUI {
    constructor() {
        this.loginContainer = document.querySelector(".container.error");
    }

    clearContainer () {
        this.loginContainer.innerHTML = "";
    }

    showLoginError(err) {
        this.clearContainer();
        const template = `
        <div class="card red lighten-4">
            <div class="card-content">
                <span class="card-title">Error: </span>
                <p>${err}</p>
            </div>
        </div>
        `;

        this.loginContainer.insertAdjacentHTML("beforeend", template);
        const self = this;
        setTimeout(function () {
            self.loginContainer.innerHTML = "";
        }, 4000);

    }
}