import React, {  useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { roleState } from "../store/roleState";
import { useRecoilState } from "recoil";


import { Button, Form, Input,DatePicker,InputNumber } from "antd";
import "antd/dist/antd.min.css";
import axios from "axios";


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const CreateEvent = () => {
  const [date,setDate]=useState("")
  const [role, setRole] = useRecoilState(roleState);

const onChange = (date, dateString) => {
  setDate(dateString)
  console.log("role is ",role);
  console.log(date, dateString);
  console.log(typeof date);
  console.log(typeof dateString);
  

};
  const [form] = Form.useForm();

  const { mutate } = useMutation((i) => {
    return axios.post(`http://localhost:3000/api/v1/event/`, i, {
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
    values={...values,dueDate:date,ngoId:role.ngoid}
    console.log("values after" ,values)

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

  return (
    <>
    <div style={{display:"flex",justifyContent:"center"}}>
        <h1 style={{fontSize:50,margin:0}}>Create Your Event</h1>
    </div>
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Name"
        style={{ width: "50%" }}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        name="image"
        label="Event Image"
        style={{ width: "50%" }}
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>
       
      <Form.Item
        name="targetFund"
        label="Target Fund"
        style={{ width: "50%" }}
        rules={[
          {
            type: 'number',
            message: 'The input is not valid number!',
          },
          {
            required: true,
            message: 'Please input your amount!',
          },
        ]}
      >
        <InputNumber min={1}  />
      </Form.Item>
      
        
      <Form.Item
        name="dueDate"
        label="Due Date"
        style={{ width: "50%" }}
        rules={[
          {
            required: true,
          },
        ]}
      >
      <DatePicker  format="YYYY-MM-DD" onChange={onChange} />
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

export default CreateEvent;
/**
 * 
 * const [date,setDate]=useState(
  ""
)
useEffect=(()=>{

},[date])
 */