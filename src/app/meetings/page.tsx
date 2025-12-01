"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, User, Plus, Trash2 } from "lucide-react";

interface Meeting {
    id: number;
    title: string;
    time: string;
    date: string;
}


export default function Meetings() {
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [meetings, setMeetings] = useState<Meeting[]>([]);


    const addMeeting = () => {
        if (!title || !time || !date) return;

        setMeetings([
            ...meetings,
            {
                id: Date.now(),
                title,
                time,
                date,
            },
        ]);

        setTitle("");
        setTime("");
        setDate("");
    };

    const deleteMeeting = (id: number) => {
        setMeetings(meetings.filter((m) => m.id !== id));
    };

    return (
        <div className="mt-18 min-h-screen bg-gradient-to-br from-blue-200 via-slate-100 to-purple-200 flex flex-col items-center p-6 relative overflow-hidden">

            
            <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
            <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

            
            <motion.h1
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-gray-900 drop-shadow-sm mt-10 text-center"
            >
                Team Meetings
            </motion.h1>

            
            <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-2xl mt-8 backdrop-blur-xl bg-white/20 shadow-xl border border-white/30 rounded-2xl p-6"
            >
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Schedule a Meeting</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Meeting Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-white/20 border border-white/30 backdrop-blur-xl w-full px-4 py-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
                    />

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-white/20 border border-white/30 backdrop-blur-xl w-full px-4 py-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
                    />

                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="bg-white/20 border border-white/30 backdrop-blur-xl w-full px-4 py-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
                    />
                </div>

                <button
                    onClick={addMeeting}
                    className="mt-5 bg-blue-600/70 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition shadow-lg"
                >
                    <Plus size={20} /> Add Meeting
                </button>
            </motion.div>

            
            <div className="w-full max-w-2xl mt-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Upcoming Meetings</h2>

                <AnimatePresence>
                    {meetings.length === 0 && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-gray-700 text-center mt-4"
                        >
                            No meetings scheduled yet…
                        </motion.p>
                    )}

                    {meetings.map((m) => (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 40 }}
                            transition={{ duration: 0.3 }}
                            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-5 mb-4 shadow-lg flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                    <User size={20} className="text-blue-700" /> {m.title}
                                </h3>

                                <div className="flex items-center gap-3 mt-2 text-gray-700">
                                    <CalendarDays size={20} /> {m.date}
                                </div>

                                <div className="flex items-center gap-3 mt-1 text-gray-700">
                                    <Clock size={20} /> {m.time}
                                </div>
                            </div>

                            <button
                                onClick={() => deleteMeeting(m.id)}
                                className="text-red-400 hover:text-red-600 transition"
                            >
                                <Trash2 size={24} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
