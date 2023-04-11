import React, { useEffect, useState } from 'react'
import "./styles.css"
import { Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconButton} from '@mui/material';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import MicIcon from '@mui/icons-material/Mic';
import Message from "./messages"
export default function useChat(){

    const [message,changeMessage] = useState("");
    const [allMessages,changeAllMessages] = useState([{
        name:"manu",
        message:"this is manu",
        timestamp:"20th aug 2023",
        received: "true",
    }]);
    

useEffect(()=>{

async function getdata(){
    console.log('aya')
    const res = await fetch('/wp');

    console.log(res)

    if(res.ok){
    const response = await res.json();
    console.log(response);

    changeAllMessages(response);
    }else{
        console.log('response is invalid')
    }

} 

getdata();

},[])


// console.log(allMessages);
const [error,setError] = useState("");
function handleClick(e){
    const label = document.getElementsByClassName("label")[0];
    console.log(label)
    label.style.display = 'none';
    
}

async function handleSubmit(e){
    e.preventDefault();
    console.log('aya')
   
    const msg= message;
    const time = new Date().toISOString();
    const name = "xyz";
    const received = "true";

    const json =  {name:name,message:msg,timestamp:time,received:received};
    console.log(json)
    const response = await fetch('/wp',{
        method:'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(json)
    });
console.log(response)
    // const res = await response.json();
    if (response.ok) {
        const res = await response.json();
        console.log('successful response:', res);
      
        const form = document.getElementsByClassName("form__input")[0];
        form.reset();
        
        changeAllMessages(prev => {
          return [ ...prev, res ];
        });
      } else {
        console.log('unsuccessful response');
        setError('There was some error while sending the message.');
      }
}

function handleIf(e){
    const x = e.target.value;
    if(x===''){
        const label = document.getElementsByClassName("label")[0];
        console.log(label)
        label.style.display = 'block';
    }
}

    return (
        <div className='chat'>

<div className='chat__header'>
    <div className='chat__container'>

    <div className='chat__avatar'>
        <Avatar src='https://thumbs.dreamstime.com/b/portrait-handsome-nice-entrepreneur-formal-suit-standing-outside-work-successful-businessman-corporate-people-office-204808830.jpg'/>
    </div>
    <div className='chat__details'>
        <div className='name'>Manu</div>
        <div className='last__seen'>last seen friday 20:30 pm</div>
    </div>

    </div>
 

<div className='chat__icons'>
    <IconButton><SearchIcon/></IconButton>
<IconButton><AttachFileIcon/></IconButton>
<IconButton><MoreVertIcon/></IconButton>

</div>

</div>

<div className='chats__display'>

<div className='chat__body'>
    <p>
        <span>Manu</span>
        <div className='chat__content'><p>This is the message</p>
        <span className='chat__timestamp'>{new Date().toISOString()}</span></div>
       
    </p>



</div>
{allMessages && allMessages.map((msg)=>{
return <Message content={msg} />
})}

</div>

<div className='chat__type'>

<TagFacesIcon/>
<form className='form__input' onSubmit={handleSubmit}>
<label htmlFor='chat' className='label'>Type a message</label>
<input name='chat' onClick={handleClick} onMouseLeave={handleIf} onChange={(e)=>{
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

