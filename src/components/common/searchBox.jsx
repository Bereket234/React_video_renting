const SearchBox = ({onChange, value}) => {
    return ( 
        <div className="form-group">
            <input type="text" value={value} onChange={onChange} placeholder="Search..." className="form-control" />
        </div>
     );
}
 
export default SearchBox;