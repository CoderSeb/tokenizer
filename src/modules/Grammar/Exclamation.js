import Grammar from './Grammar.js'

class Exclamation extends Grammar {
  constructor() {
    super()
    this.setRegexTypes()
  }

  setRegexTypes() {
    const exclamation = {
      EXCLAMATION: /^!/
    }
    this._setRegexTypes(exclamation)
  }

  getRegexTypes() {
    return this._getRegexTypes()
  }
}

export default Exclamation