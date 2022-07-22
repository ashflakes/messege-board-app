import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import Comment from "./Comment/Comment";

import { CommentsContext } from '../context/CommentsContext'
import { UsersContext } from "../context/UsersContext";



const getNewComment = (commentValue, isRootNode = false, parentNodeId, author, authorAvatar, createdAt) => {
  return {
    id: uuidv4(),
    commentText: commentValue,
    childCommments: [],
    isRootNode,
    parentNodeId,
    author,
    authorAvatar,
    createdAt
  };
};

function CommentBoard() {
  const [comments, setComments] = useState({});
  const [rootComment, setRootComment] = useState("");

  const { currentUser } = useContext(UsersContext)

  const addComment = (parentId, newCommentText) => {
    let newComment = null;
  

    if (parentId) {
      newComment = getNewComment(newCommentText, false, parentId, currentUser.name, currentUser.avatar, Date.now());
      setComments((comments) => ({
        ...comments,
        [parentId]: {
          ...comments[parentId],
          childCommments: [...comments[parentId].childCommments, newComment.id],
        },
      }));
    } 
    else {
      newComment = getNewComment(newCommentText, true, null, currentUser.name, currentUser.avatar, Date.now());
    }
    
    setComments((comments) => ({ ...comments, [newComment.id]: newComment }));
  };

  const commentMapper = (comment) => {
    return {
      ...comment,
      childCommments: comment.childCommments
        .map((id) => comments[id])
        .map((comment) => commentMapper(comment)),
    };
  };

  const enhancedComments = Object.values(comments)
    .filter((comment) => !comment.parentNodeId)
    .map(commentMapper);

  const onAdd = () => {
    if (rootComment) {
      addComment(null, rootComment);
      setRootComment("");
    }   
  };

  return (
    <CommentsContext.Provider value={{ addComment }}>
      <div className="App">
        <div
          className='ui comments'
          style={{
            borderBottom: "1px solid gray",
            width: "60%",
            margin: "auto",
            overflowX: "auto",
            padding: "2rem",
          }}
        >
          {enhancedComments.map((comment, key) => {
            return (
              <Comment key={key} comment={comment} />
            );
          })}
        </div>
        {currentUser.name && <div className="ui reply form" style={{marginTop: '20px'}}>
          <textarea
            value={rootComment}
            onChange={(e) => setRootComment(e.target.value)}
            placeholder={`add comment as ${currentUser.name}`}
            rows={3}
            
          />
          <button className='ui blue button' onClick={onAdd}>Submit</button>
          
          
        </div>}
      </div>
    </CommentsContext.Provider>
  );
}

export default CommentBoard;