import React, { useState } from "react";
import { textTruncate } from "../../../helpers/useFullFunctions";
import "./PaginationComponent.style.css";

const PaginationComponent = ({
  tableData,
  itemsPerPage = 10,
  numOfPages = 10,
}) => {
  const [data, setData] = useState([]);
  const [pageNumberLimit, setPageNumberLimit] = useState(1);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(numOfPages);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(itemsPerPage);

  const handleClick = (pageNum) => {
    setCurrentPage(Number(pageNum));
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(tableData?.rows?.length / dataPerPage); i++) {
    pages.push(i);
  }
  const renderPageNumber = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={() => handleClick(number)}
          className={
            currentPage == number
              ? "paginationComponent__container__paging__pageNumbers__list__active"
              : "paginationComponent__container__paging__pageNumbers__list__inactive"
          }
        >
          {number}
        </li>
      );
    } else return null;
  });

  const indexOfLastItem = currentPage * dataPerPage;
  const indexOfFirstItem = indexOfLastItem - dataPerPage;
  const currentItems = tableData.rows.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      // setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handleFirst = () => {
    if (currentPage === 1) return;
    setCurrentPage(pages[0]);
  };

  const handleLast = () => {
    if (currentPage === pages.length) return;
    setCurrentPage(pages.length);
  };

  const handleLoadMOre = () => {
    setDataPerPage(itemsPerPage + 1);
  };

  return (
    <div className="paginationComponent">
      <div className="paginationComponent__container">
        <div className="paginationComponent__container__tableArea">
          <table className="paginationComponent__container__tableArea__table">
            <tr className="paginationComponent__container__tableArea__table__heading">
              {tableData?.columns?.map((col) => (
                <th
                  className="paginationComponent__container__tableArea__table__heading__items"
                  id={col.id}
                >
                  {col.title}
                </th>
              ))}
            </tr>

            {currentItems.map((rows) => (
              <tr
                id={rows.id}
                className="paginationComponent__container__tableArea__table__rows"
              >
                {tableData.columns.map((cols) =>
                  Object.entries(rows).map(([key, value]) =>
                    key === cols.id && cols.id === "photo" ? (
                      <td className="paginationComponent__container__tableArea__table__rows__data paginationComponent__container__tableArea__table__rows__data__profilePhoto">
                        <img
                          className="paginationComponent__container__tableArea__table__rows__data__photo"
                          src={value}
                          alt={textTruncate(value, 10)}
                        />
                      </td>
                    ) : (
                      key === cols.id && (
                        <td
                          className={
                            cols.id === "actions"
                              ? "paginationComponent__container__tableArea__table__rows__data paginationComponent__container__tableArea__table__rows__data--actions"
                              : "paginationComponent__container__tableArea__table__rows__data"
                          }
                        >
                          {value}
                        </td>
                      )
                    )
                  )
                )}
              </tr>
            ))}
          </table>
        </div>

        <div className="paginationComponent__container__paging">
          <ul className="paginationComponent__container__paging__pageNumbers">
            <li
              className="paginationComponent__container__paging__pageNumbers__first paginationComponent__container__paging__pageNumbers__list"
              style={{ visibility: "hidden" }}
            >
              <button
                className="paginationComponent__container__paging__pageNumbers__first__btn paginationComponent__container__paging__pageNumbers__list__btn"
                onClick={handleFirst}
              >
                First
              </button>
            </li>
            <li className="paginationComponent__container__paging__pageNumbers__previous paginationComponent__container__paging__pageNumbers__list">
              <button
                className="paginationComponent__container__paging__pageNumbers__previous__btn paginationComponent__container__paging__pageNumbers__list__btn"
                onClick={handlePrevious}
                disabled={currentPage == pages[0] ? true : false}
              >
                Previous
              </button>
            </li>

            {renderPageNumber}

            <li className="paginationComponent__container__paging__pageNumbers__next paginationComponent__container__paging__pageNumbers__list">
              <button
                className="paginationComponent__container__paging__pageNumbers__next__btn paginationComponent__container__paging__pageNumbers__list__btn"
                onClick={handleNext}
                disabled={currentPage == pages[pages.length - 1] ? true : false}
              >
                Next
              </button>
            </li>
            <li
              className="paginationComponent__container__paging__pageNumbers__last paginationComponent__container__paging__pageNumbers__list"
              style={{ visibility: "hidden" }}
            >
              <button
                className="paginationComponent__container__paging__pageNumbers__last__btn paginationComponent__container__paging__pageNumbers__list__btn"
                onClick={handleLast}
              >
                Last
              </button>
            </li>
          </ul>
          <button style={{ visibility: "hidden" }} onClick={handleLoadMOre}>
            LoadMore
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
