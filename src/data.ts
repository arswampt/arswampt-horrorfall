/**
 * Horror Icon Personality Quiz Data
 * 13 Classic American Horror Icons & 20 Situational PG-13 Questions
 */

export interface HorrorCharacter {
  id: string;
  name: string;
  movie: string;
  year: string;
  archetype: string;
  weapon: string;
  dramaticIntro: string;
  summary: string;
  reasons: [string, string, string];
  survivalOdds: number; // 1 to 10
  survivalQuote: string;
  quote: string;
  image: string;
  traits: {
    stealth: number; // 0-100
    chaos: number;   // 0-100
    patience: number;// 0-100
    humor: number;   // 0-100
  };
}

export interface QuizOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  points: Partial<Record<string, number>>;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: QuizOption[];
}

export const CHARACTERS: Record<string, HorrorCharacter> = {
  freddy: {
    id: 'freddy',
    name: 'Freddy Krueger',
    movie: 'A Nightmare on Elm Street',
    year: '1984',
    archetype: 'The Theatrical Dream Demon',
    weapon: 'Custom Bladed Glove & Razor Wit',
    dramaticIntro: 'You don’t just defeat your rivals; you turn their insomnia into your personal comedy club.',
    summary: 'Loud, wildly theatrical, and fiercely charismatic. You relish the spotlight, hold creative grudges, and always ensure you get the absolute last quip in any confrontation.',
    reasons: [
      'Your comeback game is razor-sharp and delivered with unhinged flair.',
      'You thrive in psychological games and love getting inside people’s heads.',
      'You would rather invent a spectacular spectacle than simply walk away.'
    ],
    survivalOdds: 4,
    survivalQuote: '4/10 — You were busy delivering a theatrical punchline when someone pulled you out of dreamland.',
    quote: 'Welcome to prime time, buster!',
    image: '/images/freddy.jpg',
    traits: { stealth: 45, chaos: 92, patience: 30, humor: 96 }
  },
  jason: {
    id: 'jason',
    name: 'Jason Voorhees',
    movie: 'Friday the 13th',
    year: '1980',
    archetype: 'The Relentless Outdoor Enforcer',
    weapon: 'Heavy Machete & Unmatched Endurance',
    dramaticIntro: 'Unstoppable, silent, and fiercely devoted to family values and strict curfew enforcement.',
    summary: 'A person of zero words and maximum momentum. You hate loud parties, disrespectful campers, and unnecessary drama. When you set your mind to a chore, you finish it—no matter how many obstacles stand in your way.',
    reasons: [
      'You are fiercely loyal to your family and will protect them at all costs.',
      'You prefer the peace of a quiet lakeside cabin over social small talk.',
      'When you start a goal, absolutely nothing on Earth will stop you.'
    ],
    survivalOdds: 9,
    survivalQuote: '9/10 — People keep dropping weapons to run, but you never break a steady walking stride.',
    quote: '*Heavier than usual breathing in the misty woods*',
    image: '/images/jason.jpeg',
    traits: { stealth: 60, chaos: 35, patience: 88, humor: 10 }
  },
  michael: {
    id: 'michael',
    name: 'Michael Myers',
    movie: 'Halloween',
    year: '1978',
    archetype: 'The Stoic Stalker',
    weapon: 'Kitchen Knife & Terrifying Patience',
    dramaticIntro: 'The ultimate minimalist: emotionless, calculating, and patient enough to stare at a front yard for four straight hours.',
    summary: 'You embody chilling calm and unwavering discipline. You never hurry, never explain yourself, and never show off. Your silent presence commands the entire room without you ever saying a syllable.',
    reasons: [
      'You possess extraordinary patience and never act on pure impulse.',
      'You prefer observing from the shadows before making any calculated move.',
      'Your poker face is legendary; nobody can guess what you are thinking.'
    ],
    survivalOdds: 9,
    survivalQuote: '9/10 — You survived because you simply walked away while everyone else tripped over roots.',
    quote: '...',
    image: '/images/michael.jpeg',
    traits: { stealth: 95, chaos: 20, patience: 99, humor: 5 }
  },
  leatherface: {
    id: 'leatherface',
    name: 'Leatherface',
    movie: 'The Texas Chain Saw Massacre',
    year: '1974',
    archetype: 'The Anxious Craftsman',
    weapon: 'Revving Chainsaw & Heavy Mallet',
    dramaticIntro: 'Deep down, you are just an easily stressed artisan who gets overwhelmed when strangers show up uninvited.',
    summary: 'You are misunderstood, emotionally sensitive, and devoted to family traditions. You just want everyone to eat dinner together in peace, but unexpected chaos sends your anxiety through the roof.',
    reasons: [
      'You take pride in hands-on craftsmanship and heavy-duty home improvement tools.',
      'You love home-cooked family dinners more than any fancy dining experience.',
      'Unexpected visitors who don’t respect your boundaries trigger instant panic.'
    ],
    survivalOdds: 6,
    survivalQuote: '6/10 — You threw a tantrum because someone messed up your workshop order, but your cardio is unmatched.',
    quote: '*Frantic revving noises and frustrated stomping*',
    image: '/images/leatherface.jpeg',
    traits: { stealth: 20, chaos: 85, patience: 40, humor: 25 }
  },
  ghostface: {
    id: 'ghostface',
    name: 'Ghostface',
    movie: 'Scream',
    year: '1996',
    archetype: 'The Pop-Culture Meta Sleuth',
    weapon: 'Buck Hunting Knife & Burner Flip Phone',
    dramaticIntro: 'Obsessed with cinema trivia, witty banter, and orchestrating convoluted revenge plots with your bestie.',
    summary: 'You are hyper-verbal, meta-aware, and constantly analyzing the cliches around you. You trip over coffee tables when trying to look cool, but your passion for theatrical phone calls makes up for it.',
    reasons: [
      'You know every horror trope and will loudly critique everyone’s bad decisions.',
      'You love late-night phone conversations that keep people guessing.',
      'You function best in a dynamic two-person brainstorming team.'
    ],
    survivalOdds: 5,
    survivalQuote: '5/10 — You tripped over a living room rug while dramatically asking someone about their favorite scary movie.',
    quote: 'What’s your favorite scary movie?',
    image: '/images/ghostface.jpeg',
    traits: { stealth: 55, chaos: 78, patience: 45, humor: 88 }
  },
  chucky: {
    id: 'chucky',
    name: 'Chucky',
    movie: 'Child’s Play',
    year: '1988',
    archetype: 'The Pint-Sized Chaos Goblin',
    weapon: 'Voodoo Dagger & Bitter Profanity',
    dramaticIntro: 'You might look harmless on the shelf, but you possess the spite of a thousand thunderbolts.',
    summary: 'Feisty, sarcastic, and completely unapologetic. People constantly underestimate you because of your casual demeanor, right until you flip the entire game board upside down in protest.',
    reasons: [
      'You refuse to let anyone talk down to you or treat you like a novelty.',
      'Your sarcastic comeback vocabulary is dangerously well-stocked.',
      'You bounce back from every setback with twice as much reckless energy.'
    ],
    survivalOdds: 7,
    survivalQuote: '7/10 — Someone tried to kick you into a furnace, but you hitched a ride in their Amazon return box.',
    quote: 'Hi, I’m Chucky, wanna play?',
    image: '/images/chucky.jpeg',
    traits: { stealth: 70, chaos: 95, patience: 25, humor: 92 }
  },
  pennywise: {
    id: 'pennywise',
    name: 'Pennywise the Dancing Clown',
    movie: 'IT',
    year: '1990 / 2017',
    archetype: 'The Cosmic Showman',
    weapon: 'Shapeshifting & Crimson Balloons',
    dramaticIntro: 'Theatrical, ancient, and feeding on pure melodrama, you make even the storm drain look like Broadway.',
    summary: 'You are an absolute drama monarch who feeds off attention, mystery, and flair. You never take the direct route when a dazzling, surreal presentation could achieve the exact same effect.',
    reasons: [
      'You treat life like an immersive psychological stage production.',
      'You intuitively sense what makes people tick (and what keeps them awake).',
      'You love eccentric vintage aesthetics, carnivals, and dramatic entrances.'
    ],
    survivalOdds: 8,
    survivalQuote: '8/10 — You were winning until a group of loud teenagers made fun of your stage makeup.',
    quote: 'We all float down here. You’ll float, too!',
    image: '/images/pennywise.jpeg',
    traits: { stealth: 50, chaos: 90, patience: 75, humor: 80 }
  },
  pinhead: {
    id: 'pinhead',
    name: 'Pinhead',
    movie: 'Hellraiser',
    year: '1987',
    archetype: 'The Dark Philosopher',
    weapon: 'Lament Configuration & Hooked Chains',
    dramaticIntro: 'Articulate, refined, and hopelessly obsessed with intricate puzzles and cosmic sensations.',
    summary: 'You speak in eloquent verse and hold high aesthetic standards. You find shallow drama distasteful and only invest your attention in complex, multidimensional challenges that test human limits.',
    reasons: [
      'You have an elite appreciation for difficult puzzles and cryptic mysteries.',
      'You speak with formal cadence and refuse to stoop to vulgar shouting.',
      'You understand that true transformation requires enduring intense discomfort.'
    ],
    survivalOdds: 8,
    survivalQuote: '8/10 — Nobody could beat you in an argument, but someone solved your Rubik’s cube in reverse.',
    quote: 'We have such sights to show you!',
    image: '/images/pinhead.jpeg',
    traits: { stealth: 65, chaos: 40, patience: 95, humor: 20 }
  },
  jigsaw: {
    id: 'jigsaw',
    name: 'Jigsaw / John Kramer',
    movie: 'Saw',
    year: '2004',
    archetype: 'The Meticulous Moralist',
    weapon: 'Tape Recorders & Rube Goldberg Traps',
    dramaticIntro: 'You have zero patience for ungrateful people who waste their potential, and you have built a 12-step test to prove it.',
    summary: 'A compulsive architect of life lessons. You despise ingratitude and inefficiency. You never break the rules yourself; instead, you build intricate systems where people face the consequences of their own choices.',
    reasons: [
      'You believe in accountability and holding people strictly to their word.',
      'You plan every contingency three months in advance on color-coded blueprints.',
      'You are fascinated by how people behave when a literal timer is ticking down.'
    ],
    survivalOdds: 7,
    survivalQuote: '7/10 — Your contingency plan had seven contingency plans, but someone forgot to wind the cassette tape.',
    quote: 'I want to play a game.',
    image: '/images/jigsaw.jpeg',
    traits: { stealth: 80, chaos: 30, patience: 98, humor: 15 }
  },
  norman: {
    id: 'norman',
    name: 'Norman Bates',
    movie: 'Psycho',
    year: '1960',
    archetype: 'The Dutiful Hospitality Host',
    weapon: 'Chef Knife & Severe Family Pressure',
    dramaticIntro: 'Polite, soft-spoken, and running the front desk with a heavy psychological inheritance.',
    summary: 'You present an impeccably polite, gentle exterior to the world. You are hospitable and accommodating to a fault, but you carry heavy family expectations and an intense, brewing storm just under the surface.',
    reasons: [
      'You are extremely courteous and attentive to visitors and guests.',
      'You carry an intense, complicated loyalty to your family roots.',
      'You internalize stress until it manifests in wildly unexpected ways.'
    ],
    survivalOdds: 6,
    survivalQuote: '6/10 — You were doing fine until you let family opinions dictate your entire evening schedule.',
    quote: 'A boy’s best friend is his mother.',
    image: '/images/norman.jpeg',
    traits: { stealth: 85, chaos: 50, patience: 80, humor: 30 }
  },
  candyman: {
    id: 'candyman',
    name: 'Candyman',
    movie: 'Candyman',
    year: '1992',
    archetype: 'The Tragic Urban Legend',
    weapon: 'Polished Hook & Swarm of Bees',
    dramaticIntro: 'A poetic, commanding figure who turns rumors into immortal myth through sheer gravitas.',
    summary: 'Soulful, artistic, and deeply conscious of legacy. You don’t chase after people; you wait for them to utter your name with reverence. When you enter a room, your magnetic resonance silences all chatter.',
    reasons: [
      'You possess deep appreciation for art, architecture, and enduring folklore.',
      'You refuse to be forgotten and hold people to their promises.',
      'Your presence is majestic, calm, and steeped in poetic melancholy.'
    ],
    survivalOdds: 8,
    survivalQuote: '8/10 — You demanded respect in the bathroom mirror and delivered a speech worthy of Shakespeare.',
    quote: 'Be my victim.',
    image: '/images/candyman.jpeg',
    traits: { stealth: 75, chaos: 45, patience: 90, humor: 25 }
  },
  carrie: {
    id: 'carrie',
    name: 'Carrie White',
    movie: 'Carrie',
    year: '1976',
    archetype: 'The Telekinetic Tipping Point',
    weapon: 'Raw Mind Power & Closed Doors',
    dramaticIntro: 'Quiet, observant, and deeply sensitive—until pushed one millimeter too far.',
    summary: 'You endure quiet slights with incredible grace, hoping for simple kindness and belonging. But underneath the quiet exterior lies raw, volcanic potential that will lock the gym doors and level the building if provoked.',
    reasons: [
      'You are gentle, empathetic, and sensitive to cruelty around you.',
      'You have hidden talents and depths that surprise people who overlook you.',
      'When your boundaries are finally violated, your response is absolute and total.'
    ],
    survivalOdds: 7,
    survivalQuote: '7/10 — You just wanted to dance to one slow song, but now the entire high school is without power.',
    quote: 'They’re all going to laugh at you.',
    image: '/images/carrie.jpeg',
    traits: { stealth: 65, chaos: 85, patience: 70, humor: 20 }
  },
  samara: {
    id: 'samara',
    name: 'Samara Morgan',
    movie: 'The Ring',
    year: '2002',
    archetype: 'The Relentless Media Phantom',
    weapon: 'Static Distortion & 7-Day Countdown',
    dramaticIntro: 'Tech-savvy, relentless, and refusing to rest until your tape is forwarded to the next contact.',
    summary: 'The ultimate viral communicator. You love strict deadlines (7 days exactly) and you never ever sleep. You crawl through modern media barriers to ensure your voice is heard, rain or shine.',
    reasons: [
      'You are persistent beyond belief; nobody can leave you on "read".',
      'You love vintage physical media, static ambiance, and damp moody weather.',
      'You never stop working until your message has reached its intended target.'
    ],
    survivalOdds: 8,
    survivalQuote: '8/10 — You climbed out of a 4K OLED screen just to remind someone their warranty expired.',
    quote: 'Seven days.',
    image: '/images/samara.jpeg',
    traits: { stealth: 80, chaos: 70, patience: 85, humor: 35 }
  }
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'CRISIS RESPONSE',
    question: 'A sudden blackout plunges a crowded house party into pitch darkness. What is your immediate reaction?',
    options: [
      {
        id: 'A',
        text: 'Crack an inappropriate joke in the dark to see who laughs nervously.',
        points: { freddy: 3, chucky: 2, ghostface: 1 }
      },
      {
        id: 'B',
        text: 'Quietly stand completely still by the wall, listening to everyone scramble.',
        points: { michael: 3, jason: 2, samara: 1 }
      },
      {
        id: 'C',
        text: 'Immediately head to the basement breaker box with heavy tools.',
        points: { leatherface: 3, jigsaw: 2, jason: 1 }
      },
      {
        id: 'D',
        text: 'Whisper a cryptic warning about what happens when lights go out.',
        points: { pinhead: 3, candyman: 2, pennywise: 1 }
      }
    ]
  },
  {
    id: 2,
    category: 'SOCIAL STYLE',
    question: 'How do you handle group chats when drama starts brewing?',
    options: [
      {
        id: 'A',
        text: 'Send a meme, drop unhinged popcorn reactions, and stir the pot.',
        points: { chucky: 3, freddy: 2, ghostface: 1 }
      },
      {
        id: 'B',
        text: 'Quote horror movie quotes or call someone on private caller ID.',
        points: { ghostface: 3, samara: 2, pennywise: 1 }
      },
      {
        id: 'C',
        text: 'Read every single message in absolute silence. Never type a word.',
        points: { michael: 3, jason: 2, norman: 1 }
      },
      {
        id: 'D',
        text: 'Leave the group chat immediately to protect your inner peace.',
        points: { carrie: 3, norman: 2, candyman: 1 }
      }
    ]
  },
  {
    id: 3,
    category: 'HANDLING CONFLICT',
    question: 'Someone cuts in front of you in a 40-minute line at the DMV. What do you do?',
    options: [
      {
        id: 'A',
        text: 'Devise a complex mental lesson where they learn the true value of civic order.',
        points: { jigsaw: 3, pinhead: 2, candyman: 1 }
      },
      {
        id: 'B',
        text: 'Glare at the back of their head with enough psychic heat to pop a lightbulb.',
        points: { carrie: 3, michael: 2, samara: 1 }
      },
      {
        id: 'C',
        text: 'Loudly roast their outfit so the entire room turns to look at them.',
        points: { freddy: 3, chucky: 2, ghostface: 1 }
      },
      {
        id: 'D',
        text: 'Tap them firmly on the shoulder and offer a chilling, wordless stare.',
        points: { jason: 3, leatherface: 2, michael: 1 }
      }
    ]
  },
  {
    id: 4,
    category: 'IDEAL WEEKEND',
    question: 'You have a completely free weekend with zero obligations. Where are you?',
    options: [
      {
        id: 'A',
        text: 'Deep in the remote forest chopping firewood and checking on property boundaries.',
        points: { jason: 3, leatherface: 2, michael: 1 }
      },
      {
        id: 'B',
        text: 'Hosting a vintage horror film marathon and debating directing tropes with friends.',
        points: { ghostface: 3, norman: 2, pennywise: 1 }
      },
      {
        id: 'C',
        text: 'Arranging vintage curios, solving intricate mechanical puzzles, and meditating in dim light.',
        points: { pinhead: 3, jigsaw: 2, candyman: 1 }
      },
      {
        id: 'D',
        text: 'Sleeping 14 hours straight and having wild, hyper-vivid, lucid dreams.',
        points: { freddy: 3, samara: 2, pennywise: 1 }
      }
    ]
  },
  {
    id: 5,
    category: 'HANDLING BETRAYAL',
    question: 'A close colleague or peer takes credit for your huge project at work/school. Your move?',
    options: [
      {
        id: 'A',
        text: 'Wait for the big company-wide meeting to unleash absolute karmic retribution.',
        points: { carrie: 3, jigsaw: 2, candyman: 1 }
      },
      {
        id: 'B',
        text: 'Infiltrate their computer and replace their presentation with an eerie looping video.',
        points: { samara: 3, ghostface: 2, chucky: 1 }
      },
      {
        id: 'C',
        text: 'Smile politely to their face, but let your secret second persona draft the complaint.',
        points: { norman: 3, pinhead: 2, michael: 1 }
      },
      {
        id: 'D',
        text: 'Publicly mock their inability to produce original thought with biting satire.',
        points: { freddy: 3, chucky: 3, pennywise: 1 }
      }
    ]
  },
  {
    id: 6,
    category: 'PLANNING VS CHAOS',
    question: 'You are organizing a road trip with four people. What is your planning methodology?',
    options: [
      {
        id: 'A',
        text: 'A minute-by-minute color-coded binder with mandatory checklists and emergency drills.',
        points: { jigsaw: 3, pinhead: 2, norman: 1 }
      },
      {
        id: 'B',
        text: 'Zero plan. Throw a duffel bag in the trunk, hit the gas, and embrace pure mayhem.',
        points: { chucky: 3, leatherface: 2, pennywise: 2 }
      },
      {
        id: 'C',
        text: 'I just drive the vehicle. I do not talk to passengers, and I make no rest stops.',
        points: { michael: 3, jason: 3, leatherface: 1 }
      },
      {
        id: 'D',
        text: 'I scout spooky abandoned locations and plan hilarious pranks for the motels.',
        points: { ghostface: 3, freddy: 2, pennywise: 2 }
      }
    ]
  },
  {
    id: 7,
    category: 'FEAR & DREAD',
    question: 'What psychological fear hits closest to home for you?',
    options: [
      {
        id: 'A',
        text: 'Being completely forgotten or erased from people’s memory.',
        points: { candyman: 3, samara: 2, carrie: 2 }
      },
      {
        id: 'B',
        text: 'Being trapped in a dull, predictable, mundane routine with zero excitement.',
        points: { pennywise: 3, freddy: 2, pinhead: 2 }
      },
      {
        id: 'C',
        text: 'Disappointing an authority figure or letting down my strict family expectations.',
        points: { norman: 3, leatherface: 2, jason: 2 }
      },
      {
        id: 'D',
        text: 'People wasting their gifts and lives without ever learning accountability.',
        points: { jigsaw: 3, pinhead: 2, michael: 1 }
      }
    ]
  },
  {
    id: 8,
    category: 'HORROR MOVIE ROLE',
    question: 'If you were cast in an 80s horror flick, which role would you naturally fall into?',
    options: [
      {
        id: 'A',
        text: 'The skeptical cinephile who points out the killer’s exact rulebook before dying.',
        points: { ghostface: 3, freddy: 2, chucky: 1 }
      },
      {
        id: 'B',
        text: 'The quiet groundskeeper who knows every secret path through the misty woods.',
        points: { jason: 3, michael: 2, leatherface: 1 }
      },
      {
        id: 'C',
        text: 'The quiet student in the back row who suddenly turns the entire climax upside down.',
        points: { carrie: 3, samara: 2, norman: 1 }
      },
      {
        id: 'D',
        text: 'The mysterious antique shop owner who hands you a puzzle box and says "Beware".',
        points: { pinhead: 3, candyman: 2, jigsaw: 1 }
      }
    ]
  },
  {
    id: 9,
    category: 'AESTHETIC & WARDROBE',
    question: 'Pick your ultimate iconic signature garment or accessory:',
    options: [
      {
        id: 'A',
        text: 'A clean tailored trench coat with a shearling collar and a polished silver hook.',
        points: { candyman: 3, pinhead: 2, norman: 1 }
      },
      {
        id: 'B',
        text: 'A striped knit sweater, beaten fedora, and razor-sharp finger extensions.',
        points: { freddy: 3, pennywise: 2, chucky: 1 }
      },
      {
        id: 'C',
        text: 'A vintage boiler suit paired with an emotionless white rubber mask.',
        points: { michael: 3, jason: 2, leatherface: 1 }
      },
      {
        id: 'D',
        text: 'Colorful overalls and bright red sneakers that look harmless until closer inspection.',
        points: { chucky: 3, leatherface: 2, ghostface: 1 }
      }
    ]
  },
  {
    id: 10,
    category: 'HUMOR STYLE',
    question: 'How would your best friends describe your brand of comedy?',
    options: [
      {
        id: 'A',
        text: 'Cruel, theatrical puns delivered with cackling energy right at the punchline.',
        points: { freddy: 3, chucky: 2, pennywise: 1 }
      },
      {
        id: 'B',
        text: 'Dry, absurd meta-humor referencing niche pop culture and self-deprecation.',
        points: { ghostface: 3, norman: 1, samara: 1 }
      },
      {
        id: 'C',
        text: 'High-concept dark philosophical irony that makes people question their existence.',
        points: { pinhead: 3, jigsaw: 2, candyman: 1 }
      },
      {
        id: 'D',
        text: 'What humor? I have never laughed at a joke in my entire life.',
        points: { michael: 3, jason: 3, carrie: 1 }
      }
    ]
  },
  {
    id: 11,
    category: 'PET PEEVES',
    question: 'Which of these minor daily annoyances infuriates you the most?',
    options: [
      {
        id: 'A',
        text: 'People complaining about their comfortable lives while contributing nothing.',
        points: { jigsaw: 3, pinhead: 2, candyman: 1 }
      },
      {
        id: 'B',
        text: 'Rowdy people blasting music in natural peaceful camping spots.',
        points: { jason: 3, michael: 2, leatherface: 1 }
      },
      {
        id: 'C',
        text: 'Mean-spirited bullies who pick on timid, quiet individuals.',
        points: { carrie: 3, norman: 2, samara: 2 }
      },
      {
        id: 'D',
        text: 'People who talk down to me or treat me like I am small and helpless.',
        points: { chucky: 3, freddy: 2, leatherface: 1 }
      }
    ]
  },
  {
    id: 12,
    category: 'COMMUNICATION MEDIUM',
    question: 'What is your preferred method for delivering an important personal message?',
    options: [
      {
        id: 'A',
        text: 'An analog landline phone call with voice modulation and eerie film trivia.',
        points: { ghostface: 3, freddy: 1, jigsaw: 1 }
      },
      {
        id: 'B',
        text: 'A micro-cassette tape recorder left in an inconspicuous brown envelope.',
        points: { jigsaw: 3, pinhead: 1, samara: 2 }
      },
      {
        id: 'C',
        text: 'Appearing directly in bathroom mirror fog when someone whispers your name five times.',
        points: { candyman: 3, samara: 2, pennywise: 1 }
      },
      {
        id: 'D',
        text: 'No message. My presence across the front lawn is all the message required.',
        points: { michael: 3, jason: 3, leatherface: 1 }
      }
    ]
  },
  {
    id: 13,
    category: 'FOOD & DINING',
    question: 'You are hosting an evening dinner. What’s on the menu and dining table?',
    options: [
      {
        id: 'A',
        text: 'Slow-smoked barbecue ribs prepared with authentic secret family recipes.',
        points: { leatherface: 3, norman: 2, jason: 1 }
      },
      {
        id: 'B',
        text: 'Cotton candy, caramel popcorn, and bright red balloons for every guest.',
        points: { pennywise: 3, chucky: 2, freddy: 1 }
      },
      {
        id: 'C',
        text: 'A meticulously prepared home-cooked bird roast with tea served in fine china.',
        points: { norman: 3, pinhead: 2, candyman: 1 }
      },
      {
        id: 'D',
        text: 'Dinner is canceled. Instead, guests must solve a moral puzzle to unlock the pantry.',
        points: { jigsaw: 3, pinhead: 3, samara: 1 }
      }
    ]
  },
  {
    id: 14,
    category: 'PROBLEM SOLVING',
    question: 'A stuck rusted bolt refuses to turn on your kitchen sink. How do you solve it?',
    options: [
      {
        id: 'A',
        text: 'Bring in a gasoline-powered power tool that shakes the floorboards.',
        points: { leatherface: 3, jason: 2, chucky: 1 }
      },
      {
        id: 'B',
        text: 'Stare at it with intense concentration until metal fatigue does the job.',
        points: { carrie: 3, samara: 2, michael: 1 }
      },
      {
        id: 'C',
        text: 'Engineer a custom counterweight pulley system using everyday workshop scraps.',
        points: { jigsaw: 3, pinhead: 2, norman: 1 }
      },
      {
        id: 'D',
        text: 'Whack it with a heavy wrench while cursing loudly at the plumbing company.',
        points: { chucky: 3, freddy: 2, ghostface: 1 }
      }
    ]
  },
  {
    id: 15,
    category: 'FAMILY VALUES',
    question: 'How do you describe your family dynamics and home life?',
    options: [
      {
        id: 'A',
        text: 'Devoted completely to Mom’s guidance and honoring her legacy forever.',
        points: { jason: 3, norman: 3, carrie: 1 }
      },
      {
        id: 'B',
        text: 'Chaotic, loud, slightly eccentric, but we always stick together at dinner.',
        points: { leatherface: 3, chucky: 2, carrie: 1 }
      },
      {
        id: 'C',
        text: 'I broke away from home early to build my own legendary dark empire.',
        points: { freddy: 2, candyman: 3, pinhead: 2 }
      },
      {
        id: 'D',
        text: 'Family is whoever shares my obsession with rules, discipline, and order.',
        points: { jigsaw: 3, ghostface: 2, michael: 1 }
      }
    ]
  },
  {
    id: 16,
    category: 'THEATRICAL FLAIR',
    question: 'How do you make an entrance at a high-stakes party or gathering?',
    options: [
      {
        id: 'A',
        text: 'Float down from the ceiling or emerge from a sea of balloons with a dramatic grin.',
        points: { pennywise: 3, freddy: 2, candyman: 1 }
      },
      {
        id: 'B',
        text: 'Step out from a deep shadow, backlit by red spotlights and eerie mist.',
        points: { candyman: 3, pinhead: 2, michael: 1 }
      },
      {
        id: 'C',
        text: 'Burst through the double doors wearing a striking outfit and tripping over a cable.',
        points: { ghostface: 3, chucky: 2, carrie: 1 }
      },
      {
        id: 'D',
        text: 'I was already standing in the corner before the first guest even arrived.',
        points: { michael: 3, jason: 2, norman: 2 }
      }
    ]
  },
  {
    id: 17,
    category: 'TECH SAVVINESS',
    question: 'What is your relationship with modern screens and social media?',
    options: [
      {
        id: 'A',
        text: 'I crawl directly through the digital matrix—screens are just doorways for my message.',
        points: { samara: 3, ghostface: 2, freddy: 1 }
      },
      {
        id: 'B',
        text: 'I strictly use vintage analog gear: cassette tapes, CRT televisions, and landlines.',
        points: { jigsaw: 2, norman: 2, ghostface: 2 }
      },
      {
        id: 'C',
        text: 'Technology is a distraction from raw physical instinct and natural wilderness.',
        points: { jason: 3, leatherface: 2, michael: 2 }
      },
      {
        id: 'D',
        text: 'I use online forums solely to bait strangers into hilarious arguments.',
        points: { chucky: 3, freddy: 3, pennywise: 1 }
      }
    ]
  },
  {
    id: 18,
    category: 'UNDER PRESSURE',
    question: 'You’re taking a high-stakes test and only have 2 minutes left with 10 questions to go. What happens?',
    options: [
      {
        id: 'A',
        text: 'Pure hyper-focus kicks in. My telekinetic focus eliminates all ambient distraction.',
        points: { carrie: 3, jigsaw: 2, pinhead: 1 }
      },
      {
        id: 'B',
        text: 'Write hilarious fake answers for the remaining questions to entertain the grader.',
        points: { freddy: 3, chucky: 2, ghostface: 1 }
      },
      {
        id: 'C',
        text: 'Pencil in identical answers down the line without changing my heartbeat.',
        points: { michael: 3, jason: 2, samara: 1 }
      },
      {
        id: 'D',
        text: 'Quietly hyperventilate while remembering Mom’s stern voice in the back of my mind.',
        points: { norman: 3, leatherface: 2, carrie: 1 }
      }
    ]
  },
  {
    id: 19,
    category: 'VILLAIN PHILOSOPHY',
    question: 'What drives your deepest, most authentic ambitions in life?',
    options: [
      {
        id: 'A',
        text: 'Teaching people to truly cherish their lives before their time runs out.',
        points: { jigsaw: 3, pinhead: 2, candyman: 1 }
      },
      {
        id: 'B',
        text: 'To be remembered forever as a legendary figure whose name commands absolute awe.',
        points: { candyman: 3, pennywise: 2, freddy: 1 }
      },
      {
        id: 'C',
        text: 'Protecting my personal territory and punishing anyone who dares trespass.',
        points: { jason: 3, leatherface: 2, michael: 2 }
      },
      {
        id: 'D',
        text: 'Having a blast, breaking rules, and leaving a trail of glorious chaos in my wake.',
        points: { chucky: 3, freddy: 2, ghostface: 2 }
      }
    ]
  },
  {
    id: 20,
    category: 'FINAL CONFRONTATION',
    question: 'In the final movie showdown, how does your character exit the scene?',
    options: [
      {
        id: 'A',
        text: 'Disappearing into thin air right as the police sirens arrive, leaving only my weapon.',
        points: { michael: 3, candyman: 2, samara: 1 }
      },
      {
        id: 'B',
        text: 'A post-credits jump scare wink to the camera indicating a sequel is already greenlit.',
        points: { freddy: 3, chucky: 2, pennywise: 1 }
      },
      {
        id: 'C',
        text: 'Sinking back into the peaceful lake waters to wait patiently for next summer.',
        points: { jason: 3, samara: 2, norman: 1 }
      },
      {
        id: 'D',
        text: 'Closing the heavy iron sliding door while whispering "Game over."',
        points: { jigsaw: 3, pinhead: 2, carrie: 1 }
      }
    ]
  }
];

export interface QuizProgress {
  currentQuestionIndex: number;
  answers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  timestamp: number;
}

export interface PastQuizResult {
  id: string;
  winnerId: string;
  winnerName: string;
  movie: string;
  matchPercentage: number;
  runnerUpId: string;
  runnerUpName: string;
  date: string;
  timestamp: number;
}
