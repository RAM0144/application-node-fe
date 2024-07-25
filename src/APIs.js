const baseUrl = `${import.meta.env.VITE_BE_URL}`;


// read all students

async function getALLStudents() {
    try {
        const response = await fetch(`${baseUrl}/students`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();

    } catch (error) {
        console.log("Error fetching students", error);
    }
}

// create a new Student
async function createStudent(newStudent) {
    try {
        const response = await fetch(`${baseUrl}/students`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newStudent),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log("Error creating student:", error);
    }
}

// delete a student
async function deleteStudent(studentId) {
    try {
        const response = await fetch(`${baseUrl}/students/${studentId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log(`Error deleting student with ID ${studentId}:`, error);
    }
}


// Authentication APIs
// Registration
const registerUser = async (userDetails) => {

    try {
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
  
    } catch (error) {
      console.error(`Error while Registering the User`, error);
  
    }
    return undefined;
  
  };

  // Login
  const loginUser = async (userCreds) => {
    
      const response = await fetch(`${baseUrl}/auth/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(userCreds),
      });  
       if (response.status === 401 || response.status === 400) {
        const { msg } = await response.json();
        throw new Error(msg);
      }
      return await response.json();
  
  };


export { getALLStudents, createStudent, deleteStudent, registerUser, loginUser };