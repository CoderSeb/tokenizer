import IndexException from './Exceptions/IndexException.js'
import InvalidTokenException from './Exceptions/InvalidTokenException.js'

/**
 * Tokenizer class.
 * @example
 * const wordAndDotGrammar = new WordAndDot()
 * const wordTokenizer = new Tokenizer(wordAndDotGrammar, 'String to tokenize.')
 * @method getTokens() Returns all matched tokens in an array.
 * @method getTokenLength() Returns the number of matched tokens including END and Exception token.
 * @method toString() Returns all matched tokens as a string format for convenient use.
 * @method getNextToken() Sets active token index + 1 if no sequence is provided. Then returns the active token.
 * @method getPreviousToken() Sets active token index - 1. Then returns the active token.
 * @method hasNextToken() Returns true if next token exists.
 */
class Tokenizer {
  #input
  #grammar
  #matchedTokens
  #tokenLength
  #tokenIndex
  #endObj

  /**
   * Constructor expects a Grammar object and a string to tokenize.
   *
   * @param {Object} grammarObject
   * @param {String} input 
   */
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

  /**
   * Returns all matched tokens in an array.
   *
   * @returns {Array.<{Token: String, Regex: RegExp, Value: String}>} as the array of token objects.
   */
  getTokens() {
    return this.#matchedTokens
  }

  /**
   * Returns the number of matched tokens including END and Exception token.
   *
   * @returns {Number} as the number of tokens matched including END and Exception token.
   */
  getTokenLength() {
    return this.#tokenLength
  }

  /**
   * Returns all matched tokens as a string format for convenient use.
   *
   * @returns {string} as all matched tokens.
   */
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
    const regexObject = this.#grammar._getRegexTypes()
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

  /**
   * Sets active token index - 1.
   * Then returns the active token.
   *
   * @returns {{Token: String, Regex: RegExp, Value: String}} the new active token.
   */
  getPreviousToken() {
    this.#tokenIndex--
    if (this.#matchedTokens[this.#tokenIndex] && !this.#isException(this.#matchedTokens[this.#tokenIndex])) {
      return this.#matchedTokens[this.#tokenIndex]
    }
    throw new IndexException('No available token at given index.')
  }

  /**
   * Sets active token index + 1 if no sequence is provided.
   * Then returns the active token.
   * 
   * @param {Number} sequence as the amount of steps to jump forward.
   * @returns {{Token: String, Regex: RegExp, Value: String}} the new active token.
   */
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

  /**
   * Returns the current active token.
   *
   * @returns {{Token: String, Regex: RegExp, Value: String}} the active token.
   */
  getActiveToken() {
    if (!this.#isException(this.#matchedTokens[this.#tokenIndex])) {
      return this.#matchedTokens[this.#tokenIndex]
    }
  }

  /**
   * Returns true if next token exists.
   *
   * @returns {Boolean}
   */
  hasNextToken() {
    let currentIndex = this.#tokenIndex
    return this.#matchedTokens[currentIndex++] ? true : false
  }
}

export default Tokenizer
