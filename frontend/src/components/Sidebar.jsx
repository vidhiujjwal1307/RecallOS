import {
  LayoutDashboard,
  Search,
  CalendarDays,
  Heart,
  Pin,
  User,
  Settings,
  Brain,
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

        <div className="flex items-center gap-4">

          <div className="
            w-12
            h-12
            rounded-2xl
            bg-gradient-to-br
            from-violet-500
            to-purple-700
            flex
            items-center
            justify-center
            shadow-lg
            shadow-violet-500/20
          ">
            <Brain size={24} className="text-white" />
          </div>

          <div>

            <h1 className="text-3xl font-bold tracking-tight text-white">
              RecallOS
            </h1>

            <p className="text-gray-500 text-sm">
              Your Second Brain
            </p>

          </div>

        </div>

      </div>

      <nav className="flex-1 px-5">

        {menu.map((item) => (
          <SidebarItem
            key={item.name}
            {...item}
          />
        ))}

        <div className="mt-10 mb-6 border-t border-[#242A40]" />

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
        group
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
            ? "bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-xl shadow-violet-500/20"
            : "text-gray-400 hover:bg-[#1B2238] hover:text-white hover:translate-x-1"
        }
      `
      }
    >
      <Icon
        size={21}
        className="transition-transform duration-300 group-hover:scale-110"
      />

      <span className="font-medium text-lg">
        {name}
      </span>
    </NavLink>
  );
}

export default Sidebar;