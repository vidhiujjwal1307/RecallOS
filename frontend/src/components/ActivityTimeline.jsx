import {
    FileText,
    Link2,
    Mic,
     PlayCircle,
} from "lucide-react";

const activities = [

    {
        day: "Today",
        items: [
            {
                icon: FileText,
                title: "Uploaded Resume.pdf",
                time: "10 min ago",
            },
            {
                icon: Link2,
                title: "Saved StackOverflow",
                time: "35 min ago",
            },
            {
                icon: Mic,
                title: "Recorded Voice Note",
                time: "1 hr ago",
            },
        ],
    },

    {
        day: "Yesterday",
        items: [
            {
                icon:  PlayCircle,
                title: "Saved  PlayCircle, Video",
                time: "Yesterday",
            },
            {
                icon: FileText,
                title: "Research Paper.pdf",
                time: "Yesterday",
            },
        ],
    },

];
function ActivityTimeline() {

    return (

        <div className="mt-16">

            <h2 className="text-3xl font-bold">
                Activity
            </h2>

            <p className="text-gray-400 mt-2">
                Everything you've captured recently.
            </p>

            <div className="mt-10 space-y-10">

                {activities.map((section) => (

                    <div key={section.day}>

                        <h3 className="text-violet-400 font-semibold mb-6">
                            {section.day}
                        </h3>

                        <div className="space-y-5">

                            {section.items.map((item) => {

                                const Icon = item.icon;

                                return (

                                    <div
                                        key={item.title}
                                        className="
                                            flex
                                            items-center
                                            gap-5

                                            bg-[#171d33]

                                            border
                                            border-[#252d48]

                                            rounded-2xl

                                            px-6
                                            py-5

                                            hover:border-violet-500
                                            transition
                                        "
                                    >

                                        <div
                                            className="
                                                w-12
                                                h-12

                                                rounded-xl

                                                bg-violet-600/20

                                                flex
                                                items-center
                                                justify-center

                                                text-violet-400
                                            "
                                        >
                                            <Icon size={22}/>
                                        </div>

                                        <div className="flex-1">

                                            <h4 className="font-semibold text-lg">
                                                {item.title}
                                            </h4>

                                            <p className="text-gray-500 text-sm mt-1">
                                                {item.time}
                                            </p>

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default ActivityTimeline;