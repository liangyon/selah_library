'use client'
import { useState } from 'react';
import axios from "../../utils/axiosConfig"

export default function Home() {
  const [data, setData] = useState<{ message: string } | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Next.js Frontend</h1>
      <button onClick={fetchData}>Fetch Data from Backend</button>
      {data && <p>Response: {data.message}</p>}
    </div>
  );
}