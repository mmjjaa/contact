import List from "./List";

export default function PostList({ lists, setList }) {
  return (
    <ul className="postList">
      {lists.map((list, i) => (
        <List key={i} index={i} list={list} setList={setList} />
      ))}
    </ul>
  );
}
