
  import {useData} from "@/pages/context/qrcodeProduct"
import { useEffect } from "react";

const ParentComponent = () => {
  const { data, setData } = useData(); // 修改為使用解構賦值，保持一致性
useEffect((v,i)=>{
  setData(3)
})
  return (
    <div>
      <h2>父组件 {data}</h2>
      {/* 在這裡使用 data 狀態 */}
    </div>
  );
};

export default ParentComponent;