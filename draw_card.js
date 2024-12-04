const deckName = "Player Deck";
const gmDeckName = "GM Deck";
const discardName = "Player Discard Pile";


// get deck
const deck = game.cards.getName(deckName);

// get hand
const hands = game.cards.filter(e => e.type === "pile" && e.name === discardName)

// deal a card to the hand
await deck.deal(hands, 1, { chatNotification: false });

// get the details of the card
let most_recent_drawn = hands[0].cards.contents[hands[0].cards.size - 1];

let suitName = most_recent_drawn.suit;
if (suitName == "Pents") suitName = "Pentacles";

let message = `<img width=75% height=50% src="${most_recent_drawn.faces[0].img}"</img><br><h3>${most_recent_drawn.value} of ${suitName}</h3>`;

if (most_recent_drawn.value == 0) {
    // recall all the player and GM deck
    await deck.recall({ chatNotification: false });
    let gmDeck = game.cards.getName(gmDeckName);
    await gmDeck.recall({ chatNotification: false });

    // reshuffle both decks
    await deck.shuffle({ chatNotification: false });
    await gmDeck.shuffle({ chatNotification: false });

    message = `<img width=75% height=50% src="${most_recent_drawn.faces[0].img}"</img><br><h3>The Fool</h3>`;
}

// create the chat message
ChatMessage.create({
    user: game.user._id,
    speaker: { alias: "You draw..." },
    content: message
});