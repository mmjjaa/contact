import { useState, useEffect } from "react";
import GroupModal from "./GroupModal";
import "./Input.css";

export default function Input({ lists, setList }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [group, setGroup] = useState("가족");
  const [memo, setMemo] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [groups, setGroups] = useState(["가족", "친구", "직장", "스터디"]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saveGroups = JSON.parse(localStorage.getItem("groups")) || [
      "가족",
      "친구",
      "직장",
      "스터디",
    ];
    setGroups(saveGroups);
  }, []);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.length < 2 || /[^가-힣]/.test(value)) {
      setNameError("이름은 한글로 두 글자 이상 입력해주세요.");
    } else if (lists.some((list) => list.name === value)) {
      setNameError("동일한 이름이 이미 존재합니다.");
    } else {
      setNameError("");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(value)) {
      setPhoneError("전화번호는 010-0000-0000 형식으로 입력해주세요.");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = () => {
    if (nameError || phoneError || name === "" || phone === "") {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    const newContact = { name, phone, group, memo };

    setList((prev) => {
      const newList = [newContact, ...prev];
      localStorage.setItem("contactList", JSON.stringify(newList));
      return newList;
    });

    setName("");
    setPhone("");
    setGroup("가족");
    setMemo("");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="inputCon">
      <div className="inputText">
        <label className="label"> 이름</label>

        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="이름"
        />
      </div>{" "}
      {nameError && <div className="error">{nameError}</div>}
      <div className="inputText">
        <label className="label"> 전화번호 </label>

        <input
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="전화번호"
        />
      </div>
      {phoneError && (
        <div className="error">
          <p>{phoneError}</p>
        </div>
      )}
      <div className="inputText">
        <label className="label"> 그룹</label>

        <select value={group} onChange={(e) => setGroup(e.target.value)}>
          {groups.map((group, index) => (
            <option key={index} value={group}>
              {group}
            </option>
          ))}
        </select>
        <button className="addGroupBtn" onClick={handleOpenModal}>
          조직 추가
        </button>
      </div>
      <div className="inputText">
        <label className="label">간단한 기록 </label>
        <input
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="간단한 기록"
        />
      </div>
      <div>
        <button className="saveBtn" onClick={handleSubmit}>
          저장
        </button>
      </div>
      {isModalOpen && (
        <GroupModal
          groups={groups}
          setGroups={setGroups}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
