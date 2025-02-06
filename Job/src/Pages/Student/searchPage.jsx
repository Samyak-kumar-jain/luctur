import { SkeletonCard } from "@/AppComonents/Commom/CourseSkeleton";
import Filter from "@/AppComonents/Student/Filter";
import SearchResult from "@/AppComonents/Student/SearchResult";
import { useGetSearhCourseQuery } from "@/Features/Apis/courseApi";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();  // ✅ Correct Destructuring
  const query = searchParams.get("query");
  const [selectedCategories,setSelectedCategories] = useState([]);
  const [sortByPrice,setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearhCourseQuery({
    squery :query , 
    categories : selectedCategories, 
    sortByPrice
  }); 
  console.log(data);
  const handleFilterChange = (categories,price) =>{
    setSelectedCategories(categories);
    setSortByPrice(price)
  }

 
  const isEmpty = !data || data?.courses.length === 0;

  return (
    <div className="max-w-7xl relative md:mx-16 bg-gray-700/10 border rounded-lg mx-4 p-4 md:px-8 mt-24 tracking-wide">
      <div className="">
        <h1 className="bg-gradient-to-r from-blue-300 via-blue-200 to-gray-300 text-transparent bg-clip-text logo text-3xl">{ query?`Results for ${query}`:"Expllore Courses"}</h1>
        <p className="mt-3 text-2xl">
        { query?`Showing results for `:""}
          <span className="text-blue-800 font-bold italic ml-1">{query}</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row font-bold gap-9">
        <Filter handleFilterChange={handleFilterChange} />
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => <SkeletonCard key={idx} />)
          ) : isEmpty ? (
            <p className="text-gray-400 text-center">Course not found</p>
          ) : (
            data?.courses.map((course) => <SearchResult key={course._id} course={course} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
