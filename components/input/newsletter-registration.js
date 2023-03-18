import { useContext, useState } from 'react';
import NotficationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {

    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const notificationContext = useContext(NotficationContext);

    const registrationHandler = async (event) => {
        event.preventDefault();
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValid = pattern.test(email);
        if (email.trim().length === 0) {
            setErrorMessage("Please Enter email address!");
        } else if (!isValid) {
            setErrorMessage("Invalid email address format!");
        } else {
            setErrorMessage("");
        }
        notificationContext.showNotification({
            title: "Signing Up...",
            message: "Registering for newsletter!",
            status: "pending"
        });
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                notificationContext.showNotification({
                    title: "Success!",
                    message: "Successfully registered for newsletter!",
                    status: "success"
                });
            } else {
                throw new Error("DB connection failed!!")
            }
        } catch (error) {
            notificationContext.showNotification({
                title: "Error!",
                message: error.message || "Something went wrong!!",
                status: "error"
            });
        }
    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type='email'
                        id='email'
                        placeholder='Your email'
                        aria-label='Your email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <button>Register</button>
                </div>
                {
                    errorMessage && <p style={{ color: "red", margin: "0.5rem 0" }}>{errorMessage}</p>
                }
            </form>
        </section>
    );
}

export default NewsletterRegistration;
