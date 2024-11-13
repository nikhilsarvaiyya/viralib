
function VRAAvatar({ src, type, zIndex, alt, style,size }) {

    let s = size ? " " + size : "";
    let t = type ? " " + type : "";

    let css = s + t 

    const getUserInitials = (alt) => {
        const fullName = alt.split(' ');
        const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
        return initials.toUpperCase();
    }

    let image = <img
        className={`vra-avatar ${css}`}
        alt={alt}
        style={style}
        src={src} />
    let text = <div className={`vra-display-alpha ${css}`}  style={style}>{alt ? getUserInitials(alt) : "A"}</div>

    return src ? image : text;
}

function VRAAvatarGroup(props) {
    const { max, children, type } = props;

    let maxImg = children?.length > max ? <span class={`avatar-count ${type}`}>+{children.length - max}</span> : "";

    let chainImg = children.map((item, i) => {
        if (max && i < max) {
            return <VRAAvatar src={item?.props?.src} zIndex={(children?.length + 3) - i} type={type} />
        } else if (!max) {
            return <VRAAvatar src={item?.props?.src} zIndex={(children?.length + 3) - i} type={type} />
        }

    })

    let renderView = <div class="vra-avatar-img-group">{chainImg} {maxImg}</div>
    return renderView

}

module.exports = { VRAAvatar, VRAAvatarGroup }
