import {
    Plus,
    Upload,
    Mic,
    Link2
} from "lucide-react";

const actions = [
    {
        title: "New Memory",
        icon: Plus,
    },
    {
        title: "Upload File",
        icon: Upload,
    },
    {
        title: "Record Voice",
        icon: Mic,
    },
    {
        title: "Save Link",
        icon: Link2,
    },
];

function QuickActions() {
    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">
                ⚡ Quick Actions
            </h2>

            <div className="grid grid-cols-4 gap-5">

                {actions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <button
                            key={action.title}
                            className="
                            bg-[#12182B]
                            border
                            border-[#242A40]
                            rounded-2xl
                            p-6
                            hover:border-purple-500
                            hover:-translate-y-1
                            hover:shadow-lg
                            transition
                            duration-300
                            text-left
                        "
                        >
                            <Icon
                                size={34}
                                className="text-purple-400 mb-5"
                            />

                            <p className="text-lg font-semibold">
                                {action.title}
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default QuickActions;