import React, {  useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { roleState } from "../store/roleState";
import { useRecoilState } from "recoil";
import {allEventState} from "../store/allEventState";


import { Button, Select,Form, Input,DatePicker,InputNumber } from "antd";

import "antd/dist/antd.min.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getDDandSum } from "../apis/getDDandSumApi";


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const { Option } = Select;

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const CreateDonation = () => {
const params=useParams();
const eventid=params.id;
const [allevent,setAllEvent] = useRecoilState(allEventState);

const { data, error, isError, isLoading } = useQuery(["u1",allevent.id], getDDandSum);
let today = new Date().toISOString()

useEffect(()=>{
  if(data)console.log(data);
},[data]);


const onChange = (date, dateString) => {
  console.log(date, dateString);
  console.log(typeof date);
  console.log(typeof dateString);
  

};
  const [form] = Form.useForm();

  const { mutate } = useMutation((i) => {
    return axios.put(`http://localhost:3000/api/v1/donation/${eventid}`, i, {
      headers: {
        //Authorization: "Bearer " + localStorage.getItem("google-token-popup-feature")//(bearer + token) sending to backend
        Authorization: localStorage.getItem("google-token-popup-feature")
          ? "Bearer " + localStorage.getItem("google-token-popup-feature")
          : "",
      },
    });
  });
  const onFinish = (values) => {
    //values.dueDate
    console.log("hii", values);
    console.log("values is" ,values)
    console.log("recoil eventstate is",allevent);
    console.log("donationsum",data.donationSum);
    //values={...values,dueDate:date,ngoId:role.ngoid};
    //console.log("values after" ,values)
    if(data.donationSum + values.amount >= allevent.targetFund) values={...values,status:"COMPLETED"};
            else if( today < data.dueDate )values={...values,status:"ON_TRACK"};
            else values={...values,status:"BEHIND"};
    console.log("after values",values);
    mutate(values);

  };

  const onReset = () => {
    form.resetFields();
  };
 

  const onFill = () => {
    form.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
  };
  if (isLoading) { (<h1>Loading</h1>)};
  if (isError) { (<h1>An error has occured</h1>)}

  return (
    <>
    <div style={{display:"flex",justifyContent:"center"}}>
        <h1 style={{fontSize:50,margin:0}}> Donation  for {allevent.name}</h1>
    </div>
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
     
      <Form.Item  //instead of this antd has donation field . code commented below
        name="amount"
        label="Amount"
        style={{ width: "50%" }}
        rules={[
          {
            type: 'number',
            message: 'The input is not valid number!',
          },
          {
            required: true,
            message: 'Please input your amount!',
          }
        ]}
      >
        <InputNumber min={1}  />
      </Form.Item>
      
     
      

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
   
      </Form.Item>
    </Form>
    
    </>
    
  );
};

export default CreateDonation;
/**
 *  <Form.Item
        name="donation"
        label="Donation"
        rules={[
          {
            required: true,
            message: 'Please input donation amount!',
          },
        ]}
      >
        <InputNumber
          addonAfter={suffixSelector}
          style={{
            width: '50%',
          }}
        />
      </Form.Item>
 * 
 * 
 * 
 *  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );
 * 
 */