class Grammar {
  #typesWithRegex
  #generalRegex

  constructor() {
    this.#typesWithRegex = {}
    this.#generalRegex
  }

  _getRegexTypes() {
    return this.#typesWithRegex
  }

  _setRegexTypes(newTypeWithRegex) {
    this.#typesWithRegex = newTypeWithRegex
  }

  _setGeneralRegex(newGeneralRegex) {
    this.#generalRegex = newGeneralRegex
  }

  _getGeneralRegex() {
    return this.#generalRegex
  }
}

export default Grammar