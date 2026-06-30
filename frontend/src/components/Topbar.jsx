import { Bell, Search } from "lucide-react";

function Topbar() {
  return (
    <header className="h-20 border-b border-[#242A40] flex items-center justify-between px-8">

      <h2 className="text-3xl font-bold">
        Dashboard
      </h2>

      <div className="flex items-center gap-5">

        <div className="flex items-center bg-[#12182B] rounded-xl px-4 py-2 w-96">
          <Search size={18} />
          <input
            placeholder="Search memories..."
            className="bg-transparent outline-none ml-3 w-full"
          />
        </div>

        <Bell />

        <div className="w-11 h-11 rounded-full bg-violet-500" />

      </div>

    </header>
  );
}

export default Topbar;