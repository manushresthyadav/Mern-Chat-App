
import { useEffect, useState } from 'react';
import './App.css';
import Chat from "./components/chat"
import Sidebar from "./components/sidebar"
import Pusher from "pusher-js"
import { ContextProvider } from './components/Context';
import { MyContext } from './components/Context';
import { useContext } from 'react';
import messages from './components/messages';
function App() {

// const Context  = useContext(MyContext);
// console.log(Context)
const [render,rerender] = useState(false);
function changeRender(){
  rerender(!render);
}

const res = JSON.parse(localStorage.getItem("user"));
console.log(res)

const [provide,changeProvide] = useState({
  name:res ? res.name : '',
  email:res ? res.email : '',
});
const newmsg = JSON.parse(localStorage.getItem("messages"));
console.log(newmsg);

const [msg,changemsg] = useState(newmsg ? JSON.parse(localStorage.getItem("messages")) : []);

// useEffect(()=>{
//   if(res!=undefined){
//     console.log('res was undefined and the value of provide was set equal to res' , res);
//     changeProvide(res); 
//    }
// },[res.email])



useEffect(()=>{
console.log('inside the app js file useffect')
  const pusher = new Pusher('dc320b1fae9f195b63a4', {
    cluster: 'ap2'
  });

  const channel = pusher.subscribe('messages');
  channel.bind('inserted', (data)=> {
    // alert(JSON.stringify(data));
  });

},[])
console.log(provide);
  return (
    <div className="App">


<div className="app__body">
  
  <Sidebar changeProvide={changeProvide} provide={provide} msg={msg} changemsg={changemsg}/>
  
  <Chat changeProvide={changeProvide} provide={provide} msg={msg} changemsg={changemsg}/>
  
  

</div>



    </div>
  );
}

export default App;

