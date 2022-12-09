import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ProjectFormDialog(props) {
  const {handleClose, open, project} = props

  const handleFormSubmit = (event) => {
    event.preventDefault()
    // ...
    handleClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Projeto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Informações do Projeto:
          </DialogContentText>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
