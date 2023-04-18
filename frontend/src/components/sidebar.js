import React,{useEffect, useState} from 'react'
import "./styles.css"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import {  IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import {Avatar} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Chats from "./chats";
import Pusher from "pusher-js"
import { responsiveProperty } from '@mui/material/styles/cssUtils';
import { getAuth } from 'firebase/auth';
import {app} from "../firebase/firebase";

export default function useSidebar  (props)  {
  const BASE_URL = 'https://whatsapp-manu-h2xq-dgve.onrender.com';
 
  
const [contacts , changeContacts ] = useState([{
  name:"Admin",
  email : "admin00@gmail.com",
}])
const [users, changeUsers] = useState([
  {
    name : "Admin",
    email: "admin00@gmail.com"
  }
]);
const [check , setCheck ] = useState(false);
const changeCheck = () => {
  setCheck(!check);
};
const auth = getAuth(app);

console.log(auth.currentUser);
const uid = auth.currentUser.uid;

const [select, changeselect] = useState(true);

useEffect(()=>{
console.log('inside the contacts useffect');

async function getContacts(){
  const response = await fetch(`${BASE_URL}/wp/contacts?uid=${uid}` , {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

const contacts = await response.json();
console.log(contacts)
changeContacts(contacts);

}

getContacts();


},[check])

useEffect(()=>{
console.log('inside previous sidebar useeffect6')
  async function getAllUsers(){

    const resposne = await fetch(`/wp/user?email=${auth.currentUser.email}`, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
      }
    })

    const users = await resposne.json();
    console.log(users)
    changeUsers(users);
  }

  getAllUsers();
 

},[])


  useEffect(()=>{
    console.log('inside the sidebar js file useffect')
      const pusher = new Pusher('dc320b1fae9f195b63a4', {
        cluster: 'ap2'
      });
    
      const channel = pusher.subscribe('newuser');
      channel.bind('inserted', (data)=> {
        // alert(JSON.stringify(data));
        changeUsers((prev)=>{
          return [...prev, data];
        })

      });
    
    },[])


  function handleClick(e){
    const label = document.getElementsByClassName("label__sidebar")[0];
    console.log(label)
    label.style.display = 'none';
    const icon = document.getElementsByClassName("icon__hide")[0];
    icon.style.display= 'none';
}

function handleIf(e){
  const input = document.getElementsByClassName("sidebar__search__input")[0];
  const x = input.value;
  console.log('aya')
  if(x==='' ){
      const label = document.getElementsByClassName("label__sidebar")[0];
      console.log(label)
      label.style.display = 'block';
      const icon = document.getElementsByClassName("icon__hide")[0];
    icon.style.display= 'block';
  }
}

  return (
    <div className='sidebar'>
    
    <div className='sidebar__header'>
         <div className='header__left'><Avatar src='https://thumbs.dreamstime.com/b/portrait-handsome-nice-entrepreneur-formal-suit-standing-outside-work-successful-businessman-corporate-people-office-204808830.jpg'/></div>
         <div className='header__right'> <i class="fa-brands fa-rocketchat"></i> 
         <i class="fa-solid fa-spinner"></i>
         <IconButton>
         <DonutLargeIcon/>
         
         </IconButton>
         <IconButton><ChatIcon/></IconButton>
         <IconButton><MoreVertIcon/></IconButton>

          </div>
    </div>

    <div className='sidebar__search' onMouseLeave={handleIf} >
      <span className='icon__hide'><SearchIcon/></span>
<label htmlFor='chat' className='label__sidebar'  onClick={handleClick}>Search or start a new chat</label>
<input className='sidebar__search__input' name='chat' onClick={handleClick} ></input>
    </div>
    <div className='sidebar__chat__container'>
<div className='sidebar__chat'>

<button style={{backgroundColor :  (select ? '#efefef' : 'white') }} onClick={()=>{changeselect((prev)=>!prev)}}>Global Users</button>
<button style={{backgroundColor :  (!select ? '#efefef' : 'white') }} onClick={()=>{changeselect((prev)=>!prev)}}>Contacts</button>
{select && <div className='detail_new'>Click on User add icon to add to Your Contacts</div>}
{select && users.map((user)=>{
  console.log(user)
  return <Chats details={user} contacts={false} changeit={changeCheck}  changeProvide={props.changeProvide} provide={props.provide} msg={props.msg} changemsg={props.changemsg}/>
})}

{!select && <div className='detail_new'>Double Click on Contact to display chats</div>}
{!select && contacts.map((contact)=>{
  return <Chats details={contact} contacts={true} changeit={changeCheck} changeProvide={props.changeProvide} provide={props.provide} msg={props.msg} changemsg={props.changemsg}/>
})}
{/* <Chats changeRender={props.changeRender}/> */}
<div className='sidebar__display__chats'></div>

</div>
</div>

    </div>
  )
}


