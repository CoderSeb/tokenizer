class Tokenizer {
  #input
  #grammar
  #matchedTokens
  #tokens

  constructor(grammarObject, input) {
    this.#grammar = grammarObject
    this.#input = input
    this.#matchedTokens = this.#matchTokens()
    this.#tokens = this.#refineTokens()
  }

  getTokens() {
    return this.#tokens
  }

  #matchTokens() {
    let result = []
    const regexObject = this.#grammar.getRegexTypes()
    const splitInput = this.#input.split(' ')
    splitInput.map((element) => {
      for (const [tokenType, regex] of Object.entries(regexObject)) {
        if (element.match(regex)) {
          result.push(tokenType, element.match(regex))
        }
      }
    })
    return result
  }

  #refineTokens() {
    let matchedTokens = this.#matchedTokens
    let result = []
    for (let i = 0; i < matchedTokens.length; i++) {
      if (i % 2 === 0) {
        const newTokenObject = {}
        newTokenObject.Token = matchedTokens[i]
        newTokenObject.Value = matchedTokens[i + 1][0]
        result.push(newTokenObject)
      }
    }
    console.log(result)
  }
}

export default Tokenizer
