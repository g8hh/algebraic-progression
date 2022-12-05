var tmp = {
  text: "",
  letters: [null,"a","b","c"],
  epicslider: 1,
  compPlaneVars: [null,"x","y","x<sup>2</sup>"],
  compPlaneCosts: [null,new Decimal(3500000),new Decimal(100000),new Decimal(1323),new Decimal(1e8),new Decimal("1e16600"),new Decimal(1e18)]
};
function clickButton() {
  player.points = player.points.add(1)
}

function pps() {
  let pps = new Decimal(0);
  pps = pps.add(BUYABLES[1].eff()).add(BUYABLES[2].eff()).add(BUYABLES[3].eff())
  return pps;
}

function tab(x) {
  player.currentTab = x;
}

function xCost() {
  return new Decimal(100000).mul(new Decimal(1).add(Decimal.div(0.11,xDivision())).pow(player.x)).div(hasUpgrade(3) && player.challenge != 5 ? 2 : 1).div(hasUpgrade(5) && player.challenge != 5 ?1000000:1).div(hasChallenge(5)?1e9:1)
}
         
function xDivision() {
  let div = new Decimal(1)
  if(hasSU(1)) div = div.mul(SQRT_UPGRADES[1].eff())
  div = div.mul(QP_BUYABLES[1].eff())
  return div
}

function yCost() {
  return new Decimal(100).div(hasQU(18)?1.1:1).div(hasChallenge(8)?5:1).mul(new Decimal(1).add(Decimal.div(0.25,sacEffect('x'))).pow(player.y)).floor()
}

function buyVariable(x) {
  switch (x) {
    case "x":
      if (player.points.gte(xCost()) && (player.purchases > 0 || player.challenge != 10)){
        if(!hasQU(8)) player.points = player.points.sub(xCost())
        player.x = player.x.add(1)
        player.purchases -= 1
      }
      break;
    case "y":
      if (player.x.gte(yCost()) && (player.purchases > 0 || player.challenge != 10)){
        player.y = player.y.add(1)
        player.purchases -= 1
      }
      break;
    // case "z":
      // if (player.y.gte(zCost()) && (player.purchases > 0 || player.challenge != 10)){
        // player.z = player.z.add(1)
        // player.purchases -= 1
      // }
      // break;
  }
}

function switchTheme() {
  player.theme = !player.theme;
  document.getElementById("style").href = player.theme ? "style.css" : "style-dark.css";
}

function toggleOption(x){
  player.options[x] = !player.options[x]
}

var changedQAdisplay = false
var changedESdisplay = false
var changedCAdisplay = false

function mainLoop(){
  if(hasLoaded){document.getElementById("loading_page").style = "display: none";document.getElementById("app").style = ""}
  if(!window["player"]||!player.points)return;
  let diff = player.options[1] ? ((Date.now()-player.lastTick)/1000) : 0.04
  player.lastTick = Date.now()
  
  // UPDATE TIMES
  player.timePlayed = (Date.now() - player.startingTime) / 1000;
  player.prestigeTimes[0] = player.prestigeTimes[0] += diff;
  player.prestigeTimes[2] = player.prestigeTimes[2] += diff;
  
  // PRODUCE STUFF
  if(player.challenge != 8 || isPrime(player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).add(player.buyables[4]).add(player.buyables[5]).add(player.buyables[6]))) player.points = player.points.add(pps().times(diff));
  if(player.challenge != 8 || isPrime(player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).add(player.buyables[4]).add(player.buyables[5]).add(player.buyables[6]))) player.totalPoints = player.totalPoints.add(pps().times(diff));
  player.slope = player.slope.add(sacEffect('x2').mul(diff))
  player.quadPower = player.quadPower.add(qpGen().mul(diff))
  for (let i = 1; i <= 3; i++) {
    player.compPlane[1][i] = player.compPlane[1][i].add(compPlaneGen(i).mul(diff))
  }
  
  updateAuto()
  if(hasUpgrade(6)) produceBuildings(diff)
  updatePercent()
  updateExps(diff)
  updateAchs()
  updateValues()
  updateRootEpicenter()
  fixUnixEpoch()
  
  if(isNaN(player.points)) {
    exportSave()
    alert("WARNING: NaN Detected! You will see a message that will ask you to confirm a Hard Reset. Please select OK to solve the NaN. Your save has been exported, so import it when the game loads the import prompt.")
    hardReset()
    importSave()
  }
}

setInterval(mainLoop, 40);

function updateAuto() {
  // VARIABLES
  if(player.autobuyers[8] && player.points.gte(yCost()) && player.challenge != 10){
    player.y = player.x.add(1).div(100).mul(hasQU(18)?1.1:1).mul(hasChallenge(8)?5:1).max(1).log(new Decimal(1).add(Decimal.div(0.25,sacEffect('x')))).floor().add(player.x.gte(100)?1:0)
  }
  if(player.autobuyers[7] && player.points.gte(xCost()) && player.challenge != 10){
    player.x = player.points.div(100000).mul(hasUpgrade(3) && player.challenge != 5 ? 2 : 1).mul(hasUpgrade(5) && player.challenge != 5 ? 1000000 : 1).mul(hasChallenge(5)?1e9:1).max(1).log(new Decimal(1).add(Decimal.div(0.11,xDivision()))).floor()
    if(!hasQU(8)) player.points = player.points.sub(xCost())
    player.x = player.x.add(1)
  }
  
  // FUNCTIONS
  if(player.autobuyers[6] && player.points.gte(BUYABLES[6].cost()) && hasUpgrade(4) && player.challenge != 6 && player.challenge != 10){
    player.buyables[6] = player.points.div(100000000).max(1).log(functionCostScaling(3)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[6].cost())
    player.buyables[6] = player.buyables[6].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.autobuyers[5] && player.points.gte(BUYABLES[5].cost()) && hasUpgrade(4) && player.challenge != 6 && player.challenge != 10){
    player.buyables[5] = player.points.div(30000000).max(1).log(functionCostScaling(2)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[5].cost())
    player.buyables[5] = player.buyables[5].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.autobuyers[4] && player.points.gte(BUYABLES[4].cost()) && hasUpgrade(4) && player.challenge != 6 && player.challenge != 10){
    player.buyables[4] = player.points.div(5000000).max(1).log(functionCostScaling(1)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[4].cost())
    player.buyables[4] = player.buyables[4].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  
  // BUILDINGS
  if(player.autobuyers[3] && player.points.gte(BUYABLES[3].cost()) && player.challenge != 10){
    player.buyables[3] = player.points.div(15000).max(1).log(buildingCostScaling()).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[3].cost())
    player.buyables[3] = player.buyables[3].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.autobuyers[2] && player.points.gte(BUYABLES[2].cost()) && player.challenge != 10){
    player.buyables[2] = player.points.div(200).max(1).log(buildingCostScaling()).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[2].cost())
    player.buyables[2] = player.buyables[2].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.autobuyers[1] && player.points.gte(BUYABLES[1].cost()) && player.challenge != 10){
    player.buyables[1] = player.points.div(25).max(1).log(buildingCostScaling()).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[1].cost())
    player.buyables[1] = player.buyables[1].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  
  // QUADRATIC
  if(player.autobuyers[9] && !player.inSqrt && player.challenge == 0){
    if (player.compAutobuyers[2] == 1 && quadFormula().gte(player.inputValue)) goQuadratic(false)
    if (player.compAutobuyers[2] == 2 && player.prestigeTimes[0] >= player.inputValue) goQuadratic(false)
    if (player.compAutobuyers[2] == 3 && quadFormula().gte(player.x2.mul(player.inputValue))) goQuadratic(false)
  }
  
  // COMPLEX
  if (player.compAutobuyers[7] && compFormula().gte(player.inputValue2)) {
    goComplex(false)
  }
  
  // SACRIFICE
  if(player.autobuyers[10]){
    sacrifice('x')
    sacrifice('y')
    sacrifice('x<sup>2</sup>')
  }
  
  // DOUBLERS
  if(player.compAutobuyers[1] && hasQU(16)){
    while(player.x2.gte(doublerCost())) buyDoubler()
  }
  if(player.compAutobuyers[3]){
    while(player.rootEssence.gte(sqrtDoublerCost())) buySqrtDoubler()
  }
  
  // Y-INTERCEPT
  if(player.compAutobuyers[4] && hasUpgrade(8)){
    while(player.slope.gte(bCost())) buyB()
  }
  
  // QP BUYABLES
  if(player.compAutobuyers[5] && hasQU(20)) {
    for (let i = 1; i < 5; i++) {
      while(player.quadPower.gte(QP_BUYABLES[i].cost())) buyQPBuyable(i)
    }
  }
  
  // AUTO-ADJUST
  if (player.compAutobuyers[6] && hasQU(20)) {
    player.abc[1] = maxABC()
    player.abc[2] = maxABC()
    player.abc[3] = maxABC().div(4).floor()
  }
}

function buyMax() {
  // VARIABLES
  if(player.points.gte(yCost()) && player.challenge != 10){
    player.y = player.x.add(1).div(100).mul(hasQU(18)?1.1:1).mul(hasChallenge(8)?5:1).max(1).log(new Decimal(1).add(Decimal.div(0.25,sacEffect('x')))).floor().add(player.x.gte(100)?1:0)
  }
  if(player.points.gte(xCost()) && player.challenge != 10){
    player.x = player.points.div(100000).mul(hasUpgrade(3) && player.challenge != 5 ? 2 : 1).mul(hasUpgrade(5) && player.challenge != 5 ? 1000000 : 1).mul(hasChallenge(5)?1e9:1).max(1).log(new Decimal(1).add(Decimal.div(0.11,xDivision()))).floor()
    if(!hasQU(8)) player.points = player.points.sub(xCost())
    player.x = player.x.add(1)
  }
  
  // FUNCTIONS
  if(player.points.gte(BUYABLES[6].cost()) && hasUpgrade(4) && player.challenge != 6 && player.challenge != 10){
    player.buyables[6] = player.points.div(100000000).max(1).log(functionCostScaling(3)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[6].cost())
    player.buyables[6] = player.buyables[6].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.points.gte(BUYABLES[5].cost()) && hasUpgrade(4) && player.challenge != 6 && player.challenge != 10){
    player.buyables[5] = player.points.div(30000000).max(1).log(functionCostScaling(2)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[5].cost())
    player.buyables[5] = player.buyables[5].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.points.gte(BUYABLES[4].cost()) && hasUpgrade(4) && player.challenge != 6 && player.challenge != 10){
    player.buyables[4] = player.points.div(5000000).max(1).log(functionCostScaling(1)).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[4].cost())
    player.buyables[4] = player.buyables[4].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  
  // BUILDINGS
  if(player.points.gte(BUYABLES[3].cost()) && player.challenge != 10){
    player.buyables[3] = player.points.div(15000).max(1).log(buildingCostScaling()).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[3].cost())
    player.buyables[3] = player.buyables[3].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.points.gte(BUYABLES[2].cost()) && player.challenge != 10){
    player.buyables[2] = player.points.div(200).max(1).log(buildingCostScaling()).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[2].cost())
    player.buyables[2] = player.buyables[2].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
  if(player.points.gte(BUYABLES[1].cost()) && player.challenge != 10){
    player.buyables[1] = player.points.div(25).max(1).log(buildingCostScaling()).floor()
    if(!hasQU(8)) player.points = player.points.sub(BUYABLES[1].cost())
    player.buyables[1] = player.buyables[1].add(1)
    player.chalExponents[0] = new Decimal(0)
  }
}

function produceBuildings(diff) {
  player.buyables[7] = player.buyables[7].add(player.buyables[2].add(player.buyables[8]).mul(slopeEffect()).mul(polyGrowthMults()).mul(diff))
  player.buyables[8] = player.buyables[8].add(player.buyables[3].add(player.buyables[9]).mul(slopeEffect()).mul(polyGrowthMults()).mul(diff))
  if(hasSU(7)) player.buyables[9] = player.buyables[9].add(player.buyables[1].mul(slopeEffect()).mul(polyGrowthMults()).mul(diff))
}

function polyGrowthMults() {
  let poly = new Decimal(1)
  if(hasChallenge(1)) poly = poly.mul(CHALLENGES[1].effect())
  return poly
}

function updatePercent() {
  let buildings = BUYABLES[1].eff().add(BUYABLES[2].eff()).add(BUYABLES[3].eff())
  
  if(buildings.gt(0)) player.buildingPercent=[null,BUYABLES[1].eff().div(buildings).times(100),BUYABLES[2].eff().div(buildings).times(100),BUYABLES[3].eff().div(buildings).times(100)]
  else player.buildingPercent=[null,33.33,33.33,33.33]
}

function updateExps(diff) {
  player.chalExponents[0] = player.chalExponents[0].add(new Decimal(1).div(30).mul(diff)).min(1)
  player.chalExponents[1] = player.chalExponents[1].sub(new Decimal(0.04).mul(diff)).max(0)
}

function updateValues() {
  // Auto-Quadratic
  if(player.currentTab == 'quad' && document.getElementById("quadAuto")?.value == "" && player.inputValue != ""){
    changedQAdisplay = false
  }
  if(!changedQAdisplay && player.currentTab == 'quad'){
    changedQAdisplay = true
    if(document.getElementById("quadAuto"))document.getElementById("quadAuto").value = player.inputValue
  }
  if(player.quadUpgs.includes(14) && document.getElementById("quadAuto") && player.currentTab == 'quad'){
    player.inputValue = document.getElementById("quadAuto").value
  }
  
  // Root Epicenter Slider
  if(player.currentTab == "quad" && player.currentSubtab[0] == "sroot" && document.getElementById("epicSlider") != player.epicenterLevel && !changedESdisplay){
    if(document.getElementById("epicSlider")) document.getElementById("epicSlider").value = player.epicenterLevel
    changedESdisplay = true
  }
  if(player.currentTab != "quad" || player.currentSubtab[0] != "sroot") changedESdisplay = false
  if(changedESdisplay && document.getElementById("epicSlider")) player.epicenterLevel = document.getElementById("epicSlider").value
  
  // Auto-Complex
  if(player.currentTab == 'comp'&& document.getElementById("compAuto")?.value == "" && player.inputValue2 != ""){
    changedCAdisplay = false
  }
  if(!changedCAdisplay && player.currentTab == 'comp'){
    changedCAdisplay = true
    if(document.getElementById("compAuto"))document.getElementById("compAuto").value = player.inputValue2
  }
  if(hasMilestone(12) && document.getElementById("compAuto") && player.currentTab == 'comp'){
    player.inputValue2 = document.getElementById("compAuto").value
  }
}

function fixUnixEpoch() {
  if(player.prestigeTimes[0] >= 1639872000) player.prestigeTimes[0] = player.timePlayed
  if(player.prestigeTimes[2] >= 1639872000) player.prestigeTimes[2] = player.timePlayed
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

document.addEventListener("keydown", function onEvent(event) {

  switch (event.key) {
    case "1":
      if(player.options[2]) buyBuyable(1)
      break;
    case "2":
      if(player.options[2]) buyBuyable(2)
      break;
    case "3":
      if(player.options[2]) buyBuyable(3)
      break;
    case "4":
      if(player.options[2]) buyBuyable(4)
      break;
    case "5":
      if(player.options[2]) buyBuyable(5)
      break;
    case "6":
      if(player.options[2]) buyBuyable(6)
      break;
    case "x":
      if(player.options[2]) buyVariable('x')
      break;
    case "y":
      if(player.options[2]) buyVariable('y')
      break;
    case "m":
      if(player.options[2] && (player.totalx2.gte(1) || player.totali.gte(1))) buyMax()
      break;
    case "q":
      if(player.options[2] && !player.inSqrt) goQuadratic(false)
      break;
    case "s":
      if(player.options[2] && hasQU(16)) enterSqrt()
      break;
    case "b":
      if(player.options[2] && hasUpgrade(8)) buyB()
      break;
    case "c":
      if(player.options[2]) goComplex(false)
      break;
  }
});34