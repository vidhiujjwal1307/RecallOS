import { Sparkles } from "lucide-react";

function AIAssistant() {
    return (
        <div className="bg-gradient-to-r from-violet-600/10 to-indigo-600/10 border border-violet-500/20 rounded-3xl p-6">

            <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center">
                    <Sparkles size={24}/>
                </div>

                <div>
                    <h2 className="text-xl font-semibold">
                        AI Assistant
                    </h2>

                    <p className="text-gray-400">
                        Your memory companion.
                    </p>
                </div>

            </div>

            <div className="mt-8 space-y-4">

                <Suggestion text="💡 I found 3 notes about React Hooks." />
                <Suggestion text="📄 Resume.pdf hasn't been opened in 18 days." />
                <Suggestion text="📌 You saved 12 AI articles this week." />

            </div>

        </div>
    );
}

function Suggestion({ text }) {
    return (
        <div className="bg-[#171d33] rounded-xl p-4 hover:border-violet-500 border border-transparent transition">
            {text}
        </div>
    );
}

export default AIAssistant;