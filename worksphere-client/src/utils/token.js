const TOKEN_KEY = "worksphere_token";
const USER_KEY = "worksphere_user";

export const setToken = (token, remember = false) => {
  if (remember) {
    localStorage.setItem(TOKEN_KEY, token);
    sessionStorage.removeItem(TOKEN_KEY);
  } else {
    sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  removeUser();
};

// Mirrors setToken's storage choice so user data and token
// always live in the same place and expire together.
export const setUser = (user, remember = false) => {
  const value = JSON.stringify(user);
  if (remember) {
    localStorage.setItem(USER_KEY, value);
    sessionStorage.removeItem(USER_KEY);
  } else {
    sessionStorage.setItem(USER_KEY, value);
    localStorage.removeItem(USER_KEY);
  }
};

export const getUser = () => {
  const raw =
    localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to parse stored user:", err);
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(USER_KEY);
};
