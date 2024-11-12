// src/components/DataDisplayComponent.js

import React from "react";

function DataDisplayComponent({ data }) {
  return (
    <div>
      <h3>Real-Time Data Review</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default DataDisplayComponent;
