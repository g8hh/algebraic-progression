const Alterations = {
  1: {
    title: "1 w",
    desc: "Unlock autobuyers for Y-Polynomials, all secondary Unit Circle effects are active at once, and Quadrant 3's effects to Trigonometric Functions are modified. Multiply Pythagorean Essence generation by 100.",
    requirement: 1,
  },
  2: {
    title: "2 w",
    desc: "Unlock Hypercomplex Upgrades, the ability to create Parabolas (found in the Quadratic tab), and autobuyers for W, Singularity Upgrades, and the Unit Circle upgraders. j and k will also begin generating. Singularity Upgrades no longer consume holes.",
    requirement: 2,
  },
  3: {
    title: "47 w",
    desc: "Complex Challenges can be completed up to 6 times, and keep Complex Challenges on Integration.",
    requirement: 47,
  },
  4: {
    title: "100 w",
    desc: "Unlock y²z² in the Variable Synthesizer, which are used to charge Quadratic Upgrades, and automatically gain Limit Score.",
    requirement: 100,
  },
  5: {
    title: "230 w",
    desc: "Unlock 3 new Synthetic Division Upgrades and 2 new Y-Challenges, and the new Synthetic Division Upgrades and Y-Challenges are kept on Integration.",
    requirement: 230,
  },
  6: {
    title: "300 w",
    desc: "Unlock Quaternion Sets and passively generate holes.",
    requirement: 300,
  },
  has(x) {
    return player.w.gte(Alterations[x].requirement) && !player.inLostIntegration
  },
}