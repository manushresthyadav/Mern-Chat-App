
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase/firebase";
import "./Auth.css";
export default function useLogin (){


    const [data,changedata] = useState({
        email:"",
        password:"",
    });

    const Navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth,data.email,data.password).then((userc)=>{
            console.log('signed in : MAIN!!!' , userc);
            sessionStorage.setItem('loggedInuser',data.email);
            sessionStorage.setItem('uid',userc.user.uid);
        Navigate('/main');
        })
    }

    return (
        <div className="register__container">

<form>
                <input placeholder="Enter your email" onChange={(e)=>{
                    changedata((prev)=>{
                        return {...prev, email: e.target.value}
                    })
                }}></input>
                
                <input placeholder="Enter password" onChange={(e)=>{
                    changedata((prev)=>{
                        return {...prev, password: e.target.value}
                    })
                }}></input>
                
                <button onClick={handleSubmit}>Login</button>
               
            </form>

        </div>
    )
}
