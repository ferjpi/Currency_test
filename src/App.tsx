import React from "react";
import { QueryProvider } from "./hooks/query";
import Main from "./containers/main/index";

function App() {
  return (
    <>
      <QueryProvider>
        <Main />
      </QueryProvider>
    </>
  );
}

export default App;
