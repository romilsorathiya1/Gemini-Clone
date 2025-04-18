import React, { useContext, useState } from "react"
import { IoMenu } from "react-icons/io5"
import { FaAlignLeft } from "react-icons/fa";
import { FaPlus, FaQuestion } from "react-icons/fa6"
import { MdHistory } from "react-icons/md"
import { IoSettings } from "react-icons/io5"
import { Context } from "../context/Context"

const Sidebar = () => {
  const { onSent, prevPrompt, setRecentPrompt, newChat, extended, setExtended } = useContext(Context)

  const loadPrompt = async (prompt, index) => {
    setRecentPrompt(prompt)

    await onSent(prompt, index)
  }

  return (
    <>


        {/* // <div className="h-[100vh] absolute z-20 md:static inline-flex flex-col justify-between bg-[#F9F9F9] py-[25px] px-[15px] w-64"> */}
        <div
  className={`h-[100vh] fixed top-0 left-0 z-20 flex flex-col justify-between bg-[#F9F9F9] py-[25px] px-[15px] w-64 transition-transform duration-300 ease-in-out
    ${extended ? "md:static translate-x-0" : "-translate-x-full"}
  `}
>


          <div>
            <IoMenu
              onClick={() => setExtended(!extended)}
              className="text-2xl block cursor-pointer"
            />


            <div
              onClick={() => newChat()}
              className="mt-[30px] inline-flex items-center gap-[10px] py-[10px] px-[15px] text-[14px] text-gray-500 cursor-pointer bg-[#ececec] rounded-full"
            >
              <FaPlus className="text-2xl" />

              {extended && <p>New Chat</p>}
            </div>


            <div className="flex flex-col animate-fadeIn duration-1000">
              <p className="mt-7 mb-5">Recent</p>

              {prevPrompt?.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => loadPrompt(item, index)}
                    className="flex items-center gap-2 p-2 pr-10 rounded-[50px] text-slate-700 cursor-pointer hover:bg-[#ececec]"
                  >
                    <FaAlignLeft className="text-1xl" />
                    <p>{item.slice(0, 18)}...</p>
                  </div>
                )
              })}
            </div>

          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 p-2 pr-10 rounded-[50px] text-slate-700 cursor-pointer hover:bg-[#ececec]">
              <FaQuestion className="text-2xl" />
              {extended && <p>Help</p>}
            </div>

            <div className="flex items-center gap-2 p-2 pr-10 rounded-[50px] text-slate-700 cursor-pointer hover:bg-[#ececec]">
              <MdHistory className="text-2xl" />
              {extended && <p>Activity</p>}
            </div>

            <div className="flex items-center gap-2 p-2 pr-10 rounded-[50px] text-slate-700 cursor-pointer hover:bg-[#ececec]">
              <IoSettings className="text-2xl" />
              {extended && <p>Settings</p>}
            </div>

          </div>
        </div>

      </>
      )
}

      export default Sidebar
