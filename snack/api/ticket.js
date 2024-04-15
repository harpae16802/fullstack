import mainApi from "./api";

const ticket01Select01=()=>{
 return fetch(`${mainApi.API_URL}/ticket/ticket01Select01`)
.then(response => {
    if (!response.ok) {
        throw new Error('網路請求失敗');
    }
    return response.json();
})
.then(data => {
  return {success:true,data:data.allResult};

})
.catch(error => {
    console.error('網路請求操作出現問題:', error); 
    console.error('非 JSON 响应:', error.response);
});
}

export {ticket01Select01}