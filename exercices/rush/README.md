# Rush

## Tâche:

Créez un **Leboncoin** décentralisé.

## Indications:

- Les fonds durant l'échange doivent être stockés sur un smart contract.
- Le vendeur doit pouvoir créer des annonces: `function createSale() public returns() {}`.
- L'acheteur et le vendeur doivent se mettre d'accord sur le prix pour ensuite effectuer la transaction (tout se fait sur la blockchain).
  - Pour cela une fonction doit être créée pour que l'acheteur puisse proposer un prix: `function addOffer(uint256 _saleId, uint256 _price) public returns() {}`.
  - Une autre fonction doit être créée pour que le vendeur puisse accepter ou refuser la proposition: `function responseToOffer(uint256 _offerId, bool _isAccepted) public {}`.
- Une fois le prix défini, l'acheteur doit pouvoir payer le vendeur via une nouvelle fonction: `function buyTheSale(uint256 _offerId) public {}`.
- Le vendeur doit pouvoir retirer ses fonds via une fonction: `function getSaleBalance(uint256 _saleId) public {}`.
- Le smart contract doit être le plus sécurisé et optimisé possible.
- Le smart contract doit utiliser des events.
- N'hésitez pas à créer de nouvelles fonctionnalités utiles telles qu'un delay avant que la transaction soit périmée.
- Créez des tests pour ce smart contract.
- Déployez le smart contract sur le testnet sepolia.

:hint: Tentez d'utiliser plusieurs smart contracts différents pour séparer les différentes parties logiques de votre programme.

## Félicitations:

Vous avez maintenant créé votre premier smart contract demandant beaucoup de connaissances !!