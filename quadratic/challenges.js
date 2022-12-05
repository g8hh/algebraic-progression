const CHALLENGES = {
  1: {
    title: "Building Maintenance",
    desc: "Autoclickers, Point Factories, and g(x) are useless.",
    goal: new Decimal(1e170),
    effect() {return new Decimal(1.0005).pow(player.buyables[1].add(player.buyables[2]).add(player.buyables[3])).pow(QP_BUYABLES[3].eff()).min(player.hasCompletedLevel4?"1e850":"1e800")},
    rewardDesc: "Buildings produce more based on total Buildings bought this Quadratic.",
  },
  2: {
    title: "Generation Slowdown",
    desc: "There's an exponent on point production that increases linearly from 0 to 1 in 30 seconds. If you buy a Building or Function, the exponent resets to 0.",
    goal: new Decimal("1e365"),
    rewardDesc: "Square f(x) again, and unlock a new row of Quadratic Upgrades.",
  },
  3: {
    title: "(scaled)",
    desc: "Buildings and Functions scale 3 times faster. Produced buildings do nothing.",
    goal: new Decimal(1e290),
    rewardDesc: "Building cost scaling is 1.075x, Function cost scaling is divided by 1.25, and the g(x) and h(x) softcaps start 25 purchases later.",
  },
  4: {
    title: "Time Dilation",
    desc: "Point gain is raised to the 0.75th.",
    goal: new Decimal(1e200),
    rewardDesc: "Points are now raised ^1.03.",
  },
  5: {
    title: "Weighted Xs",
    desc: "X Upgrades are useless (that also means Functions, Produced Buildings, and Y-Intercept do nothing), and every time you buy an X, production is divided by about 1.016 (5^0.01).",
    goal: new Decimal("1e660"),
    rewardDesc: "Divide the X cost by 1e9, and unlock 4 new Square Root upgrades.",
  },
  6: {
    title: "Hyperinflation",
    desc: "Every time you buy a Function, all Functions increase one cost step. Your Function Autobuyers are disabled.",
    goal: new Decimal("1e8000"),
    rewardDesc: "Double the g(x) and h(x) bases.",
  },
  7: {
    title: "Atheism",
    desc: "Sacrificed X, sacrificed Y, and slope do nothing.",
    goal: new Decimal("1e390"),
    rewardDesc: "Addition to the slope effect exponent from Y-Intercept is multiplied by 1.1.",
  },
  8: {
    title: "Primed Production",
    desc: "Buildings only produce points if the number of total Buildings and Functions is prime.",
    goal: new Decimal("1e1970"),
    rewardDesc: "Divide the Y cost by 5.",
  },
  9: {
    title: "Diminishing Returns",
    desc: "Production gets slower over time.",
    goal: new Decimal("1e310"),
    effect() {return new Decimal(player.prestigeTimes[0]).pow(10).max(1).pow(hasChallenge(10)?QP_BUYABLES[3].eff():1).pow(hasCU(0,4)?COMP_UPGRADES[4].eff():1)},
    rewardDesc: "Gain more points based on time in this Quadratic.",
  },
  10: {
    title: "Minimum Space",
    desc: "You have 75 purchases. A purchase is lost when you buy anything in the Generation tab. Produced buildings do nothing. All pre-Quadratic automation is disabled.",
    goal: new Decimal("1e2500"),
    rewardDesc: "The 3rd Quadratic Power buyable affects the C9 effect, and the Challenge Essence gain softcap starts at 1.00e10.",
  },
}

function startChallenge(x) {
  if(player.challenge == x){
    if(player.points.gte(CHALLENGES[x].goal) && !hasChallenge(x)) player.chalCompletions.push(x)
    goQuadratic(true)
  }else{
    goQuadratic(true)
    player.challenge = x
  }
}

function hasChallenge(x) {
  return player.chalCompletions.includes(x)
}

const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num > 1;
}