const RebuyableIntegrationUpgrades = {
  1: {
    title: "Temporal Integrator",
    desc: "Multiply Quadratic Power and Z-Power gain by 10x per purchase.",
    cost() {
      return Decimal.pow(20,player.integration.rebuyableUpgrades[1]).div(SinusoidalUpgrades[18].eff())
    },
    eff() {
      return Decimal.pow(10,player.integration.rebuyableUpgrades[1].add(IntegrationUpgrades.integration5.isBought() ? 2 : 0)).pow(SinusoidalUpgrades.has(10) ? 10 : 1)
    },
    effectDisplay() {
      return format(this.eff()) + "x QP gain and Z-Power gain";
    },
  },
  2: {
    title: "Exponential Integrator",
    desc: "Multiply the efficiency of all polynomials by 100x per purchase.",
    cost() {
      return Decimal.pow(30,player.integration.rebuyableUpgrades[2]).div(SinusoidalUpgrades[18].eff())
    },
    eff() {
      return Decimal.pow(100,player.integration.rebuyableUpgrades[2].add(IntegrationUpgrades.integration5.isBought() ? 2 : 0))
    },
    effectDisplay() {
      return format(this.eff()) + "x polynomial efficiency";
    },
  },
  3: {
    title: "Synthetic Integrator",
    desc: "Multiply synthetic essence gain by 10x per purchase.",
    cost() {
      return Decimal.pow(40,player.integration.rebuyableUpgrades[3]).div(SinusoidalUpgrades[18].eff())
    },
    eff() {
      return Decimal.pow(10,player.integration.rebuyableUpgrades[3].add(IntegrationUpgrades.integration5.isBought() ? 2 : 0))
    },
    effectDisplay() {
      return format(this.eff()) + "x SE gain";
    },
  },
  4: {
    title: "Quadratic Integrator",
    desc: "Multiply Quadratic count gain by 10x per purchase.",
    cost() {
      return Decimal.pow(50,player.integration.rebuyableUpgrades[4]).mul(2).div(SinusoidalUpgrades[18].eff())
    },
    eff() {
      return Decimal.pow(10,player.integration.rebuyableUpgrades[4].add(IntegrationUpgrades.integration5.isBought() ? 2 : 0))
    },
    effectDisplay() {
      return format(this.eff()) + "x Quadratics gain";
    },
  },
  5: {
    title: "Imaginary Integrator",
    desc: "Multiply Complex count gain by 5x per purchase.",
    cost() {
      return Decimal.pow(60,player.integration.rebuyableUpgrades[5]).mul(2).div(SinusoidalUpgrades[18].eff())
    },
    eff() {
      return Decimal.pow(5,player.integration.rebuyableUpgrades[5].add(IntegrationUpgrades.integration5.isBought() ? 2 : 0))
    },
    effectDisplay() {
      return format(this.eff()) + "x Complexes gain";
    },
  },
  6: {
    title: "Integrated Vortex",
    desc: "Multiply dx gain by 100x per purchase.",
    cost() {
      return Decimal.pow(3,player.integration.rebuyableUpgrades[6]).div(Derivatives.buyables[5].eff())
    },
    eff() {
      return Decimal.pow(100,player.integration.rebuyableUpgrades[6])
    },
    effectDisplay() {
      return format(this.eff()) + "x dx gain";
    },
  },
  7: {
    title: "Uncontrollable Vortex",
    desc: "Add 0.01 to the Polynomial per-purchase multiplier per purchase.",
    cost() {
      return player.integration.rebuyableUpgrades[7].gte(10) ? new Decimal(Infinity) : Decimal.pow(4,player.integration.rebuyableUpgrades[7]).div(Derivatives.buyables[5].eff())
    },
    eff() {
      return player.integration.rebuyableUpgrades[7].div(100)
    },
    effectDisplay() {
      return "+" + format(this.eff()) + " Polynomial per-purchase multiplier";
    },
  },
  8: {
    title: "Sinusoidal Vortex",
    desc: "Multiply Trigonometric Waves gain by 10x per purchase.",
    cost() {
      return Decimal.pow(5,player.integration.rebuyableUpgrades[8]).mul(2).div(Derivatives.buyables[5].eff())
    },
    eff() {
      return Decimal.pow(10,player.integration.rebuyableUpgrades[8])
    },
    effectDisplay() {
      return format(this.eff()) + "x TW gain";
    },
  },
  9: {
    title: "Converging Vortex",
    desc: "Multiply limit score gain by 5x per purchase.",
    cost() {
      return Decimal.pow(6,player.integration.rebuyableUpgrades[9]).mul(2).div(Derivatives.buyables[5].eff())
    },
    eff() {
      return Decimal.pow(5,player.integration.rebuyableUpgrades[9])
    },
    effectDisplay() {
      return format(this.eff()) + "x LS gain";
    },
  },
  10: {
    title: "Asymptotic Vortex",
    desc: "Double holes gain per purchase.",
    cost() {
      return Decimal.pow(10,player.integration.rebuyableUpgrades[10]).mul(10).div(Derivatives.buyables[5].eff())
    },
    eff() {
      return Decimal.pow(2,player.integration.rebuyableUpgrades[10])
    },
    effectDisplay() {
      return format(this.eff()) + "x holes gain";
    },
  },
  canAfford(x) {
    return x < 6 ? player.integration.dx.gte(RebuyableIntegrationUpgrades[x].cost()) : player.integration.holes.gte(RebuyableIntegrationUpgrades[x].cost())
  },
  buy(x) {
    if(x < 6) {
      if(player.integration.dx.gte(RebuyableIntegrationUpgrades[x].cost())) {
        player.integration.dx = player.integration.dx.sub(RebuyableIntegrationUpgrades[x].cost())
        player.integration.rebuyableUpgrades[x] = player.integration.rebuyableUpgrades[x].add(1)
      }
    } else {
      if(player.integration.holes.gte(RebuyableIntegrationUpgrades[x].cost())) {
        if(!Alterations.has(2)) player.integration.holes = player.integration.holes.sub(RebuyableIntegrationUpgrades[x].cost())
        player.integration.rebuyableUpgrades[x] = player.integration.rebuyableUpgrades[x].add(1)
      }
    }
  },
}

const IntegrationUpgrades = {
  start: {
    id: "START",
    desc: "Unlock the ability to buy Set effect slots and Set type slots with dx.",
    type: "algebraic",
    canBuy() {return player.integration.holes.gte(1)},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
      }
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 3,
    y: 3,
    children: ["spo", "upa", "yqr", "pla"],
  },
  spo: {
    id: "SPO",
    desc: "Start with 1e50 Points.",
    type: "natural",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.start.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      if(player.points.lt(1e50)) player.points = new Decimal(1e50)
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 2,
    y: 3,
    children: ["squ", "anr"],
  },
  squ: {
    id: "SQU",
    desc: "Start with 1e9 x².",
    type: "rational",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.spo.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      if(player.x2.lt(1e9)) player.x2 = new Decimal(1e9)
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 1,
    y: 3,
    children: ["sco", "syq"],
  },
  sco: {
    id: "SCO",
    desc: "Start with 100,000 i.",
    type: "complex",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.squ.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      if(player.i.lt(100000)) player.i = new Decimal(100000)
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 1,
    y: 2,
    children: [],
  },
  syq: {
    id: "SYQ",
    desc: "Start with 100 y².",
    type: "real",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.squ.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      if(player.y2.lt(100)) player.y2 = new Decimal(100)
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 1,
    y: 4,
    children: [],
  },
  anr: {
    id: "ANR",
    desc: "Immediately unlock the first 60 Achievements and Integration no longer resets them.",
    type: "natural",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.spo.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 2,
    y: 4,
    children: [],
  },
  upa: {
    id: "UPA",
    desc: "Unlock an autobuyer for the UP purchase buttons.",
    type: "complex",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.start.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
      }
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 3,
    y: 2,
    children: ["bcu", "mil1", "zlc"],
  },
  bcu: {
    id: "BCU",
    desc: "Start with all Basic Complex Upgrades bought.",
    type: "complex",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.upa.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      for (let i = 1; i < 10; i++) {
        if(!player.compUpgs[1].includes(i)) player.compUpgs[1].push(i)
      }
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 2,
    y: 2,
    children: ["aco", "ccb"],
  },
  mil1: {
    id: "MIL1",
    desc: "Start with 20 Complexes on Integration.",
    type: "complex",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.upa.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      if(player.complexes.lt(20)) player.complexes = new Decimal(20)
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 3,
    y: 1,
    children: ["mil2", "cpr"],
  },
  mil2: {
    id: "MIL2",
    desc: "Keep the CC tiers-based Milestones on Integration.",
    type: "complex",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.mil1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 3,
    y: 0,
    children: [],
  },
  aco: {
    id: "ACO",
    desc: "Unlock a new mode for Auto-Complex.",
    type: "complex",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.bcu.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 2,
    y: 1,
    children: [],
  },
  cpr: {
    id: "CPR",
    desc: "Complex Plane powers no longer have unlock requirements.",
    type: "complex",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.mil1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 4,
    y: 1,
    children: [],
  },
  pcc1: {
    id: "PCC1",
    desc: "Autocomplete 1 CC tier every 30 real-time minutes.",
    type: "complex",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.ccb.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      player.integration.autoCCTimer = 1800
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 1,
    y: 0,
    children: ["pcc2"],
  },
  pcc2: {
    id: "PCC2",
    desc: "Autocomplete 1 CC tier every 10 real-time minutes.",
    type: "complex",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.pcc1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      if(player.integration.autoCCTimer > 1200) player.integration.autoCCTimer -= 1200
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 0,
    y: 0,
    children: [],
  },
  ccb: {
    id: "CCB",
    desc: "You can complete multiple tiers of a Complex Challenge if you meet the goal for higher completions of the challenge.",
    type: "complex",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.bcu.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 1,
    y: 1,
    children: ["pcc1", "acu"],
  },
  acu: {
    id: "ACU",
    desc: "Unlock an autobuyer for fourth-row Complex Upgrades.",
    type: "complex",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.ccb.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 2,
    y: 0,
    children: [],
  },
  zlc: {
    id: "ZLC",
    desc: "All Z-Colliders are charged at the same time.",
    type: "complex",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.upa.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 4,
    y: 2,
    children: ["zla"],
  },
  zla: {
    id: "ZLA",
    desc: "Z Lab is always unlocked, the Expansion Z-Collider is always maxed out, and unlock autobuyers for leveling up Z-Colliders.",
    type: "complex",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.zlc.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      player.zlab.levels[1] = 20
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 5,
    y: 1,
    children: ["zea"],
  },
  zea: {
    id: "ZEA",
    desc: "Unlock an autobuyer for Z-Empowerments.",
    type: "complex",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.zla.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 5,
    y: 0,
    children: ["exr"],
  },
  exr: {
    id: "EXR",
    desc: "When unlocking Transformations, all Transformations are extruded, and Dilations are permanently active.",
    type: "rational",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.zea.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 4,
    y: 0,
    children: [],
  },
  yqr: {
    id: "YQR",
    desc: "Remove the requirements for purchasing the first 12 Y-Quadratic Upgrades.",
    type: "real",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.start.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 3,
    y: 4,
    children: ["yqu", "vsr", "ycr"],
  },
  yqu: {
    id: "YQU",
    desc: "Start with all Y-Quadratic Upgrades bought.",
    type: "real",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.yqr.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      for (let i = 1; i < 13; i++) {
        if(!player.yQuadUpgs[0].includes(i)) player.yQuadUpgs[0].push(i)
      }
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 4,
    y: 4,
    children: ["tam"],
  },
  tam: {
    id: "TAM",
    desc: "The Temporal Ascension effect is always ^1.25.",
    type: "real",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.yqu.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 5,
    y: 4,
    children: ["ayq"],
  },
  ayq: {
    id: "AYQ",
    desc: "Unlock two new modes for the Y-Quadratic Automator.",
    type: "real",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.tam.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 5,
    y: 3,
    children: [],
  },
  vsr: {
    id: "VSR",
    desc: "After unlocking the Variable Synthesizer, start with all illegal products unlocked.",
    type: "real",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.yqr.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 3,
    y: 5,
    children: ["cxu"],
  },
  cxu: {
    id: "CXU",
    desc: "After unlocking the Variable Synthesizer, start with 8 xy and all Charged X Upgrades bought.",
    type: "real",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.vsr.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 2,
    y: 5,
    children: ["pas"],
  },
  pas: {
    id: "PAS",
    desc: "Gain 1% of x²y² gain on x²y² reset every second.",
    type: "real",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.cxu.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 1,
    y: 5,
    children: ["ymu"],
  },
  ymu: {
    id: "YMU",
    desc: "Start with Variable Synthesizer and Y-Challenges unlocked.",
    type: "real",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.pas.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 0,
    y: 5,
    children: [],
  },
  ycr: {
    id: "YCR",
    desc: "After unlocking Y-Challenges, start with all Y-Challenges unlocked.",
    type: "real",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.yqr.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      player.yChalsUnlocked[2] = true
      player.yChalsUnlocked[3] = true
      player.yChalsUnlocked[4] = true
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 4,
    y: 5,
    children: ["pyc"],
  },
  pyc: {
    id: "PYC",
    desc: "Automatically gain YC4 completions outside of the challenge at a reduced rate.",
    type: "real",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.ycr.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 5,
    y: 5,
    children: [],
  },
  pla: {
    id: "PLA",
    desc: "Unlock autobuyers for Polynomials.",
    type: "integer",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.start.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 4,
    y: 3,
    children: ["pba"],
  },
  pba: {
    id: "PBA",
    desc: "Unlock an autobuyer for Polynomial Buyables.",
    type: "integer",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.pla.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 5,
    y: 2,
    children: ["sda", "sse"],
  },
  sda: {
    id: "SDA",
    desc: "Unlock autobuyers for the repeatable Synthetic Division Upgrades.",
    type: "integer",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.pba.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 6,
    y: 1,
    children: ["sdu"],
  },
  sse: {
    id: "SSE",
    desc: "After unlocking Synthetic Division, start with 1,000 Synthetic Essence.",
    type: "integer",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.pba.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 6,
    y: 3,
    children: ["se1", "sdr"],
  },
  sdu: {
    id: "SDU",
    desc: "After unlocking Synthetic Division, automatically buy the 1st and 2nd rows of Synthetic Division Upgrades for free.",
    type: "integer",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.sda.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 6,
    y: 0,
    children: ["aip"],
  },
  aip: {
    id: "AIP",
    desc: "Automatically purchase the passive UP generation Synthetic Division Upgrade once you can afford it.",
    type: "integer",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.sdu.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 7,
    y: 0,
    children: [],
  },
  se1: {
    id: "SE1",
    desc: "After buying the x⁶ Polynomial Buyable, multiply your current SE amount by 1.5.",
    type: "integer",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.sse.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      player.integration.seBuyableCounter = player.polynomials.buyables[4]
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 6,
    y: 4,
    children: ["se2"],
  },
  se2: {
    id: "SE2",
    desc: "After buying the first repeatable Synthetic Division Upgrade, multiply your current SE amount by 2.",
    type: "integer",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.se1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      player.integration.sdu1Counter = player.synthDivUpgs[0][1]
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 6,
    y: 5,
    children: ["se3"],
  },
  se3: {
    id: "SE3",
    desc: "After buying the first repeatable Synthetic Division Upgrade, multiply your current SE amount by 3.",
    type: "integer",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.se2.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 7,
    y: 5,
  },
  sdr: {
    id: "SDR",
    desc: "Remove the x⁶ requirement for unlocking Synthetic Division.",
    type: "integer",
    canBuy() {return player.integration.holes.gte(1) && IntegrationUpgrades.sse.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.holes = player.integration.holes.sub(1)
        player.integration.upgrades.qol.push(this.id.toLowerCase())
        this.onBuy()
      }
    },
    onBuy() {
      console.log("upgrade has been bought")
    },
    isBought() {return player.integration.upgrades.qol.includes(this.id.toLowerCase())},
    x: 6,
    y: 2,
  },
  prod1: {
    id: "Integration Bonus",
    desc: "Gain more x² and i based on total dx, and weaken the X factor softcap.",
    type: "center",
    cost: new Decimal(30),
    eff() {return player.integration.totaldx.pow(10).add(1)},
    effectDisplay() {return format(this.eff()) + "x x² and i gain"},
    canBuy() {return player.integration.dx.gte(this.cost)},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 7,
    y: 9,
    children: ["points1","quadratic1","complex1","yquadratic1","polynomials1","integration1"],
  },
  prod2: {
    id: "Secret Upgrade",
    desc: "Shh...don't touch anything else...",
    type: "center",
    cost: new Decimal(Infinity),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost)},
    buy() {return},
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 8,
    y: 9,
  },
  points1: {
    id: "Upgrade #1",
    desc: "Gain more points based on total time played.",
    type: "natural",
    cost: new Decimal(25000),
    eff() {return new Decimal(player.gameTimePlayed).pow(100000)},
    effectDisplay() {return format(this.eff()) + "x production"},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.prod1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 5,
    y: 8,
    children: ["points2","points4","points5"],
  },
  points2: {
    id: "Double The Fun",
    desc: "Double the g(n) and h(n) bases (ignoring the softcap).",
    type: "natural",
    cost: new Decimal(5000000),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.points1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 4,
    y: 7,
    children: ["points3","points6"],
  },
  points3: {
    id: "Functional Slope",
    desc: "Add to the g(x) and h(x) softcap starts based on slope.",
    type: "natural",
    cost: new Decimal(3e12),
    eff() {return player.slope.add(1).log10().div(10000)},
    effectDisplay() {return "+" + format(this.eff()) + " g(n) and h(n) softcap starts"},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.points2.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 3,
    y: 6,
    children: ["points7","ic1"],
  },
  points4: {
    id: "Productive Abyss",
    desc: "Multiply production of Buildings based on unspent holes.",
    type: "natural",
    cost: new Decimal(2000000),
    eff() {return player.integration.holes.pow(500000).add(1)},
    effectDisplay() {return format(this.eff()) + "x production of Buildings"},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.points1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Integrate ${formatWhole(100)} times.`},
    done() {return player.integrations.gte(100)},
    x: 5,
    y: 7,
  },
  points5: {
    id: "Prestigious III",
    desc: "Gain more points based on times gone Complex.",
    type: "natural",
    cost: new Decimal(7.5e9),
    eff() {return player.complexes.pow(500000).add(1)},
    effectDisplay() {return format(this.eff()) + "x production"},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.points1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Go Complex ${format(1e6)} times.`},
    done() {return player.complexes.gte(1e6)},
    x: 4,
    y: 8,
  },
  points6: {
    id: "Hardcap Exponent",
    desc: "Power the Quadratic Bonus softcap by ^1.06.",
    type: "natural",
    cost: new Decimal(1.60e32),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.points2.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach a multiplier of ${format("1e4.4e8")}x from Quadratic Bonus.`},
    done() {return QUAD_UPGRADES[1].eff().gte("1e4.4e8")},
    x: 4,
    y: 6,
  },
  points7: {
    id: "Natural Set Boost",
    desc: "The 2nd and 3rd Natural Set effect formulas are stronger.",
    type: "natural",
    cost: new Decimal(2.5e13),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.points3.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 2,
    y: 7,
    children: ["points8","points9","ic6"],
  },
  points8: {
    id: "The Endless Hardcap Delay",
    desc: "Increase the \"Variable Coupler\" amount cap by 1.",
    type: "natural",
    cost: new Decimal("1e360"),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.points7.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach ${format("1e1.6e9")} QP without any QP buyables.`},
    done() {return player.quadPower.gte("1e1.6e9") && player.quadBuyables[1].eq(0) && player.quadBuyables[2].eq(0) && player.quadBuyables[3].eq(0) && player.quadBuyables[4].eq(0)},
    x: 2,
    y: 8,
    children: ["ic6"],
  },
  points9: {
    id: "Xtra YC4 CompletionZ (XYZ)",
    desc: "Gain 5x more Y-Challenge 4 completions.",
    type: "natural",
    cost: new Decimal(1e25),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.points7.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 1,
    y: 6,
    children: ["points10","ic6"],
  },
  points10: {
    id: "Omnipotent f(n)",
    desc: "Add to the f(n) exponent based on polynomial power, after all multipliers.",
    type: "natural",
    cost: new Decimal(1e47),
    eff() {return player.polyPower.add(1).log10().mul(30)},
    effectDisplay() {return "+" + format(this.eff()) + " f(x) exponent"},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.points9.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 0,
    y: 6,
  },
  quadratic1: {
    id: "Hyperreal Quadratics",
    desc: "<span style='font-size:12px;'>Gain more Quadratics based on Z, and divide the Z cost based on Quadratics.</span>",
    type: "rational",
    cost: new Decimal(1.5e6),
    eff() {return player.z.sqrt().add(1)}, // Quadratics mult based on Z
    eff2() {return player.quadratics.add(player.bankedQuadratics).add(1).log10().div(5).add(1).min(60)}, // Z cost divider based on quadratics
    effectDisplay() {return format(this.eff()) + "x Quadratics, /" + format(this.eff2()) + " Z cost"},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.prod1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 7,
    y: 6,
    children: ["quadratic4"],
  },
  quadratic2: {
    id: "CC2's Revenge",
    desc: "Multiply the b effect hardcap starts by 1.1.",
    type: "rational",
    cost: new Decimal(1e9),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost)},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 6,
    y: 6,
    children: ["quadratic4","quadratic5"],
  },
  quadratic3: {
    id: "Parabolic Flux",
    desc: "Gain 50% of Quadratic count gain on Quadratic every second.",
    type: "rational",
    cost: new Decimal(2.5e9),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id)},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach ${format(1e24)} Banked Quadratics.`},
    done() {return player.bankedQuadratics.gte(1e24)},
    x: 8,
    y: 6,
    children: ["quadratic4","quadratic6"],
  },
  quadratic4: {
    id: "Less Useless",
    desc: "Complex Upgrade 14's hardcap is ^1.70.",
    type: "rational",
    cost: new Decimal(1e7),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && (IntegrationUpgrades.quadratic1.isBought() || IntegrationUpgrades.quadratic2.isBought() || IntegrationUpgrades.quadratic3.isBought())},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach ${format("1e600000000")} slope without any fourth-row Complex Upgrades.`},
    done() {return player.slope.gte("1e600000000") && player.fourthRowCompUpgs[1].eq(0) && player.fourthRowCompUpgs[2].eq(0) && player.fourthRowCompUpgs[3].eq(0) && player.fourthRowCompUpgs[4].eq(0)},
    x: 7,
    y: 5,
  },
  quadratic5: {
    id: "Trickle-Up Economics",
    desc: "Gain more QP based on IP.",
    type: "rational",
    cost: new Decimal(5e13),
    eff() {
      let x = player.imagPower.pow(3).add(1)
      if(x.gt("1e6e9")) x = x.div("1e6e9").pow(0.25).mul("1e6e9")
      return x
    },
    effectDisplay() {return format(this.eff()) + "x QP gain"},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.quadratic2.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 6,
    y: 5,
    children: ["quadratic7"],
  },
  quadratic6: {
    id: "Open the Floodgates",
    desc: "Complex Upgrade 6 is uncapped and powered ^250.",
    type: "rational",
    cost: new Decimal(5e13),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.quadratic3.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 8,
    y: 5,
    children: ["quadratic7"],
  },
  quadratic7: {
    id: "Rational Set Boost",
    desc: "The 1st Rational Set effect formula is stronger.",
    type: "rational",
    cost: new Decimal(2e27),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && (IntegrationUpgrades.quadratic5.isBought() || IntegrationUpgrades.quadratic6.isBought())},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 7,
    y: 4,
    children: ["quadratic8"],
  },
  quadratic8: {
    id: "Hy-UP-er Boost",
    desc: "Complex Upgrade 4's hardcap is ^1.30.",
    type: "rational",
    cost: new Decimal(2e27),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.quadratic7.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 7,
    y: 3,
    children: ["quadratic9"],
  },
  quadratic9: {
    id: "Powered Doublers",
    desc: "The effects of the x<sup>2</sup> Doubler and RE Doubler are raised ^100.",
    type: "rational",
    cost: new Decimal(1e44),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.quadratic8.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach ${format(100000)} x² Doublers with 0 PP.`},
    done() {return player.doublers.gte(100000) && player.polyPower.eq(0)},
    x: 7,
    y: 2,
    children: ["ic4"],
  },
  complex1: {
    id: "Comically Large Exponent",
    desc: "The Basic Complex Upgrade 9 effect is powered ^5,000.",
    type: "complex",
    cost: new Decimal(150000),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.prod1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 9,
    y: 8,
    children: ["complex2","complex4","complex5"],
  },
  complex2: {
    id: "Plane Researcher",
    desc: "Gain more zi power based on total UP.",
    type: "complex",
    cost: new Decimal(1.5e7),
    eff() {return player.upgradePoints[1].pow(2).add(1)},
    effectDisplay() {return format(this.eff()) + "x zi power gain"},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.complex1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 10,
    y: 7,
    children: ["complex3","complex8"],
  },
  complex3: {
    id: "Time Compression",
    desc: "UP generation is boosted by global speed again at a reduced rate.",
    type: "complex",
    cost: new Decimal(2e9),
    eff() {return TemporalPlane.totalEffect().max(1).sqrt()},
    effectDisplay() {return format(this.eff()) + "x UP/second"},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.complex2.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 11,
    y: 6,
    children: ["complex6","ic2"],
  },
  complex4: {
    id: "Polynom-I-als",
    desc: "Gain more i based on polynomial power.",
    type: "complex",
    cost: new Decimal(1e15),
    eff() {
      let x = player.polyPower.pow(5).add(1)
      if(x.gt("1e1.25e9")) x = x.div("1e1.25e9").pow(0.25).mul("1e1.25e9")
      return x
    },
    effectDisplay() {return format(this.eff()) + "x i gain"},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.complex1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach ${format("1e450000")} i without any CC tiers.`},
    done() {return player.i.gte("1e450000") && ccTiers() == 0},
    x: 9,
    y: 7,
  },
  complex5: {
    id: "Universal Warming",
    desc: "Synthetic Division Upgrade 4's effect is powered ^5.",
    type: "complex",
    cost: new Decimal(5e29),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.complex1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach ${format("1e1600000")} i without entering Synthetic Division.`},
    done() {return player.i.gte("1e1600000") && player.synthDivEnters < 1},
    x: 10,
    y: 8,
  },
  complex6: {
    id: "Industrialization is Complicated",
    desc: "<span style='font-size:12px;'>Gain more Complexes based on total Buildings bought.</span>",
    type: "complex",
    cost: new Decimal(5e16),
    eff() {return player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).div(1e8).add(1)},
    effectDisplay() {return format(this.eff()) + "x Complexes gain"},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.complex3.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 12,
    y: 7,
    children: ["complex7","complex9"],
  },
  complex7: {
    id: "Lateral Flux",
    desc: "Gain 25% of Complex count gain on Complex every second.",
    type: "complex",
    cost: new Decimal(1e33),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.complex6.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach ${format("1e1300000")} i without Complex Plane currencies.`},
    done() {return player.i.gte("1e1300000") && player.compPlane[0][1].eq(0) && player.compPlane[0][2].eq(0) && player.compPlane[0][3].eq(0) && player.compPlane[0][4].eq(0)},
    x: 12,
    y: 8,
  },
  complex8: {
    id: "Bought UP Effect",
    desc: "Power i gain based on total Upgrade Points bought.",
    type: "complex",
    cost: new Decimal(7.5e9),
    eff() {return Decimal.add(1,new Decimal(player.compUpgs[2][0]+player.compUpgs[2][1]+player.compUpgs[2][2]).div(4000))},
    effectDisplay() {return "^" + format(this.eff()) + " i gain"},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.complex2.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 10,
    y: 6,
  },
  complex9: {
    id: "Disregard Ethics",
    desc: "Unlock the 5th Z-Collider.",
    type: "complex",
    cost: new Decimal(5e26),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.complex6.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach ${format("8.88e888")} Z-Power without any Z-Empowerments.`},
    done() {return player.zlab.zpower.gte("8.88e888") && player.zlab.empowerments.eq(0)},
    x: 13,
    y: 6,
    children: ["complex10","complex11"],
  },
  complex10: {
    id: "No More Waiting (jk)",
    desc: "The Fourth-Row Complex Upgrade autobuyer now bulk buys.",
    type: "complex",
    cost: new Decimal(3.7e37),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.complex9.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 13,
    y: 7,
  },
  complex11: {
    id: "Something Hidden...",
    desc: "Don't you dare buy this upgrade, ever.",
    type: "complex",
    cost: new Decimal("2.7e2727"),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.complex9.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach ${format(79000)} z.`},
    done() {return player.z.gte(79000)},
    x: 14,
    y: 6,
  },
  yquadratic1: {
    id: "Hold Down \"U\" Key",
    desc: "Gain more y<sup>2</sup> based on your fastest Y-Quadratic time.",
    type: "real",
    cost: new Decimal(200000),
    eff() {return Decimal.pow(1e5,Decimal.div(1,new Decimal(player.prestigeTimes[5]).max(0.05)))},
    effectDisplay() {return format(this.eff()) + "x y² gain"},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.prod1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 5,
    y: 11,
    children: ["yquadratic2","yquadratic4"],
  },
  yquadratic2: {
    id: "Squaring the Circle",
    desc: "Gain more circles based on sacrificed x<sup>2</sup>.",
    type: "real",
    cost: new Decimal(1e7),
    eff() {return player.sacX2.pow(0.0000003).add(1)},
    effectDisplay() {return format(this.eff()) + "x circles gain"},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.yquadratic1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 4,
    y: 10,
    children: ["yquadratic3"],
  },
  yquadratic3: {
    id: "Z-Superpower",
    desc: "The boost to i and y<sup>2</sup> from total Z-Collider levels is powered ^10.",
    type: "real",
    cost: new Decimal(1e19),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.yquadratic2.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach ${format("1e2300")} y² without leveling up the 2nd-4th Z-Colliders.`},
    done() {return player.y2.gte("1e2300") && player.zlab.levels[2] == 0 && player.zlab.levels[3] == 0 && player.zlab.levels[4] == 0},
    x: 3,
    y: 11,
  },
  yquadratic4: {
    id: "Revolutionary Thinking",
    desc: "Gain more revolutions based on total Revolution Buyables bought.",
    type: "real",
    cost: new Decimal(1e11),
    eff() {return Decimal.pow(1.1,player.varSynth.iExpBuyables[1].add(player.varSynth.iExpBuyables[2]))},
    effectDisplay() {return format(this.eff()) + "x revolutions gain"},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.yquadratic1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 4,
    y: 11,
    children: ["yquadratic5"],
  },
  yquadratic5: {
    id: "y² Tripler When?",
    desc: "i Triplers boost y² gain at a reduced rate.",
    type: "real",
    cost: new Decimal(1e11),
    eff() {return Decimal.pow(3,player.triplers).pow(0.002)},
    effectDisplay() {return format(this.eff()) + "x y² gain"},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.yquadratic4.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 3,
    y: 12,
    children: ["yquadratic6"],
  },
  yquadratic6: {
    id: "Quadratic Reliance",
    desc: "Both effects of Y-Quadratic Upgrade 11 are powered ^50.",
    type: "real",
    cost: new Decimal(5e16),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.yquadratic5.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 4,
    y: 12,
    children: ["yquadratic7"],
  },
  yquadratic7: {
    id: "xy Bonus",
    desc: "<span style='font-size:11px;'>xy is uncapped past 8, unlock an autobuyer for xy, and xy boosts circles and revolutions gain.</span>",
    type: "real",
    cost: new Decimal(1e27),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.yquadratic6.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `<span style='font-size:11px;'>Requirement: Reach ${format("1e3400")} y² without Charged X Upgrades.</span>`},
    done() {return player.y2.gte("1e3400") && player.varSynth.chargedXUpgs.length == 0},
    x: 4,
    y: 13,
    children: ["yquadratic8","ic3"],
  },
  yquadratic8: {
    id: "Upgrade Unlock Upgrade",
    desc: "Unlock 8 new Y-Quadratic Upgrades.",
    type: "real",
    cost: new Decimal(5e68),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.yquadratic7.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach ${format("1.11e11111")} y².`},
    done() {return player.y2.gte("1.11e11111")},
    x: 3,
    y: 14,
    children: ["yquadratic9"],
  },
  yquadratic9: {
    id: "Variable Synthesizer++",
    desc: "Unlock 2 new circle milestones and 2 new Revolution Buyables.",
    type: "real",
    cost: new Decimal(1e95),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.yquadratic8.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach ${format("1e8700")} circles and ${format("1e5900")} revolutions.`},
    done() {return player.varSynth.circles.gte("1e8700") && player.varSynth.revolutions.gte("1e5900")},
    x: 2,
    y: 15,
  },
  polynomials1: {
    id: "Polynomial Overdrive",
    desc: "The Polynomial efficiency per-purchase multiplier is 3x.",
    type: "integer",
    cost: new Decimal(1.5e6),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.prod1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 9,
    y: 11,
    children: ["polynomials2","polynomials3"],
  },
  polynomials2: {
    id: "Why Would You Do That",
    desc: "Polynomial power boosts efficiency of the last 4 Polynomials.",
    type: "integer",
    cost: new Decimal(1.5e7),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.polynomials1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 10,
    y: 10,
    children: ["polynomials4"],
  },
  polynomials3: {
    id: "SE Effect Bonus",
    desc: "Add 0.5 to the SE conversion exponent.",
    type: "integer",
    cost: new Decimal(6e9),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.polynomials1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 10,
    y: 11,
    children: ["polynomials5"],
  },
  polynomials4: {
    id: "Dimensional Sacrifice",
    desc: "Unlock Polynomial Factoring.",
    type: "integer",
    cost: new Decimal(1e26),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.polynomials2.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach 100 x¹⁰.`},
    done() {return player.polynomials[10].bought.gte(100)},
    x: 11,
    y: 11,
  },
  polynomials5: {
    id: "Integer Set Boost",
    desc: "The 2nd Integer Set effect is raised ^1.5.",
    type: "integer",
    cost: new Decimal(2e12),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.polynomials3.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 11,
    y: 12,
    children: ["polynomials6"],
  },
  polynomials6: {
    id: "Highest Degree",
    desc: "x¹⁰ efficiency is boosted based on x¹⁰ amount.",
    type: "integer",
    cost: new Decimal(5e19),
    eff() {return player.polynomials[10].amount.pow(50).add(1)},
    effectDisplay() {return format(this.eff()) + "x x¹⁰ efficiency"},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.polynomials5.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 10,
    y: 12,
    children: ["polynomials7"],
  },
  polynomials7: {
    id: "Tuba's Gift",
    desc: "The Polynomial Factoring formula is raised ^1.2.",
    type: "integer",
    cost: new Decimal(1e29),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.polynomials6.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach a Polynomial Factoring multiplier of at least ${format(1e140)}x.`},
    done() {return player.integration.polyFactoringMult.gte(1e140)},
    x: 10,
    y: 13,
    children: ["polynomials8","ic5"],
  },
  polynomials8: {
    id: "Take That Back",
    desc: "<span style='font-size:10px;'>The 3rd repeatable Synthetic Division Upgrade is uncapped, but scales faster after 14 purchases.</span>",
    type: "integer",
    cost: new Decimal(1e31),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.polynomials7.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `<span style='font-size:11px;'>Requirement: Reach ${format(1e75)} SE without the 1st repeatable Synthetic Division Upgrade.</span>`},
    done() {return player.synthEssence.gte(1e75) && player.synthDivUpgs[0][1].eq(0)},
    x: 11,
    y: 14,
    children: ["polynomials9"],
  },
  polynomials9: {
    id: "Polynomial Discount",
    desc: "Power the cost scaling of all Polynomials by ^0.9.",
    type: "integer",
    cost: new Decimal(1e58),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.polynomials8.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Have ${format(1100)} total Polynomial Buyables bought.`},
    done() {return player.polynomials.buyables[1].add(player.polynomials.buyables[2]).add(player.polynomials.buyables[3]).add(player.polynomials.buyables[4]).add(player.polynomials.buyables[5]).add(player.polynomials.buyables[6]).gte(1100)},
    x: 12,
    y: 15,
  },
  integration1: {
    id: "Integrated Systems",
    desc: "Double dx gain, and unlock Auto-Integration.",
    type: "algebraic",
    cost: new Decimal(100000),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.prod1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Buy all of the upgrades in the Perk Tree.`},
    done() {return player.integration.upgrades.qol.length >= 40},
    x: 7,
    y: 14,
    children: ["integration2","integration3","integration4"],
  },
  integration2: {
    id: "Speedrun Bonus",
    desc: "Gain more dx based on fastest Integration time (game time).",
    type: "algebraic",
    cost: new Decimal(5e7),
    eff() {return Decimal.div(1,new Decimal(player.gamePrestigeTimes[7]).max(1/19)).add(1)},
    effectDisplay() {return format(this.eff()) + "x dx gain"},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.integration1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Integrate in under 15 minutes (game time).`},
    done() {return player.gamePrestigeTimes[7].lt(900)},
    x: 5,
    y: 15,
    children: ["integration5","integration6"],
  },
  integration3: {
    id: "In The Soul Set",
    desc: "Unlock the ability to sacrifice assigned sets.",
    type: "algebraic",
    cost: new Decimal(2e8),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.integration1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach ${format(1000)} empty sets.`},
    done() {return player.integration.emptySets.gte(1000)},
    x: 7,
    y: 15,
    children: ["integration7","integration10"],
  },
  integration4: {
    id: "Limitless Potential",
    desc: "Unlock The Limit.",
    type: "algebraic",
    cost: new Decimal(1e12),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.integration1.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Integrate for at least ${format(1e6)} dx without any Number Sets equipped.`},
    done() {return false},
    x: 9,
    y: 15,
    children: ["integration8","integration9"],
  },
  integration5: {
    id: "Integration Sale",
    desc: "Gain 2 free levels of each Repeatable Integration Upgrade.",
    type: "algebraic",
    cost: new Decimal(1e20),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.integration2.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 4.5,
    y: 16,
    children: ["ic8"],
  },
  integration6: {
    id: "Two Layers Up",
    desc: "Gain more dx based on x².",
    type: "algebraic",
    cost: new Decimal(1e48),
    eff() {return player.x2.add(1).log10().div(1e6).add(1)},
    effectDisplay() {return format(this.eff()) + "x dx gain"},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.integration2.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 5.5,
    y: 16,
    children: ["ic8"],
  },
  integration7: {
    id: "Minor Perk",
    desc: "Gain 1% of i gain on Complex and 1% of y² gain on Y-Quadratic every second.",
    type: "algebraic",
    cost: new Decimal(4.20e69),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.integration3.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 6.5,
    y: 16,
    children: ["ic8"],
  },
  integration8: {
    id: "Approaching Constance",
    desc: "The convergence factor for gain of Limit Score is squared.",
    type: "algebraic",
    cost: new Decimal(1e24),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.integration4.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 8.5,
    y: 16,
    children: ["ic8"],
  },
  integration9: {
    id: "Score Pusher",
    desc: "Gain more limit score based on total dx.",
    type: "algebraic",
    cost: new Decimal(1e24),
    eff() {return player.integration.totaldx.add(1).log10().div(3).add(1)},
    effectDisplay() {return format(this.eff()) + "x limit score gain"},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.integration4.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 9.5,
    y: 16,
    children: ["ic8"],
  },
  integration10: {
    id: "Empty Set Usefulness",
    desc: "Gain more dx based on empty sets and unlock Auto-Set Sacrifice.",
    type: "algebraic",
    cost: new Decimal("1e325"),
    eff() {return player.integration.emptySets.pow(0.05).add(1)},
    effectDisplay() {return format(this.eff()) + "x dx gain"},
    canBuy() {return player.integration.dx.gte(this.cost) && IntegrationUpgrades.integration3.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: false,
    x: 7.5,
    y: 16,
    children: ["ic8"],
  },
  ic1: {
    id: "Integration Challenge 1",
    desc: "Unlock Integration Challenge 1.",
    type: "algebraic",
    cost: new Decimal(0),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.points3.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Go Sinusoidal.`},
    done() {return player.sinusoidals.gte(1)},
    x: 3,
    y: 7,
  },
  ic2: {
    id: "Integration Challenge 2",
    desc: "Unlock Integration Challenge 2.",
    type: "algebraic",
    cost: new Decimal(0),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.complex3.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Complete Integration Challenge 1 at least 29 times.`},
    done() {return player.integration.chalCompletions[1].length >= 29},
    x: 11,
    y: 7,
  },
  ic3: {
    id: "Integration Challenge 3",
    desc: "Unlock Integration Challenge 3.",
    type: "algebraic",
    cost: new Decimal(0),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.yquadratic7.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Have 60 total upgrades in the Production Tree bought.`},
    done() {return player.integration.upgrades.prod.length >= 60},
    x: 4,
    y: 14,
  },
  ic4: {
    id: "Integration Challenge 4",
    desc: "Unlock Integration Challenge 4.",
    type: "algebraic",
    cost: new Decimal(0),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.quadratic9.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Go Complex ${format("5.55e555")} times.`},
    done() {return player.complexes.gte("5.55e555")},
    x: 7,
    y: 1,
    children: ["ic7"],
  },
  ic5: {
    id: "Integration Challenge 5",
    desc: "Unlock Integration Challenge 5.",
    type: "algebraic",
    cost: new Decimal(0),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.polynomials7.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Integrate for ${format("1e14400")} dx without activated Number Sets, Complex Upgrades, and Polynomial Buyables.`},
    done() {return false},
    x: 10,
    y: 14,
  },
  ic6: {
    id: "Integration Challenge 6",
    desc: "Unlock Integration Challenge 6.",
    type: "algebraic",
    cost: new Decimal(0),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.points7.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach ${format("1e1.7e14")} points in 10 seconds or less (game time).`},
    done() {return player.points.gte("1e1.7e14") && player.gamePrestigeTimes[6].lt(10)},
    x: 1,
    y: 7,
  },
  ic7: {
    id: "Integration Challenge 7",
    desc: "Unlock Integration Challenge 7.",
    type: "algebraic",
    cost: new Decimal(0),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && IntegrationUpgrades.ic4.isBought()},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Reach 100 Y-Challenge 6 completions.`},
    done() {return player.yChalCompletions[6].gte(100)},
    x: 7,
    y: 0,
  },
  ic8: {
    id: "Integration Challenge 8",
    desc: "Unlock Integration Challenge 8.",
    type: "algebraic",
    cost: new Decimal(0),
    effectDisplay() {return null},
    canBuy() {return player.integration.dx.gte(this.cost) && player.integration.upgrades.unlocked.includes(this.id) && (IntegrationUpgrades.integration5.isBought() || IntegrationUpgrades.integration6.isBought() || IntegrationUpgrades.integration7.isBought() || IntegrationUpgrades.integration8.isBought() || IntegrationUpgrades.integration9.isBought() || IntegrationUpgrades.integration10.isBought())},
    buy() {
      if(this.canBuy() && !this.isBought()) {
        player.integration.dx = player.integration.dx.sub(this.cost)
        player.integration.upgrades.prod.push(this.id)
      }
    },
    isBought() {return player.integration.upgrades.prod.includes(this.id)},
    hasUnlock: true,
    requirement() {return `Requirement: Have ${format("1e31100000")} dx, ${formatWhole(55)} IC7 completions, and ${formatWhole(80)} Achievements.`},
    done() {return player.integration.dx.gte("1e31100000") && player.integration.chalCompletions[7] >= 55 && player.achievements.length >= 80},
    x: 7,
    y: 18,
  },
}

let canvas, canvas2, ctx, ctx2;

function drawUpgradeLines([from, to], ctx) {
  ctx.clearRect(0, 0, 100000, 100000)
  console.log("hi chat")
  Object.entries(IntegrationUpgrades).slice(from, to).forEach(([id, { children }]) => {
    // Only render lines if the list of lines exists
    if (children)
      children.forEach(cid => drawUpgradeLine(id, cid, ctx));
  });
}
setTimeout(() => {
  canvas = document.querySelector("#upgrade-tree canvas");
  canvas.width = 2000;
  canvas.height = 2000;
  ctx = canvas.getContext("2d");
  drawUpgradeLines([0, 39], ctx);
  
  canvas2 = document.querySelector("#upgrade-tree-2 canvas");
  canvas2.width = 5000;
  canvas2.height = 5000;
  ctx2 = canvas2.getContext("2d");
  drawUpgradeLines([40, 200], ctx2);
},500)

function drawUpgradeLine(n1, n2, ctx) {
    let p1 = IntegrationUpgrades[n1];
    // assuming 25px of padding between them
    // adding the n/2 makes it so the line is (hopefully) centered
    let x1 = p1.x * 250 + (175 / 2) + 15;
    let y1 = p1.y * 200 + (125 / 2);
    let p2 = IntegrationUpgrades[n2];
    let x2 = p2.x * 250 + (175 / 2) + 15;
    let y2 = p2.y * 200 + (125 / 2);
    ctx.strokeStyle = "#bbbbbb";
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}