const Limit = {
  enter() {
    if(player.integration.inTheLimit){
      player.integration.limitScore = player.integration.limitScore.add(this.gainFormula())
    }
    IntegrationPrestige.integrate(true);
    if(!player.integration.inTheLimit){
      player.integration.limitEnters += 1
    }
    player.integration.inTheLimit = !player.integration.inTheLimit;
  },
  gainFormula() {
    let gain = Decimal.pow(1.5,this.totalLevels().max(Alterations.has(4) ? 80 : 0).min(80))
    gain = gain.mul(this.converging() || ((Limit.totalLevels().gte(80) || Alterations.has(4)) && IntegrationPrestige.dxFormula().gte(1)) ? ((Limit.totalLevels().gte(80) || Alterations.has(4)) && IntegrationPrestige.dxFormula().gte(1) ? 100 : player.i.add(1).log10().add(1).div(new Decimal(player.integration.convergenceGoal).add(1).log10().add(1)).mul(10).pow(IntegrationUpgrades.integration8.isBought() ? 2 : 1)) : 1)
    gain = gain.mul(this.collectiveMults())
    gain = gain.sub(player.integration.limitScore).max(0).floor()
    if(!player.integration.inTheLimit || IntegrationPrestige.dxFormula().lt(1)) gain = new Decimal(0)
    return gain
  },
  collectiveMults() {
    let mult = new Decimal(1)
    if(IntegrationUpgrades.integration9.isBought()) mult = mult.mul(IntegrationUpgrades.integration9.eff())
    mult = mult.mul(SinusoidalUpgrades[8].eff())
    mult = mult.mul(Decimal.pow(5,player.integration.rebuyableUpgrades[9]))
    mult = mult.mul(SinusoidalUpgrades[27].eff())
    if(HypercompUpgrades.has(10)) mult = mult.mul(HypercompUpgrades[10].eff())
    mult = mult.mul(HypercompFlune[1].eff())
    if(hasSDU(14)) mult = mult.mul(SYNTH_DIV_UPGRADES[14].eff())
    return mult
  },
  estimatedScore() {
    let gain = Decimal.pow(1.5,this.totalLevels().max(Alterations.has(4) ? 80 : 0).min(80))
    gain = gain.mul(IntegrationUpgrades.integration8.isBought() ? 100 : 10)
    gain = gain.mul(this.collectiveMults())
    gain = gain.sub(player.integration.limitScore).max(0).floor()
    return gain
  },
  challengeFactorDescriptions(x) {
    switch (x) {
      case 1:
        return `<i>Obviously no one can operate ${format("1.00e100000")} Point Factories...</i><br>Point gain ^${format(this.challengeFactorEffects(x))}`
      break;
      case 2:
        return `<i>Finally! One is greater than two.</i><br>x<sup>2</sup> gain ^${format(this.challengeFactorEffects(x))}`
      break;
      case 3:
        return `<i>Get it? Because roots? Okay, I’ll leave...</i><br>RE and CE gain ^${format(this.challengeFactorEffects(x))}`
      break;
      case 4:
        return `<i>That last Synthetic Division Upgrade turned out to be a big liar.</i><br>QP and IP gain ^${format(this.challengeFactorEffects(x))}`
      break;
      case 5:
        return `<i>This reminds me of that update that came out in 5 hours!</i><br>i gain ^${format(this.challengeFactorEffects(x))}`
      break;
      case 6:
        return `<i>No one will complain about the strategy now!</i><br>Complex Plane powers gain ^${format(this.challengeFactorEffects(x))}`
      break;
      case 7:
        return `<i>What if you never unlocked all that Z stuff in the first place?</i><br>y<sup>2</sup> gain ^${format(this.challengeFactorEffects(x))}`
      break;
      case 8:
        return `<i>You can only post one message every 6 hours.</i><br>Global speed /${format(this.challengeFactorEffects(x))}`
      break;
    }
  },
  challengeFactorEffects(x) {
    let level = player.integration.challengeFactors[x]
    switch (x) {
      case 1:
        return Decimal.pow(0.75,level) // points
      break;
      case 2:
        return Decimal.pow(0.5,level) // x^2
      break;
      case 3:
        return Decimal.pow(0.67,level) // RE/CE
      break;
      case 4:
        return Decimal.pow(0.5,level) // QP/IP
      break;
      case 5:
        return Decimal.pow(0.75,level) // i
      break;
      case 6:
        return Decimal.pow(0.4,level) // comp plane powers
      break;
      case 7:
        return Decimal.pow(0.8,level) // y^2
      break;
      case 8:
        return Decimal.pow(10,level.pow(2)) // global speed
      break;
      case 9:
        return Decimal.pow(SinusoidalUpgrades.has(20) ? 0.925 : 0.9,Limit.totalLevels()) // polynomials
      break;
    }
  },
  totalLevels() {
    return player.integration.challengeFactors[1].add(player.integration.challengeFactors[2]).add(player.integration.challengeFactors[3]).add(player.integration.challengeFactors[4]).add(player.integration.challengeFactors[5]).add(player.integration.challengeFactors[6]).add(player.integration.challengeFactors[7]).add(player.integration.challengeFactors[8])
  },
  converging() {
    return new Decimal(player.integration.convergenceGoal).gt(player.i)
  },
  scoreEffects(x) {
    switch (x) {
      case 1:
        return player.integration.limitScore.mul(IntegrationUpgrades.yquadratic9.isBought() ? circleEffects(6) : 1).pow(0.2).add(1)
      break
      case 2:
        return player.integration.limitScore.mul(IntegrationUpgrades.yquadratic9.isBought() ? circleEffects(6) : 1).pow(0.1).add(1)
      break
    }
  },
  unlockCost() {
    let arr = [null,new Decimal(1e21),new Decimal(1e55),new Decimal(1e103),new Decimal(Infinity)]
    return arr[player.integration.factorsUnlocked.length / 2]
  },
  unlockChallengeFactors() {
    if(player.integration.dx.gte(Limit.unlockCost())) {
      player.integration.dx = player.integration.dx.sub(Limit.unlockCost())
      if(player.integration.factorsUnlocked.length === 2) {
        player.integration.factorsUnlocked.push(5)
        player.integration.factorsUnlocked.push(8)
      } else if (player.integration.factorsUnlocked.length === 4) {
        player.integration.factorsUnlocked.push(2)
        player.integration.factorsUnlocked.push(7)
      } else {
        player.integration.factorsUnlocked.push(4)
        player.integration.factorsUnlocked.push(6)
      }
    }
  }
}