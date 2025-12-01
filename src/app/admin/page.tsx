"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Query } from "appwrite";
import { Home, Users, Settings, User } from "lucide-react";
import { tableDb } from "@/lib/appwrite.config";
import useAuth from "@/hooks/react-query/useAuth";

// Fetch dashboard stats
const fetchStats = async () => {
  const users = await tableDb.listRows(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    "profiles"
  );

  const activeProjects = await tableDb.listRows(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    "projects"
  );

  const pendingTasks = await tableDb.listRows(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    "tasks",
    [Query.equal("status", "pending")]
  );

  const messages = await tableDb.listRows(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    "messages"
  );

  return {
    totalUsers: users.total,
    activeProjects: activeProjects.total,
    pendingTasks: pendingTasks.total,
    messages: messages.total,
  };
};

const Admin: React.FC = () => {
  const router = useRouter();

  // Use your NEW AUTH HOOK
  const { logout } = useAuth();

  const navItems = [
    { name: "Home", icon: Home, path: "/admin" },
    { name: "Users", icon: Users, path: "/admin/users" },
     { name: "Upcoming Features", icon: Users, path: "/admin/features" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 text-xl font-bold border-b">Workspace Admin</div>

        <nav className="flex-1 mt-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.path)}
              className="w-full flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100 transition font-medium"
            >
              <item.icon size={18} />
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full">
              <User size={20} className="text-gray-700" />
              <span className="text-gray-600 font-medium">Admin User</span>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Example table */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Users</h2>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-gray-600">Name</th>
                <th className="py-2 px-4 text-gray-600">Email</th>
                <th className="py-2 px-4 text-gray-600">Role</th>
                <th className="py-2 px-4 text-gray-600">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">John Doe</td>
                <td className="py-2 px-4">john@example.com</td>
                <td className="py-2 px-4">User</td>
                <td className="py-2 px-4">Active</td>
              </tr>

              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">Jane Smith</td>
                <td className="py-2 px-4">jane@example.com</td>
                <td className="py-2 px-4">User</td>
                <td className="py-2 px-4">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Admin;



// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";

// import { Home, Users, Settings, User } from "lucide-react";
// import { useQuery } from "@tanstack/react-query";
// import { tableDb } from "@/lib/appwrite.config";
// import useRegister from "@/hooks/react-query/useRegister";


// // Fetch stats from Appwrite
// const fetchStats = async () => {
// const users = await tableDb.listRows(process.env.NEXT_PUBLIC_APPWRITE_DATABASE!, "profiles");
// const activeProjects = await tableDb.listRows(process.env.NEXT_PUBLIC_APPWRITE_DATABASE!, "projects", []);
// const pendingTasks = await tableDb.listRows(process.env.NEXT_PUBLIC_APPWRITE_DATABASE!, "tasks", [ { field: "status", operator: "=", value: "pending" } ]);
// const messages = await tableDb.listRows(process.env.NEXT_PUBLIC_APPWRITE_DATABASE!, "messages");

// return {
// totalUsers: users.total,
// activeProjects: activeProjects.total,
// pendingTasks: pendingTasks.total,
// messages: messages.total
// };
// };

// const Admin: React.FC = () => {
// const router = useRouter();

// const { logout } = useRegister();
// // const { data: stats, isLoading } = useQuery(['dashboardStats'], fetchStats);

// const navItems = [
// { name: "Home", icon: Home, path: "/admin" },
// { name: "Users", icon: Users, path: "/admin/users" },
// { name: "Members", icon: Settings, path: "/admin/members" },
// ];

// return ( <div className="min-h-screen flex bg-gray-100">
// {/* Sidebar */} <aside className="w-64 bg-white shadow-md flex flex-col"> <div className="p-6 text-xl font-bold border-b">Workspace Admin</div> <nav className="flex-1 mt-4">
// {navItems.map((item) => (
// <button
// key={item.name}
// onClick={() => router.push(item.path)}
// className="w-full flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-100 transition font-medium"
// >
// <item.icon size={18} />
// {item.name} </button>
// ))} </nav> </aside>

// ```
//   {/* Main content */}
//   <main className="flex-1 p-8">
//     {/* Header */}
//     <header className="flex justify-between items-center mb-8">
//       <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
//       <div className="flex items-center gap-4">
//         <div className="flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full">
//           <User size={20} className="text-gray-700" />
//           <span className="text-gray-600 font-medium">Admin User</span>
//         </div>
//         <button
//           onClick={() => logoutMutation.mutate()}
//           className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium"
//         >
//           Logout
//         </button>
//       </div>
//     </header>

//     // Dashboard cards //
// /
//     <div className="mt-8 bg-white shadow rounded-lg p-6">
//       <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
//       <table className="w-full text-left border-collapse">
//         <thead>
//           <tr className="border-b">
//             <th className="py-2 px-4 text-gray-600">Name</th>
//             <th className="py-2 px-4 text-gray-600">Email</th>
//             <th className="py-2 px-4 text-gray-600">Role</th>
//             <th className="py-2 px-4 text-gray-600">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Example static rows, replace with dynamic query later */}
//           <tr className="border-b hover:bg-gray-50">
//             <td className="py-2 px-4">John Doe</td>
//             <td className="py-2 px-4">john@example.com</td>
//             <td className="py-2 px-4">User</td>
//             <td className="py-2 px-4">Active</td>
//           </tr>
//           <tr className="border-b hover:bg-gray-50">
//             <td className="py-2 px-4">Jane Smith</td>
//             <td className="py-2 px-4">jane@example.com</td>
//             <td className="py-2 px-4">Admin</td>
//             <td className="py-2 px-4">Active</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   </main>
// </div>

// );
// };

// export default Admin;
