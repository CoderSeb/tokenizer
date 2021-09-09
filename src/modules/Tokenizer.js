class Tokenizer {
  #input
  #tokenType
  #tokens

  constructor(tokenType, input) {
    this.#input = input
    this.#tokenType = tokenType
  }

  getTokens() {
    return this.#tokens
  }
}

export default Tokenizer
