import Tokenizer from './modules/Tokenizer.js'
import WordAndDot from './modules/Grammar/WordAndDot.js'
import Arithmetic from './modules/Grammar/Arithmetic.js'
import MaximalMunch from './modules/Grammar/MaximalMunch.js'

const wordAndDotGrammar = new WordAndDot()
const arithmeticGrammar = new Arithmetic()
const maximalMunchGrammar = new MaximalMunch()

const wordAndDotTokenizer = new Tokenizer(
  wordAndDotGrammar,
  'This is a string. I love it...'
)

const arithmeticTokenizer = new Tokenizer(
  arithmeticGrammar,
  '5+6=7 3(52.7)/3*6-7'
)

const maximalMunchTokenizer = new Tokenizer(
  maximalMunchGrammar,
  '4 5.43 9'
)

console.log(wordAndDotTokenizer.getTokens())
console.log('--------------------------------------------------')
console.log(arithmeticTokenizer.getTokens())
console.log('--------------------------------------------------')
console.log(maximalMunchTokenizer.getTokens())
