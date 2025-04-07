/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'ALL': '全部',
    'Default': '默认',
    'AUTO': '自动',
    'default': '默认',
    "points": "点数",
    "Reset for +": "重置得到 + ",
    "Currently": "当前",
    "Effect": "效果",
    "Cost": "成本",
    "Goal:": "目标:",
    "Reward": "奖励",
    "Start": "开始",
    "Exit Early": "提前退出",
    "Finish": "完成",
    "Milestone Gotten!": "获得里程碑！",
    "Milestones": "里程碑",
    "Completed": "已完成",
    "Generation": "代数",
    "Hard Reset": "硬重置",
    "Max All Buildings (M": "最大所有建筑物（M",
    "Max All Buildings and X (M": "最大所有建筑物和 X (M",
    "Options": "选项",
    "Production is doubled": "产量翻倍",
    "Quadratic Automator: Reset at": "二次方自动器：重置于",
    "Quadratic Upgrades": "二次方升级",
    "randomtuba - For creating the game and setting up the GitHub link": "randomtuba - 用于创建游戏和设置 GitHub 链接",
    "root essence.": "根精华。",
    "Sacrifice": "牺牲",
    "Square Root": "平方根",
    "Thanks to these people, Algebraic Progression is the way it is.": "感谢这些人，代数级数就是这样。",
    "Unlock Functions": "解锁函数",
    "unpingabot - For helping to fix some bugs (I think": "unpingabot - 帮助修复一些错误（我认为",
    "Upgrades": "升级",
    "Why does the news ticker line break news messages?": "为什么新闻代码行会中断新闻消息？",
    "You have sacrificed": "你牺牲了",
    "Coordinate Plane": "坐标平面",
    "Cosmic47 - For making sure that the game is the best it can be": "Cosmic47 - 确保游戏是最好的",
    "gapples2 - For doing a lot of the work for AP, such as autobuyers, coordinate plane, dark theme, functions, and more": "gapples2 - 用于为 AP 完成大量工作，例如自动购买、坐标平面、深色主题、函数等",
    "Get 1x.": "获得 1 倍。",
    "Get a point factory.": "获得点工厂。",
    "Get a point portal.": "获得一个点门户。",
    "Get an autoclicker.": "获取自动点击器。",
    "Get g(x) to 1.": "使 g(x) 为 1。",
    "Get g(x) to 50.": "将 g(x) 设为 50。",
    "Get h(x) to 1.": "将 h(x) 设为 1。",
    "Get over 9000x.": "获得超过 9000 倍。",
    "Get the first row of quadratic upgrades.": "获得第一行二次升级。",
    "Get the second row of quadratic upgrades.": "获得第二排二次升级。",
    "Get the third row of quadratic upgrades.": "获得第三排二次升级。",
    "Getting Squared": "平方",
    "Go quadratic": "进二次方",
    "Inverse Quadratic": "逆二次",
    "IT'S OVER 9000": "超过9000",
    "Magic?": "魔法？",
    "Reach 10 root essence.": "达到10根精华。",
    "Reach 1e500 points.": "达到 1e500 点。",
    "Reach 50y.": "达到50岁。",
    "Sacrifice x and y.": "牺牲 x 和 y。",
    "Sacrifices to randomtuba": "对 randomtuba 的牺牲",
    "softcapped": "软上限",
    "softcapped) 2: Electric Boogaloo": "软上限) 2: 电动布加洛",
    "The End": "结束",
    "Tripler": "三倍体",
    "Unlock auto quadratic.": "解锁自动二次方。",
    "Unlock functions.": "解锁函数。",
    "Unlock Square Root.": "解锁平方根。",
    "Uprooted": "连根拔起",
    "A few upgrades later": "之后进行了几次升级",
    "A new feature?": "新功能？",
    "Actually Automation": "实际上自动化",
    "Algebra Class": "代数课",
    "Algebraic Progression": "代数级数",
    "Antimatter Dimensions (Hevipelle) - For news ticker code": "反物质维度 (Hevipelle) - 用于新闻股票代码",
    "Auto Quadratic": "自动二次",
    "Automation": "自动化",
    "Boo, DEMEMZEA, and Jayman - For testing the game": "Boo、DEMEMZEA 和 Jayman - 用于测试游戏",
    "But Y?": "但是Y?",
    "Cheater": "骗子",
    "Cost scaling is 1.1x": "成本扩展为 1.1 倍",
    "Credits": "学分",
    "Divide x cost by 2": "将 x 成本除以 2",
    "Doubler": "倍增器",
    "Due to a mathematical error in your formula, points are softcapped beyond 1e500": "由于您的公式中存在数学错误，点数被软上限当超过 1e500",
    "Enter the E": "输入 E",
    "Factory Incremental": "工厂增量",
    "..for now.": "..目前。",
    "'If AP doesn't have triple exponential growth, I'm calling the police' -a human(?), 2021": "“如果 AP 没有三倍指数增长，我就报警了”——人类（？），2021",
    "If you're wondering about new content, there is going to be a 2nd prestige layer eventually added into this game.": "如果您想了解新内容，最终将在此游戏中添加第二个声望层。",
    "Gain x for {{format(xCost())}} points (X": "增益 x 花费 {{format(xCost())}} 点数 (X",
    "Gain y for {{format(yCost(),yCost().lt(1e9)?0:2)}}x (Y": "增益 y 花费 {{format(yCost(),yCost().lt(1e9)?0:2)}}x (Y",
    "X Autobuyer: {{player.autobuyers[1]?'ON':'OFF'}}": "X 自动购买者: {{player.autobuyers[1]?'打开':'关闭'}}",
    "Y Autobuyer: {{player.autobuyers[3]?'ON':'OFF'}}": "Y 自动购买者: {{player.autobuyers[3]?'打开':'关闭'}}",
    "Buy for {{format(costfunc(i))}} points{{hasQuadUpg(5)?' ('+(i+3)+')':''}}": "购买花费 {{format(costfunc(i))}} 点数{{hasQuadUpg(5)?' ('+(i+3)+')':''}}",
    "Max All Buildings, X and Y (M": "最大所有建筑物，X 和 Y（M",
    "when tuba doesn't update his game :flushed": "当 tuba 不更新他的游戏时：flushed",
    "Multiply production by 20.": "将产量乘以 20。",
    "Point Factories are stronger based on total buildings bought (hardcapped at 1e10).": "点数工厂基于购买的总建筑数更强（硬上限为 1e10）。",
    "Quadratic": "二次方",
    "Square f(x).": "平方 f(x)。",
    "Autoclickers are stronger based on total buildings bought (hardcapped at 1e10).": "根据购买的建筑总数（硬上限为 1e10），自动点击器更强大。",
    "Point Portals are stronger based on total buildings bought (hardcapped at 1e10).": "基于购买的建筑总数（硬上限为 1e10），点数传送门更强大。",
    "Purchasing buildings and functions doesn't remove points and max all buys functions.": "购买建筑物和函数不会删除点数并最大化所有购买函数。",
    "Unlock an autobuyer for buildings and unlock function hotkeys (4,5,6).": "解锁建筑物的自动购买器并解锁函数热键 (4,5,6)。",
    "Unlock an autobuyer for x and keep x upgrades on reset.": "为 x 解锁一个自动购买者并在重置时保持 x 升级。",
    "Double x": "双倍 x",
    "gain and unlock an autobuyer for y.": "获得并解锁 y 的自动购买者。",
    "Max All Buildings, Functions and X (M": "最大所有建筑物、函数和 X (M",
    "The g(x) and h(x) softcap starts 25 purchases later.": "g(x) 和 h(x) 软上限在 25 次购买之后开始。",
    "Unlock the coordinate plane and autobuyers go log(x": "解锁坐标平面，自动购买者进入 log(x",
    ", unlock an autobuyer for functions, and you start with 25 points.": "，解锁一个函数自动购买者，你从 25 点开始。",
    "Max All Buildings, Functions, X and Y (M": "最大所有建筑物、函数、X 和 Y (M",
    "Unlock the quadratic automator and make sacrificed y better.": "解锁二次方自动器，让牺牲的 y 变得更好。",
    "Upgrade 1 now multiplies point gain by (x": "升级 1 现在将点数增益乘以 (x",
    "Upgrades 2, 4, and 7 are now extremely softcapped instead of hardcapped.": "升级 2、4 和 7 现在非常软上限，而不是硬刷新。",
    "Double gain of root essence per purchase.": "每次购买可获得双倍根精华。",
    "Enter Square Root.": "进入平方根",
    "Gain more points based on root essence.": "根据根精华获得更多点数。",
    "root essence": "根精华",
    "Triple x": "三倍 x",
    "Unlock a new row of X upgrades.": "解锁新的 X 升级行。",
    "formula.": "公式。",
    "gain.": "增益。",
    "Points now affect the x": "点数现在影响 x",
    "Sacrificed x and y are both slightly more effective.": "牺牲的 x 和 y 都稍微更有效。",
    "to the Coordinate Plane.": "到坐标平面。",
    "The Square Root penalty is now ^0.6 instead of ^0.5.": "平方根惩罚现在是 ^0.6 而不是 ^0.5。",
    "You can now sacrifice x": "你现在可以牺牲 x",
    "Divide X cost by 1 million and multiply point gain by 1,000": "将 X 成本除以 100 万并将点数增益乘以 1,000",
    "Gain 10x more root essence": "获得 10x 的根精华",
    "Point Portals produce Point Factories and Point Factories produce Autoclickers": "点数传送门生产点数工厂，点数工厂生产自动点击器",
    "Raise point gain to (log(x+1)*log(y+1": "将点数增益提高到 (log(x+1)*log(y+1)",
    "Weaken the point softcap.": "削弱点数软上限。",
    "Autobuyers run 4": "自动购买者 运行 4",
    "Current Endgame (will unlock next mechanic in next update!).": "当前残局（将在下一次更新中解锁下一个机制！）。",
    "Gain more points based on Y.": "根据 Y 获得更多点数。",
    "Light": "浅色",
    "Load Upgrades": "加载升级Offline Progress: ",
    ", and": "， 和",
    "A Rift in Space": "空间裂痕",
    "and 1e660 Root Essence to go Complex.": "和 1e660 根本精华去复数。",
    "AP Classic": "AP经典",
    "Auto-Complex: Go Complex when reaching": "自动复数：到达时变得复数",
    "Base QP Generation Formula: (bc": "基本 QP 生成公式：(bc",
    "Basic Complex Upgrades": "基本复数升级",
    "Build a Point Factory.": "建立一个点工厂。",
    "Buy an Autoclicker.": "购买自动点击器。",
    "Buy an upgrade point": "购买升级点",
    "Challenges": "挑战",
    "Click a Challenge to enter it. Click it again to exit/finish.": "点击挑战进入。再次单击它以退出/完成。",
    "Complex": "复数",
    "Complex Plane": "复平面",
    "Complex Upgrades": "复数升级",
    "Discord Link": "Discord链接",
    "Discord server": "Discord服务器",
    "Double RE gain per purchase!": "每次购买双倍 RE 增益！",
    "Endure harder Quadratics and reach the goal to get rewards!": "忍受更难的二次方程并达到目标以获得奖励！",
    "Export as File": "导出为文件",
    "Export Upgrades": "导出升级",
    "gain": "获得",
    "gain per purchase!": "每次购买获得收益！",
    "Game Loaded": "游戏加载",
    "Gameplay": "游戏玩法",
    "General": "常规",
    "i power per second.": "i 能力每秒。",
    "i Tripler": "i 三倍",
    "i, producing": "i、生产",
    "If this is taking too long, consider refreshing or asking about it on the": "如果这花费的时间太长，请考虑刷新或在",
    "If you want to make a mod of this game, that's fine, just credit me in some way.": "如果你想制作这个游戏的模组，那很好，只是以某种方式归功于我。",
    "Instead of adding to your production, Functions multiply your point production.": "函数不会增加您的产量，而是增加您的点产量。",
    "It has been detected that your save is a pre-v2.0 save. Click the button to the right to fix the issues with your save.": "已检测到您的存档是 v2.0 之前的存档。单击右侧的按钮以解决保存问题。",
    "Loading game...": "游戏载入中...",
    "Made by randomtuba": "由 randomtuba 制作",
    "Mass Production": "大量生产",
    "must return a real solution.": "必须返回一个真正的解决方案。",
    "Mystery Value": "神秘价值",
    "Shown": "显示",
    "Note: Earlier versions of the game have bugs that will not be fixed.": "注意：游戏的早期版本存在无法修复的错误。",
    "Note: Going Quadratic or entering Square Root will exit you from your current Challenge.": "注意：进入二次方或输入平方根将使您退出当前的挑战。",
    "Note: Produced Buildings do not reset on Quadratic!": "注意：生产的建筑物不会在二次方上重置！",
    "Once all 12 Complex Upgrades are bought once, a second level of each upgrade is unlocked.": "一旦购买了所有 12 个复数升级，每个升级的第二个级别将被解锁。",
    "Original Rewrite": "原版重写",
    "Quadratic Formula": "二次公式",
    "Respec": "重洗",
    "Root Epicenter": "根震中",
    "Root Essence Doubler": "根精倍增器",
    "Saving": "保存",
    "Summon a Point Portal.": "召唤一个点传送门。",
    "Thank you for contacting customer support. This is Janet, how can I help you?": "感谢您联系客户支持。我是珍妮特，有什么可以帮助你的吗？",
    "Thanks to downvoid, gapples2, and DEMEMZEA for bugfixing and some QoL mechanics.": "感谢 downvoid、gapples2 和 DEMEMZEA 的错误修复和一些 QoL 机制。",
    "To generate Quadratic Power, a, b, and c when plugged into the": "要生成二次幂，a、b 和 c 插入",
    "Triple i gain per purchase!": "每次购买获得三倍收益！",
    "Unlock Functions.": "解锁函数。",
    "Upgrade points are spent on the 12 Complex Upgrades that can be respecced.": "升级点用于可重洗的 12 个复数升级。",
    "Use the 3 buttons above to purchase Upgrade Points with some of your previous currencies.": "使用上面的 3 个按钮用您以前的一些货币购买升级点数。",
    "Visual": "视觉",
    "Fix Save": "修复存档",
    "Game Saved": "游戏已保存",
    "haha number go up": "哈哈，数字增长了",
    "Click the big cookie to get more cookies!": "点击大饼干获取更多饼干！",
    "Here's a guide to the 4 different types of balancing! Jacorbian Balancing: Solid gameplay in earlygame and midgame, but too much strategy in lategame. Aarex Balancing: Solid gameplay in earlygame, but too many AAREX TIMEWALLS in midgame and lategame. Tuba Balancing: Solid gameplay in earlygame and midgame, but inflation and repetition in lategame. Reinhardt Balancing: We don't talk about Reinhardt Balancing.": "这是4种不同类型平衡的指南！ Jacorbian 平衡：早期和中期的游戏玩法稳定，但后期策略太多。 Aarex 平衡：早期游戏稳定，但中期和后期 AAREX TIMEWALLS 太多。 大号平衡：早期和中期的稳定游戏玩法，但后期膨胀和重复。 莱因哈特平衡：我们不谈论莱因哈特平衡。",
    "Integers can sometimes be negative. Let's try to be more positive!": "整数有时可能是负数。 让我们努力变得更加积极！",
    "Don't you dare divide by zero.": "你敢被零除吗。",
    "Everyone thinks the developer is randomtuba, but the real developer is the friends we made along the way.": "每个人都认为开发者是randomtuba，但真正的开发者是我们一路上结识的朋友。",
    "Hey manager, someone just asked to buy 37 watermelons for a picnic...what should we do about this?": "嘿，经理，有人刚要求买37个西瓜去野餐……我们该怎么办？",
    "randomtuba and 3^3=7 (FactorXXX) walk into a bar. randomtuba looks at his watch. \"It's 8 o'clock,\" he says. 3^3=7 orders a drink, walks out of the bar, and heads to their house to go to bed.": "randomtuba 和 3^3=7 (FactorXXX) 走进一家酒吧。 randomtuba 看看他的手表。 “现在是 8 点，”他说。 3^3=7 点了一杯酒，走出酒吧，去他们家睡觉。",
    "The action of adding news tickers is like drugs. It's easy and makes you feel happy when you do it, but you can't do too much of it.": "添加新闻代码的行为就像毒品一样。 这很容易，当你这样做时会让你感到快乐，但你不能做得太多。",
    "too short 1/0": "太短了 1/0",
    "Who was the inventor of fractions? Henry the Eighth.": "谁是分数的发明者？ 亨利八世。",
    "Why are you playing this game? It's just a meaningless number going up with no implications on reality.": "你为什么玩这个游戏？ 这只是一个毫无意义的数字上升，对现实没有任何影响。",
    "You've just been news tickered, send a screenshot of this news ticker to someone else to get un-news tickered": "您刚刚被新闻报道，将此新闻报道的屏幕截图发送给其他人以获得非新闻报道",
    "Hidden": "隐藏",
    "Cool Bug Fact's: You know what you did": "酷Bug事实：你知道你做了什么",
    "Everyone talks about pi, but no one talks about tau...": "每个人都在谈论 pi，但没有人谈论 tau...",
    "Flamemaster": "火焰大师",
    "FIXING NEWS: Please don't break the news again.": "固定新闻：请不要再爆料了。",
    "Wake up.": "醒醒。",
    "when the variable is sus! 😳": "当变量是 sus 时！ 😳",
    "When your game inflates so hard your numbers reach the Small Dropping Ordinal 🤔": "当您的游戏膨胀如此之大时，您的数字会达到小下降序数 🤔",
    "Why is the obtuse angle always sad? Because it is never right.": "为什么钝角总是难过？ 因为它永远不会是对的。",
    "Load": "加载",
    "Locked": "未解锁",
    "Libraries": "图书馆",
    "Minor Testers": "次要测试人员",
    "Minimalist": "极简主义",
    "News Addict": "新闻迷",
    "Not Quite Right": "不太对",
    "Olden Days": "昔日",
    "Oops, looks like the game isn't loading right!": "糟糕，看来游戏没有正确加载！",
    "Polynomials": "多项式",
    "Super Secret": "超级秘密",
    "solution.": "解决方案。",
    "Secret Achievements": "秘密成就",
    "new text animation!": "新的文字动画！",
    "per second.": "每秒。",
    "Permanent Upgrades": "永久升级",
    "Reset the entire game, but keep Secret Achievements and Options.": "重置整个游戏，但保留秘密成就和选项。",
    "Textbook": "课本",
    "Thank you so much for playing!": "非常感谢您的参与！",
    "The J is our lord and savior": "J是我们的主宰和救世主",
    "to unlock)": "以解锁）",
    "to unlock": "以解锁",
    "Unlike regular Challenges, Y-Challenges are": "与常规挑战不同，Y 挑战",
    "Warning: You are beyond endgame. Gameplay may be unbalanced beyond this point.": "警告：你已经超出了残局。 超出这一点，游戏玩法可能会不平衡。",
    "Way Too Much": "方式太多",
    "We regret to inform you that this news message has been (softcapped": "我们很遗憾地通知您，此新闻消息已（软上限",
    "Welcome to the Variable Synthesizer! Here you will be able to craft illegal variables that probably shouldn't exist.": "欢迎使用可变合成器！ 在这里，您将能够制作可能不应该存在的非法变量。",
    "Options: cannot be hidden": "选项：无法隐藏",
    "Reset": "重置",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "SEVERE WEATHER WARNING: Major cubic storm crossing y-axis and travelling towards (2,8)-ville. Ends are approaching negative and positive infinity, respectively. Stay indoors and stay at low elevations. Thank you for your cooperation.": "恶劣天气警告：大型立方风暴穿过 y 轴并向 (2,8)-ville 行进。 两端分别接近负无穷大和正无穷大。 待在室内并待在低海拔地区。 谢谢您的合作。",
    "A famous scientist has recently been fired in disgrace after suggesting a study into the algebra of dividing by zero.": "一位著名的科学家最近在建议对除以零的代数进行研究后被丢脸地解雇了。",
    "BREAKING NEWS: Tuba finally fixed Max All": "突发新闻：Tuba 终于修复了 全部最大",
    "Everyone talks about pi, but no one talks about tau :saddening": "每个人都在谈论 pi，但没有人谈论 tau :saddening",
    "Fun Fact: A main GitHub page for Tuba's incremental games is in the works!": "有趣的事实：Tuba 增量游戏的主要 GitHub 页面正在开发中！",
    "Hey all, Scott here! My thoughts are being broadcasted on a news ticker now! No reason, just felt like it.": "大家好，斯科特在这里！ 我的想法现在正在新闻收报机上播出！ 没有理由，就是觉得。",
    "i am a news ticker, fear me": "我是新闻播报员，害怕我",
    "The action of adding news tickers is like drugs. It's pleasure, but you can't do too much of it.": "添加新闻代码的行为就像毒品一样。 这是一种乐趣，但你不能做太多。",
    "Therapist: 'Z isn't real, it can't hurt you' Z": "治疗师：“Z 不是真的，它不会伤害你”Z",
    "When your game inflates so hard your numbers reach the Small Dropping Ordinal :sus": "当您的游戏膨胀得如此之大时，您的数字达到了 小下降序数 :sus",
    "Say it with me: X, Y, Z, W, A, B, C...": "跟我说：X、Y、Z、W、A、B、C...",
    "Unreal Engine should be renamed to Imaginary Engine": "虚幻引擎应该重命名为虚幻引擎",
    "Want another game to play while you're idling? Check out Tuba's Tree! Game Link: https://randomtuba.github.io/Tubas-Tree/": "想在空闲时玩其他游戏吗？看看大号的树！游戏链接：https://randomtuba.github.io/Tubas-Tree/",
    "Weeee, look at me go!": "Weeee，看着我走！",
    "when the variable is sus! :flushed": "当变量是sus！ ：酡",
    "X marks the spot!": "X 标记位置！",
    "You know what this game needs more of? It needs more protein": "你知道这个游戏更需要什么吗？它需要更多的蛋白质",
    "'hmmm today I will dev AP' -randomtuba, 5 seconds before disaster struck": "“嗯，今天我将开发 AP”-randomtuba，灾难发生前 5 秒",
    "AP Desmos% Speedrun": "AP Desmos% Speedrun",
    "BREAKING NEWS: Algebraic Progression saves leaked across the nation by a professional hacker. Investigation is ongoing.": "突发新闻：代数级数存档被一名专业黑客泄露到全国各地。调查正在进行中。",
    "BREAKING NEWS: Famous celebrity Joe Schmirzstein says 'I can't stop dreaming about complex mathematical functions. I need help.'": "突发新闻：著名名人 Joe Schmirzstein 说：“我无法停止梦想复数数学函数。我需要帮助。'",
    "BREAKING NEWS: Point Portal malfunction caused 15 deaths and 3 injuries. Point Portal manager says 'we will be more careful next time'.": "突发新闻：Point Portal 故障导致 15 人死亡和 3 人受伤。 Point Portal 经理说“我们下次会更加小心”。",
    "BREAKING NEWS: We ran out of ideas": "突发新闻：我们的想法用完了",
    "Calculus do what AP don't": "微积分能做 AP 不能做的事",
    "Don't you dare divide by zero": "你敢除以零吗",
    "imagine not having spaghetti code": "想象一下没有意大利面条代码",
    "Is this a Synergism reference???????": "这是协同作用的参考吗？？？？？？",
    "It's important that the news ticker can't be disabled. The news ticker will never disappear and you will get tired of it faster.": "重要的是不能禁用新闻自动收报机。新闻自动收报机永远不会消失，你会更快厌倦它。",
    "Part 2: Tuba fucks up": "第 2 部分：大号搞砸了",
    "Pi: 'Be real for once' i: 'No, let's be rational here.'": "Pi：“真实一次” i：“不，让我们在这里保持理性。”",
    "BREAKING NEWS: Algebraic Progression saves leaked across the nation by a professional hacker. Investigation is ongoing.": "突发新闻：代数递进 存档被一名专业黑客泄露到全国各地。 调查正在进行中。",
    "imagine not having spaghetti code": "想象一下没有意大利面条代码",
    "BREAKING NEWS: Randomtuba announces removal of the Buy Max button, riots ensue.": "突发新闻：Randomtuba 宣布移除 购买最大 按钮，随后发生骚乱。",
    "Welcome to Algebraic Progression, the game where math becomes fun": "欢迎来到代数递进，让数学变得有趣的游戏",
    "'shit game remove timewalls' -reda": "'狗屎游戏删除时间墙' -reda",
    "Fun Fact: Offline time exists! You'll get a boost to production when you go back online based on how long you spend away from the game.": "有趣的事实：存在离线时间！ 当您根据您离开游戏的时间长短重新上线时，您的生产将得到提升。",
    "Fact: tuba is not a furry": "事实：tuba不是福瑞",
    "'My power grows, Gordon.' -Dr. Coomer, 2020(?": "“我的力量在增长，戈登。” -库默博士，2020（？",
    "You can't kill News Ticker Man, look at me go!": "你不能杀新闻播报员，看着我走！",
    "Here's a homework assignment for you: Prestige for 1 b": "这是给你的家庭作业： 1 b 的声望",
    "Z might be real, but W isn't": "Z 可能是真实的，但 W 不是",
    "Press Alt+F4 to die simultaneously": "按 Alt+F4 同时死亡",
    "Algebraic Progression NGUd^^^++++---- when?": "代数递进 NGUd ^^^ ++++ ---- 什么时候出来？",
    "if i see one more 5 hours joke i will fucking snap": "如果我再看到一个 5 小时的笑话，我TM会生气的",
    "BREAKING NEWS: Obamium discovered in local mine!": "突发新闻：在当地矿井中发现了 Obamium！",
    "Square Root is just Time Dilation but harder, deal with it": "平方根只是时间膨胀，但更难，处理它",
    "BREAKING NEWS: Florida Man rents Point Portal, causes hole in space-time": "突发新闻：佛罗里达男子租用 点数传送门，导致时空出现漏洞",

    //树游戏
    'Loading...': '加载中...',
    'ALWAYS': '一直',
    'HARD RESET': '硬重置',
    'Export to clipboard': '导出到剪切板',
    'INCOMPLETE': '不完整',
    'HIDDEN': '隐藏',
    'AUTOMATION': '自动',
    'NEVER': '从不',
    'ON': '打开',
    'OFF': '关闭',
    'SHOWN': '显示',
    'Play Again': '再次游戏',
    'Keep Going': '继续',
    'The Modding Tree Discord': '模型树Discord',
    'You have': '你有',
    'It took you {{formatTime(player.timePlayed)}} to beat the game.': '花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.',
    'Congratulations! You have reached the end and beaten this game, but for now...': '恭喜你！ 您已经结束并通关了本游戏，但就目前而言...',
    'Main Prestige Tree server': '主声望树服务器',
    'Reach {{formatWhole(ENDGAME)}} to beat the game!': '达到 {{formatWhole(ENDGAME)}} 去通关游戏!',
    "Loading... (If this takes too long it means there was a serious error!": "正在加载...（如果这花费的时间太长，则表示存在严重错误！",
    'Loading... (If this takes too long it means there was a serious error!)←': '正在加载...（如果时间太长，则表示存在严重错误！）←',
    'Main\n\t\t\t\tPrestige Tree server': '主\n\t\t\t\t声望树服务器',
    'The Modding Tree\n\t\t\t\t\t\t\tDiscord': '模型树\n\t\t\t\t\t\t\tDiscord',
    'Please check the Discord to see if there are new content updates!': '请检查 Discord 以查看是否有新的内容更新！',
    'aqua': '水色',
    'AUTOMATION, INCOMPLETE': '自动化，不完整',
    'LAST, AUTO, INCOMPLETE': '最后，自动，不完整',
    'NONE': '无',
    'P: Reset for': 'P: 重置获得',
    'Git游戏': 'Git游戏',
    'QQ群号': 'QQ群号',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": " ",
    " ": " ",
    //树游戏
    "\t\t\t": "\t\t\t",
    "\n\n\t\t": "\n\n\t\t",
    "\n\t\t": "\n\t\t",
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "Current Theme: ": "当前主题：",
    "Autoclickers - ": "自动点击器 - ",
    "Function Autobuyer: ": "函数自动购买者：",
    "Building Autobuyer: ": "建筑自动购买者：",
    "Point Factories - ": "点数工厂 - ",
    "Point Portals - ": "点数传送门 - ",
    "and h(x) = ": "并且 h(x) = ",
    "(multiplying point gain by ": "（乘以点数增益",
    "x (dividing y cost scaling by ": "x（将 y 成本缩放除以 ",
    "You need ": "你需要 ",
    "Offline Progress: ": "离线进度：",
    "Hotkeys: ": "快捷键：",
    "Buy Max ": "购买最大 ",
    "Purchases Left: ": "购买剩余：",
    "Achievement Unlocked: ": "解锁成就：",
    "News Ticker: ": "滚动新闻：",
    "Unlock for ": "解锁需要 ",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": " ",
    " ": " ",
    "\n": "",
    "\n\t\t\t": "\n\t\t\t",
    "\t\t\n\t\t": "\t\t\n\t\t",
    "\t\t\t\t": "\t\t\t\t",
    "\n\t\t": "\n\t\t",
    " quadratic layer needs more parabolas": " 二次层需要更多的抛物线",
    "x faster.": "x 更快.",
    " and x doesn't remove points.": "并且 x 不会删除点数。",
    "% Universe Filled": "% 宇宙已填充",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^\s*$/, //纯空格
    /^([\d\.]+)e(\d+)$/,
    /^购买花费 (.+)$/,
    /^您每秒获得 (.+)$/,
    /^增益 (.+)$/,
    /^数字(.+)$/,
    /^你(.+)$/,
    /^(.+)\(([\d\.,]+)\) = (.+)$/,
    /^([\d\.]+)$/,
    /^([\d\.,]+) ~ (.+)\/s (.+)$/,
    /^([\d\.,]+) \+ (.+) ~ (.+)\/s (.+)$/,
    /^([\d\.]+)s$/,
    /^([\d\.]+)x$/,
    /^x([\d\.]+)$/,
    /^([\d\.,]+)$/,
    /^([\d\.,]+)x$/,
    /^x([\d\.,]+)$/,
    /^\= ([\d\.]+)$/,
    /^\= ([\d\.,]+)$/,
    /^\= ([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^x([\d\.]+)e([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)x$/,
    /^[\u4E00-\u9FA5]+$/
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^([\d\.]+) hours ([\d\.]+) minutes ([\d\.]+) seconds$/, '$1 小时 $2 分钟 $3 秒'],
    [/^You are gaining (.+) elves per second$/, '你每秒获得 $1 精灵'],
    [/^You have played this game for ([\d\.]+) seconds.$/, '您已经玩了 $1 秒。'],
    [/^You have played this game for ([\d\.]+) minutes and ([\d\.]+) seconds.$/, '您已经玩了 $1 分 $2 秒。'],
    [/^You have (.+) points$/, '你有 $1 点数'],
    [/^The fog is coming. (.+). Expansion Rate: (.+) m\/s.$/, '大雾来了。 $1。 膨胀率：$2 米/秒。'],
    [/^You have bought a total of (.+) Buildings.$/, '您总共购买了 $1 建筑。'],
    [/^You have produced (.+) points in total.$/, '你总共产生了 $1 点数。'],
    [/^Number = (.+)$/, '数字 = $1'],
    [/^Go Quadratic for (.+) \(Q$/, '到 $1 的二次方 \(Q'],
    [/^Buy for (.+) points \((.+)$/, '购买花费 $1 点数 \($2'],
    [/^You are getting (.+) points per second$/, '您每秒获得 $1 点数'],
    [/^y \(adding (.+) to g\(x\) and h\(x\) base$/, 'y（在 g\(x\) 和 h\(x\) 基础上加 $1'],
    [/^x \(dividing y cost scaling by (.+)\) and$/, 'x（将 y 成本缩放除以 $1）和'],
    [/^Exit Square Root for (.+) root essence.$/, '退出平方根以获得 $1 根精华。'],
    [/^Exit Square Root for (.+) root essence. \(Q$/, '退出平方根以获得 $1 根精华。\(Q'],
    [/^y \(adding (.+) to g\(x\) and h\(x\) base\), and$/, 'y（将 $1 添加到 g(x) 和 h(x) 基数），以及'],
    [/^(.+) Achievements completed (.+)$/, '$1 成就已完成 $2'],
    [/^Next at (.+) points$/, '下一个在 $1 点数'],
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+)\/sec$/, '$1\/秒'],
	[/^([\d\.,]+) Point$/, '$1 点数'],
	[/^([\d\.,]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+) OOMs\/sec$/, '$1 OOMs\/秒'],
	[/^([\d\.]+)e([\d\.,]+)\/sec$/, '$1e$2\/秒'],
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^([\d\.]+)e([\d\.,]+) points$/, '$1e$2 点数'],
    [/^([\d\.]+) elves$/, '$1 精灵'],
    [/^([\d\.]+)e([\d\.,]+) elves$/, '$1e$2 精灵'],
    [/^([\d\.,]+) Complexes required$/, '$1 配合物要求'],
    [/^([\d\.,]+) elves$/, '$1 精灵'],
    [/^\*(.+) to electricity gain$/, '\*$1 到电力增益'],
    [/^Cost: (.+)x$/, '成本：$1x'],
    [/^Cost: (.+) root essence$/, '成本：$1 根精华'],
    [/^Cost: (.+) points$/, '成本：$1 点数'],
    [/^Req: (.+) \/ (.+) elves$/, '成本：$1 \/ $2 精灵'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);