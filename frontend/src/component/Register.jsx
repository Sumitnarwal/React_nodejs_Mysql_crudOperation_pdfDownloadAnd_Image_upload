import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [fname, setFname] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  const setData = (e) => {
    setFname(e.target.value);
    console.log(fname);
  };

  const setImgFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addUserData = async (e) => {
    e.preventDefault();

    var formData = new FormData();

    formData.append("photo", file);
    formData.append("fname", fname);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post(
      "http://localhost:7000/register",
      formData,
      config
    );

    if (res.data.status === 201) {
      navigate("/home");
    } else {
      console.log("error");
    }
  };
  return (
    <div className="container mt-3 w-50 bg-info p-5">
      <div className=" d-flex justify-content-end">
      <Button variant="primary">
      <NavLink to="/home" className="text-decoration-none text-light">
      {" "}
      Back
      </NavLink>
      </Button>
      </div>
      <h1>Upload your Image here</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            name="fname"
            onChange={setData}
            placeholder="Enter your name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Select your Image</Form.Label>
          <Form.Control
            type="file"
            name="photo"
            onChange={setImgFile}
            placeholder="choose file...."
          />
        </Form.Group>

        <Button variant="primary" onClick={addUserData} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
