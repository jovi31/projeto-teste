import React from "react";
import { Button } from "@material-ui/core";
import { ButtonGroup } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";

function listPages(page, pageCount, siblingCount = 2)  {
  const pages = [];
  let startPage = page - siblingCount;
  let endPage = page + siblingCount;
  
  if(startPage < 1) {
    startPage = 1;
    endPage = Math.min(pageCount, 1 + 2 * siblingCount);
  } else if(endPage > pageCount) {
    endPage = pageCount;
    startPage = Math.max(1, endPage - 2 * siblingCount);
  }

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