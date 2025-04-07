const ExponentialCurve = {
    e() {
        let e = new Decimal(2.71828).mul(player.quadBuyables[7].add(1))
        if(hasYQU(2,'lost')) e = e.add(YQuadraticUpgradesLI[2].eff())
        e = e.mul(XPowers.buyables[3].eff())
        return e
    },
    expression() {return this.e().pow(player.quadBuyables[8].mul(2))},
    totalGeoSequences() {
        let g = new Decimal(0)
        g = g.add(Math.min(player.chalCompletions.length,6) * 10)
        if(hasComplexMilestoneLI(6)) g = new Decimal(60)
        g = g.add(ccTiers() * 10)
        g = g.add(player.yChalCompletions[1].add(player.yChalCompletions[2]).add(player.yChalCompletions[3]).add(player.yChalCompletions[4]).add(player.yChalCompletions[5]).add(player.yChalCompletions[6]).mul(10))
        return g
    },
    buyables: {
        1: {
            desc: "Increase e by 2.71828 per level",
            cost() {return Decimal.mul(5,player.quadBuyables[7].add(1))},
        },
        2: {
            desc: "Increase n by 2 per level",
            cost() {return Decimal.mul(10,player.quadBuyables[8].add(1))},
        },
        3: {
            desc: "Unlock a new boost",
            cost() {return new Decimal(10).add(Decimal.mul(Decimal.add(20,player.sqrtDoublers.sub(2).max(0).mul(5)),player.sqrtDoublers))},
        },
        canBuy(x) {
            if(x == 3 && hasCU(1,3)) return player.imagPower.gte(ExponentialCurve.buyables[x].cost())
            else return player.quadPower.gte(ExponentialCurve.buyables[x].cost())
        },
        buy(x) {
            if(ExponentialCurve.buyables.canBuy(x)) {
                if(x != 3 || !hasCU(1,3)) player.quadPower = player.quadPower.sub(ExponentialCurve.buyables[x].cost())
                if(x < 3) player.quadBuyables[x+6] = player.quadBuyables[x+6].add(1)
                if(x == 3) player.sqrtDoublers = player.sqrtDoublers.add(1)
            }
        }
    },
    respec(force) {
        if (force || confirm("Are you sure you want to respec your Exponential Curve Buyables? You will Reset with no reward!")) {
            player.quadBuyables[7] = new Decimal(0)
            player.quadBuyables[8] = new Decimal(0)
            player.sqrtDoublers = new Decimal(0)
            player.quadPower = ExponentialCurve.totalGeoSequences()
            if(!force) ResetPrestige.reset(true)
        }
    },
    effects(x) {
        if(player.compChallenge == 4) return new Decimal(1)
        switch (x) {
            case 1:
                return this.expression().pow(2).add(1).pow(XPowers.buyables[21].eff()) // square roots
            break;
            case 2:
                return this.expression().pow(15).add(1).pow(XPowers.buyables[21].eff()) // reset points
            break;
            case 3:
                return this.expression().pow(0.25).add(1).pow(XPowers.buyables[21].eff()) // i
            break;
            case 4:
                return this.expression().pow(0.75).add(1).pow(XPowers.buyables[21].eff()) // root essence
            break;
            case 5:
                return this.expression().pow(3).add(1).pow(XPowers.buyables[21].eff()) // x generation
            break;
            case 6:
                return this.expression().pow(0.025).add(1).pow(XPowers.buyables[21].eff()) // y^2 gain
            break;
            case 7:
                return this.expression().pow(0.3).add(1).pow(XPowers.buyables[21].eff()) // particles gain
            break;
            case 8:
                return this.expression().pow(0.1).add(1).pow(XPowers.buyables[21].eff()) // y generation
            break;
            case 9:
                return this.expression().pow(0.15).add(1).pow(XPowers.buyables[21].eff()) // X powers
            break;
        }
    }
}

function updateExponentialCurve() {
    if(player.imagPower.lt(ExponentialCurve.totalGeoSequences())) {
        let difference = ExponentialCurve.totalGeoSequences().sub(player.imagPower)
        player.imagPower = ExponentialCurve.totalGeoSequences()
        player.quadPower = player.quadPower.add(difference)
    }
}