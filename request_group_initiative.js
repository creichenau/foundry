let p = await game.tables.getName('Current Party').roll();

let textResult = '<b>' + p.results[0].text + '</b>, please roll for initiative! [[/roll 1d6]]';

ChatMessage.create({content: textResult});

let r = new Roll("1d6");
let roll = await r.evaluate();
roll.toMessage({
    rollMode: 'roll',
    flavor: 'GM Initiative Roll: '
    });