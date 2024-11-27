export const GenerateUserTokent = (userId: string) => {
  const token = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
  return token + userId;
};
