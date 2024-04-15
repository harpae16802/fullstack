import mainApi from "./api";
const formUpdate=(formdata)=>{
  fetch(`${mainApi.API_URL}/backRoute/insertMemberForm`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formdata
})
.then(response => {
    if (!response.ok) {
        throw new Error('網路請求失敗');
    }
    return response.json();
})
.then(data => {
  return response.json({success:true,data:data});

})
.catch(error => {
    console.error('網路請求操作出現問題:', error);
    // 处理非 JSON 响应
    console.error('非 JSON 响应:', error.response);
});
}

export default {formUpdate}