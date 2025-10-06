const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

import PropTypes from 'prop-types'
Notify.propTypes = {
  errorMessage: PropTypes.string
}

export default Notify
