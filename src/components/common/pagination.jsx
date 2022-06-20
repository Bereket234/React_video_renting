import _ from 'lodash'
import propTypes from 'prop-types'

const Pagination= (props) => {
    const {pageSize, count, currentPage}= props

    const pageCount=Math.ceil(count / pageSize) 
    if(pageCount===1) return null

    const pages= _.range(1, pageCount+1)
    return ( 
        <nav>
            <ul className="pagination">
            {
                pages.map((page)=> <li key={page} className={page===currentPage ? "page-item active" :"page-item" }>
                    <button
                        onClick={()=> props.onPageChange(page) } 
                        className="page-link">{page}</button>
                </li>)
            }
            </ul>
        </nav>
     );
}

Pagination.propTypes= {
    currentPage: propTypes.number.isRequired,
    count: propTypes.number.isRequired,
    pageSize: propTypes.number.isRequired,
    onPageChange: propTypes.func.isRequired
}


 
export default Pagination;