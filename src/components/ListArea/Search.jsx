import "./search.css";
import { useState } from "react";

export default function Search({ lists, setList }) {
  const [inputText, setInputText] = useState("");

  const inputItem = (e) => {
    setInputText(e.target.value);
  };
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      const filteredLists = lists.filter(
        (item) =>
          item.name.toLowerCase().includes(inputText.toLowerCase()) ||
          item.phone.toLowerCase().includes(inputText.toLowerCase()) ||
          item.group.toLowerCase().includes(inputText.toLowerCase())
      );
      setList(filteredLists);
    }
  };

  const showAllLists = () => {
    const data = JSON.parse(localStorage.getItem("contactList")) || [];
    setList(data);
    setInputText("");
    document.querySelector(".searchBar").focus();
  };

  return (
    <div className="input">
      <input
        className="searchBar"
        type="text"
        value={inputText}
        placeholder="검색어를 입력 후 엔터를 누르세요."
        onChange={inputItem}
        onKeyUp={handleKeyUp}
      />
      <button onClick={showAllLists}>전체리스트 보기</button>
    </div>
  );
}
