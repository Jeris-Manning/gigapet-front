import React, { useState } from "react";
import { axiosWithAuth } from "../../utilities/axiosWithAuth";
import '../../index.css';
import './AddChild.css';

const AddChild = () => {
  const parentId = localStorage.getItem("user_id");

  const [child, setChild] = useState({
    name: "",
    parent_id: parentId
  });

  const handleChange = e => {
    setChild({
      ...child,
      [e.target.name]: e.target.value
    });
  };

  const addChild = e => {
    // e.preventDefault();
    axiosWithAuth()
      .post("/api/parents/child", child)
      .then(res => {
        console.log('HERE HERE HERE ADD CHILD:', res.data);
      })
      .catch(err => console.log(err));
  };

  

  return (
    <div>
      <section>
        <form onSubmit={addChild} className='child-card'>
          <input className='child-form-input'
            type="text"
            name="name"
            placeholder="Child's name"
            value={child.name}
            onChange={handleChange}
          />
          <button type='submit' className='add-child-btn'>Add Child</button>
        </form>
      </section>
    </div>
  );
};

export default AddChild;
