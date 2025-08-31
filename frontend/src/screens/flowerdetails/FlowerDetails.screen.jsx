import React, { useEffect, useState } from "react";
import DetailsCard from "../../components/cards/DetailsCard";
import { useParams, useNavigate } from "react-router-dom";
import { useAxios } from "../../config/axiosConfig";
import { ArrowLeft, Loader2 } from "lucide-react";

function FlowerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flowerDetails, setFlowerDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFlowerDetails = async () => {
      try {
        setIsLoading(true);
        const response = await useAxios.get(`/flowers/getFlowerDetails/${id}`);
        if (response.status === 200) {
          setFlowerDetails(response.data.data);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log("Error of getting data " + error);
        alert("Error of getting data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFlowerDetails();
  }, [id]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 sm:top-25 left-10 sm:left-40 text-3xl sm:text-6xl opacity-10 animate-pulse delay-1000">
          🌸
        </div>
        <div className="absolute top-20 sm:top-40 right-5 sm:right-20 text-2xl sm:text-4xl opacity-30 animate-bounce delay-500">
          🌺
        </div>
        <div className="absolute bottom-20 sm:bottom-32 left-5 sm:left-20 text-xl sm:text-3xl opacity-30 animate-bounce delay-1000">
          🌷
        </div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 text-3xl sm:text-5xl opacity-10 animate-pulse delay-1000">
          🌹
        </div>
        <div className="absolute top-1/2 left-1/4 text-2xl sm:text-4xl opacity-20 animate-pulse delay-700 hidden sm:block">
          🌸
        </div>
        <div className="absolute top-3/4 right-1/3 text-xl sm:text-3xl opacity-20 animate-bounce delay-1500 hidden md:block">
          🌺
        </div>
      </div>

      <div className="relative z-20 p-4 sm:p-6">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-surface/90 backdrop-blur-sm hover:bg-surface border border-primary/20 hover:border-primary/40 px-3 sm:px-4 py-2 sm:py-3 rounded-full  font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm sm:text-base">Back</span>
            </button>
          </div>

          {!isLoading && flowerDetails.name && (
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight mb-2 sm:mb-4">
                {flowerDetails.name}
              </h1>
              <p className="text-base sm:text-xl text-main max-w-2xl mx-auto">
                Discover the beauty and details of this stunning flower
              </p>
              <div className="flex justify-center mt-3 sm:mt-4">
                <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-20 sm:py-32">
            <div className="relative mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-primary/20 rounded-full animate-spin border-t-primary"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg sm:text-xl">🌸</span>
              </div>
            </div>
            <p className="text-main text-sm sm:text-base font-medium">
              Loading flower details...
            </p>
          </div>
        ) : (
          /* Details Content */
          <div className="max-w-6xl mx-auto">
            <DetailsCard item={flowerDetails} />
          </div>
        )}
      </div>
    </div>
  );
}

export default FlowerDetails;
