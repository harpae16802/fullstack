// https://andy6804tw.github.io/2017/12/21/js-tutorial-part4/
const dayjs = require('dayjs')
console.log(dayjs("2020-3").endOf('month').format('DD'))
const  years = () => { 
  const nowYear = (dayjs().year())-1900+1
    return Array(nowYear).fill(1).map((v,i)=>{
        return 1900+i;
    })
  };
  
  const month = () => { 
    return Array(12).fill(1).map((v,i)=>{
      return i+1;
  })
  };
  const date=(y,m)=> { 
    const lastDayOfMonth = dayjs(`${y}-${m}`).endOf('month').format('DD'); 
    if(parseInt(lastDayOfMonth)){
         return Array(parseInt(lastDayOfMonth)).fill(1).map((v,i)=>{
      return i+1;
  })
    }else{
      return []
    }
 
  };
  
  export default { years, month, date };
  