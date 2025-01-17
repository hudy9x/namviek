// Array of organization names (maximum 1 word)
const orgNames = [
  "Asgard",
  "Wakanda",
  "Latveria",
  "K'un-Lun",
  "Krakoa",

];

// Array of project names (maximum 2 words)
const projectNames = [
  "Avengers Assemble",
  "Civil War",
  "Infinity War",
  "Endgame",
  "Secret Wars",
  "House of M",
  "Dark Reign",
  "Spider-Verse",
  "Age of Apocalypse",
  "Planet Hulk",
];

// Array of icons
const iconNames = [
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f68e.png',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f965.png',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f951.png',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f347.png',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f969.png',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f35f.png',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f37a.png',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f9c9.png',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f3c5.png',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f947.png',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f948.png',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f949.png',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/26f3.png',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1fa73.png',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f3ba.png',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f941.png',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/2328-fe0f.png'
];

// Function to generate random organization name
export function generateOrgName() {
  const index = Math.floor(Math.random() * orgNames.length);
  return orgNames[index];
}

// Function to generate random project name
export function generateProjectName() {
  const index = Math.floor(Math.random() * projectNames.length);
  return projectNames[index];
}

// Function to generate random project name
export function generateIconName() {
  const index = Math.floor(Math.random() * iconNames.length);
  return iconNames[index];
}
