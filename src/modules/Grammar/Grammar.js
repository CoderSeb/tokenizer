/**
 * Grammar class.
 * Create your own grammar by extending this class.
 *
 * @example
 * class WordAndDot extends Grammar {
 *   constructor() {
 *   super()
 *   this._setRegexTypes({
 *     WORD: /^[\w|åäöÅÄÖ]+/, // Please note the '^' in the regex pattern.
 *     DOT: /^\./ // Please note the '^' in the regex pattern.
 *     })
 *   }
 * }
 */
class Grammar {
  #typesWithRegex

  constructor() {
    this.#typesWithRegex = {}
  }

  _getRegexTypes() {
    return this.#typesWithRegex
  }

  _setRegexTypes(newTypeWithRegex) {
    this.#typesWithRegex = newTypeWithRegex
  }
}

export default Grammar