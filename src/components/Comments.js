import React, { useCallback } from 'react';
import './Comments.css';
import CommentItem from './CommentItem';
import { useComments } from '../hooks';
import { COMMENT_MESSAGES } from '../constants';

function Comments({ postId }) {
  const {
    comments,
    loading,
    formData,
    deletePassword,
    showDeleteInput,
    handleChange,
    handleSubmit,
    handleDelete,
    toggleDeleteInput,
    setDeletePassword,
  } = useComments(postId);

  // 삭제 비밀번호 변경 핸들러 (useCallback으로 최적화)
  const handleDeletePasswordChange = useCallback(
    (commentId, value) => {
      setDeletePassword((prev) => ({
        ...prev,
        [commentId]: value,
      }));
    },
    [setDeletePassword]
  );

  return (
    <div className="comments-section">
      <h2 className="comments-title">💬 댓글 ({comments.length})</h2>

      {/* 댓글 작성 폼 */}
      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="author_name"
            value={formData.author_name}
            onChange={handleChange}
            placeholder="이름"
            maxLength="20"
          />
          <input
            type="password"
            name="author_password"
            value={formData.author_password}
            onChange={handleChange}
            placeholder="비밀번호 (삭제 시 필요)"
            maxLength="20"
          />
        </div>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="댓글을 입력하세요..."
          rows="4"
          maxLength="500"
        />
        <button type="submit" className="btn-submit-comment">
          댓글 등록
        </button>
      </form>

      {/* 댓글 목록 */}
      <div className="comments-list">
        {loading ? (
          <div className="comment-loading">{COMMENT_MESSAGES.LOADING}</div>
        ) : comments.length === 0 ? (
          <div className="no-comments">{COMMENT_MESSAGES.NO_COMMENTS}</div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              showDeleteInput={showDeleteInput[comment.id]}
              deletePassword={deletePassword[comment.id]}
              onToggleDeleteInput={toggleDeleteInput}
              onDeletePasswordChange={handleDeletePasswordChange}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Comments;
