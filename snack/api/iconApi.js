import mainApi from "./api";

const iconapi = async () => {
    try {
        const response = await fetch(`${mainApi.API_URL}/selectCustom`); 
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.error('网络请求操作出现问题:', error);
        // 处理非 JSON 响应
        console.error('非 JSON 响应:', error.response);
        // 将错误继续传播
        throw error;
    }
}

export default iconapi;