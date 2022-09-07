import "./index.css";
import MainRoutes from "./MainRoutes";
import { useLocation, useNavigate, Route, Routes } from 'react-router-dom'
import { Login } from "./pages/Login";
import MyNgo from "./components/MyNgo";
import CreateNgo from "./components/CreateNgo";
import CreateEvent from "./components/CreateEvent";

import AllEvents from "./components/AllEvents";
import IndividualDonations from "./components/IndividualDonations";
import MyDonations from "./components/MyDonations";

import { isLoggedIn } from "./store/roleState";
import { roleState } from "./store/roleState";
import {auth } from './firebase';
import { useRecoilState } from "recoil";
import { Avatar, Layout, Menu, Space } from "antd";
import {HomeOutlined} from '@ant-design/icons';
import { Typography } from "antd";
import "antd/dist/antd.min.css";
import MyEvents from "./components/MyEvents";
import CreateDonation from "./components/CreateDonation";
import IndividualEvent from "./components/IndividualEvent";
import { useEffect } from "react";
import  NavBar  from "./components/NavBar";
import CreateAdmins from "./components/CreateAdmins";
import {getAuth,onAuthStateChanged} from "firebase/auth"
import { useQuery } from "@tanstack/react-query";
import {getRole} from "./apis/loginApi"
function App() {
  let navigate = useNavigate();
  //const auth=getAuth()
  //const [loginStatus,setLoginStatus] = useRecoilState(isLoggedIn);
  const [role,setRole] = useRecoilState(roleState);
   useEffect(()=>{
      console.log("useEffect of createNgo is running ",role)
      //console.log("Appp.js ka loginStatus",loginStatus)
   },[role])

   //const location =useLocation();
   const {
    data,
    isLoading: isroleLoading,
    isError: isroleError,
    error: roleError,
  } = useQuery(["unique-key"], getRole);

   useEffect(()=>{
    //setRole({login:true,isAdmin:true,ngoid:data?.ngoId,email:auth.currentUser.email,userName:auth.currentUser.displayName}) 

    onAuthStateChanged(auth,(user)=>{
      if(user){
        if(data.isAdmin===true)
          setRole({login:true,isAdmin:true,ngoid:data?.ngoId,email:user.email,userName:user.displayName}) 
        else
          setRole({login:true,isAdmin:false,ngoid:data?.ngoId,email:user.email,userName:user.displayName}) 

          //console.log("role in App.js",role);

      }
      // if(user){
      //   setRole({isAdmin:true,ngoid:data.ngoId,email:user.email,userName:user.displayName});

      // }
      else{
        console.log("no user Logged in")////////////This is never executing

      }
    })
   },[data])
 
   
  //  window.addEventListener("beforeunload", (event) => {
  //   localStorage.setItem('current',location.pathname);
  // });

  const { Title } = Typography;
  const handleSignOut=()=>{
    console.log("hello signout")
     localStorage.clear();
     auth.signOut();
    // //localStorage.clear();
  auth.currentUser.delete();
    // //setRole({});
     window.location.href='/';

  }
  const { Header, Footer, Sider, Content } = Layout;
 
  
  //console.log(loginStatus)
  return (
    <>
    {console.log("App.js mei admin aur ngoid aur login",role.isAdmin,role.ngoid,!role.login)}
    {!role.login ?
     (<Routes>
      <Route path="/" element={<Login />} />
     </Routes>)
     :
    (<Layout>
      <Header> <Title level={3} style={{color:"white" ,padding:"10px"}}><NavBar/></Title></Header>
      <Layout>
        <Sider style={{backgroundColor:"white"}} >
        <Menu
        mode="inline"
        theme="light"
        defaultSelectedKeys={['1']}
        items={[
        {label:"Home", key:"1",icon:<HomeOutlined /> ,children:[
          {label:"All Events", key:"11",onClick:()=>{navigate('/allevents')}},
          {label:"My Donations", key:"12",onClick:()=>{navigate('/mydonations')}}
          ]} ,
        role.isAdmin ?
        {label:"MyNgo", key:"7",danger:true,children:[
          {label:"My Events", key:"71",onClick:()=>{/*console.log("my events clicked")*/navigate('/myevents')}},
          {label:"Individual Donations", key:"72",onClick:()=>{navigate('/donations')}},
          {label:"Create Event", key:"73",onClick:()=>{navigate('/createevent')}}
          ]}
          :
          {label:"createNgo", key:'8',danger:false,onClick:()=>{navigate('/createngo')}},
          {label:"SignOut", key:"6",danger:true,onClick:()=>{handleSignOut()}},
        ]}
        > </Menu>
        </Sider>
        <Layout>
          <Content>
            <Routes>
              <Route path="/home" element={<AllEvents />}/>
              <Route path="/allevents" element={<AllEvents />}/>

              <Route path="/myevents" element={<MyEvents />}/>
              <Route path="/createevent" element={<CreateEvent />}/>
              <Route path="/:id" element={<IndividualEvent />}/>
              <Route path="/mydonations" element={<MyDonations />}/>
              <Route path="/allevents/individualevent/:id" element={<CreateDonation />}/>
              <Route path="/donations" element={<IndividualDonations />}/>
              <Route path="/createngo" element={<CreateNgo />} />
              <Route path="/createadmins" element={<CreateAdmins />} />

            </Routes>
          </Content>
          {/*<Footer>Footer</Footer>*/}
        </Layout>
      </Layout>
    </Layout>)}
    
       
        {/*console.log("app.js ka loginStatus",loginStatus)*/}
        {/*console.log("app.js ka role",role)*/}


    </>

  );
}

export default App;
