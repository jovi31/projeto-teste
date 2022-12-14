import React from "react";
import { Button } from "@material-ui/core";
import { ButtonGroup } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";

function listPages(page, pageCount, siblingCount = 2)  {
  const pages = [];
  let startPage = Math.max(1, page - siblingCount);
  let endPage = Math.min(pageCount, page + siblingCount);

  if(startPage == endPage)
    return [1];

  if(startPage > 1)
    pages.push(1);
  
  for(let i = startPage; i <= endPage; i++)
    pages.push(i);

  if(endPage < pageCount)
    pages.push(pageCount);
  
  return pages;
}

export default function Pagination(props) {
  const {page, pageCount, setPage} = props;
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setPages(listPages(page, pageCount));
  }, [page]);

  return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      {pages.map(pageNumber => {
        return (
          <Button
            variant={pageNumber === page ? "contained" : ""}
            onClick={() => setPage(pageNumber)}
          >
              {pageNumber}
          </Button>
        )
      })}
    </ButtonGroup>
  )
}