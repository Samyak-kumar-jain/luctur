import Courses from "@/AppComonents/Student/Courses";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import react, { useState } from "react"
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery,setSearchQuery] = useState("");

  const searchHandler = (e) =>{
    e.preventDefault();
    if(searchQuery.trim() != ""){
      navigate(`/course/search?query=${searchQuery}`)

    }

  }
  return (<>
    <div className="relative mt-[100px] md:mr-10 md:ml-10 ml-5 mr-5  bg-gray-950/60 py-16 px-4  rounded-md text-center border selection-none flex items-center ">
      <div className="w-full mx-auto selection-none">
        <h1 className=" md:text-6xl text-5xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-blue-50 to-gray-600 text-transparent bg-clip-text tracking-[5px]  ">Search Your Super Skill</h1>
        <p className="text-blue-200 md:text-lg selection-none  tracking-wider">Unlock your potential discover courses that match your passion</p>
        <p className="text-blue-200/70 md:text-lg tracking-wide">and take the first step toward your dream career!</p>
        <form onSubmit={searchHandler} className="selection-none flex items-center rounded-full overflow-hidden max-w-2xl mx-auto mb-6 bg-gray-600/20 border mt-6">
          <input
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
            type="text"
            className="flex-grow bg-transparent text-white px-5 py-3 outline-none focus:ring-0 focus:outline-none"
            placeholder="Search for courses..."
          />
          <Button type="submit" className="bg-transparent text-white px-6 py-3 rounded-r-full hover:bg-transparent">
            <Search />
          </Button>
        </form>
        <Button onClick={()=>navigate("/course/search?query")}  className=" px-5 py-5 text-center rounded-xl border-white text-lg border-2 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white 
             font-semibold  shadow-lg 
             transition-all duration-300 ease-in-out 
             hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 
             hover:shadow-xl active:scale-95 disabled:opacity-50 selection-none  ">Explore</Button>





      </div>

    </div>
    <div className="relative mt-5 md:mr-10 md:ml-10 ml-5 mr-5 rounded-md  border selection-none mb-4">
      <Courses />
    </div>





  </>)
}
export default HomePage;