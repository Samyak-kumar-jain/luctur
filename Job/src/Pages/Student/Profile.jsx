import Course from '@/AppComonents/Student/course';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetUserQuery, useUpdateUserMutation } from '@/Features/Apis/authApi';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Edit2, Loader2Icon, LucideLoaderCircle } from 'lucide-react';
import { useState } from 'react';

const Profile = () => {
  const [name, setname] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const { data, isLoading ,refetch } = useGetUserQuery();
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  console.log(data);

  
  const user = data?.user || {}; // Safely accessing user with fallback
 
  const updateUserData = async () => {
    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('profilePhoto', profilePhoto);
    
  
    try {
      await updateUser(formdata).unwrap(); // Assuming unwrap will throw an error if updateUser fails
      
      toast.success('Profile updated successfully!', {
        className: "custom-toast",
      });
      refetch();
    } catch (error) {
      const errorMessage = error?.data?.message || 'Something went wrong, please try again';
      toast.error(errorMessage, {
        className: "custom-toast",
      });
    }
  };

  const onChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
    }
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-black z-30">
        <LucideLoaderCircle className="animate-spin text-blue-700 w-10 h-10" />
      </div>
    );
  }

  return (
    <>
      <div className="relative bg-gray-900/40 mx-5 mt-28 border py-6 px-6 md:mx-32 rounded-2xl">
        <h1 className="bg-gradient-to-r from-blue-300 via-blue-200 to-gray-300 text-transparent bg-clip-text font-bold text-3xl text-center md:t ext-left ml-2 tracking-widest">
          Profile
        </h1>
        <div className="flex flex-col md:flex-row md:justify-start items-center md:items-start md:gap-8 space-y-3 justify-center my-7">
          {/* Avatar Section */}
          <div className="flex flex-col items-center md:items-start   ">
          <Avatar
  className="relative cursor-pointer h-20 w-20 md:h-32 md:w-32 mb-2 rounded-full p-[2px]
             bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
             animate-gradient-border bg-[length:200%_200%] shadow-md border-2"
>
  <div
    className="h-full w-full  rounded-full flex items-center justify-center
               shadow-inner object-contain "
  >
    <AvatarImage
      src={user?.photoUrl || "https://github.com/shadcn.png"}
      className="rounded-full"
    />
    <AvatarFallback>CN</AvatarFallback>
  </div>
</Avatar>






          </div>
          <div className="text-center md:text-start">
            <div className='mb-2'>
              <h2 className='font-semibold sm:text-xl'>
                Name:
                <span className='font-normal ml-2'>
                  {user?.email?.charAt(0).toUpperCase() + user?.email?.slice(1, 6) || "None"}
                </span>
              </h2>
            </div>
            <div className='mb-2'>
              <h2 className='font-semibold sm:text-xl'>
                Email:
                <span className='font-normal ml-2'>
                  {user?.email || "None"}
                </span>
              </h2>
            </div>
            <div className='mb-2'>
              <h2 className='font-semibold sm:text-xl'>
                Role:
                <span className='font-normal ml-2'>
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1).toLowerCase() || "None"}
                </span>
              </h2>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-3 relative border-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white 
             font-semibold py-2 px-6 rounded-lg shadow-lg 
             transition-all duration-300 ease-in-out 
             hover:from-purple-500 hover:via-pink-500 hover:to-yellow-500 
             hover:shadow-xl active:scale-95 disabled:opacity-50">
                  Edit Profile
                  <Edit2 />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>Edit Your Profile here</DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label>Name</Label>
                    <Input
                      type="text"
                      placeholder="name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label>Profile image</Label>
                    <Input
                      type="file"
                      placeholder="Upload Image"
                      accept="image/*"
                      onChange={onChangeHandler}
                      className="col-span-3"
                    />
                  </div>
                  <DialogFooter>
                  <Button
  className="relative border-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white 
             font-semibold py-2 px-6 rounded-lg shadow-lg 
             transition-all duration-300 ease-in-out 
             hover:from-purple-500 hover:via-pink-500 hover:to-yellow-500 
             hover:shadow-xl active:scale-95 disabled:opacity-50"
  onClick={updateUserData}
  disabled={updateLoading}
>                      {updateLoading ? (
                        <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className='relative my-7 bg-gray-600/10 mx-5 border py-6 px-6 md:mx-32 rounded-2xl'>
        <h1 className='font-md text-2xl tracking-wider'>Enrolled courses</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {user?.enrolledCourses?.length === 0 ? (
            <div className='w-full h-[50vh] flex justify-center items-center'>
              <h1 className='flex items-center justify-center'>Not Enrolled in any course</h1>
            </div>
          ) : (
            user?.enrolledCourses
?.map((course, index) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
