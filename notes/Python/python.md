# Python Cheatsheet

## Indice
 - [Variabili](#variabili)
 - [Operatori](#operatori)
   - [Operatori Aritmetici](#operatori-aritmetici)
   - [Operatori di Confronto](#operatori-di-confronto)
   - [Operatori Logici](#operatori-logici)
   - [Operatori di Assegnazione](#operatori-di-assegnazione)
   - [Operatori di Identità](#operatori-di-identità)
   - [Operatori di Appartenenza](#operatori-di-appartenenza)
 - [Liste e principali metodi](#liste-e-principali-metodi)
 - [Tuple e Range](#tuple-e-range)
- [Dizionari e principali metodi](#dizionari-e-principali-metodi)
- [Insiemi e principali metodi](#insiemi-e-principali-metodi)
- [Funzioni](#funzioni)
- [Gestione delle eccezioni](#gestione-delle-eccezioni)
- [Programmazione Orientata agli Oggetti (OOP)](#programmazione-orientata-agli-oggetti-oop)

## Variabili

Le variabili si dichiarano semplicemente con il nome e il valore assegnato. Python è un linguaggio a tipizzazione dinamica, quindi non è necessario dichiarare il tipo di variabile.
```python

x = 10      # Intero
pi = 3.14   # Virgola mobile
name = "Alice"  # Stringa
is_valid = True  # Booleano è True o False

# Assegnazione multipla
x, y, z = 1, 2, 3

a = b = c = 42  # Tutti hanno lo stesso valore
```

## Operatori
Abbiamo le seguenti tipologie di operatori:
### Operatori Aritmetici
```python
x + y  # Addizione
x - y  # Sottrazione
x * y  # Moltiplicazione
x / y  # Divisione
x // y # Divisione intera
x % y  # Modulo (resto)
x ** y # Potenza
```

### Operatori di Confronto
```python
x == y  # Uguaglianza
x != y  # Diverso
x > y   # Maggiore
x < y   # Minore
x >= y  # Maggiore o uguale
x <= y  # Minore o uguale
```

### Operatori Logici
```python
x and y  # AND logico
x or y   # OR logico
not x    # Negazione
```

### Operatori di Assegnazione
```python
x += 1  # Equivalente a x = x + 1
x -= 1  # Equivalente a x = x - 1
x *= 2  # Equivalente a x = x * 2
x /= 2  # Equivalente a x = x / 2
x //= 2 # Equivalente a x = x // 2
x %= 2  # Equivalente a x = x % 2
x **= 2 # Equivalente a x = x ** 2
```

### Operatori di Identità
```python
x is y     # True se x e y sono lo stesso oggetto
x is not y # True se x e y sono oggetti diversi
```

### Operatori di Appartenenza
```python
x in lista     # True se x è in lista
x not in lista # True se x non è in lista

# Esempio
numeri = [1, 2, 3, 4, 5]
trovato = 2 in numeri  # True
```

## Liste e principali metodi
Si crea una lista con:
```python
numeri = [1, 2, 3, 4, 5]
nomi = ["Alice", "Bob", "Charlie"]

# Aggiunta di elementi
numeri.append(6)  # Aggiunge 6 alla fine
numeri.insert(2, 10)  # Inserisce 10 in posizione 2

# Rimozione di elementi
numeri.remove(3)  # Rimuove il primo valore 3 trovato
ultimo = numeri.pop()  # Rimuove e restituisce l'ultimo elemento
primo = numeri.pop(0)  # Rimuove e restituisce il primo elemento

trovato = 2 in numeri  # Controlla se 2 è presente nella lista

# Ordinamento e inversione
numeri.sort()  # Ordina la lista in ordine crescente
numeri.reverse()  # Inverte l'ordine della lista

# Ottenere la lunghezza della lista
lunghezza = len(numeri)

# Iterazione su una lista
for num in numeri:
    print(num)
```

## Tuple e Range

```python
# Creazione di una tupla
coordinate = (10, 20)
nomi = ("Alice", "Bob", "Charlie")

# Accesso agli elementi
a = coordinate[0]

# Range
range_obj = range(5)  # Crea un intervallo da 0 a 4
range_list = list(range(1, 10, 2))  # Converte in lista con step di 2
```

## Dizionari e principali metodi
I dizionario sono collezioni di elementi chiave-valore.
```python
# Creazione di un dizionario
dati = {"nome": "Alice", "età": 25, "città": "Roma"}

# Accesso ai valori
nome = dati["nome"]
eta = dati.get("età")

# Aggiunta/Modifica valori
dati["professione"] = "Ingegnere"
dati.update({"nazionalità": "Italiana"})

# Rimozione di elementi
del dati["città"]
età = dati.pop("età")

'tutte_le_chiavi = dati.keys()  # Ottiene le chiavi
'tutti_i_valori = dati.values()  # Ottiene i valori
tutti_gli_elementi = dati.items()  # Ottiene coppie chiave-valore

# Iterazione su un dizionario
for chiave, valore in dati.items():
    print(f"{chiave}: {valore}")
```


```markdown
# Python Cheatsheet

## Variabili

```python
# Dichiarazione di variabili
x = 10      # Intero
pi = 3.14   # Virgola mobile
name = "Alice"  # Stringa
is_valid = True  # Booleano

# Assegnazione multipla
x, y, z = 1, 2, 3

a = b = c = 42  # Tutti hanno lo stesso valore
```

## Operatori

### Operatori Aritmetici
```python
x + y  # Addizione
x - y  # Sottrazione
x * y  # Moltiplicazione
x / y  # Divisione
x // y # Divisione intera
x % y  # Modulo (resto)
x ** y # Potenza
```

### Operatori di Confronto
```python
x == y  # Uguaglianza
x != y  # Diverso
x > y   # Maggiore
x < y   # Minore
x >= y  # Maggiore o uguale
x <= y  # Minore o uguale
```

### Operatori Logici
```python
x and y  # AND logico
x or y   # OR logico
not x    # Negazione
```

### Operatori di Assegnazione
```python
x += 1  # Equivalente a x = x + 1
x -= 1  # Equivalente a x = x - 1
x *= 2  # Equivalente a x = x * 2
x /= 2  # Equivalente a x = x / 2
x //= 2 # Equivalente a x = x // 2
x %= 2  # Equivalente a x = x % 2
x **= 2 # Equivalente a x = x ** 2
```

### Operatori di Identità
```python
x is y     # True se x e y sono lo stesso oggetto
x is not y # True se x e y sono oggetti diversi
```

### Operatori di Appartenenza
```python
x in lista     # True se x è in lista
x not in lista # True se x non è in lista
```

## Liste e principali metodi

```python
# Creazione di una lista
numeri = [1, 2, 3, 4, 5]
nomi = ["Alice", "Bob", "Charlie"]

# Aggiunta di elementi
numeri.append(6)  # Aggiunge 6 alla fine
numeri.insert(2, 10)  # Inserisce 10 in posizione 2

# Rimozione di elementi
numeri.remove(3)  # Rimuove il primo valore 3 trovato
ultimo = numeri.pop()  # Rimuove e restituisce l'ultimo elemento
primo = numeri.pop(0)  # Rimuove e restituisce il primo elemento

'trovato = 2 in numeri  # Controlla se 2 è presente nella lista

# Ordinamento e inversione
numeri.sort()  # Ordina la lista in ordine crescente
numeri.reverse()  # Inverte l'ordine della lista

# Ottenere la lunghezza della lista
lunghezza = len(numeri)

# Iterazione su una lista
for num in numeri:
    print(num)
```

## Tuple e Range

```python
# Creazione di una tupla
coordinate = (10, 20)
nomi = ("Alice", "Bob", "Charlie")

# Accesso agli elementi
a = coordinate[0]

# Range
range_obj = range(5)  # Crea un intervallo da 0 a 4
range_list = list(range(1, 10, 2))  # Converte in lista con step di 2
```

## Dizionari e principali metodi

```python
# Creazione di un dizionario
dati = {"nome": "Alice", "età": 25, "città": "Roma"}

# Accesso ai valori
nome = dati["nome"]
eta = dati.get("età")

# Aggiunta/Modifica valori
dati["professione"] = "Ingegnere"
dati.update({"nazionalità": "Italiana"})

# Rimozione di elementi
del dati["città"]
età = dati.pop("età")

'tutte_le_chiavi = dati.keys()  # Ottiene le chiavi
'tutti_i_valori = dati.values()  # Ottiene i valori
tutti_gli_elementi = dati.items()  # Ottiene coppie chiave-valore

# Iterazione su un dizionario
for chiave, valore in dati.items():
    print(f"{chiave}: {valore}")
```

## Insiemi e principali metodi

```python
# Creazione di un insieme
numeri = {1, 2, 3, 4, 5}

# Aggiunta e rimozione di elementi
numeri.add(6)
numeri.remove(3)  # Genera un errore se l'elemento non esiste
numeri.discard(10)  # Non genera errore se l'elemento non esiste

# Operazioni sugli insiemi
A = {1, 2, 3}
B = {3, 4, 5}

unione = A | B  # {1, 2, 3, 4, 5}
intersezione = A & B  # {3}
differenza = A - B  # {1, 2}
differenza_simmetrica = A ^ B  # {1, 2, 4, 5}
```

## Funzioni

```python
# Definizione di una funzione
def saluta(nome):
    return f"Ciao, {nome}!"

# Chiamata di una funzione
print(saluta("Alice"))

# Funzioni con parametri di default
def potenza(base, esponente=2):
    return base ** esponente

print(potenza(3))  # 9
print(potenza(3, 3))  # 27

# Funzioni con argomenti variabili
def somma(*numeri):
    return sum(numeri)

print(somma(1, 2, 3, 4))  # 10

# Funzioni con parametri chiave-valore
def descrivi_persona(nome, **dettagli):
    print(f"Nome: {nome}")
    for chiave, valore in dettagli.items():
        print(f"{chiave}: {valore}")

descrivi_persona("Alice", età=25, città="Roma")
```



## Gestione delle eccezioni

```python
try:
    x = 10 / 0  # Genera un errore
except ZeroDivisionError:
    print("Errore: divisione per zero")
except Exception as e:
    print(f"Errore generico: {e}")
else:
    print("Nessun errore")
finally:
    print("Blocco eseguito sempre")

## Programmazione Orientata agli Oggetti (OOP)

```python
# Definizione di una classe
class Persona:
    def __init__(self, nome, eta):
        self.nome = nome
        self.eta = eta

    def saluta(self):
        return f"Ciao, mi chiamo {self.nome} e ho {self.eta} anni."

# Creazione di un oggetto
p1 = Persona("Alice", 25)
print(p1.saluta())

# Ereditarietà
class Studente(Persona):
    def __init__(self, nome, eta, corso):
        super().__init__(nome, eta)
        self.corso = corso

    def info_corso(self):
        return f"Studio {self.corso}."

s1 = Studente("Bob", 22, "Informatica")
print(s1.saluta())
print(s1.info_corso())

# Metodi speciali
class Contatore:
    def __init__(self, valore=0):
        self.valore = valore

    def __str__(self):
        return f"Valore attuale: {self.valore}"

    def __add__(self, altro):
        return Contatore(self.valore + altro.valore)

c1 = Contatore(10)
c2 = Contatore(5)
c3 = c1 + c2  # Usa il metodo __add__
print(c3)  # "Valore attuale: 15"
```


## Moduli
I moduli permettono di organizzare il codice in file separati e riutilizzabili.
```python
# Creazione di un modulo (esempio: mio_modulo.py)
def saluta(nome):
    return f"Ciao, {nome}!"

PI = 3.14159
```
Per importare un modulo:
```python
import mio_modulo

# oppure solo alcune funzioni
from mio_modulo import saluta, PI


print(mio_modulo.saluta("Alice"))
print(mio_modulo.PI)

# con alias
import mio_modulo as mm

print(mm.saluta("Charlie"))
```

### Moduli Built in
```python
import math
print(math.sqrt(16))  # 4.0

import random
print(random.randint(1, 10))  # Numero casuale tra 1 e 10

import datetime
print(datetime.datetime.now())  # Data e ora attuale

import os
print(os.getcwd())  # Directory corrente

