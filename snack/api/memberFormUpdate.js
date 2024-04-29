import mainApi from "./api";
const formUpdate = (formDataObj) => {
    // 更新表單 
    return fetch(`${mainApi.API_URL}/updateMemberForm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formDataObj 
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

const searchMemberData = (customid) => { 
    return fetch(`${mainApi.API_URL}/selectCustom`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customid)
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


const searchImg = (formdata) => {
    return fetch(`${mainApi.API_URL}/getImgFormTa`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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

export default { searchMemberData, formUpdate, searchImg }