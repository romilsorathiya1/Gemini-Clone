import { createContext, useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai";
import toast from "react-hot-toast";
import uploaded from "../assets/uploaded.png"
const apiKey=import.meta.env.VITE_GEMINI_API_KEY


const genAI = new GoogleGenerativeAI(apiKey);

export const Context = createContext()

const ContextProvider = (props) => {
  const [input, setInput] = useState("")
  const [recentPrompt, setRecentPrompt] = useState("")
  const [prevPrompt, setPrevPrompt] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resultData, setResultData] = useState("")
  const [extended, setExtended] = useState(false)
  const [file, setFile] = useState([]);
  const [fileIndex,setFileIndex]=useState(0)
  


  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      let newfiles=[...file]
      newfiles[fileIndex]=uploadedFile
      setFile([...newfiles]);
      toast.success("File uploaded!", {
        duration: 5000, 
        style: {
          borderRadius: "8px",
          background: "#F0FFF4",
          color: "#166534",
          border: "1px solid #BBF7D0",
        },
        icon: <img 
        src={uploaded}
        width="25" 
        style={{ display: "inline", marginRight: "8px", verticalAlign: "middle" }}
      />,
      });
      
    }
  };


  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const fileToGenerativePart = async (file) => {
    const base64 = await fileToBase64(file);
    return {
      inlineData: {
        mimeType: file.type,
        data: base64.split(",")[1], // Remove the "data:*/*;base64," part
      },
    };
  };

  const handleAsk = async (prompt, index) => {
    if (!prompt.trim()) return;
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
      let result;
  
      const selectedFile =(index===undefined) ? file[file.length-1]:file[index];
  
      if (selectedFile instanceof Blob) {
        const fileData = await fileToGenerativePart(selectedFile);
        result = await model.generateContent([fileData, prompt]);
      } else {
        result = await model.generateContent(prompt);
      }
  
      const response = await result.response;
      const text = await response.text();
      return text;
    } catch (error) {
      console.error("Error:", error);
      setResultData("❌ Something went wrong. Check console for details.");
    }
  };
  


  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord)
    }, 75 * index)
  }

  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt,index) => {
    setFileIndex((prev)=>prev+1)
    setResultData("")
    setLoading(true)
    setShowResult(true)

    let response

    if (prompt !== undefined) {
      response = await handleAsk(prompt,index)

      setRecentPrompt(prompt)
    } else {
      setPrevPrompt((prev) => [...prev, input])
      setRecentPrompt(input)
      response = await handleAsk(input)
    }

    setResultData(response)

    setLoading(false)
    setInput("")
  }

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    loading,
    resultData,
    onSent,
    newChat,
    setFile,
    handleAsk,
    handleFileChange,
    extended,
    setExtended
  }

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  )
}

export default ContextProvider





