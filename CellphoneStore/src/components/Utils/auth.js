export const decodeToken = (token) => {
    try {
        const payload = token.split(".")[1];
        const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(normalized));
    } catch {
        return null;
    }
};

