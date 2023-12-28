async function sendLoginRequest(userName, password)  {
 
    let accessBool = Boolean(false);

    let body = {
                  "userName": userName.toString(),
                  "password": password.toString()
                }
    const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                       'Origin':'test'},
            body: JSON.stringify(body) 
        };
        console.log(requestOptions);

        await fetch('https://localhost:7115/api/authentication/authenticate', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Response status ${response.status}`);
            }
            clearCookie();
            accessBool = true;
            return response.json(); 
        })
        .then(data => {

           
            accessBool = setTokenCookie(data.token);
        })
        .then(()=>{
            accessBool = true;
            console.log(accessBool);
        })
        .catch(e => {
            console.error(e);
            
        });    
        return accessBool;
}
function clearCookie() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
function setTokenCookie(token) {
    try
    {
        if(token=="")
        {
            console.log("token is empty");
            throw new Error('token is empty')
        } 

            const currentDate = new Date();
            const expirationDate = new Date(currentDate.getTime() + (1 * 24 * 60 * 60 * 1000)).toUTCString();

            // Устанавливаем куки с именем "token", значением токена и сроком годности
            document.cookie = `token=${token}; expires=${expirationDate}; path=/`;

            console.info('Токен успешно записан в куки');  
            return true;
            // Ваш код дальнейших действий после записи токена
    }
    catch(e)
    {
            console.error(e);
            return false;
    }
}

    // function getcookie(name) {
    //         const value = `; ${document.cookie}`;
    //         const parts = value.split(`; ${name}=`);
    //         if (parts.length === 2) 
    //             return parts.pop().split(';').shift();
    //     }


    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    }

    function parseTokenData(token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        }
    function loadDocumentByRole(role) {
    switch (role) {
        case 'reader':
            window.location.href = "../user/index.html"
            break;
        case 'admin':
            window.location.href = "../admin/adminpage.html"
            break;
        case 'author':
                window.location.href = "../author/author.html"
        default:
            break;
    }
}
