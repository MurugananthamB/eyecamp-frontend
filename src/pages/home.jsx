import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center p-5 bg-light rounded shadow-lg">
        <h1 className="text-primary fw-bold">Welcome to Eye-Camp</h1>
        <p className="text-muted">
          A smart and efficient way to manage eye checkup camps.
        </p>
        <button
          className="btn btn-primary px-4 py-2"
          onClick={() => navigate("/login")} // Redirect to /login
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
