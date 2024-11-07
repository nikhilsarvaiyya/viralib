
function VRAButton({ id, name, type, value, label, size, disabled, as, color, style }) {
    let c = color ? " " + color : "";
    let s = size ? " " + size : "";
    let a = as ? " " + as : "";
    
    let css =  s + a + c;
    return <button
        id={id}
        className={"vra-button" + css}
        style={style || {}}
        type={type || 'button'}
        name={name}
        value={value}
        disabled={disabled || false}
    >
        {label || type || "Button"}
    </button>
}
module.exports = VRAButton