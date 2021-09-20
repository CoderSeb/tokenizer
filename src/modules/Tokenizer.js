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
    this.#matchToken()
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
    if(this.#matchedTokens[this.#tokenIndex].Token === 'END') {
      console.log('end token exists')
    }
    if (this.#input !== '' || this.#matchedTokens[this.#tokenIndex].Token === 'END') {
      return true
    }
    return false
  }
}

export default Tokenizer
