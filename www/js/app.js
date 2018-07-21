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
const select = document.getElementById("country");
const resourse = document.getElementById("resourse");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const logout = document.querySelector(".logout");
const userName = document.querySelector(".userName");
const newsContainer = document.querySelector(".news-container");

// All events
select.addEventListener("change", onChangeCountry);
resourse.addEventListener("change", onChangeResourses);
category.addEventListener("change", onChangeCategory);
searchBtn.addEventListener("click", onSearch);
logout.addEventListener("click", onLogout);
newsContainer.addEventListener("click", addFavorite);

// CHeck auth state
firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        window.location = 'login.html';
    } else {
        userName.innerText = user.email;
    }
});

// Event handlers
function onChangeCountry(e) {
    // Показываю прелоадер
    ui.showLoader();
    // Делаем запрос на получение новостей по выбранной стране
    httpNew.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&category=${category.value}&apiKey=${apiKey}`)
        .then(data => {
            ui.clearContainer();
            data.articles.forEach((news, index) => ui.addNews(news, index));
            // сохраняем новости в хранилище
            newsStore.setNews(data.articles);
        })
        .catch(data => {
            ui.showError(data);
        })
}

// Category
function onChangeCategory(e) {
    ui.showLoader();
    httpNew.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&category=${category.value}&apiKey=${apiKey}`)
        .then(data => {
            ui.clearContainer();
            data.articles.forEach((news, index) => ui.addNews(news, index));
            // сохраняем новости в хранилище
            newsStore.setNews(data.articles);
        })
        .catch(data => {
            ui.showError(data);
        })
}

function onSearch(e) {
    // Делаем запрос на получение новостей по поиску
    httpNew.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`)
        .then(data => {
            if (data.totalResults) {
                ui.clearContainer();
                data.articles.forEach((news, index) => ui.addNews(news, index));
                // сохраняем новости в хранилище
                newsStore.setNews(data.articles);
            } else {
                ui.showInfo("Нет новостей")
            }
        })
        .catch(data => {
            ui.showError(data);
        })
}

// Получение ресурсов
function getAllResourses() {

        httpNew.get("https://newsapi.org/v2/sources?apiKey=9402fb0f3ca64f93b20a21436749e13b")
            .then(data => {
                for (let i = 0; i < 10; i++) {
                    let channel = new Option(data.sources[i].name, data.sources[i].id);
                    resourse.insertAdjacentElement("beforeend", channel);
                    $(document).ready(function(){
                        $('select').formSelect();
                    });
                }
            })
            .catch(data => {
                ui.showError(data);
            })

};
getAllResourses();
function onChangeResourses(e) {
    ui.showLoader();
    httpNew.get(`https://newsapi.org/v2/top-headlines?sources=${resourse.value}&apiKey=${apiKey}`)
        .then(data => {
            ui.clearContainer();
            data.articles.forEach((news, index) => ui.addNews(news, index));
            // сохраняем новости в хранилище
            newsStore.setNews(data.articles);
        })
        .catch(data => {
            ui.showError(data);
        })
}

function onLogout() {
    auth.loguot()
        .then(() => window.location = 'login.html')
        .catch(err => console.log(err));
}

function addFavorite(e) {
    if (e.target.classList.contains("add-favorite")) {
        const index = e.target.dataset.index;
        const oneNews = newsStore.getNews()[index];
        news.addFavoriteNews(oneNews)
            .then(() => {
                ui.showAddToFavoriteMessage('В любимые новости добавлено', oneNews.title);
            })
            .catch(err => {
                ui.showAddToFavoriteMessage('Ошибка добавления новости в любимые', err);
            });
    }
}