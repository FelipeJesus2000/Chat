

interface ButtonProps {
    text: string;
}


const Button:  React.FC<ButtonProps> = ({ text }) => {

    

    return (
    <button type="submit" className="component" style={{ 
            backgroundColor: "#0593A2", 
            height: "50px", 
            color: "white",
            padding: "10px",
            width: "100px",
            margin: "5px",
            cursor: "pointer"
        }}>
        {text}
    </button>)
}


export default Button;
