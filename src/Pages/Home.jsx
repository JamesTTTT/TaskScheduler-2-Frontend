import React, { useEffect, useState } from "react";
import { Layout, CreateProject } from "../components";
import { createProject, getAllProjects } from "../api/projectApi";
import { useAuth } from "../context/AuthContext";
import { ProjectBar } from "../components";

const Home = () => {
  const { token, logout } = useAuth();

  const [showCreateProject, setShowCreateProject] = useState(false);

  const [Projects, setProjects] = useState([]);

  const [projectValue, setprojectValue] = useState({
    title: "",
    description: "",
  });

  const fetchProjects = async () => {
    const res = await getAllProjects(token);
    console.log("Proj:", res);
    setProjects(res);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProjectSubmit = async () => {
    const res = await createProject(
      projectValue.title,
      projectValue.description,
      token
    );
    if (res.success) {
      setShowCreateProject(false);
      fetchProjects();
    }
    console.log(res);
  };

  return (
    <Layout>
      <CreateProject
        showModal={showCreateProject}
        closeModal={() => {
          setShowCreateProject(false);
          setprojectValue({
            title: "",
            description: "",
          });
        }}
        projectValues={projectValue}
        onChange={(e) => {
          setprojectValue({ ...projectValue, [e.target.name]: e.target.value });
        }}
        onSubmit={(e) => {
          e.preventDefault();
          createProjectSubmit();
        }}
      />
      <div className="flex">
        <ProjectBar
          Projects={Projects}
          openCreate={() => setShowCreateProject(true)}
        />
        <div className="w-full bg-dark-neutral mx-10 h-60 rounded-2xl"></div>
      </div>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
    </Layout>
  );
};

export default Home;
