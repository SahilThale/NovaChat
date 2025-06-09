import React, { useContext } from 'react'
import './Main.css'
import {assets} from '../../assets/assets'
import { Context } from '../../Context/Context'

const Main = () => {

    const{onSent,recentPrompt,showResult,loading,resultData,setInput,input}=useContext(Context)
  
  
  
  
    return (
    <div className='main'>
        <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="usericon" />
        </div>
        <div className="main-container">
            {!showResult?<>
            <div className="greet">
                <p><span>Hello, Dev</span></p>
                <p>How Can I Help You Today</p>
            </div>
        
        <div className="cards">
            <div className="card">
                <p>Suggest beautiful plces to see on an upcomming road trips</p>
                <img src={assets.compass_icon} alt="" />
            </div>
            <div className="card">
                <p>Suggest beautiful plces to see on an upcomming road trips</p>
                <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
                <p>Suggest beautiful plces to see on an upcomming road trips</p>
                <img src={assets.message_icon} alt="" />
            </div>
            <div className="card">
                <p>Suggest beautiful plces to see on an upcomming road trips</p>
                <img src={assets.code_icon} alt="" />
            </div>
        </div>

            </>:<div className='result'>
                <div className="result_title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading? <div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>:
                    <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
                    </div>

                </div>}
            
        
        <div className="main-bottom">
            <div className="search-box">
                <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter Your Prompt here' id='userinput'/>
                <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
                </div>
            </div>
            <p className="bottom-info">
                Gemini display inaccurate info, including about people,so check its responses.Your privacy and Gemini Apps.
            </p>
        </div>
        </div>

    </div>
  )
}

export default Main