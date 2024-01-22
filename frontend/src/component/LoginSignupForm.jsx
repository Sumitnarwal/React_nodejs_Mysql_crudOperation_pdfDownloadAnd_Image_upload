import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


const LoginSignupForm = ({setLogin}) => {
  const [isLogin, setIsLogin] = useState(true);
 const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    name: isLogin
      ? null
      : Yup.string()
          .required("Name is required")
          .matches(
            /^[a-zA-Z ]+$/,
            "Name should only contain letters and spaces"
          ),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: isLogin
      ? null
      : Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
  });

  useEffect(() => {
    
    formik.resetForm({
      values: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });
    formik.setErrors({});
  }, [isLogin]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form data submitted:", values);
     // let status = isLogin ? "login" : "signup";
 
      if(!isLogin){
        axios.post(
           `http://localhost:7000/signup` ,
          values,
      ).then((res)=>{
        console.log(res.data)
        Swal.fire({
          title: res.data.message,
          text: 'Please Login',
          icon: 'success', 
          confirmButtonText: 'Ok',
        });
        setIsLogin(!isLogin)
      }).catch((err) =>{
       console.log(err)
       Swal.fire({
          title: err.response.data.msg,
          text: 'Please use different email id',
          icon: 'failure', 
          confirmButtonText: 'Ok',
        });
       });
      }
      else{
        axios.post(
          `http://localhost:7000/login` ,
         values,
     ).then((res)=>{
       console.log(res.data)
       console.log(res.data.data[0].name)
       if(res.data.msg === "Success"){
         localStorage.setItem("name" , res.data.data[0].name)
         localStorage.setItem("isLogin","1")
         setLogin()
        navigate("/student")
      }else{
        Swal.fire({
          title: 'Login failed',
          text: 'Either user id or password is incorrect ',
          icon: 'error', 
          confirmButtonText: 'Ok',
        })
      }
     }).catch((err) => console.log(err));
        
      }

      
      // axios
      //   .post(
      //      `http://localhost:7000/${status}` ,
      //     values,
      // )
      //   .then((res) =>{ console.log(res)
      //   if(!isLogin){
      //     Swal.fire({
      //       title: 'User created',
      //       text: 'Please Login',
      //       icon: 'success', 
      //       confirmButtonText: 'Ok',
      //     });
      //     setIsLogin(!isLogin)
      //   }else{
      //     if(res.data === "Success"){
      //       navigate("/student")
      //     }else{
      //       Swal.fire({
      //         title: 'Login fail',
      //         text: 'User not exist',
      //         icon: 'failure', 
      //         confirmButtonText: 'Ok',
      //       })
      //     }
      //   }
      //   })
      //   .catch((err) => console.log(err));
    },
  });

  return (
    <div className= {`vh-100 ${isLogin ? 'bg-primary' : ''}`}>
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6 p-4">
          <div className="card">
            <div className="card-header">
              <h3>{isLogin ? "Login" : "Sign Up"}</h3>
            </div>
            <div className="card-body" style={{ backgroundColor: "#d8d8d8" }}>
              <form onSubmit={formik.handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formik.errors.name && formik.touched.name
                          ? "is-invalid"
                          : ""
                      }`}
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      //  required={!isLogin}
                    />
                    {formik.errors.name && formik.touched.name && (
                      <div className="invalid-feedback">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      formik.errors.email && formik.touched.email
                        ? "is-invalid"
                        : ""
                    }`}
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    //  required
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      formik.errors.password && formik.touched.password
                        ? "is-invalid"
                        : ""
                    }`}
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    //  required
                  />
                  {formik.errors.password && formik.touched.password && (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        formik.errors.confirmPassword &&
                        formik.touched.confirmPassword
                          ? "is-invalid"
                          : ""
                      }`}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      //   required={!isLogin}
                    />
                    {formik.errors.confirmPassword &&
                      formik.touched.confirmPassword && (
                        <div className="invalid-feedback">
                          {formik.errors.confirmPassword}
                        </div>
                      )}
                  </div>
                )}
                <button type="submit" className="btn btn-primary">
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </form>
            </div>
            <div className="card-footer">
              <p>
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <span
                  className="link-primary"
                  onClick={() => setIsLogin(!isLogin)}
                  style={{ cursor: "pointer" }}
                >
                  {isLogin ? "Sign up here" : "Login here"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;
