import { atom } from "recoil";


export const roleState = atom({
  key: "roleState",
  default: {login:false,isAdmin:false,ngoid:0,email:"",userName:""}, //this is 'role' default value
});

// export const isLoggedIn=atom({
//   key:"login",
//   default:false,
// });


/*
export const useRole = () => {
  const [role, setRole] = useRecoilState(roleState);
  return [role, setRole];
};*/