
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import logo from "../../public/Logo/logo.svg";
import useAuth from "@/hooks/react-query/useAuth";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { isAuthenticated, role, logout } = useAuth();


    const adminEmail = "99prity@gmail.com";


  const navLinks = [
    { href: "/plans", label: "Plans" },
    { href: "/project", label: "Projects" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/contactus", label: "Contact Us" },
    { href: "/askhelp", label: "Ask Help" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/100 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/">
              <Image src={logo} alt="Logo" width={120} height={50} />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8 font-bold text-lg">
              {navLinks.map(({ href, label }) => (
                <NavLink key={href} href={href} active={pathname === href}>
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center space-x-6">
              {!isAuthenticated && (
                <Button
                  variant="outline"
                  className="font-semibold border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg px-4 py-1.5 text-sm"
                  asChild
                >
                  <Link href="/login">LOGIN</Link>
                </Button>
              )}

              {isAuthenticated && (
                <>
                  {role === "admin" && (
                    <Button
                      className="bg-indigo-600 text-white font-semibold rounded-lg px-4 py-1.5 text-sm hover:bg-indigo-700"
                      asChild
                    >
                      <Link href="/admin">ADMIN</Link>
                    </Button>
                  )}

                  {/* {role === "member" && (
                    <Button
                      className="bg-indigo-600 text-white font-semibold rounded-lg px-4 py-1.5 text-sm hover:bg-indigo-700"
                      asChild
                    >
                      <Link href="/profile">PROFILE</Link>
                    </Button>
                  )} */}

                  <Button
                    variant="outline"
                    className="font-semibold border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg px-4 py-1.5 text-sm"
                    onClick={logout}
                  >
                    LOGOUT
                  </Button>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2">
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 p-6 flex flex-col"
            >
              <nav className="flex flex-col space-y-6 text-gray-800">
                {navLinks.map(({ href, label }) => (
                  <NavLink key={href} href={href} active={pathname === href}>
                    {label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-6">
                {!isAuthenticated && (
                  <Button
                    variant="outline"
                    className="w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                    asChild
                  >
                    <Link href="/login">LOGIN</Link>
                  </Button>
                )}

                {isAuthenticated && (
                  <>
                    {role === "admin" && (
                      <Link
                        href="/admin"
                        className="mt-6 block font-semibold text-indigo-600"
                      >
                        Admin Panel
                      </Link>
                    )}

                    {role === "member" && (
                      <Link
                        href="/profile"
                        className="mt-6 block font-semibold text-indigo-600"
                      >
                        Profile
                      </Link>
                    )}

                    <Button
                      variant="outline"
                      className="mt-8 w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                      onClick={logout}
                    >
                      LOGOUT
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
function NavLink({ href, children, active }: any) {
  return (
    <Link
      href={href}
      className={`relative group px-3 py-2 rounded-md transition-colors hover:text-indigo-600
      ${active ? "text-indigo-600 font-semibold" : "text-black"}`}
    >
      {children}

      <span
        className={`
          absolute left-1/2 -bottom-1 h-[2px] bg-indigo-600 rounded-full 
          transition-all duration-300 transform -translate-x-1/2 
          ${active ? "w-full" : "w-0 group-hover:w-full"}
        `}
      ></span>
    </Link>
  );
}






