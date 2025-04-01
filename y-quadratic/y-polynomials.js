const YPolynomials = {
  powerEffect() {
    return Decimal.add(1,player.yPolyPower.add(1).log10().pow(0.75).div(500)).min(1.58)
  },
  costs(x) {
    switch (x) {
      case 3:
        return new Decimal("1e140000").mul(Decimal.pow("1e2000",player.yPolynomials[x].bought.pow(2)))
      break;
      case 4:
        return new Decimal(3).mul(Decimal.pow(8,player.yPolynomials[x].bought))
      break;
      case 5:
        return new Decimal(5).mul(Decimal.pow(24,player.yPolynomials[x].bought))
      break;
      case 6:
        return new Decimal(5).mul(Decimal.pow(96,player.yPolynomials[x].bought))
      break;
      case 7:
        return new Decimal(5).mul(Decimal.pow(420,player.yPolynomials[x].bought))
      break;
      case 8:
        return new Decimal(6).mul(Decimal.pow(6144,player.yPolynomials[x].bought))
      break;
      case 9:
        return new Decimal(7).mul(Decimal.pow(78125,player.yPolynomials[x].bought))
      break;
      case 10:
        return new Decimal(9).mul(Decimal.pow(1e10,player.yPolynomials[x].bought))
      break;
    }
  },
  buy(x) {
    if(x == 3 ? player.y2.gte(YPolynomials.costs(x)) : player.yPolynomials[x-1].amount.gte(YPolynomials.costs(x))){
      if(x == 3) {
        player.y2 = player.y2.sub(YPolynomials.costs(x))
      } else {
        player.yPolynomials[x-1].amount = player.yPolynomials[x-1].amount.sub(YPolynomials.costs(x))
      }
      player.yPolynomials[x].bought = player.yPolynomials[x].bought.add(1)
      player.yPolynomials[x].amount = player.yPolynomials[x].amount.add(1)
    }
  },
  gen(x) {
    let gain = YPolynomials.efficiency(x)
    gain = gain.mul(player.yPolynomials[x].amount)
    if(BasicHypercompUpgrades.has(8)) gain = gain.mul(TemporalPlane.totalEffect())
    return gain
  },
  efficiency(x) {
    let gain = Decimal.pow(2,player.yPolynomials[x].bought)
    if(gain.gt(1e9)) gain = gain.div(1e9).pow(0.5).mul(1e9) 
    gain = gain.mul(IntegrationChallenges[4].eff())
    return gain
  },
}