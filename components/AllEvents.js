import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
    DollarOutlined 

  } from "@ant-design/icons";
  import axios from "axios";

  import {allEventState} from "../store/allEventState";

  import { useQuery } from "@tanstack/react-query";
  import { Avatar, Card,List } from "antd";
  import React from "react";
  import "antd/dist/antd.min.css";

  import { Button, Input, Space, Table ,Icon} from "antd";
  import { useNavigate ,Link} from "react-router-dom";
  import { useRecoilState } from "recoil";
  
  
  const { Meta } = Card;
  const AllEvents = () => {
    const navigate = useNavigate();
    const [allevent,setAllEvent] = useRecoilState(allEventState);


    const { isLoading, error, isError, data } = useQuery(
        ["unique"],
        async () => {
        const {data} = await axios.get(`http://localhost:3000/api/v1/event`, {
    
        headers: {
          //Authorization: "Bearer " + localStorage.getItem("google-token-popup-feature")//(bearer + token) sending to backend
          Authorization:localStorage.getItem("google-token-popup-feature")?("Bearer " + localStorage.getItem("google-token-popup-feature")):"",
        }
      }
      )
      console.log(data);
      return data;
    }
      );
      if (isLoading) return "Loading";
      if (isError) return "An error has occured " + error.message;
    return (
        <>
        <div style={{display:"flex",justifyContent:"center"}}>
        <h1 style={{fontSize:50,margin:0}}>All Events</h1>
        </div>
        <List
        grid={{ gutter: 16, column: 3 }}
        style={{width:"1000px",margin:"20px auto"}}
        dataSource={data}
        renderItem={item => (
          <List.Item >
        <Card
          title={item.ownedBy.name}
          className="card"
          style={{ width: 300 ,marginTop:60}}
          cover={
            <img
              alt="example"
              src={item.image}
            />
          }
          actions={[
            <DollarOutlined  key="setting" onClick={(e)=>{setAllEvent({id:item.id,createdAt:item.createdAt,dueDate:item.dueDate,name:item.name,targetFund:item.targetFund});navigate(`/allevents/individualevent/${item.id}`)}}/>,
            //<EditOutlined key="edit" />,
            //<EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            description={
              <>
               <h3>{item.name}</h3>
               <h3>Fund Needed: {item.targetFund}</h3>
               <h3>Before:{item.dueDate}</h3>
              </>
            }
          />
        </Card>
        </List.Item>
    )}
  />
     </>
    );
  };
  
  export default AllEvents;
  





//removing grid and putting style in list




/*import { Card, List } from 'antd';
import React from 'react';
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 4',
  },
];

const AllEvents= () => {

    const { isLoading, error, isError, data } = useQuery(
        ["unique1"],
        async () => {
        const {data} = await axios.get("http://localhost:3000/api/v1/event", {
    
        headers: {
          Authorization: "Bearer " + localStorage.getItem("google-token-popup-feature")//(bearer + token) sending to backend
          //Authorization:localStorage.getItem("google-token-popup-feature")?("Bearer " + localStorage.getItem("google-token-popup-feature")):"",
        }
      }
      )
      console.log(data)
      return data;
    }
      );
      if (isLoading) return "Loading";
      if (isError) return "An error has occured " + error.message;
      return(
  <List
    grid={{ gutter: 16, column: 4 }}
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <Card title={item.name}>Card content</Card>
      </List.Item>
    )}
  />
   ); }

export default AllEvents;*/