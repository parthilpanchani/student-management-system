import Input from "../ui/Input";

function CoursesFilter({
    search,
    setSearch,
    selectedStatus,
    setSelectedStatus,
}) {

return (

    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-5 mb-6">

        <div className="flex flex-col lg:flex-row gap-4">

            {/* Search */}
            <div className="flex-1">

                <Input
                    type="text"
                    placeholder="Search Course..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            {/* Status Filter */}
            <div className="w-full lg:w-56">

                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        dark:border-gray-600
                        bg-white
                        dark:bg-gray-800
                        text-gray-900
                        dark:text-white
                        px-4
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        transition
                    "
                >
                    <option value="">
                        All Status
                    </option>

                    <option value="Active">
                        Active
                    </option>

                    <option value="Inactive">
                        Inactive
                    </option>

                </select>

            </div>

        </div>

    </div>

);

}

export default CoursesFilter;