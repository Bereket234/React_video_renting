import React, { Component } from 'react';

class TableHeader extends Component {
    
    raiseSort= path => {
    const sortColumns= {...this.props.sortColumns}
    if(sortColumns.path===path)
        sortColumns.order= sortColumns.order==='asc'? 'desc': 'asc'
    else{
        sortColumns.path= path
        sortColumns.order= 'asc'
    }
    this.props.onSort(sortColumns)
}
renderIcon= column=> {
    const {sortColumns}= this.props
    if(column.path !== sortColumns.path || column.content) return null
    if(sortColumns.order==='asc') return <i className="fa fa-sort-asc"></i>
    return <i className="fa fa-sort-desc"></i>
}

    render() { 
        const {columns}= this.props
        return (
            <thead>
                <tr>
                    {columns.map(column => 
                    <th 
                        className='clickable'
                        key={column.path || column.key} 
                        onClick= {() => this.raiseSort(column.path)}>
                        {column.label} {this.renderIcon(column)}
                    </th>)}
                </tr>
            </thead>
        );
    }
}
 
export default TableHeader;