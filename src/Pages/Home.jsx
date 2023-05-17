import React, { useEffect, useState } from "react";
import {
  Layout,
  CreateProject,
  ProjectBar,
  TaskView,
  CreateTask,
  ProjSidebar,
} from "../components";
import { createProject, getAllProjects } from "../api/projectApi";
import { getTaskRecommendation } from "../api/openAi";
import { createTask } from "../api/taskApi";
import { useAuth } from "../context/AuthContext";
import { useProject } from "../context/ProjectContext";

const Home = () => {
  const { token } = useAuth();
  const { selectedProject, setSelectedProject } = useProject();
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [projectValue, setProjectValue] = useState({
    title: "",
    description: "",
  });
  const [recommendedTasks, setRecommendedTasks] = useState([]);

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

  const fetchTaskRecommendations = async () => {
    const tasks = selectedProject.tasks.map((task) => task.title);
    const response = await getTaskRecommendation(
      {
        title: selectedProject.title,
        description: selectedProject.description,
      },
      tasks,
      token
    );
    if (response.success) {
      const tasks = response.data.data.tasks;
      console.log(tasks);
      setRecommendedTasks(tasks);
    } else {
      console.error(response.error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    setRecommendedTasks([]);
    if (selectedProject.title && selectedProject.tasks.length > 0) {
      fetchTaskRecommendations();
    }
  }, [selectedProject]);

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

  const updateTaskStatus = (updatedTasks) => {
    console.log("Updated Tasks:", updatedTasks);
    setSelectedProject((prevSelectedProject) => ({
      ...prevSelectedProject,
      tasks: updatedTasks,
    }));
  };

  return (
    <Layout>
      <main className="pr-12">
        <ProjSidebar
          isOpen={showSidebar}
          projects={projects}
          onClose={() => {
            setShowSidebar(false);
          }}
        />

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

        <div className="flex">
          <div className="pr-3">
            <ProjectBar
              projects={projects}
              setSidebarShow={() => {
                setShowSidebar(true);
              }}
              onSelectProject={onSelectProject}
              selectedProject={selectedProject}
              openCreate={() => setShowCreateProject(true)}
            />
          </div>

          <div className="flex w-full justify-center">
            <TaskView
              tasks={selectedProject.tasks}
              updateTaskStatus={updateTaskStatus}
              recommendedTasks={recommendedTasks}
              setShowCreateTask={setShowCreateTask}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
