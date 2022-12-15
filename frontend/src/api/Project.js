import axios from "axios";

export const getAllUserProjects = (page, setProjects, setMessage) => {
  axios
    .get("http://127.0.0.1:5000/projects/", {
      params: { page },
      headers: { Authorization: localStorage.getItem("token") },
    })
    .then((res) => {
      setProjects(res.data);
    })
    .catch((err) => {
      setMessage(err.response.data.message);
    });
};

export const addProject = (project, setMessage, callback) => {
  axios
    .post(
      `http://127.0.0.1:5000/projects/`,
      { ...project },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    )
    .then(() => {
      callback();
    })
    .catch((err) => {
      setMessage(err.response.data.message);
    });
};

export const updateProject = (project, setMessage, callback) => {
  axios
    .put(
      `http://127.0.0.1:5000/projects/${project.id}`,
      { ...project },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    )
    .then((res) => {
      callback();
    })
    .catch((err) => {
      setMessage(err.response.data.message);
    });
};

export const deleteProject = (projectId, setMessage, callback) => {
  axios
    .delete(`http://127.0.0.1:5000/projects/${projectId}`, {
      headers: { Authorization: localStorage.getItem("token") },
    })
    .then((res) => {
      callback();
    })
    .catch((err) => {
      setMessage(err.response.data.message);
    });
};

export const checkProject = (project, setMessage, callback) => {
  axios
    .patch(
      `http://127.0.0.1:5000/projects/${project.id}/check`,
      { ...project },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    )
    .then((res) => {
      callback();
    })
    .catch((err) => {
      setMessage(err.response.data.message);
    });
};
