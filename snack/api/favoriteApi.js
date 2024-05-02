import mainApi from "./api";
const favoriteSearch01Product = (formdata,qs="") => { 
    let url = ""
    if (qs) {
        url = `${mainApi.API_URL}/favorite/favoriteSearch01Product?search=${qs}`
    } else {
        url = `${mainApi.API_URL}/favorite/favoriteSearch01Product?search=${qs}`
    }
    return fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', // 指定請求的Content-Type為JSON格式
            // 如果有需要，還可以添加其他的請求頭
        },
        body: JSON.stringify(formdata)
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

const favoriteSearch02Store = (formdata,qs="") => {   
    let url = ""
    if (qs) {
        url = `${mainApi.API_URL}/favorite/favoriteSearch02Store?search=${qs}`
    } else {
        url = `${mainApi.API_URL}/favorite/favoriteSearch02Store`
    }
    
    return fetch(`${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // 指定請求的Content-Type為JSON格式
            // 如果有需要，還可以添加其他的請求頭
        } ,
        body: JSON.stringify(formdata)
    })
        .then(response => {
            if (!response.ok) {
                console.log('網路請求失敗');
            }
            return response.json();
        })
        .then(data => {
            return data;

        })
        .catch(error => {
            console.log('網路請求操作出現問題:', error);
            if (error.response) {
                // 处理非 JSON 响应
                console.log('非 JSON 响应:', error.response);
            }
            // 这里可以添加其他错误处理逻辑
            throw error; // 将错误继续传播
        });
}
// product del
const favoriteDel01Product = (formdata="") => {
    return fetch(`${mainApi.API_URL}/favorite/favoriteDel01Product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // 指定請求的Content-Type為JSON格式
            // 如果有需要，還可以添加其他的請求頭
        },
        body: JSON.stringify(formdata="")
    })
        .then(response => {
            if (!response.ok) {
                console.log('網路請求失敗'); 
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
        headers: {
            'Content-Type': 'application/json', // 指定請求的Content-Type為JSON格式
            // 如果有需要，還可以添加其他的請求頭
        },
        body: JSON.stringify(formdata)
    })
        .then(response => {
            if (!response.ok) {
                console.log('網路請求失敗');

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