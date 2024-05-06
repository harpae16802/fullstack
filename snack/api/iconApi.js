import mainApi from "./api";

const iconapi = async () => {
    try {
        const response = await fetch(`${mainApi.API_URL}/selectCustom`); 
        const data = await response.json();
     
    } catch (error) {
        console.log('網路請求失敗');

        // 处理非 JSON 响应
        console.error('非 JSON 响应:', error.response);
        // 将错误继续传播
        throw error;
    }
}

export default iconapi;