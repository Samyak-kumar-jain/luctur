import { Button } from "../../components/ui/button";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Edit, GraduationCap, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserQuery, useLogoutUserMutation } from "../../Features/Apis/authApi";
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";


const AdminNavbar = () => {
  const [logoutUser, { data, isLoading, isSuccess }] = useLogoutUserMutation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const { data: getData } = useGetUserQuery();
  console.log(getData)
  const userData = getData?.user || {};
  const navigate = useNavigate();
  // const user = true;

  const logoutHandler = async () => {
    await logoutUser();
   

  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logout Successfully", {
        className: "custom-toast",
      });
      navigate("/auth");
    }



  }, [isSuccess])
  return (
    <nav className="fixed top-1 left-0 w-full z-20">
      <div className=" mx-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-gray-700 text-gray-700 flex  h-16 text-base md:text-lg lg:text-xl  justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h3 className=" bg-gradient-to-r from-blue-300 via-blue-200 to-gray-300 text-transparent bg-clip-text logo text-lg md:text-xl lg:text-2xl font-semibold  leading-loose flex items-center cursor-pointer">
            L E C T U R
          </h3>
        </Link>

        <div className="flex items-center">
          {
            isAuthenticated ? (
              <DropdownMenu className="" >
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer relative  h-12 w-12  mb-2 rounded-full 
             bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
             animate-gradient-border bg-[length:200%_200%] shadow-md border-2 p-[1px]">
                    <AvatarImage className="rounded-full" src={userData?.photoUrl || "https://github.com/shadcn.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white/5 backdrop-blur-sm border border-gray-700 mr-3 ">
                  <DropdownMenuLabel className="flex justify-between">My Account

                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/30" />
                  <DropdownMenuGroup>
                    <Link to="/admin/dashboard">
                      <DropdownMenuItem className="flex justify-between cursor-pointer">
                        Dashboard
                      </DropdownMenuItem>
                    </Link>


                    <Link to="/admin/add-course">
                      <DropdownMenuItem className="flex justify-between cursor-pointer">
                        Courses
                        <Edit />
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>


                  <DropdownMenuItem
                    onClick={logoutHandler}
                    className="justify-between flex">

                    Log out
                    <LogOutIcon />              </DropdownMenuItem>
                    {userData?.role === "instructor " && 
                    <>
                  <DropdownMenuSeparator className="bg-white/30" />

                  <DropdownMenuItem className="flex justify-center items-center  bg-slate-950 text-white font-medium hover:text-white m-[2px] p-2  text-sm tracking-widest border rounded-lg">
                    Dashboard                 </DropdownMenuItem>
                    </>}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/auth">
                  <Button className="relative border-white bg-gradient-to-l from-blue-500 via-purple-500 to-pink-500 text-white 
             font-semibold py-1 px-6 rounded-lg shadow-lg 
             transition-all duration-300 ease-in-out 
             hover:from-purple-500 hover:via-pink-500 hover:to-yellow-500 
             hover:shadow-xl active:scale-95 disabled:opacity-50" variant="outline">Login</Button>
                </Link>


              </div>
            )
          }

        </div>





      </div>

    </nav>
  );
};

export default AdminNavbar;
