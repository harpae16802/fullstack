import React from 'react'
import Ticket from "@/components/memberS/ticket/ticket2"
import TicketMobile from "@/components/memberS/ticket/mobile/ticket2"
import SelectMenu from "@/components/memberS/person/selectMenu";

export default function ticket() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-xl-3 ">
            <SelectMenu />
          </div>
          <div className="col-12 col-xl-9">
          <div className={classNames("", styles["main-O-baground"])}>

            <Ticket />
            <TicketMobile />

          </div>
          </div>
        </div>

      </div>
    </>
  )
}
