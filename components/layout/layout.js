import { useContext } from "react";
import NotficationContext from "../../store/notification-context";
import Notification from "../notification/notification";
import { MainHeader } from "./main-header";

const Layout = ({ children }) => {

    const notificationContext = useContext(NotficationContext);
    const activeNotfication = notificationContext.notification;

    return (
        <>
            <MainHeader />
            <main>
                {children}
            </main>
            {
                activeNotfication &&
                <Notification
                    title={activeNotfication.title}
                    message={activeNotfication.message}
                    status={activeNotfication.status}
                />
            }
        </>
    );
};

export { Layout };
