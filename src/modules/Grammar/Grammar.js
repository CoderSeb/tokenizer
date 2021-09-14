class Grammar {
  #typesWithRegex

  constructor() {
    this.#typesWithRegex = {}
  }

  getRegexTypes() {
    return this.#typesWithRegex
  }

  setRegexTypes(newTypeWithRegex) {
    this.#typesWithRegex = newTypeWithRegex
  }
}

export default Grammar