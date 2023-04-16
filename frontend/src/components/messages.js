
import "./styles.css"
import { getAuth } from "firebase/auth";
export default function messages(props){
props=props.content;
let check = 'chat__body';

const auth  = getAuth();
const loggedIn = auth.currentUser.email;
console.log(loggedIn);
console.log(props.poster);
console.log(props)

if(props.poster===loggedIn){
    console.log('enters this')
check = 'chat__body__right';
}

    return (
        <div className={check}>
    <p>
        <span>{props.name}</span>
        <div className='chat__content'><p>{props.message}</p>
        <span className='chat__timestamp'>{props.timestamp}</span></div>
       
    </p>
</div>
    )


}