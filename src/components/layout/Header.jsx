
import { useLocation } from "react-router-dom";
import {
  Menu,
  Bell,
  ChevronRight,
  Leaf,
} from "lucide-react";

const pageTitles = {
  "/": "Overview",
  "/environment": "Environmental Monitoring",
  "/energy": "Energy Management",
  "/control": "Control & Configuration",
  "/experiments": "Performance Analysis",
  "/alerts": "Alerts & System Logs",
  "/settings": "System Settings",
};

function Header({ onMenuClick }) {
  const location = useLocation();

  const currentPage =
    pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">

      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        <div>
          <div className="mb-1 hidden items-center gap-2 text-xs text-gray-400 sm:flex">
            <span>EcoCool Node</span>
            <ChevronRight size={13} />
            <span className="font-medium text-[#23866C]">
              {currentPage}
            </span>
          </div>

          <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
            {currentPage}
          </h2>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* Notification */}
        <button
          className="relative rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          aria-label="Notifications"
        >
          <Bell size={21} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-orange-500" />
        </button>

        <div className="hidden h-8 w-px bg-gray-200 sm:block" />

        {/* User profile */}
        <div className="flex items-center gap-3">
          {/* <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-gray-800">
              EcoCool Admin
            </p>
            <p className="text-xs text-gray-400">
              System Administrator
            </p>
          </div> */}

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E0F2EC] text-[#23866C]">
            <Leaf size={21} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
