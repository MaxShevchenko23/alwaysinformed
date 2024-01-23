


function checkCredentials() {
    const userName = document.getElementById('profile');
    const cookie = parseTokenData(getCookie('token'));

    if (cookie !== null) {
        userName.innerText = cookie.userName;
        userName.setAttribute('href', `../user/userProfile.html`);
    } else {
        userName.innerText = "Log in";
        userName.setAttribute('href', `../shared/authorization.html`);
    }
}



function getCookie(name) {
    const cookies = document.cookie.split(';') ?? null;
    if(cookies == null) return null;
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

function parseTokenData(token) {
        if(token == null) return null;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    const container = document.getElementsByClassName('container mt-5')
    
    let pageNumber = 1;
        
    window.onload = function() {
        loadArticles();
    };

        function loadArticles(){
            filteredPageNumber = 1;
            checkCredentials();
            //почитать про closures в js
            
            fetch(`https://localhost:7115/api/user/articles/filter?pageNumber=${pageNumber}&pageSize=12`)
            .then(response => response.json())
            .then(articles => {
                pageNumber++;
                for (let i = 0; i <= articles.length; i+=3) {
                    container[0].innerHTML +=`
                    <div class="row">
                        <div class="col-md-4">
                            <div class="card mb-4">
                                <img src="${articles[i].image}" class="card-img-top" alt="Новость 1">
                                <div class="card-body">
                                    <h5 class="card-title">${articles[i].title}</h5>
                                    <p class="card-text">${articles[i].shortDescription}</p>
                                    <a href="article.html?article-url=${articles[i].url}" class="btn btn-primary">Read more</a>
                                </div>
                            </div>
                        </div>
                    
                        <div class="col-md-4">
                            <div class="card mb-4">
                                <img src="${articles[i+1].image}" class="card-img-top" alt="Новость 1">
                                <div class="card-body">
                                    <h5 class="card-title">${articles[i+1].title}</h5>
                                    <p class="card-text">${articles[i+1].shortDescription}</p>
                                    <a href="article.html?article-url=${articles[i+1].url}" class="btn btn-primary">Read more</a>
                                </div>
                            </div>
                        </div>
                    
                        <div class="col-md-4">
                            <div class="card mb-4">
                                <img src="${articles[i+2].image}" class="card-img-top" alt="Новость 1">
                                <div class="card-body">
                                    <h5 class="card-title">${articles[i+2].title}</h5>
                                    <p class="card-text">${articles[i+2].shortDescription}</p>
                                    <a href="article.html?article-url=${articles[i+2].url}" class="btn btn-primary">Read more</a>
                                </div>
                            </div>
                        </div>
                    </div>`                     
                }
                pageNumber+=1;
            })
            .catch(e => console.log(e));   
        }

        let filteredPageNumber = 1;
        function search(textToSearch) {
            fetch(`https://localhost:7115/api/user/articles/filter?&searchQuery=${textToSearch}&pageNumber=${filteredPageNumber}&pageSize=12`)
            .then(response => response.json())
            .then(articles => {
                container[0].innerHTML=""
                for (let i = 0; i <= articles.length; i+=3) {
                    container[0].innerHTML +=`
                    <div class="row">
                        <div class="col-md-4">
                            <div class="card mb-4">
                                <img src="${articles[i].image}" class="card-img-top" alt="Новость 1">
                                <div class="card-body">
                                    <h5 class="card-title">${articles[i].title}</h5>
                                    <p class="card-text">${articles[i].shortDescription}</p>
                                    <a href="article.html?article-url=${articles[i].url}" class="btn btn-primary">Read more</a>
                                </div>
                            </div>
                        </div>
                    
                        <div class="col-md-4">
                            <div class="card mb-4">
                                <img src="${articles[i+1].image}" class="card-img-top" alt="Новость 1">
                                <div class="card-body">
                                    <h5 class="card-title">${articles[i+1].title}</h5>
                                    <p class="card-text">${articles[i+1].shortDescription}</p>
                                    <a href="article.html?article-url=${articles[i+1].url}" class="btn btn-primary">Read more</a>
                                </div>
                            </div>
                        </div>
                    
                        <div class="col-md-4">
                            <div class="card mb-4">
                                <img src="${articles[i+2].image}" class="card-img-top" alt="Новость 1">
                                <div class="card-body">
                                    <h5 class="card-title">${articles[i+2].title}</h5>
                                    <p class="card-text">${articles[i+2].shortDescription}</p>
                                    <a href="article.html?article-url=${articles[i+2].url}" class="btn btn-primary">Read more</a>
                                </div>
                            </div>
                        </div>
                    </div>`                     
                }
                pageNumber+=1;
            })
            .catch(e=>console.log(e));   
        }

        function filterByCategory(categoryName) {
            fetch(`https://localhost:7115/api/user/articles/filter?categoryName=${categoryName}&pageNumber=1&pageSize=12`)
            .then(response => response.json())
            .then(articles => {
                container[0].innerHTML=""
                for (let i = 0; i <= articles.length; i+=3) {
                    container[0].innerHTML +=`
                    <div class="row">
                        <div class="col-md-4">
                            <div class="card mb-4">
                                <img src="${articles[i].image}" class="card-img-top" alt="Новость 1">
                                <div class="card-body">
                                    <h5 class="card-title">${articles[i].title}</h5>
                                    <p class="card-text">${articles[i].shortDescription}</p>
                                    <a href="article.html?article-url=${articles[i].url}" class="btn btn-primary">Read more</a>
                                </div>
                            </div>
                        </div>
                    
                        <div class="col-md-4">
                            <div class="card mb-4">
                                <img src="${articles[i+1].image}" class="card-img-top" alt="Новость 1">
                                <div class="card-body">
                                    <h5 class="card-title">${articles[i+1].title}</h5>
                                    <p class="card-text">${articles[i+1].shortDescription}</p>
                                    <a href="article.html?article-url=${articles[i+1].url}" class="btn btn-primary">Read more</a>
                                </div>
                            </div>
                        </div>
                    
                        <div class="col-md-4">
                            <div class="card mb-4">
                                <img src="${articles[i+2].image}" class="card-img-top" alt="Новость 1">
                                <div class="card-body">
                                    <h5 class="card-title">${articles[i+2].title}</h5>
                                    <p class="card-text">${articles[i+2].shortDescription}</p>
                                    <a href="article.html?article-url=${articles[i+2].url}" class="btn btn-primary">Read more</a>
                                </div>
                            </div>
                        </div>
                    </div>`                     
                }
                pageNumber+=1;
            })
            .catch(e=>console.log(e));   
        }