import classes from './comment-list.module.css';

function CommentList({ commentsList }) {
    return commentsList && (
        <ul className={classes.comments}>
            {/* Render list of comments - fetched from API */}
            {
                commentsList.map(({ _id, text, name}) => {
                    return (
                        <li key={_id}>
                            <p>{text}</p>
                            <div>
                                By <address>{name}</address>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    );
}

export default CommentList;
