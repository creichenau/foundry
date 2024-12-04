const deckName = "GM Deck";
const discardName = "GM Discard Pile";

// get deck
const deck = game.cards.getName(deckName);

// get discard
const hands = game.cards.filter(e => e.type === "pile" && e.name === discardName)

// deal a card to the hand
await deck.deal(hands, 1, { chatNotification: false });

// get the details of the card
let most_recent_drawn = hands[0].cards.contents[hands[0].cards.size - 1];

let message = `<img width=75% height=50% src="${most_recent_drawn.faces[0].img}"</img><br><h3>${most_recent_drawn.value}</h3>`;

// create the chat message
ChatMessage.create({
    user: game.user._id,
    speaker: { alias: "You draw..." },
    content: message,
    blind: true
});