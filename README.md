# MicroService with Spring Cloud and Keycloak

Création de la partie backend d'un exemple d'application basée sur des micros-services en utilisant Spring cloud et en sécurisant les micros-services et le frontend 
angular avec Keycloak.

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
 
      ![image](https://user-images.githubusercontent.com/88769633/206318738-b6d12a8c-4d94-4a64-b915-5e1a5f295516.png)
   
   4. Eureka Service :
   
      -> Ouvrez le projet avec votre editeur et demarer le. Si tout marche correctement, tester l'url suivant.
      
               - http://localhost:8761/

      ![image](https://user-images.githubusercontent.com/88769633/206320869-4a216aba-e6a1-4d9b-869f-7664356cc292.png)
      
      ![image](https://user-images.githubusercontent.com/88769633/206321072-b71b5be4-b7a6-46bd-84c0-4b12e33afafd.png)
   
   5. Billing Service :
    
      -> Ouvrez le projet sur Intellij et demarer le service puis tester l'url suivant sur votre navigateur
      
               - http://localhost:8083/fullBill/1

      - fullBill est une projection que nous avons creer dans les codes pour afficher les infos du customer et des details du product.

      ![image](https://user-images.githubusercontent.com/88769633/206319624-b48d4756-75eb-432b-89a4-2ff9c0067830.png)

      - Affichage via H2 Database (Bill, ProductItem):

      ![image](https://user-images.githubusercontent.com/88769633/206319847-decf59f3-5d08-4158-82b7-3811a6292c36.png)
      
      ![image](https://user-images.githubusercontent.com/88769633/206319878-d5caacf7-a061-4f17-9a61-c34ea3acf274.png)
      
      - Affichage de web service de Bill (Sans Json Property)

      ![image](https://user-images.githubusercontent.com/88769633/206320593-0d2dd3c3-a11e-4abf-a1a0-bad648c1497b.png)

