import React, { useContext, useEffect } from "react"
import { IoMenu } from "react-icons/io5"
import {
  FaUserCircle,
} from "react-icons/fa"
import { MdAddPhotoAlternate } from "react-icons/md"
import { IoMdSend } from "react-icons/io"
import { Context } from "../context/Context"
import geminiLogo from "../assets/geminiLogo.png"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

const MainContent = () => {
  
  const {
    input,
    setInput,
    recentPrompt,
    showResult,
    loading,
    resultData,
    onSent,
    handleFileChange,
    setExtended,
    extended
  } = useContext(Context)


  return (
    <>
    {extended ||(
     <div className="py-[25px] absolute z-10 px-[15px]"> <IoMenu
          onClick={() => setExtended(!extended)}
          className="text-2xl block cursor-pointer"
        />
        </div>)}
    <div className= {`h-[100vh] flex-1 min-h-screen pb-[15vh] relative `}>
      
      <div className="flex items-center justify-between text-2xl   p-5 text-slate-700">
      
        
        <p className={`${extended ? "ml-[0vw]" : "ml-[10vh]"}`}>Gemini</p>
        
        
        <FaUserCircle />
      </div>

      <div className="max-w-[1000px] mx-auto">
        {!showResult ? (
          
            <div className="ms-[5vw] my-8 text-[40px] text-slate-500 font-semibold px-5">
              <p>
                <span className="bg-gradient-to-r from-[#368ddd] to-[#ff5546] bg-clip-text text-transparent">
                  Hello, Romil.
                </span>
              </p>

              <p className="text-slate-400">How can I help you today?</p>
            </div>
          
        ) : (
          <div className="py-0 px-[5%] max-h-[70vh] overflow-y-scroll scrollbar-hidden">
            <div className="my-10 mx-0 flex items-center gap-5">
              <FaUserCircle className="text-3xl" />
              <p className="text-lg font-[400] leading-[1.8]">{recentPrompt}</p>
            </div>

            <div className="flex items-start gap-5 mb-10">
              <img src={geminiLogo} alt="" className="w-8 rounded-[50%]" />

              {loading ? (
                <div className="w-full flex flex-col gap-2">
                  <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />

                  <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />

                  <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />
                </div>
              ) : (
                <div className="">

                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      ul: ({ children }) => (
                        <ul className="list-disc pl-6 my-2 space-y-1">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal pl-6 my-2 space-y-1">{children}</ol>
                      ),
                      li: ({ children }) => <li className="text-base">{children}</li>,
                      code({ inline, className = "", children, ...props }) {
                        if (inline) {
                          return (
                            <code className="bg-gray-100 text-sm px-1 py-0.5 rounded">
                              {children}
                            </code>
                          );
                        }

                        return (
                          
                            <code className={`bg-gray-100 my-4 rounded-md overflow-x-auto text-sm ${className}`} {...props}>
                              {children}
                            </code>
                          
                        );
                      },
                    }}
                  >
                    {resultData}
                  </ReactMarkdown>






                </div>
              )}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 w-full max-w-[1000px] px-5 mx-auto mt-5">
          <div className="flex  border border-[#dcdada] py-2 px-5 rounded-full">
            <input
              type="text"
              placeholder="Enter a prompt here..."
              className="flex-1 bg-transparent border-none outline-none p-2 "
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  onSent()
                }
              }}

            />

            <div className="flex gap-4 items-center">
              <input
                type="file"
                id="fileUpload"
                onChange={handleFileChange}
                accept=".pdf,image/*"
                style={{ display: "none" }}
              />

              
              <label htmlFor="fileUpload">
                <MdAddPhotoAlternate className="text-2xl cursor-pointer" />
              </label>
              {input && (
                <IoMdSend
                  onClick={() => onSent()}
                  className="text-2xl cursor-pointer"
                />
              )}
            </div>
          </div>

          <p className="text-sm my-4 mx-auto text-center font-[500] text-slate-600">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default MainContent
