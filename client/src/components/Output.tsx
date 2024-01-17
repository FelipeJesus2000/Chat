import React, { useEffect, useRef } from "react";
import Message from "./Message";

interface IOutputProps {
    children?: {
        text: string,
        datetime: Date,
        who: 'sender' | 'receiver'
    }[],
    id: string,
}



const Output: React.FC<IOutputProps> = (props) => {
    const div = useRef<HTMLDivElement>(null)  

    useEffect(() => {
        if (div.current !== null) {
            div.current.scrollTo({
                left: 0,
                top: div.current.scrollHeight,
            });
        }
    }, [props.children])

    const style: React.CSSProperties = {
        backgroundColor: "#FF7A48",
        height: "500px",
        width: "600px",
        borderColor: "#FF7A48",
        position: "relative",
        borderWidth: "1px",
        overflowY: "scroll"
    }

    return (
        <div className="component" style={style} id={props.id} ref={div} >
           {props.children?.map((message, index) => (
                <Message
                    key={`message-${index}`}
                    text={message.text}
                    who={message.who}
                    datetime={message.datetime}
                />
            ))}
        </div>
    )
}

export default Output