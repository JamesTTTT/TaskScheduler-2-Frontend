import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login } from "./Pages";
import { useAuth } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";

function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProjectProvider>
              <Home />
            </ProjectProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
