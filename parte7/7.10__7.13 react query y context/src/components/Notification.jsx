import { useNotificationValue } from '../NotificationContext'

const Notification = () => {

  const notification = useNotificationValue();

  if (notification.text === null && notification.style === null) return null;
  else if (notification.style === "success")
    return <div className="success">{notification.text}</div>;
  else if (notification.style === "error")
    return <div className="error">{notification.text}</div>;
};

export default Notification;
