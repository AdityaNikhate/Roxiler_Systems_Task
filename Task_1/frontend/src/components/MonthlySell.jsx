import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

const MonthlySell = () => {
  const [price, setPrice] = useState({});
  const [month, setMonth] = useState('June'); 
  
  useEffect(() => {
    fetchgetchart(month);
  }, [month]);

  

  const fetchgetchart = async (selectedMonth) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/data/getchart', {
        month: selectedMonth.toLowerCase() 
      });

      if (response.status === 200) {
        setPrice(response.data.message.priceRanges);
      } else {
        
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      
    }
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value); 
  };
  
  

  return (
    <div className="p-10">
      <div className='flex gap-10 justify-center'>
      <h1 className='text-4xl font-semibold text-gray-700'>Bar Chart Stats</h1>
      
      <div className="mt-4">
        <label>Select Month:</label>
        <select className='text-center font-semibold text-red-500' id="month" value={month} onChange={handleMonthChange}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      </div>

        {/* Bar chart */}
        <div className='flex justify-center'>
        <div className="mt-7">
          
          <BarChart width={800} height={500} data={price}
          margin={{
            top: 5,
            right: 30,
            left: 10,
            bottom: 5,
          }}
          barSize={30}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          /> <YAxis padding={{ left: 10, right: 10 }} /> <Tooltip /> <Legend />
          <CartesianGrid strokeDasharray="1 1" />
          <Bar dataKey="items" fill="#4fe4ff" background={{ fill: "#eee" }} />
        </BarChart>
        </div>
        </div>
      </div>
    
  );
};

export default MonthlySell;
