import Pagination from "react-bootstrap/Pagination";
import "./Paginate.css";


const Paginate = (props) => {

    const activePage = props.activePage;
    const lastPage = props.lastPage;
    
    if(lastPage <= 1) {
        return(
            <>
            </>
        );
    }

    if(lastPage <= 3) {

        let pages = [];
        for (let page = 1; page <= lastPage; page++) {
            pages.push(
                <Pagination.Item activeLabel=""
                 key={page}
                  active={page === activePage}
                  onClick={() => {
                      if (page !== activePage) {
                          props.setActivePage(page);
                      }
                  }}
                  >
                    {page}
                </Pagination.Item>
            );
        }
        
        return(
            <Pagination size="sm" className="d-flex justify-content-center">
                {pages}
            </Pagination>
        );
    }

    return (
        <Pagination size="sm" className="d-flex justify-content-center">

            {activePage > 1 && (
                <>
                    {activePage !== 2 && (
                        <Pagination.First onClick={() => props.setActivePage(1)} />
                    )}
                    <Pagination.Prev onClick={() => props.setActivePage(activePage - 1)} />
                    {activePage > 2 && (
                        <Pagination.Ellipsis onClick={() => props.setActivePage(activePage - 2)} />
                    )}
                </>
            )}

            {activePage === 1 && (
                <>
                    <Pagination.Item activeLabel="" active>
                        {1}
                    </Pagination.Item>
                    <Pagination.Item activeLabel="" onClick={() => props.setActivePage(2)}>
                        {2}
                    </Pagination.Item>
                    <Pagination.Item activeLabel="" onClick={() => props.setActivePage(3)}>
                        {3}
                    </Pagination.Item>
                </>
            )}


            {(activePage > 1 && activePage < lastPage) && (
                <>
                    <Pagination.Item activeLabel="" onClick={() => props.setActivePage(activePage - 1)}>
                        {activePage - 1}
                    </Pagination.Item>
                    <Pagination.Item activeLabel="" active>
                        {activePage}
                    </Pagination.Item>
                    <Pagination.Item activeLabel="" onClick={() => props.setActivePage(activePage + 1)}>
                        {activePage + 1}
                    </Pagination.Item>
                </>
            )}

            {activePage === lastPage && (
                <>
                    <Pagination.Item activeLabel="" onClick={() => props.setActivePage(lastPage - 2)}>
                        {lastPage - 2}
                    </Pagination.Item>
                    <Pagination.Item activeLabel="" onClick={() => props.setActivePage(lastPage - 1)}>
                        {lastPage - 1}
                    </Pagination.Item>
                    <Pagination.Item activeLabel="" active>
                        {lastPage}
                    </Pagination.Item>
                </>
            )}

            {activePage < lastPage && (
                <>
                    {activePage < lastPage - 1 && (
                        <Pagination.Ellipsis onClick={() => props.setActivePage(activePage + 2)} />
                    )}
                    <Pagination.Next onClick={() => props.setActivePage(activePage + 1)} />
                    {activePage !== lastPage - 1 && (
                        <Pagination.Last onClick={() => props.setActivePage(lastPage)} />
                    )}
                </>
            )}

        </Pagination>
    );
}

export default Paginate;