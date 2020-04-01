import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import AddChild from './entry/AddChild';
import Layout from "antd/es/layout";
import "antd/es/layout/style/css";
import Breadcrumb from "antd/es/breadcrumb";
import "antd/es/breadcrumb/style/css";
import {axiosWithAuth} from "../utilities/axiosWithAuth";
// import '../index.css';
import './Dashboard.css';
import PetStatus from './petmoji/PetStatus';


const { Content } = Layout;

function Dashboard(props) {

  const [children, setChildren] = useState([]);

   useEffect(()=>{
        axiosWithAuth()
        .get(`/api/parents/children/${localStorage.getItem('user_id')}`)
        .then (res => {
            console.log(res)
            setChildren(res.data)
        })
        .catch(error => console.log(error, "ERROR"))
    }, [])

  const sendToForm = (child) => {
    props.history.push(`/entryform/${child.id}`)
  }


  return (
    

<Layout className="layout">
<Content>
  <Breadcrumb style={{ margin: "24px 0" }}></Breadcrumb>
  <div className="dashboard-parent">
    {children.map((child, index) => {
      console.log("********************", child)
      return (
        <div className='dashboard-card'
          key={index}>
            <Link to={`/entrylist/${child && child.id}`}>
              <PetStatus childId={child.id} />
              <h1>{child.name}</h1>
            </Link>
            <button onClick={e=>
              sendToForm(child)
            }
            >
              Add Food Entry
            </button>
        </div>
      )})}

      
    </div>
    <AddChild/>
</Content>
</Layout>
  );
}
export default Dashboard;
