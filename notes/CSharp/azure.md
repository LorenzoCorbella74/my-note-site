# Microsoft Azure: the big picture

Azure è un insieme di 50 servizi cloud forniti come IAAS e PAAS che possono essere scalati in funzione delle esigenze, e costruiti con qualsiasi linguaggio e framework. E' utilizzata dall'85% del Fortune 500 companies ed è uno dei top cloud provider al mondo per IAAS e PAAS (secondo solo al AWS)) e cloud business intelligence.

Si possono fornire servizi cloud (che permettono di contenere e costi, in quanto si paga per quello che si utilizza) come:
- IAAS: infrastructure as a service : il fornitore offre hardware virtuale
- PAAS: Platform as a service: il fornitore provvede all'hardware scalabile e l'utente istallerà OS e svilupperà la sua applicazione
- SAAS: software as a service (ci si sottoscrive ad un software web, come gmail/office365 ad esempio o un servizio che si connette/integra al proprio servizio)

- Compute services: come far girare applicazioni in Azure (virtual machines, App Services(app o API), containers tramite Kubernetes Service(AKS), soluzioni serverless (Azure Functions in C#, JS oppure Logic Apps) o soluzioni ibride ). Si hanno inoltre soluzioni di scheduling di jobs (Batch)
- Data storage: realational db, key/value store, documents db, caches, data lakes, blobs
- Soluzioni per data processing: Machine learning e AI
- Soluzioni per Data Analytics (processare ed analizzare i dati): Data factory, Databrikc, Stream Analytics
- Soluzioni per integrazioni di sistemi: messaging (Service Bus) e Api integration e management, Eventi e Logic App per creare workflows
- Soluzioni di network components: CDN e firewalls to virtual network e Traffic manager
- Manage (soluzioni per gestire applicazioni): opzioni per il monitoring, deploying
- Identities/Sicurezza: Soluzioni per la gestione l'identità nell'applicazioni ed in generale la sicurezza
- Applicazioni mobile, IOT

# Development tools
Si hanno Azure SDKs cross platform in vari linguaggi(PHP,Python, Node.js, Java. .Net, Ryby)
La maggior parte dei servizi hanno REST/Web APIs

# Azure Devops
E' un insieme di strumenti che permettono di seguire tutto il ciclo di vita nello sviluppo del software e contiene:
- Azure boards: tramite delle kanban boards è possibile pianificare e tracciare tutte le Epiche, US, tasks, bugs etc
- Azure Repos dove è possibile conservare i file di progetto e gestirli tramite Git e Team Foundation Version Control Model
- Azure Pipelines che permettono di fare build e rilasciare delle pipeline che permettono di costruire sia su server di Azure o propri server e poi rilasciare il codice in ambienti differenti. Hanno vari tasks per deploiare e rilasciare il codice in diverse Azure resources (containers, web apps, virtual machine o cosa si ha...)
- Azure test Plans dove è possibile testare il codice e tracciare 

ES: si vuole scrivere un'app Node.js in VSC e si vuole pubblicare tale app in un Azure Service (oppure creare una istanza di container  che sarà conservata in un Azure Container Registry che potrà esser eseguita in un Azure Kubernetes Service) che tramite commit in un Azure Repos  gestirà, dietro le quinte, tramite Azure Pipelines i processi di build e deploy. 

Il documento "Skills outline/Skill measured" fornisce la lista delle cose da studiare.


## Links
- [corso Microsoft Azure: the big picture](https://app.pluralsight.com/library/courses/microsoft-azure-the-big-picture) 2:04min
- [corso Continuous Delivery and DevOps with Azure DevOps: The Big Picture](https://app.pluralsight.com/library/courses/continuous-delivery-azure-devops-big-picture/) 1:25min
- [corso DevOps Foundations: Core Concepts and Fundamentals](https://app.pluralsight.com/library/courses/devops-foundations-core-concepts-fundamentals)
- [corso Azure Devops:Source Control](https://app.pluralsight.com/library/courses/azure-devops-continuous-delivery-source-control/table-of-contents) 1:57min

# [AZ-900 Azure Fundamentals Microsoft Certification](https://docs.microsoft.com/en-us/learn/certifications/exams/az-900)
La certificazione AZ-900 è destinata a candidati (che hanno familiarità con concetti tecnologici) che stanno iniziando a lavorare con soluzioni e servizi cloud bases e non conoscono Azure: tale certificazione è la base (opzionale ma requisiti consigliato) per altre certificazioni Azure:
- Azure Administrator Associate
- Azure Developer Associate
- Azure Splution Architect Expert
- Devops Engineer Expert
L'obiettivo è capire quali problemi possono essere risolti utilizzando le soluzioni di Microsoft Azure

E' un'opportunità per dare prova di conoscenza di:
- cloud concets
- Azure services
- Azure workloads
- Secure and privacy in Azure
- Azure pricing e support

L'esame costa 99USD e la certificazione non ha scadenza e misura:
- descrivere cloud concepts (20-25%)
- descrivere core Azure services (15-20%)
- descrivere core solution and management tools (10-15%)
- descrivere general and network security features (10-15%)
- descrivere identity, governance, privacy and compliance features (20-25%)
- Azure cost management & Service Level agreement (10-15%)
Dove con "descrivere" si indende non saper configurare gestire o implementare ma si deve sapere "waht the feature are" e " what business problems they solve".

Su Pluralsight vedere i corsi:
- Microsoft Azure cloud concepts : 38min
- Microsoft Azure Services and  concepts 3:38min
- Microsoft Azure Security and Privacy concepts 2:33min
- Microsoft Azure Pricing and Support options 1:37min

# Links
- [Corso Microsoft Azure Fundamentals: Introduction to the AZ-900 Exam](https://app.pluralsight.com/library/courses/microsoft-azure-fundamentals-intro-az-900-exam-cert)