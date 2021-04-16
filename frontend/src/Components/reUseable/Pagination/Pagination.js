import React, { useState } from "react";
import "./Pagination.style.css";

const renderData = (dataValue) => {
  return (
    <ul>
      {dataValue.map((data, index) => {
        return <li key={index}>{data._id}</li>;
      })}
    </ul>
  );
};

const Pagination = ({ dataItem, itemsPerPage = 1 }) => {
  //   console.log(dataItem);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState([1]);
  const [dataPerPage, setDataPerPage] = useState([itemsPerPage]);

  //   const handleClick = (e) => {
  //     setCurrentPage(e.target.value);
  //   };
  const pages = [];
  for (let i = 1; i <= Math.ceil(dataItem.length / dataPerPage); i++) {
    pages.push(i);
  }
  const renderPageNumber = pages.map((number) => {
    return (
      <li
        key={number}
        id={number}
        onClick={(e) => setCurrentPage(Number(e.target.value))}
      >
        {number}
      </li>
    );
  });
  console.log(currentPage);

  const indexOfLastItem = currentPage * dataPerPage;
  const indexOfFirstItem = indexOfLastItem - dataPerPage;
  const currentItems = dataItem.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="pagination">
      <ul className="pagination__pageNumbers">{renderPageNumber}</ul>
      {renderData(currentItems)}
      {/* <ul>
        {dataItem.map((data, index) => (
          <li key={index}>{data._id}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Pagination;
