import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./AddEdit.css";
import fireDb from "../firebase";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
  status: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, email, contact, status } = state;

  const history = useHistory();

  const { id } = useParams();

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
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact || !status) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else {
      if (!id) {
        fireDb.child("contacts").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("เพิ่มรายการเรียบร้อย");
          }
        });
      } else {
        fireDb.child(`contacts/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("อัพเดตรายการเรียบร้อย");
          }
        });
      }

      setTimeout(() => history.push("/"), 500);
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <h1 >เพิ่มรายการ</h1>
      <form
      
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">รายการอาหาร</label>
        <input
          type="text"
          id="name"
          name="name"
          placeHolder="อยากสั่งอะไรพิมมา"
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">โต๊ะที่เท่าไร</label>
        <input
          type="text"
          id="email"
          name="email"
          placeHolder="โต๊ะอะไร"
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">จำนวนที่สั่ง</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeHolder="จำนวนกี่ จาน/ชิ้น/อัน"
          value={contact || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="name">คำแนะนำเพิ่มเติม</label>
        <input
          type="text"
          id="status"
          name="status"
          placeHolder="คำร้องขอเพิ่มเติม"
          value={status || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;
