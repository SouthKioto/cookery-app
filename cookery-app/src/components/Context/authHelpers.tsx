export const login = (newToken: string, setToken: React.Dispatch<React.SetStateAction<string | null>>) => {
  localStorage.setItem('userToken', newToken);
  setToken(newToken);
};

export const logout = (setToken: React.Dispatch<React.SetStateAction<string | null>>) => {
  localStorage.removeItem('userToken');
  setToken(null);
};
