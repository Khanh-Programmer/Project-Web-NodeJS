// Pagination 
module.exports = (objectPagination, query, countProducts) => {
     if (query.page) {
          objectPagination.currentPage = parseInt(query.page);
     } 

     objectPagination.skipItem = (objectPagination.currentPage - 1) * objectPagination.limitItem;
     const totalPage = Math.ceil(countProducts / objectPagination.limitItem);
     // console.log(totalPage); 
     objectPagination.totalPage = totalPage;
     // console.log(objectPagination.currentPage); // Check xem có lấy được page hay không ???
     return objectPagination;
};
// End-Pagination