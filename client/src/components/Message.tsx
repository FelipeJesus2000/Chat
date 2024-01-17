

interface MessageProps {
    text: string,
    who: 'sender' | 'receiver',
    datetime: Date
}

const Message: React.FC<MessageProps> = ({ text, who, datetime }) => {
    if (who === 'sender') {
        return (<>
            <div className="row" >
                <div className="component"
                    style={{
                        fontFamily: "arial",
                        backgroundColor: "#0593A2",
                        borderColor: "white",
                        color: "white",
                        textAlign: "center",
                        width: "auto",
                        maxWidth: "200px",
                        height: "auto",
                        padding: "0 20px",
                        borderWidth: "3px 3px 3px 0px"
                    }}>
                    <p>
                        {text}
                    </p>
                </div>
               
            </div>
             <span style={{
                fontSize: "10px"
            }}>
                <p>me sent on {formatDate(datetime)}</p>
            </span>
            </>
        )
    }
    if (who === "receiver") {
        return (
            <>
            <div className="row-reverse" >
                <div className="component"
                    style={{
                        fontFamily: "arial",
                        backgroundColor: "#103778",
                        borderColor: "white",
                        color: "white",
                        textAlign: "center",
                        width: "auto",
                        maxWidth: "200px",
                        height: "auto",
                        padding: "0 20px",
                        borderWidth: "3px 0px 3px 3px"  
                    }}>
                    <p>
                        {text}
                    </p>
                </div>
            </div>
            <div className="row-reverse">
            <span style={{
                fontSize: "10px"
            }}>
                <p>received on {formatDate(datetime)}</p>
            </span>
            </div>
            </>
        )
    }
}

function formatDate(originalDateString: Date){
    return originalDateString.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
  .replace(".", "/");
}


export default Message;