 
import Image from "next/image";
import { Inter } from "next/font/google";    
const inter = Inter({ subsets: ["latin"] });

export default function Home({title,cx="12",mx="12",bindErr}) {
  return (
    <>
<div class="input-group mb-3"> 
  <select class="form-select" id="inputGroupSelect02">
    <option selected>title</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
  <label class="input-group-text" for="inputGroupSelect02">Options</label>
</div> 
 
    </>
  );
}
