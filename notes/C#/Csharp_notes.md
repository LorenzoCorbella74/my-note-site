# C#

E' un linguaggio di programmazione general purpose ***statically types*** facente parte del framework .NET di Microsoft progettato nel 2000 da Anders Hejlsberg come un linguaggio moderno C like OOP (open source dal 2014) che può essere usato per creare:
- applicazioni desktop tramite .NET Core
- applicazioni mobile tramite XAMARIN
- Web app tramite Blazor
- Video games con Unity

Può essere utilizzato per costruire app fuori dal .NET Framework. Il codice C# è compilato in un codice intermedio detto CIL che può essere interpretato dal Command language runtime (CLR) che può essere eseguito come codice nativo in qualsiasi sistema operativo senza biosgno di essere ricompilato.

E' usato come linguaggio Object oriented ma supporta pattern funzionali (lambda expression) e ha la capacità di eseguire delle query dichiarative su qualsiasi struttura dati tramite una feature chiamata ***LINQ***.

E' un linguaggio ***Memory safe*** grazie alla garbage collection anche se permette di avere un contesto "non sicuro" tramite pointers che permettono di allocare memoria.

## Installazione 

Scaricare l'ultima versione del [.NET SDK](dotnet.microsoft.com/download) che permette di avere la command line tools. Verificare l'installazione con: `> dotnet --version`

## IDE
Per lo sviluppo di software con C# , invece del + completo ma + pesante Visual Studio, è possibile usare VSC facilitandosi con le seguenti estensioni:
- `C#` (by Microsoft)
- `Azure Repos` per lavorare con Devops
- `Visual studio Intellicode` è built-in in Visual Studio
- `Nuget Package Manager` che permette di aggiungere/togliere le referenze dei pacchetti .NET dai .csproj/fsproj.


Per ovviare a tutto ciò che manca rispetto a VS (solutions, templates, new projects) si deve usare i seguenti comandi da console [.NET Core command-line Interface tools](https://docs.microsoft.com/it-it/dotnet/core/tools/):
- è possibile creare progetti di tanti tipi (api, console, library, web apps, etc) con il comando `> dotnet new console -o app` specificando l'output in una cartella "app".
- per creare un progetto (con solution file): `> dotnet new sln -n "VSCodeIntroSln"`, poi si può creare un progetto di tipo console tramite il comando `> dotnet new console -n "IntroUI"` oppure un progetto di tipo libreria con `> dotnet new classlib -n "IntroLibrary"` dove -n specifica il nome. 
- Sempre nella cartella padre si può legare la solution ai due progetti con: `> dotnet sln VSCodeIntroSln.sln add /IntroUI/IntroUI.csproj` e mettendo manualmente tutti i progetti oppure in bash `> dotnet sln VSCodeIntroSln.sln add **/*.csproj`.
- per specificare che il progetto di UI referenzia la library (cioè userà delle classi della library) si può specificare con `> dotnet add IntroUI/IntroUI.csproj reference IntroLibrary/IntroLibrary.csproj`.
- dentro le cartelle dei progetti si può aprire VSC con: `> code .` cliccando YES nel popup "Required asset to build and debug are missing from [nome-cartella]. Add them?" che permette di avviare e debuggare i progetti tramite comandi di VSC (aggiungendo  `tasks.json` e `launch.json` dentro la cartella nascosta .vscode).
- Per far girare il codice `> dotnet run` oppure premendo F5 per avere il debug tramite VSC. Nella console di VSC è inoltre possibile scrivendo .NET ricevere il comando ".NET: Generate Asset for build and Debug" che rigenera la cartella .vscode.
- per compilare il codice si usa il comando: `> dotnet build`


Per importare l'ultima versione dei packages da Nuget si usa: `> dotnet add package [nome_package]`. La lista delle dipendenze del progetto sarà visibile nel file `Introlibrary.csproj` che conterrà sia dipendenze locali che esterne: `> dotnet build`
```xml
<Project Sdk="Microsoft.NET.Sdk">

  <ItemGroup>
    <ProjectReference Include="..\IntroLibrary\IntroLibrary.csproj" />
  </ItemGroup>

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>netcoreapp3.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Dapper" Version="2.0.4" />
  </ItemGroup>
</Project>
```
E' possibile anche aprire la console di VSC scrivere Nuget e scpecificare il [nome_package] e la versione ed in quale progetto si vuole metterlo.

### Notes
- CTRL + SPACE per intellisense
- shortcut `cw` scrive `System.Console.WriteLine()`
- Per template str `System.Console.WriteLine($"{p.firstName} is my name")`
- Per input utente `System.Console.ReadLine()`
- TYPE NAME VALUE
- di default un valore non può essere null ma si può specificare: `string? hello = null`

