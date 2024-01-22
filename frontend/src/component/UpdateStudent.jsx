import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const {id} =useParams()
  const navigate = useNavigate();

  const handleSumbit = () => {
    console.log(id)
    event.preventDefault();
    axios
      .put("http://localhost:7000/update/" + id, { name, email })
      .then((res) => {
        console.log(res);
        navigate("/student");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(()=>{
      axios.get("http://localhost:7000/student/" + id)
      .then((res) => {
        console.log("ggg",res.data.data[0]);
        setName(res?.data?.data[0]?.Name)
        setEmail(res?.data?.data[0]?.email)
       
      })
      .catch((err) => {
        console.log(err);
      });
  },[])
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center aligin-items center mh-10">
      <div className="w-50 bg-white rounded p-3  mt-3 mb-5">
      <button  className="btn btn-success" onClick={()=> navigate("/student")}>Back</button>
        <form onSubmit={handleSumbit}>
          <h2>Update Student</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              value={name}
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudent;
