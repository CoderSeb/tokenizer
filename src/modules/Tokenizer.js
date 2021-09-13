import IndexException from './Exceptions/IndexException.js'
import InvalidTokenException from './Exceptions/InvalidTokenException.js'

class Tokenizer {
  #input
  #grammar
  #matchedTokens
  #tokenLength
  #tokenIndex

  constructor(grammarObject, input) {
    this.#grammar = grammarObject
    this.#input = input
    this.#matchedTokens = this.#matchTokens()
    this.#tokenLength = this.#matchedTokens.length
    this.#tokenIndex = 0
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
    let inputCopy = this.#input.trim()
    if (inputCopy === '') {
      const endObj = {}
      endObj.Token = 'END'
      endObj.Regex = 'END'
      endObj.Value = 'END'
      result.push(endObj)
    } else {
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
            const endObj = {}
            endObj.Token = 'END'
            endObj.Regex = 'END'
            endObj.Value = 'END'
            result.push(endObj)
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
    }
    return result
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
