import { useState } from "react";
import "./App.css";
import Input from "./components/Input/Input";
import Search from "./components/ListArea/Search";
import PostList from "./components/ListArea/PostList.";
import Nolist from "./components/ListArea/Nolist";

function App() {
  const data = JSON.parse(localStorage.getItem("contactList")) || [];
  const [lists, setList] = useState(data);

  return (
    <main>
      <h1 className="header">연락처 리스트</h1>
      <div className="Con">
        <section className="inputArea">
          <Input lists={lists} setList={setList} />
        </section>
        <section className="listArea">
          <Search lists={lists} setList={setList} />
          {lists.length === 0 ? (
            <Nolist />
          ) : (
            <PostList lists={lists} setList={setList} />
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
