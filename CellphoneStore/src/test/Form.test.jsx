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

    fireEvent.change(screen.getByPlaceholderText("Tu nombre completo"), {
      target: { value: "Jo" },
    });

    fireEvent.change(screen.getByPlaceholderText("correo@ejemplo.com"), {
      target: { value: "test@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("¿En qué podemos ayudarte?"), {
      target: { value: "Consulta técnica" },
    });

    fireEvent.click(screen.getByText(/Enviar Consulta/i));

    expect(errorToast).toHaveBeenCalledWith(
      "Nombre muy corto (mínimo 3 caracteres)",
    );
  });
});
