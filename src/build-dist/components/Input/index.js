
function VRAInput(props) {
    const { label, variant , alignText} = props;
    let box = <GenerateInput label={label} variant={variant} alignText={alignText}/>
    return box
}

function GenerateInput(props) {
    const { label ,variant, alignText } = props;
    let v = variant ? " " + variant : "";
    let p = alignText ? " " + alignText : "";

    let renderBox = <div className={`VRAInput${v}${p}`}>
        <Label label={label}  />
        <Input label={label} />
    </div>
    return renderBox
}
function Input(props) {
    const { label } = props;
    let renderInput = <input type='text'   />
    return renderInput
}

function Label(props) {
    const { label, variant } = props;
    let renderLabel = label ? <label >{label} </label> : null
    return renderLabel
}



module.exports = VRAInput
