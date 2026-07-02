import { Sparkles } from "lucide-react";

function StatCard({ title, value }) {
    return (

        <div
            className="
                group
                relative
                overflow-hidden

                rounded-3xl

                bg-gradient-to-br
                from-[#181F36]
                to-[#12182B]

                border
                border-[#2A3150]

                p-7

                transition-all
                duration-300

                hover:border-violet-500/60
                hover:-translate-y-1
                hover:shadow-2xl
                hover:shadow-violet-500/10
            "
        >

            <div
                className="
                    absolute
                    -right-10
                    -top-10

                    w-28
                    h-28

                    rounded-full

                    bg-violet-600/10

                    blur-3xl
                "
            />

            <div className="flex justify-between items-start">

                <p className="text-gray-400 text-sm leading-6">
                    {title}
                </p>

                <div
                    className="
                        w-11
                        h-11

                        rounded-xl

                        bg-violet-500/15

                        flex
                        items-center
                        justify-center

                        text-violet-400

                        transition

                        group-hover:rotate-12
                    "
                >
                    <Sparkles size={18}/>
                </div>

            </div>

            <h2 className="text-5xl font-bold mt-8 tracking-tight">

                {value}

            </h2>

            <div className="mt-8 flex items-center gap-2">

                <div className="w-2 h-2 rounded-full bg-emerald-400"/>

                <span className="text-emerald-400 text-sm">

                    Live Data

                </span>

            </div>

        </div>

    );
}

export default StatCard;