const ListGroup = (props) => {
    const {items, onItemSlect, selectedItem, textProperty, valueProperty}= props
    return (
        <ul className="list-group mt-3">
            {items.map((item)=>{
            return <li 
                key= {item[valueProperty]} 
                onClick={()=> onItemSlect(item[textProperty])} 
                style={{cursor:'pointer'}} 
                className={selectedItem=== item[textProperty]?"list-group-item active": "list-group-item" }
            >{item[textProperty]}</li>
            })}
        </ul>
     );
}

ListGroup.defaultProps= {
    textProperty: "name",
    valueProperty: "_id"
}
 
export default ListGroup;