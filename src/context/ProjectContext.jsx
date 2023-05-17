import React, { createContext, useState, useContext, useEffect } from "react";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState({});

  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};

export { ProjectProvider, useProject };
