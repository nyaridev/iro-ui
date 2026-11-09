// Lab page: Pagination over many pages with a rows-per-page choice, and over a few pages without one.

import { useState } from "react";
import { Pagination } from "./Pagination";

export default function PaginationLab() {
  const [page, setPage] = useState(12);
  const [pageSize, setPageSize] = useState(10);
  const [short, setShort] = useState(1);

  return (
    <div className="lab-stack">
      <h3>Many pages</h3>
      <Pagination
        page={page}
        pageSize={pageSize}
        total={248}
        onPageChange={setPage}
        pageSizes={[10, 25, 50]}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
      <h3>A few pages</h3>
      <Pagination page={short} pageSize={5} total={13} onPageChange={setShort} />
    </div>
  );
}
