import React from "react"
import Sidebar from "./components/Sidebar"
import MainContent from "./components/MainContent"
import { Toaster } from "react-hot-toast";

const App = () => {
  console.log()
  
  return (
    <>




      <div className="flex animate-fadeIn w-full duration-1000">
      <Toaster position="top-right" reverseOrder={false} />
        <Sidebar />
        <MainContent />
      </div>
    </>
  )
}

export default App
