import React, { useState, useEffect } from "react";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct import
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import './Bills.css';

const Bills = () => {
  const [billsData, setBillsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBill, setNewBill] = useState({
    billname: "",
    itemdesc: "",
    duedate: "",
    amount: "",
    username: ""
  });
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchBillsData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error("No token found");

        const response = await axios.get('http://localhost:9007/bills/getbills', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setBillsData(response.data);
      } catch (error) {
        console.error('Error fetching bills data:', error);
        toast.error('Failed to fetch bills data. Please try again later.');
      }
    };

    fetchBillsData();

    // Handle token decoding and setting username
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
        setNewBill(prev => ({ ...prev, username: decodedToken.username }));
      } catch (error) {
        console.error('Invalid token:', error);
        toast.error('Invalid token. Please log in again.');
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBill({ ...newBill, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("No token found");

      await axios.post('http://localhost:9007/bills/addbills', newBill, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      // Fetch updated bills data after adding the new bill
      const response = await axios.get('http://localhost:9007/bills/getbills', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setBillsData(response.data);
      setShowModal(false);
      setNewBill({
        billname: "",
        itemdesc: "",
        duedate: "",
        amount: "",
        username: username
      });
      toast.success('Bill added successfully!');
    } catch (error) {
      console.error('Error saving the bill:', error);
      toast.error('Failed to add the bill. Please check the data and try again.');
    }
  };

  return (
    <div className="bills-container">
      <h2>Upcoming Bills</h2>
      <table className="bills-table">
        <thead>
          <tr>
            <th>Bill Name</th>
            <th>Item Description</th>
            <th>Due Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {billsData.map((bill, index) => (
            <tr key={index}>
              <td className="bill-name">{bill.billname}</td>
              <td className="item-description">{bill.itemdesc}</td>
              <td className="due-date">{bill.duedate}</td>
              <td className="amount">{bill.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-bill-button" onClick={() => setShowModal(true)}>Add Bill</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Add New Bill</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Bill Name:</label>
                <input
                  type="text"
                  name="billname"
                  value={newBill.billname}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Item Description:</label>
                <input
                  type="text"
                  name="itemdesc"
                  value={newBill.itemdesc}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Due Date:</label>
                <input
                  type="date"
                  name="duedate"
                  value={newBill.duedate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Amount:</label>
                <input
                  type="number"
                  name="amount"
                  value={newBill.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Bills;
