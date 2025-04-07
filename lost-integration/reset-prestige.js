const ResetPrestige = {
    rpFormula() {
        let xFactor = player.x
        if(xFactor.gt("1e3.25e7")) xFactor = xFactor.div("1e3.25e7").pow(0.25).mul("1e3.25e7")
        let rp = xFactor.div(100).add(player.y)
        if(player.compChallenge == 5) rp = new Decimal(1)
        if(hasQU(11) && player.compChallenge != 5) rp = rp.mul(player.x.div(100).add(player.y).max(1).log10())
        if(hasQU(18)) rp = rp.mul(ResetTable[18].eff())
        if(player.sqrtDoublers.gte(2)) rp = rp.mul(ExponentialCurve.effects(2))
        if(hasCU(1,1)) rp = rp.mul(BasicComplexUpgradesLI[1].eff2())
        if(hasCU(0,5)) rp = rp.mul(ComplexUpgradesLI[5].eff2())
        if(hasCU(0,6)) rp = rp.mul(ComplexUpgradesLI[6].eff())
        if(hasCU(0,7)) rp = rp.mul(ComplexUpgradesLI[7].eff())
        rp = rp.mul(ComplexPlaneLI.effects(2))
        rp = rp.mul(ComplexChallengesLI[4].eff())
        if(hasCU(1,7)) rp = rp.mul(BasicComplexUpgradesLI[7].eff())
        rp = rp.mul(MetaGenerators.metaPointsEffects(3))
        if(FractalArm.hasUpgrade(91)) rp = rp.mul(FractalArm[9][1].eff())
        if(player.compChallenge == 2) rp = rp.div(player.antiSlope)
        if(hasCU(1,4)) rp = rp.pow(BasicComplexUpgradesLI[4].eff())
        rp = rp.pow(YChallengesLI[2].eff())
        if(player.compChallenge == 1) rp = rp.pow(cc1Exponent())
        if(hasPermUpgrade(17)) rp = rp.mul(PERM_UPGRADES[17].eff())
        if((player.y.lt(1) && player.compChallenge != 5) || player.yChallenge == 2) rp = new Decimal(0)
        rp = rp.floor()
        return rp
    },
    reset(force) {
        if(this.rpFormula().gte(1)) {
            if(force || !player.options[7] || player.autobuyers[9] || confirm("Resetting will reset Generators, Generator Multiplier, Variables, and X Upgrades, but you will receive Reset Points in return. Are you sure you want to do this?")) {
                if(!force) {
                    let r = this.rpFormula()
                    player.x2 = player.x2.add(r)
                    player.totalx2 = player.totalx2.add(r)
                    player.last10runs.quadratic.splice(0,0,{gain:r,time:player.prestigeTimes[0],gameTime:player.gamePrestigeTimes[0]})
                    player.last10runs.quadratic = player.last10runs.quadratic.slice(0,-1)
                }
                player.quadratics = player.quadratics.add(1)
                for (let i = 0; i < 6; i++) {
                    player.buyables[i] = new Decimal(0)
                }
                player.points = hasQU(7) ? new Decimal(25) : new Decimal(0)
                player.x = new Decimal(0)
                player.y = new Decimal(0)
                player.abc[1] = new Decimal(0)
                player.abc[2] = new Decimal(0)
                if(!hasQU(7)) player.xUpgs = []
                if(player.prestigeTimes[0] < player.prestigeTimes[1]) player.prestigeTimes[1] = player.prestigeTimes[0]
                if(player.gamePrestigeTimes[0].lt(player.gamePrestigeTimes[1])) player.gamePrestigeTimes[1] = player.gamePrestigeTimes[0]
                player.prestigeTimes[0] = 0
                player.gamePrestigeTimes[0] = new Decimal(0)
            }
        }
    }
}

const ResetTable = {
    1: {
        desc: "Generators gain a multiplier based on time played",
        cost: new Decimal(2),
        eff() {return player.compChallenge == 4 ? new Decimal(1) : player.gameTimePlayed.log10().div(20).pow(hasQU(16) ? 3 : 1)},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    2: {
        desc: "Point Portals gain a multiplier based on Autoclickers",
        cost: new Decimal(4),
        eff() {return player.compChallenge == 4 ? new Decimal(1) : player.buyables[1].pow(0.5).add(1)},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    3: {
        desc: "X scaling becomes *1.08 instead of *1.1",
        cost: new Decimal(8),
        effectDisplay() {return null},
    },
    4: {
        desc: "X cost is divided based on total generators bought",
        cost: new Decimal(24),
        eff() {return player.compChallenge == 4 ? new Decimal(1) : player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).pow(0.75).add(1)},
        effectDisplay() {return "/" + format(this.eff())},
    },
    5: {
        desc() {return `Unlock Coordinate ${player.zUnlocked ? `Realm` : `Plane`}`},
        cost: new Decimal(36),
        effectDisplay() {return null},
    },
    6: {
        desc: "Generator multiplier mult gain becomes *1.4 instead of *1.3",
        cost: new Decimal(120),
        effectDisplay() {return null},
    },
    7: {
        desc: "You keep all your X upgrades and start with 25 points",
        cost: new Decimal(160),
        effectDisplay() {return null},
    },
    8: {
        desc: "Y scaling becomes *1.1 instead of *1.15",
        cost: new Decimal(160),
        effectDisplay() {return null},
    },
    9: {
        desc: "Generator multiplier cost gets added by +4x instead of +5x",
        cost: new Decimal(320),
        effectDisplay() {return null},
    },
    10: {
        desc: "Unlock the Automation tab",
        cost: new Decimal(2500),
        effectDisplay() {return null},
    },
    11: {
        desc: "Reset Point formula is better",
        cost: new Decimal(20000),
        effectDisplay() {return null},
    },
    12: {
        desc() {return `Coordinate ${player.zUnlocked ? `Realm` : `Plane`} is 10x as effective`},
        cost: new Decimal(1e6),
        effectDisplay() {return null},
    },
    13: {
        desc: "Generators gain a multiplier based on y",
        cost: new Decimal(5e6),
        eff() {return player.compChallenge == 4 ? new Decimal(1) : (hasQU(16) ? player.y.pow(7.5).add(1) : Decimal.pow(1.1,player.y).min(1e10))},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    14: {
        desc: "Generators gain a multiplier based on total points",
        cost: new Decimal(1e12),
        eff() {return player.compChallenge == 4 ? new Decimal(1) : player.totalPointsThisIntegration.pow(0.05).add(1).pow(ComplexChallengesLI[1].eff()).min("1e75000000")},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    15: {
        desc: "Unlock Square Root",
        cost: new Decimal(1e15),
        effectDisplay() {return null},
    },
    16: {
        desc: "rtu11 and rtu33 are stronger",
        cost: new Decimal(2e18),
        effectDisplay() {return null},
    },
    17: {
        desc: "Unlock new X upgrades",
        cost: new Decimal(3e20),
        effectDisplay() {return null},
    },
    18: {
        desc: "Get more Reset Points based on current points",
        cost: new Decimal(4e21),
        eff() {return player.compChallenge == 4 ? new Decimal(1) : (hasChallenge(16) ? player.points.max(0).pow(0.02).add(1).min("1e1.7e7") : player.points.max(1).log10().add(1))},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    19: {
        desc: "Lower the Square Root nerf (^0.5 -> ^0.55)",
        cost: new Decimal(2e24),
        effectDisplay() {return null},
    },
    20: {
        desc: "Unlock Root Epicenter",
        cost: new Decimal(1e27),
        effectDisplay() {return null},
    },
    21: {
        desc: "Square Root milestones are twice as powerful",
        cost: new Decimal(1e30),
        effectDisplay() {return null},
    },
    22: {
        desc: "The \"Get a Y\" button's cost is divided by 1,000",
        cost: new Decimal(1e43),
        effectDisplay() {return null},
    },
    23: {
        desc: "Unlock new Root Epicenter Tasks and Exponential Curve",
        cost: new Decimal(1e57),
        effectDisplay() {return null},
    },
    24: {
        desc: "Generator multiplier superscaling starts at 500x",
        cost: new Decimal(1e120),
        effectDisplay() {return null},
    },
    25: {
        desc: "<b>Unlock the next prestige layer</b>",
        cost: new Decimal(1e175),
        effectDisplay() {return null},
    },
    buy(x) {
        if(player.x2.gte(ResetTable[x].cost) && (player.chalCompletions.length >= 3 || x != 23) && (player.chalCompletions.length >= 6 || x != 25) && !hasQU(x)) {
            if(x != 5 && x != 10 && x != 15 && x != 23 && x != 25) player.x2 = player.x2.sub(ResetTable[x].cost)
            player.quadUpgs.push(x)
        }
    },
}

const CoordinatePlaneLI = {
    xPerMin() {
        let x = player.quadBuyables[1].mul(Decimal.pow(2,player.quadBuyables[2]))
        if(hasQU(12)) x = x.mul(10)
        x = x.mul(SquareRootLI.milestoneEff(2))
        if(hasCU(1,1)) x = x.mul(10)
        if(hasCU(0,2)) x = x.mul(ComplexUpgradesLI[2].eff())
        if(hasCU(0,4)) x = x.mul(ComplexUpgradesLI[4].eff())
        x = x.mul(ComplexChallengesLI[5].eff())
        if(player.sqrtDoublers.gte(5)) x = x.mul(ExponentialCurve.effects(5))
        if(FractalArm.hasUpgrade(75)) x = x.mul(FractalArm[7][5].eff())
        if(FractalArm.hasUpgrade(102)) x = x.mul(FractalArm[10][2].eff())
        x = x.pow(MandelbrotChallenges[3].eff())
        if(player.compChallenge == 2 || player.integration.challenge == 11) x = x.pow(0.5)
        if(player.compChallenge == 3) x = x.pow(0.75)
        if(hasPermUpgrade(18)) x = x.mul(PERM_UPGRADES[18].eff())
        return x
    },
    yPerMin() {
        let y = player.varSynth.iExpBuyables[1].mul(5).mul(Decimal.pow(1.5,player.varSynth.iExpBuyables[1]))
        if(hasYQU(5,'lost')) y = y.mul(YQuadraticUpgradesLI[5].eff())
        if(hasYQU(11,'lost')) y = y.mul(YQuadraticUpgradesLI[11].eff())
        if(hasYQU(13,'lost')) y = y.mul(YQuadraticUpgradesLI[13].eff())
        if(player.sqrtDoublers.gte(8)) y = y.mul(ExponentialCurve.effects(8))
        y = y.mul(Minibrots.riemannSphereEffect())
        if(player.integration.challenge == 1) y = y.pow(0.5)
        if(hasPermUpgrade(18)) y = y.mul(PERM_UPGRADES[18].eff2())
        return y
    },
    buyables: {
        1: {
            cost() {return Decimal.pow(1.1,player.quadBuyables[1]).floor()},
            buy() {
                if(player.y.gte(this.cost())) {
                    player.y = player.y.sub(this.cost())
                    player.sacY = player.sacY.add(this.cost())
                    player.quadBuyables[1] = player.quadBuyables[1].add(1)
                }
            }
        },
        2: {
            cost() {
                let cost = new Decimal(1e18).mul(Decimal.pow(100,player.quadBuyables[2])).mul(Decimal.pow(10,player.quadBuyables[2].sub(50).max(0).pow(2)))
                return cost
            },
            buy() {
                if(player.points.gte(this.cost())) {
                    player.points = player.points.sub(this.cost())
                    player.sacX = player.sacX.add(this.cost())
                    player.quadBuyables[2] = player.quadBuyables[2].add(1)
                }
            }
        },
        3: {
            cost() {return player.quadBuyables[3].gte(58859189) ? new Decimal(Infinity) : new Decimal(100).mul(Decimal.pow(50,player.quadBuyables[3]))},
            buy() {
                if(player.x2.gte(this.cost())) {
                    player.x2 = player.x2.sub(this.cost())
                    player.sacX2 = player.sacX2.add(this.cost())
                    player.quadBuyables[3] = player.quadBuyables[3].add(1)
                }
            }
        },
        4: {
            cost() {return Decimal.pow(1.1,player.varSynth.iExpBuyables[1]).mul(Decimal.pow(1.2,player.varSynth.iExpBuyables[1].sub(32).max(0))).floor()},
            buy() {
                if(player.z.gte(this.cost())) {
                    if(!FractalArm.hasUpgrade(152)) player.z = player.z.sub(this.cost())
                    player.sacZ = player.sacZ.add(this.cost())
                    player.varSynth.iExpBuyables[1] = player.varSynth.iExpBuyables[1].add(1)
                }
            }
        },
    },
}