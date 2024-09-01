import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Bills.css';

const Bills = () => {
  const [billsData, setBillsData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBill, setNewBill] = useState({
    billname: "",
    itemdesc: "",
    duedate: "",
    amount: "",
  });

  // Fetch bills data from the server
  const fetchBillsData = async () => {
    try {
      const response = await axios.get('http://localhost:9007/bills/getbills');
      setBillsData(response.data);
    } catch (error) {
      console.error('There was an error fetching the bills data!', error);
    }
  };

  useEffect(() => {
    fetchBillsData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBill({ ...newBill, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:9007/bills/addbills', newBill);
      // After successfully adding the bill, fetch the updated bills data
      fetchBillsData();
      setShowModal(false);
      setNewBill({
        billname: "",
        itemdesc: "",
        duedate: "",
        amount: "",
      });
    } catch (error) {
      console.error('There was an error saving the bill!', error);
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
    </div>
  );
};

export default Bills;