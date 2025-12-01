"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";


interface Task {
    id: number;
    text: string;
    done: boolean;
}


export default function Todolist() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);


    const addTask = () => {
        if (!task.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: task, done: false }]);
        setTask("");
    };

    const toggleDone = (id: number) => {
        setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <div className="mt-10 min-h-screen bg-gradient-to-br from-blue-200 via-slate-100 to-purple-200 flex flex-col items-center p-6 relative overflow-hidden">

            
            <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
            <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

            
            <motion.h1
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-gray-900 drop-shadow-sm mt-10 text-center"
            >
                Set Your To-Do List
            </motion.h1>

            
            <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-xl mt-6 backdrop-blur-xl bg-white/20 shadow-xl border border-white/30 p-5 rounded-2xl flex gap-3"
            >
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Write something meaningful…"
                    className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 backdrop-blur-xl text-gray-800 placeholder-gray-700 focus:ring focus:ring-blue-300 outline-none"
                />
                <button
                    onClick={addTask}
                    className="bg-blue-600/70 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-lg backdrop-blur-xl"
                >
                    <Plus size={20} /> Add
                </button>
            </motion.div>


            <div className="w-full max-w-xl mt-6">
                <AnimatePresence>
                    {tasks.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                            className="backdrop-blur-xl bg-white/10 border border-white/20 px-5 py-4 mb-4 rounded-2xl shadow-lg flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <button onClick={() => toggleDone(t.id)}>
                                    <CheckCircle2
                                        size={26}
                                        className={`${t.done ? "text-green-500" : "text-gray-400"
                                            } transition`}
                                    />
                                </button>

                                <p
                                    className={`text-gray-900 text-lg ${t.done ? "line-through opacity-60" : ""
                                        }`}
                                >
                                    {t.text}
                                </p>
                            </div>

                            <button
                                onClick={() => deleteTask(t.id)}
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
