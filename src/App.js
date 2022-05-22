import { QueryProvider } from "./hooks/query";
import Main from "./containers/main";

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
