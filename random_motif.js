const descriptorRollTable = "Motif Descriptors";
const professionRollTable = "Professions";
let textResult = "ERROR"

let p = await game.tables.getName(descriptorRollTable).roll();
textResult = "<b>Random Motif</b>: " + p.results[0].text + " ";
let p2 = await game.tables.getName(professionRollTable).roll();
textResult = textResult + p2.results[0].text;

ChatMessage.create({ content: textResult, blind: false });