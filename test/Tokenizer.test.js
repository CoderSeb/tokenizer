/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Tokenizer from '../src/modules/Tokenizer'
import WordAndDot from '../src/modules/Grammar/WordAndDot'
import Arithmetic from '../src/modules/Grammar/Arithmetic'
import IndexException from '../src/modules/Exceptions/IndexException.js'
import InvalidTokenException from '../src/modules/Exceptions/InvalidTokenException.js'
import MaximalMunch from '../src/modules/Grammar/MaximalMunch'
import Exclamation from '../src/modules/Grammar/Exclamation'

describe('Tokenizer tests', () => {
  describe('Text grammar', () => {
    const textGrammar = new WordAndDot()
    it("TC1 input 'a' sequence [] is of token type WORD and value is 'a'", () => {
      expect(new Tokenizer(textGrammar, 'a').getActiveToken().Token).toBe(
        'WORD'
      )
      expect(new Tokenizer(textGrammar, 'a').getActiveToken().Value).toBe('a')
    })
    it("TC2 input 'a aa' sequence [>] is of token type WORD and value is 'aa'", () => {
      const textTokenizer = new Tokenizer(textGrammar, 'a aa')
      textTokenizer.setNextToken()
      expect(textTokenizer.getActiveToken().Token).toBe('WORD')
      expect(textTokenizer.getActiveToken().Value).toBe('aa')
    })
    it("TC3 input 'a.b' sequence [>] is of token type DOT and value is '.'", () => {
      const textTokenizer = new Tokenizer(textGrammar, 'a.b')
      textTokenizer.setNextToken()
      expect(textTokenizer.getActiveToken().Token).toBe('DOT')
      expect(textTokenizer.getActiveToken().Value).toBe('.')
    })
    it("TC4 input 'a.b' sequence [>>] is of token type WORD and value is 'b'", () => {
      const textTokenizer = new Tokenizer(textGrammar, 'a.b')
      textTokenizer.setNextToken(2)
      expect(textTokenizer.getActiveToken().Token).toBe('WORD')
      expect(textTokenizer.getActiveToken().Value).toBe('b')
    })
    it("TC5 input 'aa. b' sequence [>>] is of token type WORD and value is 'b'", () => {
      const textTokenizer = new Tokenizer(textGrammar, 'aa. b')
      textTokenizer.setNextToken(2)
      expect(textTokenizer.getActiveToken().Token).toBe('WORD')
      expect(textTokenizer.getActiveToken().Value).toBe('b')
    })
    it("TC6 input 'a .b' sequence [>><] is of token type DOT and value is '.'", () => {
      const textTokenizer = new Tokenizer(textGrammar, 'a .b')
      textTokenizer.setNextToken(2)
      textTokenizer.setPreviousToken()
      expect(textTokenizer.getActiveToken().Token).toBe('DOT')
      expect(textTokenizer.getActiveToken().Value).toBe('.')
    })
    it("TC7 input '' sequence [] is of token type END and value is 'END'", () => {
      expect(new Tokenizer(textGrammar, '').getActiveToken().Token).toBe('END')
      expect(new Tokenizer(textGrammar, '').getActiveToken().Value).toBe('END')
    })
    it("TC8 input ' ' sequence [] is of token type END and value is 'END'", () => {
      expect(new Tokenizer(textGrammar, ' ').getActiveToken().Token).toBe('END')
      expect(new Tokenizer(textGrammar, ' ').getActiveToken().Value).toBe('END')
    })
    it("TC9 input 'a' sequence [>] is of token type END and value is 'END'", () => {
      const textTokenizer = new Tokenizer(textGrammar, 'a')
      textTokenizer.setNextToken()
      expect(textTokenizer.getActiveToken().Token).toBe('END')
      expect(textTokenizer.getActiveToken().Value).toBe('END')
    })
    it("TC10 input 'a' sequence [<] throws IndexException", () => {
      const textTokenizer = new Tokenizer(textGrammar, 'a')
      textTokenizer.setPreviousToken()
      expect(() => textTokenizer.getActiveToken()).toThrow(IndexException)
    })
    it("TC11 input '!' sequence [] throws InvalidTokenException", () => {
      expect(() => new Tokenizer(textGrammar, '!').getActiveToken()).toThrow(
        InvalidTokenException
      )
    })
  })
  describe('Arithmetic grammar', () => {
    const arithmeticGrammar = new Arithmetic()
    it("TC12 input '3' sequence [] is of token type NUMBER and value is '3'", () => {
      expect(new Tokenizer(arithmeticGrammar, '3').getActiveToken().Token).toBe(
        'NUMBER'
      )
      expect(new Tokenizer(arithmeticGrammar, '3').getActiveToken().Value).toBe(
        '3'
      )
    })
    it("TC13 input '3.14' sequence [] is of token type NUMBER and value is '3.14'", () => {
      expect(
        new Tokenizer(arithmeticGrammar, '3.14').getActiveToken().Token
      ).toBe('NUMBER')
      expect(
        new Tokenizer(arithmeticGrammar, '3.14').getActiveToken().Value
      ).toBe('3.14')
    })
    it("TC14 input '3 + 54 * 4' sequence [>>>] is of token type MUL and value is '*'", () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3 + 54 * 4')
      arithmeticTokenizer.setNextToken(3)
      expect(arithmeticTokenizer.getActiveToken().Token).toBe('MUL')
      expect(arithmeticTokenizer.getActiveToken().Value).toBe('*')
    })
    it("TC15 input '3+5 # 4' sequence [>>>] throws InvalidTokenException", () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3+5 # 4')
      arithmeticTokenizer.setNextToken(3)
      expect(() => arithmeticTokenizer.getActiveToken()).toThrow(
        InvalidTokenException
      )
    })
    it("TC16 input '3.0+54.1     + 4.2' sequence [><>>>] is of token type ADD and value is '+'", () => {
      const arithmeticTokenizer = new Tokenizer(
        arithmeticGrammar,
        '3.0+54.1     + 4.2'
      )
      arithmeticTokenizer.setNextToken()
      arithmeticTokenizer.setPreviousToken()
      arithmeticTokenizer.setNextToken(3)
      expect(arithmeticTokenizer.getActiveToken().Token).toBe('ADD')
      expect(arithmeticTokenizer.getActiveToken().Value).toBe('+')
    })
    it("TC17 input '-' sequence [] is of token type SUB and value is '-'", () => {
      expect(new Tokenizer(arithmeticGrammar, '-').getActiveToken().Token).toBe(
        'SUB'
      )
      expect(new Tokenizer(arithmeticGrammar, '-').getActiveToken().Value).toBe(
        '-'
      )
    })
    it("TC18 input '/' sequence [] is of token type DIV and value is '/'", () => {
      expect(new Tokenizer(arithmeticGrammar, '/').getActiveToken().Token).toBe(
        'DIV'
      )
      expect(new Tokenizer(arithmeticGrammar, '/').getActiveToken().Value).toBe(
        '/'
      )
    })
    it("TC19 input ')(' sequence [>] is of token type OPENING and value is '('", () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, ')(')
      arithmeticTokenizer.setNextToken()
      expect(arithmeticTokenizer.getActiveToken().Token).toBe('OPENING')
      expect(arithmeticTokenizer.getActiveToken().Value).toBe('(')
    })
    it("TC20 input '3(5-2)' sequence [>>>>>] is of token type CLOSING and value is ')'", () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3(5-2)')
      arithmeticTokenizer.setNextToken(5)
      expect(arithmeticTokenizer.getActiveToken().Token).toBe('CLOSING')
      expect(arithmeticTokenizer.getActiveToken().Value).toBe(')')
    })
    it("TC21 input '3 = 4 - 1' sequence [>] is of token type EQUAL and value is '='", () => {
      const arithmeticTokenizer = new Tokenizer(arithmeticGrammar, '3 = 4 - 1')
      arithmeticTokenizer.setNextToken()
      expect(arithmeticTokenizer.getActiveToken().Token).toBe('EQUAL')
      expect(arithmeticTokenizer.getActiveToken().Value).toBe('=')
    })
  })
  describe('Maximal munch grammar', () => {
    const maximalMunchGrammar = new MaximalMunch()
    it("TC22 input '3.14' sequence [] is of token type FLOAT and value is '3.14'", () => {
      expect(
        new Tokenizer(maximalMunchGrammar, '3.14').getActiveToken().Token
      ).toBe('FLOAT')
      expect(
        new Tokenizer(maximalMunchGrammar, '3.14').getActiveToken().Value
      ).toBe('3.14')
    })
    it("TC23 input '6 3.14' sequence [] is of token type INTEGER and value is '6'", () => {
      expect(
        new Tokenizer(maximalMunchGrammar, '6 3.14').getActiveToken().Token
      ).toBe('INTEGER')
      expect(
        new Tokenizer(maximalMunchGrammar, '6 3.14').getActiveToken().Value
      ).toBe('6')
    })
  })
  describe('Exclamation grammar', () => {
    const exclamationGrammar = new Exclamation()
    it("TC24 input ' ! ' sequence [] is of token type EXCLAMATION and value is '!'", () => {
      expect(
        new Tokenizer(exclamationGrammar, ' ! ').getActiveToken().Token
      ).toBe('EXCLAMATION')
      expect(
        new Tokenizer(exclamationGrammar, ' ! ').getActiveToken().Value
      ).toBe('!')
    })
  })
  describe('Additional coverage tests', () => {
    const textGrammar = new WordAndDot()
    const textTokenizer = new Tokenizer(textGrammar, 'Hello World.')
    textTokenizer.setNextToken(2)
    it(`TC25 input 'Hello World.' after sequence [>>] getTokens() returns array:
      [
        { Token: 'WORD', Regex: /^[\\w|åäöÅÄÖ]+/, Value: 'Hello' },
        { Token: 'WORD', Regex: /^[\\w|åäöÅÄÖ]+/, Value: 'World' },
        { Token: 'DOT', Regex: /^\\./, Value: '.' },
        { Token: 'END', Regex: 'END', Value: 'END' }
      ]`, () => {
      expect(textTokenizer.getTokens()).toStrictEqual([
        { Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'Hello' },
        { Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'World' },
        { Token: 'DOT', Regex: /^\./, Value: '.' },
        { Token: 'END', Regex: 'END', Value: 'END' }
      ])
    })
    it(`TC26 input 'Hello World.' after sequence [>>] getTokenLength() returns 4 including the END token.`, () => {
      expect(textTokenizer.getTokenLength()).toBe(4)
    })
    it(`TC27 input 'Hello World.' after sequence [>>] hasNextToken() returns
        true as next token should be an END token.`, () => {
      expect(textTokenizer.hasNextToken()).toBe(true)
    })
    it(`TC28 input 'Hello World.' after sequence [>>>] hasNextToken() returns
        false.`, () => {
      textTokenizer.setNextToken()
      expect(textTokenizer.hasNextToken()).toBe(false)
    })
  })
})
