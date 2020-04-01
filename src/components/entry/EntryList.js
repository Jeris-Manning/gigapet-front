import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEntry, putEntry, deleteEntry } from "../../actions/entryActions";
import Layout from "antd/es/layout";
import "antd/es/layout/style/css";
import Breadcrumb from "antd/es/breadcrumb";
import "antd/es/breadcrumb/style/css";
import Button from "antd/es/button";
import "antd/es/button/style/css";
import Modal from "antd/es/modal";
import "antd/es/modal/style/css";
import Form from "antd/es/form";
import "antd/es/form/style/css";
import Input from "antd/es/input";
import "antd/es/input/style/css";
import '../../index.css';
import './EntryList.css';

const { Content } = Layout;

function EntryList(props) {
  const [span, setSpan] = useState("month")
  const [visible, setVisible] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState(null);
  const [foodEntry, setFoodEntry] = useState({
    dairy: null,
    fruits: null,
    grains: null,
    proteins: null,
    vegetables: null,
    treats: null
  });

  const handleChange = e => {
    setFoodEntry({
      ...foodEntry,
      [e.target.name]: e.target.value
    });
  };

  const state = useSelector(state => {
    return {
      entryData: state.entryData,
      isFetching: state.isFetching,
      error: state.error
    };    
  });

// localStorage.getItem('child_id')

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEntry(props.match.params.id, span));
    console.log('Entry Data Log:', props.match.params);
  }, [state.entryData.length, span]);

  // console.log('State.entryData Returned', state.entryData);

  const entryEdit = (e) => {
    e.preventDefault()
    dispatch(putEntry(entryToEdit, foodEntry));
  };

  const entryDelete = id => {
    console.log(id);
    dispatch(deleteEntry(id));
  };

  const showModal = id => {
    setVisible(true);
    setEntryToEdit(id);
  };

  const handleOk = e => {
    e.preventDefault()
    dispatch(putEntry(entryToEdit, foodEntry));
    setVisible(false);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  const timespanDay = () => {
    console.log("I can haz fun today?")
    setSpan('day')
  }

  const timespanWeek = () => {
    console.log("I can haz fun last week?")
    setSpan('week')
  }

  const timespanMonth = () => {
    console.log("I can haz fun last month?")
    setSpan('month')
  }

  console.log('Homies be frontin all', span)

  return (
    <Layout className="layout">
      <Content className="home-desktop-content" style={{ padding: "0 20px" }}>
        <Breadcrumb style={{ margin: "24px 0" }}></Breadcrumb>
        <div
          // style={{
          //   background: "#fff",
          //   padding: 24,
          //   minHeight: "80vh",
          //   display: "flex",
          //   flexDirection: "column",
          //   alignItems: "center",
          //   justifyContent: "center"
          // }}
          
        >
          <h1>My Kids' Food Entries: </h1>

          <div className='entry-list-div'>
            <button className='entry-list-btn mybtn' onClick={timespanDay}>Today</button>
            <button className='entry-list-btn mybtn' onClick={timespanWeek}>Last 7 Days</button>
            <button className='entry-list-btn mybtn' onClick={timespanMonth}>Last 30 Days</button>
          </div>

          <div className="entry-card-holder">
          {state.entryData.length > 0 &&
            state.entryData.map(
              (
                {
                  id,
                  date,
                  dairy,
                  fruits,
                  grains,
                  proteins,
                  vegetables,
                  treats,
                  child_id
                },
                index
              ) => {
                return (
                  <div className='entry-list-card' key={index}>
                    <p>Date: {date}</p>
                    <p>Dairy: {dairy} servings</p>
                    <p>Fruits: {fruits} servings</p>
                    <p>Grains: {grains} servings</p>
                    <p>Protiens: {proteins} servings</p>
                    <p>Vegetables: {vegetables} servings</p>
                    <p>Treats: {treats} servings</p>
                    {console.log("HEY LOOK AT ME", child_id)}
                    <Button type="primary" onClick={() => showModal(id)}>
                      Edit Food Entry
                    </Button>
                    <Modal
                      title="Edit Your Entry"
                      visible={visible}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      <Form
                        style={{ width: "20%" }}
                        onSubmit={entryEdit}
                        className="foodentry-form"
                      >
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
                        </Form.Item>
                      </Form>
                    </Modal>
                    <Button
                    
                      onClick={() => {
                        entryDelete(id);
                      }}
                    >
                      Delete Food Entry
                    </Button>
                  </div>                
                );
              }
            )}
        </div>
        </div>
      </Content>
    </Layout>
  );
}
export default EntryList
