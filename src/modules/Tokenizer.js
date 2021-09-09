class Tokenizer {
  #theString
  #tokenType
  #tokens

  constructor(tokenType, theString) {
    this.#theString = theString
    this.#tokenType = tokenType
  }

  getTokens() {
    return this.#tokens
  }
}

export default Tokenizer
