import React, { useEffect, useRef,useState } from 'react'
import axios from "axios";
import {myEventState} from "../store/myEventState"
import { roleState } from "../store/roleState";
import { useQuery } from "@tanstack/react-query";
//localhost:3000/api/v1/event/?ngoId=2
import "antd/dist/antd.min.css";
import { useRecoilState } from 'recoil';
import {SearchOutlined} from "@ant-design/icons"
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';

const MyDonations = () => {
    const [role,setRole] = useRecoilState(roleState);
    const [myevent,setMyEvent] = useRecoilState(myEventState);

    const [dataSource,setDataSource]=useState([])
    const [filteredInfo,setFilteredInfo]=useState("");
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const navigate =useNavigate();
    //useEffect(()=>{
      //  setDataSource(data);
    //},[])
    useEffect(() => {
      //console.log("useEffect ka role",role);
      console.log("useEffect ka myevent",myevent);
  
      //setRole(role);
    }, [myevent]);
    const { isLoading, error, isError, data } = useQuery(
        ["unique78"],
        async () => {
        const {data} = await axios.get(`http://localhost:3000/api/v1/donation`, {
    
        headers: {
          Authorization: "Bearer " + localStorage.getItem("google-token-popup-feature")//(bearer + token) sending to backend
          //Authorization:localStorage.getItem("google-token-popup-feature")?("Bearer " + localStorage.getItem("google-token-popup-feature")):"",
        }
      }
      )
      return data;
    }
      );
      if (isLoading) return "Loading";
      if (isError) return "An error has occured " + error.message;

    /*
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        fetch(`http://localhost:3000/api/v1/event/?ngoId=${role.ngoid}`)
        .then(response=>response.json())
        .then(data=>{setDataSource(data)})
        .catch(err=>{console.log(err)})
        .finally(()=>{setLoading(false)})
    },[role.ngoid])*/
    
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };
    
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div
            style={{
              padding: 8,
            }}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({
                    closeDropdown: false,
                  });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1890ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });



    const columns=[
        {
            key:"1",
            title:'id',
            dataIndex:'id',
            //render: (d) => <div className="btn-wrap" style={{ width: "200px" }}><Button onClick={(e) => { console.log("column click", e.target.value, d) }}>Click</Button></div>

        },
        {
            key:"2",
            title:'Paid At',
            dataIndex:'createdAt',
            ...getColumnSearchProps('createdAt'),
           
        },
        {
            key:"3",
            title:'Amount',
            dataIndex:'amount'
        },
        {
            key:"4",
            title:'Event Name',
            dataIndex:'event',
            sorter:(record1,record2)=>{return record1.userId >record2.userId}
        },
       

    ]
  return (
    <>
     <div style={{display:"flex",justifyContent:"center"}}>
        <h1 style={{fontSize:50,margin:0}}>My  Donations</h1>
    </div>
    <div className='table'>
      {/*hi my events {console.log(' hi my events ',role)}*/}
      <Table
        columns={columns}
        dataSource={data}
        bordered="true"
        pagination= { {pageSizeOptions: ['3', '4'], showSizeChanger: true}} 
        onRow={(record, recordIndex) => ({
            //onClick: event => { console.log("onRow onClick", event.target, event.target.className, record, recordIndex) } 
            onClick: event => { console.log("onRow onClick", record)} 
                /*now store record in atom and then use in myevents/record.id */
          })}
     > </Table>
    </div>
    </>
    
  )
}

export default MyDonations
