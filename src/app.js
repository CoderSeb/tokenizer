import Tokenizer from './Tokenizer/Tokenizer.js'


const wordTokenizer = new Tokenizer('WordAndDotGrammar', 'This is a string.')

console.log(wordTokenizer.getTokenizerRegex())
console.log(wordTokenizer.getTokens())

console.log(wordTokenizer.getPrivate())