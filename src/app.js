import Tokenizer from './modules/Tokenizer.js'
import TextGrammar from './modules/Grammar/TextGrammar.js'
import ArithmeticGrammar from './modules/Grammar/ArithmeticGrammar.js'

const textGrammar = new TextGrammar()
const arithmeticGrammar = new ArithmeticGrammar()

console.log(textGrammar.getRegexTypes())
console.log(arithmeticGrammar.getRegexTypes())

const textTokenizer = new Tokenizer(textGrammar, 'This is a string with unusual characters like å 8+9 & ä, perhaps even ö. Hej! Jag är 32 år ')

console.log(textTokenizer.getTokenLength())
console.log(textTokenizer.getTokens())
console.log(textTokenizer.toString())
