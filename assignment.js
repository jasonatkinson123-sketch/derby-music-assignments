window.ASSIGNMENTS = {
  "vivaldi-four-seasons": {
    title: "Vivaldi and The Four Seasons",
    eyebrow: "MUSIC CLASS · READING 01",
    readingHeading: "Can music paint a picture?",
    image: "vivaldi.jpg",
    imageAlt: "1725 engraved portrait of Antonio Vivaldi",
    imageCredit: "François Morellon de La Cave, 1725 · Public domain, via Wikimedia Commons",
    imageSource: "https://commons.wikimedia.org/wiki/File:Vivaldi_La_Cave.jpg",
    reading: [
      "Imagine hearing a piece of music and picturing birds singing, a thunderstorm approaching, or people shivering in the cold. Antonio Vivaldi, a composer and violinist who lived in Venice, Italy, wanted listeners to hear scenes like these. He wrote hundreds of works during the Baroque era, including a set of four violin concertos called The Four Seasons.",
      "Each concerto represents one season: Spring, Summer, Autumn, or Winter. Vivaldi even included short poems that describe the scenes in the music. In Spring, you can hear a cheerful melody, birdlike sounds, and a sudden storm. In Winter, repeated notes and sharp rhythms can suggest chattering teeth and icy wind.",
      "Vivaldi used musical choices such as tempo, volume, rhythm, and the sound of the violin to create these images. The instruments do not literally become birds or weather. Instead, listeners use clues in the music and their imagination to make a connection. That is one reason The Four Seasons still gives people so much to talk about today."
    ],
    multipleChoice: {
      question: "What did Vivaldi use to suggest scenes from the seasons?",
      options: [
        "Changes in tempo, volume, rhythm, and violin sound",
        "A narrator speaking over the orchestra",
        "Four paintings displayed during the concert",
        "Words sung by a choir"
      ]
    },
    shortAnswers: [
      "Choose one scene from the reading. What might you listen for in the music to recognize it?",
      "Why might two listeners imagine different things while hearing the same piece of music?"
    ]
  },

  "dizzy-egypt": {
    title: "Dizzy Gillespie: Jazz in Egypt",
    eyebrow: "MUSIC CLASS · READING 02",
    readingHeading: "How can music connect people?",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dizzy_Gillespie_playing_horn_1955.jpg",
    imageAlt: "Dizzy Gillespie playing trumpet in 1955",
    imageCredit: "Carl Van Vechten, 1955 · Public domain, Library of Congress, via Wikimedia Commons",
    imageSource: "https://commons.wikimedia.org/wiki/File:Dizzy_Gillespie_playing_horn_1955.jpg",
    reading: [
      "Dizzy Gillespie was one of the most important trumpet players in jazz history. In the 1940s, he helped create bebop, a style known for fast tempos, complicated melodies, and adventurous improvisation. His puffed cheeks, playful personality, and trumpet with its bell tilted upward made him easy to recognize, but musicians especially admired the speed, control, and imagination in his playing.",
      "Gillespie also believed jazz could travel across borders. In 1956, he led the first jazz band sent abroad by the U.S. State Department as a cultural ambassador, performing across the Middle East, South Asia, and southern Europe. More than thirty years later, he traveled to Egypt and performed at the Cairo Opera House. Smithsonian archives preserve recordings from his January 7, 1989 concert there, part of a larger African tour.",
      "A jazz performance depends on musicians listening and responding to one another. A soloist may invent a new musical idea, and the rhythm section can react instantly. That made Gillespie's concerts more than a chance to hear a famous American musician: they were also musical conversations. In Cairo, jazz became a meeting point between an African American art form, an Egyptian audience, and musicians interested in sharing ideas across cultures."
    ],
    multipleChoice: {
      question: "What idea about jazz is emphasized in the reading?",
      options: [
        "Improvisation lets musicians listen and respond to one another",
        "Jazz musicians must play every note exactly the same each time",
        "Jazz can only be performed in the United States",
        "Trumpet players never perform with rhythm sections"
      ]
    },
    shortAnswers: [
      "What part of Gillespie's music or career made him a good musical ambassador? Use one detail from the reading.",
      "If you were at the Cairo concert, what would you listen for to hear musicians responding to one another?"
    ]
  },

  "music-in-venice": {
    title: "Music in Venice, Italy",
    eyebrow: "MUSIC CLASS · READING 03",
    readingHeading: "Why did Venice become such a musical city?",
    image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Piazza%20San%20Marco%2C%20St%20Mark%27s%20Square%2C%20Venice%2C%20Italy.jpg",
    imageAlt: "Piazza San Marco, St. Mark's Square, in Venice, Italy",
    imageCredit: "Vyacheslav Argenberg, 2006 · via Wikimedia Commons",
    imageSource: "https://commons.wikimedia.org/wiki/File:Piazza_San_Marco,_St_Mark%27s_Square,_Venice,_Italy.jpg",
    reading: [
      "Venice is a city built around islands, canals, bridges, churches, and public squares. For hundreds of years, music has been part of the city's public life. People heard music in churches, theaters, celebrations, and special events. Venice also became important to the spread of written music. In 1501, the Venetian printer Ottaviano Petrucci published an important collection of music using movable type, helping printed music reach more musicians.",
      "During the 1600s and 1700s, Venice became one of Europe's great centers for opera and instrumental music. The first public opera house in Venice opened in 1637, which meant opera was no longer only entertainment for royal courts and wealthy families. Venice was also the home of Antonio Vivaldi, the famous violinist and composer. Vivaldi worked for many years at the Ospedale della Pietà, where girls received serious musical training and performed concerts that attracted visitors.",
      "Music is still part of the way many people imagine Venice today. A visitor might hear church bells, orchestras and singers in theaters, small ensembles in public squares, or musicians performing music by Vivaldi. Venice shows how a place can shape its musical traditions. Its churches, theaters, schools, audiences, and festivals all helped make music an important part of the city's identity."
    ],
    multipleChoice: {
      question: "Which statement best explains why Venice became important in music history?",
      options: [
        "It supported music through churches, theaters, schools, printing, and public performances",
        "It was the only city in Europe where people were allowed to play violins",
        "All Venetian music was written for gondolas",
        "Venice avoided opera and focused only on church music"
      ]
    },
    shortAnswers: [
      "Name two places or situations in Venice where people could hear music, based on the reading.",
      "How can a city help a musical tradition grow? Use one example from Venice in your answer."
    ]
  }
};

const assignmentKey = new URLSearchParams(location.search).get("a") || "vivaldi-four-seasons";
window.DEFAULT_ASSIGNMENT = window.ASSIGNMENTS[assignmentKey] || window.ASSIGNMENTS["vivaldi-four-seasons"];
