class Tokenizer {
  #input
  #grammar
  #matchedTokens
  #tokens

  constructor(grammarObject, input) {
    this.#grammar = grammarObject
    this.#input = input
    this.#matchedTokens = this.#matchTokens()
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
          const newTokenObject = {}
          newTokenObject.Token = tokenType
          newTokenObject.Regex = regex
          newTokenObject.Value = element.match(regex)[0]
          result.push(newTokenObject)
        }
      }
    })
    console.log(result)
    return result
  }
}

export default Tokenizer
