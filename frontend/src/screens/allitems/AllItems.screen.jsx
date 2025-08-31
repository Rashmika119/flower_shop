import { Search, Filter, SortAsc } from "lucide-react";
import { useState, useEffect } from "react";
import { useAxios } from "../../config/axiosConfig";
import ItemCard from "../../components/cards/ItemCard";

function AllItems() {
  const [flowers, setFlowers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        setIsLoading(true);
        const response = await useAxios.get("/flowers/getAllFlowers");
        if (response.status === 200) {
          setFlowers(response.data.data);
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
    fetchFlowers();
  }, []);

  // Filter flowers based on search term
  const filteredFlowers = flowers.filter(
    (flower) =>
      flower.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flower.color?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 text-2xl sm:text-4xl opacity-40 animate-pulse delay-1000">
          🌸
        </div>
        <div className="absolute top-40 right-20 text-xl sm:text-3xl opacity-50 animate-bounce delay-500">
          🌺
        </div>
        <div className="absolute bottom-40 left-20 text-lg sm:text-2xl opacity-40 animate-pulse delay-1500">
          🌷
        </div>
        <div className="absolute bottom-20 right-10 text-2xl sm:text-4xl opacity-40 animate-bounce delay-700">
          🌹
        </div>
      </div>

      <div className="relative z-10 p-3 sm:p-6">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 pt-4 sm:pt-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-main mb-2 sm:mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Our Flower Collection
          </h1>
          <p className="text-main text-sm sm:text-base md:text-lg text-main/70 max-w-2xl mx-auto px-4">
            Discover beautiful arrangements for every occasion
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full max-w-md sm:max-w-none">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-main/50" />
              </div>
              <input
                type="text"
                placeholder="Search flowers by name or color..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-surface/90 backdrop-blur-sm border border-primary/20 rounded-full  placeholder-main/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-300 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        {/* Results Counter */}
        {searchTerm && (
          <div className="max-w-6xl mx-auto px-3 sm:px-6 mb-4 sm:mb-6">
            <p className="text-main text-sm sm:text-base text-main/70">
              Found {filteredFlowers.length} result
              {filteredFlowers.length !== 1 ? "s" : ""} for "{searchTerm}"
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-primary/20 rounded-full animate-spin border-t-primary"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg sm:text-xl">🌸</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Items Grid */}
            <div className="max-w-7xl mx-auto px-3 sm:px-6">
              {filteredFlowers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredFlowers.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                /* No Results State */
                <div className="text-center py-16 sm:py-20">
                  <div className="text-4xl sm:text-6xl mb-4 opacity-50">🌸</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-main mb-2">
                    No flowers found
                  </h3>
                  <p className="text-main mb-6 text-sm sm:text-base">
                    {searchTerm
                      ? `No results for "${searchTerm}". Try searching with different keywords.`
                      : "No flowers available at the moment. Please check back later."}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AllItems;
