const Select = ({ items, label,  name, id, ...rest}) => {
    return ( 
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
                <select  className='form-control' name={name} id={id} {...rest}>
                    <option value=""/>
                    {items.map(item => <option key={item._id} value={item._id}>{item.name}</option>) }
                </select>
        </div>
     );
}
 
export default Select;