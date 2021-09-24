import IndexException from './Exceptions/IndexException.js'
import InvalidTokenException from './Exceptions/InvalidTokenException.js'

/**
 * Tokenizer class.
 * @example
 * const wordAndDotGrammar = new WordAndDot()
 * const wordTokenizer = new Tokenizer(wordAndDotGrammar, 'String to tokenize.')
 * @method getActiveToken() Returns the active token.
 * @method getTokens() Returns all matched tokens in an array.
 * @method getTokenLength() Returns the number of matched tokens including END and Exception token.
 * @method setNextToken() Sets active token index + 1 if no sequence is provided.
 * @method setPreviousToken() Sets active token index - 1.
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
    this.#matchToken()
  }

  /**
   * Returns all matched tokens in an array.
   *
   * @returns {Array.<{Token: String, Regex: RegExp, Value: String}>}
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
    return this.#matchedTokens.length
  }

  #validateInput(input) {
    if (input.trim() === '') {
      this.#matchedTokens.push(this.#endObj)
      return input.trim()
    } else {
      return input.trim()
    }
  }

  #matchToken() {
    const regexObject = this.#grammar._getRegexTypes()
    if (this.#input !== '') {
      let tokenMatches = []
      for (const [tokenType, regex] of Object.entries(regexObject)) {
        if (this.#input.match(regex)) {
          const newMatch = {}
          newMatch.Token = tokenType
          newMatch.Regex = regex
          newMatch.Value = this.#input.match(regex)[0]
          tokenMatches.push(newMatch)
        }
      }
      if (tokenMatches.length > 0) {
        const maximalToken = this.#maximalMunch(tokenMatches)
        this.#matchedTokens.push(maximalToken)
        this.#input = this.#input.replace(maximalToken.Value, '').trim()
        if (this.#input === '') {
          this.#matchedTokens.push(this.#endObj)
        }
        tokenMatches.length = 0
      } else {
        this.#matchedTokens.push({
          Token: 'Exception',
          Regex: '',
          Value: this.#input
        })
        this.#input = ''
      }
    }
  }

  #maximalMunch(tokenMatches) {
    return tokenMatches.sort((a, b) => b.Value.length - a.Value.length)[0]
  }

  #isException(token) {
    if (!token) {
      throw new IndexException('No token at the requested index.')
    }
    if (token.Token === 'Exception') {
      throw new InvalidTokenException(`Invalid token: ${token.Value}`)
    }
    return false
  }

  /**
   * Sets active token index - 1.
   *
   */
  setPreviousToken() {
    this.#tokenIndex--
  }

  /**
   * Sets active token index + 1 if no sequence is provided.
   *
   * @param {Number} sequence as the amount of steps to jump forward.
   */
  setNextToken(sequence) {
    if (!sequence) {
      this.#matchToken()
      this.#tokenIndex++
    } else {
      for (let i = 0; i < sequence; i++) {
        this.#matchToken()
        this.#tokenIndex++
      }
    }
  }

  /**
   * Returns the current active token.
   *
   * @returns {{Token: String, Regex: RegExp, Value: String}}
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
    if (
      this.#input !== '' ||
      this.#matchedTokens[this.#tokenIndex + 1]
    ) {
      return true
    }
    return false
  }
}

export default Tokenizer
