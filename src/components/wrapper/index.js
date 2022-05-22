import React from "react";

function Wrapper({ loading, error, data, children }) {
  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Oops! something went wrong</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <p>No data available yet</p>
      </div>
    );
  }

  return <>{children}</>;
}

export default Wrapper;
