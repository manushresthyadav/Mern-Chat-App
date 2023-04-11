
import "./chats.css"
import { Avatar } from "@mui/material"
export default function chats () {

return (
    <div className="chats"> 

<div className="chats__avatar"><Avatar src="https://thumbs.dreamstime.com/b/portrait-handsome-nice-entrepreneur-formal-suit-standing-outside-work-successful-businessman-corporate-people-office-204808830.jpg"></Avatar></div>
<div className="chats__name">
    <p className="name_chat">Manu</p>
    <p className="recent_chat">Hey this is manu</p>
</div>
    </div>
)

}