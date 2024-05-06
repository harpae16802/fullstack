import mainApi from "./api";

const recordSearch = () => {
    return fetch(`${mainApi.API_URL}/qrcode/recordSearch`)
        .then(response => {
            if (!response.ok) {
                console.log('網路請求失敗');

            }
            return response.json();
        })
        .then(data => {
            return { success: true, data: data.data };

        })
        .catch(error => {
            console.error('網路請求操作出現問題:', error);
            console.error('非 JSON 响应:', error.response);
        });
}
const myProduct = (orderId, qs="") => {
    let url = ""
    if (qs) {
        url = `${mainApi.API_URL}/qrcode/myProduct?search=${qs}`
    } else {
        url = `${mainApi.API_URL}/qrcode/myProduct`
    }
    return fetch(url, {
        method: 'POST', // 指定請求方法為POST
        body: JSON.stringify(orderId),
        headers: {
            'Content-Type': 'application/json', // 指定請求的Content-Type為JSON格式
            // 如果有需要，還可以添加其他的請求頭
        }
    })
        .then(response => {
            if (!response.ok) {
                console.log('網路請求失敗');

            }
            return response.json();
        })
        .then(data => {
            return { success: true, data: data.data, data2: data.data2 };

        })
        .catch(error => {
            console.error('網路請求操作出現問題:', error);
            console.error('非 JSON 响应:', error.response);
        });
}

const myProduct2 = (orderId, qs) => {
    let url = ""
    if (qs) {
        url = `${mainApi.API_URL}/qrcode/myProduct2?search=${qs}`
    } else {
        url = `${mainApi.API_URL}/qrcode/myProduct2`
    }
    return fetch(url, {
        method: 'POST', // 指定請求方法為POST
        body: JSON.stringify(orderId),
        headers: {
            'Content-Type': 'application/json', // 指定請求的Content-Type為JSON格式
            // 如果有需要，還可以添加其他的請求頭
        }
    })
        .then(response => {
            if (!response.ok) {
                console.log('網路請求失敗');

            }
            return response.json();
        })
        .then(data => {
            return { success: true, data: data.data };

        })
        .catch(error => {
            console.error('網路請求操作出現問題:', error);
            console.error('非 JSON 响应:', error.response);
        });
}
const insertProduct = (values) => {
    console.log(values)
    return fetch(`${mainApi.API_URL}/qrcode/insertProduct`, {
        method: 'POST', // 指定請求方法為POST
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json', // 指定請求的Content-Type為JSON格式
            // 如果有需要，還可以添加其他的請求頭
        }
    })
        .then(response => {
            if (!response.ok) {
                console.log('網路請求失敗');

            }
            return response.json();
        })
        .then(data => {
            return { success: true, data: data.data };

        })
        .catch(error => {
            console.error('網路請求操作出現問題:', error);
            console.error('非 JSON 响应:', error.response);
        });
}


export { myProduct, myProduct2, recordSearch, insertProduct }