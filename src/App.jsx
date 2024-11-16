import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'; 

const App = () => {
  const [data, setData] = useState([]);
  const [zoomedImageId, setZoomedImageId] = useState(null);

  const GetData = async () => {
    const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=12');
    setData(response.data);
    console.log(response.data);
  };

  const handleImageClick = (id) => {
    setZoomedImageId(zoomedImageId === id ? null : id); 
  };
  useEffect(()=>{
    GetData();
  });

  return (
    <div className="p-10 flex flex-col items-center justify-center bg-gradient-to-tr from-slate-950  scroll-smooth h-screen">
      <button onClick={GetData} className=" w-[80vw] px-5 py-2 bg-gradient-to-tr from-slate-950 shadow-black shadow-2xl hover:bg-gradient-to-tl hover:from-slate-950 ease-in-out duration-500 text-white rounded-md active:scale-95">
        Get Data
      </button>
      <div className="shadow-xl shadow-black flex flex-wrap item-center justify-center overflow-auto p-10 bg-gradient-to-tl from-slate-950 h-screen w-[80vw] rounded-md">
      {
        data.length === 0 && (
          <div className=" text-white flex justify-center items-center h-full w-full">N0 DATA</div>
        )
      }
      
        {data.map((d) => (
          <div key={d.id} className="ml-1 mb-5 shadow-black shadow-2xl ease-in-out hover:shadow-orange-200 duration-100 p-2">
            <h2>{d.id}</h2>
            <img
              onClick={() => handleImageClick(d.id)}
              src= {d.download_url}
              className={`w-[300px] h-[200px] transition duration-1000 ease-in-out cursor-pointer ${
                zoomedImageId === d.id ? 'fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50' : 'text-white text-3xl'
              }`}
              alt="Image"
            />
            <h2 className="font-semibold">{d.author}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
