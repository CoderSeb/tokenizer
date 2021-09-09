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