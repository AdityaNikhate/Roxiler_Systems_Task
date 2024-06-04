import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = () => {
  const [data, setData] = useState({});
  const [month, setMonth] = useState('June');

  useEffect(() => {
    fetchStata(month);
  }, [month]);

  const fetchStata = async (selectedMonth) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/data/stata', {
        month: selectedMonth.toLowerCase() 
      });

      if (response.status === 200) {
        setData(response.data);
        console.log(response.data)
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
    <div className='mb-10 '>
      <div className='flex gap-10 justify-center'>
      <h1 className='text-4xl font-semibold text-gray-700'>Statistics - </h1>
      
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

      <div className='flex justify-center mt-5'>
        <div className='w-1/4 bg-yellow-200 rounded-2xl p-5 text-xl font-semibold text-gray-700'>
          <h1>Total Sale : <span className=' float-right text-green-500 font-extrabold'>{data?.totalSaleAmount}</span></h1>
          <h1>Total Sold item : <span className=' float-right text-green-500 font-extrabold'>{data?.totalSoldItems}</span></h1>
          <h1>Total not sold item : <span className=' float-right text-green-500 font-extrabold'>{data?.totalUnsoldItems}</span></h1>
        </div>
      </div>
    </div>
  )
}

export default Statistics