import Tokenizer from './modules/Tokenizer.js'
import TextGrammar from './modules/Grammar/TextGrammar.js'
import ArithmeticGrammar from './modules/Grammar/ArithmeticGrammar.js'

const textGrammar = new TextGrammar()
const arithmeticGrammar = new ArithmeticGrammar()

const textTokenizer = new Tokenizer(
  textGrammar,
  'This is a string. Welcome, to myself!'
)

const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '5+6=7 3(52.7)/3*6-7')

console.log(textTokenizer.toString())
console.log('--------------------------------------------------')
console.log(arithmeticTokenizer.toString())