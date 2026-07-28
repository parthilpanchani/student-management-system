function Pagination({
    page,
    setPage,
    totalPages,
    startStudent,
    endStudent,
    totalStudents,
}) {
    return (
        <div className="mt-6 flex justify-between items-center">

            <p>
                Showing {startStudent} to {endStudent} of {totalStudents} Students
            </p>

            <div className="flex items-center gap-2">

                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="border px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                >
                    Previous
                </button>

         <button
        className="border px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
    >
        {page}
    </button>
                

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="border px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                >
                    Next
                </button>

            </div>

        </div>
    );
}

export default Pagination;