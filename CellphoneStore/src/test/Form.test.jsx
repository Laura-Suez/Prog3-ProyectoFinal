import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import ContacForm from "../components/ContactForm/ContacForm";

vi.mock("../components/Notification/Notification", () => ({
  successToast: vi.fn(),
  errorToast: vi.fn(),
}));

vi.mock("@emailjs/browser", () => ({
  default: {
    sendForm: vi.fn(),
  },
}));

import { errorToast } from "../components/Notification/Notification";

describe("ContacForm", () => {
  test("debe mostrar error si el nombre es muy corto", () => {
    render(<ContacForm />);

    fireEvent.change(screen.getByPlaceholderText("Ej: Juan Pérez"), {
      target: { value: "Jo" },
    });

    fireEvent.change(screen.getByPlaceholderText("nombre@correo.com"), {
      target: { value: "test@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("¿En qué podemos ayudarte?"), {
      target: { value: "Este es un mensaje válido" },
    });

    fireEvent.click(screen.getByText("Enviar Mensaje"));

    expect(errorToast).toHaveBeenCalledWith(
      "Nombre muy corto (mínimo 3 caracteres)",
    );
  });
});
