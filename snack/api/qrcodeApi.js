import mainApi from "./api";

const myProduct = () => {
    return fetch(`${mainApi.API_URL}/qrcode/myProduct`)
        .then(response => {
            if (!response.ok) {
                throw new Error('網路請求失敗');
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
const myProduct2 = () => {
    return fetch(`${mainApi.API_URL}/qrcode/myProduct2`)
        .then(response => {
            if (!response.ok) {
                throw new Error('網路請求失敗');
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
 

export { myProduct, myProduct2 }