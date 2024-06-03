import React from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {
  const comments = comments || []
  return (
    <div className="container mt-5">
      <h2 className="mb-4">賣家評論</h2>
      <div className="row">
        {comments.map((comment, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">用戶：{comment.custom_account}</h5>
                <h6 className="card-subtitle mb-2 text-muted">評分：{comment.store_rating} 星</h6>
                <p className="card-text">{comment.comment}</p>
                <p className="card-text"><small className="text-muted">評論日期：{new Date(comment.datetime).toLocaleDateString()}</small></p>
                {/* 添加 Link 到評論的詳細頁面 */}
                <Link href={`/comments/${comment.commentId}`} className="btn btn-primary">
                  查看詳情
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
