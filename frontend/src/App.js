
import { useEffect } from 'react';
import './App.css';
import Chat from "./components/chat"
import Sidebar from "./components/sidebar"
import Pusher from "pusher-js"
function App() {

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

  return (
    <div className="App">


<div className="app__body">
  
  <Sidebar/>
  <Chat/>
  

</div>



    </div>
  );
}

export default App;
