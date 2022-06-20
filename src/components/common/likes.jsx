const Likes = (props) => {
    return ( 
        <i style={{cursor: 'pointer'}} onClick={props.onClick} className={getClasses()} aria-hidden="true"></i>
     );

    function getClasses() {
        let classes = "fa fa-heart";
        if (!props.isLiked)
            classes += "-o";
        return classes;
    }
}
 
export default Likes;