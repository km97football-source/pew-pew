let waveNumber = 0;

function displayWaveCounter() {
    textAlign(CENTER);
    
    if (waveNumber % 5 === 0 && waveNumber !== 0) {
         textSize(50);
        fill('red');
        text("Boss Wave: " + waveNumber, width / 2, 125);
    } else {
         textSize(32);
        fill('black');
        text("Wave: " + waveNumber, width / 2, 75);
    }
}