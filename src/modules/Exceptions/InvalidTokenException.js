class InvalidTokenException extends Error {
  constructor(message) {
    super()
    this.message = message
    this.code = 'InvalidTokenException'
  }
}

export default InvalidTokenException