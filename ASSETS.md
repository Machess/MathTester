# 📦 Asset Files Checklist

## ✅ Required Files

Place these files in the correct directories for the game to work properly.

---

## 📁 /assets/images/ (11 files)

### Pokémon Logo
- [ ] `logo.png` - Main Pokémon logo (shown on start screen)

### Game Items
- [ ] `pokeball.png` - Pokéball sprite (hunt mode, uncaught Pokémon)

### Gym Leader Sprites (9 leaders)
- [ ] `brok.png` - Gym 1 Leader (Rock type)
- [ ] `misty.png` - Gym 2 Leader (Water type) 
- [ ] `surge.png` - Gym 3 Leader (Electric type)
- [ ] `erika.png` - Gym 4 Leader (Grass type)
- [ ] `koga.png` - Gym 5 Leader (Poison type)
- [ ] `sabrina.png` - Gym 6 Leader (Psychic type)
- [ ] `blaine.png` - Gym 7 Leader (Fire type)
- [ ] `lorelei.png` - Gym 8 Leader (Ice type)
- [ ] `lance.png` - Gym 9 Leader (Dragon type)

### Pokémon Center
- [ ] `nursejoy.png` - Nurse Joy sprite (Pokémon Center)

---

## 🔊 /assets/sounds/ (4 files)

### Pokémon Cries (Unlockable via Gyms)
- [ ] `charmender.mp3` - Charmander cry (note: typo in filename)
- [ ] `pikachu.mp3` - Pikachu cry variation 1
- [ ] `pikachu2.mp3` - Pikachu cry variation 2 (randomly selected)
- [ ] `Jigglypuff.mp3` - Jigglypuff cry (note: capital J)

**Note:** These sounds only play after unlocking via gym progression.

---

## 🎨 /assets/backgrounds/ (7 files)

### Battle Backgrounds
- [ ] `battle_backgrounds.png` - Grass battle field (default, green platforms)
- [ ] `neutral_bg.png` - Neutral/indoor battle field (gray)
- [ ] `water_bg.png` - Water battle field (blue platforms)
- [ ] `ground_rock_bg.png` - Ground/rock battle field (brown/tan)
- [ ] `ice_bg.png` - Ice battle field (white/light blue)

**Usage:**
- Normal battles: Randomly selected from all 5 backgrounds
- Gym battles: Type-specific backgrounds

**Gym Background Mapping:**
- Gym 1 (Rock) → ground_rock_bg.png
- Gym 2 (Grass) → battle_backgrounds.png
- Gym 3 (Water) → water_bg.png
- Gym 4 (Electric) → neutral_bg.png
- Gym 5 (Poison) → neutral_bg.png
- Gym 6 (Fire) → ground_rock_bg.png
- Gym 7 (Psychic) → neutral_bg.png
- Gym 8 (Ice) → ice_bg.png
- Gym 9 (Dragon) → neutral_bg.png

### Location Backgrounds
- [ ] `forest.png` - Hunt page forest background (originally `1770852882435_image.png`)
- [ ] `pokecenter.jpg` - Pokémon Center interior background

---

## 📊 Summary

**Total Files Required: 22**
- 11 images
- 4 sounds
- 7 backgrounds

---

## 🔗 External Assets (Loaded via CDN)

The following are loaded from external APIs and don't need to be included:

### Pokémon Sprites
- Source: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`
- All 151 Pokémon sprites (animated GIFs from Generation V Black/White)

### Pokémon Data
- Source: `https://pokeapi.co/api/v2/pokemon/`
- Used for: Names, types, stats, descriptions

### Music (Currently using external URLs)
- Pokémon Center theme
- Victory theme  
- Battle theme
- Recovery sound

---

## 🚨 Important Notes

### File Name Typos
Be careful with these filenames (they contain typos but must match exactly):
- `charmender.mp3` (should be "charmander" but code expects this typo)
- `Jigglypuff.mp3` (capital J - case sensitive on some systems)

### File Name Changes
- Original: `1770852882435_image.png` → Renamed to: `forest.png`

### Optional Files
If any assets are missing:
- Game will still run
- Missing images will show broken image icons
- Missing sounds will fail silently
- Missing backgrounds will show blank backgrounds

---

## ✅ Quick Checklist

Copy this into a text file to track which assets you have:

```
IMAGES:
□ logo.png
□ pokeball.png
□ brok.png
□ misty.png
□ surge.png
□ erika.png
□ koga.png
□ sabrina.png
□ blaine.png
□ lorelei.png
□ lance.png
□ nursejoy.png

SOUNDS:
□ charmender.mp3
□ pikachu.mp3
□ pikachu2.mp3
□ Jigglypuff.mp3

BACKGROUNDS:
□ battle_backgrounds.png
□ neutral_bg.png
□ water_bg.png
□ ground_rock_bg.png
□ ice_bg.png
□ forest.png
□ pokecenter.jpg
```
