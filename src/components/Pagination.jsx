export default function Pagination({
    currentPage,
    totalPages,
    onPrev,
    onNext
}) {

    return (
        <div className="pages">
            <button
                id="btn-prev"
                onClick={onPrev}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            <span id="page-info">
                {currentPage} of {totalPages}
            </span>

            <button
                id="btn-next"
                onClick={onNext}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}