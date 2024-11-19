async function popupText(season) {
    const textId = "YMMYOdSJC845Qpms"; // replace with your id!

    // roll the weather
    let r = new Roll("2d6");
    let roll = await r.evaluate();
    let textResult = "ERROR"

    if (season == "Spring") {
        switch (roll.total) {
            case 2:
                textResult = "Cool Winds";
                break;
            case 3:
                textResult = "Low clound, mist (poor visibility)";
                break;
            case 4:
                textResult = "Warm, gentle rain (wet)";
                break;
            case 5:
                textResult = "Brooding thunder";
                break;
            case 6:
                textResult = "Balmy, clear";
                break;
            case 7:
                textResult = "Hot, humid";
                break;
            case 8:
                textResult = "Overcast, muggy";
                break;
            case 9:
                textResult = "Sweltering, still";
                break;
            case 10:
                textResult = "Baking, dry";
                break;
            case 11:
                textResult = "Warm wind";
                break;
            case 12:
                textResult = "Thunder storm (poor visiblity, wet)";
                break;
            default:
                break;
        }

    }
    if (season == "Summer") {
        switch (roll.total) {
            case 2:
                textResult = "Cool winds";
                break;
            case 3:
                textResult = "Low cloud, mist (poor visibility)";
                break;
            case 4:
                textResult = "Warm, gentle rain (wet)";
                break;
            case 5:
                textResult = "Brooding thunder";
                break;
            case 6:
                textResult = "Balmy, clear";
                break;
            case 7:
                textResult = "Hot, humid";
                break;
            case 8:
                textResult = "Overcast, muggy";
                break;
            case 9:
                textResult = "Sweltering, still";
                break;
            case 10:
                textResult = "Baking, dry";
                break;
            case 11:
                textResult = "Warm wind";
                break;
            case 12:
                textResult = "Thunderstorm (poor visibility, wet)";
                break;
            default:
                break;
        }
    }
    if (season == "Fall") {
        switch (roll.total) {
            case 2:
                textResult = "Torrential rain (poor visibility, wet)";
                break;
            case 3:
                textResult = "Rolling fog (poor visiblity)";
                break;
            case 4:
                textResult = "Driving rain (poor visibility, wet)";
                break;
            case 5:
                textResult = "Bracing wind";
                break;
            case 6:
                textResult = "Balmy, clement";
                break;
            case 7:
                textResult = "Clear, chilly";
                break;
            case 8:
                textResult = "Drizzle, damp (wet)";
                break;
            case 9:
                textResult = "Cloudy, misty (poor visibility)";
                break;
            case 10:
                textResult = "Brooding clouds";
                break;
            case 11:
                textResult = "Frosty, chill";
                break;
            case 12:
                textResult = "Icy, gentle snow (wet)";
                break;
            default:
                break;
        }
    }
    if (season == "Winter") {
        switch (roll.total) {
            case 2:
                textResult = "Deep freeze, hoarfrost";
                break;
            case 3:
                textResult = "Snow storm (poor visibility, wet, travel impeded)";
                break;
            case 4:
                textResult = "Relentless wind";
                break;
            case 5:
                textResult = "Bitter, silent";
                break;
            case 6:
                textResult = "Frigid, icy";
                break;
            case 7:
                textResult = "Clear, cold";
                break;
            case 8:
                textResult = "Freezing rain (poor visibility, wet)";
                break;
            case 9:
                textResult = "Cold wind, gloomy";
                break;
            case 10:
                textResult = "Frigid mist (poor visibility)";
                break;
            case 11:
                textResult = "Icy, steady snow (poor visibility, wet)";
                break;
            case 12:
                textResult = "Relentless blizzard (poor visibility, wet, travel impeded)";
                break;
            default:
                break;
        }
    }
    roll.toMessage({
        rollMode: 'roll',
        flavor: 'Weather rolled (' + season + '): ' + textResult + "."
    });

    let textObject = canvas.drawings.get(textId);
    const text = textObject.text.text; //gets the text string of the drawing.
    await textObject.document.update({ text: textResult }); //updates the drawing.	
    return;
}

let dialogContent = ``;
let d = new Dialog({
    title: "Roll Weather",
    content: dialogContent,
    buttons: {
        spring: {
            label: "Spring",
            callback: (contents) => {
                popupText("Spring")
            }
        },
        summer: {
            label: "Summer",
            callback: (contents) => {
                popupText("Summer")
            }
        },
        fall: {
            label: "Fall",
            callback: (contents) => {
                popupText("Fall")
            }
        },
        winter: {
            label: "Winter",
            callback: (contents) => {
                popupText("Winter")
            }
        }
    },
    default: "spring"
})
d.render(true)