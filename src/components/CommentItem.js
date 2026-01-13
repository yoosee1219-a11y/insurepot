/**
 * 댓글 아이템 컴포넌트 (React.memo 최적화)
 * Comments에서 사용되는 개별 댓글 아이템
 */

import React from 'react';

function CommentItem({
  comment,
  showDeleteInput,
  deletePassword,
  onToggleDeleteInput,
  onDeletePasswordChange,
  onDelete,
}) {
  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className="comment-author">{comment.author_name}</span>
        <span className="comment-date">{new Date(comment.created_at).toLocaleString()}</span>
      </div>
      <div className="comment-content">{comment.content}</div>
      <div className="comment-actions">
        {!showDeleteInput ? (
          <button onClick={() => onToggleDeleteInput(comment.id)} className="btn-delete-toggle">
            삭제
          </button>
        ) : (
          <div className="delete-input-group">
            <input
              type="password"
              placeholder="비밀번호"
              value={deletePassword || ''}
              onChange={(e) => onDeletePasswordChange(comment.id, e.target.value)}
            />
            <button
              onClick={() => onDelete(comment.id, comment.author_password)}
              className="btn-confirm-delete"
            >
              확인
            </button>
            <button onClick={() => onToggleDeleteInput(comment.id)} className="btn-cancel-delete">
              취소
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// React.memo로 감싸서 props가 변경되지 않으면 리렌더링 방지
export default React.memo(CommentItem);
