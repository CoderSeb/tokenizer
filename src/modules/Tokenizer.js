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
    this.#matchedTokens.map((obj) => {
      output.push(
        `\nToken: ${obj.Token} - Regex: ${obj.Regex} - Value: ${obj.Value}`
      )
    })
    return `Found ${this.#tokenLength} valid tokens.${output}`
  }

  #matchTokens() {
    let result = []
    const regexObject = this.#grammar.getRegexTypes()
    let inputCopy = this.#input
    while (inputCopy.length > 0) {
      let tokenMatches = []
      for (const [tokenType, regex] of Object.entries(regexObject)) {
        if (inputCopy.match(regex)) {
            const newMatch = {}
            newMatch.Token = tokenType
            newMatch.Regex = regex
            newMatch.Value = inputCopy.match(regex)[0]
            tokenMatches.push(newMatch)
        }

      }
      if (tokenMatches.length > 0) {
        result.push(tokenMatches[0])
        inputCopy = inputCopy.replace(tokenMatches[0].Value, '').trim()
        if (inputCopy === '') {
          const endObj = {}
          endObj.Token = 'END'
          endObj.Regex = 'END'
          endObj.Value = 'END'
          result.push(endObj)
        }
        tokenMatches.length = 0
      } else {
        result.push({
          Token: 'InvalidTokenError',
          Regex: '',
          Value: inputCopy
        })
        inputCopy = ''
      }
    }
    return result
  }
}

export default Tokenizer
