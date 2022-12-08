# Rapport : MicroService avec Spring Cloud et Keycloak

Création de la partie backend d'une d'application basée sur des micros-services en utilisant Spring cloud et le frontend avec angular en sécurisant 
les micros-services avec Keycloak.

![jee](https://user-images.githubusercontent.com/88769633/206300258-ace1a27f-7722-4a6c-a347-fb63f012c49a.png)

### Objectif (Enoncé): 

Créer une application basée sur une architecture micro-service qui permet de gérer les factures contenant des produits et appartenant à un client.

Travail à faire :

-> Créer le micro-service customer-service qui permet de gérer les client

-> Créer le micro-service inventory-service qui permet de gérer les produits

-> Créer la Gateway Spring cloud Gateway avec une Configuration statique du système de routage

-> Créer l'annuaire Eureka Discrovery Service

-> Faire une configuration dynamique des routes de la gateway

-> Créer le service de facturation Billing-Service en utilisant Open Feign

-> Créer un client Web Angular (Clients, Produits, Factures)

-> Déployer le serveur keycloak :

   - Créer un Realm
     
   - Créer un client à sécuriser
     
   - Créer des utilisateurs
     
   - Créer des rôles
     
   - Affecter les rôles aux utilisateurs
     
   - Tester les différents modes d'authentification avec Postman en montrant les contenus de Access-Token, Refresh Token 
     
-> Sécuriser les micro-services et le frontend angular en déployant les adaptateurs Keycloak

-> Ajouter des Fonctionnalités supplémentaires de votre choix

-> Livrable : Un Repository Github contenant :

   - Le code sources de l'ensemble des micro-services et du frontend
   
   - Le rapport montrant les différentes étapes dans le fichier README.MD

--------------------------------------------------------------------------------------------------------------------------------------------------------

   1. Création des micros-services métiers basés sur JPA, Spring Data, Spring Data Rest, H2 Data base, Open Feign
   
      - Customer Service
   
      - Inventory Service
   
      - Billing Service
      
   2. Développement et mise en place du Discovery Service Netflix Eureka Service
   
   3. Développement d'un service proxy orchestration avec Spring Cloud Gateway avec les deux modes de routage :
       
      - Routage Statique avec Configuration déclarative application.yml

      - Routage Statique avec Configuration programmatique (Classe de configuration)
      
      - Routage Dynamique en s'appuyant sur le service d'enregistrement Eureka Discovery

   4. Utilisation des services de spring cloud 
   
      - Actuator pour le monitoring et le management des services 
      
      - Hystrix Dash Board

## Scénario

Au démarrage, les services Customer, Inventory, Billing et meme le Gateway s'enregistrent aupres de Eureka service. Ils renseignent a ce server registry 
leur nom, leurs adresses IP et leur port.

Le gateway est le point d'entrée des requettes externes envoyées par les clients. Une fois la requette arrivée au niveau du gateway, il recupere le nom 
du service qui est envoyé et demande a eureka service de lui donné l'addresse et le port du service.

Ainsi le gateway ayant l'adresse complete du service peut directement le contacter et lui envoyer la requette du client. La reponse sera recuperer par
ce meme gateway et renvoyer au client.

![jee1](https://user-images.githubusercontent.com/88769633/206312225-88bdead7-d1c6-4099-a7db-72bf6c8f02b1.png)

## Démarage et Test des services

   1. Customer Service :
   
      -> Ouvrez le projet avec votre editeur exemple Intellij et demarrer le service. Si tout marche correctement, tester l'url suivant et verifier si 
      le resultat s'affiche comme l'image dessous.
        
               - http://localhost:8081/customers ou bien afficher seulement le premier customer http://localhost:8081/customers/1
      
      ![image](https://user-images.githubusercontent.com/88769633/206314756-b457f3cb-fb17-4e46-a8a4-6f6999b5fde8.png)
      
      - Affichage des customers via H2 Database :

      ![image](https://user-images.githubusercontent.com/88769633/206314867-045e346d-7fe3-4951-a388-d2e36b01a98b.png)
      
   2. Inventory Service :

      -> Ouvrez le projet sur Intellij et demarer le service puis tester l'url suivant 
      
               - http://localhost:8082/products ou bien afficher seulement le premier product http://localhost:8082/products/1
      
      ![image](https://user-images.githubusercontent.com/88769633/206315708-2b2e1a82-db0b-4326-96d3-6ee98c64706b.png)
      
   3. Gateway Service :
   
      -> Meme chose pour le projet gateway, ouvrez le projet sur Intellij et demarer le service puis tester l'url 
      
               - http://localhost:8888/CUSTOMER-SERVICE/customers
               
               - http://localhost:8888/INVENTORY-SERVICE/products
               
               - http://localhost:8888/BILLIG-SERVICE/fullBill/1
 
      ![image](https://user-images.githubusercontent.com/88769633/206331009-bf587d0a-43c6-42c4-82cf-9fb996324c4a.png)
   
   4. Eureka Service :
   
      -> Ouvrez le projet avec votre editeur et demarer le. Si tout marche correctement, tester l'url suivant.
      
               - http://localhost:8761/

      ![image](https://user-images.githubusercontent.com/88769633/206320869-4a216aba-e6a1-4d9b-869f-7664356cc292.png)
      
      ![image](https://user-images.githubusercontent.com/88769633/206321072-b71b5be4-b7a6-46bd-84c0-4b12e33afafd.png)
   
   5. Billing Service :
    
      -> Ouvrez le projet sur Intellij et demarer le service puis tester l'url suivant sur votre navigateur
      
               - http://localhost:8083/fullBill/1

      - fullBill est une projection que nous avons creer dans les codes pour afficher les infos du customer et des details du product.

      ![image](https://user-images.githubusercontent.com/88769633/206331148-0bf84322-3ec0-402e-a630-a817d194efb9.png)

      - Affichage via H2 Database (Bill, ProductItem):

      ![image](https://user-images.githubusercontent.com/88769633/206319847-decf59f3-5d08-4158-82b7-3811a6292c36.png)
      
      ![image](https://user-images.githubusercontent.com/88769633/206319878-d5caacf7-a061-4f17-9a61-c34ea3acf274.png)
      
      - Affichage de web service de Bill (Sans Json Property)

      ![image](https://user-images.githubusercontent.com/88769633/206320593-0d2dd3c3-a11e-4abf-a1a0-bad648c1497b.png)

## Création et lancement du client Web Angular

   -> Vous devez installer au premier lieu et par la suite verifier la version d'Angular avec les commandes suivantes :
                    
                 - npm install
                 
                 - npm start
    
                 - npm --version
   
   ![image](https://user-images.githubusercontent.com/88769633/206325365-15e3eb6e-2e34-4302-a28a-4d36ade063f8.png)

   -> Vous pouvez accéder à l'application client à partir de l'adresse suivante 
   
                 - http://localhost:4200
                 
   ![image](https://user-images.githubusercontent.com/88769633/206326674-62a00e0b-6960-404d-a32c-c6f0886aa444.png)
       
   -> Génerez des components (Customers, Products, Factures)
   
   ![image](https://user-images.githubusercontent.com/88769633/206327830-7af500d2-be13-4088-929e-2339144013e9.png)
       
       - Component Customer :
       
   ![image](https://user-images.githubusercontent.com/88769633/206328128-4e0046f7-f6be-4ef5-a7a3-f0d03ecd2afc.png)
       
       - Component Product :
       
   ![image](https://user-images.githubusercontent.com/88769633/206328818-d5989ed0-feaa-4e63-8b28-1474c7f52079.png)
       
       - Component Facture :
       
   ![image](https://user-images.githubusercontent.com/88769633/206328860-196cf287-84ab-4f5d-878e-18df7e86c733.png)
       
   -> Récupération des Bill et Consultation du details
   
       - Page Customers :
   
   ![image](https://user-images.githubusercontent.com/88769633/206329597-f06de85f-a8d4-4e2a-8336-5a097ea60d92.png)
       
       - Page Bill :
       
   ![image](https://user-images.githubusercontent.com/88769633/206329673-220834f6-abb5-4a10-b85e-bb470e16e431.png)
       
       - Page Bill details :
       
   ![image](https://user-images.githubusercontent.com/88769633/206329714-c6299d60-1daf-40e8-80f8-e41e36df8130.png)
       
       - Page ProductItem, Bill et Total :
       
   ![image](https://user-images.githubusercontent.com/88769633/206330322-8bda6b7b-5981-4621-a16f-02c74fd0fbf3.png)

## Enregistrement d'un client OAuth 2.0 autorisé dans KeyCloak

Tous les utilisateurs de ce service devront maintenant nous contacter et demander l'accès au service. Nous leur accordons l'accès en les enregistrant 
en tant que clients autorisés dans KeyCloak.

Nous pouvons également utiliser cet identifiant client et ce secret client dans Postman pour générer un jeton et vérifier que nos utilisateurs 
autorisés peuvent invoquer le service. Le jeton que Postman génère est envoyé dans chaque demande que Postman fait au service. Le service vérifiera 
le jeton avec Keycloak, extraira le role de l'utilisateur et la comparera avec la portée autorisée. Si tout est vérifié, l'utilisateur a droit à 
accéder à l'API du service.

-> Nous commençons par enregistrer un client autorisé dans KeyCloak.

-> Connectez-vous à la console d'administration de KeyCloak. Si vous avez installé KeyCloak 

-> Vous devriez être en mesure d'accéder à KeyCloak en utilisant les informations ci-dessous :

		- URL de la console d'administration : http://localhost:8080/
      
		- utilisateur : admin
      
		- mot de passe : 1234


-> Connectez vous en tant qu'admin et creez le realm
  
  - Page Console d'administration de Keycloak :

   ![image](https://user-images.githubusercontent.com/88769633/206334648-3f0d3a49-7c3c-4b1d-a559-70ac3a627f87.png)
   
  - Page d'authentification (Admin Role) :

   ![image](https://user-images.githubusercontent.com/88769633/206334725-1ebc0e84-b129-423f-8a5d-d7b7a6f6f0f5.png)
   
  - Creation du realm (my-ecom-realm) :
  
   ![image](https://user-images.githubusercontent.com/88769633/206335607-7b1347b4-a4aa-4271-a20b-608d17da6757.png)

-> Sélectionnez l'élément de menu "Clients" dans la navigation de gauche et cliquez sur "Créer"
   
   ![image](https://user-images.githubusercontent.com/88769633/206336082-0f9e7350-ac14-4627-92ba-5620525df5d1.png)

-> Entrez les valeurs ci-dessous, puis cliquez sur Enregistrer

      - Client ID : products-app

      - Protocole client : openid-connect

KeyCloak va maintenant présenter une fenêtre pour ajouter des propriétés supplémentaires pour ce client. Entrez les valeurs ci-dessous et cliquez 
sur « Enregistrer »

     - URI de redirection valides : http://localhost:8081/* 
     
   ![image](https://user-images.githubusercontent.com/88769633/206336741-38cc3f1f-96a7-497b-981d-ad9383345dbf.png)
   
-> Votre écran doit correspondre à la capture d’écran ci-dessous :
   
   ![image](https://user-images.githubusercontent.com/88769633/206337056-3aea69ad-bb08-4929-bbfd-cf383f0f24c4.png)
   
-> Créations des users avec l'affectations des roles :

   ![image](https://user-images.githubusercontent.com/88769633/206338793-09b7efa5-a2f7-4aa5-b7cd-c2b3adfa40ca.png)
   
-> Donnez un password valid :

   ![image](https://user-images.githubusercontent.com/88769633/206338949-8d778749-730b-46b7-abc8-eef61eefe312.png)
   
-> Affectation des roles :

   ![image](https://user-images.githubusercontent.com/88769633/206340224-9002a901-1e84-4a5c-9533-953e9ddb2788.png)
   
-> Récupérez la clé secrète client
   
   Cliquez sur l’onglet Informations d’identification et copiez le secret. Ce sera la clé secrète client que nous utiliserons pour nous 
   authentifier avec KeyCloak

   Nous devons également obtenir l’URL du jeton Keycloak pour générer un code d’autorisation pour notre client. Nous pouvons obtenir cela du 
   royaume Micoservices. Cliquez sur Realm setting, puis sur Endpoints
   
-> Nous devrions maintenant voir une liste de points de terminaison. Copier le point de terminaison du jeton

  ![image](https://user-images.githubusercontent.com/88769633/206339309-8f7cdcc1-967f-49f0-8c5b-cfc32484084a.png)   

  Vous pouvez également copier le code d’autorisation et le décoder dans https://jwt.io/  
  
  ![image](https://user-images.githubusercontent.com/88769633/206339933-2e259625-cb80-4999-b218-5e294a294728.png)

 -> Comme vous pouvez le voir, le code d’autorisation spécifie que le client a la portée correcte Succès!!
