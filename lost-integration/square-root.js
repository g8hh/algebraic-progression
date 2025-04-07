const SquareRootLI = {
    milestonesReached() {
        return player.challengeEssence.div(100).max(1).log(this.milestoneScaling()).min(1.5e7).floor()
    },
    milestoneScaling() {
        return Decimal.div(10,Decimal.pow(1.1,player.quadBuyables[5])).max(hasCU(1,8) ? (FractalArm.hasUpgrade(121) ? 1.7 : 1.8) : 2)
    },
    nextMilestone() {
        return new Decimal(100).mul(Decimal.pow(this.milestoneScaling(),this.milestonesReached().add(1)))
    },
    milestoneEff(x) {
        if(x == 1) {
            return Decimal.pow(hasQU(21) ? 100 : 10,this.milestonesReached())
        } else {
            return Decimal.pow(hasQU(21) ? 4 : 2,this.milestonesReached())
        }
    },
    reFormula() {
        let re = player.abc[1].div(100).add(player.y)
        re = re.mul(this.buyables[3].eff())
        if(hasUpgrade(8)) re = re.mul(10)
        if(hasCU(1,1)) re = re.mul(10)
        re = re.mul(ComplexChallengesLI[6].eff())
        if(player.sqrtDoublers.gte(4)) re = re.mul(ExponentialCurve.effects(4))
        if(ComplexChallengesLI.milestones.has(2)) re = re.mul(ComplexChallengesLI.milestones[2].eff())
        if(hasPermUpgrade(3)) re = re.mul(PERM_UPGRADES[3].eff())
        if(player.yChallenge == 4) re = new Decimal(0)
        re = re.sub(player.rootEssence).max(0).floor()
        return re
    },
    enterSqrt() {
        if(player.compChallenge != 5) {
            if(!player.inSqrt) {
                player.sqrtEnters += 1
                if(player.epicenterLevel > 0) player.challenge = 10 + player.epicenterLevel
            }
            if(player.inSqrt) {
                if(player.epicenterLevel > 0 && player.points.gte(RootEpicenterLI.goals[player.epicenterLevel]) && !hasChallenge(player.epicenterLevel + 10)) player.chalCompletions.push(player.epicenterLevel + 10)
                player.rootEssence = player.rootEssence.add(this.reFormula())
                player.challenge = 0
            }
            player.inSqrt = !player.inSqrt
            ResetPrestige.reset(true)
            player.points = new Decimal(25)
            if(FractalArm.hasUpgrade(33) && player.yChallenge == 1) player.buyables[5] = new Decimal(1)
        }
    },
    sqrtGen() {
        let sqrt = player.rootEssence
        sqrt = sqrt.mul(this.buyables[1].eff())
        if(player.sqrtDoublers.gte(1)) sqrt = sqrt.mul(ExponentialCurve.effects(1))
        if(hasCU(1,1)) sqrt = sqrt.mul(10)
        if(hasCU(0,7)) sqrt = sqrt.mul(ComplexUpgradesLI[7].eff2())
        sqrt = sqrt.mul(ComplexPlaneLI.effects(4))
        if(ComplexChallengesLI.milestones.has(4)) sqrt = sqrt.mul(ComplexChallengesLI.milestones[4].eff())
        if(hasYQU(7,'lost')) sqrt = sqrt.mul(this.buyables[3].eff())
        if(FractalArm.hasUpgrade(11)) sqrt = sqrt.mul(FractalArm[1][1].eff())
        if(hasYQU(3,'lost')) sqrt = sqrt.pow(YQuadraticUpgradesLI[3].eff())
        if(FractalArm.hasUpgrade(111)) sqrt = sqrt.mul(FractalArm[11][1].eff())
        sqrt = sqrt.pow(YChallengesLI[4].eff())
        if(hasPermUpgrade(19)) sqrt = sqrt.mul(PERM_UPGRADES[19].eff())
        return sqrt
    },
    buyables: {
        1: {
            desc: "You get 2x more square roots",
            cost() {return new Decimal(1000).mul(Decimal.pow(6,player.quadBuyables[4])).div(hasChallenge(15) ? 1e6 : 1)},
            eff() {return Decimal.pow(2,player.quadBuyables[4]).min("1e3300000")},
            effectDisplay() {return format(this.eff()) + "x"},
        },
        2: {
            desc: "Make the milestone scaling slower, but reset square roots",
            cost() {return player.quadBuyables[5].gte(hasCU(1,8) ? (FractalArm.hasUpgrade(121) ? 19 : 18) : 17) ? new Decimal(Infinity) : new Decimal(10000).mul(Decimal.pow(4,player.quadBuyables[5])).div(hasChallenge(15) ? 1e6 : 1)},
            effectDisplay() {return format(SquareRootLI.milestoneScaling()) + "x milestone scaling"},
        },
        3: {
            desc: "You get 3x more root essence",
            cost() {return new Decimal(100000).mul(Decimal.pow(10,player.quadBuyables[6])).mul(Decimal.pow(10,player.quadBuyables[6].sub(20).max(0).pow(2))).div(hasChallenge(15) ? 1e6 : 1)},
            eff() {return player.compChallenge == 6 ? new Decimal(1) : Decimal.pow(3,player.quadBuyables[6])},
            effectDisplay() {return format(this.eff()) + "x"},
        },
        buy(x) {
            if(player.challengeEssence.gte(SquareRootLI.buyables[x].cost())) {
                player.challengeEssence = player.challengeEssence.sub(SquareRootLI.buyables[x].cost())
                if(x == 2 && !hasComplexMilestoneLI(8)) player.challengeEssence = new Decimal(0)
                player.quadBuyables[x+3] = player.quadBuyables[x+3].add(1)
            }
        }
    },
}

const RootEpicenterLI = {
    setTask() {
        player.epicenterLevel++
        if(!hasQU(23) && player.epicenterLevel > 3) player.epicenterLevel = 0
        if(hasQU(23) && player.epicenterLevel > 6) player.epicenterLevel = 0
    },
    descs: ["A regular Square Root run.","Generator production is also raised ^0.9.","The X cost is squared.","Generator multiplier is disabled.","Produced generators are disabled.","You are stuck in another layer of Square Root.","All previous RETs are combined."],
    goals: [null,new Decimal(1e69),new Decimal(1e115),new Decimal(1e125),new Decimal("1e365"),new Decimal(1e182),new Decimal(1e140)],
    rewardDescs: [null,"All generators are multiplied based on total generators bought","X cost scaling is square rooted","Generator multiplier mult gain becomes *1.5","Generators produce other generators faster based on RE amount","Divide Square Root Upgrade costs by 1e6","rtu43 is stronger"],
}