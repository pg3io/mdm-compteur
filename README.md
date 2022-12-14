# Compteur Followers

Un compteur web d'abonnés

# Configuration
```json
// config.json
{
    "interval_seconds": 30,
    "end_hour": "2021-11-10T23:00:01+0100",
    "port": 3000,
    "instagram": {
        "credentials" : {
            "username": "misterpopo",
            "password": "motdepasse"
        },
        "target_username": "djay-zone"
    },
    "twitter": {
      "active": true,
      "consumer_key": "Your twitter application key",
      "consumer_secret": "Your twitter application secret",
      "access_token_key": "Your twitter developer account key",
      "access_token_secret": "Your twitter developer account secret",
      "target_id": 77223280,
      "target_username": "adri1S"
  }
}
```
## Valeurs
* interval_seconds : nombre de secondes entre chaque vérification du nombre d'abonnés
* end_hour: fin du compte a rebours
* port: le port ou le compteur peut etre consulté grace à un navigateur `http://localhost:$port` défaut: 3000
* <réseau>.active : compter et afficher les abonnés de <réseau>
* instagram: 
  * credentials : nécessaires pour voir les abonnés d'un compte privé optionels sinon
    * username: nom d'utilisateur d'un compte instagram
    * password: le mot de passe dudit compte
  * target_username: si vous spécifiez les credentials cette variable est prioritaire sur le username stocké comme credential mais elle n'est pas obligatoire, sans credentials, elle le devient

* twitter:
  * target_username : Une chaine de caractères correspondant au nom d'utilisateur unique d'un compte twitter
  * target_id : Un nombre entier correspondant à l'id twitter de l'utilisateur ciblé, prioritaire sur `target_username` si défini
    
Garder en tete que trop de requete => suspension des réponses par instagram pendant plusieurs minutes.

# Usage
1. cloner le repo `git clone ssh://git@git2.pg3.io:2223/loys/compteur-followers.git`
2. se rendre dans le dossier `compteur-followers`
3. `npm install`
4. remplir le fichier `config.json`
5. `npm start`
