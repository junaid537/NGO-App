import axios from "axios";
//import { useRole } from "../store/roleState";

export const getDDandSum = async ({ queryKey }) => {
    //const [role, setRole]=useRole();
    console.log("going to call usequery...")
    const  {data}  = await axios.get(
      `http://localhost:3000/api/v1/event/${queryKey[1]}`,{
      headers: {
        //Authorization: "Bearer " + localStorage.getItem("google-token-popup-feature")//(bearer + token) sending to backend
        Authorization:localStorage.getItem("google-token-popup-feature")?("Bearer " + localStorage.getItem("google-token-popup-feature")):"",
        
      }
    }
  );
//console.log("role is ",data)
            //setRole(data.isAdmin);
            //console.log('recoil role is' ,role);
  return data;
};