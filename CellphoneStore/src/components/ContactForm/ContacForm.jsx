import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { successToast, errorToast } from "../Notification/Notification";
import emailjs from "@emailjs/browser";

const ContacForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (form.name.trim().length < 3) {
      errorToast("Nombre muy corto (mínimo 3 caracteres)");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      errorToast("Email inválido");
      return;
    }

    if (form.message.trim().length < 10) {
      errorToast("El mensaje es muy corto (mínimo 10 caracteres)");
      return;
    }

    // Envío a EmailJS
    emailjs
      .sendForm(
        "service_76azydl",
        "template_8xfqrzs",
        e.target, // Captura el formulario directamente
        "0E0XEFX7qlZUt2V2R",
      )
      .then(() => {
        successToast("¡Mail enviado con éxito!");
        setForm({ name: "", email: "", message: "" }); // Resetea el estado
      })
      .catch((error) => {
        errorToast("Error al enviar el mail");
        console.error("EmailJS Error:", error);
      });
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="mb-4">Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre completo
          </label>
          <input
            type="text"
            id="name"
            name="name" // Debe coincidir con {{name}} en tu template de EmailJS
            value={form.name}
            onChange={handleChange}
            className="form-control w-50"
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email" // Debe coincidir con {{email}} en tu template de EmailJS
            value={form.email}
            onChange={handleChange}
            className="form-control w-50"
            placeholder="nombre@correo.com"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Tu mensaje
          </label>
          <textarea
            id="message"
            name="message" // Debe coincidir con {{message}} en tu template de EmailJS
            value={form.message}
            onChange={handleChange}
            className="form-control w-50"
            rows="4"
            placeholder="¿En qué podemos ayudarte?"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
};

export default ContacForm;
