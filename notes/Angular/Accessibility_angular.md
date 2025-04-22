# Accessibilità in Angular

[WCAG](https://www.w3.org/TR/WCAG22) = Web Content Accessibility Guidelines (WCAG 2.2 è del 10/2023) sono linee guida internazionali per aumentare il livello di accessibilità dei siti web. Da notare che paesi differnti possono avere leggi/requisiti diverse in merito all'accessibilità. In europa abbiamo la EAA mentre in Italia la direttiva 2016/2102 che richiede che i siti web e le applicazioni mobili delle organizzazioni del settore pubblico siano accessibili.


Con Accessibilità si intende la possibilità di accedere a un sito web o ad un'applicazione web da parte di persone con disabilità. 

Tipi di disabilità:
- visually impaired (non vedenti) ->  screen reader / braille keyboard
- colorblindness (daltonismo) -> color contrast
- hearing impairement (non udenti) -> captions
- neurodivergent (autismo, ADHD) -> semplificare il layout, evitare animazioni, ecc
- mobility impairement (paralisi) -> keyboard navigation (tabindex) tramite TAB, Arrow keys, ENTER, ESC e space
- temporary disability (fracture) -> voice commands

Barriere all'accessibilità:
- poor contrast 
- si usano solo colori per indicare informazioni
- mancanza di testi alternativi per immagini
- mancanza di descrizioni per i link
- no captions for videos
- navigazione tramite mouse
- form malamente progettati

le linee guida WCAG hanno tre Level of Conformance:
- A: essential support
- AA: ideal support (governament and public website)
- AAA: specialized support (porzioni di siti che servono persone con disabilità)

A livello mondiale il 15% della popolazione ha una qualche forma di disabilità ad un certo punto della vita. Un sito accessibile è un sito + navigabile e + usabile per tutti.

## Tool
I tool sono speso operating system and browser specific. Windows e MAc hanno screen readers integrati (Narrator e VoiceOver) mentre per Linux c'è Orca. Per i browser Chrome ha ChromeVox, Firefox ha NVDA e Safari ha VoiceOver.

il tab salta il testo e dà il focus ad elementi con cui si può interagire (bottoni e controlli di form) mentre lo screen reader legge il testo.

PLugin:
- AXE Devtools (a pagamento)
- Google Lighthouse
- WAVE (web accessibility evaluation tool) FREE
- Microsoft Accessibility Insights for web



## Links
-[corso PLuralisght](https://app.pluralsight.com/library/courses/angular-accessibility/table-of-contents)
- [codice corso](https://github.com/lara-newsom/angular-accessibility)