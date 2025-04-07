const XPowers = {
    xPowerProduct() {return !player.inLostIntegration ? new Decimal(1) : player.polynomials[2].amount.max(1).mul(player.polynomials[3].amount.max(1)).mul(player.polynomials[4].amount.max(1)).mul(player.polynomials[5].amount.max(1)).mul(player.polynomials[6].amount.max(1)).mul(player.polynomials[7].amount.max(1)).mul(player.polynomials[8].amount.max(1)).mul(player.polynomials[9].amount.max(1))},
    xPowerProductEffect() {return Decimal.add(1,this.xPowerProduct().pow(Decimal.add(1,this.buyables[9].eff())).log10().pow(0.75).div(500)).min(1.3)},
    mandelbrotEngineEffect() {return player.polynomials[6].amount.gte(1e10) ? this.xPowerProduct().min("1e370").pow(1/50).add(1) : new Decimal(1)},
    mandelbrotEnginePercentage() {return Decimal.div(this.xPowerProduct().log10(),3.7).min(100)},
    gen(x) {
        // find requirement for the x powers tier
        let req = new Decimal(1e10)
        if(x > 6 && x < 9) req = new Decimal(1e20)
        if(x == 9) req = new Decimal(1e30)

        // calculate generation
        let gen
        if (x == 2) {
            gen = player.x.pow(1/5000)
        } else if (player.polynomials[x-1].amount.gte(req)) {
            gen = player.polynomials[x-1].amount.div(req).pow(0.3)
        } else {
            return new Decimal(0)
        }
        gen = gen.mul(this.buyables[18].eff())
        gen = gen.mul(this.xPowersBooster.eff())
        gen = gen.mul(this.mandelbrotEngineEffect())
        if(x == 2) gen = gen.mul(this.buyables[1].eff()).pow(this.buyables[2].eff())
        if(x == 3) gen = gen.mul(this.buyables[4].eff()).pow(this.buyables[5].eff())
        if(x == 4) gen = gen.mul(this.buyables[7].eff()).pow(this.buyables[8].eff())
        if(x == 5) gen = gen.mul(this.buyables[10].eff()).pow(this.buyables[11].eff())
        if(x == 6) gen = gen.mul(this.buyables[13].eff()).pow(this.buyables[14].eff())
        if(x == 7) gen = gen.mul(this.buyables[16].eff()).pow(this.buyables[17].eff())
        if(x == 8) gen = gen.mul(this.buyables[19].eff()).pow(this.buyables[20].eff())
        if(x == 9) gen = gen.mul(this.buyables[22].eff()).pow(this.buyables[23].eff())
        if(FractalArm.hasUpgrade(11)) gen = gen.mul(FractalArm[1][1].eff2())
        if(player.sqrtDoublers.gte(9)) gen = gen.mul(ExponentialCurve.effects(9))
        if(FractalArm.hasUpgrade(103)) gen = gen.mul(FractalArm[10][3].eff())
        gen = gen.pow(YPowers.yPowerProductEffect())
        if(hasPermUpgrade(21)) gen = gen.mul(PERM_UPGRADES[21].eff(x))
        if(x > 5 && player.integration.challenge == 13) gen = new Decimal(0)
        return gen
    },
    buyables: {
        1: {
            desc: "Multiply x<sup>2</sup> gain by 100",
            cost() {return new Decimal(1e6).mul(Decimal.pow(5,player.polynomials.buyables[0].pow(2)))},
            eff() {return Decimal.pow(100,player.polynomials.buyables[0])},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.polynomials[2].amount},
        },
        2: {
            desc: "Power x<sup>2</sup> gain by +0.01",
            cost() {return new Decimal(1e10).mul(Decimal.pow(10,player.polynomials.buyables[1].pow(2)))},
            eff() {return Decimal.add(1,player.polynomials.buyables[1].div(100))},
            effectDisplay() {return "^" + format(this.eff())},
            currency() {return player.polynomials[2].amount},
        },
        3: {
            desc: "Multiply e by +1x in Exponential Curve formula",
            cost() {return new Decimal(1e5).mul(Decimal.pow(10,player.polynomials.buyables[2].pow(2)))},
            eff() {return player.polynomials.buyables[2].add(1).mul(YPowers.buyables[2].eff())},
            effectDisplay() {return "+" + format(this.eff())},
            currency() {return player.polynomials[2].amount},
        },
        4: {
            desc: "Multiply x<sup>3</sup> gain by 100",
            cost() {return new Decimal(100).mul(Decimal.pow(10,player.polynomials.buyables[3].pow(2)))},
            eff() {return Decimal.pow(100,player.polynomials.buyables[3])},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.polynomials[3].amount},
        },
        5: {
            desc: "Power x<sup>3</sup> gain by +0.01",
            cost() {return new Decimal(1e10).mul(Decimal.pow(20,player.polynomials.buyables[4].pow(2)))},
            eff() {return Decimal.add(1,player.polynomials.buyables[4].div(100))},
            effectDisplay() {return "^" + format(this.eff())},
            currency() {return player.polynomials[3].amount},
        },
        6: {
            desc: "Power y<sup>2</sup> gain by +0.01",
            cost() {return new Decimal(1e5).mul(Decimal.pow(25,player.polynomials.buyables[5].pow(2)))},
            eff() {return Decimal.add(1,player.polynomials.buyables[5].div(100)).min(1.55)},
            effectDisplay() {return "^" + format(this.eff())},
            currency() {return player.polynomials[3].amount},
        },
        7: {
            desc: "Multiply x<sup>4</sup> gain by 100",
            cost() {return new Decimal(100).mul(Decimal.pow(20,player.polynomials.buyables[6].pow(2)))},
            eff() {return Decimal.pow(100,player.polynomials.buyables[6])},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.polynomials[4].amount},
        },
        8: {
            desc: "Power x<sup>4</sup> gain by +0.01",
            cost() {return new Decimal(1e10).mul(Decimal.pow(40,player.polynomials.buyables[7].pow(2)))},
            eff() {return Decimal.add(1,player.polynomials.buyables[7].div(100))},
            effectDisplay() {return "^" + format(this.eff())},
            currency() {return player.polynomials[4].amount},
        },
        9: {
            desc: "Add 0.1 to the exponent before the log in the X Power product effect formula",
            cost() {return new Decimal(1e5).mul(Decimal.pow(50,player.polynomials.buyables[8].pow(2)))},
            eff() {return Decimal.add(1,player.polynomials.buyables[8].div(10))},
            effectDisplay() {return "^" + format(this.eff())},
            currency() {return player.polynomials[4].amount},
        },
        10: {
            desc: "Multiply x<sup>5</sup> gain by 100",
            cost() {return new Decimal(100).mul(Decimal.pow(30,player.polynomials.buyables[9].pow(2)))},
            eff() {return Decimal.pow(100,player.polynomials.buyables[9])},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.polynomials[5].amount},
        },
        11: {
            desc: "Power x<sup>5</sup> gain by +0.01",
            cost() {return new Decimal(1e10).mul(Decimal.pow(60,player.polynomials.buyables[10].pow(2)))},
            eff() {return Decimal.add(1,player.polynomials.buyables[10].div(100))},
            effectDisplay() {return "^" + format(this.eff())},
            currency() {return player.polynomials[5].amount},
        },
        12: {
            desc: "Multiply Particles gain by 1e6",
            cost() {return new Decimal(1e5).mul(Decimal.pow(50,player.polynomials.buyables[11].pow(2)))},
            eff() {return Decimal.pow(1e6,player.polynomials.buyables[11]).pow(YPowers.buyables[8].eff())},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.polynomials[5].amount},
        },
        13: {
            desc: "Multiply x<sup>6</sup> gain by 100",
            cost() {return new Decimal(100).mul(Decimal.pow(30,player.polynomials.buyables[12].pow(2)))},
            eff() {return Decimal.pow(100,player.polynomials.buyables[12])},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.polynomials[6].amount},
        },
        14: {
            desc: "Power x<sup>6</sup> gain by +0.01",
            cost() {return new Decimal(1e10).mul(Decimal.pow(60,player.polynomials.buyables[13].pow(2)))},
            eff() {return Decimal.add(1,player.polynomials.buyables[13].div(100))},
            effectDisplay() {return "^" + format(this.eff())},
            currency() {return player.polynomials[6].amount},
        },
        15: {
            desc: "Power CU3 and CU6 effects by +0.1",
            cost() {return new Decimal(1e5).mul(Decimal.pow(50,player.polynomials.buyables[14].pow(2)))},
            eff() {return Decimal.add(1,player.polynomials.buyables[14].div(10))},
            effectDisplay() {return "^" + format(this.eff())},
            currency() {return player.polynomials[6].amount},
        },
        16: {
            desc: "Multiply x<sup>7</sup> gain by 100",
            cost() {return new Decimal(100).mul(Decimal.pow(30,player.polynomials.buyables[15].pow(2)))},
            eff() {return Decimal.pow(100,player.polynomials.buyables[15])},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.polynomials[7].amount},
        },
        17: {
            desc: "Power x<sup>7</sup> gain by +0.01",
            cost() {return new Decimal(1e10).mul(Decimal.pow(60,player.polynomials.buyables[16].pow(2)))},
            eff() {return Decimal.add(1,player.polynomials.buyables[16].div(100))},
            effectDisplay() {return "^" + format(this.eff())},
            currency() {return player.polynomials[7].amount},
        },
        18: {
            desc: "Double gain of all X Powers",
            cost() {return new Decimal(1e5).mul(Decimal.pow(50,player.polynomials.buyables[17].pow(2)))},
            eff() {return Decimal.pow(2,player.polynomials.buyables[17]).pow(YPowers.buyables[12].eff())},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.polynomials[7].amount},
        },
        19: {
            desc: "Multiply x<sup>8</sup> gain by 100",
            cost() {return new Decimal(100).mul(Decimal.pow(60,player.polynomials.buyables[18].pow(2)))},
            eff() {return Decimal.pow(100,player.polynomials.buyables[18])},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.polynomials[8].amount},
        },
        20: {
            desc: "Power x<sup>8</sup> gain by +0.01",
            cost() {return new Decimal(1e10).mul(Decimal.pow(120,player.polynomials.buyables[19].pow(2)))},
            eff() {return Decimal.add(1,player.polynomials.buyables[19].div(100))},
            effectDisplay() {return "^" + format(this.eff())},
            currency() {return player.polynomials[8].amount},
        },
        21: {
            desc: "Power all Exponential Curve effects by +0.05",
            cost() {return new Decimal(1e5).mul(Decimal.pow(100,player.polynomials.buyables[20].pow(2)))},
            eff() {return Decimal.add(1,player.polynomials.buyables[20].div(20).mul(YPowers.buyables[14].eff()))},
            effectDisplay() {return "^" + format(this.eff())},
            currency() {return player.polynomials[8].amount},
        },
        22: {
            desc: "Multiply x<sup>9</sup> gain by 100",
            cost() {return new Decimal(100).mul(Decimal.pow(60,player.polynomials.buyables[21].pow(2)))},
            eff() {return Decimal.pow(100,player.polynomials.buyables[21])},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.polynomials[9].amount},
        },
        23: {
            desc: "Power x<sup>9</sup> gain by +0.01",
            cost() {return new Decimal(1e10).mul(Decimal.pow(120,player.polynomials.buyables[22].pow(2)))},
            eff() {return Decimal.add(1,player.polynomials.buyables[22].div(100))},
            effectDisplay() {return "^" + format(this.eff())},
            currency() {return player.polynomials[9].amount},
        },
        24: {
            desc: "Multiply i gain by 1e30",
            cost() {return new Decimal(1e5).mul(Decimal.pow(100,player.polynomials.buyables[23].pow(2)))},
            eff() {return Decimal.pow(1e30,player.polynomials.buyables[23]).pow(YPowers.buyables[16].eff())},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.polynomials[9].amount},
        },
        buy(x) {
            if(XPowers.buyables[x].currency().gte(XPowers.buyables[x].cost())) {
                player.polynomials[Math.floor(Math.floor((x - 1) / 3) + 2)].amount = player.polynomials[Math.floor(Math.floor((x - 1) / 3) + 2)].amount.sub(XPowers.buyables[x].cost())
                player.polynomials.buyables[x - 1] = player.polynomials.buyables[x - 1].add(1)
            }
        }
    },
    xPowersBooster: {
        cost() {return new Decimal("1e2250").mul(Decimal.pow(1e200,player.triplers)).mul(Decimal.pow(1e25,player.triplers.sub(8).max(0).pow(2)))},
        buy() {
            if(player.i.gte(this.cost())) {
                player.i = player.i.sub(this.cost())
                player.triplers = player.triplers.add(1)
            }
        },
        eff() {return Decimal.pow(10,player.triplers).pow(FractalArm.hasUpgrade(41) ? 2 : 1)},
    }
}