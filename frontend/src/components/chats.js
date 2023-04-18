
import "./chats.css"
// import "./styles.css"
import { Avatar } from "@mui/material"
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import {  IconButton } from '@mui/material';
import { getAuth } from "firebase/auth";
import {app} from "../firebase/firebase"
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Children, useState } from "react";
import { createContext } from "react";
import {ContextProvider} from "./Context";
import Chat from "./chat"
import App from "../App"
 function useChats (props) {
const BASE_URL = 'https://whatsapp-manu-h2xq-dgve.onrender.com';
const auth = getAuth(app);
console.log(auth.currentUser);

const [state,changeState] = useState(false);

const [ replState,changeReplstate] = useState({
    name:props.provide.name,
    email:props.provide.email,
})
const uid= auth.currentUser.uid;
console.log(uid)
async function handleClick(e){
    console.log('inside handle click to post the contacts');
    console.log(e);
    const x = e.currentTarget.previousSibling;
    const fc = x.childNodes[0];
    const sc = x.childNodes[1];
    console.log(fc, sc);
    
    const name = fc.textContent;
    const email = sc.textContent;
    console.log(email , name)
   const response = await fetch(`${BASE_URL}/wp/contacts`,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            name:name,
            uid:uid,
            email:email,
        })
    });
if(response.ok){
    const json = await response.json();
    console.log('contact added : :  - > ', json);
    // e.currentTarget.style.display='none';
changeState(true);
props.changeit();

} else{
        console.log('there was sdome error')
    }

}

if(props.details == undefined){
    return;
}

function handleChatDisplay(e){
    if(!props.contacts){
        return;
    }
    console.log('clicked')
if(!props.contacts){
return;
}else{
// 'then creata context and everythign will come in here';
const x =e.currentTarget.childNodes[1].childNodes[0].textContent;
const y=e.currentTarget.childNodes[1].childNodes[1].textContent;

console.log(x,y);
changeReplstate({
    name:x,
    email:y,
})
// props.changeProvide({
//     name:x,email:y});
// ContextProvider({children:<Chat/> , value : {name:x,email:y}});


}
}

console.log(props)
return ( 
    <>
    <div className="chats" onClick={handleChatDisplay}> 

<div className="chats__avatar"><Avatar src="https://thumbs.dreamstime.com/b/portrait-handsome-nice-entrepreneur-formal-suit-standing-outside-work-successful-businessman-corporate-people-office-204808830.jpg"></Avatar></div>
<div className="chats__name">
    <p className="name_chat contact__name" > {props.details.name}</p>
    <p className="recent_chat contact__email">{props.details.email}</p>
</div>
    {!props.contacts && !state &&  <IconButton onClick={handleClick}>
    <PersonAddAlt1Icon/>
</IconButton>}
{state && <IconButton>
    <HowToRegIcon/>
    </IconButton>}
  
    </div>
    <div style={{display:"none"}}>
    <ContextProvider value={replState}>
        <Chat changeProvide={props.changeProvide} provide={props.provide} msg={props.msg} changemsg={props.changemsg}/>
    </ContextProvider>
    </div>
    </>
)

}

export default  useChats;
