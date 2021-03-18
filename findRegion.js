//store of countries and region to find theregion a country belongs to

var res = "";
function findRegion(data) {
  var startupCountries = [
    { region: "Indian Subcontinent ", country: ["India"] },
    { region: "Central America + Caribbean", country: ["Costa Rica", "Honduras", "Panama", "Trinidad and Tobago", "British Virgin Islands", "Cayman Islands"] },
    {
      region: "South America",
      country: ["Uruguay", "Argentina", "Brazil", "Paraguay", "Peru"]
    },
    {
      region: "Western Europe",
      country: ["France", "Germany", "Portugal", "Spain", "Austria", "Belgium"]
    },
    {
      region: "Cental Europe",
      country: [
        "Croatia",
        "Czech Republic",
        "Hungary",
        "Poland",
        "Slovakia",
        "Romania",
        "Luxembourg",
        "Netherlands",
        "Germany",
        "Austria",
        "Belgium"
      ]
    },
    {
      region: "Eastern Europe",
      country: [
        "Czech Republic",
        "Poland",
        "Croatia",
        "Slovakia",
        "Hungary",
        "Romania",
        "Latvia",
        "Lithuania",
        "Luxembourg",
        "Estonia",
        "Bulgaria"
      ]
    },
    {
      region: "Southern Europe ",
      country: [
        "Malta",
        "Italy",
        "Greece",
        "Spain",
        "Slovenia",
        "Bulgaria",
        "Republic of Cyprus"
      ]
    },
    { region: "United Kingdom ", country: ["United Kingdom"] },
    {
      region: "Scandanavia",
      country: ["Denmark", "Finland", "Netherlands", "Sweden", "Norway"]
    },
    { region: "Russia+CIS", country: ["Russia"] },
    { region: "China", country: ["China"] },
    {
      region: "North Asia",
      country: ["China", "Japan", "Hong Kong", "Taiwan", "South Korea"]
    },
    {
      region: "South East Asia",
      country: [
        "Singapore",
        "Thailand",
        "Philippines",
        "Myanmar",
        "Indonesia",
        "Vietnam"
      ]
    },
    { region: "Australia + New Zealand", country: ["Australia"] },
    { region: "North America", country: ["USA", "Canada", "Mexico"] }
  ];

  

 res=startupCountries.find(x => x.country.find(y=>y===data));
  
  
  return res.region;
}

module.exports = { findRegion };
