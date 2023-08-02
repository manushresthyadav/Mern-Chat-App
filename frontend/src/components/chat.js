import React, { useEffect, useState, useRef } from 'react'
import "./styles.css"
import { Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconButton} from '@mui/material';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import MicIcon from '@mui/icons-material/Mic';
import Message from "./messages";
import { MyContext } from './Context';
import { useContext } from 'react';
import { getAuth } from 'firebase/auth';
import firestore from "../firebase/firebase"
export default function useChat(props){

const auth = getAuth();


    const [nam,changeNam] = useState({
        name:props.provide.name,
        email:props.provide.email,
    });
 
const Context = useContext(MyContext);

const [runEffect, setRunEffect] = useState(false);

  useEffect(() => {
    if (!Context) {
      setRunEffect(true);
    }
  }, [Context]);

const [message,changeMessage] = useState("");
    const [allMessages,changeAllMessages] = useState(props.msg);

useEffect(()=>{
    ('inside the useEffect, context changed')
    if(Context  &&  Context.name!==""){
        changeNam({
            name:Context.name,
            email:Context.email,
        });
        localStorage.setItem("user",JSON.stringify({
            name:Context.name,
            email:Context.email,
        }));
        const x = JSON.parse(localStorage.getItem('user'));
        (x);
        ('making the props.changeProvide change and hence to render the app.js component ')
props.changeProvide({
    name:Context.name,
    email:Context.email,
})

        setRunEffect(( prev)=>{return !prev});
    }
    
},[Context]);


const chatContainerRef = useRef(null);
useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [allMessages]);

  
    const BASE_URL = 'https://whatsapp-manu-h2xq-dgve.onrender.com';

useEffect(()=>{

async function getdata(){

    ('aya',props.provide.email , auth.currentUser.email);
    const res = await fetch(`${BASE_URL}/wp?user1=${auth.currentUser.email}&user2=${props.provide.email}`);
// REMEMBER TO ADD BASE_URL IN HERE WHEN DEPLOYING THE FROTNEND -> THAT IS THE URL OF THE WEBSITE WHERE THE BACKEND IS DEPLOYED

    if(res.ok){
    const response = await res.json();

    changeAllMessages(response);
    props.changemsg(response);
    localStorage.setItem("messages",JSON.stringify(response));
    }else{
        ('response is invalid')
    }

} 

getdata();

},[Context,runEffect])


// (allMessages);
const [error,setError] = useState("");
function handleClick(e){
    const label = document.getElementsByClassName("label")[0];
    (label)
    label.style.display = 'none';
    
}

async function handleSubmit(e){
    e.preventDefault();
   const all = document.querySelectorAll('.chat__input');
   all.forEach((elm)=>{
    (elm.textContent)
   })
    const msg= message;
    const time = new Date().toISOString();
    const name = auth.currentUser.displayName;
    const poster = auth.currentUser.email;
const receiver = props.provide.email;

    const json =  {name:name,message:msg,timestamp:time,receiver:receiver,poster:poster};

    const response = await fetch(`${BASE_URL}/wp?user1=${auth.currentUser.email}&user2=${props.provide.email}`,{

        method:'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(json)
    });
    // const res = await response.json();
    if (response.ok) {
        const res = await response.json();
      
        const form = document.getElementsByClassName("form__input")[0];
        form.reset();
        const y="";
        changeMessage('');
        changeAllMessages(prev => {
          return [ ...prev, res ];
        });
        props.changemsg([...props.msg,res]);
        const chatContainer = document.getElementsByClassName('chats__display');
        chatContainer.forEach((elm)=>{
            elm.scrollTop = elm.scrollHeight;
        })
      } else {
        ('unsuccessful response');
        setError('There was some error while sending the message.');
      }
}

function handleIf(e){
    const x = e.target.value;
    if(x===''){
        const label = document.getElementsByClassName("label")[0];
        label.style.display = 'block';
    }
}
('all messages' , allMessages);
    return (
        <div className='chat'>

<div className='chat__header'>
    <div className='chat__container'>

    <div className='chat__avatar'>
        <Avatar src='https://thumbs.dreamstime.com/b/portrait-handsome-nice-entrepreneur-formal-suit-standing-outside-work-successful-businessman-corporate-people-office-204808830.jpg'/>
    </div>
    <div className='chat__details'>
        <div className='name'>{props.provide.name}</div>
        <div className='last__seen'>{props.provide.email}</div>
    </div>

    </div>
 

<div className='chat__icons'>
    <IconButton><SearchIcon/></IconButton>
<IconButton><AttachFileIcon/></IconButton>
<IconButton><MoreVertIcon/></IconButton>

</div>

</div>

<div ref={chatContainerRef} className='chats__display'>


{props.msg && (props.msg).map((msg)=>{
return <Message content={msg} />
})}
{props.msg.length===0 && <div className='detail'>Add User to Contact's and double click on it to initiate the chat</div>}

</div>

<div className='chat__type'>

<TagFacesIcon/>
<form className='form__input' onSubmit={handleSubmit}>
<label htmlFor='chat' className='label'></label>
<input name='chat' value={message}  className='chat__input' onClick={handleClick} onMouseLeave={handleIf} onChange={(e)=>{
changeMessage(()=>{
    return e.target.value;
})
}}></input>
<button>Send message</button>
{error && <div>{error}</div>}
</form>
<MicIcon/>
</div>


        </div>
    )
}








