import { Outlet } from "react-router";


const EmployerAuthLayout = () => {
  return (
    <div className="flex flex-row min-h-screen justify-center items-center bg-gray-100">
      <Outlet />
    </div>
  );
};

export default EmployerAuthLayout;
