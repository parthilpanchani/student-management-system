function Pagination({
    page,
    setPage,
    totalPages,
    startStudent,
    endStudent,
    totalStudents,
}) {
return (
    <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">

        <p className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
            Showing {startStudent} to {endStudent} of {totalStudents} Students
        </p>

        <div className="flex items-center gap-2">

            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="
                    px-4 py-2
                    rounded-lg
                    border
                    border-gray-300
                    dark:border-gray-600
                    bg-white
                    dark:bg-gray-800
                    text-gray-700
                    dark:text-gray-200
                    hover:bg-gray-100
                    dark:hover:bg-gray-700
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    transition
                "
            >
                Previous
            </button>

            <button
                className="
                    px-4 py-2
                    rounded-lg
                    bg-blue-600
                    text-white
                    font-medium
                    min-w-[45px]
                "
            >
                {page}
            </button>

            <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="
                    px-4 py-2
                    rounded-lg
                    border
                    border-gray-300
                    dark:border-gray-600
                    bg-white
                    dark:bg-gray-800
                    text-gray-700
                    dark:text-gray-200
                    hover:bg-gray-100
                    dark:hover:bg-gray-700
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    transition
                "
            >
                Next
            </button>

        </div>

    </div>
);
}

export default Pagination;