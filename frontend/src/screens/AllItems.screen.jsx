import { Search } from "lucide-react";
import ItemCard from "../components/itemCard";
import { useState, useEffect } from "react";
import { useAxios } from "../config/axiosConfig";

function AllItems() {
  const [flowers, setflowers] = useState([]);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await useAxios.get("/flowers/getAllFlowers");
        if (response.status == 200) {
          setflowers(response.data.data);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log("Error of getting data " + error);
        alert("Error of getting data");
      }
    };
    fetchFlowers();
  }, []);

  return (
    <div className="block p-1 min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white">
      <div className="flex w-[400px] md:w-[600px] mx-auto gap-4 mt-5 rounded-full px-8 py-3 border-pink-500 bg-gray-50 shadow-lg border-s-black">
        <Search />
        <input type="text" placeholder="Search" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {flowers.map((item) => {
          return <ItemCard key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default AllItems;
