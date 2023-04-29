import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import { createProject, getAllProjects } from "../api/projectApi";
import { useAuth } from "../context/AuthContext";
import { ProjectBar } from "../components";

const Home = () => {
  const { token } = useAuth();

  const [Projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getAllProjects(token);
      console.log(res);
      setProjects(res);
    };
    fetchProjects();
  }, []);

  return (
    <Layout>
      <div className="flex">
        <ProjectBar Projects={Projects} />
        <div className="w-full bg-dark-neutral mx-10 h-60 rounded-2xl"></div>
      </div>
    </Layout>
  );
};

export default Home;
