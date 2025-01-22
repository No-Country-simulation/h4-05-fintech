import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import useLogout from "@/hooks/useLogout";

const Dashboard = () => {
  const navigate = useNavigate();

  const { setLogout } = useLogout({
    onSuccess: () =>  navigate('/auth'),
    onReject: () => console.error("Ha ocurrido un error"),
  })

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLogout();
  }

  return (
    <nav className="flex justify-between items-center py-3">
      <div>
        <p className="text-[#BDE9FF]">Mi tablero</p>
      </div>
      <div>
        <Button 
          className="w-full px-4 py-3 bg-[#11668233] text-[#BDE9FF] text-base font-normal tracking-wide"
          onClick={handleLogout}
        >
          Cerrar sesión
        </Button>
      </div>
    </nav>
  )
}

export default Dashboard