import { useParams } from "react-router-dom";

function EditStudent() {


    const { id } = useParams();
    return (
        <>
            <h1>Edit Student</h1>
            <h2>Student ID: {id}</h2>
        </>
    );
}

export default EditStudent;