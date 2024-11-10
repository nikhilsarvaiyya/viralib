function VRAButton({ id, name, type, value, label, size, disabled, as, color, style, iconStart, iconEnd }) {
    let c = color ? " " + color : "";
    let s = size ? " " + size : "";
    let a = as ? " " + as : "";
    
    
    let data;
    let buttonType = ""
    if((iconStart || iconEnd) && label || label){
        data = <>{iconStart} {label} {iconEnd}</>;
        buttonType = " vra-button-text"
    } else if((iconStart || iconEnd)){
        data = <>{iconStart} {iconEnd}</>;
        buttonType = " vra-button-icon"
    } else {
        data = <>{label || "Button"}</>;
        buttonType = " vra-button-text"
    }

    let css = buttonType + s + a + c;

    return <button
        id={id}
        className={"vra-button" + css}
        style={style || {}}
        type={type || 'button'}
        name={name}
        value={value}
        disabled={disabled || false}
    >
        {data}
        
    </button>
}
module.exports = VRAButton



// Variant : solid | outline | link 
// color : red / danger | green / success | blue / info | orange / warning | black | white
// size
// disabled
// loading