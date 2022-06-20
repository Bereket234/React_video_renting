const Input = ({ error, label,  name, ...rest}) => {
    return ( 
        <div>
            <div className="form-group">
                <label htmlFor={name}><label ></label>{label}</label>
                <input name={name} id={name} placeholder={label} {...rest} className="form-control" />
            </div>
            {error && <small className="alert alert-danger">{error}</small>}            
        </div>
     );
}
 
export default Input;