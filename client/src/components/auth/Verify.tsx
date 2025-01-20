import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
const verify: string  = import.meta.env.VITE_VERIFIY as string;

const VerifyPage = ()  => {
  const [verified, setVerified] = useState<boolean | null>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  useEffect(() => {
    const response = axios.get(`${verify}/${code}`);
    response.then(() => setVerified(true)).catch((_error) => setVerified(false))
  }, [code])

  return (
    (verified 
      ? <p className="text-lightBlue font-medium mt-5 -mb-4 text-base">Usuario verificado con exito: {code}</p>
      : <p className="text-lightBlue font-medium mt-5 -mb-4 text-base">Error</p>
    )
  );
};

export default VerifyPage;