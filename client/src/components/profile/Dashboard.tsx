import { instance } from "@/api/axios";
import { useNavigate } from "react-router";

const Dashboard = () => {
    const navigate = useNavigate();

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
            navigate('/auth');
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