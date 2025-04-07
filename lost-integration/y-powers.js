const YPowers = {
    yPowerProduct() {return !player.inLostIntegration ? new Decimal(1) : player.yPolynomials[3].amount.max(1).mul(player.yPolynomials[4].amount.max(1)).mul(player.yPolynomials[5].amount.max(1)).mul(player.yPolynomials[6].amount.max(1)).mul(player.yPolynomials[7].amount.max(1)).mul(player.yPolynomials[8].amount.max(1)).mul(player.yPolynomials[9].amount.max(1)).mul(player.yPolynomials[10].amount.max(1))},
    yPowerProductEffect() {return Decimal.add(1,this.yPowerProduct().pow(Decimal.add(1,this.buyables[6].eff())).log10().pow(0.75).div(2500))},
    gen(x) {
        // find requirement for the y powers tier
        let req = new Decimal(1e10)
        if(x > 7 && x < 10) req = new Decimal(1e20)
        if(x == 10) req = new Decimal(1e30)

        // calculate generation
        let gen
        if (x == 3) {
            gen = player.y.pow(1/5000)
        } else if (player.yPolynomials[x-1].amount.gte(req)) {
            gen = player.yPolynomials[x-1].amount.div(req).pow(0.3)
        } else {
            return new Decimal(0)
        }
        if(x == 3) gen = gen.mul(this.buyables[1].eff())
        if(x == 4) gen = gen.mul(this.buyables[3].eff())
        if(x == 5) gen = gen.mul(this.buyables[5].eff())
        if(x == 6) gen = gen.mul(this.buyables[7].eff())
        if(x == 7) gen = gen.mul(this.buyables[9].eff())
        if(x == 8) gen = gen.mul(this.buyables[11].eff())
        if(x == 9) gen = gen.mul(this.buyables[13].eff())
        if(x == 10) gen = gen.mul(this.buyables[15].eff())
        if(FractalArm.hasUpgrade(161)) gen = gen.mul(FractalArm[16][1].eff2())
        if(FractalArm.hasUpgrade(211)) gen = gen.mul(FractalArm[21][1].eff()) 
        if(FractalArm.hasUpgrade(212)) gen = gen.mul(FractalArm[21][2].eff()) 
        gen = gen.pow(this.buyables[4].eff())
        return gen
    },
    buyables: {
        1: {
            desc: "Multiply y<sup>3</sup> gain by 100",
            cost() {return new Decimal(1e5).mul(Decimal.pow(5,player.yPolynomials.buyables[0].pow(2)))},
            eff() {return Decimal.pow(100,player.yPolynomials.buyables[0])},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.yPolynomials[3].amount},
        },
        2: {
            desc: "Multiply the effect of the 3rd x<sup>2</sup> buyable by +1x",
            cost() {return new Decimal(1e10).mul(Decimal.pow(10,player.yPolynomials.buyables[1].pow(2)))},
            eff() {return player.yPolynomials.buyables[1].add(1)},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.yPolynomials[3].amount},
        },
        3: {
            desc: "Multiply y<sup>4</sup> gain by 100",
            cost() {return new Decimal(100).mul(Decimal.pow(10,player.yPolynomials.buyables[2].pow(2)))},
            eff() {return Decimal.pow(100,player.yPolynomials.buyables[2])},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.yPolynomials[4].amount},
        },
        4: {
            desc: "Power gain of all Y Powers by +0.01",
            cost() {return new Decimal(1e10).mul(Decimal.pow(25,player.yPolynomials.buyables[3].pow(2)))},
            eff() {return Decimal.add(1,player.yPolynomials.buyables[3].div(100))},
            effectDisplay() {return "^" + format(this.eff())},
            currency() {return player.yPolynomials[4].amount},
        },
        5: {
            desc: "Multiply y<sup>5</sup> gain by 100",
            cost() {return new Decimal(100).mul(Decimal.pow(20,player.yPolynomials.buyables[4].pow(2)))},
            eff() {return Decimal.pow(100,player.yPolynomials.buyables[4])},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.yPolynomials[5].amount},
        },
        6: {
            desc: "Add 0.1 to the exponent before the log in the Y Power product effect formula",
            cost() {return new Decimal(1e10).mul(Decimal.pow(50,player.yPolynomials.buyables[5].pow(2)))},
            eff() {return Decimal.add(1,player.yPolynomials.buyables[5].div(10))},
            effectDisplay() {return "+" + format(this.eff())},
            currency() {return player.yPolynomials[5].amount},
        },
        7: {
            desc: "Multiply y<sup>6</sup> gain by 100",
            cost() {return new Decimal(100).mul(Decimal.pow(30,player.yPolynomials.buyables[6].pow(2)))},
            eff() {return Decimal.pow(100,player.yPolynomials.buyables[6])},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.yPolynomials[6].amount},
        },
        8: {
            desc: "Power the effect of the 3rd x<sup>5</sup> buyable by +1",
            cost() {return new Decimal(1e10).mul(Decimal.pow(50,player.yPolynomials.buyables[7].pow(2)))},
            eff() {return player.yPolynomials.buyables[7].add(1)},
            effectDisplay() {return "^" + format(this.eff())},
            currency() {return player.yPolynomials[6].amount},
        },
        9: {
            desc: "Multiply y<sup>7</sup> gain by 100",
            cost() {return new Decimal(100).mul(Decimal.pow(30,player.yPolynomials.buyables[8].pow(2)))},
            eff() {return Decimal.pow(100,player.yPolynomials.buyables[8])},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.yPolynomials[7].amount},
        },
        10: {
            desc: "Power the CU2 effect by +1",
            cost() {return new Decimal(1e10).mul(Decimal.pow(50,player.yPolynomials.buyables[9].pow(2)))},
            eff() {return player.yPolynomials.buyables[9].add(1)},
            effectDisplay() {return "^" + format(this.eff())},
            currency() {return player.yPolynomials[7].amount},
        },
        11: {
            desc: "Multiply y<sup>8</sup> gain by 100",
            cost() {return new Decimal(100).mul(Decimal.pow(30,player.yPolynomials.buyables[10].pow(2)))},
            eff() {return Decimal.pow(100,player.yPolynomials.buyables[10])},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.yPolynomials[8].amount},
        },
        12: {
            desc: "Power the effect of the 3rd x<sup>7</sup> buyable by +1",
            cost() {return new Decimal(1e10).mul(Decimal.pow(50,player.yPolynomials.buyables[11].pow(2)))},
            eff() {return player.yPolynomials.buyables[11].add(1)},
            effectDisplay() {return "^" + format(this.eff())},
            currency() {return player.yPolynomials[8].amount},
        },
        13: {
            desc: "Multiply y<sup>9</sup> gain by 100",
            cost() {return new Decimal(100).mul(Decimal.pow(60,player.yPolynomials.buyables[12].pow(2)))},
            eff() {return Decimal.pow(100,player.yPolynomials.buyables[12])},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.yPolynomials[9].amount},
        },
        14: {
            desc: "Multiply the effect of the 3rd x<sup>8</sup> buyable by +1",
            cost() {return new Decimal(1e10).mul(Decimal.pow(100,player.yPolynomials.buyables[13].pow(2)))},
            eff() {return player.yPolynomials.buyables[13].add(1)},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.yPolynomials[9].amount},
        },
        15: {
            desc: "Multiply y<sup>10</sup> gain by 100",
            cost() {return new Decimal(100).mul(Decimal.pow(60,player.yPolynomials.buyables[14].pow(2)))},
            eff() {return Decimal.pow(100,player.yPolynomials.buyables[14])},
            effectDisplay() {return format(this.eff()) + "x"},
            currency() {return player.yPolynomials[10].amount},
        },
        16: {
            desc: "Power the effect of the 3rd x<sup>9</sup> buyable by +1",
            cost() {return new Decimal(1e10).mul(Decimal.pow(100,player.yPolynomials.buyables[15].pow(2)))},
            eff() {return player.yPolynomials.buyables[15].add(1)},
            effectDisplay() {return "^" + format(this.eff())},
            currency() {return player.yPolynomials[10].amount},
        },
        buy(x) {
            if(YPowers.buyables[x].currency().gte(YPowers.buyables[x].cost())) {
                player.yPolynomials[Math.floor(Math.floor((x - 1) / 2) + 3)].amount = player.yPolynomials[Math.floor(Math.floor((x - 1) / 2) + 3)].amount.sub(YPowers.buyables[x].cost())
                player.yPolynomials.buyables[x - 1] = player.yPolynomials.buyables[x - 1].add(1)
            }
        }
    },
}