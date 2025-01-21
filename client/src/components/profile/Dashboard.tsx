import { instance } from "@/api/axios";

const Dashboard = () => {
const handleLogout = async () => {
    console.log("Logout");
    
        try {
          await instance.get(
            '/auth/logout',
            {
              withCredentials: true,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
              }
            }
          );
        } catch (error: any) {
          console.error(error);
        }
}

  return (
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard