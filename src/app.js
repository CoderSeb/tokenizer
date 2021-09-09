import Tokenizer from './modules/Tokenizer.js'
import WordAndDotGrammar from './modules/Grammar/WordAndDotGrammar.js'

const wordAndDot = new WordAndDotGrammar()


console.log(wordAndDot.getRegexTypes())

const wordTokenizer = new Tokenizer('WordAndDotGrammar', 'This is a string.')
