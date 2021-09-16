import Tokenizer from './modules/Tokenizer.js'
import WordAndDot from './modules/Grammar/WordAndDot.js'
import Arithmetic from './modules/Grammar/Arithmetic.js'
import MaximalMunch from './modules/Grammar/MaximalMunch.js'
import Exclamation from './modules/Grammar/Exclamation.js'

export {
  Tokenizer,
  WordAndDot,
  Arithmetic,
  MaximalMunch,
  Exclamation
}

// TODO: remove code below before merge to master/npm publish.

const wordTokenizer = new Tokenizer(new WordAndDot(), 'This is a string.')

console.log(wordTokenizer.getTokens())
console.log(wordTokenizer.getActiveToken())
console.log(wordTokenizer.getNextToken())
console.log(wordTokenizer.getPreviousToken())