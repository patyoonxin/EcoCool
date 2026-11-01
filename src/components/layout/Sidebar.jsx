
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Thermometer,
  Zap,
  SlidersHorizontal,
  ChartNoAxesCombined,
  AlertTriangle,
  Settings,
  Sprout,
  Leaf,
  X,
  Wifi,
} from "lucide-react";

const navigation = [
  {
    title: "MAIN MENU",
    items: [
      { name: "Overview", path: "/", icon: LayoutDashboard },
      { name: "Environment", path: "/environment", icon: Thermometer },
      { name: "Energy", path: "/energy", icon: Zap },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { name: "Control", path: "/control", icon: SlidersHorizontal },
      { name: "Experiments", path: "/experiments", icon: ChartNoAxesCombined },
      { name: "Alerts & Logs", path: "/alerts", icon: AlertTriangle },
    ],
  },
  {
    title: "PREFERENCES",
    items: [
      { name: "Settings", path: "/settings", icon: Settings },
    ],
  },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col
          bg-[#123D32] text-white transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#36B99A]">
              <Sprout size={24} className="text-white" />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-wide">
                EcoCool<span className="text-[#58D6B4]"> Node</span>
              </h1>
              <p className="text-xs text-green-200/60">
                Smart Ventilation System
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="overflow-auto scrollbar-none flex-1 space-y-7 overflow-y-auto px-4 py-7">
          {navigation.map((section) => (
            <div key={section.title}>
              <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.15em] text-green-200/50">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === "/"}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all ${
                          isActive
                            ? "bg-[#36B99A] font-semibold text-white shadow-lg shadow-black/10"
                            : "text-green-100/70 hover:bg-white/10 hover:text-white"
                        }`
                      }
                    >
                      <Icon size={19} strokeWidth={1.8} />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        
      </aside>
    </>
  );
}

export default Sidebar;
