import TableHeader from './tableHeader'
import TableBody from './tableBody'

const Table = (props) => {
    const {sortColumns, columns,data,  onSort }= props
    return ( 
        <table className='table'>
            <TableHeader
                sortColumns= {sortColumns}
                columns={columns}
                onSort= {onSort}
            />
            <TableBody
                data= {data}
                columns= {columns}
            />
        </table>
     );
}
 
export default Table;