import mainApi from "./api";

const ticket02Select01 = () => {
    return fetch(`${mainApi.API_URL}/ticket/ticket02Select01`,{
        method: 'POST', // 指定請求方法為POST
        headers: {
          'Content-Type': 'application/json', // 指定請求的Content-Type為JSON格式
          // 如果有需要，還可以添加其他的請求頭
        },
        // body: JSON.stringify(data), // 將需要發送的資料轉換為JSON字符串並作為請求體發送
       
      })
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
const ticket02Select02 = () => {
    return fetch(`${mainApi.API_URL}/ticket/ticket02Select02`)
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
 

export { ticket02Select01, ticket02Select02 }