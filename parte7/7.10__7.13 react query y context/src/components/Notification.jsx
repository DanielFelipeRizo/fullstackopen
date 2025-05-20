import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  // const notification = useSelector((state) => state.notification);
  console.log('notificationvalue', useNotificationValue());

  const notification = useNotificationValue();

  if (notification.msj === null && notification.type === null) return null;
  else if (notification.type === "success")
    return <div className="success">{notification.msj}</div>;
  else if (notification.type === "error")
    return <div className="error">{notification.msj}</div>;
};

export default Notification;
