/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from "axios";

const VerifyPage = ()  => {
  const [verified, setVerified] = useState<boolean | null>(null);
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    const response = axios.get(`https://iupi-fintech-api-dev.onrender.com/auth/verify/${code}`);
    response.then(() => setVerified(true)).catch((_error) => setVerified(false))
  }, 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [])

  return (
    (verified 
      ? <p className="text-lightBlue font-medium mt-5 -mb-4 text-base">Usuario verificado con exito: {code}</p>
      : <p className="text-lightBlue font-medium mt-5 -mb-4 text-base">Error</p>
    )
  );
};

export default VerifyPage;
