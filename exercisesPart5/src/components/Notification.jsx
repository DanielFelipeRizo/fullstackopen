const Notification = ({ msj, type }) => {
    if (msj === null && type === null) {
        return null
    }
    else if (type == 'success') {
        console.log('entro a success');
        
        return (
            <div className="success">
                {msj}
            </div>
        )
    }
    else if (type == 'error') {
        console.log('entro a error');
        return (
            <div className="error">
                {msj}
            </div>
        )
    }
}

export default Notification

