import { Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";

const placeholders = [
    "Search memories...",
    "Search PDFs...",
    "Search websites...",
    "Search YouTube videos...",
    "Search conversations...",
    "Ask RecallOS anything..."
];

function Topbar() {

    const [placeholder, setPlaceholder] = useState(placeholders[0]);

    useEffect(() => {

        let index = 0;

        const interval = setInterval(() => {

            index = (index + 1) % placeholders.length;

            setPlaceholder(placeholders[index]);

        }, 2500);

        return () => clearInterval(interval);

    }, []);

    return (

        <header className="h-20 border-b border-[#242A40] flex items-center justify-between px-8">

            <div>

                <h2 className="text-3xl font-bold">
                    Dashboard
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                    Welcome back 👋
                </p>

            </div>

            <div className="flex items-center gap-5">

                <div className="
                    w-[430px]
                    h-14
                    bg-[#12182B]
                    rounded-2xl
                    border
                    border-[#242A40]
                    flex
                    items-center
                    px-5
                    hover:border-violet-500
                    transition
                ">

                    <Search
                        size={18}
                        className="text-gray-500"
                    />

                    <input
                        className="
                            bg-transparent
                            outline-none
                            ml-4
                            flex-1
                        "
                        placeholder={placeholder}
                    />

                    <span className="
                        text-xs
                        text-gray-500
                        border
                        border-[#303754]
                        px-2
                        py-1
                        rounded-lg
                    ">
                        Ctrl K
                    </span>

                </div>

                <button className="
                    w-12
                    h-12
                    rounded-xl
                    bg-[#12182B]
                    border
                    border-[#242A40]
                    hover:border-violet-500
                    transition
                ">
                    <Bell className="mx-auto" size={20}/>
                </button>

                <button className="
                    w-12
                    h-12
                    rounded-full
                    bg-gradient-to-r
                    from-violet-500
                    to-purple-600
                    font-bold
                ">
                    V
                </button>

            </div>

        </header>

    );

}

export default Topbar;