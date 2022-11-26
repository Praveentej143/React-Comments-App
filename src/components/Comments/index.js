import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
  }

  toggleIsLiked = Id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === Id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  renderCommentList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        deleteComment={this.deleteComment}
        toggleIsLiked={this.toggleIsLiked}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLike: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeUsernameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentsInput = event => {
    this.setState({commentInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state

    return (
      <div>
        <div className="app-container">
          <div className="container">
            <h1 className="heading">Comments</h1>
            <div className="user-comment-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                className="img"
                alt=" comments"
              />
              <div className="user-comment-section">
                <p className="sub-head">
                  Say something about 4.0 Technologies{' '}
                </p>
                <form className="form" onSubmit={this.onAddComment}>
                  <input
                    type="text"
                    className="usr-input"
                    value={nameInput}
                    placeholder="Your Name"
                    onChange={this.onChangeUsernameInput}
                  />
                  <br />
                  <textarea
                    rows="8"
                    cols="40"
                    value={commentInput}
                    className="text-area"
                    placeholder="Your Comment"
                    onChange={this.onChangeCommentsInput}
                  />
                  <br />
                  <button type="submit" className="cmnt-btn">
                    Add Comment
                  </button>
                </form>
              </div>
            </div>
            <hr className="hr-line" />
          </div>
        </div>

        <div className="comments-container">
          <div className="comment-sec">
            <p className="count">{commentsList.length}</p>
            <p className="cmnts">Comments</p>
          </div>
          <ul className="list-container">{this.renderCommentList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
