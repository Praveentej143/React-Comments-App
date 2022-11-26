// Write your code here
import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails} = props
  const {id, name, comment, date, isLiked, initialClassName} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeTextName = isLiked ? 'liked-btn' : 'like-btn'
  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(date)

  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="list-items">
      <div className="item-container">
        <div className={`${initialClassName} name-logo-container`}>
          <p className="name-logo">{initial}</p>
        </div>
        <div className="user-details-container">
          <p className="user-name">{name}</p>
          <p className="posted-time">{postedTime} ago</p>
        </div>
      </div>
      <p className="comment">{comment}</p>

      <div className="like-delete-container">
        <div className="like-btn-container">
          <img src={likeImageUrl} alt="like" />
          <button className={likeTextName} type="button" onClick={onClickLike}>
            Like
          </button>
        </div>
        <button
          className="delete-btn"
          type="button"
          testid="delete"
          onClick={onDeleteComment}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
