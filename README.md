# Tokenizer

This lexical tokenizer comes with ready to go grammar objects.

## Grammar objects

- WordAndDot - Tokens: [WORD, DOT].
- Arithmetic - Tokens: [NUMBER, ADD, SUB, DIV, MUL, EQUAL, OPENING, CLOSING].
- MaximalMunch - Tokens: [INTEGER, FLOAT].
- Exclamation - Tokens: [EXCLAMATION].

## Instructions

1. ### Installing

```bash
npm install @coder-seb/tokenizer
```

2. ### Creating a new Tokenizer object

```js
import { Tokenizer, WordAndDot } from '@coder-seb/tokenizer'

const textGrammar = new WordAndDot()
const textTokenizer = new Tokenizer(textGrammar, 'This is a string.')
```

3. ### Get all tokens

```js
const textGrammar = new WordAndDot()
const textTokenizer = new Tokenizer(textGrammar, 'This is a string.')

while (textTokenizer.hasNextToken()) {
  textTokenizer.setNextToken()
}

console.log(textTokenizer.getTokens())
```

Output:

```bash
[
  { Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'This' },  
  { Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'is' },    
  { Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'a' },     
  { Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'string' },
  { Token: 'DOT', Regex: /^\./, Value: '.' },
  { Token: 'END', Regex: 'END', Value: 'END' }
]
```

4. ### Get active token (sequence [])

```js
console.log(textTokenizer.getActiveToken())
```

Output:

```bash
{ Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'This' }
```

5. ### Get next token (sequence [>])

```js
textTokenizer.setNextToken()
console.log(textTokenizer.getActiveToken())
```

Output:

```bash
{ Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'is' }
```

--------------------------------------------------------------------------

```js
import { Tokenizer, WordAndDot } from '@coder-seb/tokenizer'

const textGrammar = new WordAndDot()
const textTokenizer = new Tokenizer(textGrammar, 'This is a string.')

console.log(textTokenizer.getActiveToken())
textTokenizer.setNextToken(3)
console.log(textTokenizer.getActiveToken())
```

Output:

```bash
{ Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'This' }
{ Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'string' }
```

1. ### Get previous token (sequence [<])

```js
import { Tokenizer, WordAndDot } from '@coder-seb/tokenizer'

const textGrammar = new WordAndDot()
const textTokenizer = new Tokenizer(textGrammar, 'This is a string.')

textTokenizer.setNextToken(2)
console.log(textTokenizer.getActiveToken())
textTokenizer.setPreviousToken()
console.log(textTokenizer.getActiveToken())
```

Output:

```bash
{ Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'a' }
{ Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'is' }
```

## Test cases

```powershell
 PASS  test/Tokenizer.test.js
  Tokenizer tests
    Text grammar
      √ TC1 input 'a' sequence [] is of token type WORD and value is 'a' (2 ms)
      √ TC2 input 'a aa' sequence [>] is of token type WORD and value is 'aa'
      √ TC3 input 'a.b' sequence [>] is of token type DOT and value is '.'
      √ TC4 input 'a.b' sequence [>>] is of token type WORD and value is 'b'
      √ TC5 input 'aa. b' sequence [>>] is of token type WORD and value is 'b'
      √ TC6 input 'a .b' sequence [>><] is of token type DOT and value is '.' (1 ms)
      √ TC7 input '' sequence [] is of token type END and value is 'END'
      √ TC8 input ' ' sequence [] is of token type END and value is 'END'
      √ TC9 input 'a' sequence [>] is of token type END and value is 'END'
      √ TC10 input 'a' sequence [<] throws IndexException (14 ms)
      √ TC11 input '!' sequence [] throws InvalidTokenException (1 ms)
    Arithmetic grammar
      √ TC12 input '3' sequence [] is of token type NUMBER and value is '3' (1 ms)
      √ TC13 input '3.14' sequence [] is of token type NUMBER and value is '3.14'
      √ TC14 input '3 + 54 * 4' sequence [>>>] is of token type MUL and value is '*'
      √ TC15 input '3+5 # 4' sequence [>>>] throws InvalidTokenException (1 ms)
      √ TC16 input '3.0+54.1     + 4.2' sequence [><>>>] is of token type ADD and value is '+' (1 ms)
      √ TC17 input '-' sequence [] is of token type SUB and value is '-'
      √ TC18 input '/' sequence [] is of token type DIV and value is '/' (1 ms)
      √ TC19 input ')(' sequence [>] is of token type OPENING and value is '('
      √ TC20 input '3(5-2)' sequence [>>>>>] is of token type CLOSING and value is ')' (1 ms)
      √ TC21 input '3 = 4 - 1' sequence [>] is of token type EQUAL and value is '='
    Maximal munch grammar
      √ TC22 input '3.14' sequence [] is of token type FLOAT and value is '3.14' (1 ms)
      √ TC23 input '6 3.14' sequence [] is of token type INTEGER and value is '6'
    Exclamation grammar
      √ TC24 input ' ! ' sequence [] is of token type EXCLAMATION and value is '!'
    Additional coverage tests
      √ TC25 input 'Hello World.' after sequence [>>] getTokens() returns array:
      [
        { Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'Hello' },
        { Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'World' },
        { Token: 'DOT', Regex: /^\./, Value: '.' },
        { Token: 'END', Regex: 'END', Value: 'END' }
      ] (1 ms)
      √ TC26 input 'Hello World.' after sequence [>>] getTokenLength() returns 4 including the END token.
      √ TC27 input 'Hello World.' after sequence [>>] hasNextToken() returns
        true as next token should be an END token. (1 ms)
      √ TC27 input 'Hello World.' after sequence [>>>] hasNextToken() returns
        false.

Test Suites: 1 passed, 1 total
Tests:       28 passed, 28 total
Snapshots:   0 total
Time:        0.773 s, estimated 1 s
Ran all test suites.
```
