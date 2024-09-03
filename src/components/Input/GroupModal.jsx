import { useState } from "react";
import "./GroupModal.css";

export default function GroupModal({ groups, setGroups, onClose }) {
  const [newGroup, setNewGroup] = useState("");

  const handleAddGroup = () => {
    if (newGroup && !groups.includes(newGroup)) {
      const updatedGroups = [newGroup, ...groups];
      setGroups(updatedGroups);
      setNewGroup("");
      localStorage.setItem("groups", JSON.stringify(updatedGroups));
    }
  };

  const handleRemoveGroup = (group) => {
    const updatedGroups = groups.filter((g) => g !== group);
    setGroups(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };

  return (
    <div className="modalCon">
      <div className="modalBox">
        <button className="closeBtn" onClick={onClose}>
          닫기
        </button>
        <h2>그룹 관리</h2>
        <ul>
          {groups.map((group, index) => (
            <li key={index}>
              {group}{" "}
              <strong
                className="removeBtn"
                onClick={() => handleRemoveGroup(group)}
              >
                x
              </strong>
            </li>
          ))}
        </ul>
        <div className="addGroup">
          <input
            type="text"
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
            placeholder="새 그룹 이름"
          />
          <button onClick={handleAddGroup}>추가</button>
        </div>
      </div>
    </div>
  );
}
