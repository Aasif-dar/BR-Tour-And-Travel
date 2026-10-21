/**
 * Image registry. Every photograph used on the site is declared here once,
 * with its alt text and licence credit, so images can be swapped in one place.
 *
 * Current photos come from Wikimedia Commons under the licences listed below
 * and are credited on /credits. Replace them with the agency's own photography
 * whenever it becomes available — keep `credit` accurate (or set it to null for
 * images the agency owns).
 */

export type Credit = {
  author: string;
  license: string;
  licenseUrl: string | null;
  source: string;
};

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit: Credit | null;
};

const commons = (file: string) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`;

const CC_BY_2 = "https://creativecommons.org/licenses/by/2.0";
const CC_BY_4 = "https://creativecommons.org/licenses/by/4.0";
const CC_BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0";
const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/";

export const images = {
  tawafNight: {
    src: "/images/makkah-tawaf-night.jpg",
    width: 2400,
    height: 1800,
    alt: "Pilgrims performing tawaf around the Kaaba at night beneath the illuminated arches of Masjid al-Haram",
    credit: {
      author: "Basheer Olakara",
      license: "CC BY 2.0",
      licenseUrl: CC_BY_2,
      source: commons("Masjid al-Haram, Tawaf 20092012 1130PM (8008466944).jpg"),
    },
  },
  kaabaHajj: {
    src: "/images/makkah-kaaba-hajj.jpg",
    width: 2400,
    height: 1603,
    alt: "The Kaaba surrounded by pilgrims in white during the Hajj season",
    credit: {
      author: "Adli Wahid",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      source: commons("The Kaaba during Hajj.jpg"),
    },
  },
  kaabaNight: {
    src: "/images/makkah-kaaba-night.jpg",
    width: 1600,
    height: 2133,
    alt: "Close view of the Kaaba and its gold-embroidered kiswah at night",
    credit: {
      author: "Bjelica",
      license: "CC0",
      licenseUrl: CC0,
      source: commons("Kaaba at night in 2024.jpg"),
    },
  },
  kaabaDoor: {
    src: "/images/makkah-kaaba-door.jpg",
    width: 2400,
    height: 1651,
    alt: "The gold door of the Kaaba beside the Maqam Ibrahim in the Grand Mosque, Makkah",
    credit: {
      author: "Saudi Press Agency (SPA)",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      source: commons("Door of the Holy Kaaba and Maqam Ibrahim in the Grand Mosque, Makkah (2025).jpg"),
    },
  },
  kaabaAerial: {
    src: "/images/makkah-kaaba-aerial.jpg",
    width: 2400,
    height: 1800,
    alt: "Elevated view of the Kaaba amid a dense crowd of pilgrims in the mataf",
    credit: {
      author: "Tab59",
      license: "Public domain",
      licenseUrl: null,
      source: commons("Mosquée Masjid el Haram à la Mecque.jpg"),
    },
  },
  haramDay: {
    src: "/images/makkah-haram-day.jpg",
    width: 2400,
    height: 1800,
    alt: "Pilgrims walking in the courtyard of Masjid al-Haram in daylight with the Kaaba and minarets beyond",
    credit: {
      author: "Omar Chatriwala",
      license: "CC BY 2.0",
      licenseUrl: CC_BY_2,
      source: commons("Kaaba, Never still.jpg"),
    },
  },
  haramOverlook: {
    src: "/images/makkah-haram-overlook.jpg",
    width: 2400,
    height: 1800,
    alt: "A pilgrim in ihram looking out over the Kaaba and the illuminated Masjid al-Haram at night",
    credit: {
      author: "Omar Chatriwala",
      license: "CC BY 2.0",
      licenseUrl: CC_BY_2,
      source: commons("Spying the house of God.jpg"),
    },
  },
  jabalNur: {
    src: "/images/makkah-jabal-nur.jpg",
    width: 2048,
    height: 1536,
    alt: "Jabal al-Nour, the mountain of the Cave of Hira, rising above Makkah",
    credit: {
      author: "Adiput",
      license: "Public domain",
      licenseUrl: null,
      source: commons("Jabal Nur.JPG"),
    },
  },
  madinahSunrise: {
    src: "/images/madinah-sunrise-prayer.jpg",
    width: 2400,
    height: 1688,
    alt: "Worshippers silhouetted in prayer at sunrise in the courtyard of Masjid an-Nabawi, Madinah",
    credit: {
      author: "Ibuz4u",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      source: commons("Masjid-e-Nabawi During Sunrise May 2016.jpg"),
    },
  },
  greenDome: {
    src: "/images/madinah-green-dome.jpg",
    width: 2400,
    height: 1600,
    alt: "The Green Dome and minarets of Masjid an-Nabawi against a pale sky",
    credit: {
      author: "TheHadiRahim",
      license: "CC0",
      licenseUrl: CC0,
      source: commons("Wide shot of the Green Dome at The Prophet's Mosque (Al Masjid-e-Nabawi).jpg"),
    },
  },
  nabawiDusk: {
    src: "/images/madinah-nabawi-dusk.jpg",
    width: 2400,
    height: 1600,
    alt: "Masjid an-Nabawi illuminated at dusk under a coloured evening sky",
    credit: {
      author: "Aymanzaid2",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      source: commons("Al Masjid an Nabawi 3.jpg"),
    },
  },
  nabawiGate: {
    src: "/images/madinah-nabawi-gate.jpg",
    width: 1600,
    height: 2400,
    alt: "An arched gate and minaret of Masjid an-Nabawi in evening light",
    credit: {
      author: "Aymanzaid2",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      source: commons("Al Masjid an Nabawi 4.jpg"),
    },
  },
  nabawiInterior: {
    src: "/images/madinah-nabawi-interior.jpg",
    width: 2400,
    height: 1800,
    alt: "Ornate columns, arches and chandeliers inside Masjid an-Nabawi",
    credit: {
      author: "King Eliot",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      source: commons("Masjid e Nabawi Interior 2.jpg"),
    },
  },
  nabawiUmbrellas: {
    src: "/images/madinah-nabawi-umbrellas.jpg",
    width: 2400,
    height: 1800,
    alt: "The large shade umbrellas of the Masjid an-Nabawi courtyard opened beside a minaret",
    credit: {
      author: "Indonesiagood",
      license: "CC BY 4.0",
      licenseUrl: CC_BY_4,
      source: commons("Masjid Nabawi (Umroh Ramadhan 2023)-2.jpg"),
    },
  },
  quba: {
    src: "/images/madinah-quba.jpg",
    width: 2400,
    height: 1800,
    alt: "The white domes and minarets of Masjid Quba in Madinah",
    credit: {
      author: "Indonesiagood",
      license: "CC BY 4.0",
      licenseUrl: CC_BY_4,
      source: commons("Masjid Quba (Umroh Ramadhan 2023)-1.jpg"),
    },
  },
  arafat: {
    src: "/images/hajj-arafat.jpg",
    width: 2400,
    height: 2400,
    alt: "Pilgrims in white climbing the rocky slopes of Jabal ar-Rahmah at Arafat",
    credit: {
      author: "Edibiz",
      license: "CC0",
      licenseUrl: CC0,
      source: commons("Mount Arafat(Jabal ar-Raḥmah).jpg"),
    },
  },
  jeddahTerminal: {
    src: "/images/travel-jeddah-hajj-terminal.jpg",
    width: 2400,
    height: 1793,
    alt: "Travellers beneath the tented canopy of the Hajj Terminal at King Abdulaziz International Airport, Jeddah",
    credit: {
      author: "Shah134pk",
      license: "CC BY-SA 4.0",
      licenseUrl: CC_BY_SA_4,
      source: commons("KSA Jeddah - Hajj Terminal -20171206 11 11 06 Pro.jpg"),
    },
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
