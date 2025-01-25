import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/di0cvbfdb/image/upload/v1736978203/fintech/nbaxvzcfombcx2zzlun6.png')`,
      }}
    >
      <div className="container mx-auto px-4">
        <Outlet />
      </div>
    </div>
  );
};
  
export default MainLayout;
