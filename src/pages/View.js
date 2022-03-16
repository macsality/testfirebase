import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import { useParams, Link } from "react-router-dom";
import "./View.css";

const View = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fireDb
      .child(`contacts/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser({ ...snapshot.val() });
        } else {
          setUser({});
        }
      });
  }, [id]);

  console.log("user", user);
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>รายละเอียดรายการอาหาร</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>ชื่อรายการ: </strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>โต๊ะที่ : </strong>
          <span>{user.email}</span>
          <br />
          <br />
          <strong>จำนวนที่สั่ง: </strong>
          <span>{user.contact}</span>
          <br />
          <br />
          <strong>คำขอพิเศษ: </strong>
          <span>{user.status}</span>
          <br />
          <br />
        </div>
        <div className="card-footer">
          <Link to="/">
            <button className="btn btn-edit">กลับสู่ห้องครัว</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
