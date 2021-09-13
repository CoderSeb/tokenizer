class IndexException extends Error {
  constructor(message) {
    super()
    this.message = message
    this.code = 'IndexException'
  }
}

export default IndexException