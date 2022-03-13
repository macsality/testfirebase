import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

const Home = () => {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that contact ?")
    ) {
      fireDb.child(`contacts/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Contact Deleted Successfully");
        }
      });
    }
  };

  const handleChange = (e) => {
    setSort(true);
    fireDb
      .child("contacts")
      .orderByChild(`${e.target.value}`)
      .on("value", (snapshot) => {
        let sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
  };
  const handleReset = () => {
    setSort(false);
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
  };

  const filterData = (value) => {
    fireDb
      .child("contacts")
      .orderByChild("status")
      .equalTo(value)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
      });
  };
  return (
    <div style={{ marginTop: "20px"  }}>
      <div className="container">
        <label>Sort By:</label>
        <select className="dropdown" name="colValue" onChange={handleChange}>
          <option>Please Select</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="contact">Contact</option>
          <option value="status">Status</option>
        </select>
        <button className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>
        <br />
        <br />
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>ลำดับ.</th>
              <th style={{ textAlign: "center" }}>ชื่อผู้สั่ง</th>
              <th style={{ textAlign: "center" }}>Table</th>
              <th style={{ textAlign: "center" }}>จำนวนรายการ</th>
              <th style={{ textAlign: "center" }}>Status</th>
              {!sort && <th style={{ textAlign: "center" }}>Action</th>}
            </tr>
          </thead>
          {!sort && (
            <tbody>
              {Object.keys(data).map((id, index) => {
                return (
                  <tr key={id}>
                    <th scope="row">{index + 1}</th>
                    <td>{data[id].name}</td>
                    <td>{data[id].email}</td>
                    <td>{data[id].contact}</td>
                    <td>{data[id].status}</td>
                    <td>
                      <Link to={`/update/${id}`}>
                        <button className="btn btn-edit">Edit</button>
                      </Link>
                      <button
                        className="btn btn-delete"
                        onClick={() => onDelete(id)}
                      >
                        Delete
                      </button>
                      <Link to={`/view/${id}`}>
                        <button className="btn btn-view">View</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
          {sort && (
            <tbody>
              {sortedData.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                    <td>{item.status}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>

        {/* <label>Status:</label>
      <button className="btn btn-active" onClick={() => filterData("Active")}>
        Active
      </button>
      <button
        className="btn btn-inactive"
        onClick={() => filterData("Inactive")}
      >
        Inactive
      </button> */}
      </div>
    </div>
  );
};

export default Home;

