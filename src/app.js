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


const grammar = new WordAndDot()
const strTokenizer = new Tokenizer(grammar, 'This is a string.')

do {
  strTokenizer.setNextToken()
} while (strTokenizer.hasNextToken())

console.log(strTokenizer.getTokens())
