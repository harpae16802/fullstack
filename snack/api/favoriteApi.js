import mainApi from "./api";
const favoriteSearch01Product = (formdata) => {
    return fetch(`${mainApi.API_URL}/favorite/favoriteSearch01Product`, {
        method: 'POST', 
        body: formdata
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('網路請求失敗');
            }
            return response.json();
        })
        .then(data => {
            return { success: true, data: data };

        })
        .catch(error => {
            console.error('網路請求操作出現問題:', error);
            // 处理非 JSON 响应
            console.error('非 JSON 响应:', error.response);
        });
}

const favoriteSearch02Store = (formdata) => {
    return fetch(`${mainApi.API_URL}/favorite/favoriteSearch02Store`, {
        method: 'POST',
        body: JSON.stringify(formdata)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('網路請求失敗');
            }
            return response.json();
        })
        .then(data => {
            return data;

        })
        .catch(error => {
            console.error('網路請求操作出現問題:', error);
            // 处理非 JSON 响应
            console.error('非 JSON 响应:', error.response);
        });
}
// product del
const favoriteDel01Product = (formdata) => {
    return fetch(`${mainApi.API_URL}/favorite/favoriteDel01Product`, {
        method: 'POST',
        body: JSON.stringify(formdata)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('網路請求失敗');
            }
            return response.json();
        })
        .then(data => {
            return data;

        })
        .catch(error => {
            console.error('網路請求操作出現問題:', error);
            // 处理非 JSON 响应
            console.error('非 JSON 响应:', error.response);
        });
}
// Store del
const favoriteDel02Store = (formdata) => {
    return fetch(`${mainApi.API_URL}/favorite/favoriteDel02Store`, {
        method: 'POST',
        body: JSON.stringify(formdata)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('網路請求失敗');
            }
            return response.json();
        })
        .then(data => {
            return data;

        })
        .catch(error => {
            console.error('網路請求操作出現問題:', error);
            // 处理非 JSON 响应
            console.error('非 JSON 响应:', error.response);
        });
}

export default { favoriteSearch01Product, favoriteSearch02Store, favoriteDel01Product,favoriteDel02Store }