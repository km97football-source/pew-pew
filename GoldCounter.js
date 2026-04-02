let Gold = 0;

function addGold(amount) {
    Gold += amount;
    console.log("Gold gained: " + amount + ". Total: " + Gold);
}

function displayGoldCounter() {
    textAlign(CENTER);
    textSize(32);
    fill('gold');
    text("Gold: " + Gold, (width / 2) - 125, 75);
}
