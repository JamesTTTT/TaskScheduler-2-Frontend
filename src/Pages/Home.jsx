import React, { useEffect, useState } from "react";
import {
  Layout,
  CreateProject,
  ProjectBar,
  TaskView,
  CreateTask,
} from "../components";
import { createProject, getAllProjects } from "../api/projectApi";
import { createTask } from "../api/taskApi";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { token, logout } = useAuth();

  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [projects, setProjects] = useState([]);
  const [projectValue, setProjectValue] = useState({
    title: "",
    description: "",
  });

  const [tasksValue, setTasksValue] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    estimatedTime: 0,
    status: "Not Started",
    recurrence: "None",
    tags: [],
    subtasks: [],
    sharedWith: [],
    projectId: "",
  });

  const resetAddTask = () => {
    setTasksValue({
      title: "",
      description: "",
      dueDate: new Date(),
      estimatedTime: 0,
      status: "Not Started",
      recurrence: "None",
      tags: [],
      subtasks: [],
      sharedWith: [],
      projectId: selectedProject._id,
    });
  };

  const resetAddProject = () => {
    setProjectValue({
      title: "",
      description: "",
    });
  };

  const fetchProjects = async () => {
    const res = await getAllProjects(token);
    console.log("Projects:", res);
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
      resetAddProject();
      setShowCreateProject(false);
      fetchProjects();
    }
    console.log(res);
  };

  const createTaskSubmit = async () => {
    const res = await createTask(tasksValue, token);
    if (res.success) {
      resetAddTask();
      setShowCreateTask(false);
      fetchProjects();
    }
    console.log(res);
  };

  const onSelectProject = (project) => {
    console.log("Selected Project:", project);
    setSelectedProject(project);
    setTasksValue((prevTasksValue) => ({
      ...prevTasksValue,
      projectId: project._id,
    }));
  };

  useEffect(() => {
    console.log("tasksValue", tasksValue);
  }, [tasksValue]);

  return (
    <Layout>
      <main className="pr-12">
        <CreateProject
          showModal={showCreateProject}
          closeModal={() => {
            setShowCreateProject(false);
            resetAddProject();
          }}
          projectValues={projectValue}
          onChange={(e) => {
            setProjectValue({
              ...projectValue,
              [e.target.name]: e.target.value,
            });
          }}
          onSubmit={(e) => {
            e.preventDefault();
            createProjectSubmit();
          }}
        />
        <CreateTask
          showModal={showCreateTask}
          taskValues={tasksValue}
          closeModal={() => {
            setShowCreateTask(false);
            resetAddTask();
          }}
          onSubmit={(e) => {
            e.preventDefault();
            createTaskSubmit();
          }}
          onChange={(e) => {
            setTasksValue({
              ...tasksValue,
              [e.target.name]: e.target.value,
            });
          }}
        />

        <div className="w-full flex justify-end">
          {selectedProject._id == null ? (
            <h1 className="py-3 px-4  rounded-2xl m-3">
              selected project first
            </h1>
          ) : (
            <button
              onClick={() => {
                setShowCreateTask(true);
              }}
              className="py-3 px-4 bg-slate-800 rounded-2xl m-3"
            >
              Add New Task
            </button>
          )}
        </div>

        <div className="flex">
          <div className="pr-3">
            <ProjectBar
              projects={projects}
              onSelectProject={onSelectProject}
              selectedProject={selectedProject}
              openCreate={() => setShowCreateProject(true)}
            />
          </div>

          <div className="flex w-full justify-center">
            <TaskView tasks={selectedProject.tasks} />
          </div>
        </div>

        <button onClick={logout}>Logout</button>
      </main>
    </Layout>
  );
};

export default Home;
