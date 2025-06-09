import { createContext, useState } from "react";
import run from "../Config/gemini";

export const Context=createContext();

const ContextProvider = (props)=>{
    
const[input,setInput]=useState("");
const[recentPrompt,setRecentPrompt]=useState("");
const[previousPrompt,setPreviousPrompt]=useState([]);
const[showResult,setShowResult]=useState(false);
const[loading,setLoading]=useState(false);
const[resultData,setResultData]=useState("")
const delayPara=(index,nextWord)=>{
setTimeout(function (){
    setResultData(prev=>prev+nextWord);

},75*index)
}
const newChat =()=>{
    setLoading(false)
    setShowResult(false)
}
    const onSent= async (prompt)=>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let responce;
        if(prompt!==undefined){
            responce=await run(prompt)
            setRecentPrompt(prompt)

        }
        else{
            setPreviousPrompt(prev=>[...prev,input])
            setRecentPrompt(input)
            responce=await run(input)
        }
        let responseArray=responce.split("**")
        let newResponce="";
        for(let i=0;i<responseArray.length;i++)
        {
            if(i===0|| i%2 !==1){
                newResponce+=responseArray[i]
            }
            else{
                newResponce += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponce2=newResponce.split("*").join("<br/>")
        let newRresponceArray=newResponce2.split(" ")
        for(let i=0;i<newRresponceArray.length;i++){
            const nextWord=newRresponceArray[i];
            delayPara(i,nextWord+" ");
        }
        setLoading(false)
        setInput("")

    }



    // onSent("what is react js");

const contextValue={
    onSent,
    previousPrompt,
    setPreviousPrompt,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
    
}
return (
    <Context.Provider value={contextValue}>
        {props.children}
    </Context.Provider>
)
}

export default ContextProvider