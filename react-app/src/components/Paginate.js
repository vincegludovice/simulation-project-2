import React from "react";
import "../semantics.css";
import { Pagination } from "semantic-ui-react";

export default function Paginate(props) {
  const onChanges = (e, pageInfo) => {
    props.setPage(pageInfo.activePage);
  };
  return (
    <div className="semantic">
      <Pagination
        activePage={props.page}
        onPageChange={onChanges}
        totalPages={Math.floor(620 / (props.age / 10))}
        ellipsisItem={null}
      />
    </div>
  );
}
