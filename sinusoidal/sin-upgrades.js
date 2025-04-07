const SinusoidalUpgrades = {
  canBuy(x) {
    return player.triangles.gte(this[x].cost())
  },
  buy(x) {
    if(this.canBuy(x) && !this.has(x)) {
      player.triangles = player.triangles.sub(this[x].cost())
      player.sinUpgrades[x]++
    }
  },
  has(x) {
    return player.sinUpgrades[x] >= this[x].maxLevel
  },
  // graphing cookbooks
  1: {
    title: "Graphing Cookbook I",
    desc: "Need some more bonuses? Unlock 8 Sinusoidal Upgrades!",
    cost() {return new Decimal(100)},
    effectDisplay() {return null},
    maxLevel: 1,
  },
  2: {
    title: "Graphing Cookbook II",
    desc: "Eight isn't enough? Unlock 8 more exotic Sinusoidal Upgrades!",
    cost() {return new Decimal(5e9)},
    effectDisplay() {return null},
    maxLevel: 1,
  },
  3: {
    title: "Graphing Cookbook III",
    desc: "Continue exploring into unknowable depths? Unlock 8 additional Sinusoidal Upgrades!",
    cost() {return new Decimal(2e34)},
    effectDisplay() {return null},
    maxLevel: 1,
  },
  4: {
    title: "Graphing Cookbook IV",
    desc: "It's never enough for you, is it?",
    cost() {return new Decimal("1e100000")},
    effectDisplay() {return null},
    maxLevel: 1,
  },
  
  // unlocked by GC1
  5: {
    title: "Downrooted",
    desc: "Multiply the Square Root hardcap start by 1e10,000,000 per purchase.",
    cost() {return Decimal.pow(3,player.sinUpgrades[5])},
    eff() {return Decimal.pow("1e10000000",player.sinUpgrades[5])},
    effectDisplay() {return format(this.eff()) + "x Square Root hardcap start"},
    maxLevel: 10,
  },
  6: {
    title: "YC4 Cleansing",
    desc: "Multiply the 2nd YC4 effect softcap start by 1e10,000,000 per purchase.",
    cost() {return Decimal.pow(5,player.sinUpgrades[6]).mul(20)},
    eff() {return Decimal.pow("1e10000000",player.sinUpgrades[6])},
    effectDisplay() {return format(this.eff()) + "x 2nd YC4 effect softcap start"},
    maxLevel: 5,
  },
  7: {
    title: "Frequency Finder",
    desc: "Double TW generation per purchase.",
    cost() {return Decimal.pow(4,player.sinUpgrades[7])},
    eff() {return Decimal.pow(2,player.sinUpgrades[7])},
    effectDisplay() {return format(this.eff()) + "x TW generation"},
    maxLevel: 10,
  },
  8: {
    title: "Limit Converger",
    desc: "Gain +50% more limit score per purchase.",
    cost() {return Decimal.pow(4,player.sinUpgrades[8]).mul(10)},
    eff() {return Decimal.add(1,player.sinUpgrades[8]/2)},
    effectDisplay() {return format(this.eff()) + "x limit score"},
    maxLevel: 10,
  },
  9: {
    title: "Trig Functions Boost",
    desc: "Gain 10x more of each trigonometric function power, and unlock Auto-Sinusoidal.",
    cost() {return new Decimal(1000)},
    effectDisplay() {return null},
    maxLevel: 1,
  },
  10: {
    title: "That Upgrade Sucked Anyway",
    desc: "The Temporal Integrator effect is powered ^10.",
    cost() {return new Decimal(10000)},
    effectDisplay() {return null},
    maxLevel: 1,
  },
  11: {
    title: "Sierpinski Triangles",
    desc: "Gain more triangles based on total triangles. (effect becomes stronger with more levels)",
    cost() {return Decimal.pow(10,player.sinUpgrades[11]).mul(10)},
    eff() {return player.totalTriangles.pow(player.sinUpgrades[11]/10).min(1e9)},
    effectDisplay() {return format(this.eff()) + "x triangles gain"},
    maxLevel: 3,
  },
  12: {
    title: "I Love Time-Based Effects",
    desc: "Square the C9 and CC7 effects per purchase.",
    cost() {return Decimal.pow(20,player.sinUpgrades[12]).mul(5000)},
    eff() {return Decimal.pow(2,player.sinUpgrades[12])},
    effectDisplay() {return "^" + format(this.eff()) + " C9 and CC7 effects"},
    maxLevel: 4,
  },
  
  // unlocked by GC2
  13: {
    title: "Polynomial Exponent",
    desc: "Power x³ efficiency and x⁴ efficiency by ^1.5, add 0.3 to the Polynomial per-purchase mult if your PP is greater than 1e125,000, and unlock Auto-Polynomial Factoring.",
    cost() {return new Decimal(1e10)},
    effectDisplay() {return null},
    maxLevel: 1,
  },
  14: {
    title: "All is Certain",
    desc: "Increase the minimum Uncertainty Exponent by 0.1 per level. After 10 levels, you can assign holes to Temporal Plane currencies.",
    cost() {return new Decimal(1e11).mul(Decimal.pow(4,player.sinUpgrades[14])).mul(player.sinUpgrades[14] >= 9 ? 1000 : 1)},
    eff() {return player.sinUpgrades[14] / 10},
    effectDisplay() {return "+" + format(this.eff()) + " minimum UE"},
    maxLevel: 10,
  },
  15: {
    title: "Singular Principle",
    desc: "Unlock Singularity Upgrades (found in the Integration Upgrades subtab).",
    cost() {return new Decimal(5e30)},
    effectDisplay() {return null},
    maxLevel: 1,
  },
  16: {
    title: "YC4 Clearing",
    desc: "Multiply the 2nd YC4 effect softcap start by 1e20,000,000 per level.",
    cost() {return new Decimal(5e30).mul(Decimal.pow(5,player.sinUpgrades[16]))},
    eff() {return Decimal.pow("1e20000000",player.sinUpgrades[16])},
    effectDisplay() {return format(this.eff()) + "x 2nd YC4 effect softcap start"},
    maxLevel: 10,
  },
  17: {
    title: "Emptier Sets?",
    desc: "Gain +50% more empty sets per purchase, compounding. After 10 levels, unlock Auto-Distribute.",
    cost() {return new Decimal(1e12).mul(Decimal.pow(2,player.sinUpgrades[17]))},
    eff() {return Decimal.pow(1.5,player.sinUpgrades[17])},
    effectDisplay() {return format(this.eff()) + "x empty sets gain"},
    maxLevel: 10,
  },
  18: {
    title: "Cost Deceleration II",
    desc: "Divide all Rebuyable Integration Upgrade costs by 1e10 per level and unlock an autobuyer for Rebuyable Integration Upgrades.",
    cost() {return player.sinUpgrades[18] >= 1 ? new Decimal(4e25) : new Decimal(2e19)},
    eff() {return Decimal.pow(1e10,player.sinUpgrades[18])},
    effectDisplay() {return "/" + format(this.eff()) + " RIU costs"},
    maxLevel: 2,
  },
  19: {
    title: "As The Hours Go By",
    desc: "Time-Jumps cost half as many holes, and unlock autobuyers for Temporal Plane currencies.",
    cost() {return new Decimal(5e16)},
    effectDisplay() {return null},
    maxLevel: 1,
  },
  20: {
    title: "Power Punch",
    desc: "The Polynomial efficiency debuff in the Limit is weaker, and 1 x¹⁰ is no longer required for Integration outside of the Limit.",
    cost() {return new Decimal(2e18)},
    effectDisplay() {return null},
    maxLevel: 1,
  },
  
  // unlocked by GC3
  21: {
    title: "Tetrahedrons Research",
    desc: "Add to the Polynomial per-purchase mult based on total triangles.",
    cost() {return new Decimal(1e36)},
    eff() {return player.totalTriangles.log10().div(2500).min(0.1)},
    effectDisplay() {return "+" + format(this.eff()) + " Polynomial per-purchase mult"},
    maxLevel: 1,
  },
  22: {
    title: "Time Exponent",
    desc: "Increase the Uncertainty Exponent by 0.05 per level.",
    cost() {return new Decimal(1e38).mul(Decimal.pow(100,player.sinUpgrades[22]))},
    eff() {return player.sinUpgrades[22] * 0.05},
    effectDisplay() {return "+" + format(this.eff()) + " Uncertainty Exponent"},
    maxLevel: 10,
  },
  23: {
    title: "Converging Dimensionality",
    desc: "Gain more y² based on limit score. (effect becomes stronger with more purchases)",
    cost() {return new Decimal(1e33).mul(Decimal.pow(50,player.sinUpgrades[23]))},
    eff() {return player.integration.limitScore.pow(100).add(1).pow(player.sinUpgrades[23])},
    effectDisplay() {return format(this.eff()) + "x y² gain"},
    maxLevel: 5,
  },
  24: {
    title: "Hyperbolic Sine",
    desc: "Power x² and y² gain based on sine power. (effect becomes stronger with more purchases)",
    cost() {return new Decimal(2e34).mul(Decimal.pow(200,player.sinUpgrades[24]))},
    eff() {return Decimal.add(1,player.trigFunctions.powers[1].add(1).log10().add(1).log10().div(75).mul(player.sinUpgrades[24]))},
    effectDisplay() {return "^" + regularFormat(this.eff(),3) + " x² and y² gain"},
    maxLevel: 5,
  },
  25: {
    title: "YC4 Softcap Weakener",
    desc: "The second YC4 softcap is weaker.",
    cost() {return new Decimal(4.5e45)},
    effectDisplay() {return null},
    maxLevel: 1,
  },
  26: {
    title: "Extended Transformations",
    desc: "Add 5 to the last 3 Transformation amount caps. At 1 purchase, keep all Transformation type purchases on Integration.",
    cost() {return new Decimal(3e54).mul(Decimal.pow(500,player.sinUpgrades[26]))},
    eff() {return player.sinUpgrades[26] * 5},
    effectDisplay() {return "+" + format(this.eff()) + " Transformation amount caps"},
    maxLevel: 10,
  },
  27: {
    title: "Sky's The Limit",
    desc: "Double limit score gain per purchase.",
    cost() {return new Decimal(1e54).mul(Decimal.pow(40,player.sinUpgrades[27])).mul(Decimal.pow(500,new Decimal(player.sinUpgrades[27] - 19).max(0).pow(2)))},
    eff() {return Decimal.pow(2,player.sinUpgrades[27])},
    effectDisplay() {return format(this.eff()) + "x limit score"},
    maxLevel: 50,
  },
  28: {
    title: "Complexity Power",
    desc: "Power i gain based on total dx. (effect becomes stronger with more purchases)",
    cost() {return new Decimal(1e35).mul(Decimal.pow(300,player.sinUpgrades[28]))},
    eff() {return Decimal.add(1,player.integration.totaldx.add(1).log10().add(1).log10().div(90).mul(Math.sqrt(player.sinUpgrades[28])))},
    effectDisplay() {return "^" + regularFormat(this.eff(),3) + " i gain"},
    maxLevel: 5,
  },

  // unlocked by GC4
  29: {
    title: "4D Vector Addition",
    desc: "The Hypercomplex Flune power generation formulas are better.",
    cost() {return new Decimal("1e132500")},
    effectDisplay() {return null},
    maxLevel: 1,
  },
  30: {
    title: "Triangles Exponent",
    desc: "Power triangles gain by +0.02 per level.",
    cost() {return new Decimal("1e106000").mul(Decimal.pow("1e36000",player.sinUpgrades[30]))},
    eff() {return Decimal.add(1,Decimal.div(player.sinUpgrades[30],50))},
    effectDisplay() {return "^" + format(this.eff()) + " triangles gain"},
    maxLevel: 5,
  },
  31: {
    title: "Beyond the Second Veil",
    desc: "Automatically gain completions for Y-Challenge 5 (and YC6 at 2 levels), even when you're not in them.",
    cost() {return player.sinUpgrades[31] >= 1 ? new Decimal("1e275000") : new Decimal("1e164000")},
    effectDisplay() {return null},
    maxLevel: 2,
  },
  32: {
    title: "Mean Value Theorem",
    desc: "Tangent power and secant power both power/increase their respective Number Set effect hardcap starts.",
    cost() {return new Decimal("1e111000")},
    eff() {return Decimal.add(1,player.trigFunctions.powers[3].add(1).log10().div(4000))}, // tangent power
    eff2() {return player.trigFunctions.powers[6].add(1).log10().add(1).log10().div(75)}, // secant power
    effectDisplay() {return "^" + format(this.eff()) + " 1st Complex Set effect cap, +" + format(this.eff2()) + " 3rd Integer Set effect cap"},
    maxLevel: 1,
  },
  33: {
    title: "Time Exponent II",
    desc: "Increase the Uncertainty Exponent by 0.05 per level.",
    cost() {return new Decimal("1e140000").mul(Decimal.pow("1e24000",player.sinUpgrades[33]))},
    eff() {return Decimal.div(player.sinUpgrades[33],20)},
    effectDisplay() {return "+" + format(this.eff()) + " Uncertainty Exponent"},
    maxLevel: 15,
  },
  34: {
    title: "Hypercomplex Bonus",
    desc: "Power j and k generation by +0.05 per level.",
    cost() {return new Decimal("1e160000").mul(Decimal.pow("1e8000",player.sinUpgrades[34]))},
    eff() {return Decimal.add(1,Decimal.div(player.sinUpgrades[34],20))},
    effectDisplay() {return "^" + format(this.eff()) + " j and k generation"},
    maxLevel: 20,
  },
  35: {
    title: "Original Upgrade Name",
    desc: "Multiply generation of Hypercomplex Flune powers by 5 per level.",
    cost() {return new Decimal("1e175000").mul(Decimal.pow("1e5000",player.sinUpgrades[35]))},
    eff() {return Decimal.pow(5,player.sinUpgrades[35])},
    effectDisplay() {return format(this.eff()) + "x Hypercomplex Flune powers generation"},
    maxLevel: 100,
  },
  36: {
    title: "Get Real (Set)",
    desc: "Power the 1st Real Set effect hardcap start by +0.01 per level.",
    cost() {return new Decimal("1e175000").mul(Decimal.pow("1e40000",player.sinUpgrades[36]))},
    eff() {return Decimal.add(1,Decimal.div(player.sinUpgrades[36],100))},
    effectDisplay() {return "^" + format(this.eff()) + " 1st Real Set effect cap"},
    maxLevel: 10,
  },
  totalLevels() {
    let amt = 0
    for (let i = 1; i < 37; i++) {
      amt += player.sinUpgrades[i]
    }
    return amt
  }
}