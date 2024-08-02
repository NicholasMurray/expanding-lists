import "./App.css";
import { NestedList } from "./nested-list/NestedList";
import { nestedListData } from "./nested-list/data";

function App() {
  const initialExpandedIds = [2, 5];
  return (
    <>
      <h1>Nested list</h1>
      <NestedList
        data={nestedListData}
        initialExpandedIds={initialExpandedIds}
      />
    </>
  );
}

export default App;
