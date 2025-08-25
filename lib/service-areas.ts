export const SERVICE_AREAS = [
  {
    title: "Northeast Philly",
    groups: [
      {
        subtitle: "Far Northeast",
        items: [
          "Somerton","Bustleton","Krewstown","Pine Valley","Pennypack",
          "Winchester Park","Parkwood","Millbrook","Modena Park","Morrell Park",
          "Normandy","Holme Circle","Academy Gardens","Upper Holmesburg",
          "Torresdale","Crestmont Farms","Byberry"
        ]
      },
      {
        subtitle: "Near Northeast",
        items: [
          "Holmesburg","Mayfair","Tacony","Wissinoming","Oxford Circle",
          "Frankford","Northwood","Rhawnhurst","Lawncrest","Lawndale",
          "Burholme","Fox Chase","Lexington Park","Crescentville","Juniata"
        ]
      }
    ]
  },
  {
    title: "River Wards / Lower North",
    groups: [
      {
        subtitle: "",
        items: [
          "Bridesburg","Port Richmond","Kensington (East/West/Olde)",
          "Harrowgate","Fishtown","Norris Square","Northern Liberties",
          "Ludlow","West Kensington"
        ]
      }
    ]
  },
  {
    title: "Center City & Adjacent",
    groups: [
      {
        subtitle: "",
        items: [
          "Old City","Chinatown","Callowhill","Spring Garden",
          "Logan Square","Fairmount / Art Museum","Poplar / Francisville",
          "Brewerytown","Sharswood"
        ]
      }
    ]
  },
  {
    title: "Lower Northwest / Upper North (≈30 min edge)",
    groups: [
      {
        subtitle: "",
        items: [
          "East Falls","Allegheny West","Tioga–Nicetown","Strawberry Mansion"
        ]
      }
    ]
  },
  {
    title: "Nearby Suburbs — Montgomery County, PA",
    groups: [
      {
        subtitle: "Cheltenham Township",
        items: ["Elkins Park","Wyncote","Melrose Park","La Mott"]
      },
      {
        subtitle: "Abington Township",
        items: ["Glenside","Roslyn","Ardsley","North Hills","Fox Chase Manor"]
      },
      { subtitle: "", items: ["Jenkintown Borough","Rockledge Borough"] },
      {
        subtitle: "Lower Moreland Township",
        items: ["Huntingdon Valley","Bethayres"]
      },
      {
        subtitle: "Upper Moreland Township",
        items: ["Willow Grove"]
      },
      { subtitle: "", items: ["Hatboro Borough"] },
      { subtitle: "", items: ["Horsham Township (east)"] },
      { subtitle: "", items: ["Bryn Athyn Borough"] },
      {
        subtitle: "Upper Dublin Township",
        items: ["Dresher","Fort Washington"]
      },
      {
        subtitle: "Springfield Township",
        items: ["Oreland","Wyndmoor"]
      }
    ]
  },
  {
    title: "Nearby Suburbs — Bucks County, PA",
    groups: [
      {
        subtitle: "Bensalem Township",
        items: ["Andalusia","Cornwells Heights","Eddington"]
      },
      {
        subtitle: "Lower Southampton Township",
        items: ["Feasterville–Trevose"]
      },
      {
        subtitle: "Middletown Township",
        items: ["Langhorne","Langhorne Borough","Penndel","Hulmeville"]
      },
      {
        subtitle: "Bristol Township & Bristol Borough",
        items: ["Croydon"]
      }
    ]
  },
  {
    title: "South Jersey (via Tacony–Palmyra / Betsy Ross)",
    groups: [
      {
        subtitle: "",
        items: ["Palmyra","Riverton","Cinnaminson","Pennsauken","Merchantville"]
      }
    ]
  }
] as const;
