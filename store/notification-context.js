import { createContext, useEffect, useState } from "react";

const NotficationContext = createContext({
    notification: null, // { title, message, status }
    showNotification: () => { },
    hideNotification: () => { }
});

export const NotficationContextProvider = (props) => {

    const [activeNotification, setActiveNotification] = useState();

    useEffect(() => {
        if (activeNotification && (activeNotification.status === "success" || activeNotification.status === "error")) {
            const timer = setTimeout(() => {
                setActiveNotification(null);
            }, 3000);
            return () => {
                clearTimeout(timer);
            }
        }
    }, [activeNotification]);

    const showNotificationHandler = (notificationData) => {
        setActiveNotification(notificationData);
    };

    const hideNotificationHandler = () => {
        setActiveNotification(null);
    };

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    };

    return (
        <NotficationContext.Provider value={context}>
            {props.children}
        </NotficationContext.Provider>
    )
}

export default NotficationContext;
