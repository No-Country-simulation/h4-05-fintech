import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { instance } from '@/api/axios';

const VerifyPage = ()  => {
  const [verified, setVerified] = useState<boolean | null>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  useEffect(() => {
    const response = instance.get(`/auth/verify?code=${code}`);
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