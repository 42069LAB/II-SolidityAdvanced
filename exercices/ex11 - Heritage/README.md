# Exercice 11 - Héritage

## Tâche:

Créer un nouveau contrat qui hérite des deux autres contrats et qui implémente une fonction présente dans ces deux derniers afin de retourner seulement le résultat d'une des fonctions.

## Indications:

- Ouvrez le fichier `Heritage.sol`.
- Créez un smart contrat **Final** qui hérite de BaseB et BaseC.
- Créez une fonction **getNb** qui retourne un uint256 et qui override la fonction **getNb** des deux autres contrats.
- Implémentez cette fonction pour qu'elle retourne le résultat de getNb provenant du contrat BaseA

## Félicitations:

Vous savez maintenant comment créer un contrat qui va pouvoir hériter d'autres contrats.

L'héritage est un point très important en solidity puisque ca va permettre d'implémenter de design pattern lié à l'oop.

## Prochaine étape:

Vous allez maintenant pouvoir appliquer tout ce que vous avez appris pour pouvoir recréer **Leboncoin** en décentralisé.
