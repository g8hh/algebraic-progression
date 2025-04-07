const HypercompFlune = {
    1: {
        title: "xj",
        cost() {return new Decimal(1e35).mul(Decimal.pow(3,player.hypercompFlune.currencies[1].pow(2)))},
        eff() {return player.hypercompFlune.powers[1].pow(3).add(1)},
        effectDisplay() {return "multiplying limit score gain by " + format(this.eff()) + "x"},
    },
    2: {
        title: "yj",
        cost() {return new Decimal(1e35).mul(Decimal.pow(6,player.hypercompFlune.currencies[2].pow(2)))},
        eff() {return Decimal.add(1,player.hypercompFlune.powers[2].add(1).log10().add(1).log10().div(25))},
        effectDisplay() {return "powering Complex Plane powers generation by ^" + regularFormat(this.eff(),3)},
    },
    3: {
        title: "zj",
        cost() {return new Decimal(2e38).mul(Decimal.pow(9,player.hypercompFlune.currencies[3].pow(2)))},
        eff() {return Decimal.add(1,player.hypercompFlune.powers[3].add(1).log10().add(1).log10().div(20).mul(BasicHypercompUpgrades.has(7) ? 2 : 1))},
        effectDisplay() {return "powering dx gain by ^" + format(this.eff())},
    },
    4: {
        title: "wj",
        cost() {return new Decimal(1e93).mul(Decimal.pow(12,player.hypercompFlune.currencies[4].pow(2)))},
        eff() {return Decimal.add(1,player.hypercompFlune.powers[4].add(1).log10().add(1).log10().div(10).mul(BasicHypercompUpgrades.has(7) ? 2 : 1))},
        effectDisplay() {return "powering Derivatives gain by ^" + format(this.eff())},
    },
    5: {
        title: "xk",
        cost() {return new Decimal(1e26).mul(Decimal.pow(4,player.hypercompFlune.currencies[5].pow(2)))},
        eff() {return player.hypercompFlune.powers[5].add(1).log2().pow(0.9).floor()},
        effectDisplay() {return "giving " + formatWhole(this.eff()) + " free Pythagorean Triples Buyable purchases (next at " + format(Decimal.pow(2,this.eff().add(1).pow(1.11111)).sub(1)) + ")"},
    },
    6: {
        title: "yk",
        cost() {return new Decimal(1e51).mul(Decimal.pow(7,player.hypercompFlune.currencies[6].pow(2)))},
        eff() {return player.hypercompFlune.powers[6].pow(5).add(1)},
        effectDisplay() {return "multiplying Trigonometric Function powers generation by " + format(this.eff()) + "x"},
    },
    7: {
        title: "zk",
        cost() {return new Decimal(3e126).mul(Decimal.pow(11,player.hypercompFlune.currencies[7].pow(2)))},
        eff() {return Decimal.add(1,player.hypercompFlune.powers[7].add(1).log10().add(1).log10().div(20))},
        effectDisplay() {return "powering triangles gain by ^" + format(this.eff())},
    },
    8: {
        title: "wk",
        cost() {return new Decimal(1e188).mul(Decimal.pow(15,player.hypercompFlune.currencies[8].pow(2)))},
        eff() {return player.hypercompFlune.powers[8].pow(100).add(1)},
        effectDisplay() {return "multiplying PE gain by " + format(this.eff()) + "x"},
    },
    gen(x) {
        let hf = Decimal.pow(1.8,player.hypercompFlune.currencies[x].pow(SinusoidalUpgrades.has(29) ? 1.4 : 1)).mul(player.hypercompFlune.currencies[x]).mul(SinusoidalUpgrades[35].eff()).pow(NumberSets.effect(7,4))
        return hf
    },
    canAfford(x) {
        return x > 4 ? player.k.gte(HypercompFlune[x].cost()) : player.j.gte(HypercompFlune[x].cost())
    },
    buy(x) {
        if(HypercompFlune.canAfford(x)) {
            if(x < 5) player.j = player.j.sub(HypercompFlune[x].cost())
            if(x > 4) player.k = player.k.sub(HypercompFlune[x].cost())
            player.hypercompFlune.currencies[x] = player.hypercompFlune.currencies[x].add(1)
        }
    },
}