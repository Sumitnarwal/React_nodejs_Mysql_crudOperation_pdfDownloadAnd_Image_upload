import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";

const Student = ({setLogout}) => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filterterm, setFilterterm] = useState("");
  const [userName , setUserName] = useState("")
  const [sort, setSort] = useState(true);
const navigate=useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);

  useEffect(() => {
    let username = localStorage.getItem("name")
    setUserName(username)
   
    axios
      .get("http://localhost:7000/")
      .then((res) => {
        console.log(res.data);
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const filteredStudents = students?.filter((student) =>
      student.Name.toLowerCase().includes(filterterm.toLowerCase())
    );
    setFilteredStudents(filteredStudents);
  }, [students, filterterm]);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:7000/student/" + id);
      Swal.fire({
        title: "",
        text: " Student Delete successfully",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((res) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };


  const handleLogout=()=>{
    setLogout()
    navigate("/")
  }
  const handleSort = () => {
     if(sort) {
      const ascendingOrder = students
        .slice()
        .sort((a, b) => a.Name.localeCompare(b.Name));
      setFilteredStudents(ascendingOrder);
    } else {
      const descendingOrder = students
        .slice()
        .sort((a, b) => b.Name.localeCompare(a.Name));
      setFilteredStudents(descendingOrder);
    }
    setSort(!sort);
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    const header = ["S.No", "Name", "Email"];
    const data = currentStudents.map((student, i) => [
      i + 1,
      student.Name,
      student.email,
    ]);

    pdf.text("Student Data", 14, 10);

    pdf.autoTable({
      head: [header],
      body: data,
      startY: 20,
    });

    pdf.save("student_data.pdf");
  };

  const generatePDF2 = () => {
    axios
      .get("http://localhost:7000/generate-pdf", { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "students.pdf");
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const handleFilterChange = (e) => {
    setFilterterm(e.target.value);
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="d-flex flex-column vh-100 bg-primary justify-content-center align-items-center ">
    <div className="w-50 bg-white p-3 mb-1 rounded d-flex justify-content-between">
    <h4>Hii {userName}</h4>
    <button className="ms-3 btn  btn-primary" onClick={handleLogout}>Logout</button>
    </div>
      <div className="w-50  bg-white rounded p-3 ">
        <div className="d-flex   justify-content-between">
        <div>
        <Link to="/create" className="btn btn-success ">
        ADD +
        </Link>
        <Link to="/home" className="btn btn-success ms-2">
        ADD Photos
        </Link>
        </div>
          <div>
            <input
              placeholder="Search by name....."
              value={filterterm}
              onChange={handleFilterChange}
            />
            
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th onClick={handleSort}>Name↓↑</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((data, i) => (
              <tr key={i}>
                <td>{indexOfFirstStudent + i + 1}</td>
                <td>{data.Name}</td>
                <td>{data.email}</td>
                <td>
                  <Link to={`/update/${data.ID}`} className="btn btn-primary">
                    Update
                  </Link>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(data.ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(filteredStudents.length / studentsPerPage) },
              (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
          <button className="btn btn-primary ms-2" onClick={generatePDF}>
            Download pdf
          </button>
          <button onClick={generatePDF2}>Download pdf backend</button>
        </div>
      </div>
    </div>
  );
};

export default Student;
