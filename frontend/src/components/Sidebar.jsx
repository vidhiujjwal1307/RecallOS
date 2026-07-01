import {
  LayoutDashboard,
  Search,
  CalendarDays,
  Heart,
  Pin,
  User,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Search",
    icon: Search,
    path: "/search",
  },
  {
    name: "Timeline",
    icon: CalendarDays,
    path: "/timeline",
  },
  {
    name: "Favorites",
    icon: Heart,
    path: "/favorites",
  },
  {
    name: "Pinned",
    icon: Pin,
    path: "/pinned",
  },
];

const bottom = [
  {
    name: "Profile",
    icon: User,
    path: "/profile",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

function Sidebar() {
  return (
    <aside className="w-72 bg-[#12182B] border-r border-[#242A40] flex flex-col">

      <div className="px-8 pt-8 pb-10">

        <h1 className="text-4xl font-extrabold tracking-tight text-violet-400">
          RecallOS
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          Your Second Brain
        </p>

      </div>

      <nav className="flex-1 px-5">

        {menu.map((item) => (

          <SidebarItem
            key={item.name}
            {...item}
          />

        ))}

        <div className="h-12" />

        {bottom.map((item) => (

          <SidebarItem
            key={item.name}
            {...item}
          />

        ))}

      </nav>

    </aside>
  );
}

function SidebarItem({ icon: Icon, name, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `
        flex
        items-center
        gap-4
        px-5
        py-4
        rounded-2xl
        mb-2
        transition-all
        duration-300

        ${
          isActive
            ? "bg-violet-600 text-white shadow-lg"
            : "text-gray-400 hover:bg-[#1C2238] hover:text-white"
        }
      `
      }
    >
      <Icon size={22} />

      <span className="font-medium text-lg">
        {name}
      </span>
    </NavLink>
  );
}

export default Sidebar;