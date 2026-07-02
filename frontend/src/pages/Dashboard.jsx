import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import QuickActions from "../components/QuickActions";
import ActivityTimeline from "../components/ActivityTimeline";
import AIAssistant from "../components/AIAssistant";
import api from "../services/api";

function Dashboard() {
    const [stats, setStats] = useState(null);

    const hour = new Date().getHours();

    let greeting = "";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 17) {
        greeting = "Good Afternoon";
    } else if (hour < 21) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }

    const messages = [
        "Your second brain is ready.",
        "Capture less. Remember more.",
        "Everything important, one search away.",
        "Ready to continue where you left off?",
        "Your memories are waiting for you.",
        "Let's organize today's discoveries.",
    ];

    const message =
        messages[new Date().getDate() % messages.length];

    useEffect(() => {
        async function loadDashboard() {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setStats(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        loadDashboard();
    }, []);

    if (!stats) {
        return (
            <Layout>
                <h1>Loading Dashboard...</h1>
            </Layout>
        );
    }

    return (
        <Layout>

            {/* Hero Section */}

            <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">

                <div>

                    <h1 className="text-5xl font-bold leading-tight">
                        {greeting}
                        <span className="ml-3">👋</span>
                    </h1>

                    <p className="text-gray-400 text-xl mt-5">
                        {message}
                    </p>

                </div>

                <AIAssistant />

            </div>

            {/* Stats */}

            <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">

                <StatCard
                    title="Today's Memories"
                    value={stats.today_memories}
                />

                <StatCard
                    title="Total Memories"
                    value={stats.total_memories}
                />

                <StatCard
                    title="Categories"
                    value={stats.categories.length}
                />

                <StatCard
                    title="Recent"
                    value={stats.recent.length}
                />

            </div>

            {/* Continue */}

            <div className="mt-14">

                <h2 className="text-3xl font-bold">
                    Continue where you left off
                </h2>

                <p className="text-gray-400 mt-2 mb-8">
                    Jump back into your latest memory.
                </p>

                {stats.recent.length > 0 && (

                    <div className="bg-[#171d33] border border-[#252d48] rounded-3xl p-8 hover:border-purple-500 transition">

                        <h3 className="text-3xl font-bold">
                            {stats.recent[0].title}
                        </h3>

                        <p className="text-gray-400 mt-4">
                            {stats.recent[0].content}
                        </p>

                        <div className="flex items-center gap-4 mt-6">

                            <span className="bg-purple-600 px-4 py-2 rounded-full text-sm">
                                {stats.recent[0].category}
                            </span>

                            <span className="text-gray-500">
                                📅 {stats.recent[0].timestamp}
                            </span>

                        </div>

                    </div>

                )}

            </div>

            {/* Quick Actions */}

            <QuickActions />

            {/* Recent Memories */}

            <div className="mt-14">

                <h2 className="text-3xl font-bold mb-8">
                    Recent Memories
                </h2>

                <div className="grid lg:grid-cols-2 gap-6">

                    {stats.recent.map((memory) => (

                        <div
                            key={memory.id}
                            className="
                                bg-[#171d33]
                                rounded-3xl
                                border
                                border-[#252d48]
                                p-7
                                hover:border-purple-500
                                hover:-translate-y-2
                                hover:shadow-[0_0_35px_rgba(168,85,247,0.18)]
                                transition-all
                                duration-300
                                cursor-pointer
                            "
                        >

                            <div className="flex justify-between">

                                <div>

                                    <h3 className="text-2xl font-bold">
                                        🧠 {memory.title}
                                    </h3>

                                    <p className="text-gray-400 mt-3">
                                        {memory.content}
                                    </p>

                                </div>

                                <div className="text-purple-400 text-2xl">
                                    →
                                </div>

                            </div>

                            <div className="flex items-center justify-between mt-8">

                                <span className="bg-purple-600 px-4 py-2 rounded-full text-sm">
                                    {memory.category}
                                </span>

                                <span className="text-gray-500">
                                    📅 {memory.timestamp}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            {/* Activity Timeline */}

            <ActivityTimeline />

        </Layout>
    );
}

export default Dashboard;