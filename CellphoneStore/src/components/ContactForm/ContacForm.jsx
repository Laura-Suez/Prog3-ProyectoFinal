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

    if (form.asunto.trim().length < 3) {
      errorToast("Por favor, ingresa un asunto");
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
        setForm({ name: "", email: "", asunto: "", message: "" }); // Resetea el estado
      })
      .catch((error) => {
        errorToast("Error al enviar el mail");
        console.error("EmailJS Error:", error);
      });
  };

  return (
  <div className="container d-flex flex-column align-items-center mt-5">
    <ToastContainer />
    
    <h2 className="fw-bold mb-2 text-center" style={{ color: "#111418", fontSize: "2.2rem" }}>
      Ponte en contacto con nuestros expertos
    </h2>
    <p className="text-center text-muted mb-5" style={{ maxWidth: "600px" }}>
      Resolución técnica inmediata y soporte especializado para hardware de alta precisión.
    </p>
    
    <div className="w-100 contact-card" style={{ maxWidth: "750px" }}>
      <form onSubmit={handleSubmit}>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <label htmlFor="name" className="contact-label">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name" 
              value={form.name}
              onChange={handleChange}
              className="form-control contact-input"
              placeholder="Tu nombre completo"
            />
          </div>

          <div className="col-md-6 mb-4">
            <label htmlFor="email" className="contact-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email" 
              value={form.email}
              onChange={handleChange}
              className="form-control contact-input"
              placeholder="correo@ejemplo.com"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="asunto" className="contact-label">
            Asunto
          </label>
          <input
            type="text"
            id="asunto"
            name="asunto" 
            value={form.asunto}
            onChange={handleChange}
            className="form-control contact-input"
            placeholder="¿En qué podemos ayudarte?"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="contact-label">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message" 
            value={form.message}
            onChange={handleChange}
            className="form-control contact-input"
            rows="5"
            placeholder="Describe tu consulta técnica detalladamente..."
          ></textarea>
        </div>

        <button type="submit" className="btn-contact-submit w-100 d-flex align-items-center justify-content-center gap-2 mb-4">
          Enviar Consulta <span>&rarr;</span>
        </button>

        <div className="contact-footer-text d-flex align-items-center gap-2">
          <span>Tiempo de respuesta estimado: menos de 24 horas laborables.</span>
        </div>

      </form>
    </div>
  </div>
);
};

export default ContacForm;