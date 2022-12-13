import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import { addProject, updateProject } from "../api/Project";

export default function ProjectFormDialog(props) {
  const { handleClose, open, currentProject={
    id: null,
    title: null,
    description: null,
    cost: null
  } } = props;
  const [project, setProject] = useState(currentProject);
  const [message, setMessage] = useState('');

  const handleFormBtnClick = (event) => {
    if (project.id) {
      updateProject(project, setMessage, handleClose)
    } else {
      addProject(project, setMessage, handleClose)
    }
  };

  const handleChange = (event) => {
    setProject({...project, [event.target.name]: event.target.value})
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Projeto</DialogTitle>
        <DialogContent>
          <DialogContentText>Informações do Projeto:</DialogContentText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="projectTitle"
            label="Título"
            name="title"
            value={project.title}
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="projectDescription"
            label="Descrição"
            name="description"
            value={project.description}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="projectCost"
            label="Custo"
            name="cost"
            type="number"
            value={project.cost}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleFormBtnClick} color="primary">
            {project.id ? "Salvar" : "Criar"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
