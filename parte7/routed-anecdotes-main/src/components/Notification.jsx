
const Notification = ({ message}) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'lightgrey',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification