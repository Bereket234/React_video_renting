import _ from 'lodash'
export function Paginate(elements, pageNumber, pageSize) {
    const startIndex= (pageNumber-1) *pageSize 
    return _(elements).slice(startIndex).take(pageSize).value()
}
 
