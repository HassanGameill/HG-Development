import Sidebar from "./Sidebar";

const DashboardSidebar = () => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-56 flex-col">
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardSidebar;
