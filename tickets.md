# Coding Challenge tickets

## Ticket 1 (Code Review) : Analyser la dette technique de l'appli

## Ticket 2 (Dette technique) : Refactorer la recherche d'album

Si le but est d'éviter des appels serveurs : stocker la liste des albums dans le store Redux afin d'ensuite effectuer le filtrage sur cette liste

## Ticket 3 (Feature) : Afficher le détail d'un album (implémenté)

Développé dans Album.tsx

## Ticket 4 (Feature) : Gérer la pagination de la recherche

Paramètres offset et limit à passer à l'appel à l'API pour ne récupérer que les résultats allant de offset à offset+limit. Ensuite pour la présentation, on affiche en page 1, les limit premiers résultats et lors du clic sur page suivante, on fait un nouvel appel à l'API pour récupérer les résultats suivants

## Ticket 5 (Feature) : ajouter un album en favori

Mettre en place un bouton Ajouter/Retirer de ma liste de favori (Coeur) et appeler en conséquence le WS développé en back permettant d'ajouter/retirer un item de la liste de favori de l'utilisateur.
Côté base de données, cela nécessite de tenir une liste par utilisateur des items favoris. (Voir Ticket 12)

## Ticket 6 (Feature) : Afficher les albums favoris

Côté back : un WS permettant de récupérer les items favoris d'un utilisateur.
Côté front : lors de la connexion d'un utilisateur, on appel le WS afin de récupérer ces items favoris et un bouton "Favoris" présent dans le menu permet d'accéder à cette liste

## Ticket 7 (Bug/Perf) : Les dernières écoutes d'album de fonctionnent pas avec de la volumétrie

Afin d'éviter de lire à chaque appel à l'un des WS le fichier CSV contenant la base de données, on peut stocker le contenu directement dans la base de données sqlite. Ainsi le fichier CSV n'est lu qu'une seule fois, au démarrage.

## Ticket 8 (Feature) : Placer la barre de recherche dans le menu (bandeau haut) (implémenté)

Développé dans le fichier App.tsx

## Ticket 9 (Feature) : Afficher le top 10 des albums les + écoutés

Côté back : WS afin de récupérer les 10 items les plus écoutés (implémenté)

Côté front : un bouton dans le menu afin d'accéder aux résultats de ce WE

## Ticket 10 (Bug) : Gérer l'expiration du token spotify

Essayé mais pas réussi, j'ai des soucis sur l'appel au WS /api/token de spotify depuis le front.
Sinon, pour la démarche :

- Appeler le WS /authorize avec en paramètre response_type = code et non token comme initialement paramétré afin de récupéré un code d'autorisation
- Ce code permet ensuite l'appel à /api/token afin de récupérer un refresh_token en plus du token. On stocke ce refresh_token dans le store Redux, de la même manière que le token
- Lorsque le token expire (vérifier les codes et messages d'erreurs lors des appels aux WS), on appelle le WS /api/token avec le paramètre grant_type = refresh_token afin de renouveler nos jetons (refresh_token et token)

## Ticket 11 (Feature) : Sécuriser les échanges avec le back

Côté front : Fournir un token valide pour appeler les WS du back

Côté back : vérifier auprès de l'API Spotify la validité du jeton fourni lors de l'appel et retourner en conséquence un message d'erreur ou le résultat de la requête

## Ticket 12 (Feature) : gérer les favoris par utilisateur

Mettre en place en base de données, un modèle de données permettant de stocker pour chaque utilisateur les albums placés en favoris:

favoris:
[{
user: idUser,
favorites:
[{id: idAlbum,}]
}]

## Ticket 13 (Feature) : remplacer les Cards dans AlbumList

Par exemple sous forme de Table avec DataTable.
