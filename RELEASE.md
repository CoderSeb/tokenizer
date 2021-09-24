# Mall för inlämning laboration 1, 1dv610

## Checklista
  - [x] I min tokeniserare finns inga tokentyper eller reg-exp. Dessa finns i mitt testprojekt eftersom de skapas utav användaren.
  - [x] Jag har skrivit all kod och reflektioner själv. Jag har inte använt mig av andras kod för att lösa uppgiften.
  - [x] Mina testresultat är skrivna utifrån utförd testning ( och inte teoretiskt, det bör fungera :) )
  - [x] De enda statiska metoder eller funktioner utanför klasser som jag har är för att starta upp min testapplikation ex main(java).
  - [x] De enda bibliotek och färdiga klasser som används är sådana som måste användas (eller som används för att testa modulen).

## Egenskattning och mål
  - [ ] Jag är inte klar eftersom jag vet att jag saknar något. Då skall du inte lämna in!
  - [ ] Jag eftersträvar med denna inlämning godkänt betyg (E-D)
    - [ ] De flesta testfall fungerar
    - [ ] Koden är förberedd på Återanvändning
    - [ ] All kod samt historik finns i git 
    - [ ] Kodkvaliterskraven är ifyllda
    - [ ] Reflektion är skriven
  - [ ] Jag eftersträvar med denna inlämning högre betyg (C-B) och anser mig uppfylla alla extra krav för detta. 
    - [ ] Samtliga testfall är skrivna
    - [ ] Egna testfall för Maximal munch och kantfall
    - [ ] Testfall är automatiserade
    - [ ] Det finns en tydlig beskrivning i hur modulen skall användas (i git)
    - [ ] Kodkvalitetskraven är varierade 
  - [x] Jag eftersträvar med denna inlämning högsta betyg (A) 

Förtydligande: Examinator kommer sätta betyg oberoende på vad ni anser. 

## Återanvändning

Beskriv hur du anpassat din kod och instruktioner för att någon annan programmerare skall kunna använda din tokenizer. Om du skrivit instruktioner för din användare länka till dessa. Om inte beskriv här hur någon skall göra för att använda din kod med sin egen grammatik.

Koden finns på [NPM](www.npmjs.com), [GitHub](https://github.com/CoderSeb/tokenizer) och [GitLab](https://gitlab.lnu.se/1dv610/student/sa224ny/l1).

Instruktioner finns i [README.md](README.md)

## Beskrivning av min kod

Beskriv din kod på en hög abstraktionsnivå. En kort beskrivning av dina viktigaste klasser och metoder. Skapa gärna ett klassdiagram som bild.
Den klart viktigaste klassen är Tokenizer som innehar all funktionalitet för att skapa tokens. Utöver det finns en Grammar klass som extendas av samtliga specifika grammatiker.
Tydliga exempel finns beskrivning som förklarar hur en användare kan skapa sin egen grammatik.
// TODO: Fortsätt här!

## Hur jag testat

Automatiska tester med jest, som körs genom ````npm test````.

````Powershell
  PASS  test/Tokenizer.test.js
  Tokenizer tests
    Text grammar
      √ TC1 input 'a' sequence [] is of token type WORD and value is 'a' (1 ms)
      √ TC2 input 'a aa' sequence [>] is of token type WORD and value is 'aa'
      √ TC3 input 'a.b' sequence [>] is of token type DOT and value is '.'
      √ TC4 input 'a.b' sequence [>>] is of token type WORD and value is 'b'
      √ TC5 input 'aa. b' sequence [>>] is of token type WORD and value is 'b'
      √ TC6 input 'a .b' sequence [>><] is of token type DOT and value is '.'
      √ TC7 input '' sequence [] is of token type END and value is 'END' (1 ms)
      √ TC8 input ' ' sequence [] is of token type END and value is 'END'
      √ TC9 input 'a' sequence [>] is of token type END and value is 'END' (1 ms)
      √ TC10 input 'a' sequence [<] throws IndexException (13 ms)
      √ TC11 input '!' sequence [] throws InvalidTokenException
    Arithmetic grammar
      √ TC12 input '3' sequence [] is of token type NUMBER and value is '3'
      √ TC13 input '3.14' sequence [] is of token type NUMBER and value is '3.14'
      √ TC14 input '3 + 54 * 4' sequence [>>>] is of token type MUL and value is '*' (1 ms)
      √ TC15 input '3+5 # 4' sequence [>>>] throws InvalidTokenException
      √ TC16 input '3.0+54.1     + 4.2' sequence [><>>>] is of token type ADD and value is '+'
      √ TC17 input '-' sequence [] is of token type SUB and value is '-'
      √ TC18 input '/' sequence [] is of token type DIV and value is '/'
      √ TC19 input ')(' sequence [>] is of token type OPENING and value is '('
      √ TC20 input '3(5-2)' sequence [>>>>>] is of token type CLOSING and value is ')'
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
      ]
      √ TC26 input 'Hello World.' after sequence [>>] getTokenLength() returns 4 including the END token.
      √ TC27 input 'Hello World.' after sequence [>>] hasNextToken() returns
        true as next token should be an END token.
      √ TC28 input 'Hello World.' after sequence [>>>] hasNextToken() returns
        false.

Test Suites: 1 passed, 1 total
Tests:       28 passed, 28 total
Snapshots:   0 total
Time:        0.749 s, estimated 1 s
Ran all test suites.
````

### Testfall

Lista de enskilda testfallen. **Fetmarkera** sådant som du själv fyllt i. En rad per testfall.

| Namn | Grammatik         | Sträng               | Sekvens  | Förväntat Aktivt Token    | PASS/FAIL |
| ---- | ----------------- | -------------------- | :------- | ------------------------- | :-------- |
| TC1  | WordAndDotGrammar | "a"                  | []       | WORD("a")                 | PASS      |
| TC2  | WordAndDotGrammar | "a aa"               | [>]      | WORD("aa")                | PASS      |
| TC3  | WordAndDotGrammar | "a.b"                | [>]      | DOT(".")                  | PASS      |
| TC4  | WordAndDotGrammar | "a.b"                | [>>]     | **WORD("b")**             | PASS      |
| TC5  | WordAndDotGrammar | "aa. b"              | **[>>]** | WORD("b")                 | PASS      |
| TC6  | WordAndDotGrammar | "a .b"               | [>><]    | DOT(".")                  | PASS      |
| TC7  | WordAndDotGrammar | ""                   | []       | END                       | PASS      |
| TC8  | WordAndDotGrammar | " "                  | []       | **END**                   | PASS      |
| TC9  | WordAndDotGrammar | "a"                  | **[>]**  | END                       | PASS      |
| TC10 | WordAndDotGrammar | "a"                  | [<]      | **IndexException**        | PASS      |
| TC11 | WordAndDotGrammar | "!"                  | []       | InvalidTokenException     | PASS      |
| TC12 | ArithmeticGrammar | "3"                  | []       | NUMBER("3")               | PASS      |
| TC13 | ArithmeticGrammar | "3.14"               | []       | NUMBER("3.14")            | PASS      |
| TC14 | ArithmeticGrammar | "3 + 54 * 4"         | [>>>]    | MUL("\*")                 | PASS      |
| TC15 | ArithmeticGrammar | "3+5 # 4"            | [>>>]    | **InvalidTokenException** | PASS      |
| TC16 | ArithmeticGrammar | "3.0+54.1     + 4.2" | [><>>>]  | **ADD("+")**              | PASS      |

Du kan tillföra kommentarer om din tokeniserare skiljer sig något från standard. 

### Testfall för högre betyg

Lista de enskilda testfallen. En rad per testfall.
| Namn | Grammatik           | Sträng         | Sekvens                           | Förväntat Aktivt Token           | PASS/FAIL |
| :--- | ------------------- | :------------- | --------------------------------- | :------------------------------- | --------- |
| TC17 | ArithmeticGrammar   | "-"            | []                                | SUB("-")                         | PASS      |
| TC18 | ArithmeticGrammar   | "/"            | []                                | DIV("/")                         | PASS      |
| TC19 | ArithmeticGrammar   | ")("           | [>]                               | OPENING("(")                     | PASS      |
| TC20 | ArithmeticGrammar   | "3(5-2)"       | [>>>>>]                           | CLOSING(")")                     | PASS      |
| TC21 | ArithmeticGrammar   | "3 = 4 - 1"    | [>]                               | EQUAL("=")                       | PASS      |
| TC22 | MaximalMunchGrammar | "3.14"         | []                                | FLOAT("3.14")                    | PASS      |
| TC23 | MaximalMunchGrammar | "6 3.14"       | []                                | INTEGER("6")                     | PASS      |
| TC24 | ExclamationGrammar  | " ! "          | []                                | EXCLAMATION("!")                 | PASS      |
| TC25 | WordAndDotGrammar   | "Hello World." | [>>] and calling getTokens()      | \*Expected output                | PASS      |
| TC26 | WordAndDotGrammar   | "Hello World." | [>>] and calling getTokenLength() | Returns 4 (Including END token.) | PASS      |
| TC27 | WordAndDotGrammar   | "Hello World." | [>>] and calling hasNextToken()   | Returns true                     | PASS      |
| TC28 | WordAndDotGrammar   | "Hello World." | [>>>] and calling hasNextToken()  | Returns false                    | PASS      |

\*TC25 Expected Output:

````Powershell
[
    { Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'Hello' },
    { Token: 'WORD', Regex: /^[\w|åäöÅÄÖ]+/, Value: 'World' },
    { Token: 'DOT', Regex: /^\./, Value: '.' },
    { Token: 'END', Regex: 'END', Value: 'END' }
]
````

## Kodkvalitetskrav

- **Use intention-revealing names**
- **Make meaningful distinctions**
- **Use pronounceable names**
- **Method names**
- **Class names**
- **Don't be cute**
- **Don't pun**

### Namngivning

| Namn och förklaring                                                                            | Reflektion                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tokenizer - Namn på klassen.                                                                   | **Class names** Då klass namn ska vara substantiv och aldrig verb är Tokenizer ett bra klass-namn.                                                                                                                                                     |
| getTokens() - Metod som returnerar samtliga matchade tokens.                                   | **Make meaningful distinctions** Då metoden returnerar samtliga matchade tokens behöver användaren ha stegat igenom hela strängen för att få det totala resultatet. Kanske hade ett bättre namn varit getCurrentMatchedTokens eller getCurrentMatches. |
| getTokenLength() - Metod som returnerar längden på listan av matchade tokens.                  | **Use intention-revealing names** Som ovan returnerar även denna metod endast längden på listan av matchade tokens hittills vilket kan misstolkas av användaren. Förslag på förbättring: getNumberOfCurrentMatches.                                    |
| hasNextToken() - Returnerar true om strängen inte är tom eller om nästa token är en END token. | **Don't be cute** Tydligt metodnamn som man förväntar sig ett true/false ifrån. Ett kortare och för klassen Tokenizer hade endast hasNext() kunnat användas. **Method names** Metodnamn skall vara verb eller verb-fraser vilket hasNextToken är.      |
| setPreviousToken() - Metod som minskar index av listan för tokenmatchningar med -1.            | **Use pronounceable names** Likt övriga metodnamn är detta namn tydligt och förklarar för användaren vad som bör inträffa när metoden kallas.                                                                                                          |

### Funktioner

| Metodnamn                   | Antal rader | Reflektion                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #matchToken()               | 24          | **Do one thing** En funktion eller i detta fall metod bör endast göra en sak. Som man kan misstänka gör denna metod en hel del annat. Det matchar förvisso ett token i den sträng som skickats in men den kallar även på #maximalMunch(), sparar värdet och klipper ut det från strängen. Om strängen här skulle bli tom skickas även ett END token in i arrayen #matchedTokens. Hittas ingen matchning skickas ett Exception token in. Efter flertal omskrivningar av projektet har jag valt att behålla metoden som den är. Man hade dock kunna bryta ut mer funktionalitet i mindre metoder.                                                                                                                                                                                                                |
| setNextToken(sequence)      | 7           | **Function arguments** Denna metod gör två saker, den plussar på index för aktivt token med 1 eller det antal man skriver in som argument och är således *monadisk*. Den kallar även på metoden #matchToken() för att skapa fler matchningar som det nya indexet för aktivt token kan returnera.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| #isException()              | 5           | **Use descriptive names** Med isException() kan man tänka sig ett boolskt returnvärde, detta stämmer dock halvvägs. Den kommer returnera falskt om en token är giltig och inte 'undefined' eller namnet är 'Exception', i dessa fall kastas respektive fel.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| #validateInput(input)       | 5           | Om strängen som skall tokeniseras är helt tom efter .trim() skickas en END token till #tokenMatches. Annars returneras strängen efter en .trim(). Här vill jag åter använda titeln **Do one thing** samt **Use descriptive names** igen då även om metoden är kort så är namnet validateInput ett ganska ganska löst namn och förklarar egentligen inte vad metoden gör, den validerar en input, vilken validering? Efter vilka regler? Metoden validerar endast om strängen är tom eller endast innehåller whitespace. Den adderar även en END token till #tokenMatches(), den funktionaliten kanske borde ligga i en egen metod. Ett bättre namn kunde vara #isBlank(input) och endast returnera true/false samt en metod #addEndToken() så ex. this.input = #isBlank(input) ? #addEndToken() : input.trim() |
| #maximalMunch(tokenMatches) | 1           | **Do one thing** Denna metod gör endast en sak och den gör det bra, den returner det längsta värdet i en array. **Small!** Metoden är liten med sin enstaka rad. Den är också lätt att förstå när man tittar tittar på dess kod. Det man kan reflektera över är namnet, vet alla vad maximal munch är? Ett klart bättre namn hade varit getLongestTokenMatch() eller getLongestMatch().                                                                                                                                                                                                                                                                                                                                                                                                                        |

## Laborationsreflektion
Reflektera över uppgiften utifrån ett kodkvalitetsperspektiv. Använd begrepp ifrån boken. 
