import React from "react";
import { Link } from "react-router-dom";
import Layout from "antd/es/layout";
import "antd/es/layout/style/css";
import Menu from "antd/es/menu";
import "antd/es/menu/style/css";
import Button from "antd/es/button";
import "antd/es/button/style/css";
import './Navigation.css';
import styled from 'styled-components';
import '../index.css';

const { Header } = Layout;

const MenuStyle = styled.menu`
background-color: #333;
overflow: hidden;
`;

const Navigation = props => {
  const removeCred = () => {
    localStorage.removeItem("token");
    props.setIsAuthenticated(false);
    props.history.push(`/`);
  };

  return (
    // <div>
    //   <div className="nav">
    //     <div>
    //     <NavLink to={`/dashboard/${localStorage.getItem("user_id")}`}>Dashboard</NavLink>
    //     </div>
    //     <div>
    //     {/* <NavLink to={`/entryform/${localStorage.getItem("user_id")}`}>Entry Form</NavLink> */}
    //     </div>
    //     <div>
    //     <NavLink to={`/entrylist/${localStorage.getItem("user_id")}`}>Entry List</NavLink>
    //     </div>
    //     <div>
    //     {props.isAuthenticated && <button type="submit" onClick={()=>removeCred()} >Logout</button>}

    //     </div>
    //   </div>
    // </div>
    <>
      {localStorage.getItem('token') && (
        
          <Header style={{ padding: 0 }}>
            <div className="logo" />
            <Menu
            className='menu'
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">
                <Link to={`/dashboard/${localStorage.getItem("user_id")}`}>
                  Dashboard
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={`/entrylist/${localStorage.getItem("user_id")}`}>
                  Entry List
                </Link>
              </Menu.Item>
              <Button className='menu-logout'  htmlType="submit" onClick={() => removeCred()}>
                Logout
              </Button>
            </Menu>
          </Header>
       
      )}
    </>
  );
};

export default Navigation;
