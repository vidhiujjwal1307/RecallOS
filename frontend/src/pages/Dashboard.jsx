import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import api from "../services/api";
import QuickActions from "../components/QuickActions";

function Dashboard() {

    const hour = new Date().getHours();
    const [stats, setStats] = useState(null);

    let greeting = "";

    if (hour < 12) {
        greeting = "Good Morning ☀️";
    } else if (hour < 17) {
        greeting = "Good Afternoon 👋";
    } else if (hour < 21) {
        greeting = "Good Evening 🌇";
    } else {
        greeting = "Good Night 🌙";
    }

    const messages = [
        "Your second brain is ready.",
        "Capture less. Remember more.",
        "Everything important, one search away.",
        "Ready to continue where you left off?",
        "Your memories are waiting for you.",
        "Let's organize today's discoveries."
    ];

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

    const message =
        messages[new Date().getDate() % messages.length];

        if (!stats) {

    return (
        <Layout>
            <h1>Loading dashboard...</h1>
        </Layout>
    );

}

    return (

        <Layout>

            <div className="mb-12">

    <div className="flex items-center gap-4">

        <h1 className="text-6xl font-bold text-white">
            {greeting}
        </h1>

        <span className="text-5xl">
            🧠
        </span>

    </div>

    <p className="text-gray-400 text-xl mt-5 max-w-2xl">
        {message}
    </p>

</div>

            <div className="grid grid-cols-4 gap-7">

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
<div className="mt-14">

    <h2 className="text-3xl font-bold">
        Continue where you left off
    </h2>

    <p className="text-gray-400 mt-2 mb-8">
        Jump back into your latest memory.
    </p>

    {stats.recent.length > 0 && (

        <div className="bg-[#171d33] border border-[#252d48] rounded-2xl p-8 mb-10 hover:border-purple-500 transition">

            <h3 className="text-3xl font-bold">
                {stats.recent[0].title}
            </h3>

            <p className="text-gray-400 mt-3">
                {stats.recent[0].content}
            </p>

            <div className="flex gap-3 mt-6">

                <span className="bg-purple-600 px-4 py-1 rounded-full text-sm">
                    {stats.recent[0].category}
                </span>

                <span className="text-gray-500">
                    {stats.recent[0].timestamp}
                </span>

            </div>

        </div>

    )}
    <QuickActions />

    <h2 className="text-2xl font-semibold mb-6">
        Recent Memories
    </h2>

    <div className="space-y-4">

        {stats.recent.map((memory) => (

            <div
                key={memory.id}
                className="bg-[#171d33] rounded-xl p-5 border border-[#252d48]"
            >

                <h3 className="text-xl font-semibold">
                    {memory.title}
                </h3>

                <p className="text-gray-400 mt-2">
                    {memory.content}
                </p>

                <div className="flex gap-3 mt-4">

                    <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">
                        {memory.category}
                    </span>

                    <span className="text-gray-500 text-sm">
                        {memory.timestamp}
                    </span>

                </div>

            </div>

        ))}

    </div>

</div>

        </Layout>

    );

}

export default Dashboard;