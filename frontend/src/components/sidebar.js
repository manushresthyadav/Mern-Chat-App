import React from 'react'
import "./styles.css"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import {  IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import {Avatar} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Chats from "./chats"
export default function useSidebar  ()  {

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

<h1>Add new Chat</h1>
<div className='sidebar__display__chats'></div>
<Chats/>
<Chats/>
<Chats/>
<Chats/>
</div>
</div>

    </div>
  )
}

