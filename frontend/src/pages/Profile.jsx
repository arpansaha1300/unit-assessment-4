import axios from "axios";
import { useEffect } from "react"
const supplierid=4;
function Profile() {
  useEffect(()=>{
    const supplierdata=async()=>{
      const response=axios.get(`http://localhost:8080/api/suppliers/${supplierid}`);
      console.log((await response).data);
    }
    supplierdata();
  },[]);
  return (
    <div>
      Hii anubhav welcome to amdocs
      Profile page
    </div>
  )
}

export default Profile