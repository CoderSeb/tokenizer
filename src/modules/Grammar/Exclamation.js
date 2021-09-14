import Grammar from './Grammar.js'

class Exclamation extends Grammar {
  constructor() {
    super()
    this.setRegexTypes({
      EXCLAMATION: /^!/
    })
  }
}

export default Exclamation