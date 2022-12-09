import axios from "axios";

export const getAllUserProjects = (setProjects, setMessage) => {
  axios
    .get("http://127.0.0.1:5000/projects/", {
      headers: { Authorization: localStorage.getItem("token") },
    })
    .then((res) => {
      setProjects(res.data);
    })
    .catch((err) => {
      setMessage(err.response.data.message);
    });
};
