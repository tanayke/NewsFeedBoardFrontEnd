/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import { Pagination } from "react-bootstrap";

export default function PaginationComponent(props) {
  const [pageArray, setPageArray] = React.useState([]);

  React.useEffect(() => {
    const totPages = parseInt(props.totPages, 10);
    const currentPage = parseInt(props.currentPage, 10);
    let pageArr = [];
    if (totPages > 1) {
      if (totPages <= 9) {
        let i = 1;
        while (i <= totPages) {
          pageArr.push(i);
          i += 1;
        }
      } else if (currentPage <= 5)
        pageArr = [1, 2, 3, 4, 5, 6, 7, 8, "", totPages];
      else if (totPages - currentPage <= 4)
        pageArr = [
          1,
          "",
          totPages - 7,
          totPages - 6,
          totPages - 5,
          totPages - 4,
          totPages - 3,
          totPages - 2,
          totPages - 1,
          totPages,
        ];
      else
        pageArr = [
          1,
          "",
          currentPage - 3,
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
          currentPage + 3,
          "",
          totPages,
        ];
    }
    setPageArray(pageArr);
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.totPages]);

  return (
    <>
      {
        // eslint-disable-next-line react/destructuring-assignment
        props.children
      }
      <div className="d-flex justify-content-center">
        <Pagination style={{ justifyContent: "center" }}>
          {pageArray.map((ele, ind) => {
            const toReturn = [];

            if (ind === 0) {
              toReturn.push(
                <Pagination.First
                  key="firstpage"
                  onClick={
                    props.currentPage === 1
                      ? () => {}
                      : () => {
                          props.pageClicked(1);
                        }
                  }
                />
              );

              toReturn.push(
                <Pagination.Prev
                  key="prevpage"
                  onClick={
                    props.currentPage === 1
                      ? () => {}
                      : () => {
                          props.pageClicked(props.currentPage - 1);
                        }
                  }
                />
              );
            }

            if (ele === "") toReturn.push(<Pagination.Ellipsis key={ind} />);
            else
              toReturn.push(
                <Pagination.Item
                  key={ind}
                  active={props.currentPage === ele}
                  onClick={
                    props.currentPage === ele
                      ? () => {}
                      : () => {
                          props.pageClicked(ele);
                        }
                  }
                >
                  {ele}
                </Pagination.Item>
              );

            if (ind === pageArray.length - 1) {
              toReturn.push(
                <Pagination.Next
                  key="nextpage"
                  onClick={
                    props.currentPage === ele
                      ? () => {}
                      : () => {
                          props.pageClicked(props.currentPage + 1);
                        }
                  }
                />
              );

              toReturn.push(
                <Pagination.Last
                  key="lastpage"
                  onClick={
                    props.currentPage === ele
                      ? () => {}
                      : () => {
                          props.pageClicked(ele);
                        }
                  }
                />
              );
            }

            return toReturn;
          })}
        </Pagination>
      </div>
    </>
  );
}
// import React, { useContext, useEffect, useState } from "react";
// import { PageItem, Pagination } from "react-bootstrap";
// import { getAllArticles } from "../../../services";
// import { ArticleFilterContext } from "../../context/ArticleFilterContext/ArticleFilterContext";

// export const PaginationComponent = ({
//   fetchAndSetDataForPageChange,
//   pageLimit,
// }) => {
//   const [currentPage, setCurrentPage] = useState(0);

//   const goToNextPage = () => {
//     if (currentPage !== pageLimit) setCurrentPage(currentPage + 1);
//   };
//   const goToPreviousPage = () => {
//     if (currentPage !== 0) setCurrentPage(currentPage - 1);
//   };

//   useEffect(() => {
//     fetchAndSetDataForPageChange(currentPage);
//   }, [currentPage]);

//   return (
//     <div className="d-flex justify-content-center">
//       <Pagination>
//         <PageItem onClick={goToPreviousPage}> {`<`} </PageItem>
//         <PageItem onClick={goToNextPage}> {`>`} </PageItem>
//       </Pagination>
//     </div>
//   );
// };

//* ************************************ */
