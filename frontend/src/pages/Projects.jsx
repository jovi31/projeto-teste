import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Table } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableContainer } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";

import MenuAppBar from "../components/MenuAppBar";
import ProjectFormDialog from "../components/ProjectFormDialog";
import { isoToLocaleDate, formatNumberAsCurrency } from "../utils";
import { getAllUserProjects } from "../api/Project";

export default function Projects(props) {
  const { user } = props;
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");
  const [formDialogOpen, setFormDialogOpen] = useState(false);

  useEffect(() => {
    getAllUserProjects(setProjects, setMessage);
  }, [projects]);

  const handleEditButtonClick = () => {
    setFormDialogOpen(true);
  };

  const handleFormDialogClose = () => {
    setFormDialogOpen(false);
  };

  return (
    <MenuAppBar title="Projects" user={user}>
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
            {projects.map((project) => (
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
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleEditButtonClick}
                  >
                    Editar
                  </Button>
                  <ProjectFormDialog
                    project={project}
                    handleClose={handleFormDialogClose}
                    open={formDialogOpen}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MenuAppBar>
  );
}
