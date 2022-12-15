import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Table } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableContainer } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import MenuAppBar from "../components/MenuAppBar";
import ProjectFormDialog from "../components/ProjectFormDialog";
import Pagination from "../components/Pagination";
import { isoToLocaleDate, formatNumberAsCurrency } from "../utils";
import { getAllUserProjects, deleteProject, checkProject } from "../api/Project";

export default function Projects(props) {
  const { user } = props;
  const [projects, setProjects] = useState({});
  const [currentProject, setCurrentProject] = useState();
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    updateProjects();
  }, [page]);

  const updateProjects = () => {
    getAllUserProjects(page, setProjects, setMessage);
  };

  const handleEditButtonClick = (currentProject) => {
    setCurrentProject(currentProject);
    setFormDialogOpen(true);
  };

  const handleCreateButtonClick = () => {
    setCurrentProject({});
    setFormDialogOpen(true);
  };

  const handleDeleteButtonClick = (project) => {
    setCurrentProject(project);
    setDeleteDialogOpen(true);
  };

  const handleDoneButtonClick = (project) => {
    checkProject(project, setMessage, reset)
  };

  const handleConfirmDeleteButtonClick = () => {
    deleteProject(currentProject.id, setMessage, handleDeleteDialogClose);
  };

  const handleFormDialogClose = () => {
    setFormDialogOpen(false);
    reset();
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    reset();
  };

  const reset = () => {
    setCurrentProject(null);
    setProjects(null);
    getAllUserProjects(page, setProjects, setMessage);
  };

  return (
    <MenuAppBar title="Projects" user={user}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateButtonClick}
      >
        Novo Projeto
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="projects">
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Custo</TableCell>
              <TableCell>Data de criação</TableCell>
              <TableCell>Data da última atualização</TableCell>
              <TableCell>Concluído?</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects &&
              projects.results &&
              projects.results.map((project) => (
                <TableRow
                  key={project.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{formatNumberAsCurrency(project.cost)}</TableCell>
                  <TableCell>{isoToLocaleDate(project.created_at)}</TableCell>
                  <TableCell>{isoToLocaleDate(project.updated_at)}</TableCell>
                  <TableCell>{project.done ? "Sim" : "Não"}</TableCell>
                  <TableCell>{project.author.name}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditButtonClick(project)}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteButtonClick(project)}
                    >
                      <DeleteRoundedIcon />
                    </IconButton>

                    {!project.done ? (
                      <IconButton
                        style={{ color: "#0a0" }}
                        onClick={() => handleDoneButtonClick(project)}
                      >
                        <DoneRoundedIcon />
                      </IconButton>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {projects && projects.length && (
        <Pagination page={page} pageCount={projects.length} setPage={setPage} />
      )}

      {currentProject ? (
        <ProjectFormDialog
          currentProject={currentProject}
          handleClose={handleFormDialogClose}
          open={formDialogOpen}
        />
      ) : null}

      {currentProject ? (
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirmação de exclusão"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {currentProject &&
                `Deseja continuar e excluir o projeto "${currentProject.title}"?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmDeleteButtonClick} color="primary">
              Sim
            </Button>
            <Button onClick={handleDeleteDialogClose} color="primary">
              Não
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </MenuAppBar>
  );
}
