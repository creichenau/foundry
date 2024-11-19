let r = new Roll("3d6");
let r2 = new Roll("3d6");
let r3 = new Roll("3d6");
let r4 = new Roll("3d6");
let r5 = new Roll("3d6");
let r6 = new Roll("3d6");

let roll = await r.evaluate();
let textResult = "Strength = " + roll.total;

let roll2 = await r2.evaluate();
textResult = textResult + "<br>" + "Intelligence = " + roll2.total;

let roll3 = await r3.evaluate();
textResult = textResult + "<br>" + "Wisdom = " + roll3.total;

let roll4 = await r4.evaluate();
textResult = textResult + "<br>" + "Dexterity = " + roll4.total;

let roll5 = await r5.evaluate();
textResult = textResult + "<br>" + "Constitution = " + roll5.total;

let roll6 = await r6.evaluate();
textResult = textResult + "<br>" + "Charisma = " + roll6.total;

ChatMessage.create({content: textResult});