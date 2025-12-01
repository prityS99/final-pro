'use client';

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ArrowUpDown } from "lucide-react";

// Types
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

type SortConfig = {
  key: keyof User | null;
  direction: 'asc' | 'desc';
};

export default function Users() {
  const [filter, setFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  // Static user data
  const users: User[] = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin", status: "active" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "user", status: "inactive" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "user", status: "active" },
    { id: 4, name: "Diana Prince", email: "diana@example.com", role: "manager", status: "active" },
    { id: 5, name: "Ethan Hunt", email: "ethan@example.com", role: "admin", status: "inactive" },
  ];

  // Filter and sort users
  useEffect(() => {
    let data = [...users];

    // Filter
    data = data.filter(
      u => u.name.toLowerCase().includes(filter.toLowerCase()) ||
           u.email.toLowerCase().includes(filter.toLowerCase())
    );

    // Sort
    if (sortConfig.key !== null) {
      data.sort((a, b) => {
        const valueA = a[sortConfig.key!];
        const valueB = b[sortConfig.key!];

        if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredUsers(data);
  }, [filter, sortConfig]);

  // Pagination logic
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Sorting Handler
  const handleSort = (key: keyof User) => {
    let direction: 'asc' | 'desc' = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="mt-30 w-full p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <Input
          placeholder="Search by name or email..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setFilter("")}>Reset Filter</Button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow border">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {[
                { key: "id" as keyof User, label: "ID" },
                { key: "name" as keyof User, label: "Name" },
                { key: "email" as keyof User, label: "Email" },
                { key: "role" as keyof User, label: "Role" },
                { key: "status" as keyof User, label: "Status" },
              ].map(col => (
                <th
                  key={col.key}
                  className="px-6 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    <ArrowUpDown size={14} />
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition border-b">
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold animate-in fade-in duration-300
                        ${user.status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-3">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </Button>

        <span className="px-4 py-2 bg-white rounded shadow border">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}



// 'use client';
// import React, { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Edit, Trash2, ArrowUpDown } from "lucide-react";

// export default function Users() {
//   const [filter, setFilter] = useState("");
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 3;



//   // Static user data
//   const users = [
//     { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin", status: "active" },
//     { id: 2, name: "Bob Smith", email: "bob@example.com", role: "user", status: "inactive" },
//     { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "user", status: "active" },
//     { id: 4, name: "Diana Prince", email: "diana@example.com", role: "manager", status: "active" },
//     { id: 5, name: "Ethan Hunt", email: "ethan@example.com", role: "admin", status: "inactive" },
//   ];

//   // Filter users
//   useEffect(() => {
//     let data = [...users];

//     data = data.filter(
//       u => u.name.toLowerCase().includes(filter.toLowerCase()) ||
//       u.email.toLowerCase().includes(filter.toLowerCase())
//     );

//     // Sorting
//     if (sortConfig.key) {
//       data.sort((a, b) => {
//         const valueA = a[sortConfig.key];
//         const valueB = b[sortConfig.key];

//         if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
//         if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
//         return 0;
//       });
//     }

//     setFilteredUsers(data);
//   }, [filter, sortConfig]);

//   // Pagination logic
//   const indexOfLast = currentPage * usersPerPage;
//   const indexOfFirst = indexOfLast - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

//   // Sorting Handler
//   const handleSort = key => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
//     setSortConfig({ key, direction });
//   };

//   return (
//     <div className="mt-30 w-full p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">Users</h1>

//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
//         <Input
//           placeholder="Search by name or email..."
//           value={filter}
//           onChange={e => setFilter(e.target.value)}
//           className="max-w-sm"
//         />
//         <Button onClick={() => setFilter("")}>Reset Filter</Button>
//       </div>

//       <div className="overflow-x-auto bg-white rounded-lg shadow border">
//         <table className="w-full text-left border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               {[
//                 { key: "id", label: "ID" },
//                 { key: "name", label: "Name" },
//                 { key: "email", label: "Email" },
//                 { key: "role", label: "Role" },
//                 { key: "status", label: "Status" },
//               ].map(col => (
//                 <th
//                   key={col.key}
//                   className="px-6 py-3 border-b cursor-pointer hover:bg-gray-200 select-none"
//                   onClick={() => handleSort(col.key)}
//                 >
//                   <div className="flex items-center gap-2">
//                     {col.label}
//                     <ArrowUpDown size={14} />
//                   </div>
//                 </th>
//               ))}
//               <th className="px-6 py-3 border-b">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentUsers.length > 0 ? (
//               currentUsers.map(user => (
//                 <tr key={user.id} className="hover:bg-gray-50 transition border-b">
//                   <td className="px-6 py-4">{user.id}</td>
//                   <td className="px-6 py-4">{user.name}</td>
//                   <td className="px-6 py-4">{user.email}</td>
//                   <td className="px-6 py-4 capitalize">{user.role}</td>

//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold animate-in fade-in duration-300
//                       ${user.status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
//                     >
//                       {user.status}
//                     </span>
//                   </td>

//                   {/* Row Actions */}
//                   <td className="px-6 py-4 flex gap-3">
//                     <button className="text-blue-600 hover:text-blue-800">
//                       <Edit size={18} />
//                     </button>
//                     <button className="text-red-600 hover:text-red-800">
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={6} className="text-center py-6 text-gray-500">No users found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6 gap-3">
//         <Button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(prev => prev - 1)}
//         >
//           Previous
//         </Button>

//         <span className="px-4 py-2 bg-white rounded shadow border">
//           Page {currentPage} of {totalPages}
//         </span>

//         <Button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage(prev => prev + 1)}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }
