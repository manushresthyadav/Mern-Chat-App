
import "./styles.css"
export default function messages(props){
props=props.content;
let check = 'chat__body';

console.log(props)

if(props.received){
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