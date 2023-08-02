import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Avatar, IconButton } from '@mui/material';
import { getAuth } from 'firebase/auth';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MyContext } from './Context';
import Message from "./messages";
import "./styles.css";
export default function useChat(props){

const auth = getAuth();

console.log(props.msg);
    const [nam,changeNam] = useState({
        name:props.provide.name,
        email:props.provide.email,
    });
 console.log(props.provide)
const Context = useContext(MyContext);

const [runEffect, setRunEffect] = useState(false);

  useEffect(() => {
    if (!Context) {
      setRunEffect(true);
    }
  }, [Context]);
console.log(Context);
const [message,changeMessage] = useState("");
    const [allMessages,changeAllMessages] = useState(props.msg);
console.log(allMessages);
useEffect(()=>{
    console.log('inside the useEffect, context changed')
    if(Context  &&  Context.name!==""){
        changeNam({
            name:Context.name,
            email:Context.email,
        });
        sessionStorage.setItem("user",JSON.stringify({
            name:Context.name,
            email:Context.email,
        }));
        const x = JSON.parse(sessionStorage.getItem('user'));
        console.log(x);
        console.log('making the props.changeProvide change and hence to render the app.js component ')
props.changeProvide({
    name:Context.name,
    email:Context.email,
})
setRunEffect(( prev)=>{return !prev});
    }
    
},[Context]);



console.log(nam);
console.log(props.provide);

const chatContainerRef = useRef(null);
useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [allMessages]);

  
    const BASE_URL = 'https://whatsapp-manu-h2xq-dgve.onrender.com';

useEffect(()=>{

async function getdata(){
console.log('REQUIRED!!!', 'this is the props.provide.email ',props.provide.email , 'and this is the session storage vala', JSON.parse(sessionStorage.getItem('user')).email)
    console.log('INTEREST!!!!!',props.provide.email , sessionStorage.getItem('loggedInuser'));
    const res = await fetch(`${BASE_URL}/wp?user1=${sessionStorage.getItem('loggedInuser')}&user2=${props.provide.email}`);



// REMEMBER TO ADD BASE_URL IN HERE WHEN DEPLOYING THE FROTNEND -> THAT IS THE URL OF THE WEBSITE WHERE THE BACKEND IS DEPLOYED

    console.log(res)

    if(res.ok){
    const response = await res.json();
    console.log(response);

    changeAllMessages(response);
    props.changemsg(response);
    sessionStorage.setItem("messages",JSON.stringify(response));
    }else{
        console.log('response is invalid')
    }

} 

getdata();

},[Context,runEffect])


// console.log(allMessages);
const [error,setError] = useState("");
function handleClick(e){
    const label = document.getElementsByClassName("label")[0];
    console.log(label)
    label.style.display = 'none';
    
}
const [posrec,changeposres] = useState({
    poster: "",
    receiver: "",
})
async function handleSubmit(e){
    e.preventDefault();
    console.log('aya')
   const all = document.querySelectorAll('.chat__input');
   all.forEach((elm)=>{
    console.log(elm.textContent)
   })
    const msg= message;
    const time = new Date().toISOString();
    const name = sessionStorage.getItem('loggedInuser').split('@')[0];
    const poster = sessionStorage.getItem('loggedInuser');
    
const receiver = props.provide.email;
changeposres({
    poster: poster,
    receiver: receiver,
})
console.log('poster is : ', poster);
console.log('receiver is : ' , receiver);
    const json =  {name:name,message:msg,timestamp:time,receiver:receiver,poster:poster};
    console.log(json)


    const response = await fetch(`${BASE_URL}/wp?user1=${sessionStorage.getItem('loggedInuser')}&user2=${props.provide.email}`,{


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
        const y="";
        changeMessage('');
        changeAllMessages(prev => {
          return [ ...prev, res ];
        });
        props.changemsg([...props.msg,res]);
      
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
console.log('all messages' , allMessages);
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



