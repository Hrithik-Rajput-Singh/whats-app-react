import React, { useState } from 'react';
import './chat.css'
import Avatar from './Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPaperclip, faUserCog, faSmileBeam , faMicrophone} from '@fortawesome/free-solid-svg-icons'
import axios from "./axios";

function Chat(props) {             
    // var today = new Date(),
    // date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
    // time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const[input, setinput]=useState("");

    function handleChange(event){
      const value = event.target.value
      setinput(value)

    }

    async function submit(event){
      event.preventDefault();
        await axios.post('/message/new',{
        Message: input,
        Name: "DEMO APP",
        time: "justNOW",
        recieved: false
      });
      setinput('');
    }

    return (
        <div className="chat">
           <div className="chat_header">
               <Avatar />
               <div className="chatheader_info">
                   <h1>room name</h1>
                   <p>last seen at </p>
               </div>
               <div className="chatheader_right">        
                  <i><FontAwesomeIcon icon={faSearch} color="rgb(66, 56, 117"/></i>
                  <i><FontAwesomeIcon icon={faPaperclip} color="rgb(66, 56, 117"/></i>
                  <i><FontAwesomeIcon icon={faUserCog} color="rgb(66, 56, 117"/></i>
               </div>
           </div>
           <div className="chat_body">

              {props.msg.map((message) => (
                <p // eslint-disable-next-line
                  className={`chat_message ${message.recieved && "chat_reciever"}`}         //if msg received only then attact chat receiver class
                >     
                <span className="chat_name">{message.Name}</span>
                {message.Message}
                <span className="chat_time">{message.time}</span>
                </p>
              ))};

           </div>
              {/* <p className="chat_message">
                 <span className="chat_name">hrithik</span>
                 this is going to be maasage
                 <span className="chat_time">{date} , {time}</span>
               </p> 

               <p className="chat_message chat_reciever">
                 <span className="chat_name">hrithik</span>
                 this is going to be maasage
                 <span className="chat_time">{date} , {time}</span>
               </p> */}
           <div className="chat_footer">
             <i><FontAwesomeIcon icon={faSmileBeam} color="rgb(66, 56, 117"/></i>
             <form>
               <input value={input} onChange={handleChange} placeholder="type a massage" type="text"/>
               <button onClick={submit} type="submit">SEND</button>
             </form>
             <i><FontAwesomeIcon icon={faMicrophone} color="rgb(66, 56, 117"/></i>
           </div>
        </div>
    )
}

export default Chat;
