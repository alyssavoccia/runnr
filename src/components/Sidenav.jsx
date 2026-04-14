import { Link, NavLink } from "react-router";
import { LayoutDashboard, Activity, Upload, Smartphone, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/images/logo.svg";

const navItemBase =
  "relative group flex items-center gap-3 py-2.5 px-3 mb-1 rounded-md text-sm transition-all duration-150 ease-in-out";

const navItemActive =
  "bg-brand-50 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:rounded-r-xs before:bg-brand-600 before:h-2/3 before:w-0.75";

const navItemInactive = "hover:bg-brand-50";

const NavItem = ({ to, icon: Icon, label, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `${navItemBase} ${isActive ? navItemActive : navItemInactive} justify-center md:justify-start`
    }
    prefetch="none"
  >
    {({ isActive }) => (
      <>
        <Icon
          size={16}
          className={`shrink-0 ${isActive ? "text-brand-600" : "text-brand-muted group-hover:text-brand-600"}`}
        />
        <span
          className={`${isActive ? "font-medium text-brand-600" : "text-brand-muted group-hover:text-brand-600"} text-xs hidden md:inline`}
        >
          {label}
        </span>
      </>
    )}
  </NavLink>
);

const Sidenav = () => {
  const { logout } = useAuth();

  return (
    <aside className="fixed top-0 left-0 bottom-0 z-50 flex flex-col bg-white border-r border-app-border w-14 md:w-60 transition-all duration-200">
      <Link
        to="/app"
        className="flex items-center justify-center md:justify-start gap-2 py-6 px-5 md:p-5 border-b border-app-border"
      >
        <img className="w-7 md:w-8 bg-transparent drop-shadow drop-shadow-brand-600/40" src={logo} alt="Runnr logo" />
        <span className="hidden md:inline font-heading font-bold tracking-tighter">Runnr</span>
      </Link>
      <nav className="py-3 px-2 md:px-3 flex-1 overflow-y-auto">
        <p className="hidden md:block font-medium text-brand-muted/90 text-xxs tracking-widest uppercase px-2.5 mb-1">
          Main
        </p>
        <NavItem to="/app" icon={LayoutDashboard} label="Dashboard" end />
        <NavItem to="/app/workouts" icon={Activity} label="Workouts" />
        <p className="hidden md:block font-medium text-brand-muted/90 text-xxs tracking-widest uppercase px-2.5 mt-5 mb-1">
          Setup
        </p>
        <NavItem to="/app/import" icon={Upload} label="Import" />
        <NavItem to="/app/sync" icon={Smartphone} label="Auto-sync" />
      </nav>
      <div className="p-2 md:p-3 border-t border-app-border">
        <button
          onClick={logout}
          className="group flex items-center gap-3 py-2.5 px-3 rounded-md cursor-pointer text-sm text-brand-muted hover:bg-brand-50 transition w-full"
        >
          <LogOut className="group-hover:text-brand-600" size={16} />
          <span className="hidden md:inline text-xs group-hover:text-brand-600">Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidenav;
