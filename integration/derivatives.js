const Derivatives = {
  jnFormula() {
    return player.integration.inTheLimit && player.integration.challengeFactors[1].add(player.integration.challengeFactors[2]).add(player.integration.challengeFactors[3]).add(player.integration.challengeFactors[4]).add(player.integration.challengeFactors[5]).add(player.integration.challengeFactors[6]).add(player.integration.challengeFactors[7]).add(player.integration.challengeFactors[8]).eq(80) ? player.x.mul(player.y).mul(player.z).pow(0.25).mul(Derivatives.buyables[2].eff()) : new Decimal(0)
  },
  gainFormula() {
    let gain = new Decimal(0)
    if(player.integration.derivatives.highestReached.lt(5e6)) gain = player.integration.derivatives.highestReached.div(10000).pow(0.5)
    if(player.integration.derivatives.highestReached.gte(5e6)) gain = player.integration.derivatives.highestReached.div(10000000000).pow(0.75)
    gain = gain.mul(Derivatives.gainMult())
    gain = gain.pow(HypercompFlune[4].eff())
    if(hasSDU(12)) gain = gain.pow(SYNTH_DIV_UPGRADES[12].eff())
    if(hasPermUpgrade(15)) gain = gain.pow(1.01)
    return gain
  },
  gainMult() {
    let mult = new Decimal(1)
    mult = mult.mul(Derivatives.functions[1].eff()).mul(Derivatives.functions[2].eff()).mul(Derivatives.functions[3].eff())
    if(player.unitCircle.quadrant == 2 || Alterations.has(1)) mult = mult.mul(UnitCircle.effect())
    if(PythagoreanTriples.hasMilestone(1)) mult = mult.mul(PythagoreanTriples.barMilestones[1].eff())
    if(HypercompUpgrades.has(11)) mult = mult.mul(HypercompUpgrades[11].eff())
    if(BasicHypercompUpgrades.has(8)) mult = mult.mul(TemporalPlane.totalEffect())
    return mult
  },
  functions: {
    1: {
      title: "f'(",
      cost() {
        return new Decimal(5e19).mul(Decimal.pow(2,player.integration.derivatives.functions[1]))
      },
      formula(){return this.exponent().gt(1) ? "(n + 1)<sup>" + formatWhole(this.exponent()) + "</sup>" : "n + 1"},
      eff() {
        return player.integration.derivatives.functions[1].add(1).pow(this.exponent())
      },
      exponent() {
        let exp = new Decimal(1)
        return exp
      },
    },
    2: {
      title: "g'(",
      cost() {
        return new Decimal(1e24).mul(Decimal.pow(5,player.integration.derivatives.functions[2]))
      },
      formula(){return format(this.base()) + "<sup>n</sup>"},
      eff() {
        return Decimal.pow(this.base(),player.integration.derivatives.functions[2])
      },
      base() {
        let base = new Decimal(2)
        base = base.add(Derivatives.buyables[8].eff())
        if(hasChargedQU(9)) base = base.add(5)
        return base
      },
    },
    3: {
      title: "h'(",
      cost() {
        return new Decimal(1e26).mul(Decimal.pow(7,player.integration.derivatives.functions[3]))
      },
      formula(){return format(this.base()) + "<sup>n</sup>"},
      eff() {
        return Decimal.pow(this.base(),player.integration.derivatives.functions[3])
      },
      base() {
        let base = new Decimal(3)
        base = base.add(Derivatives.buyables[8].eff())
        if(hasChargedQU(9)) base = base.add(5)
        return base
      },
    },
    buy(x) {
      if(player.integration.limitScore.gte(Derivatives.functions[x].cost())) {
        player.integration.derivatives.functions[x] = player.integration.derivatives.functions[x].add(1)
      }
    },
  },
  buyables: {
    1: {
      title: "Constant Rule",
      desc: "Multiply the Square Root hardcap start by 1e600,000,000 per purchase",
      currency: "derivatives",
      cost() {
        return new Decimal(100).mul(Decimal.pow(100,player.integration.derivatives.buyables[1])).mul(Decimal.pow(100,player.integration.derivatives.buyables[1].sub(19).max(0).pow(2)))
      },
      eff() {
        return Decimal.pow("1e6e8",player.integration.derivatives.buyables[1])
      },
      effectDisplay() {
        return format(this.eff()) + "x Square Root hardcap start";
      },
    },
    2: {
      title: "Constant Multiple Rule",
      desc: "Double the value of j(n) per purchase (non-retroactive)",
      currency: "derivatives",
      cost() {
        return new Decimal(1000000).mul(Decimal.pow(1000,player.integration.derivatives.buyables[2])).mul(Decimal.pow(100,player.integration.derivatives.buyables[2].sub(11).max(0).pow(2)))
      },
      eff() {
        return Decimal.pow(2,player.integration.derivatives.buyables[2])
      },
      effectDisplay() {
        return format(this.eff()) + "x j(n) value";
      },
    },
    3: {
      title: "Power Rule",
      desc: "Power all Set Sacrifice effects by +0.01 per purchase",
      currency: "second derivatives",
      cost() {
        return player.integration.derivatives.buyables[3].gte(45) ? new Decimal(Infinity) : new Decimal(100).mul(Decimal.pow(100,player.integration.derivatives.buyables[3]))
      },
      eff() {
        return Decimal.div(player.integration.derivatives.buyables[3],100)
      },
      effectDisplay() {
        return "+" + format(this.eff()) + " all Set Sacrifice effects";
      },
    },
    4: {
      title: "Sum Rule",
      desc: "Add +0.01 to the g(n) and h(n) softcap exponent per purchase",
      currency: "second derivatives",
      cost() {
        return player.integration.derivatives.buyables[4].gte(25) ? new Decimal(Infinity) : new Decimal(1000000).mul(Decimal.pow(1000,player.integration.derivatives.buyables[4]))
      },
      eff() {
        return Decimal.div(player.integration.derivatives.buyables[4],100)
      },
      effectDisplay() {
        return "+" + format(this.eff()) + " g(n) and h(n) softcap exponent";
      },
    },
    5: {
      title: "Difference Rule",
      desc: "Halve Singularity Upgrade costs per purchase",
      currency: "third derivatives",
      cost() {
        return new Decimal(10000).mul(Decimal.pow(10000,player.integration.derivatives.buyables[5])).mul(Decimal.pow(100,player.integration.derivatives.buyables[5].sub(24).max(0).pow(2)))
      },
      eff() {
        return Decimal.pow(2,player.integration.derivatives.buyables[5])
      },
      effectDisplay() {
        return "/" + format(this.eff()) + " Singularity Upgrade costs";
      },
    },
    6: {
      title: "Product Rule",
      desc: "Double the g(n) and h(n) bases per purchase",
      currency: "third derivatives",
      cost() {
        return new Decimal(1e5).mul(Decimal.pow(1e5,player.integration.derivatives.buyables[6])).mul(Decimal.pow(100,player.integration.derivatives.buyables[6].sub(19).max(0).pow(2)))
      },
      eff() {
        return Decimal.pow(2,player.integration.derivatives.buyables[6])
      },
      effectDisplay() {
        return format(this.eff()) + "x g(n) and h(n) bases";
      },
    },
    7: {
      title: "Quotient Rule",
      desc: "Multiply the empty set instability start by 1e10 per purchase",
      currency: "antiderivatives",
      cost() {
        return new Decimal(1e110).mul(Decimal.pow(1e10,player.integration.derivatives.buyables[7])).mul(Decimal.pow(100,player.integration.derivatives.buyables[7].sub(29).max(0).pow(2)))
      },
      eff() {
        return Decimal.pow(1e10,player.integration.derivatives.buyables[7])
      },
      effectDisplay() {
        return format(this.eff()) + "x empty set instability start";
      },
    },
    8: {
      title: "Chain Rule",
      desc: "Add 0.25 to the g'(n) and h'(n) bases per purchase",
      currency: "antiderivatives",
      cost() {
        return new Decimal(1e115).mul(Decimal.pow(1e10,player.integration.derivatives.buyables[8])).mul(Decimal.pow(10,player.integration.derivatives.buyables[8].pow(2)))
      },
      eff() {
        return Decimal.div(player.integration.derivatives.buyables[8],4)
      },
      effectDisplay() {
        return "+" + format(this.eff()) + " g'(n) and h'(n) bases";
      },
    },
    canAfford(x) {
      if(x == 1 || x == 2) {
        return player.integration.derivatives[1].gte(Derivatives.buyables[x].cost())
      } else if (x == 3 || x == 4) {
        return player.integration.derivatives[2].gte(Derivatives.buyables[x].cost())
      } else if (x == 5 || x == 6) {
        return player.integration.derivatives[3].gte(Derivatives.buyables[x].cost())
      } else if (x == 7 || x == 8) {
        return player.integration.derivatives[0].gte(Derivatives.buyables[x].cost())
      }
    },
    buy(x) {
      if(Derivatives.buyables.canAfford(x)) {
        if(x == 1 || x == 2) {
          player.integration.derivatives[1] = player.integration.derivatives[1].sub(Derivatives.buyables[x].cost())
        } else if (x == 3 || x == 4) {
          player.integration.derivatives[2] = player.integration.derivatives[2].sub(Derivatives.buyables[x].cost())
        } else if (x == 5 || x == 6) {
          player.integration.derivatives[3] = player.integration.derivatives[3].sub(Derivatives.buyables[x].cost())
        } else if (x == 7 || x == 8) {
          player.integration.derivatives[0] = player.integration.derivatives[0].sub(Derivatives.buyables[x].cost())
        }
        player.integration.derivatives.buyables[x] = player.integration.derivatives.buyables[x].add(1)
      }
    },
  },
}