export const decodeToken = (token) => {
    if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedToken = JSON.parse(atob(normalized));

    const currentTime = Date.now() / 1000;
    if (currentTime >= decodedToken.exp) return null;

    return decodedToken;
  } catch (error) {
    console.error('Error decodificando el token:', error);
    return null;
  }
};


 