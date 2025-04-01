const TemporalPlane = {
  effect(x) {
    return player.integration.temporalPlane.powers[x].add(1).log(BasicHypercompUpgrades.has(9) ? 1.001 : 2).pow(hasYQU(15,'bought') ? 1.3 : 1.25).mul(player.integration.temporalPlane.assigned[x].add(1).log10().add(1).cbrt()).add(1)
  },
  buyableCosts(x) {
    switch (x) {
      case 0:
        return new Decimal(100).mul(Decimal.pow(2,player.integration.temporalPlane.buyables[x]))
        break;
      case 1:
        return new Decimal(10000).mul(Decimal.pow(5,player.integration.temporalPlane.buyables[x]))
        break;
      case 2:
        return new Decimal(1e7).mul(Decimal.pow(15,player.integration.temporalPlane.buyables[x]))
        break;
      case 3:
        return new Decimal(1e11).mul(Decimal.pow(75,player.integration.temporalPlane.buyables[x]))
        break;
      case 4:
        return new Decimal(1e16).mul(Decimal.pow(250,player.integration.temporalPlane.buyables[x]))
        break;
    }
  },
  buyVar(x) {
    if(player.integration.dx.gte(TemporalPlane.buyableCosts(x))) {
      player.integration.dx = player.integration.dx.sub(TemporalPlane.buyableCosts(x))
      player.integration.temporalPlane.buyables[x] = player.integration.temporalPlane.buyables[x].add(1)
    }
  },
  generate(x) {
    let tp = Decimal.pow(1.2,player.integration.temporalPlane.buyables[x]).mul(player.integration.temporalPlane.buyables[x])
    if(BasicHypercompUpgrades.has(8)) tp = tp.mul(TemporalPlane.totalEffect())
    return tp
  },
  oscillatingExponent() {
    if(player.sinUpgrades[22] >= 1) {
      return 1 + (player.sinUpgrades[22] * 0.05) + (player.sinUpgrades[33] * 0.05)
    } else {
      let min = player.sinUpgrades[14] / 10
      if(Date.now() % 30000 <= 15000) {
        return (((Date.now() % 15000) / 15000) * (1 - min)) + min
      } else {
        return ((1 - min) - (((Date.now() % 15000) / 15000) * (1 - min))) + min
      }
    }
  },
  totalEffect() {
    let x = TemporalPlane.effect(0).mul(TemporalPlane.effect(1)).mul(TemporalPlane.effect(2)).mul(TemporalPlane.effect(3)).mul(TemporalPlane.effect(4)).pow(TemporalPlane.oscillatingExponent())
    if(player.integration.temporalPlane.timeJumpDuration > 0) x = TemporalPlane.effect(0).mul(TemporalPlane.effect(1)).mul(TemporalPlane.effect(2)).mul(TemporalPlane.effect(3)).mul(TemporalPlane.effect(4)).div(10).mul(300 * tmp.holesToSacrifice)
    x = x.mul(NumberSets.effect(6,3))
    if(player.integration.chalCompletions[6].includes(0)) x = x.pow(1.5)
    x = x.pow(NumberSets.effect(7,3))
    if(hasPermUpgrade(13)) x = x.mul(PERM_UPGRADES[13].eff())
    if(!player.options[18]) x = new Decimal(1)
    if(player.integration.challenge == 6 && player.integration.ic6Version == 0) x = new Decimal(0.01)
    x = x.mul(tmp.devspeed)
    if(player.integration.inTheLimit) x = x.div(Limit.challengeFactorEffects(8))
    if(player.integration.challenge == 4) x = x.pow(Decimal.sub(1,(player.integration.ic4Prestiges[0]+player.integration.ic4Prestiges[1]+player.integration.ic4Prestiges[2]) / 3))
    return x
  },
  selectHoles(imported = undefined) {
    if(imported === undefined) imported = new Decimal(prompt("How many holes are you willing to sacrifice?"))
    if(!imported.eq(0)) tmp.holesToSacrifice = imported.min(SinusoidalUpgrades.has(19) ? 288 : 576).floor()
  },
  timeJump() {
    if(player.integration.temporalPlane.timeJumpCooldown == 0 && tmp.holesToSacrifice.gt(0)) {
      if(tmp.holesToSacrifice.min(SinusoidalUpgrades.has(19) ? 288 : 576).eq(SinusoidalUpgrades.has(19) ? 288 : 576) && !hasSecretAchievement(21)) {
        player.secretAchievements.push('21')
        $.notify("Secret Achievement Unlocked: Jumping to Conclusions", {
          style: 'apcurrent',
          className:'secretAchieves',
        });
      }
      player.integration.temporalPlane.timeJumpCooldown = 21600 + Math.floor((SinusoidalUpgrades.has(19) ? 525 : 262.5) * tmp.holesToSacrifice.min(SinusoidalUpgrades.has(19) ? 288 : 576).toNumber()) // cooldown in real time before you can time-jump again
      player.integration.holes = player.integration.holes.sub(tmp.holesToSacrifice)
      player.integration.temporalPlane.timeJumpDuration = 1 // duration of the time jump (for the purposes of manipulating your global speed)
      let interval = 300 * tmp.holesToSacrifice * (SinusoidalUpgrades.has(19) ? 2 : 1)
      player.prestigeTimes[0] += interval
      player.prestigeTimes[2] += interval
      player.prestigeTimes[4] += interval
      player.prestigeTimes[6] += interval
      player.prestigeTimes[8] += interval
      if(!BasicHypercompUpgrades.has(8)) {
        for (let i = 0; i < 5; i++) {
          player.integration.temporalPlane.powers[i] = player.integration.temporalPlane.powers[i].add(TemporalPlane.generate(i).mul(interval))
        }
        player.trigFunctions.waves = player.trigFunctions.waves.add(TrigFunctions.waveGen().mul(interval))
        for (let i = 1; i < 7; i++) {
          player.trigFunctions.powers[i] = player.trigFunctions.powers[i].add(TrigFunctions.powerGen(i).mul(interval))
        }
        if(Derivatives.jnFormula().gte(player.integration.derivatives.highestReached)) player.integration.derivatives.highestReached = Derivatives.jnFormula()
        if(PythagoreanTriples.hasMilestone(6)) player.integration.derivatives[0] = player.integration.derivatives[0].add(player.integration.derivatives[1].mul(Derivatives.gainMult()).pow(hasPermUpgrade(15) ? 1.01 : 1).mul(interval))
        if(!player.inLostIntegration) {
          player.integration.derivatives[1] = player.integration.derivatives[1].add(player.integration.derivatives[2].mul(Derivatives.gainMult()).pow(hasPermUpgrade(15) ? 1.01 : 1).mul(interval))
          player.integration.derivatives[2] = player.integration.derivatives[2].add(player.integration.derivatives[3].mul(Derivatives.gainMult()).pow(hasPermUpgrade(15) ? 1.01 : 1).mul(interval))
          if(player.integration.derivatives.highestReached.lt(5e6)) player.integration.derivatives[2] = player.integration.derivatives[2].add(Derivatives.gainFormula().mul(interval))
          if(player.integration.derivatives.highestReached.gte(5e6)) player.integration.derivatives[3] = player.integration.derivatives[3].add(Derivatives.gainFormula().mul(interval))
        }
        for(let i=3; i<10; i++){
          player.yPolynomials[i].amount=player.yPolynomials[i].amount.add(YPolynomials.gen(i+1).mul(interval))
        }
        player.yPolyPower = player.yPolyPower.add(YPolynomials.gen(3).mul(interval))
        player.pythTriples.essence = player.pythTriples.essence.add(PythagoreanTriples.peGen().mul(interval))
        if(Alterations.has(2)) {
          player.j = player.j.add(HypercompUpgrades.jGen().mul(interval))
          player.k = player.k.add(HypercompUpgrades.kGen().mul(interval))
        }
      }
      for (let i = 1; i <= 8; i++) {
        player.hypercompFlune.powers[i] = player.hypercompFlune.powers[i].add(HypercompFlune.gen(i).mul(interval))
      }
    }
  },
  assignHoles(type,amount) {
    player.integration.holes = player.integration.holes.sub(amount)
    player.integration.temporalPlane.assigned[type] = player.integration.temporalPlane.assigned[type].add(amount)
  },
  distributeHoles(percent) {
    if(player.integration.holes.gte(5)) {
      let x = player.integration.holes.div(5).mul(percent / 100).floor()
      for (let i = 0; i < 5; i++) {
        player.integration.holes = player.integration.holes.sub(x)
        player.integration.temporalPlane.assigned[i] = player.integration.temporalPlane.assigned[i].add(x)
      }
    }
  },
}