/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Tokenizer from "../src/modules/Tokenizer"
import WordAndDot from "../src/modules/Grammar/WordAndDot"
import ArithmeticGrammar from "../src/modules/Grammar/Arithmetic"
import IndexException from "../src/modules/Exceptions/IndexException.js"
import InvalidTokenException from "../src/modules/Exceptions/InvalidTokenException.js"

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
})