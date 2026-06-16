import { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { AuthenticationContext } from "../Services/Auth/auth.context";
import { errorToast, successToast } from "../Notification/Notification";

const ROLES = ["user", "admin", "super-admin"];
const API_URL = "http://localhost:3000/user";

const Users = () => {
  const { token, user: currentUser } = useContext(AuthenticationContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  const isSuperAdmin = currentUser?.role === "super-admin";

  useEffect(() => {
    fetch(API_URL, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        if (!res.ok) throw new Error("No se pudieron cargar los usuarios.");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => errorToast(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  const handleRoleChange = (id, role) => {
    setUsers((current) =>
      current.map((u) => (u.id === id ? { ...u, role } : u)),
    );
  };

  const saveUser = async (userToSave, successMessage) => {
    setSavingId(userToSave.id);

    try {
      const res = await fetch(`${API_URL}/${userToSave.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: userToSave.email,
          role: userToSave.role,
          active: userToSave.active,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "No se pudo actualizar el usuario.");
      }

      const updated = await res.json();
      setUsers((current) =>
        current.map((u) => (u.id === updated.id ? { ...u, ...updated } : u)),
      );
      successToast(successMessage || "Usuario actualizado correctamente.");
    } catch (err) {
      errorToast(err.message);
    } finally {
      setSavingId(null);
    }
  };

  const toggleActive = (userToToggle) => {
    const nextActive = !userToToggle.active;
    saveUser(
      { ...userToToggle, active: nextActive },
      nextActive ? "Usuario activado." : "Usuario desactivado.",
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">USUARIOS</h1>
      <p className="text-secondary mb-4">
        {isSuperAdmin
          ? "Gestioná los roles y el estado de los usuarios."
          : "Listado de usuarios (solo lectura)."}
      </p>

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <Table responsive bordered hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              {isSuperAdmin && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isSelf = user.id === currentUser?.id;
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>
                    {isSuperAdmin ? (
                      <Form.Select
                        value={user.role}
                        disabled={isSelf || savingId === user.id}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                        style={{ maxWidth: "180px" }}
                      >
                        {ROLES.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td>
                    <Badge bg={user.active ? "success" : "secondary"}>
                      {user.active ? "Activo" : "Inactivo"}
                    </Badge>
                  </td>
                  {isSuperAdmin && (
                    <td className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="primary"
                        disabled={isSelf || savingId === user.id}
                        onClick={() => saveUser(user, "Rol actualizado correctamente.")}
                      >
                        {savingId === user.id ? "Guardando..." : "Guardar rol"}
                      </Button>
                      <Button
                        size="sm"
                        variant={user.active ? "outline-danger" : "outline-success"}
                        disabled={isSelf || savingId === user.id}
                        onClick={() => toggleActive(user)}
                      >
                        {user.active ? "Desactivar" : "Activar"}
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Users;
