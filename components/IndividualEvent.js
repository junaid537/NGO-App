import { useQuery } from "@tanstack/react-query";
import "antd/dist/antd.min.css";
import { useRecoilState } from 'recoil';
import { Card, Steps } from "antd";
import {myEventState} from "../store/myEventState"

import axios from "axios";
import { useEffect, useState } from "react";
import { getDDandSum } from "../apis/getDDandSumApi";
const { Step } = Steps;
const IndividualEvent = () => {
    const [myevent,setMyEvent] = useRecoilState(myEventState);
    const [tracker,setTracker]=useState(0);
  
    console.log("hello everyone!!!!!!!!!!!")
    let today = new Date().toISOString()
    const { data, error, isError, isLoading } = useQuery(["u",myevent.id], getDDandSum);

    useEffect(()=>{
        if(data){
            if(data.donationSum >= myevent.targetFund)setTracker(3)
            else if( today < data.dueDate )setTracker(1)
            else setTracker(2);
        }
       console.log("data",data);
    },[data,myevent,setTracker,today])

 

 
      if (isLoading) { (<h1>Loading</h1>)};
      if (isError) { (<h1>An error has occured</h1>)}
  console.log("data is in IndividualEvent ", data);
  console.log("recoil myevent is ", myevent);

  return(
    <div className="site-card-border-less-wrapper">
      <Card
        title={myevent.name}
        bordered={false}
        style={{
          fontSize:"20px",
          margin:"20px auto",
          width: "1100px",
        }}
      >
      
        <p>Created At : {myevent.createdAt}</p>
        <p>Due Date : {myevent.dueDate}</p>
        <p>Target Fund : {myevent.targetFund}</p>
        <h2>Current Status:</h2>
        <Steps current={tracker} status="error" style={{ marginTop: "30px" }}>
          <Step title="OnTrack" description="Still Time Left, Need More" />
          <Step title="Behind" description="Running Late, Deadline reached already" />
          <Step title="Completed" description="Target Fulfilled before deadline" />
        </Steps>
      </Card>
    </div>
  )
};
export default IndividualEvent;

/*
default: {id:0,createdAt:"",dueDate:"",name:"",targetFund:0},
useEffect(()=>{
        if(data){
            if(data.donationSum >= myevent.targetFund)setTracker(3)
            else if( today < data.dueDate )setTracker(1)
            else setTracker(2);
        }
       console.log("data",data);
    },[data,myevent,setTracker,today])
*/ 