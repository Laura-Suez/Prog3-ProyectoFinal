export const verifyLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
        errors.push("El email no es válido");
    }

    if (!password) {
        errors.push("La contraseña es obligatoria");
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};