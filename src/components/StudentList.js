import { useEffect, useRef, useState } from "react";
import StudentModal from "./StudentModal";

const StudentList = () => {
  const [studentList, setStudentList] = useState([
    { name: "Tân", phone: "0123456789", email: "tan@gmail.com" },
    { name: "Minh", phone: "0987777656", email: "minh123@gmail.com" },
    { name: "Nam", phone: "0986665457", email: "nam@gmail.com" },
    { name: "Hoang", phone: "0987769089", email: "hoangom@gmail.com" },
    { name: "Hồng Tin", phone: "0358888375", email: "tintin@gmail.com" },
    { name: "Quyết", phone: "0985792693", email: "quyet0226@gmail.com" },
    { name: "Nguyên", phone: "0987715009", email: "nguyen@gmail.com" },
  ]);

  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [indexSelected, setIndexSelected] = useState(-1);
  const [isValid, setIsValid] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const closeModal = useRef(null);

  useEffect(() => {
    const { name, phone, email } = form;
    const isValid = name && phone && email;
    setIsValid(isValid);
  }, [form]);

  useEffect(() => {
    document.title = "Student List";
  }, []);

  const handleSelect = (studentSelected, index) => {
    setForm({ ...studentSelected });
    setIndexSelected(index);
  };

  const handleChange = (event) => {
    const newForm = { ...form };
    newForm[event.target.name] = event.target.value;
    setForm({
      ...newForm,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      let newList = [...studentList];


      if (indexSelected > -1) {
        newList.splice(indexSelected, 1, form);
      } else {
        newList.push(form);
      }
      newList.sort((a, b) => a.name.localeCompare(b.name));
      setStudentList(newList);
      setForm({ name: "", phone: "", email: "" });
      setIsValid(false);
      setIndexSelected(-1);
      closeModal.current.click();
    }
  };


  const handleDelete = (index) => {
    const newList = [...studentList];
    newList.splice(index, 1);
    setStudentList(newList);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = studentList
      .filter(
          (student) =>
              student.name.toLowerCase().includes(searchTerm) ||
              student.phone.includes(searchTerm) ||
              student.email.toLowerCase().includes(searchTerm)
      )
      .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
      studentList.filter(
          (student) =>
              student.name.toLowerCase().includes(searchTerm) ||
              student.phone.includes(searchTerm) ||
              student.email.toLowerCase().includes(searchTerm)
      ).length / itemsPerPage
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-6">
              <h2>
                Student <b>List</b>
              </h2>
            </div>
            <div className="col-sm-6">
              <a
                  href="#EmployeeModal"
                  className="btn btn-success"
                  data-toggle="modal"
              >
                <i className="material-icons">&#xE147;</i>{" "}
                <span>Add New Student</span>
              </a>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-sm-6">
              <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, phone or email"
                  value={searchTerm}
                  onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <table className="table table-striped table-hover mt-3">
          <thead>
          <tr>
            <th style={{ width: "200px" }}>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {currentItems.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.phone}</td>
                <td>{student.email}</td>
                <td>
                  <a
                      href="#EmployeeModal"
                      className="edit"
                      data-toggle="modal"
                      onClick={() => handleSelect(student, index)}
                  >
                    <i
                        className="material-icons"
                        data-toggle="tooltip"
                        title="Edit"
                    >
                      &#xE254;
                    </i>
                  </a>
                  <a
                      href="#deleteEmployeeModal"
                      className="delete"
                      data-toggle="modal"
                      onClick={() => handleDelete(index)}
                  >
                    <i
                        className="material-icons"
                        data-toggle="tooltip"
                        title="Delete"
                    >
                      &#xE872;
                    </i>
                  </a>
                </td>
              </tr>
          ))}
          </tbody>
        </table>

        <div className="pagination">
          {[...Array(totalPages)].map((_, pageNumber) => (
              <button
                  key={pageNumber}
                  className={`btn ${currentPage === pageNumber + 1 ? "btn-primary" : "btn-default"}`}
                  onClick={() => handlePageChange(pageNumber + 1)}
              >
                {pageNumber + 1}
              </button>
          ))}
        </div>

        <StudentModal
            name={form.name}
            email={form.email}
            phone={form.phone}
            indexSelected={indexSelected}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            isValid={isValid}
            closeModal={closeModal}
        />
      </div>
  );
};

export default StudentList;
