import React, { useState, useContext } from 'react'
import { CommentsContext } from '../../context/CommentsContext';


const Comment = ({ comment}) => {
    const { addComment } = useContext(CommentsContext)
    const { commentText, childCommments, id, author, authorAvatar, createdAt } = comment;
    const [childComment, setChildComment] = useState("");
    const [showAddComponet, setShowAddComponet] = useState(false);

    const onAdd = () => {
      if(childComment) {
        addComment(id, childComment);
        setChildComment("");
        setShowAddComponet(false);
      }
    }
    
    const formatDate = () => {
        const time =  Math.round((Date.now() - createdAt) / 1000)

        if(time > 59) {
            return Math.round(time / 60) + ' minutes ago'
        } else { 
            return 'just now'
        }
    }

    const showReplyComponent = () => {
        setShowAddComponet(true)
    }

    return (
      <div className="comment">
        <a className="avatar">
          <img src={authorAvatar} />
        </a>
        <div className='content'>
          <a className="author">{author}</a>

          <div className="metadata">
            <span className="date">{formatDate()}</span>
          </div>

          <div className='text'>{commentText}</div>

          <div className='actions'>
            {showAddComponet ? (
              <div className="ui reply form">
                <input
                  value={childComment}
                  onChange={(e) => setChildComment(e.target.value)}
                  placeholder={`@${comment.author}`}
                />
                <div className='reply-buttons'>
                  <button className='ui blue button' onClick={onAdd}>Reply</button>
                  <button className='ui blue button' onClick={() => setShowAddComponet(!showAddComponet)}>Cancel</button>
                </div>
              </div>
              ) : (
                <a
                  style={{ cursor: "pointer", fontSize: "0.9rem", color: "gray" }}
                  onClick={showReplyComponent}
                >
                  Reply
                </a>
              )}
          </div>
        </div>
          {childCommments.map((childCommentEl, key) => {
            return (
              <div 
                className='comments'
                key={key}
              >
                <Comment
                  comment={childCommentEl}
                  addComment={addComment}
                />
              </div>
            );
          })}
      </div>
    );
}

export default Comment