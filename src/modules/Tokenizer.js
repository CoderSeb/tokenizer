class Tokenizer {
  #input
  #grammar
  #matchedTokens

  constructor(grammarObject, input) {
    this.#grammar = grammarObject
    this.#input = input
    this.#matchedTokens = this.#matchTokens()
  }

  getTokens() {
    return this.#matchedTokens
  }

  #matchTokens() {
    let result = []
    const regexObject = this.#grammar.getRegexTypes()
    const splitInput = this.#input.match(this.#grammar.getGeneralRegex())
    splitInput.map((element) => {
      for (const [tokenType, regex] of Object.entries(regexObject)) {
        if (element.match(regex)) {
          for (let i = 0; i < element.match(regex).length; i++) {
            const newTokenObject = {}
            newTokenObject.Token = tokenType
            newTokenObject.Regex = regex
            newTokenObject.Value = element.match(regex)[i]
            result.push(newTokenObject)
          }
        }
    }})
    return result
  }
}

export default Tokenizer
