import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import moment from "moment";
import Alert from "react-bootstrap/Alert";

const Home = () => {
  const [data, setData] = useState([]);

  const [show, setShow] = useState(false);

  useEffect(() => {
    getUserData();
    
  }, []);
  const getUserData = async () => {
    const res = await axios.get("http://localhost:7000/getdata", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status == 201) {
      console.log("data get");
      setData(res.data.data);
    } else {
      console.log("error");
    }
  };

  const dltUser = async (id) => {
    console.log(id);
    const res = await axios.delete(`http://localhost:7000/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status == 201) {
      getUserData();
      setShow(true);
    } else {
      console.log("error");
    }
  };

  

  return (
    <>
    {
        show ?  <Alert variant="danger" onClose={() => setShow(false)} dismissible>User Delete</Alert> : ""
    }
      <div className="container mt-2">
        <h2 className="text-center mt-2">
         Update Your Profile
        </h2>

        <div className="text-end d-flex justify-content-between " >
          <Button variant="primary">
            <NavLink to="/student" className="text-decoration-none text-light">
              {" "}
              Back
            </NavLink>
          </Button>
          <Button variant="primary">
            <NavLink to="/register" className="text-decoration-none text-light">
              {" "}
              Add User
            </NavLink>
          </Button>
        </div>

        <div className="  align-iteams-center mt-5 row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-5">

        {
            data.length > 0 ? data.map((el ,i)=>{
                return (
                    <>
                    <Card style={{ width: "22rem", height: "18rem" }} className="mb-3  ms-5">
                    <Card.Img
                      src={`http://localhost:7000/Uploads/${el.userimg}`}
                      variant="top"
                      style={{ width: "100px", textAlign: "center", margin: "auto" }}
                      className="mt-2"
                    />
                    <Card.Body className="text-center">
                      <Card.Title>User Name : {el.username}</Card.Title>
                      <Card.Text>Date Added : {moment(el.data).format("DD-MM-YYYY")}</Card.Text>
                      <Button
                        variant="danger"
                        onClick={() => dltUser(el.id)}
                        className="col-lg-6 text-center"
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                    </>
                )
            }) : ""
        }
         
        </div>
      </div>
    </>
  );
};

export default Home;
