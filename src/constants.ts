import type { Character, Question } from "./types.ts";

export const QUESTIONS: Question[] = [
  { id: "neutral", text: "¿Quién tiene mejor neutral?" },
  { id: "disadvantage", text: "¿Quién puede salir mejor de desventaja?" },
  { id: "advantage", text: "¿Quién puede mantener mejor su ventaja?" },
  {
    id: "stock_maintenance",
    text: "¿Quién tiene mejores opciones para mantener su stock?",
  },
  {
    id: "damage_per_interaction",
    text: "¿Quién hace más daño por interacción?",
  },
  { id: "interactions_to_kill", text: "¿Quién mata en menos interacciones?" },
  { id: "matchup", text: "¿Quién gana el matchup?" },
];

export const SSBU_CHARACTERS: Character[] = [
  {
    id: "mario",
    name: "Mario",
    image: "https://www.smashbros.com/assets_v2/img/fighter/mario/main.png",
  },
  {
    id: "donkey_kong",
    name: "Donkey Kong",
    image:
      "https://www.smashbros.com/assets_v2/img/fighter/donkey_kong/main.png",
  },
  {
    id: "link",
    name: "Link",
    image: "https://www.smashbros.com/assets_v2/img/fighter/link/main.png",
  },
  {
    id: "samus",
    name: "Samus",
    image: "https://www.smashbros.com/assets_v2/img/fighter/samus/main.png",
  },
  {
    id: "yoshi",
    name: "Yoshi",
    image: "https://www.smashbros.com/assets_v2/img/fighter/yoshi/main.png",
  },
  {
    id: "kirby",
    name: "Kirby",
    image: "https://www.smashbros.com/assets_v2/img/fighter/kirby/main.png",
  },
  {
    id: "fox",
    name: "Fox",
    image: "https://www.smashbros.com/assets_v2/img/fighter/fox/main.png",
  },
  {
    id: "pikachu",
    name: "Pikachu",
    image: "https://www.smashbros.com/assets_v2/img/fighter/pikachu/main.png",
  },
  {
    id: "luigi",
    name: "Luigi",
    image: "https://www.smashbros.com/assets_v2/img/fighter/luigi/main.png",
  },
  {
    id: "ness",
    name: "Ness",
    image: "https://www.smashbros.com/assets_v2/img/fighter/ness/main.png",
  },
  {
    id: "captain_falcon",
    name: "Capt. Falcon",
    image:
      "https://www.smashbros.com/assets_v2/img/fighter/captain_falcon/main.png",
  },
  {
    id: "jigglypuff",
    name: "Jigglypuff",
    image:
      "https://www.smashbros.com/assets_v2/img/fighter/jigglypuff/main.png",
  },
  {
    id: "peach",
    name: "Peach",
    image: "https://www.smashbros.com/assets_v2/img/fighter/peach/main.png",
  },
  {
    id: "bowser",
    name: "Bowser",
    image: "https://www.smashbros.com/assets_v2/img/fighter/bowser/main.png",
  },
  {
    id: "sheik",
    name: "Sheik",
    image: "https://www.smashbros.com/assets_v2/img/fighter/sheik/main.png",
  },
  {
    id: "zelda",
    name: "Zelda",
    image: "https://www.smashbros.com/assets_v2/img/fighter/zelda/main.png",
  },
  {
    id: "marth",
    name: "Marth",
    image: "https://www.smashbros.com/assets_v2/img/fighter/marth/main.png",
  },
  {
    id: "lucina",
    name: "Lucina",
    image: "https://www.smashbros.com/assets_v2/img/fighter/lucina/main.png",
  },
  {
    id: "young_link",
    name: "Young Link",
    image:
      "https://www.smashbros.com/assets_v2/img/fighter/young_link/main.png",
  },
  {
    id: "ganondorf",
    name: "Ganondorf",
    image: "https://www.smashbros.com/assets_v2/img/fighter/ganondorf/main.png",
  },
  {
    id: "mewtwo",
    name: "Mewtwo",
    image: "https://www.smashbros.com/assets_v2/img/fighter/mewtwo/main.png",
  },
  {
    id: "roy",
    name: "Roy",
    image: "https://www.smashbros.com/assets_v2/img/fighter/roy/main.png",
  },
  {
    id: "chrom",
    name: "Chrom",
    image: "https://www.smashbros.com/assets_v2/img/fighter/chrom/main.png",
  },
  {
    id: "mr_game_and_watch",
    name: "Mr. G&W",
    image:
      "https://www.smashbros.com/assets_v2/img/fighter/mr_game_and_watch/main.png",
  },
  {
    id: "meta_knight",
    name: "Meta Knight",
    image:
      "https://www.smashbros.com/assets_v2/img/fighter/meta_knight/main.png",
  },
  {
    id: "pit",
    name: "Pit",
    image: "https://www.smashbros.com/assets_v2/img/fighter/pit/main.png",
  },
  {
    id: "dark_pit",
    name: "Dark Pit",
    image: "https://www.smashbros.com/assets_v2/img/fighter/dark_pit/main.png",
  },
  {
    id: "zero_suit_samus",
    name: "ZSS",
    image:
      "https://www.smashbros.com/assets_v2/img/fighter/zero_suit_samus/main.png",
  },
  {
    id: "wario",
    name: "Wario",
    image: "https://www.smashbros.com/assets_v2/img/fighter/wario/main.png",
  },
  {
    id: "snake",
    name: "Snake",
    image: "https://www.smashbros.com/assets_v2/img/fighter/snake/main.png",
  },
  {
    id: "ike",
    name: "Ike",
    image: "https://www.smashbros.com/assets_v2/img/fighter/ike/main.png",
  },
  {
    id: "pokemon_trainer",
    name: "PKMN Trainer",
    image:
      "https://www.smashbros.com/assets_v2/img/fighter/pokemon_trainer/main.png",
  },
  {
    id: "diddy_kong",
    name: "Diddy Kong",
    image:
      "https://www.smashbros.com/assets_v2/img/fighter/diddy_kong/main.png",
  },
  {
    id: "lucas",
    name: "Lucas",
    image: "https://www.smashbros.com/assets_v2/img/fighter/lucas/main.png",
  },
  {
    id: "sonic",
    name: "Sonic",
    image: "https://www.smashbros.com/assets_v2/img/fighter/sonic/main.png",
  },
  {
    id: "king_dedede",
    name: "King Dedede",
    image:
      "https://www.smashbros.com/assets_v2/img/fighter/king_dedede/main.png",
  },
  {
    id: "olimar",
    name: "Olimar",
    image: "https://www.smashbros.com/assets_v2/img/fighter/olimar/main.png",
  },
  {
    id: "lucario",
    name: "Lucario",
    image: "https://www.smashbros.com/assets_v2/img/fighter/lucario/main.png",
  },
  {
    id: "rob",
    name: "R.O.B.",
    image: "https://www.smashbros.com/assets_v2/img/fighter/rob/main.png",
  },
  {
    id: "toon_link",
    name: "Toon Link",
    image: "https://www.smashbros.com/assets_v2/img/fighter/toon_link/main.png",
  },
  {
    id: "wolf",
    name: "Wolf",
    image: "https://www.smashbros.com/assets_v2/img/fighter/wolf/main.png",
  },
  {
    id: "villager",
    name: "Villager",
    image: "https://www.smashbros.com/assets_v2/img/fighter/villager/main.png",
  },
  {
    id: "mega_man",
    name: "Mega Man",
    image: "https://www.smashbros.com/assets_v2/img/fighter/mega_man/main.png",
  },
  {
    id: "wii_fit_trainer",
    name: "Wii Fit",
    image:
      "https://www.smashbros.com/assets_v2/img/fighter/wii_fit_trainer/main.png",
  },
  {
    id: "rosalina_and_luma",
    name: "Rosalina",
    image:
      "https://www.smashbros.com/assets_v2/img/fighter/rosalina_and_luma/main.png",
  },
  {
    id: "little_mac",
    name: "Little Mac",
    image:
      "https://www.smashbros.com/assets_v2/img/fighter/little_mac/main.png",
  },
  {
    id: "greninja",
    name: "Greninja",
    image: "https://www.smashbros.com/assets_v2/img/fighter/greninja/main.png",
  },
  {
    id: "palutena",
    name: "Palutena",
    image: "https://www.smashbros.com/assets_v2/img/fighter/palutena/main.png",
  },
  {
    id: "pac_man",
    name: "Pac-Man",
    image: "https://www.smashbros.com/assets_v2/img/fighter/pac_man/main.png",
  },
  {
    id: "robin",
    name: "Robin",
    image: "https://www.smashbros.com/assets_v2/img/fighter/robin/main.png",
  },
  {
    id: "shulk",
    name: "Shulk",
    image: "https://www.smashbros.com/assets_v2/img/fighter/shulk/main.png",
  },
  {
    id: "bowser_jr",
    name: "Bowser Jr.",
    image: "https://www.smashbros.com/assets_v2/img/fighter/bowser_jr/main.png",
  },
  {
    id: "duck_hunt",
    name: "Duck Hunt",
    image: "https://www.smashbros.com/assets_v2/img/fighter/duck_hunt/main.png",
  },
  {
    id: "ryu",
    name: "Ryu",
    image: "https://www.smashbros.com/assets_v2/img/fighter/ryu/main.png",
  },
  {
    id: "ken",
    name: "Ken",
    image: "https://www.smashbros.com/assets_v2/img/fighter/ken/main.png",
  },
  {
    id: "cloud",
    name: "Cloud",
    image: "https://www.smashbros.com/assets_v2/img/fighter/cloud/main.png",
  },
  {
    id: "corrin",
    name: "Corrin",
    image: "https://www.smashbros.com/assets_v2/img/fighter/corrin/main.png",
  },
  {
    id: "bayonetta",
    name: "Bayonetta",
    image: "https://www.smashbros.com/assets_v2/img/fighter/bayonetta/main.png",
  },
  {
    id: "inkling",
    name: "Inkling",
    image: "https://www.smashbros.com/assets_v2/img/fighter/inkling/main.png",
  },
  {
    id: "ridley",
    name: "Ridley",
    image: "https://www.smashbros.com/assets_v2/img/fighter/ridley/main.png",
  },
  {
    id: "simon",
    name: "Simon",
    image: "https://www.smashbros.com/assets_v2/img/fighter/simon/main.png",
  },
  {
    id: "richter",
    name: "Richter",
    image: "https://www.smashbros.com/assets_v2/img/fighter/richter/main.png",
  },
  {
    id: "king_k_rool",
    name: "King K. Rool",
    image:
      "https://www.smashbros.com/assets_v2/img/fighter/king_k_rool/main.png",
  },
  {
    id: "isabelle",
    name: "Isabelle",
    image: "https://www.smashbros.com/assets_v2/img/fighter/isabelle/main.png",
  },
  {
    id: "incineroar",
    name: "Incineroar",
    image:
      "https://www.smashbros.com/assets_v2/img/fighter/incineroar/main.png",
  },
  {
    id: "piranha_plant",
    name: "Piranha Plant",
    image:
      "https://www.smashbros.com/assets_v2/img/fighter/piranha_plant/main.png",
  },
  {
    id: "joker",
    name: "Joker",
    image: "https://www.smashbros.com/assets_v2/img/fighter/joker/main.png",
  },
  {
    id: "hero",
    name: "Hero",
    image: "https://www.smashbros.com/assets_v2/img/fighter/dq_hero/main.png",
  },
  {
    id: "banjo_and_kazooie",
    name: "Banjo",
    image:
      "https://www.smashbros.com/assets_v2/img/fighter/banjo_and_kazooie/main.png",
  },
  {
    id: "terry",
    name: "Terry",
    image: "https://www.smashbros.com/assets_v2/img/fighter/terry/main.png",
  },
  {
    id: "byleth",
    name: "Byleth",
    image: "https://www.smashbros.com/assets_v2/img/fighter/byleth/main.png",
  },
  {
    id: "minmin",
    name: "Min Min",
    image: "https://www.smashbros.com/assets_v2/img/fighter/minmin/main.png",
  },
  {
    id: "steve",
    name: "Steve",
    image: "https://www.smashbros.com/assets_v2/img/fighter/steve/main.png",
  },
  {
    id: "sephiroth",
    name: "Sephiroth",
    image: "https://www.smashbros.com/assets_v2/img/fighter/sephiroth/main.png",
  },
  {
    id: "pyra_mythra",
    name: "Pyra/Mythra",
    image: "https://www.smashbros.com/assets_v2/img/fighter/pyra/main.png",
  },
  {
    id: "kazuya",
    name: "Kazuya",
    image: "https://www.smashbros.com/assets_v2/img/fighter/kazuya/main.png",
  },
  {
    id: "sora",
    name: "Sora",
    image: "https://www.smashbros.com/assets_v2/img/fighter/sora/main.png",
  },
];
