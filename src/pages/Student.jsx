import { useEffect, useState } from "react"
import { createStudent, deleteStudent, getALLStudents } from "../APIs.js";

const Students = () => {

    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        image: "",
    });

    const loadStudents = async () => {
        const { students } = await getALLStudents();

        setStudents(students);
    };

    // delete student
    const removeStudent = async (stuId) => {
        await deleteStudent(stuId)
        setStudents(students.filter((stu) => stu.id !== stuId));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newStudent = {
            id: students.length + 1,
            name: formData.name,
            age: formData.age,
            image: formData.image || "https://via.placeholder.com/150",
            teacherId: formData.teacherId,
        }

        await createStudent(newStudent);

        setStudents([
            ...students, newStudent
        ]);

        setFormData({
            name: "",
            age: "",
            image: "",
            teacherId: "",
        })
    };

    useEffect(() => {
        loadStudents();
    }, []);



    return (
        <div className="container mt-4">
            <h2>Shortner Application</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="text"
                        className="form-control"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Add Student
                </button>
            </form>

            <div className="row mt-4">
                {students.map((student) => (
                    <div className="col-md-4 mb-4" key={student.id}>
                        <div className="card">
                            <img
                                src={student.image}
                                className="card-img-top"
                                alt={student.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{student.name}</h5>
                                <p className="card-text">Age: {student.age}</p>
                                <i role="button"
                                    onClick={() => removeStudent(student.id)}
                                    className="fa-sharp fa-solid fa-trash fa-2x"></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Students;