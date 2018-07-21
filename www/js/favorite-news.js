// Init httpNew
const httpNew = new HttpNew();
// Init UI
const ui = new UI();
// Api key
const apiKey = "9402fb0f3ca64f93b20a21436749e13b";
// Init Auth
const auth = new Auth();
// Init Favorite News
const news = new FavoriteNews();
// Init NewStore
const newsStore = NewsStore.getInstance();

// Init elements
const logout = document.querySelector(".logout");
const userName = document.querySelector(".userName");
const newsContainer = document.querySelector(".news-container");
// Events
logout.addEventListener("click", onLogout);
newsContainer.addEventListener("click", removeFavorite);
// CHeck auth state
firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        window.location = 'login.html';
    } else {
        userName.innerText = user.email;
    }
});
function onLogout() {
    auth.loguot()
        .then(() => window.location = 'login.html')
        .catch(err => console.log(err));
}

// по загрузке получаем все новости
window.addEventListener("load", onLoad);

function onLoad(e) {
    ui.showLoader();
    // получить избранные новости
    news.getFavoriteNews()
        .then(favoriteNews => {
            ui.clearContainer();
            // favoriteNews есть свойства length и empty
            if (favoriteNews.empty) {
                ui.showInfo("Нет новостей добавленных в любимые");
            }
            favoriteNews.forEach((doc) => {
                // выводим в разметку
                ui.addFavoriteNews(doc.data(), doc.id);
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function removeFavorite(e) {
    if (e.target.classList.contains("remove-favorite")) {
        const index = e.target.dataset.id;
        news.removeFavoriteNews(index)
            .then(() => {
                e.target.closest(".card").remove();
                ui.showAddToFavoriteMessage('Новость удалена', '');
            })
            .catch(err => {
                console.log(err);
            });
    }
}