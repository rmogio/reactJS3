import React, { Children } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

const Toast = ({open, handleClose, children, severity})=>(
  <Snackbar 
    open={open} 
    onClose={handleClose}
    message='' 
    autoHideDuration={2000}
    >
    <Alert
      variant='filled'
      severity={severity}
      onClose={handleClose}
      >{children}
    </Alert>
  </Snackbar>
)

export default Toast
