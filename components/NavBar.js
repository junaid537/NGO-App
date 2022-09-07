import { Avatar,Button } from 'antd'

import { roleState } from "../store/roleState";

import React from 'react'
import { useRecoilState } from 'recoil';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CreateAdmins from './CreateAdmins';

const NavBar = () => {
  const [role] = useRecoilState(roleState);
  const navigate= useNavigate();
  console.log("in navbar",role.userName);

  console.log('role.userName from navbar',role.userName );

  return (
    <div style={{display:"flex",justifyContent:"space-between"}}>
      <div style={{marginTop:"6px"}}>Home For NGOs</div>
      <div>
        <Avatar size={40} src="https://joeschmoe.io/api/v1/random" style={{ color: '#f56a00',backgroundColor: '#fde3cf'}}>U</Avatar>
        <span style={{marginLeft:"9px",fontSize:"14px",marginRight:"9px"}}>Hello {role.userName} ,wats up?</span>
        {role.isAdmin && <Button type="primary" danger onClick={()=>{navigate('/createadmins')}}>Create Admins</Button>}
      </div>
    </div>
    
  )
}

export default NavBar
// need to insert image column in database , and get profile pic from there     

//