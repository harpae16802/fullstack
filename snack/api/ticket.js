import mainApi from "./api";

const ticket01Select01 = () => {
    return fetch(`${mainApi.API_URL}/ticket/ticket01Select01`)
        .then(response => {
            if (!response.ok) {
                throw new Error('網路請求失敗');
            }
            return response.json();
        })
        .then(data => {
            return { success: true, data: data.allResult };

        })
        .catch(error => {
            console.error('網路請求操作出現問題:', error);
            console.error('非 JSON 响应:', error.response);
        });
}
const ticket01Select02 = () => {
    return fetch(`${mainApi.API_URL}/ticket/ticket01Select02`)
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
const ticket01Select03 = () => {
    return fetch(`${mainApi.API_URL}/ticket/ticket01Select03`)
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

export { ticket01Select01, ticket01Select02, ticket01Select03 }