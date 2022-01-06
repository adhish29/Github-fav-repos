import React from "react";

function ReposGrid({ repos }) {
  return (
    <div>
      <pre>{JSON.stringify(repos, null, 2)}</pre>
    </div>
  );
}

export default ReposGrid;
