import { useState } from "react";
import DetailModal from "./DetailModal";
import "./list.css";

export default function List({ list, setList, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeItem = () => {
    setList((prev) => {
      const newList = prev.filter((_, i) => i !== index);
      localStorage.setItem("contactList", JSON.stringify(newList));
      return newList;
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <li className="list">
      <p> {list.name}</p>
      <p> {list.phone}</p>
      <p> {list.group}</p>
      <button className="detailBtn" onClick={handleOpenModal}>
        세부사항
      </button>
      <button className="deleteBtn" onClick={removeItem}>
        삭제
      </button>

      {isModalOpen && <DetailModal list={list} onClose={handleCloseModal} />}
    </li>
  );
}
