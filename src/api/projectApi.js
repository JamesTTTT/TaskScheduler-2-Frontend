const baseUrl = import.meta.env.VITE_BASE_URL;

const createProject = async (title, description, token) => {
  const response = await fetch(`${baseUrl}/api/projects/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description }),
  });
  if (response.ok) {
    const data = await response.json();
    return { success: true, data };
  } else {
    const error = await response.json();
    return { success: false, error };
  }
};

async function getAllProjects(token) {
  try {
    const response = await fetch(`${baseUrl}/api/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return null;
  }
}

export { createProject, getAllProjects };
