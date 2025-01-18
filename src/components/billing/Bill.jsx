import React, { useEffect, useRef, useState } from 'react'
import './Bill.css'
import { useTheme } from '../theme/ThemeContext'
import billlogo from './billing-img/logo_white.png'
import DataTable from 'react-data-table-component'

const Bill = () => {
  const { theme } = useTheme()
  const billRef = useRef(null); // Create a ref to the main component
  const [showEstimate, setShowEstimate] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showHistory, setShowHistory] = useState(false)
  const [showInvoice, setShowInvoice] = useState(false)
  const [showSale, setShowSale] = useState(false)
  const [showCustomer, setShowCustomer] = useState(false)
  const [showClosing, setShowClosing] = useState(false)


  // ..................................................................... Estimate .............................................................................
  const handleEstimate = (row) => {
    setEditData(row);
    setShowEstimate(true);
  };
  const handleCloseEstimate = () => {
    setShowEstimate(false);
    setEditData(null);
  };

  // ..................................................................... History ..............................................................................
  const handleHistory = (row) => {
    setEditData(row);
    setShowHistory(true);
  };
  const handleCloseHistory = () => {
    setShowHistory(false);
    setEditData(null);
  };

  //...................................................................... Invoice ..............................................................................
  const handleInvoice = (row) => {
    setEditData(row);
    setShowInvoice(true);
  };
  const handleCloseInvoice = () => {
    setShowInvoice(false);
    setEditData(null);
  };

  // ..................................................................... Sale .................................................................................
  const handleSale = (row) => {
    setEditData(row);
    setShowSale(true);
  };
  const handleCloseSale = () => {
    setShowSale(false);
    setEditData(null);
  };

  // ..................................................................... Customer .............................................................................
  const handleCustomer = (row) => {
    setEditData(row);
    setShowCustomer(true);
  };
  const handleCloseCustomer = () => {
    setShowCustomer(false);
    setEditData(null);
  };

  // .................................................................... Closing ...............................................................................
  const handleClosing = (row) => {
    setEditData(row);
    setShowCustomer(true);
  };
  const handleCloseClosing = () => {
    setShowClosing(false);
    setEditData(null);
  };
  


 

  const handleFullScreen = () => {
    if (billRef.current) {
      if (!document.fullscreenElement) {
        billRef.current.requestFullscreen(); // Enter full screen
      } else {
        document.exitFullscreen(); // Exit full screen
      }
    }
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Set up an interval to update the time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);


  const columns = [
    {
      name: "No",
      selector: (row) => row.no,
    },
    {
      name: "Code",
      selector: (row) => row.code,
    },
    {
      name: "Model",
      selector: (row) => row.model,
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Discount",
      selector: (row) => row.discount,
    },
    {
      name: "Tax",
      selector: (row) => row.tax,
    },
    {
      name: "Total",
      selector: (row) => row.total,
    },
  ];

  const data = [
    {
      no: 1,
      code: '254685',
      model: "absyejdku",
      qty: 2,
      price: "₹ 1999.00",
      discount: "50",
      tax: "5.2",
      total: '₹ 2300'
    },
  ];

  return (
    <div ref={billRef} className={`bill-main ${theme}-theme`}>
      <div className="bill-dummy">
        <img src={billlogo} alt="" />
        <div className='bill-time'>
          <p>{currentTime.toLocaleTimeString()}</p>
        </div>
      </div>
      <div className="bill-content-main">
        <div className="bill-content">
          <div className="bill-content-details">
            <div className="bill-customer-details">
              <div className="bill-customer-content">
                <p>User :</p>
                {/* <input type="text"  /> */}
                <p>anshid pp</p>
              </div>
              <div className="bill-customer-content">
                <p>Address :</p>
                {/* <input type="text"  /> */}
                <p>panthappilakkel</p>
              </div>
              <div className="bill-customer-content">
                <p>Billing Address :</p>
                <input type="text" />
              </div>
              <div className="bill-customer-content">
                <p>Shipping Address :</p>
                <input type="text" />
              </div>

            </div>
            <div className="bill-item-details-main">
              <div className="bill-item-details">
                <div className="bill-customer-content">
                  <p>Scan Barcode :</p>
                  <input type="text" />
                </div>
                <div className="bill-customer-content">
                  <p>Item Description :</p>
                  <input type="text" />
                </div>
                <div className="bill-customer-content">
                  <p>Search :</p>
                  <input type="text" />
                </div>
              </div>
            </div>

          </div>
          <div className="bill-content-table">
            {/* <DataTable
              columns={columns}
              data={data}
              
            /> */}
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Code</th>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Tax</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>662615178</td>
                  <td>tomato</td>
                  <td>1</td>
                  <td>$ 54.00</td>
                  <td>$ 04.00</td>
                  <td>10</td>
                  <td>63</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div className="bill-content-payment">
          <div className="bill-content-payment-scroll">
            <div className="bill-payment-nav">
              <i class="fa-solid fa-expand" onClick={handleFullScreen}></i>
            </div>
            <div className="bill-invoice-main">
              <div className="bill-invoice-head">
                <p>Invoice</p>
              </div>
              <div className="bill-invoice-content">
                <p>Sub Total :</p>
                <input type="text" />
              </div>
              <div className="bill-invoice-content">
                <p>Round of :</p>
                <input type="text" />
              </div>
              <div className="bill-invoice-content1">
                <p>Tax :</p>
                <div className="bill-invoice-content1-input">
                  <input type="text" placeholder='%' className='bill-perc' />
                  <input type="text" />
                </div>

              </div>
              <div className="bill-invoice-content1">
                <p>Discount :</p>
                <div className="bill-invoice-content1-input">
                  <input type="text" placeholder='%' className='bill-perc' />
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="bill-net-main">
              <p>Total Net :</p>
              <span>123456</span>
            </div>
            {/* <div className="bill-paid-balance">
              <div className="bill-invoice-content">
                <p>Round of :</p>
                <input type="text" />
              </div>
              <div className="bill-invoice-content">
                <p>Round of :</p>
                <input type="text" />
              </div>
            </div> */}
            <div className="bill-payment-paybtn">
              <button>
                Pay Now
              </button>
            </div>
            <div className="bill-payment-buttons">

  {/* ......................................................................... Estimate ...................................................................... */}
              <div className="bill-payment-button-box" onClick={() => handleEstimate()}>
                <p>Print Estimate</p>
              </div>
              {showEstimate && (
                <div className="bill-popup-overlay">
                  <div className="bill-popup-content">
                    <button className="bill-popup-close" onClick={handleCloseEstimate}>
                      <i className="fa-solid fa-x"></i>
                    </button>

                    <button
                      className="popup-save"
                      onClick={() => {
                        console.log("Updated Data: ", editData);
                        handleCloseEstimate();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
  {/* .............................................................................. History ..................................................................... */}
              <div className="bill-payment-button-box" onClick={handleHistory}>
                <p>History</p>
              </div>
              {showHistory && (
                <div className="bill-popup-overlay">
                  <div className="bill-popup-content">
                    <button className="bill-popup-close" onClick={handleCloseHistory}>
                      <i className="fa-solid fa-x"></i>
                    </button>

                    <button
                      className="popup-save"
                      onClick={() => {
                        console.log("Updated Data: ", editData);
                        handleCloseHistory();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
  {/* ................................................................................ Invoice ...................................................................... */}
              <div className="bill-payment-button-box" onClick={handleInvoice}>
                <p>View Invoice</p>
              </div>
              {showInvoice && (
                <div className="bill-popup-overlay">
                  <div className="bill-popup-content">
                    <button className="bill-popup-close" onClick={handleCloseInvoice}>
                      <i className="fa-solid fa-x"></i>
                    </button>

                    <button
                      className="popup-save"
                      onClick={() => {
                        console.log("Updated Data: ", editData);
                        handleCloseInvoice ();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
  {/* ................................................................................ Sale ........................................................................ */}
              <div className="bill-payment-button-box" onClick={handleSale}>
                <p>Total Sale</p>
              </div>
              {showSale && (
                <div className="bill-popup-overlay">
                  <div className="bill-popup-content">
                    <button className="bill-popup-close" onClick={handleCloseSale}>
                      <i className="fa-solid fa-x"></i>
                    </button>

                    <button
                      className="popup-save"
                      onClick={() => {
                        console.log("Updated Data: ", editData);
                        handleCloseSale ();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
  {/* ............................................................................ Customer ......................................................................... */}
              <div className="bill-payment-button-box" onClick={handleCustomer}>
                <p>customer A/C</p>
              </div>
              {showCustomer && (
                <div className="bill-popup-overlay">
                  <div className="bill-popup-content">
                    <button className="bill-popup-close" onClick={handleCloseCustomer}>
                      <i className="fa-solid fa-x"></i>
                    </button>

                    <button
                      className="popup-save"
                      onClick={() => {
                        console.log("Updated Data: ", editData);
                        handleCloseCustomer ();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
  {/* ............................................................................. Closing ........................................................................ */}
              <div className="bill-payment-button-box" onClick={handleClosing}>
                <p>Closing</p>
              </div>
              {showClosing && (
                <div className="bill-popup-overlay">
                  <div className="bill-popup-content">
                    <button className="bill-popup-close" onClick={handleCloseClosing}>
                      <i className="fa-solid fa-x"></i>
                    </button>

                    <button
                      className="popup-save"
                      onClick={() => {
                        console.log("Updated Data: ", editData);
                        handleCloseClosing ();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bill