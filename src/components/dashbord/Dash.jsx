import React, { useEffect, useState } from 'react'
import './Dash.css'
import Chart from "react-apexcharts";
// import Settings from '../../settings/Settings';
import { useTheme } from '../theme/ThemeContext';
import axios from 'axios';




const Dash = () => {

  const {theme} = useTheme()
  // const [theme, setTheme] = useState('light');

  // const handleThemeChange = (newTheme) => {
  //   setTheme(newTheme);
  //   document.documentElement.setAttribute('data-theme', newTheme);
  // };
  // const backendurl = process.env.REACT_APP_BACKEND_URL;
  // const dotenv=require('dotenv');

  // console.log("hgguyf",backendurl)

  const [stock, setStock] = useState(null);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(`/api/adminstock/new/count`); // Relative path
        setStock(response.data.count);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      }
    };

    fetchStock();
  }, []);


  
  const[user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/dashboard/api/users/count'); // Relative path
        setUser(response.data.user_count);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      }
    };

    fetchUser();
  }, []);

  const[thing, setThing] = useState(null)

  useEffect(() => {
    const fetchThing = async () => {
      try {
        const response = await axios.get('/dashboard/api/things/count'); // Relative path
        setThing(response.data.total_count);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      }
    };

    fetchThing();
  }, []);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get("/dashboard/api/users/graph", {
          params: { groupBy: "day" }, // Change to "day" if needed
        });

        // Map the backend response to chart data
        const categories = response.data.data.map((item) => item.period); // Periods (e.g., "2023-01")
        const data = response.data.data.map((item) => item.user_count); // User counts

        // Update the chart state
        setCustomerChartData((prevState) => ({
          ...prevState,
          options: {
            ...prevState.options,
            xaxis: {
              categories,
            },
          },
          series: [
            {
              name: "Users",
              data,
            },
          ],
        }));
      } catch (err) {
        console.error("Error fetching customer chart data:", err);
        setError("Failed to load customer chart data");
      }
    };

    fetchCustomerData();
  }, []);

  const [customerChartData, setCustomerChartData] = useState({
    options: {
      chart: {
        id: "customer-chart",
      },
      xaxis: {
        categories: [], // Placeholder for dynamic categories (periods)
      },
    },
    series: [
      {
        name: "Users",
        data: [], // Placeholder for dynamic user counts
      },
    ],
  });

  return (
    <div className={`dash-main ${theme}-theme`}>
      {/* <Settings onThemeChange={handleThemeChange}/> */}
      <div className="dash-dummy"></div>
      <div className="dash-content-main">
        <div className="dash-content-card">
          <div className="dash-card">
            <div className="dash-card-content-main">
              <div className="dash-card-content-head">
                <p>Users</p>
              </div>
              <div className="dash-card-content-count">
                <i className="fa-solid fa-user"></i>
                <p>{user !== null ? user : error || 'Loading...'}</p>
              </div>
              <div className="dash-card-content-last">
                <p>18% Higher Than Last Month</p>
              </div>
            </div>
          </div>
          <div className="dash-card">
            <div className="dash-card-content-main">
              <div className="dash-card-content-head">
                <p>Thing</p>
              </div>
              <div className="dash-card-content-count">
                <i className="fa-solid fa-business-time"></i>
                <p>{thing !== null ? thing : error || 'Loading...'}</p>
              </div>
              <div className="dash-card-content-last">
                <p>18% Higher Than Last Month</p>
              </div>
            </div>
          </div>
          <div className="dash-card">
            <div className="dash-card-content-main">
              <div className="dash-card-content-head">
                <p>Product</p>
              </div>
              <div className="dash-card-content-count">
                <i className="fa-solid fa-chart-line"></i>
                <p>50</p>
              </div>
              <div className="dash-card-content-last">
                <p>18% Higher Than Last Month</p>
              </div>
            </div>
          </div>
          <div className="dash-card">
            <div className="dash-card-content-main">
              <div className="dash-card-content-head">
                <p>Stock</p>
              </div>
              <div className="dash-card-content-count">
                <i className="fa-solid fa-chart-line"></i>
                <p>{stock !== null ? stock : error || 'Loading...'}</p>
              </div>
              <div className="dash-card-content-last">
                <p>18% Higher Than Last Month</p>
              </div>
            </div>
          </div>
        </div>
        <div className="dash-chart-main">
          <div className="dash-chart-content">
            <div className="dash-chart-head">
              <p>Customer chart</p>
              <i class="fa-solid fa-sliders"></i>
            </div>
            <div className="dash-chart-1">
              {error ? (
                <p>{error}</p>
              ) : (
                <Chart
                  options={customerChartData.options}
                  series={customerChartData.series}
                  type="area"
                  width="100%"
                  height="100%"
                />
              )}
            </div>
            <div className="dash-chart-price">

            </div>
          </div>
          <div className="dash-chart-content">
          <div className="dash-chart-head">
              <p>Profit chart</p>
            </div>
            <div className="dash-chart-1">
              <Chart options={customerChartData.options} series={customerChartData.series} type="bar" width='100%' height='100%' />
            </div>
            <div className="dash-chart-price">
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dash;
