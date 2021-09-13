import IndexException from './Exceptions/IndexException.js'
import InvalidTokenException from './Exceptions/InvalidTokenException.js'

class Tokenizer {
  #input
  #grammar
  #matchedTokens
  #tokenLength
  #tokenIndex
  #endObj

  constructor(grammarObject, input) {
    this.#grammar = grammarObject
    this.#matchedTokens = []
    this.#endObj = {
      Token: 'END',
      Regex: 'END',
      Value: 'END'
    }
    this.#input = this.#validateInput(input)
    this.#tokenIndex = 0
    this.#matchTokens()
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

  #validateInput(input) {
    if (input.trim() === '') {
      this.#matchedTokens.push(this.#endObj)
      return input.trim()
    } else {
      return input.trim()
    }
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
          const maximalToken = this.#maximalMunch(tokenMatches)
          result.push(maximalToken)
          inputCopy = inputCopy.replace(maximalToken.Value, '').trim()
          if (inputCopy === '') {
            result.push(this.#endObj)
          }
          tokenMatches.length = 0
        } else {
          result.push({
            Token: 'Exception',
            Regex: '',
            Value: inputCopy
          })
          inputCopy = ''
        }
      }
    if (result.length === 0) {
      result.push(this.#endObj)
    }
    this.#matchedTokens = result
  }

  #maximalMunch(tokenMatches) {
    return tokenMatches.sort((a, b) => b.Value.length - a.Value.length)[0]
  }

  #isException(token) {
    if (token.Token === 'Exception') {
      throw new InvalidTokenException(`Invalid token: ${token.Value}`)
    }
    return false
  }

  getPreviousToken() {
    this.#tokenIndex--
    if (this.#matchedTokens[this.#tokenIndex] && !this.#isException(this.#matchedTokens[this.#tokenIndex])) {
      return this.#matchedTokens[this.#tokenIndex]
    }
    throw new IndexException('No available token at given index.')
  }

  getNextToken(sequence) {
    if (!sequence) {
      this.#tokenIndex++
    } else {
      this.#tokenIndex = this.#tokenIndex + sequence
    }
    if (!this.#isException(this.#matchedTokens[this.#tokenIndex])) {
      return this.#matchedTokens[this.#tokenIndex]
    }
  }

  getActiveToken() {
    if (!this.#isException(this.#matchedTokens[this.#tokenIndex])) {
      return this.#matchedTokens[this.#tokenIndex]
    }
  }

  hasNextToken() {
    let currentIndex = this.#tokenIndex
    return this.#matchedTokens[currentIndex++] ? true : false
  }
}

export default Tokenizer
