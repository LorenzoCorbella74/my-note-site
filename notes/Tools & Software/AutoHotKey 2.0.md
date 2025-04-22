[AutoHotKey](https://www.autohotkey.com/) è uno scripting language per l'automazione di Windows. All'interno della cartella `C:\ProgramData\Microsoft\Windows\Start Menu\Programs` ci sta la AutoHotKey Dash che è un software che gestisce gli script contenuti in una cartella preimpostata. L'utente **tramite una combinazione di tasti** trigghera degli script che eseguono delle successioni di comandi.

### Commenti
All'interno dei file `.ahk` è possibile specificare i commenti iniziando una riga con " ; ".
## Hotstrings

Abbiamo i seguenti caratteri speciali:
- ^ = CTRL
- + = SHIFT
- !   = ALT
- '# = Win key
- LButton = Mouse SX
- RButton = MouseDX
- MButton = btn centrale mouse
- WheelUp e WheelDown = rotella del mouse
```
#Requires AutoHotkey v2.0
#SingleInstance Force

!x:: msgbox  "hello" // premendo ALT + x si apre un popup

^LButton::MsgBox "Premuto il tasto CTRL + Click sinistro"

// esempio di text expander (hotstrings)
::eee::ing.lorenzo.corbella@gmail.com   

// esempio di apertura programmi
#c::Run "C:\Program Files\Google\Chrome\Application\chrome.exe"

// a volte sa i nomi dei programmi e non c'è bisogno di mettere il path
#c::Run "chrome"

// apre un link nel default browser
#y::Run "https://www.youtube.com"

// aprire cartelle
#z::Run "C:\DEV"

// la variabile A_Username permette di avere l'username corrente quindi le successive sono uguali
// #d::Run "c:\Users\lorenzo.corbella\Downloads\"
#d::Run "c:\Users\"A_Username"\Downloads\"

// apre il file di script nell'editor di codice impostato
#a::Edit
```

I comandi Run e Send sono in realtà delle built-in [function](.Functions)
NB: 
- Basta scrivere `A_` all'interno di file `.ahk` e verranno suggerite tutte le variabili globali del sistema.
- **attenzione** che quando si è aggiornato uno script, nella system tray, si deve cliccare con il tasto DX sulla AutoHotKey Dash e premere `Reload script`. E' possibile anche utilizzare uno script per evitare di dover tutte le volte refreshare.
- nella system tray sempre tramite tasto DX si può vedere i programmi aperti nella voce di menù `Windows spy`
- quando abbiamo molte istruzioni in serie si usano le { } per raggruppare successioni di comandi
- i comandi sono dichiarati riga per riga (senza separazioni quali ; o altro, ma solo premendo Enter)  

## Send Hotkeys
E' possibile mandare del testo ==o anche comandi==(come se fosse stato inserito con la tastiera)  con il comando **Send**:
```
+^,::Send A_DD "/" A_MM "/" A_YYYY
```

## Macros
E' possibile automatizzare i Keyboard Inputs ed i botton press, quindi tutti i software che hanno delle scorciatoie da tastiera possono essere automatizzati!!.
```
// certi hot keys sono specifici per programmi
// pertanto la riga sotto lavorerà solo con Acrobat reader
#Hotif WinActive("ahk_exe Acrobat.exe")
+f::{
	MouseClick "left"
	MouseClick "left"
	A_Clipboard :=""
	Send "^c"
	ClipWait 1  // per rendere la clipboard affidabile
	WinActivate("ahk_exe Excel.exe")
	WinWaitActive("ahk_exe Excel.exe")
	Send "^v"
	Sleep 100
	Send "{Down}"
	WinActivate("ahk_exe Acrobat.exe")
	WinWaitActive("ahk_exe Acrobat.exe")
	Send "^w" // per chiudere il current TAB si acrobat
}
```
## Functions
AutoHotKey  è uno scripting language con funzioni, variabili, etc.

```
// dichiarazione di funzione
SendSleep(input, pause)
{
	Send input
	Sleep pause
}

// oppure con parametri opzionali aventi default
SendSleep(input, pause:=100)
{
...
}

// esempio di invocazione
SendSleep "1", 100
```

Le funzioni non hanno bisogno di essere dichiarate prima di essere usate. I parametri di output hanno come prefisso la lettera `&`. La concatenazione di stringhe avviene tramite `spazio`.
```
CopyClipboard()
{
	A_Clipboard :=""
	Send "^c"
	ClipWait 1
}

#HotIf WinActive("ahk_exe explorer.exe")
!+r::{
	CopyClipboard
	inputedName := InputBox("Type new name").value
	loop parse A_Clipboard, '`n', '`r' {
		counter++
		SplithPath A_LoopField, , &folder, &fileExtension
		newFullFilePath := folder '\' inputedName ' ' counter '.' fileExtension
		FileMove A_LoopField, newFullFilePath
	}
}
```

## Conditionals
```
#hotif
xButton2 & LButton:: "Premuto il tasto xbutton2 + Click sinistro"

xbutton2 & w::{cd C:\Projects\SISAP\SISAP-FE
	If WinExist("ahk_exe chrome.exe")
		WinActivate("ahk_exe chrome.exe") 
	Else
	    Run "chrome"
	}
```

## Mouse Macros
A volte è necessario automatizzare il movimento ed l'azione di click del mouse. L'idea è minimizzare tale attività in quanto è legata alle dimensioni dello schermo: se questo cambia allora lo script fallisce. Tramite Window Spy è possibile recuperare le posizioni del mouse 
```
	#z::{
		MouseGetPos &x, &y
		A_Clipboard := x "," y
		SoundBeep 500, 500
	}

// E' possibile settare i valori di dove è stato cliccato il mouse con 
// MouseClick "Left", 1806, 1010
// Sleep 100

```

Per eseguire gli script automaticamente all'avvio del PC si deve mettere un collegamento dello script dentro la cartella `C:\Users\lorenzo.corbella\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup` 

Per convertire AutoHotKey dalla passata V1 all'attuale V2 esiste un [convertitore online ](https://github.com/mmikeww/AHK-v2-script-converter)


## Links
- [Documentazione ufficiale](https://www.autohotkey.com/docs/v2/)
- [Tutorial youtube](https://www.youtube.com/watch?v=pT4BRiOEVY0&ab_channel=TutoByte)
- [Tutorial youtube code](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbnVpOVpDdXdFaUdHZ3hfQTUtaTF0bHkxbDY2QXxBQ3Jtc0ttWXQtcDItakdKcS16Uk45LVVKTHFCaFg4SzRENlZ4VTF0bmVHdjNwYUFMU0JmRjRBV0VPZFUtdkJFVEl1VTBZOEZFTllSTVFEa2tESDg0WW5NUW93LXJDSFdyQlpZMXl6d3Z5QkFiYndmNEd3bER6MA&q=https%3A%2F%2Fpastebin.com%2F8nmHpmKf&v=pT4BRiOEVY0)


cd C:\Projects\SISAP\SISAP-FE
code .
ng serve --open
cd c:\Projects\SISAP\SISAP-BE\SISAP\SISAP.WebApi
dotnet run --launch-profile https


