class Grammar {
  #typesWithRegex

  constructor() {
    this.#typesWithRegex = {}
  }

  _getRegexTypes() {
    return this.#typesWithRegex
  }

  _setTypes(newTypeWithRegex) {
    this.#typesWithRegex = newTypeWithRegex
  }
}

export default Grammar