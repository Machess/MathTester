# 🎮 Pokémon Math Challenge

An interactive educational game that teaches multiplication tables through Pokémon-themed gameplay!

## 📁 Project Structure

```
pokemon-math-challenge/
├── index.html              # Main HTML structure
├── style.css               # All CSS styling (4,745 lines)
├── app.js                  # All JavaScript logic (3,554 lines)
├── assets/
│   ├── images/             # Pokémon sprites and UI images
│   │   ├── logo.png
│   │   ├── pokeball.png
│   │   ├── brok.png        # Gym leader sprites
│   │   ├── misty.png
│   │   ├── surge.png
│   │   ├── erika.png
│   │   ├── koga.png
│   │   ├── sabrina.png
│   │   ├── blaine.png
│   │   ├── lorelei.png
│   │   ├── lance.png
│   │   └── nursejoy.png
│   ├── sounds/             # Pokémon cries/voices
│   │   ├── charmender.mp3
│   │   ├── pikachu.mp3
│   │   ├── pikachu2.mp3
│   │   └── Jigglypuff.mp3
│   └── backgrounds/        # Battle and location backgrounds
│       ├── battle_backgrounds.png  # Grass battle bg
│       ├── neutral_bg.png
│       ├── water_bg.png
│       ├── ground_rock_bg.png
│       ├── ice_bg.png
│       ├── forest.png      # Hunt page background
│       └── pokecenter.jpg
└── README.md               # This file
```

## 🚀 Setup

1. **Extract all files** to your project directory
2. **Place assets** in the correct folders:
   - Images → `assets/images/`
   - Sounds → `assets/sounds/`
   - Backgrounds → `assets/backgrounds/`
3. **Open `index.html`** in a web browser
4. **Start playing!**

## 📦 Required Assets

### Images (assets/images/)
- `logo.png` - Pokémon logo
- `pokeball.png` - Pokéball sprite
- `brok.png` through `lance.png` - 9 gym leader sprites
- `nursejoy.png` - Pokémon Center nurse sprite

### Sounds (assets/sounds/)
- `charmender.mp3` - Charmander cry
- `pikachu.mp3` - Pikachu cry (variation 1)
- `pikachu2.mp3` - Pikachu cry (variation 2)
- `Jigglypuff.mp3` - Jigglypuff cry

### Backgrounds (assets/backgrounds/)
- `battle_backgrounds.png` - Grass battle field
- `neutral_bg.png` - Neutral/indoor battle field
- `water_bg.png` - Water battle field
- `ground_rock_bg.png` - Ground/rock battle field
- `ice_bg.png` - Ice battle field
- `forest.png` - Hunt page forest background
- `pokecenter.jpg` - Pokémon Center interior

## 🎯 Features

- **Hunt Mode**: Catch Pokémon by solving math problems
- **Gym Challenge**: Master multiplication tables (1-12) across 9 gyms
- **Battle Mode**: Fight AI opponents with your caught Pokémon
- **Pokédex**: View all 151 Generation 1 Pokémon
- **Pokémon Center**: Heal injured Pokémon
- **Badge System**: Earn 30 badges for various achievements
- **Type Advantages**: Full 18-type battle system
- **Legendary Pokémon**: Unlock through gym progression
- **Sound Effects**: Pokémon cries (unlockable via gyms)

## 🛠️ Technical Details

- **No dependencies**: Pure vanilla JavaScript, HTML, CSS
- **API Integration**: Uses PokéAPI for Pokémon data and sprites
- **LocalStorage**: Saves game progress automatically
- **Responsive**: Works on desktop and mobile devices

## 📝 Code Organization

### index.html
- Clean semantic HTML structure
- All game pages and modals
- References external CSS and JS

### style.css
- Modern Pokémon design system
- CSS variables for theming
- Responsive layouts
- Animations and transitions

### app.js
- Game state management
- Battle system logic
- Pokémon catching mechanics
- Gym progression system
- Badge tracking
- LocalStorage integration

## 🎮 How to Play

1. **Start Game**: Begin your Pokémon journey
2. **Hunt Pokémon**: Click Pokéballs to find wild Pokémon
3. **Solve Math**: Answer multiplication problems to catch them
4. **Challenge Gyms**: Master each multiplication table (1-12)
5. **Battle Mode**: Test your skills against AI trainers
6. **Collect Badges**: Earn achievements for completing challenges

## 🔧 Development

To modify the game:
- Edit **style.css** for visual changes
- Edit **app.js** for game logic
- Edit **index.html** for structure changes

## Testing
To set all gyms to active (test out if unlockables work)
   // Unlock all 9 gyms
   gymProgress.unlockedGyms = [1, 2, 3, 4, 5, 6, 7, 8, 9];
   gymProgress.completedGyms = [];
   gymProgress.healingUnlocked = true;
   gymProgress.legendariesUnlocked = {
      articuno: true,
      zapdos: true,
      moltres: true,
      mewtwo: true,
      mew: true
   };
   localStorage.setItem('gymProgress', JSON.stringify(gymProgress));

To set any pokemon to caught status
   // Catch multiple Pokémon
   const pokemonToCatch = ['Pikachu', 'Charmander', 'Squirtle', 'Bulbasaur', 'Jigglypuff'];

   pokemonToCatch.forEach(name => {
      const index = pokemon.indexOf(name);
      if (index !== -1) {
         caughtPokemon[index + 1] = true;
         console.log(`✓ ${name} caught!`);
      }
   });

   localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon));
   console.log('All Pokémon caught!');


## 📊 Game Stats

- **151 Pokémon** from Generation 1
- **9 Gyms** with unique leaders and themes
- **30 Badges** to collect
- **18 Type** advantage system
- **5 Battle Backgrounds** (randomized in normal battles, type-specific in gyms)
- **12 Questions** per gym (multiplication 1-12)

## 🎨 Design Credits

- Based on authentic Pokémon Game Boy aesthetics
- Type colors from official Pokémon games
- Battle layout inspired by Generation 3-5

## 📄 License

Educational project for learning multiplication tables.
Pokémon is © Nintendo/Game Freak.
