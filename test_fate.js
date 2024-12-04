
// if total > 13 and suit == type and isPush == false then GREAT SUCCESS
// if total > 13 then SUCCESS
// if isPush == true then GREAT FAILURE
// else FAILURE
// 

const deckName = "Player Deck";
const gmDeckName = "GM Deck";
const discardName = "Player Discard Pile";
const targetNumber = 13;
const favorValue = 3
const disfavorValue = -3;

let dialogContent = `<form>
<div class='form-group' style='margin: 10px; padding: 10px;'>

<table width=100%>

<tr>
<td>
<label for="attrType">Attribute Type:</label></td>

<td>
<select name="attrType" id="attrType">
  <option value="Swords">Swords</option>
  <option value="Pentacles">Pentacles</option>
  <option value="Cups">Cups</option>
  <option value="Wands">Wands</option>
</select>
</td>
</tr>

<tr>
<td>
<label for="attrScore">Attribute Score:</label>
</td>

<td>
<input type="text" style="width: 80px;" name="attrScore" id="attrScore"></input>
</td>
</tr>

<tr>
<td>
<label for="favor">Favor:</label>
</td>

<td>
<select name="favor" id="favor">
  <option value="none">None</option>
  <option value="favor">Favor</option>
  <option value="disfavor">Disfavor</option>
</select>
</td>
</tr>
</table>
</div></form>`;


let d = new Dialog({
    title: "Test Fate",
    content: dialogContent,
    buttons: {
        none: {
            label: "Test Fate",
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
    
    let hasFav = false;
    let hasDis = false;

    if (formData.favor == "favor") hasFav = true;

    if (formData.favor == "disfavor") hasDis = true;

    testFate(formData.attrType, formData.attrScore, hasFav, hasDis, false, 0);
}

async function testFate(type, modifier, isFavored, isDisfavored, isPush, previousTotal) {

    let mod = Number(modifier);
    let prev = Number(previousTotal);

    let cardData = await drawCard();
    let totalValue = cardData.value;
    if (!isPush) {
        totalValue = totalValue + mod;
        if (isFavored) {
            totalValue = totalValue + favorValue;
        }
        if (isDisfavored) {
            totalValue = totalValue + disfavorValue;
        }
    }
    if (isPush) {
        totalValue = totalValue + prev;
    }

    let message = `<img width=75% height=50% src="${cardData.img}"</img><br><h3>${cardData.value} of ${cardData.suit}</h3>`;
    message = message + 'Total Value = ' + totalValue + "<br>";

    if (totalValue > targetNumber && type == cardData.suit && !isPush) {

        message = message + "<span style='color:green'>GREAT SUCCESS!</span>";

        ChatMessage.create({
            user: game.user._id,
            speaker: { alias: "You draw..." },
            content: message
        });

        return 0;
    }

    if (totalValue > targetNumber) {

        message = message + "<span style='color:green'>SUCCESS!</span>";

        ChatMessage.create({
            user: game.user._id,
            speaker: { alias: "You draw..." },
            content: message
        });

        return 0;
    }

    if (isPush) {

        message = message + "<span style='color:red'>GREAT FAILURE!</span>";

        ChatMessage.create({
            user: game.user._id,
            speaker: { alias: "You draw..." },
            content: message
        });

        return 0;
    }

    message = message + "<span style='color:red'>FAILURE!</span>";

    // NOTE: Removed push fate button because I couldn't figure out a way to hook onto the renderChatMessage method using 
    // an inline script. 
    //
    // add "PUSH FATE" button
    //  html.querySelectorAll("[data-action=requestor]").forEach(n => {
    //    n.addEventListener("click", clickButton.bind(message));
    //  });
    //message = message + "<br><button [data-action=push] [data-value=" + totalValue + "]>Push Fate</button>";
    message = message + "<br><br>Feeling Lucky? Run the PUSH FATE macro to push fate!";

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