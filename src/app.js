import Tokenizer from './modules/Tokenizer.js'
import TextGrammar from './modules/Grammar/TextGrammar.js'
import ArithmeticGrammar from './modules/Grammar/ArithmeticGrammar.js'

const textGrammar = new TextGrammar()
const arithmeticGrammar = new ArithmeticGrammar()

const textTokenizer = new Tokenizer(
  textGrammar,
  'This is a string with unusual characters like å 8+9 & ä, perhaps even ö. Hej! Jag är 32 år '
)

const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '5+6=7 3(52.7)/3 6-7 8*9=5')

console.log(textTokenizer.toString())
console.log('--------------------------------------------------')
console.log(arithmeticTokenizer.toString())