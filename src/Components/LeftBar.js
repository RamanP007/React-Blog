import React, { useState } from "react";
import pic from "../img/profile.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Posts from "./Posts";

const LeftBar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [list, setList] = useState(false);
  const [grid, setGrid] = useState(true);

  // Function to expand the sidbar

  function expand() {
    setSidebar(!sidebar);
  }

  // Function to change the toggle view

  function changeList() {
    setList(!list);
    setGrid(!grid);
  
  }
  function changeGrid() {
    setList(!list);
    setGrid(!grid);
  }

  return (
    <>
      <div className="Left">
        <div className={sidebar ? "left-navbar active" : "left-navbar"}>
          {/* //Profile Tab // */}
          <div className="profile">
            <div className="box">
              <img src={pic} alt="" />
              <div className="content">
                <h6>Hi Reader,</h6>
                <p>Here's your News!</p>
              </div>
            </div>
          </div>

          {/* List and Grid View */}
          <div className={sidebar ? "view active" : "view"}>
            <h5>View Toggle</h5>
            <div className="logo">
              <i
                className={list ? "fa fa-list-ul" : "fa fa-list-ul active"}
                onClick={changeList}
                aria-hidden="true"
              ></i>
              <i
                className={grid ? "fa fa-list-alt   " : "fa fa-list-alt active"}
                onClick={changeGrid}
                aria-hidden="true"
              ></i>
            </div>
          </div>

          {/* Feedback */}
          <div className="feedback">
            <h5>Have a Feedback?</h5>
            <Button className="btn expand" onClick={expand} variant="info">
              We're Listening!
            </Button>{" "}
          </div>
          
          {/* Feedback Form */}
          <div className={sidebar ? "container form active" : "container form"}>
            <Form>
              <h5>Thank You so much for taking the time!</h5>
              <p>Please Provide the below details</p>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              ></Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Button variant="primary " className="btn" type="submit">
                Submit Feedback
              </Button>
            </Form>
          </div>
        </div>
      </div>
      
      <Posts Grid={grid} sidebar={sidebar} />
    </>
  );
};

export default LeftBar;
