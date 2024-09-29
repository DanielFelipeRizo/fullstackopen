const Notification = ({ messageAndType }) => {
  const { msj, type } = messageAndType

  if (msj === null && type === null)
    return null
  else if (type === 'success')
    return (<div className="success">{msj}</div>)
  else if (type === 'error')
    return (<div className="error">{msj}</div>)
}

export default Notification
