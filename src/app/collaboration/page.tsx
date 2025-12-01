"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";


type ColumnKey = "todo" | "progress" | "done";

interface TaskItem {
  id: number;
  text: string;
}

interface ColumnProps {
  title: string;
  items: TaskItem[];
  from: ColumnKey;
  moveTask: (from: ColumnKey, to: ColumnKey, id: number) => void;
}

export default function Collaboration() {
  const [task, setTask] = useState("");
  const [columns, setColumns] = useState<Record<ColumnKey, TaskItem[]>>({
    todo: [],
    progress: [],
    done: [],
  });

  const addTask = () => {
    if (!task.trim()) return;
    setColumns({
      ...columns,
      todo: [...columns.todo, { id: Date.now(), text: task }],
    });
    setTask("");
  };

  const moveTask = (from: ColumnKey, to: ColumnKey, id: number) => {
    const item = columns[from].find((t) => t.id === id);
    if (!item) return;

    setColumns({
      ...columns,
      [from]: columns[from].filter((t) => t.id !== id),
      [to]: [...columns[to], item],
    });
  };


  const Column = ({ title, items, from, moveTask }: ColumnProps) => (
    <div className="flex-1 backdrop-blur-xl bg-white/20 border border-white/20 rounded-2xl p-5 shadow-xl min-h-[400px]">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>

      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/30 border border-white/30 backdrop-blur-xl p-4 rounded-xl shadow-md mb-4 text-gray-900"
        >
          {item.text}

          <div className="flex gap-3 mt-3 flex-wrap">
            {from !== "todo" && (
              <button
                onClick={() => moveTask(from, "todo", item.id)}
                className="text-sm text-blue-700 hover:underline transition"
              >
                To Do
              </button>
            )}
            {from !== "progress" && (
              <button
                onClick={() => moveTask(from, "progress", item.id)}
                className="text-sm text-yellow-700 hover:underline transition"
              >
                Progress
              </button>
            )}
            {from !== "done" && (
              <button
                onClick={() => moveTask(from, "done", item.id)}
                className="text-sm text-green-700 hover:underline transition"
              >
                Done
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="mt-18 min-h-screen bg-gradient-to-br from-blue-200 via-slate-100 to-purple-200 p-6 relative overflow-hidden">
      
      <div className="absolute w-96 h-96 bg-blue-500/20 blur-3xl rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full bottom-10 right-10 animate-pulse" />

      <h1 className="text-4xl font-bold text-gray-900 text-center mt-8">
        Collaboration Board
      </h1>

     
      <div className="max-w-xl mx-auto mt-10 backdrop-blur-xl bg-white/20 border border-white/30 p-5 rounded-2xl shadow-xl flex gap-3">
        <input
          type="text"
          placeholder="New Task…"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 bg-white/20 border border-white/30 rounded-lg px-4 py-2 outline-none"
        />

        <button
          onClick={addTask}
          className="bg-blue-600/70 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-lg"
        >
          <Plus size={20} /> Add
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Column title="To Do" items={columns.todo} from="todo" moveTask={moveTask} />
        <Column title="In Progress" items={columns.progress} from="progress" moveTask={moveTask} />
        <Column title="Done" items={columns.done} from="done" moveTask={moveTask} />
      </div>
    </div>
  );
}
