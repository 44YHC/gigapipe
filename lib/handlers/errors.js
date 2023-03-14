const { asyncLogError } = require('../../common')

class QrynError extends Error {
  constructor (code, name, message) {
    super(message)
    this.code = code
    this.name = name
  }
}

class QrynBadRequest extends QrynError {
  constructor (message) {
    super(400, 'Bad Request', message)
  }
}

class QrynNotFound extends QrynError {
  constructor (message) {
    super(404, 'Not Found', message)
  }
}

const handler = (err, req, res) => {
  if (err instanceof QrynError) {
    return res.status(err.code).send({
      statusCode: err.code,
      error: err.name,
      message: err.message
    })
  }
  asyncLogError(err, req.log)
  return res.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'Internal Server Error'
  })
}

module.exports = {
  QrynError: QrynError,
  QrynBadRequest: QrynBadRequest,
  QrynNotFound: QrynNotFound,
  handler
}
