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
console.log(textTokenizer.getNextToken())
```

Output:

```bash
{ Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'is' }
```

--------------------------------------------------------------------------

```js
console.log(textTokenizer.getNextToken())
console.log(textTokenizer.getActiveToken())
```

Output:

```bash
{ Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'is' }
{ Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'is' }
```

--------------------------------------------------------------------------

```js
import { Tokenizer, WordAndDot } from '@coder-seb/tokenizer'

const textGrammar = new WordAndDot()
const textTokenizer = new Tokenizer(textGrammar, 'This is a string.')

console.log(textTokenizer.getActiveToken())
console.log(textTokenizer.getNextToken(3))
```

Output:

```bash
{ Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'This' }
{ Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'string' }
```

6. ### Get previous token (sequence [<])

```js
import { Tokenizer, WordAndDot } from '@coder-seb/tokenizer'

const textGrammar = new WordAndDot()
const textTokenizer = new Tokenizer(textGrammar, 'This is a string.')

console.log(textTokenizer.getNextToken(2))

console.log(textTokenizer.getPreviousToken())
```

Output:

```bash
{ Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'a' }
{ Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'is' }
```

## Test cases

```powershell
  Tokenizer tests
    Text grammar
      √ TC1 input 'a' sequence [] is of token type WORD and value is 'a' (3 ms)
      √ TC2 input 'a aa' sequence [>] is of token type WORD and value is 'aa'
      √ TC3 input 'a.b' sequence [>] is of token type DOT and value is '.' (1 ms)
      √ TC4 input 'a.b' sequence [>>] is of token type WORD and value is 'b'
      √ TC5 input 'aa. b' sequence [>>] is of token type WORD and value is 'b' (1 ms)
      √ TC6 input 'a .b' sequence [>><] is of token type DOT and value is '.'
      √ TC7 input '' sequence [] is of token type END and value is 'END'
      √ TC8 input ' ' sequence [] is of token type END and value is 'END'
      √ TC9 input 'a' sequence [>] is of token type END and value is 'END'
      √ TC10 input 'a' sequence [<] throws IndexException (13 ms)
      √ TC11 input '!' sequence [] throws InvalidTokenException
    Arithmetic grammar
      √ TC12 input '3' sequence [] is of token type NUMBER and value is '3'
      √ TC13 input '3.14' sequence [] is of token type NUMBER and value is '3.14'
      √ TC14 input '3 + 54 * 4' sequence [>>>] is of token type MUL and value is '*'
      √ TC15 input '3+5 # 4' sequence [>>>] throws InvalidTokenException
      √ TC16 input '3.0+54.1     + 4.2' sequence [><>>>] is of token type ADD and value is '+' (1 ms)
      √ TC17 input '-' sequence [] is of token type SUB and value is '-' (1 ms)
      √ TC18 input '/' sequence [] is of token type DIV and value is '/'
      √ TC19 input ')(' sequence [>] is of token type OPENING and value is '(' (1 ms)
      √ TC20 input '3(5-2)' sequence [>>>>>] is of token type CLOSING and value is ')'
      √ TC21 input '3 = 4 - 1' sequence [>] is of token type EQUAL and value is '='
    Maximal munch grammar
      √ TC22 input '3.14' sequence [] is of token type FLOAT and value is '3.14' (1 ms)
      √ TC23 input '6 3.14' sequence [] is of token type INTEGER and value is '6'
    Exclamation grammar
      √ TC24 input ' ! ' sequence [] is of token type EXCLAMATION and value is '!'

Test Suites: 1 passed, 1 total    
Tests:       24 passed, 24 total  
Snapshots:   0 total
Time:        0.58 s, estimated 1 s
Ran all test suites.
```
