import Grammar from './Grammar.js'

class MaximalMunch extends Grammar {
  constructor() {
    super()
    this.setRegexTypes()
  }

  setRegexTypes() {
    const maximalMunch = {
      FLOAT: /^[0-9]+\.[0-9]+/,
      INTEGER: /^[0-9]+/
    }
    this._setRegexTypes(maximalMunch)
  }

  getRegexTypes() {
    return this._getRegexTypes()
  }
}

export default MaximalMunch