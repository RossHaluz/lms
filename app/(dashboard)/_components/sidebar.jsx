import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full flex flex-col border-r overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>

      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
