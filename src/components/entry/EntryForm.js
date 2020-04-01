import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../../utilities/axiosWithAuth";
import Layout from "antd/es/layout";
import "antd/es/layout/style/css";
import Breadcrumb from "antd/es/breadcrumb";
import "antd/es/breadcrumb/style/css";
import Form from "antd/es/form";
import "antd/es/form/style/css";
import Input from "antd/es/input";
import "antd/es/input/style/css";
import Button from "antd/es/button";
import "antd/es/button/style/css";
import '../../index.css';

const { Content } = Layout;

function EntryForm(props) {

  const [foodEntry, setFoodEntry] = useState({
    dairy: null,
    fruits: null,
    grains: null,
    proteins: null,
    vegetables: null,
    treats: null,

  });

  const handleChange = e => {
    setFoodEntry({
      ...foodEntry,
      [e.target.name]: e.target.value
    });
  };

  const postFood = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/api/parents/food/${props.match.params.childid}`, foodEntry)
      .then(res => {
        console.log("It's me, it's me...respect.", res.data)
        localStorage.setItem('child_id', res.data.child_id)
        props.history.push(`/dashboard/${localStorage.getItem('user_id')}`);
      })
      .catch(err => console.log(err));
  };


  console.log('props in entry form',props)

  return (
    <Layout className="layout">
      <Content className="foodentry-desktop-content" style={{ padding: "0 20px" }}>
        <Breadcrumb style={{ margin: "24px 0" }}></Breadcrumb>
        <div style={{ background: "#fff", padding: 24, minHeight: "90vh", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1>Enter Foods: </h1>

          <Form style={{ width: "20%" }} onSubmit={postFood} className="foodentry-form">
            <Form.Item>
              <Input
                placeholder="Dairy"
                name="dairy"
                value={foodEntry.dairy}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Fruits"
                name="fruits"
                value={foodEntry.fruits}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Grains"
                name="grains"
                value={foodEntry.grains}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Proteins"
                name="proteins"
                value={foodEntry.proteins}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Vegetables"
                name="vegetables"
                value={foodEntry.vegetables}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Treats"
                name="treats"
                value={foodEntry.treats}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Button
              style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}
export default EntryForm;