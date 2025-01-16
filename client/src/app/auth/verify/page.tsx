"use client";
import { useRouter } from "next/router";
import axios from "axios";

export default  function VerifyPage () {


    const router = useRouter();
    const { code } = router.query;

    const verifyToken = async (e: any) => {
        const response = await axios.get(`https://iupi-fintech-api-dev.onrender.com/auth/verify/${code}`);   
        console.log(response.data);
        

    }

  return (
    <>
    <p>
        Usuario verificado con exito
    </p> 
    </>
  );
};

