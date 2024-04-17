 
 

export default function Input({title,cx="12",mx="12",bindErr}) {
  return (
    <> 


      <div className={`col-${cx} col-md-${mx}`}>
        <label htmlFor="exampleInputEmail1" className="form-label">{title}</label> 
     <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text"> with anyone else.</div> 
     </div> 
   
     

    </>
  );
}
