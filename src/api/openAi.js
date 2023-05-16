const baseUrl = import.meta.env.VITE_BASE_URL;

const getTaskRecommendation = async (project, tasks, token) => {
  const response = await fetch(`${baseUrl}/api/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ tasks, project }),
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

export { getTaskRecommendation };
