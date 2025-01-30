import { IProfileData } from "@/interfaces/profile.interfaces";
import DefaultProfileImage from "./default-profile-image";

interface NavbarProps {
  className: string;
  profileData: IProfileData | null;
}  
  
const TopNavbar = ({ className, profileData }: NavbarProps) => {
  return (
    <section className={className}>
      <div className="flex justify-between items-center">
        <div className="w-[40%] grid grid-flow-col grid-rows-3 pt-4 -mb-3">
          {!profileData?.image 
            ? <DefaultProfileImage className="row-span-3 w-[60%] pt-2" />
            : <img src={profileData.image} className="row-span-3 rounded-full w-[70%] mt-1" alt="image" />
          }
          <p className="col-span-2 text-lightBlue text-[14px]">Hola, {profileData?.name}</p>
          <p className="col-span-2 text-lightBlue text-[14px]">Cuenta normal</p>
        </div>
        <div className="pt-2">
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Group">
              <path id="Vector" d="M9.00005 0C7.14354 0 5.36306 0.737498 4.0503 2.05025C2.73755 3.36301 2.00005 5.14348 2.00005 7V10.528C2.0002 10.6831 1.96425 10.8362 1.89505 10.975L0.178052 14.408C0.0941789 14.5757 0.0545745 14.7621 0.0630009 14.9494C0.0714274 15.1368 0.127605 15.3188 0.226197 15.4783C0.32479 15.6379 0.462525 15.7695 0.626319 15.8608C0.790114 15.9521 0.97453 16 1.16205 16H16.8381C17.0256 16 17.21 15.9521 17.3738 15.8608C17.5376 15.7695 17.6753 15.6379 17.7739 15.4783C17.8725 15.3188 17.9287 15.1368 17.9371 14.9494C17.9455 14.7621 17.9059 14.5757 17.8221 14.408L16.1061 10.975C16.0365 10.8362 16.0002 10.6832 16.0001 10.528V7C16.0001 5.14348 15.2626 3.36301 13.9498 2.05025C12.637 0.737498 10.8566 0 9.00005 0ZM9.00005 19C8.3794 19.0003 7.77392 18.8081 7.26707 18.4499C6.76022 18.0917 6.37694 17.5852 6.17005 17H11.8301C11.6232 17.5852 11.2399 18.0917 10.733 18.4499C10.2262 18.8081 9.6207 19.0003 9.00005 19Z" fill="#BDE9FF"/>
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
  
export default TopNavbar;