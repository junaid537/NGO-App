import { atom } from "recoil";

export const allEventState = atom({
  key: "allEventState2",
  default: {id:0,createdAt:"",dueDate:"",name:"",targetFund:0}, //this is 'role' default value
});