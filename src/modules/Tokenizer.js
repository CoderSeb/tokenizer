class Tokenizer {
  #input
  #grammar
  #matchedTokens
  #tokenLength

  constructor(grammarObject, input) {
    this.#grammar = grammarObject
    this.#input = input
    this.#matchedTokens = this.#matchTokens()
    this.#tokenLength = this.#matchedTokens.length
  }

  getTokens() {
    return this.#matchedTokens
  }

  getTokenLength() {
    return this.#tokenLength
  }

  toString() {
    let output = []
      this.#matchedTokens.map(obj => {
        output.push(`\nToken: ${obj.Token} - Regex: ${obj.Regex} - Value: ${obj.Value}`)
      })
    return `Found ${this.#tokenLength} valid tokens.${output}`
  }

  #matchTokens() {
    let result = []
    const regexObject = this.#grammar.getRegexTypes()
    let inputCopy = this.#input
    let tokenMatches = []
    while (inputCopy.length > 0) {
      for (const [tokenType, regex] of Object.entries(regexObject)) {
        if (inputCopy.match(regex)) {
          for (let i = 0; i < inputCopy.match(regex).length; i++) {
            const newMatch = {}
            newMatch.Token = tokenType
            newMatch.Regex = regex
            newMatch.Value = inputCopy.match(regex)[i]
            tokenMatches.push(newMatch)
          }
          inputCopy = inputCopy.replace(inputCopy.match(regex)[0], '').trim()
          console.log(inputCopy)
        }
      }
      if (tokenMatches.length > 0) {
        console.log(tokenMatches)
      }
      console.log(inputCopy)
      inputCopy = ''
    }
    console.log(inputCopy)
    return result
  }

  #iterateTokens() {
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
