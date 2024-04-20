 
import Image from "next/image";
import SelectMenu from "@/components/memberS/person/selectMenu";
//  import PersonForm from "@/components/personForm";
import CreditComponts from "@/components/memberS/creditForm";
import Section from "@/components/layout/section";

export default function Home() {
 return (
   <Section>
     <div className="container">
       <div className="row">
         <div className="col-md-3">
           <SelectMenu/>
         </div>
         <div className="col-md-1"></div>
         <div className="col-md-8">
         <CreditComponts/>

         </div>
       </div>
     </div>
   </Section>
 );
}
