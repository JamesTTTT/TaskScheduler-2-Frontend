const baseUrl = import.meta.env.VITE_BASE_URL;

const login = async (email, password) => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const error = await response.json();
      return { success: false, error };
    }
  } catch (err) {
    console.error(err);
    return { success: false, error: { message: "Server error" } };
  }
};

const register = async (fullName, email, password) => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      const error = await response.json();
      return { success: false, error };
    }
  } catch (err) {
    console.error(err);
    return { success: false, error: { message: "Server error" } };
  }
};

export { login, register };
