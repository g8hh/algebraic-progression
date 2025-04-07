const YQUAD_UPGRADES = {
  1: {
    title: "Functional Recreation",
    desc: "The f(n) exponent boosts Quadratics gain.",
    requirement: "Reach 2e222,222 points and 1.00e9 non-banked Quadratics without buying g(n) and h(n).",
    done() {return (player.points.gte("2e222222") && player.quadratics.gte(1e9) && player.buyables[5].eq(0) && player.buyables[6].eq(0)) || IntegrationUpgrades.yqr.isBought()},
    cost: new Decimal(200),
    eff() {return BUYABLES[4].exponent().pow(0.5)},
    effectDisplay() {return format(YQUAD_UPGRADES[1].eff()) + "x Quadratics gain"},
  },
  2: {
    title: "Variable Interpolation",
    desc: "Unlock an autobuyer for Z, and Auto-Sacrifice sacrifices Z.",
    requirement: "Reach 6z.",
    done() {return player.z.gte(6) || IntegrationUpgrades.yqr.isBought()},
    cost: new Decimal(200),
    effectDisplay() {return null},
  },
  3: {
    title: "Formulated Recursion",
    desc: "Gain more QP based on Quadratic Formula Buyables bought.",
    requirement: "Reach 1e1670 Quadratic Power without any Quadratic Formula Buyables.",
    done() {return (player.quadPower.gte("1e1670") && player.quadBuyables[1].eq(0) && player.quadBuyables[2].eq(0) && player.quadBuyables[3].eq(0) && player.quadBuyables[4].eq(0)) || IntegrationUpgrades.yqr.isBought()},
    cost: new Decimal(25),
    eff() {return Decimal.pow(3,player.quadBuyables[1].add(player.quadBuyables[2]).add(player.quadBuyables[3]).add(player.quadBuyables[4]))},
    effectDisplay() {return format(YQUAD_UPGRADES[3].eff()) + "x QP gain"},
  },
  4: {
    title: "Functional Acceleration",
    desc: "Basic Complex Upgrade 3 also boosts the h(n) base.",
    requirement: "Reach 54 Upgrade Points.",
    done() {return player.upgradePoints[1].gte(54) || IntegrationUpgrades.yqr.isBought()},
    cost: new Decimal(120),
    effectDisplay() {return null},
  },
  5: {
    title: "Uprooted Progression",
    desc: "Power the gains of RE and CE based on Achievements completed, ignoring the 1st CE softcap.",
    requirement: "Have at least 49 Achievements.",
    done() {return player.achievements.length >= 49 || IntegrationUpgrades.yqr.isBought()},
    cost: new Decimal(1500),
    eff() {return new Decimal(1).add(new Decimal(player.achievements.length).div(1000))},
    effectDisplay() {return "^" + format(YQUAD_UPGRADES[5].eff()) + " RE and CE gain"},
  },
  6: {
    title: "Parallel Connection",
    desc: "Gain more i based on y².",
    requirement: "Have at least 4 Y-Quadratic Upgrades.",
    done() {return player.yQuadUpgs[0].length >= 4 || IntegrationUpgrades.yqr.isBought()},
    cost: new Decimal(400),
    eff() {return player.y2.pow(0.5).add(1)},
    effectDisplay() {return format(YQUAD_UPGRADES[6].eff()) + "x i gain"},
  },
  7: {
    title: "Multiplier Deviation",
    desc: "x² Doublers boost Root Essence gain at a reduced rate.",
    requirement: "Reach 1e66,000 x² without any x² Doublers.",
    done() {return (player.x2.gte("1e66000") && player.doublers.eq(0)) || IntegrationUpgrades.yqr.isBought()},
    cost: new Decimal(400),
    eff() {return Decimal.pow(Decimal.add(2,compPlaneEffects(3)),player.doublers).cbrt()},
    effectDisplay() {return format(YQUAD_UPGRADES[7].eff()) + "x RE gain"},
  },
  8: {
    title: "Chemical Expansion",
    desc: "Unlock the Z Lab.",
    requirement: "Complete 27 Complex Challenge tiers.",
    done() {return ccTiers() >= 27 || IntegrationUpgrades.yqr.isBought()},
    cost: new Decimal(2222),
    effectDisplay() {return null},
  },
  9: {
    title: "Cost Deceleration",
    desc: "i Tripler scaling is reduced to 25x.",
    requirement: "Have 30 i Triplers.",
    done() {return player.triplers.gte(30) || IntegrationUpgrades.yqr.isBought()},
    cost: new Decimal(5e10),
    effectDisplay() {return null},
  },
  10: {
    title: "Temporal Ascension",
    desc: "Power slope based on time in this Y-Quadratic, ignoring softcaps. (hardcaps at ^1.25)",
    requirement: "Reach 1e62,300 slope without b, sacrificed X, and sacrificed Y.",
    done() {return (player.slope.gte("1e62300") && player.sacX.eq(0) && player.sacY.eq(0)) || IntegrationUpgrades.yqr.isBought()},
    cost: new Decimal(1e6),
    eff() {return IntegrationUpgrades.tam.isBought() ? new Decimal(1.25) : new Decimal(1).add(new Decimal(player.gamePrestigeTimes[4]).add(1).log10().div(20)).min(1.25)},
    effectDisplay() {return "^" + format(YQUAD_UPGRADES[10].eff()) + " slope"},
  },
  11: {
    title: "Quadratic Connection",
    desc: "x² and y² boost each other.",
    requirement: "Reach 1e420,000 Points without any x².",
    cost: new Decimal(5e13),
    done() {return (player.points.gte("1e420000") && player.totalx2.eq(0)) || IntegrationUpgrades.yqr.isBought()},
    eff() {return player.y2.pow(250).add(1).pow(IntegrationUpgrades.yquadratic6.isBought() ? 50 : 1)}, //boost to x^2
    eff2() {return player.x2.add(1).ln().div(10000).add(1).pow(IntegrationUpgrades.yquadratic6.isBought() ? 50 : 1).pow(player.integration.chalCompletions[6].includes(3) ? 50000 : 1)}, //boost to y^2
    effectDisplay() {return format(YQUAD_UPGRADES[11].eff()) + "x x² gain, " + format(YQUAD_UPGRADES[11].eff2()) + "x y² gain"},
  },
  12: {
    title: "Transcendent Automation",
    desc: "Unlock the Y-Quadratic Automator.",
    requirement: "Reach 1e90,000 x² without sacrificed currencies (excluding sacrificed Z), Slope, b, and QP.",
    done() {return (player.x2.gte("1e90000") && player.sacX.eq(0) && player.sacY.eq(0) && player.sacX2.eq(0) && player.b.eq(0) && player.quadPower.eq(0)) || IntegrationUpgrades.yqr.isBought()},
    cost: new Decimal(1e19),
    effectDisplay() {return null},
  },
  13: {
    title: "Unlimited Production",
    desc: "Gain more i based on limit score.",
    requirement: "Reach 2e9 limit score.",
    cost: new Decimal("1e11800"),
    done() {return player.integration.limitScore.gte(2e9)},
    eff() {return player.integration.limitScore.mul(IntegrationUpgrades.yquadratic9.isBought() ? circleEffects(6) : 1).pow(5000).add(1)},
    effectDisplay() {return format(YQUAD_UPGRADES[13].eff()) + "x i gain"},
  },
  14: {
    title: "Factoring Distribution",
    desc: "The Polynomial Factoring multiplier boosts the other 7 Polynomial tiers at a reduced rate.",
    requirement: "Reach 1e14,500 PP while only buying 10 of each Polynomial.",
    cost: new Decimal("1e11000"),
    done() {return player.polyPower.gte("1e14500") && player.polynomials[3].bought.lte(10) && player.polynomials[4].bought.lte(10) && player.polynomials[5].bought.lte(10) && player.polynomials[6].bought.lte(10) && player.polynomials[7].bought.lte(10) && player.polynomials[8].bought.lte(10) && player.polynomials[9].bought.lte(10) && player.polynomials[10].bought.lte(10)},
    eff() {return player.integration.polyFactoringMult.pow(0.1).add(1)},
    effectDisplay() {return format(YQUAD_UPGRADES[14].eff()) + "x first 7 Polynomial efficiencies"},
  },
  15: {
    title: "Temporal Lubrication",
    desc: "The Temporal Plane power conversion formulas are slightly better.",
    requirement: "Reach a global speed multiplier of 2.50e10x.",
    cost: new Decimal("1e17100"),
    done() {return TemporalPlane.totalEffect().gte(2.5e10) && player.integration.temporalPlane.timeJumpDuration == 0},
    effectDisplay() {return null},
  },
  16: {
    title: "Challenge Continuation",
    desc: "The CC6 effect hardcap is removed.",
    requirement: "Reach 1e1.750e9 points without any CC tiers.",
    cost: new Decimal("1e12500"),
    done() {return player.points.gte("1e1.75e9") && ccTiers() == 0 && IntegrationUpgrades.yquadratic8.isBought()},
    effectDisplay() {return null},
  },
  17: {
    title: "Functional Recreation II",
    desc: "The h(n) base boosts Complexes gain.",
    requirement: "Reach 1e2.140e10 points and 1.00e55 Complexes without buying f(n).",
    cost: new Decimal("1e15800"),
    done() {return player.points.gte("1e2.14e10") && player.complexes.gte(1e55) && player.buyables[4].eq(0)},
    eff() {return BUYABLES[6].base().pow(0.75).add(1)},
    effectDisplay() {return format(YQUAD_UPGRADES[17].eff()) + "x Complexes gain"},
  },
  18: {
    title: "Parallel Connection II",
    desc: "Gain more dx based on total triangles.",
    requirement: "Reach 2.22e22 unspent triangles.",
    cost: new Decimal("1e27600"),
    done() {return player.triangles.gte(2.22e22)},
    eff() {return player.totalTriangles.pow(0.1).add(1)},
    effectDisplay() {return format(YQUAD_UPGRADES[18].eff()) + "x dx gain"},
  },
  19: {
    title: "Formulated Recursion II",
    desc: "Gain more IP based on Imaginary Power Buyables bought, after the \"Imaginary Duplicator\" exponent.",
    requirement: "Reach 1e470,000 Imaginary Power without any Imaginary Power Buyables.",
    cost: new Decimal("1e23200"),
    done() {return player.imagPower.gte("1e470000") && player.quadBuyables[5].eq(0) && player.quadBuyables[6].eq(0) && player.quadBuyables[7].eq(0) && player.quadBuyables[8].eq(0)},
    eff() {return Decimal.pow(3e60,player.quadBuyables[5].add(player.quadBuyables[6]).add(player.quadBuyables[7]).add(player.quadBuyables[8]))},
    effectDisplay() {return format(YQUAD_UPGRADES[19].eff()) + "x IP gain"},
  },
  20: {
    title: "Chemical Expansion II",
    desc: "Power Z-Power generation based on IC1 completions.",
    requirement: "Complete 50 tiers of Integration Challenge 1.",
    cost: new Decimal("1e37000"),
    done() {return player.integration.chalCompletions[1].length >= 50},
    eff() {return Decimal.add(1,Decimal.div(player.integration.chalCompletions[1].length,200))},
    effectDisplay() {return "^" + format(YQUAD_UPGRADES[20].eff()) + " Z-Power generation"},
  },
}

function buyYQU(x) {
  if(player.y2.gte(YQUAD_UPGRADES[x].cost) && hasYQU(x,'unlocked') && !hasYQU(x,'bought')){
    player.y2 = player.y2.sub(YQUAD_UPGRADES[x].cost)
    if(player.integration.challenge != 3) player.yQuadUpgs[0].push(x)
  }
  if(player.integration.challenge == 3 && player.integration.activations > 0 && !(x == 2 || x == 8 || x == 12 || x == 18) && !player.integration.upgsActiveInIC3.includes(x+36)) {
    player.integration.activations -= 1
    player.integration.upgsActiveInIC3.push(x+36)
  }
}

function hasYQU(x,y) {
  if(y == 'bought'){
    return !player.inLostIntegration && player.yQuadUpgs[0].includes(x) && ((player.integration.challenge != 3 && (player.integration.challenge != 6 || player.integration.ic6Version != 3)) || x == 2 || x == 8 || x == 12 || x == 18 || player.integration.upgsActiveInIC3.includes(36+x));
  } else if (y == 'unlocked') {
    return player.yQuadUpgs[1].includes(x.toString())
  } else if (y == 'lost') {
    return player.inLostIntegration && player.yQuadUpgs[0].includes(x)
  }
}