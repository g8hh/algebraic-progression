const ComplexUpgradesLI = {
    1: {
        desc: "Unlock Point Quasars, which produce Point Portals, Autoclickers now produce Point Quasars",
        cost: new Decimal(3),
        effectDisplay() {return null},
    },
    2: {
        desc: "Multiply X generation based on the generator multiplier",
        cost: new Decimal(3),
        eff() {return GeneratorMultiplier.mult().pow(0.01).pow(YPowers.buyables[10].eff())},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    3: {
        desc: "Generators gain a multiplier based on Root Essence",
        cost: new Decimal(3),
        eff() {return player.rootEssence.pow(20).add(1).pow(XPowers.buyables[15].eff())},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    4: {
        desc: "Multiply X generation based on i",
        cost: new Decimal(3),
        eff() {return player.i.pow(5).add(1).min("1e1.6e7")},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    5: {
        desc: "<span style='font-size:12px'>Production of Generators is faster based on RP, produced Autoclickers boost RP gain</span>",
        cost: new Decimal(5),
        eff() {return player.x2.pow(0.25).add(1).min("1e2.5e7")}, // produced generators
        eff2() {
            let x = player.buyables[7].pow(0.1).add(1)
            if(!FractalArm.hasUpgrade(191)) x = x.min("1e1600000")
            if(x.gt("1e1600000")) x = x.div("1e1600000").pow(0.1).mul("1e1600000")
            return x
        }, // reset points
        effectDisplay() {return format(this.eff()) + "x produced generators, " + format(this.eff2()) + "x RP"},
    },
    6: {
        desc: "Gain more Reset Points based on generator multiplier",
        cost: new Decimal(5),
        eff() {
            let x = GeneratorMultiplier.mult().pow(0.03)
            if(x.gt(1e50)) x = x.div(1e50).pow(0.4).mul(1e50)
            x = x.pow(XPowers.buyables[15].eff())
            x = x.min("1e1.1e7")
            return x
        },
        effectDisplay() {return format(this.eff()) + "x"},
    },
    7: {
        desc: "Reset Points and square roots boost each other",
        cost: new Decimal(5),
        eff() {return player.challengeEssence.pow(0.5).add(1)}, // reset points
        eff2() {return player.x2.pow(0.025).add(1)}, // square roots
        effectDisplay() {return format(this.eff()) + "x RP, " + format(this.eff2()) + "x square roots"},
    },
    8: {
        desc: "i adds to the generator multiplier mult gain",
        cost: new Decimal(5),
        eff() {return player.i.max(1).log10().div(50).min(0.2)},
        effectDisplay() {return "+" + format(this.eff())},
    },
    9: {
        desc: "Gain more i based on points and time in this Complex",
        cost: new Decimal(7),
        eff() {return (FractalArm.hasUpgrade(122) ? player.points.pow(1/10000) : player.points.max(1).log10().div(50)).mul(Math.log10(player.gamePrestigeTimes[2] + 1) + 1).add(1)},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    10: {
        desc: "Gain more i based on the generator multiplier",
        cost: new Decimal(7),
        eff() {return GeneratorMultiplier.mult().pow(0.001)},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    11: {
        desc: "Square roots are more impactful in the i formula",
        cost: new Decimal(7),
        effectDisplay() {return null},
    },
    12: {
        desc: "Complex Plane effects are raised ^1.1",
        cost: new Decimal(7),
        effectDisplay() {return null},
    },
}

const BasicComplexUpgradesLI = {
    1: {
        desc: "Generators and Reset Points gain a multiplier based on total i, and multiply gains of RE, square roots, and x generation by 10",
        cost: new Decimal(1),
        eff() {return new Decimal(16).mul(new Decimal(1).add(player.i.pow(0.5)))}, // point gain
        eff2() {return new Decimal(4).mul(new Decimal(1).add(player.i.pow(0.25)))}, // RP gain
        effectDisplay() {return format(this.eff()) + "x points, " + format(this.eff2()) + "x RP gain"},
    },
    2: {
        desc: "Generators gain a multiplier based on Achievements",
        cost: new Decimal(2e23),
        eff() {return Decimal.pow(1000,player.achievements.length)},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    3: {
        desc: "The 3rd Exponential Curve buyable has a requirement instead of a cost",
        cost: new Decimal(1e30),
        effectDisplay() {return null},
    },
    4: {
        desc: "Power Reset Point gain based on total upgrade points",
        cost: new Decimal(5e40),
        eff() {return player.upgradePoints[1].div(200).add(1).div(1.05).pow(0.5).min(1.25)},
        effectDisplay() {return "^" + format(this.eff())},
    },
    5: {
        desc: "Opposite directional effects on the same axis on the Complex Plane get a similar but reduced effect",
        cost: new Decimal(7.5e48),
        effectDisplay() {return null},
    },
    6: {
        desc: "Unlock Complex Challenges",
        cost: new Decimal(5.1e51),
        effectDisplay() {return null},
    },
    7: {
        desc: "Reset Points gain a multiplier based on unspent i",
        cost: new Decimal(1e150),
        eff() {return player.i.pow(0.5).add(1)},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    8: {
        desc: "Minimum Square Root milestone threshold is 1.8x",
        cost: new Decimal(1e240),
        effectDisplay() {return null},
    },
    9: {
        desc: "Get more i based on times gone Complex",
        cost: new Decimal("1e600"),
        eff() {return player.complexes.pow(2).add(1)},
        effectDisplay() {return format(this.eff()) + "x"},
    },
    buy(x) {
        if(player.i.gte(this[x].cost) && !hasCU(1,x) && player.compChallenge != 10){
            player.i = player.i.sub(this[x].cost)
            player.compUpgs[1].push(x)
            if(x == 3) {
                if(player.sqrtDoublers == 1) player.quadPower = player.quadPower.add(10)
                if(player.sqrtDoublers == 2) player.quadPower = player.quadPower.add(40)
            }
        }
    }
  };