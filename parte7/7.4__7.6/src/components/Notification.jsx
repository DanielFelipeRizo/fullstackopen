
const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'lightgrey',
    fontSize: 20,
    fontWeight: 'bold',
    width: '50%'
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification