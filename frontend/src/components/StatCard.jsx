function StatCard({ title, value }) {
    return (
        <div className="
            group
            bg-[#171d33]
            rounded-3xl
            p-7
            border
            border-[#252d48]
            transition-all
            duration-300
            hover:border-purple-500
            hover:-translate-y-1
            hover:shadow-[0_0_35px_rgba(139,92,246,0.18)]
        ">

            <div className="flex justify-between items-start">

                <p className="text-gray-400 text-sm font-medium">
                    {title}
                </p>

                <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-purple-600/20
                    flex
                    items-center
                    justify-center
                    text-lg
                ">
                    ✨
                </div>

            </div>

            <h2 className="
                text-5xl
                font-bold
                mt-8
                text-white
            ">
                {value}
            </h2>

            <p className="
                text-green-400
                text-sm
                mt-4
            ">
                ● Live Data
            </p>

        </div>
    );
}

export default StatCard;