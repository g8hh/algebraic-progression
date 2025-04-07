const XUpgradesLI = {
    1: {
      desc: "Point generator cost scaling is *1.06",
      cost: new Decimal(10),
    },
    2: {
      desc: "All point generators are 3x more effective",
      cost: new Decimal(20),
    },
    3: {
      desc: "The \"Get an X\" button’s cost is divided by 2",
      cost: new Decimal(30),
    },
    4: {
      desc: "Unlock generator multiplier",
      cost: new Decimal(50),
    },
    5: {
      desc: "Divide X cost by 1 million and multiply point gain by 1,000",
      cost: new Decimal(1e20),
    },
    6: {
      desc: "Generators produce each other",
      cost: new Decimal(2e21),
    },
    7: {
      desc: "Raise point gain to ^1.04",
      cost: new Decimal(1.5e22),
    },
    8: {
      desc: "Gain 10x more root essence",
      cost: new Decimal(1e23),
    },
    buy(x) {
        if(player.x.gte(XUpgradesLI[x].cost) && !hasUpgrade(x)) player.xUpgs.push(x)
    },
  }

  const GeneratorMultiplier = {
    cost() {
        let cost = new Decimal(50).add(player.buyables[4].mul(hasQU(9) ? 4 : 5))
        if(cost.gte(this.superscalingStart())) cost = cost.div(this.superscalingStart()).pow(1.25).mul(this.superscalingStart())
        cost = cost.floor()
        return cost
    },
    buy() {
        if(player.abc[1].gte(this.cost())) player.buyables[4] = player.buyables[4].add(1)
    },
    mult() {
        let mult = Decimal.pow(this.multPerPurchase(),player.buyables[4])
        if(mult.gt(this.softcapStart())) mult = mult.div(this.softcapStart()).pow(0.5).mul(this.softcapStart())
        if(player.challenge == 13 || player.challenge == 16 || player.compChallenge == 6 || player.yChallenge == 3) mult = new Decimal(1)
        return mult
    },
    multPerPurchase() {
      let x = new Decimal(1.3)
      if(hasQU(6)) x = x.add(0.1)
      if(hasChallenge(13)) x = x.add(0.1)
      if(hasCU(0,8)) x = x.add(ComplexUpgradesLI[8].eff())
      if(FractalArm.hasUpgrade(62)) x = x.add(0.2)
      return x
    },
    superscalingStart() {
      let start = new Decimal(200)
      if(hasQU(24)) start = start.add(300)
      return start
    },
    softcapStart() {
      let softcap = new Decimal("1e400000")
      if(FractalArm.hasUpgrade(61)) softcap = softcap.mul("1e400000")
      return softcap
    }
  }