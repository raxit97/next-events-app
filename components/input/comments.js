import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotficationContext from '../../store/notification-context';

function Comments(props) {
    const { eventId } = props;

    const [showComments, setShowComments] = useState(false);
    const [commentsList, setCommentsList] = useState();
    const [isFetchingComments, setIsFetchingComments] = useState(false);
    const notificationContext = useContext(NotficationContext);

    useEffect(() => {
        const fetchCommentsData = async () => {
            setIsFetchingComments(true);
            const res = await fetch(`/api/comments/${eventId}`);
            const responseData = await res.json();
            setIsFetchingComments(false);
            setCommentsList(responseData.comments);
        }
        if (showComments) {
            fetchCommentsData();
        }
    }, [showComments, eventId]);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    const addCommentHandler = async (commentData) => {
        try {
            notificationContext.showNotification({
                title: "Sending comment...",
                status: "pending",
                message: "Your comment is currently being stored in a database."
            });
            const res = await fetch(`/api/comments/${eventId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(commentData)
            });
            const data = await res.json();
            if (res.ok) {
                notificationContext.showNotification({
                    title: "Yipeee!!",
                    status: "success",
                    message: "Comment added successfully!"
                });
            } else {
                throw new Error(data.message || "Something went wrong!")
            }
        } catch (error) {
            notificationContext.showNotification({
                title: "Yipeee!!",
                status: "success",
                message: error.message || "Something went wrong!"
            });
        }
    };

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {
                showComments && !isFetchingComments &&
                <CommentList commentsList={commentsList} />
            }
            {
                showComments && isFetchingComments &&
                <p>Loading Comments...</p>
            }
        </section>
    );
}

export default Comments;
