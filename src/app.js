import Tokenizer from './modules/Tokenizer.js'
import Grammar from './modules/Grammar/Grammar.js'
import WordAndDot from './modules/Grammar/WordAndDot.js'
import Arithmetic from './modules/Grammar/Arithmetic.js'
import MaximalMunch from './modules/Grammar/MaximalMunch.js'
import Exclamation from './modules/Grammar/Exclamation.js'

export {
  Tokenizer,
  Grammar,
  WordAndDot,
  Arithmetic,
  MaximalMunch,
  Exclamation
}

const textGrammar = new WordAndDot()
const textTokenizer = new Tokenizer(textGrammar, 'This is a string.')

while (textTokenizer.hasNextToken()) {
  textTokenizer.setNextToken()
}

console.log(textTokenizer.getTokens())