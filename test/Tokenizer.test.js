/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Tokenizer from "../src/modules/Tokenizer"
import TextGrammar from "../src/modules/Grammar/WordAndDot"
import ArithmeticGrammar from "../src/modules/Grammar/Arithmetic"

describe('Tokenizer tests', () => {
  describe('Text grammar', () => {
    const textGrammar = new TextGrammar()
    it('TC1 input \'a\' is of token type WORD and value is \'a\'', () => {
      expect(new Tokenizer(textGrammar, 'a').getTokens()[0].Token).toBe('WORD')
      expect(new Tokenizer(textGrammar, 'a').getTokens()[0].Value).toBe('a')
    })
  })
})