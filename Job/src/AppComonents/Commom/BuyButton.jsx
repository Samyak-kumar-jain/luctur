import { Button } from '../../components/ui/button';
import { useCreateCheckoutSessionMutation } from '@/Features/Apis/purcaseApi'
import { Loader2Icon } from 'lucide-react';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';

const BuyButton = ({courseId}) => {
  const [createCheckoutSession,{isLoading,data,isSuccess,isError,error}] = useCreateCheckoutSessionMutation();
  console.log(data)
  console.log(data?.url)

  

  const purchaseCurseHandler = async () =>{
    await createCheckoutSession(courseId);
   
  }

  useEffect(()=>{
    if(isSuccess){
      if(data?.url){
        window.location.href = data.url;
      }else{
        toast.error("response not responding", {
                className: "custom-toast",
              });
      }
      if(isError){
        toast.error( error?.data?.message || "An error occurred", {
                className: "custom-toast",
              });
      }
    }

  },[data,isSuccess,isError,error])
  return (
    <Button disabled={isLoading} className="w-full"
    onClick={purchaseCurseHandler}>
      {
        isLoading ? (
          <Loader2Icon className='mr-2 h-4 w-4 animate-spin'>

          </Loader2Icon>
        ) :"Buy Now"
      }


    </Button>
  )
}

export default BuyButton