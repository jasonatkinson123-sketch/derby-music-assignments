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
  }
};

const assignmentKey = new URLSearchParams(location.search).get("a") || "vivaldi-four-seasons";
window.DEFAULT_ASSIGNMENT = window.ASSIGNMENTS[assignmentKey] || window.ASSIGNMENTS["vivaldi-four-seasons"];
