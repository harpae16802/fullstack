 
const customAP = (formdata) => {
    return fetch(`http://localhost:3002/productPage/custom2`, {
        method: 'POST',  headers: {
            'Content-Type': 'application/json'
            // 这里可以添加其他的请求头，如果需要的话
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
export default {customAP }