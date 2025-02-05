import { NavLink, Outlet } from "react-router";

const InversionsLayout = () => {
  const classNameFunctionNavLink = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'flex flex-col px-12 py-2 rounded-xl items-center justify-center text-center bg-rusty text-lightBlue'
      : 'flex flex-col px-12 py-2 rounded-xl items-center justify-center text-center bg-darkBlue text-lightBlue'

  return (
    <>
      <header className="fixed w-full flex justify-between items-center bg-turqouise text-lightBlue -ml-4 px-6 py-4 mb-6">
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <p>Inversiones</p>
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </header>
      <section className="w-full overflow-x-auto lg:max-w-md row-span-12 mt-16">
        <div className="overflow-x-auto scrollbar-hidden mb-12">
          <div className="inline-flex space-x-3 justify-center">
            <NavLink to={'/dashboard/inversions/savings'} className={classNameFunctionNavLink}>Ahorro</NavLink>
            <NavLink to={'/dashboard/inversions/shares'} className={classNameFunctionNavLink}>Acciones</NavLink>
            <NavLink to={'/dashboard/inversions/cdears'} className={classNameFunctionNavLink}>Cdears</NavLink>
            <NavLink to={'/dashboard/inversions/bonuses'} className={classNameFunctionNavLink}>Bonos</NavLink>
            <NavLink to={'/dashboard/inversions/etfs'} className={classNameFunctionNavLink}>ETFs</NavLink>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </section>
    </>
  )
}

export default InversionsLayout;