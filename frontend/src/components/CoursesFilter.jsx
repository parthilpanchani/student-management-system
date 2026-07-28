import Input from "./Input";

function CoursesFilter({
    search,
    setSearch,
    selectedStatus,
    setSelectedStatus,
}) {

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6">

            <div className="flex gap-4">

                <div className="flex-1">

                    <Input
                        type="text"
                        placeholder="Search Course..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="border border-gray-200 rounded-lg px-4 py-3">
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

    );

}

export default CoursesFilter;