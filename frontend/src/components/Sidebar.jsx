import {
  LayoutDashboard,
  Search,
  CalendarDays,
  Heart,
  Pin,
  User,
  Settings,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-72 bg-[#12182B] border-r border-[#242A40] p-6">
      <h1 className="text-3xl font-bold text-violet-400 mb-12">
        RecallOS
      </h1>

      <nav className="space-y-3">

        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
        <SidebarItem icon={<Search size={20} />} text="Search" />
        <SidebarItem icon={<CalendarDays size={20} />} text="Timeline" />
        <SidebarItem icon={<Heart size={20} />} text="Favorites" />
        <SidebarItem icon={<Pin size={20} />} text="Pinned" />

        <div className="pt-10" />

        <SidebarItem icon={<User size={20} />} text="Profile" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" />

      </nav>
    </aside>
  );
}

function SidebarItem({ icon, text }) {
  return (
    <div className="flex items-center gap-4 rounded-xl px-4 py-3 cursor-pointer hover:bg-[#1E2642] transition">
      {icon}
      <span>{text}</span>
    </div>
  );
}

export default Sidebar;