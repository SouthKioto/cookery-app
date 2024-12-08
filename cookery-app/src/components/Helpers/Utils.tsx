export const GenerateUserTokent = (userId: string) => {
  const token = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
  return token + userId;
};

export const GetUserIdFromToken = () => {
  const tokenString = localStorage.getItem('userToken');

  let idSliced = '';

  if (tokenString) {
    try {
      const token = JSON.parse(tokenString);
      //console.log(token);

      if (Array.isArray(token) && token[0]?.token !== undefined) {
        //console.log(token[0]?.token);
        const tokenData = token[0]?.token;
        idSliced = tokenData.slice(5, 6);
        return parseInt(idSliced);
      } else {
        console.error('Nieprawidłowy format tokena.');
      }
    } catch (err) {
      console.error('Błąd parsowania tokena:', err);
    }
  }
};
