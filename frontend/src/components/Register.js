
import { useState } from "react";
import {  useNavigate} from "react-router-dom"
import {getAuth} from "firebase/auth"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {app} from "../firebase/firebase"
 // const mongoose = require('mongoose');
import './Auth.css'
import {Link} from "react-router-dom"
export default function useRegister (){
   
  const BASE_URL = 'https://whatsapp-manu-h2xq-dgve.onrender.com';
    const Navigate = useNavigate();
    const [data,changedata] = useState({
        email : "" ,
         name : "" ,
          password: "", 

    });
    const [error,seterror] = useState(undefined)





    const handleSubmit = async (e)=>{
e.preventDefault();
if(data.email==="" || data.password==="" || data.name===""){
seterror('Please fill all the input fields properly and then submit');
return ;
}
else{
    seterror(undefined);
}


        const auth =  getAuth(app);
        const user = await createUserWithEmailAndPassword(auth,data.email,data.password).then((userc)=>{
            console.log(userc);

            fetch('${BASE_URL}/wp/user',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data),
            })

        })
     



        console.log("succefull register");
        Navigate('/main');
    }
    return(
        <>
        <div className="register__container">
            <form>
                <input placeholder="Enter your email" onChange={(e)=>{
                    changedata((prev)=>{
                        return {...prev, email: e.target.value}
                    })
                }}></input>
                <input placeholder="Enter your name" onChange={(e)=>{
                    changedata((prev)=>{
                        return {...prev, name: e.target.value}
                    })
                }}></input>
                <input placeholder="Enter password" onChange={(e)=>{
                    changedata((prev)=>{
                        return {...prev, password: e.target.value}
                    })
                }}></input>
                <input placeholder="Confirm password"></input>
                <button onClick={handleSubmit}>Register</button>
                {error && <div>{error}</div>}
            </form>
            <div>OR</div>
            <Link to="/login">
            <button className="btn">Sign In</button>
            </Link>
           
        </div>
      
        </>
    )
}
