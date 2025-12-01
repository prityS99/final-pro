"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, Plus, Trash2 } from "lucide-react";


interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
}


export default function Calendar() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);


  const addEvent = () => {
    if (!title || !date || !time) return;

    setEvents([
      ...events,
      {
        id: Date.now(),
        title,
        date,
        time,
      },
    ]);

    setTitle("");
    setDate("");
    setTime("");
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="mt-18 min-h-screen bg-gradient-to-br from-blue-200 via-slate-100 to-purple-200 p-6 flex flex-col items-center relative overflow-hidden">

     
      <div className="absolute w-96 h-96 bg-blue-500/20 blur-3xl rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full bottom-12 right-10 animate-pulse" />

   
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-900 mt-10 drop-shadow-lg"
      >
        Team Calendar
      </motion.h1>

      
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mt-10 backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl rounded-2xl p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Event</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white/20 backdrop-blur-xl border border-white/30 px-4 py-2 rounded-lg outline-none"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-white/20 backdrop-blur-xl border border-white/30 px-4 py-2 rounded-lg outline-none"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-white/20 backdrop-blur-xl border border-white/30 px-4 py-2 rounded-lg outline-none"
          />
        </div>

        <button
          onClick={addEvent}
          className="mt-5 bg-blue-600/70 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition shadow-lg"
        >
          <Plus size={20} /> Add
        </button>
      </motion.div>

      
      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>

        <AnimatePresence>
          {events.map((e) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 px-5 py-4 rounded-2xl shadow-lg mb-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{e.title}</h3>

                <div className="text-gray-700 flex gap-3 items-center mt-2">
                  <CalendarDays size={20} /> {e.date}
                </div>

                <div className="text-gray-700 flex gap-3 items-center mt-1">
                  <Clock size={20} /> {e.time}
                </div>
              </div>

              <button onClick={() => deleteEvent(e.id)} className="text-red-400 hover:text-red-600 transition">
                <Trash2 size={24} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
