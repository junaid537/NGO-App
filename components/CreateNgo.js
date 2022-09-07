import { useRecoilState } from "recoil";
import {useNavigate} from "react-router-dom"
import React from 'react';
import { useMutation } from "@tanstack/react-query";
import { roleState } from "../store/roleState";
import { Button, Form, Input, Space } from 'antd';
import "antd/dist/antd.min.css";
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getRole } from '../apis/loginApi';

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

const CreateNgo = () => {
  const [form] = Form.useForm();

  const navigate=useNavigate();
  const [role, setRole] = useRecoilState(roleState);
  const {
    data: roleData,
    isLoading: isroleLoading,
    isError: isroleError,
    error: roleError,
    refetch,
  } = useQuery(["unique-key345"], getRole,{enabled:false});
   
  const {mutate} = useMutation((i) => {
    return axios.put(
      `http://localhost:3000/api/v1/ngo/`,i,{
        headers: {
          //Authorization: "Bearer " + localStorage.getItem("google-token-popup-feature")//(bearer + token) sending to backend
          Authorization:localStorage.getItem("google-token-popup-feature")?("Bearer " + localStorage.getItem("google-token-popup-feature")):"",
    
        }
      }
    );
  },{
    onSuccess:async()=>{
      console.log("calling logout");
      //localStorage.clear();
      //window.location.href = '/';
      var { data, isLoading, isFetched } = await refetch();
      if(isFetched){
      console.log("roleData is ",data);
      setRole({...role,isAdmin:data.isAdmin,ngoid:data.ngoId});
      console.log("setRole in CreateNgo.js",role)
      navigate("/")
      }

    }
  });
  const onFinish = (values) => {
    console.log("hii",values);
    console.log("before setCreateNgo")
    //setRole({...role,isAdmin:true});
    console.log("after setCreateNgo")
    mutate(values,{onSuccess: async () => {
      //await queryClient.refetchQueries();
     
      //console.log("data in CreateNgo is ",data);
      //set the role
    }});
  }
      
      

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };
 

  return (
    <>
    <div style={{display:"flex",justifyContent:"center"}}>
        <h1 style={{fontSize:50,margin:0}}>Create Your NGO</h1>
    </div>
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} >
      <Form.Item
        name="name"
        label="Name"
      
        style={{width:"50%"}}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="city"
        label="City"
        style={{width:"50%"}}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="state"
        label="State"

        style={{width:"50%"}}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        

        label="Address"
        style={{width:"50%"}}
        rules={[
          {
            required: true,
            message: 'Please input Address',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>
    
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" >
          Fill form
        </Button>
      </Form.Item>
    </Form>
    </>

    
  );
};

export default CreateNgo;





















/*

import React from 'react'
import { roleState } from "../store/roleState";

import { useMutation } from "@tanstack/react-query";

import { useFormik } from "formik";
import axios from "axios";
import { useRecoilState } from 'recoil';
//import{useAddstate} from '../apis/statesApi.js';

export const CreateNgo = () => {
  const [role, setRole] = useRecoilState(roleState);

  const data = useMutation((i) => {
    return axios.put(
            `http://localhost:3000/api/v1/ngo/`
            ,i,{
        headers: {
          //Authorization: "Bearer " + localStorage.getItem("google-token-popup-feature")//(bearer + token) sending to backend
          Authorization:localStorage.getItem("google-token-popup-feature")?("Bearer " + localStorage.getItem("google-token-popup-feature")):"",
    
        }
      }
      
    );
  });
  // console.log(isError)
  // `https://ecommerce-junaid.herokuapp.com/api/products/${id}/states/create`
//https://obscure-refuge-62167.herokuapp.com/products/${id}/states
  const formik = useFormik({
    initialValues: {
      name: "",
      city: "", //properties correspond to name attribute of input fields
      state: "",
      address: "",
    },
    onSubmit: (values) => {
      //console.log("form data is ", id);
      data.mutate(
        {
          "name": values.name,
          "city": values.city,
          "state": values.state,
          "address": values.address,
          //"email":"mjunaidkhalidid18@gmail.com"
        }
        , {
        onSuccess: () => {
          console.log("success");
          alert("state Added!");
        },
        onError: (err) => {
          console.log(err.message);
        },
      });

      //console.log("values................", obj);
    },
  });

  return (
    <div className="state-from">
      <h3 style={{ marginLeft: "35px" }}>Create your NGO Buddy!!</h3>
      <form className="state-from" onSubmit={ formik.handleSubmit }>
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name"
          required
          onChange={ formik.handleChange }
          value={ formik.values.name }
        ></input>
        <label htmlFor="city">City :</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Enter city"
          required
          onChange={ formik.handleChange }
          value={ formik.values.city }
        ></input>
        <label htmlFor="state">state :</label>
        <input
          type="text"
          id="state"
          name="state"
          placeholder="Enter state"
          required
          onChange={ formik.handleChange }
          value={ formik.values.state }
        ></input>
        <label htmlFor="address">Address :</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Enter Address"
          required
          onChange={ formik.handleChange }
          value={ formik.values.address }
        ></input>
        <button id="btn" className="form-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};


export default CreateNgo;*/
