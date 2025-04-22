# COMPILER

1) analisi lessicale (tokenization o lexer): si separano le parole (token) separate da spazi assegnandoli posizione e tipo (ogni linguaggio è formato da syntax types, string, number, operator, etc)

2) analisi sintattica (parsing): si scorrono tutti i token cercando delle relazioni tra essi, raggruppandoli in base a regole e costruendo un AST (Abstract Syntax tree); 

3) transformation: si trasforma la struttura dell'AST in qualcosa di usabile, 

4) code generator (compiled result, l'exe quanso si compila c code): si genera il risultato utilizzando il risultato della trasformazione.


All'interno del compiler si può usare la recursion e il traversal se richiesto (come per parsare oggetti json).

Se le espressioni regolari sono ottime per validare e trovare pattern all'interno di stringhe, ma non sono adatte a strutture ricorsive. Per queste si usano le "context free grammars o CFG" di cui si hanno due tipi:
- EXtended bachus naur Form basate su production rules
- Parsing Expression Grammer (PEG) che descrivono le CFG in termini di "recognition rules"