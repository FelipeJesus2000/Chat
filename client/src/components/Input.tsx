const Input = () => {
    return (
        <input name='input' id="txt-input" className="component" style={{
            backgroundColor: "white",
            borderColor: "#0593A2",
            height: "35px",
            width: "480px",
            margin: "5px"
        }} onFocus={(input) => input.target.style.outline = "0"} />
    )
}



export default Input;