import "./Modal.css";

export default function DetailModal({ list, onClose }) {
  return (
    <div className="modalCon">
      <div className="modalBox">
        <button className="closeBtn" onClick={onClose}>
          닫기
        </button>
        <h2>연락처 상세 정보</h2>
        <p>
          <strong>이름:</strong> {list.name}
        </p>
        <p>
          <strong>전화번호:</strong> {list.phone}
        </p>
        <p>
          <strong>그룹:</strong> {list.group}
        </p>
        <p>
          <strong>메모:</strong> {list.memo}
        </p>
      </div>
    </div>
  );
}
