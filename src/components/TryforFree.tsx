"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCheck, FiClock, FiUpload, FiFileText } from "react-icons/fi";

export default function TryForFree() {
  return (
    <section className="w-full bg-gradient-to-br from-white to-slate-50 py-16 px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* ---- LEFT - CONTENT ---- */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">Workspace • Free Trial</p>

            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-slate-900">
              Try Workspace free — build, plan, and ship
            </h2>

            <p className="text-slate-600 max-w-xl">
              Start with a focused trial to explore the workspace: collaborate on documents, craft plans, and get a feel for the workflow. Fully responsive, modern tools designed for teams and solo creators.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
              <li className="flex items-start gap-3">
                <FiCheck className="mt-1 text-indigo-500" />
                <div>
                  <div className="font-semibold text-slate-800">Collaborative boards</div>
                  <div className="text-sm text-slate-500">Real-time edits and comments.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <FiClock className="mt-1 text-indigo-500" />
                <div>
                  <div className="font-semibold text-slate-800">No credit card</div>
                  <div className="text-sm text-slate-500">Kick the tires without commitment.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <FiFileText className="mt-1 text-indigo-500" />
                <div>
                  <div className="font-semibold text-slate-800">Easy exports</div>
                  <div className="text-sm text-slate-500">PDF, Markdown & HTML ready.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <FiUpload className="mt-1 text-indigo-500" />
                <div>
                  <div className="font-semibold text-slate-800">Mobile & Desktop</div>
                  <div className="text-sm text-slate-500">Keep working anywhere.</div>
                </div>
              </li>
            </ul>

            <div className="flex flex-wrap gap-3 items-center mt-2">
              <a
                href="#"
                className="font-semibold border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all 
                duration-300 rounded-lg px-4 py-1.5 text-sm"
                aria-label="Start free trial"
              >
                Start free trial
              </a>

              <a href="#" className="text-sm font-medium text-indigo-600 underline">Compare plans</a>
            </div>
          </motion.div>

          {/* Right - Trial Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mx-auto w-full max-w-md"
          >
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg">

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium uppercase text-slate-500">Free Trial</div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900">14</span>
                    <span className="text-sm text-slate-500">days</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-medium text-slate-700">₹0</div>
                  <div className="text-xs text-slate-400">no charge today</div>
                </div>
              </div>

              <hr className="my-4 border-slate-100" />

              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded bg-indigo-50 text-indigo-600"><FiFileText /></span>
                  <div>
                    <div className="font-medium text-slate-800">5 documents</div>
                    <div className="text-xs text-slate-400">Create up to 5 active documents during the trial.</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded bg-indigo-50 text-indigo-600"><FiUpload /></span>
                  <div>
                    <div className="font-medium text-slate-800">No file uploads</div>
                    <div className="text-xs text-slate-400">File uploads disabled in trial mode.</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded bg-indigo-50 text-indigo-600"><FiClock /></span>
                  <div>
                    <div className="font-medium text-slate-800">No version history</div>
                    <div className="text-xs text-slate-400">Versioning unlocked on paid plans.</div>
                  </div>
                </li>
              </ul>

              <div className="mt-6">
                <button className="font-semibold border-2 border-indigo-600 text-indigo-600 
  hover:bg-indigo-600 hover:text-white transition-all duration-300 
  rounded-lg px-4 py-1.5 text-sm">Hurry ! Start 14‑day trial</button>
              </div>

              <p className="mt-4 text-center text-xs text-slate-400">No credit card required • Cancel anytime</p>
            </div>

            <div className="mt-4 text-center text-xs text-slate-500">Tip: Invite two teammates to get 7 extra days.</div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
