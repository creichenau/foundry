
// add previous total to card value
// if total > 13 then SUCCESS
// else GREAT FAILURE
// 

const deckName = "Player Deck";
const gmDeckName = "GM Deck";
const discardName = "Player Discard Pile";
const targetNumber = 13;

let dialogContent = `<form>
<div class='form-group' style='margin: 10px; padding: 10px;'>

<table width=100%>

<tr>

<tr>
<td>
<label for="prevValue">Previous Total:</label>
</td>

<td>
<input type="text" style="width: 80px;" name="prevValue" id="attrScore"></input>
</td>
</tr>

</table>
</div></form>`;


let d = new Dialog({
    title: "Push Fate",
    content: dialogContent,
    buttons: {
        none: {
            label: "Push Fate",
            callback: (contents) => {
                executeTest(contents);
            }
        }
    },
    default: "none"
})
d.render(true);

async function executeTest(html) {
    const formData = new FormDataExtended(html[0].querySelector("form")).object;
    pushFate(formData.prevValue);
}

async function pushFate(previousTotal) {

    let prev = Number(previousTotal);

    let cardData = await drawCard();
    let totalValue = cardData.value;
    totalValue = totalValue + prev;

    let message = `<img width=75% height=50% src="${cardData.img}"</img><br><h3>${cardData.value} of ${cardData.suit}</h3>`;
    message = message + 'Total Value = ' + totalValue + "<br>";

    if (totalValue > targetNumber) {

        message = message + "<span style='color:green'>SUCCESS!</span>";

        ChatMessage.create({
            user: game.user._id,
            speaker: { alias: "You draw..." },
            content: message
        });

        return 0;
    }

    message = message + "<span style='color:red'>GREAT FAILURE!</span>";

    ChatMessage.create({
        user: game.user._id,
        speaker: { alias: "You draw..." },
        content: message
    });

    return 0;

}

async function drawCard() {
    const deck = game.cards.getName(deckName);
    const hands = game.cards.filter(e => e.type === "pile" && e.name === discardName)

    // deal a card to the hand
    await deck.deal(hands, 1, { chatNotification: false });

    // get the details of the card
    let most_recent_drawn = hands[0].cards.contents[hands[0].cards.size - 1];
    let suitName = most_recent_drawn.suit;
    if (suitName == "Pents") suitName = "Pentacles";

    if (most_recent_drawn.value == 0) {
        // recall all the player and GM deck
        await deck.recall({ chatNotification: false });
        let gmDeck = game.cards.getName(gmDeckName);
        await gmDeck.recall({ chatNotification: false });

        // reshuffle both decks
        await deck.shuffle({ chatNotification: false });
        await gmDeck.shuffle({ chatNotification: false });
    }

    return {
        'suit': suitName,
        'value': most_recent_drawn.value,
        'img': most_recent_drawn.faces[0].img
    };
}