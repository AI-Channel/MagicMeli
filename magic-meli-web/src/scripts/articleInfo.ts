import { ref, type Ref } from 'vue'
import { Union } from './libs'

interface ArticleItem {
  id: number
  name: string
  title: string
  brief?: string
  content?: Ref<string>
  tags?: Ref<Set<string>>
}
const ArticleList: ArticleItem[] = [
  {
    id: 0,
    name: 'never fade away',
    title: 'Never Fade Away',
    brief: "Jonny Silverhand's adventure",
    content: ref(
      '![301631420735.jpg](https://s2.loli.net/2024/03/29/TXkzqQ1SjgsHmd7.jpg)\n\n嘿，那边的！那个摇滚小子！”其中一个混混向他大喊：“今晚的演出真不错！唱得真棒！”强尼心不在焉地挥了挥手。是啊，今天的这场演出是很棒，即使在强尼的印象里也没几场演出能赶得上今天——但是演出已经结束了，喊再多安可也没用。\n\n那几个混混向强尼走过来，其中一个摇晃着酒瓶。不知哪里来的强光穿透了玻璃，泛着黄光的龙舌兰酒液胡乱撞击着酒瓶内壁，有几滴从瓶口溅了出来。“你！强尼·银手！”那个个子比较小的，脸上纹着非洲部落纹身的混混说，“往这边来！再来场这么棒的演出怎么样？让我们大伙再开心开心！”看着那几个混混走得越来越近，强尼用自己的肉手把女友奥特护在身侧。“嘿，溜冰的，”他注意到他们的神情和语气看似另有所图，于是说道，“你们的建议很棒，但是刚才那场演唱持续太久了。我现在真的没兴趣、也没体力再来一回了。明晚我再来表演怎么样？”这时，混混们已经与强尼几乎贴在一起了。强尼把那把瓦尔特9毫米手枪从枪套里抽出并握在手里。也许不会有事，他想。\n\n“好呀！明晚再来！”混混中的大个子刚刚热情地说完“来”字，三个混混就突然对强尼发起进攻。他们出手速度太快，只看得到残影挥动。强尼果断开枪，瓦尔特手枪在这个小巷的一角中爆出轰鸣，喷射而出的子弹撞击到墙壁上——可惜，射偏了，谁也没打中。小个子混混举起有道金属划痕的手——那是由反射着寒光的剃刀组成的拳头伪装成的一只手。然后，伴随着一阵剧痛，强尼被打飞了。混凝土上溅满了他的鲜血，剧烈的冲击折断了他好几块骨头。他的眼睛暗淡无神地望着天空，眼里不见丝毫神采。他女友奥特惊恐的尖叫很快消失在黑暗中。8秒内，一切归于沉寂。\n\n不久，强尼恢复了知觉。他感觉好像有些玻璃碎片在他的肠子里搅动。天空中，赤红色的云层遮蔽了冰冷的蓝色霓虹。他挪动了一下身躯，感觉地面黏糊糊的。\n\n那是他的血。\n\n一只猫从垃圾桶上跳下来，绕着强尼的身体小心翼翼地爬行着。这只猫可不是笨蛋，在这场冲突它毫发无伤。强尼看着它，它的小巧眼睛仿佛是对红色LED灯，不带丝毫亲近，咕噜咕噜地转动着。得瑟的家伙，强尼这么想着，然后闭上了他的双眼。\n\n在他的眼皮下，虹膜上红色的数字信号显示着他生命剩下的时间。他的各项生命指征正在不断降低。汽车低鸣，开过这肮脏的，被雨水打湿的街道。远处，一辆创伤急救队^[一般情况下，他们只救助他们的客户]的救护车呼啸着驶来，不过不是来救他的。他的意识越来越模糊。\n\n强尼双目失神地看着头顶上空黑暗平坦的有星星点缀其中的穹顶。就在这座城市上空，热闪电微光与城市粉色灯光的光晕交相辉映。一架垂直起降（VTOL）机飞过他的头顶，巨大的螺旋桨鞭笞着夜晚。强尼下意识尝试着去触碰这架飞机，他伸出手，义手在这天空中画出清晰轮廓。这只华丽的高级义手向他闪烁着冰冷的银色光泽。他将那只标志性的金属手紧握成拳，机械的手指关节依次发出咔咔的声响。强尼把这只手塞进肚子开裂的伤口里，疼得喘不过气。可能是强大的意志力支撑着，他得以站了起来，蹒跚着走到小巷口。满是愤懑的脸靠在冰冷潮湿的砖墙上，强尼下定了决心：他绝不会在那些混混被他杀掉前死去！他撑不住了，合上眼睛，无力的身躯倒向了向眼前高速川流、划出残影的车流。\n\n然而，有什么东西止住了强尼倒下。一双手牢牢地抓住了他，把他搀扶起来。强尼用他最后的力气睁开双眼，一张瘦瘦的，留着胡子的脸正专注地看着他。“我的天，”这张脸说话了，“他们居然把你打成这样!\n\n强尼来不及回应，他的世界再度陷入了一片漆黑。\n\n'
    ),
    tags: ref(new Set(['test0', 'test1', 'test2']))
  },
  {
    id: 1,
    name: 'being popular',
    title: 'Being Popular',
    brief:
      '作者 Paul Graham 不但是硅谷的【技术大牛】，还是硅谷的【创业教父】。对许多问题（软件开发、企业管理、创业、艺术...），他都有独到见解。他的代表作是《黑客与画家》（俺的网盘上有电子版）。本文就出自此书，洋文标题是：《Being Popular》。文中描绘了作者心目中理想的编程语言，供大伙儿参考。虽然这篇是2001年发表，距今超过10年。但是，好的文章是不会随时间流逝而贬值滴。',
    content: ref(
      "我的朋友曾对一位著名的操作系统专家说他想要设计一种真正优秀的编程语言。那位专家回答，这是浪费时间，优秀的语言不一定会被市场接受，很可能无人使用，因为语言的流行不取决于它本身。至少，那位专家设计的语言就遭遇到了这种情况。\n\n那么，语言的流行到底取决于什么因素呢？流行的语言是否真的值得流行呢？还有必要尝试设计一种更好的语言吗？如果有必要的话，怎样才能做到这一点呢？\n\n为了找到这些问题的答案，我想我们可以观察黑客，了解他们使用什么语言。编程语言本来就是为了满足黑客的需要而产生的，当且仅当黑客喜欢一种语言时，这种语言才能成为合格的编程语言，而不是被当做“指称语义”（denotational semantics）或者编译器设计。\n\n## 流行的秘诀\n\n没错，大多数人选择某一种编程语言，不是因为这种语言有什么独特的特点，而是因为听说其他人使用这种语言。但是我认为，外界因素对于编程语言的流行其实并没有想象中那么大的影响力。我倒是觉得，问题出在对于什么是优秀编程语言，黑客的看法与大多数的语言设计者不一样。\n\n黑客的看法其实比语言设计者的更重要。编程语言不是数学定理，而是一种工具，为了便于使用，它们才被设计出来。所以，设计编程语言的时候必须考虑到人类的长处和短处，就像设计鞋子的时候必须符合人类的脚型。如果鞋子穿上去不舒服，无论它的外形多么优美，多么像一件艺术品，你也只能把它当做一双坏鞋。\n\n大多数程序员也许无法分辨语言的好坏。但是，这不代表优秀的编程语言会被埋没，专家级黑客一眼就能认出它们，并且会拿来使用。虽然他们人数很少，但就是这样一小群人写出了人类所有的优秀软件。他们有着巨大的影响力，他们使用什么语言，其他程序员往往就会跟着使用。老实说，很多时候这种影响力更像是一种命令，对于其他程序员来说，专家级黑客就像自己的老板或导师，他们说哪种语言好用，自己就会乖乖地跟进。\n\n专家级黑客的看法不是决定一种语言流行程度的唯一因素，某些古老的软件（Fortran 和 Cobol 的情况）和==铺天盖地==的广告宣传（Ada 和 Java 的情况）也会起到作用。但是，我认为从长期来看，专家级黑客的看法是最重要的因素。只要有了达到“临界数量”（critical mass）的最初用户和足够长的时间，一种语言就可能会达到应有的流行程度。而流行本身又会使得这种优秀的语言更加优秀，进一步拉大它与平庸语言之间的好坏差异，因为使用者的反馈总是会导致语言的改进。你可以想一下，所有流行的编程语言从诞生至今的变化有多大。Perl 和 Fortran 是极端的例子，但是甚至就连Lisp都发生了很大的变化。\n\n所以，即使不考虑语言本身的优秀是否能带动流行，我想单单流行本身就肯定会使得这种语言变得更好，只有流行才会让它保持优秀。编程语言的最高境界一直在发展之中。虽然语言的核心功能就像大海的深处，很少有变化，但是函数库和开发环境之类的东西就像大海的表面，一直在汹涌澎湃。\n\n当然，黑客必须先知道这种语言，才可能去用它。他们怎么才能知道呢？就是从其他黑客那里。所以不管怎样，一开始必须有一群黑客使用这种语言，然后其他人才会知道它。我不知道“一群”的最小数量是多少，多少个黑客才算达到“临界数量”呢？如果让我猜，我会说20人。如果一种语言有20个独立用户，就意味着有20个人是自主决定使用这种语言的，我觉得这就说明这种语言真的有优点。\n\n达到这一步并非易事。如果说用户数从0到20比从20到1000更困难，我也不会感到惊讶。发展最早的20个用户的最好方法可能就是使用特洛伊木马：你让人们使用一种他们需要的应用程序，这个程序碰巧就是用某种新语言开发的。\n\n## 外部因素\n\n我们得先承认，确实有一个外部因素会影响到语言的流行。一种语言必须是某一个流行的计算机系统的脚本语言（scripting language），才会变得流行。Fortran 和 Cobol 是早期 IBM 大型机的脚本语言。C 是 Unix 的脚本语言，后来的 Perl 和 Python 也是如此。Tcl 是 Tk 的脚本语言，Visual Basic 是 Windows 的脚本语言,（某种形式的）Lisp 是 Emacs 的脚本语言，PHP 是网络服务器的脚本语言，Java 和 JavaScript 是浏览器的脚本语言。\n\n编程语言不是存在于真空之中。“编程”其实是及物动词，黑客一般都是为某个系统编程，在现实中，编程语言总是与它们依附的系统联系在一起的。所以，如果你想设计一种流行的编程语言，就不能只是单纯地设计语言本身，还必须为它找到一个依附的系统，而这个系统也必须流行。除非你只想用自己设计的语言取代那个系统现有的脚本语言。\n\n这种情况导致的一个结果就是，无法以一种语言本身的优缺点评判这种语言。另一个结果则是，只有当一种语言是某个系统的脚本语言时，它才能真正成为编程语言。如果你对此很吃惊，觉得不公平，那么我会跟你说不必大惊小怪。这就好比大家都认为，如果一种编程语言只有语法规则，没有一个好的实现（implementation），那么它就不能算完整的编程语言。这些都是很正常很合理的事情，编程语言本来就该如此。\n\n当然，编程语言本来就需要一个好的实现，而且这个实现必须是免费的。商业公司愿意出钱购买软件，但是黑客作为个人不会愿意这样做，而你想让一种语言成功，恰恰就是需要吸引黑客。\n\n编程语言还需要有一本介绍它的书。这本书应该不厚，文笔流畅，而且包含大量优秀的范例。布赖恩·柯尼汉和丹尼斯·里奇合写的《C 程序设计语言》（C Programming Language）就是这方面的典范。眼下，我大概还能再加一句，这一类书籍之中必须有一本由 O'Reilly 公司出版发行。这正在变成是否能吸引黑客的前提条件了。\n\n编程语言还应该有在线文档。事实上，在线文档可以当做一本书来写，但是目前它还无法取代实体书。实体书并没有过时，它们读起来很方便，而且出版社对书籍内容的审核是一种很有用的质量保证机制（虽然做得很不完美）。书店则是程序员发现和学习新语言的最重要的场所之一。\n\n## 简洁\n\n假定你的语言已经能够满足上面三项条件——一种免费的实现，一本相关书籍，以及语言所依附的计算机系统——那么还需要做什么才能使得黑客喜欢上你的语言？\n\n黑客欣赏的一个特点就是简洁。黑客都是懒人，他们同数学家和现代主义建筑师一样，痛恨任何冗余的东西或事情。有一个笑话说，黑客动手写程序之前，至少会在心里盘算一下哪种语言的打字工作量最小，然后就选择使用该语言。这个笑话其实与真实情况相差无几。就算这真的是个笑话，语言的设计者也必须把它当真，按照它的要求设计语言。\n\n简洁性最重要的方面就是要使得语言更抽象。为了达到这一点，首先你设计的必须是高级语言，然后把它设计得越抽象越好。语言设计者应该总是看着代码，问自己能不能使用更少的语法单位把它表达出来。如果你有办法让许多不同的程序都能更简短地表达出来，那么这很可能意味着你发现了一种很有用的新抽象方法。\n\n不要觉得为用户着想就是让他们使用像英语一样又长又啰唆的语法。这是不正确的做法，Cobol 就是因为这个毛病而声名狼藉。\n\n如果你让黑客像下面这样求和：\n\n`add x to y giving z`\n\n而不是写成：\n\n`z = x + y`\n\n那么你就是在侮辱黑客的智商，或者自己作孽了。\n\n简洁性是静态类型语言的力所不及之处。不考虑其他因素时，没人愿意在程序的头部写上一大堆的声明语句。只要计算机可以自己推断出来的事情，都应该让计算机自己去推断。举例来说，“hello world”本应该是一个很简单的程序，但是在 Java 语言中却要写上一大堆东西，这本身就差不多可以说明 Java 语言设计得有问题了。\n\n单个的语法单位也应该很简短。Perl 和 Common Lisp 在这方面是两个不同的极端。Perl 的语法单位很短，导致它的代码可以拥挤得让人无法理解，而 Common Lisp 内置运算符的名称则长得可笑。Common Lisp 的设计者们可能觉得文本编辑器会帮助用户自动填写运算符的长名称。但是这样做的代价不仅是增加了打字的工作量，还包括提高了阅读代码的难度，以及占用了更多的显示器空间。\n\n## 可编程性（Hackability）\n\n对黑客来说，选择编程语言的时候，还有一个因素比简洁更重要，那就是这种语言必须能够帮助自己做到想做的事。在编程语言的历史上，防止程序员做出“错误”举动的措施多得惊人。这是语言设计者很自以为是的危险举动，他们怎么知道程序员该做什么不该做什么？我认为，语言设计者应该假定他们的目标用户是一个天才，会做出各种他们无法预知的举动，而不是假定目标用户是一个笨手笨脚的傻瓜，需要别人的保护才不会伤到自己。如果用户真的是傻瓜，不管你怎么保护他，他还是会搬起石头砸自己的脚。你也许能够阻止他引用另一个模块中的变量，但是你没法防止他日日夜夜不知疲倦地写出结构混乱的程序去解决完全错误的问题。\n\n优秀程序员经常想做一些既危险又令人恼火的事情。所谓“令人恼火”，我指的是他们会突破设计者提供给用户的外部语义层，试着控制某些高级抽象的语言内部接口。比如，黑客喜欢破解，而破解就意味着深入内部，揣测原始设计者的意图。\n\n你应该敞开胸怀，欢迎这种揣测。对于制造工具的人来说，总是会有用户以违背你本意的方式使用你的工具。如果你制造的是编程语言这样高度组合的系统，那就更是如此了。许多黑客会用你做梦也想不到的方式改动你的语法模型。我的建议就是，让他们这样干吧，而且应该为他们创造便利，尽可能多地把语言的内部暴露在他们面前。\n\n其实，黑客并不会彻底颠覆你的工具，在一个大型程序中，他可能只是对语言改造一两个地方。但是，改动多少地方并不重要，重要的是他能够对语言进行改动。这可能不仅有助于解决一些特殊的问题，还会让黑客觉得很好玩。黑客改造语言的乐趣就好比外科医生摆弄病人内脏的乐趣，或者青少年喜欢用手挤破青春痘的那种感觉。至少对男生来说，某些类型的破坏非常刺激。针对青年男性读者的 Maxim 杂志每年出版一本特辑，里面一半是美女照片，另一半是各种严重事故的现场照片。这本杂志非常清楚它的读者想看什么。\n\n一种真正优秀的编程语言应该既整洁又混乱。“整洁”的意思是设计得很清楚， 内核由数量不多的运算符构成，这些运算符易于理解，每一个都有很完整的独立用途。“混乱”的意思是它允许黑客以自己的方式使用。C 语言就是这样的例子，早期的 Lisp 语言也是如此。真正的黑客语言总是稍微带一点放纵不羁、不服管教的个性。\n\n优秀的编程语言所具备的功能，应该会使得言必称“软件工程”的人感到非常不满、频频摇头。与黑客语言形成鲜明对照的就是像 Pascal 那样的语言，它是井然有序的模范，非常适合教学，但是除此之外就没有很大用处了。\n\n## 一次性程序\n\n为了吸引黑客，一种编程语言必须善于完成黑客想要完成的各种任务。这意味着它必须很适合开发一次性程序。这一点可能出乎很多人的意料。\n\n所谓一次性程序，就是指为了完成某些很简单的临时性任务而在很短时间内写出来的程序。比如，自动完成某些系统管理任务的程序，或者（为了某项模拟任务）自动生成测试数据的程序，以及在不同格式之间转化数据的程序等。令人吃惊的是，一次性程序往往不是真的只用一次，就像二战期间很多美国大学造的一大批临时建筑后来都成了永久建筑。许多一次性程序后来也都变成了正式的程序，具备了正式的功能和外部用户。\n\n我有一种预感，最优秀的那些大型程序就是这样发展起来的，而不是像胡佛水坝那样从一开始就作为大型工程来设计。一下子从无到有做出一个大项目是一件很恐怖的事。当人们接手一个巨型项目时，很容易被它搞得一蹶不振。最后，要么是项目陷入僵局，要么是做出来一个规模小、性能差的东西。你想造一片闹市，却只做出一家商场；你想建一个罗马，却只造出一个巴西利亚；你想发明 C 语言，却只开发出 Ada。\n\n开发大型程序的另一个方法就是从一次性程序开始，然后不断地改进。这种方法比较不会让人望而生畏，程序在不断的开发之中逐渐进步。一般来说，使用这种方法开发程序，一开始用什么编程语言，就会一直用到最后，因为除非有外部政治因素的干预，程序员很少会中途更换编程语言。所以，我们就有了一个看似矛盾的结论：如果你想设计一种适合开发大型项目的编程语言，就必须使得这种语言也适合开发一次性程序，因为大型项目就是从一次性程序演变而来的。\n\nPerl 就是一个鲜明的例子。它不仅仅设计成适合开发一次性程序，而且它本身就很像一次性程序。最初的 Perl 只是好几个生成表格的工具收集在一起而已。后来程序员用它写一次性程序，当那些程序逐渐发展壮大后，Perl 才随之发展成了一种正式的编程语言。到了 Perl 5，这种语言才适合开发重要的程序，但是在此之前它已经广为流行了。\n\n什么样的语言适合写一次性程序？首先，它必须很容易装备。一次性程序是你只想在一小时内写出来的程序，所以它不应该耗费很多时间安装和配置，最好已经安装在你的电脑上了。它必须是想用就用的。C 语言可以想用就用，因为它是操作系统的一部分；Perl 可以想用就用，因为它本来就是一种系统管理工具，操作系统已经默认安装它了。\n\n很容易装备不仅仅指很容易安装或者已经安装，还指很容易与使用者互动。一种有命令行界面、可以实时反馈的语言就具有互动性，那些必须先编译后使用的语言就不具备互动性。受欢迎的编程语言应该是前者，具有良好的互动性，可以快速得到运行结果。\n\n一次性程序的另一个特点就是简洁。对黑客来说，这一点永远有吸引力。如果考虑到你最多只打算在这个程序上耗费一个小时，这一点就更重要了。"
    ),
    tags: ref(new Set(['test0', 'test1']))
  },
  {
    id: 2,
    name: 'scp 3999',
    title: 'SCP 3999',
    content: ref(
      "# SCP-3999\n---\n:::center\n*Let us go then, you and I\nWhen the Eleven-Day Empire eats the sky\nLike a humanoid melting like clams upon the breakfast table.*\n:::\n**Item #:** SCP-3999\n\n**Object Class:** Apollyon\n\n**Special Containment Procedures:** SCP-3999 cannot be contained at the present moment, and currently poses a ZK Class End-of-reality scenario. The most advisable course of action is for Researcher Talloran, believed to be the focal point of SCP-3999, to remove himself from contact with all Foundation sites and personnel to avoid further collateral damage to Foundation property. It is theorized that if Researcher Talloran is contained in an extremely secluded area, then the destructive capabilities of SCP-3999 will temporarily ~~cease~~\n\n~~stop~~\n\n~~be contained~~\n\n~~preserve some remnants~~\n\n…\n\nThe most advisable course of action is for Researcher Talloran, believed to be the focal point of SCP-3999, to remove himself from contact with all human populations to avoid further collateral damage to the Earth and its societies. It is theorized that if Researcher Talloran is to ~~terminate himself quickly in a secluded region, then SCP-3999 will be decommissioned.~~\n\nResearcher Talloran ~~cannot leave the Foundation.~~\n\nThe most advisable course of action is for Researcher Talloran, believed to be the focal point of SCP-3999, to remove himself from contact with all animal life to avoid further collateral damage to the Earth and its biodiversity. It is theorized that if Researcher Talloran is to ~~live out the rest of his life in a small shack, isolated from all animal life and as much plant life as possible.~~\n\nResearch is currently continuing as to how to negate the effects of SCP-3999. Current proposals include ~~launching it into the sun.~~\n\nResearcher Talloran's family is to be summarily executed one by one. The process is to be carried out by trained agents selected from a variety of Mobile Task Forces including MTF Omega-8, MTF Lambda-12, MTF Psi-7, MTF Tau-5, and MTF Iota-10. These agents are to be re-trained in military tactics and Special Weapons and Tactics maneuvers. Agents assigned are to score above 30 on the Hare Psychopathy Checklist.\n\nAgents assigned are to execute Researcher Talloran's mother first, followed by his father. Any animals present in the building are to be terminated. They are then to proceed to the location of Researcher Talloran's sister, currently a student at Penn State University. She is to be executed followed by any of her roommates currently present in the building. Termination is to occur via a single shot to the forehead via a Remington 700 Sniper rifle fired at close range and equipped with a silencer. ~~The corpses are then to be nailed to the wall outside Researcher Talloran's office and lit on fire after being doused with exactly 10 L of gasoline. Researcher Talloran is to be restrained and made to kneel in front of the corpses~~\n\nSCP-3999 is to be classified as a\n\nResearcher Talloran's colleagues are to be summarily executed one by one. The process is to be carried out by trained agents selected from a variety of containment specialists. Site cafeteria workers are to slip arsenic into the meals of all staff who have had any contact with Researcher Talloran, ~~up to and including members of the O5 Council~~\n\nA representation of SCP-3999 is to be placed on a pedestal made of pure granite and modeled in the Ionic style. This pedestal is to be placed directly in the center in a 5m x 5m square concrete containment chamber. The vault is to be protected by ~~no fewer than two (2) armed guards trained in the resistance and containment of infohazards at any given time.~~\n\n~~SCP-3999 cannot be contained.~~\n\nSCP-3999, alongside Researcher Talloran, are to be delivered to the Serpent's Hand as a gift. ~~All Serpent's Hand operatives are to be informed that SCP-3999 is a Fifthist artifact of great importance. Researcher Talloran is to be injected with Class-C amnestic and given the cover story that he is Brian Fredrick Bondiskey, a high ranking Fifthist leader. All Serpent's Hand operatives are to be informed that SCP-3999 and Researcher Talloran are not to be separated under any circumstances.~~\n\nSCP-3999 is to be contained with [SCP-2432](https://scp-wiki.wikidot.com/scp-2432). The result of this containment procedure has resulted in a dimensional anomaly opening up within SCP-2432 in the form of a 3m x 25cm x 25cm crawlspace. It is designated SCP-2432-1, leading through the wall in a corner of SCP-2432. It is normally obscured by the television stand. When this crawlspace is accessed, it leads to a space identical to SCP-2432 in layout, decor and anomalous effects. The next room down from SCP-2432 lacks the exit of this crawlspace and although similar in layout, is not a perfect duplicate of SCP-2432, as the egress of SCP-2432-1 is. Curtains in this duplicate room open onto the wall; there are no windows.\n\nSCP-2432-1’s interior is constructed of normal steel plates as found in the A██████ Hotel’s ventilation system and is the only break in the para-aramid weave. High concentrations of iron and nickel consistent with those found in a Type III iron meteorite were found in two plates at each end. Graffiti of fractal patterns were also found on these endplates, drawn in permanent marker ink.\n\nThe door of the identical SCP-2432 at the end of SCP-2432-1 leads, not to the true hallway of the A██████ Hotel, as SCP-2432’s door does, but into an alternate reality (designated SCP-2432-Prime). Upon initial observation SCP-2432-Prime resembles the hallway of the A██████ Hotel, with similar wallpaper, light fixtures, carpet and decor but is noted to lack a terminus at either end, appearing to extend endlessly. It is currently theorized that based on the measurements of the dimensions of SCP-2432-Prime and the duplicate SCP-2432 it is of infinite length. There is a slight curve to the walls of SCP-2432-Prime, and it has been theorized to be in a ‘ring’ structure, but current research cannot conclusively prove if SCP-2432-Prime is in a toroid shape. Each door of SCP-2432-Prime is labeled “Room 710” and leads into what appear to be identical duplicates of SCP-2432. However, approximately █% of duplicate rooms observed lack the metallic para-aramid weave and █% of these lack the memetic effects documented in SCP-2432. SCP-2432-Prime also contains a number of occasional rooms that have other apparent functions, including restaurants, conference rooms, gyms, swimming pools, janitorial closets, and elevator lobbies. These differ in design from their equivalents within the A██████ Hotel.\n\nSCP-2432-Prime plays host to a small range of anomalous species and organisms, some thought to be native to SCP-2432-Prime. These are designated SCP-2432-Prime-A1–A8.\n\nList of animal species observed within SCP-2432-Prime\n\n~~When SCP-3999 was removed from SCP-2432, SCP-2432-1 promptly vanished. All further testing forbidden by O5-█.~~\n\nResearcher Talloran ~~is to be forcibly removed from SCP-3999~~\n\nResearcher Talloran ~~is to be kept with SCP-3999 at all times~~\n\nResearcher Talloran ~~is to be terminated~~\n\nResearcher Talloran ~~is to kept alive by all means necessary~~\n\nResearcher Talloran ~~is to be placed inside SCP-3999~~\n\nResearcher Talloran ~~is to be placed as far away from SCP-3999 as possible, while still maintaining connection~~\n\nResearcher Talloran ~~is not to be killed and placed inside SCP-3999~~\n\nResearcher Talloran ~~is not SCP-3999~~\n\nResearcher Talloran is deeply connected with SCP-3999^[see Studies of SCP-3999 and its Relationship with Researcher Talloran, Michaels, J.D. and Karlsson, A.V. (20█), Foundation Science Publishers, for more information.]\n\n"
    ),
    tags: ref(new Set(['test0', 'markdown']))
  },
  {
    id: 3,
    name: 'markdown editor',
    title: 'Markdon Editor',
    tags: ref(new Set(['test0', 'markdown']))
  }
]
function GetArticleList() {
  return ArticleList
}
function GetArticleContent(name: string, id?: number) {
  for (const item of ArticleList) {
    if (item.name === name || item.id === id) {
      return item.content?.value
    }
  }
  return ''
}
function GetAllTags() {
  const tagSet: Ref<Set<string>> = ref(new Set())
  for (const item of ArticleList) {
    if (typeof item.tags != 'undefined') {
      tagSet.value = Union(tagSet.value, item.tags.value)
    }
  }
  return tagSet
}

export { GetArticleList, GetArticleContent, GetAllTags }
