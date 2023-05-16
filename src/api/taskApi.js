const baseUrl = import.meta.env.VITE_BASE_URL;

const createTask = async (taskDetails, token) => {
  const response = await fetch(`${baseUrl}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskDetails),
  });
  console.log(response);
  if (response.ok) {
    const data = await response.json();
    return { success: true, data };
  } else {
    const error = await response.json();
    return { success: false, error };
  }
};

const updateTask = async (taskDetails, token) => {
  const response = await fetch(`${baseUrl}/api/tasks/${taskDetails._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskDetails),
  });
  console.log(response);
  if (response.ok) {
    const data = await response.json();
    console.log("data", data);
    return { success: true, data };
  } else {
    const error = await response.json();
    return { success: false, error };
  }
};

export { createTask, updateTask };
