import React, { useEffect, useState } from 'react'
import './Dealer.css'
import { useTheme } from '../theme/ThemeContext';
import DataTable from 'react-data-table-component';


const Dealer = () => {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('');
  const [dealerdata, setDealerdata] = useState([])

  useEffect(() => {
    const fetchDealer = async () => {
      try {
        const response = await fetch(`/dashboard//api/display/party/dealers?query=${searchQuery}`)
        const result = await response.json();
        setDealerdata(result.data)
      } catch (error) {
        console.error("Error Fetching dealers data :", error)
      }
    };
    fetchDealer();
  }, [searchQuery]);

  const columns = [
    { name: 'ID', selector: (row) => row.id || 'null', sortable: true },
    { name: 'Name', selector: (row) => row.name || 'null', sortable: true },
    { name: 'Address', selector: (row) => row.address || 'null', sortable: true },
    { name: 'Phone', selector: (row) => row.phone || 'null', sortable: true },
    { name: 'Alt Phone', selector: (row) => row.alt_phone || 'null', sortable: true },
    { name: 'Total Amount', selector: (row) => row.total_amount || 'null', sortable: true },
    { name: 'Balance', selector: (row) => row.balance || 'null', sortable: true },
    { name: 'Last Modified', selector: (row) => row.lastmodified || 'null', sortable: true },
    { name: 'Email', selector: (row) => row.email || 'null', sortable: true },
    { name: 'Paid Amount', selector: (row) => row.paid_amount || 'null', sortable: true },
    { name: 'Refund Amount', selector: (row) => row.refund_amount || 'null', sortable: true },
  ];

  return (
    <div className={`dealers-main ${theme}-theme`}>
      <div className="dash-dummy"></div>
      <div className="dealer-content-main">

      </div>
    </div>
  )
}

export default Dealer