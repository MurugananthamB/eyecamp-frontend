import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Form,
  InputGroup,
  Alert,
} from "react-bootstrap";
import {
  FaEdit,
  FaKey,
  FaToggleOn,
  FaToggleOff,
  FaSearch,
} from "react-icons/fa";
import api from "../api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/api/users/");
        const sortedData = data.sort((a, b) =>
          a.employeeId.localeCompare(b.employeeId)
        );
        setUsers(sortedData);
      } catch (err) {
        setError("Error fetching users");
        console.error("Error:", err);
      }
    };
    fetchUsers();
  }, []);

const handleEdit = (userId) => {
  const newName = prompt("Enter the new name:");
  if (newName) {
    api
      .put(`/api/users/${userId}`, { firstName: newName }) // ✅ Corrected Endpoint
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, firstName: newName } : user
          )
        );
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        alert("Failed to update user.");
      });
  }
};

const handlePasswordReset = (userId) => {
  const newPassword = prompt("Enter the new password:");
  if (newPassword) {
    api
      .put(`/api/users/${userId}/reset-password`, { password: newPassword }) // ✅ Corrected Endpoint
      .then(() => {
        alert("Password reset successfully!");
      })
      .catch((err) => {
        console.error("Error resetting password:", err);
        alert("Failed to reset password.");
      });
  }
};

const handleStatusToggle = (userId, currentStatus) => {
  const newStatus = currentStatus === "active" ? "inactive" : "active";
  api
    .put(`/api/users/${userId}/status`, { status: newStatus }) // ✅ Corrected Endpoint
    .then(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
      alert(`User status updated to ${newStatus}`);
    })
    .catch((err) => {
      console.error("Error updating user status:", err);
      alert("Failed to update user status.");
    });
};


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #ff9966, #ff5e62)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Container>
        <Card className="p-3 shadow-lg rounded-4">
          <h3 className="text-center text-danger mb-3">User Management</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          {/* Search Input */}
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by Name or Employee ID"
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>

          {/* User Table */}
          <Table striped bordered hover responsive className="text-center">
            <thead className="table-danger">
              <tr>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.employeeId}</td>

                  <td
                    className={
                      user.status === "active" ? "text-success" : "text-danger"
                    }
                  >
                    {user.status === "active" ? "Active" : "Inactive"}
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(user._id)}
                    >
                      <FaEdit /> Edit
                    </Button>{" "}
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handlePasswordReset(user._id)}
                    >
                      <FaKey /> Reset
                    </Button>{" "}
                    <Button
                      variant={user.status === "active" ? "danger" : "success"}
                      size="sm"
                      onClick={() => handleStatusToggle(user._id, user.status)}
                    >
                      {user.status === "active" ? (
                        <FaToggleOff />
                      ) : (
                        <FaToggleOn />
                      )}{" "}
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
};

export default UserManagement;
