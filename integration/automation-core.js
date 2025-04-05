function runAutomationCoreScript() {
    player.integration.autocoreTicks++
    let auto = player.integration.automationCore.inputs

    if(player.upgradePoints[0].gte(60) && player.compUpgs[0].length == 0 && auto.loadCompUpgs && player.integration.challenge != 3) {
      for (let i = 1; i < 13; i++) buyCU(0,i)
    }
    if(player.integration.challenge != 4 && player.integration.chalCompletions[4] < 13 && auto.autoCCSweep) {
      if(player.i.gte(auto.startCCSweepReq) && player.compChalCompletions[1] < 5 && player.unlocked == 0) {
        interactWithCC(1)
      }
      if(player.compChallenge == 1 && player.x2.gte("1e24700")) interactWithCC(1)
      if(player.compChalCompletions[1] == 5 && player.compChalCompletions[2] < 5 && player.unlocked == 0) {
        interactWithCC(2)
      }
      if(player.compChallenge == 2 && player.x2.gte("1e18400")) interactWithCC(2)
      if(player.compChalCompletions[2] == 5 && player.compChalCompletions[3] < 5 && player.unlocked == 0) {
        interactWithCC(3)
      }
      if(player.compChallenge == 3 && player.x2.gte("1e11600")) interactWithCC(3)
      if(player.compChalCompletions[3] == 5 && player.compChalCompletions[4] < 5 && player.unlocked == 0) {
        interactWithCC(4)
      }
      if(player.compChallenge == 4 && player.x2.gte("1e92700")) interactWithCC(4)
      if(player.compChalCompletions[4] == 5 && player.compChalCompletions[5] < 5 && player.unlocked == 0) {
        interactWithCC(5)
      }
      if(player.compChallenge == 5 && player.x2.gte("1e8000")) interactWithCC(5)
      if(player.compChalCompletions[5] == 5 && player.compChalCompletions[6] < 5 && player.unlocked == 0) {
        player.compChalCompletions[6] = 5
      }
      if(player.compChalCompletions[6] == 5 && player.compChalCompletions[7] < 5 && player.unlocked == 0) {
        interactWithCC(7)
      }
      if(player.compChallenge == 7 && player.x2.gte("1e318000")) interactWithCC(7)
      if(player.compChalCompletions[7] == 5 && player.compChalCompletions[8] < 5 && player.unlocked == 0) {
        interactWithCC(8)
      }
      if(player.compChallenge == 8 && player.x2.gte("1e195000")) interactWithCC(8)
      if(player.compChalCompletions[8] == 5 && player.compChalCompletions[9] < 5 && player.unlocked == 0) {
        interactWithCC(9)
      }
      if(player.compChallenge == 9 && player.x2.gte("1e570000")) interactWithCC(9)
      if(player.compChalCompletions[9] == 5 && player.compChalCompletions[10] < 5 && player.unlocked == 0) {
        interactWithCC(10)
      }
      if(player.compChallenge == 10 && player.x2.gte("1e79000")) interactWithCC(10)
    }
    if(auto.enterSynthDiv) {
      if(player.i.gte(auto.synthDivIReq1) && player.synthEssence.lt(auto.synthDivSEReq1) && !player.inSynthDiv) enterSynthDiv()
      if(player.i.gte(auto.synthDivIReq2) && player.synthEssence.lt(auto.synthDivSEReq2) && !player.inSynthDiv) enterSynthDiv()
      if(player.inSynthDiv && player.points.gte("1e100000") && player.synthEssence.lt(auto.synthDivSEReq2)) enterSynthDiv()
    }
    if(player.unlocked != 0 && player.compChallenge == 0) {
      interactWithCC(player.unlocked)
    }
    if(player.i.gte(auto.grindQuadraticsReq) && player.bankedQuadratics.lt(1) && auto.grindQuadratics) goQuadratic(false)
  }