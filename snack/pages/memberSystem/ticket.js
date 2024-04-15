import React, { useEffect,useState  } from 'react'
import Ticket from "@/components/memberS/ticket/ticket"
import SelectMenu from "@/components/memberS/person/selectMenu";
import TicketMobile from "@/components/memberS/ticket/mobile/ticket"
import classNames from 'classnames';
import styles from "@/styles/form.module.css"
import {ticket01Select01} from "@/api/ticket"

export default function Ticket01() {
  const [data,setdata]=useState([]); 
  useEffect(() => {
    (async function () {
    const result= await ticket01Select01();  
    if(result.success){ 
      setdata(result.data); 
    }else{
      setdata([]); 

    }
    console.log(result) 
     })();
  }, [])

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-xl-3">
            <SelectMenu />
          </div>
          <div className="col-12 col-xl-9">
          <div className={classNames("", styles["main-O-baground"])}>

            <Ticket data={data} />
            <TicketMobile    />

          </div>
        </div>
        </div>

      </div>
    </>
  )
}
