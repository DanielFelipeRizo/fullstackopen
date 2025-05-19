import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification.msj === null && notification.type === null) return null;
  else if (notification.type === "success")
    return <div className="success">{notification.msj}</div>;
  else if (notification.type === "error")
    return <div className="error">{notification.msj}</div>;
};

export default Notification;

// const Notification = ({ messageAndType }) => {
//   const { msj, type } = messageAndType;

//   if (msj === null && type === null) return null;
//   else if (type === "success") return <div className="success">{msj}</div>;
//   else if (type === "error") return <div className="error">{msj}</div>;
// };

// export default Notification;
