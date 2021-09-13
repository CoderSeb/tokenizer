/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Tokenizer from "../src/modules/Tokenizer"
import WordAndDot from "../src/modules/Grammar/WordAndDot"
import Arithmetic from "../src/modules/Grammar/Arithmetic"
import IndexException from "../src/modules/Exceptions/IndexException.js"
import InvalidTokenException from "../src/modules/Exceptions/InvalidTokenException.js"
import MaximalMunch from "../src/modules/Grammar/MaximalMunch"

describe('Tokenizer tests', () => {
  describe('Text grammar', () => {
    const textGrammar = new WordAndDot()
    it('TC1 input \'a\' sequence [] is of token type WORD and value is \'a\'', () => {
      expect(new Tokenizer(textGrammar, 'a').getActiveToken().Token).toBe('WORD')
      expect(new Tokenizer(textGrammar, 'a').getActiveToken().Value).toBe('a')
    })
    it('TC2 input \'a aa\' sequence [>] is of token type WORD and value is \'aa\'', () => {
      expect(new Tokenizer(textGrammar, 'a aa').getNextToken().Token).toBe('WORD')
      expect(new Tokenizer(textGrammar, 'a aa').getNextToken().Value).toBe('aa')
    })
    it('TC3 input \'a.b\' sequence [>] is of token type DOT and value is \'.\'', () => {
      expect(new Tokenizer(textGrammar, 'a.b').getNextToken().Token).toBe('DOT')
      expect(new Tokenizer(textGrammar, 'a.b').getNextToken().Value).toBe('.')
    })
    it('TC4 input \'a.b\' sequence [>>] is of token type WORD and value is \'b\'', () => {
      expect(new Tokenizer(textGrammar, 'a.b').getNextToken(2).Token).toBe('WORD')
      expect(new Tokenizer(textGrammar, 'a.b').getNextToken(2).Value).toBe('b')
    })
    it('TC5 input \'aa. b\' sequence [>>] is of token type WORD and value is \'b\'', () => {
      expect(new Tokenizer(textGrammar, 'aa. b').getNextToken(2).Token).toBe('WORD')
      expect(new Tokenizer(textGrammar, 'aa. b').getNextToken(2).Value).toBe('b')
    })
    it('TC6 input \'a .b\' sequence [>><] is of token type DOT and value is \'.\'', () => {
      const textTokenizer = new Tokenizer(textGrammar, 'a .b')
      textTokenizer.getNextToken(2)
      const previous = textTokenizer.getPreviousToken()
      expect(previous.Token).toBe('DOT')
      expect(previous.Value).toBe('.')
    })
    it('TC7 input \'\' sequence [] is of token type END and value is \'END\'', () => {
      expect(new Tokenizer(textGrammar, '').getActiveToken().Token).toBe('END')
      expect(new Tokenizer(textGrammar, '').getActiveToken().Value).toBe('END')
    })
    it('TC8 input \' \' sequence [] is of token type END and value is \'END\'', () => {
      expect(new Tokenizer(textGrammar, ' ').getActiveToken().Token).toBe('END')
      expect(new Tokenizer(textGrammar, ' ').getActiveToken().Value).toBe('END')
    })
    it('TC9 input \'a\' sequence [>] is of token type END and value is \'END\'', () => {
      expect(new Tokenizer(textGrammar, 'a').getNextToken().Token).toBe('END')
      expect(new Tokenizer(textGrammar, 'a').getNextToken().Value).toBe('END')
    })
    it('TC10 input \'a\' sequence [<] throws IndexException', () => {
      expect(() => new Tokenizer(textGrammar, 'a').getPreviousToken()).toThrow(IndexException)
    })
    it('TC11 input \'!\' sequence [] throws InvalidTokenException', () => {
      expect(() => new Tokenizer(textGrammar, '!').getActiveToken()).toThrow(InvalidTokenException)
    })
  })
  describe('Arithmetic grammar', () => {
    const arithmeticGrammar = new Arithmetic()
    it('TC12 input \'3\' sequence [] is of token type NUMBER and value is \'3\'', () => {
      expect(new Tokenizer(arithmeticGrammar, '3').getActiveToken().Token).toBe('NUMBER')
      expect(new Tokenizer(arithmeticGrammar, '3').getActiveToken().Value).toBe('3')
    })
    it('TC13 input \'3.14\' sequence [] is of token type NUMBER and value is \'3.14\'', () => {
      expect(new Tokenizer(arithmeticGrammar, '3.14').getActiveToken().Token).toBe('NUMBER')
      expect(new Tokenizer(arithmeticGrammar, '3.14').getActiveToken().Value).toBe('3.14')
    })
    it('TC14 input \'3 + 54 * 4\' sequence [>>>] is of token type MUL and value is \'*\'', () => {
      expect(new Tokenizer(arithmeticGrammar, '3 + 54 * 4').getNextToken(3).Token).toBe('MUL')
      expect(new Tokenizer(arithmeticGrammar, '3 + 54 * 4').getNextToken(3).Value).toBe('*')
    })
    it('TC15 input \'3+5 # 4\' sequence [>>>] throws InvalidTokenException', () => {
      expect(() => new Tokenizer(arithmeticGrammar, '3+5 # 4').getNextToken(3)).toThrow(InvalidTokenException)
    })
    it('TC16 input \'3.0+54.1     + 4.2\' sequence [><>>>] is of token type ADD and value is \'+\'', () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3.0+54.1     + 4.2')
      arithmeticTokenizer.getNextToken()
      arithmeticTokenizer.getPreviousToken()
      const nextToken = arithmeticTokenizer.getNextToken(3)
      expect(nextToken.Token).toBe('ADD')
      expect(nextToken.Value).toBe('+')
    })
    it('TC17 input \'-\' sequence [] is of token type SUB and value is \'-\'', () => {
      expect(new Tokenizer(arithmeticGrammar, '-').getActiveToken().Token).toBe('SUB')
      expect(new Tokenizer(arithmeticGrammar, '-').getActiveToken().Value).toBe('-')
    })
    it('TC18 input \'/\' sequence [] is of token type DIV and value is \'/\'', () => {
      expect(new Tokenizer(arithmeticGrammar, '/').getActiveToken().Token).toBe('DIV')
      expect(new Tokenizer(arithmeticGrammar, '/').getActiveToken().Value).toBe('/')
    })
    it('TC19 input \')(\' sequence [>] is of token type OPENING and value is \'(\'', () => {
      expect(new Tokenizer(arithmeticGrammar, ')(').getNextToken().Token).toBe('OPENING')
      expect(new Tokenizer(arithmeticGrammar, ')(').getNextToken().Value).toBe('(')
    })
    it('TC20 input \'3(5-2)\' sequence [>>>>>] is of token type CLOSING and value is \')\'', () => {
      expect(new Tokenizer(arithmeticGrammar, '3(5-2)').getNextToken(5).Token).toBe('CLOSING')
      expect(new Tokenizer(arithmeticGrammar, '3(5-2)').getNextToken(5).Value).toBe(')')
    })
    it('TC21 input \'3 = 4 - 1\' sequence [>] is of token type EQUAL and value is \'=\'', () => {
      expect(new Tokenizer(arithmeticGrammar, '3 = 4 - 1').getNextToken().Token).toBe('EQUAL')
      expect(new Tokenizer(arithmeticGrammar, '3 = 4 - 1').getNextToken().Value).toBe('=')
    })
  })
  describe('Maximal munch grammar', () => {
    const maximalMunchGrammar = new MaximalMunch()
    it('TC22 input \'3.14\' sequence [] is of token type FLOAT and value is \'3.14\'', () => {
      expect(new Tokenizer(maximalMunchGrammar, '3.14').getActiveToken().Token).toBe('FLOAT')
      expect(new Tokenizer(maximalMunchGrammar, '3.14').getActiveToken().Value).toBe('3.14')
    })
    it('TC23 input \'6 3.14\' sequence [] is of token type INTEGER and value is \'6\'', () => {
      expect(new Tokenizer(maximalMunchGrammar, '6 3.14').getActiveToken().Token).toBe('INTEGER')
      expect(new Tokenizer(maximalMunchGrammar, '6 3.14').getActiveToken().Value).toBe('6')
    })
  })
})