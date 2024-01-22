import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSumbit = () => {
    console.log(name,email)
    event.preventDefault();

    if(name == "" || email == ""){
      alert("Please fill the bellow details")
      return;
    }
    axios
      .post("http://localhost:7000/create", { name, email })
      .then((res) => {
        console.log(res);
        navigate("/student");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3 h-1 mt-3 mb-5">
        <form onSubmit={handleSumbit}>
       { <button className="btn btn-success" onClick={()=> navigate("/student")}>Back</button> }
          <h2>Add Student</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="btn btn-success" >Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateStudent;
