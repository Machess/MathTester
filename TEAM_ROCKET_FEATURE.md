# 🚨 Team Rocket Feature - Complete Implementation

A random event system that adds exciting replayability to the Pokémon Math game!

---

## 📁 Required Assets

Place these files in `assets/`:

### Images:
- `assets/images/teamrocket.png` - Jessie & James sprite

### Sounds:
- `assets/sounds/teamrocket_show.mp3` - Plays when Team Rocket appears
- `assets/sounds/teamrocket_battle.mp3` - Plays during rescue battle

---

## 🎮 How It Works

### **1. Random Encounter (Hunt Screen)**

**Trigger Conditions:**
- Every 5+ hunt screen resets
- 20% chance to trigger
- Must have ≥1 healthy caught Pokémon
- No active stolen Pokémon

**What Happens:**
1. Pokéballs animate away (spin and disappear)
2. Team Rocket sprite slides in from left
3. Music changes to `teamrocket_show.mp3`
4. Witty dialogue appears (randomized from 5 options)
5. Team Rocket steals 1-5 random healthy Pokémon
6. Stolen Pokémon names displayed
7. Math problem appears - solve to chase them

---

### **2. Pokémon Theft**

**Theft Logic:**
```javascript
- Select from healthy caught Pokémon only (no fainted)
- Random amount: 1-5 (or less if fewer available)
- Randomly shuffled selection
- Saved to localStorage
```

**Stolen Pokémon Effects:**
- Marked in Pokédex with purple border + red "R" badge
- Grayed out with 60% opacity
- Still counts as "caught" (not removed)
- Cannot be used in battles until rescued

---

### **3. Escape Challenge**

**Math Problem:**
- Single harder problem (2-12 × 2-12)
- Correct: Return to hunt with rescue button
- Wrong: Try again (same problem)

---

### **4. Rescue Button (Hunt Screen)**

**Appearance:**
- Only visible when Pokémon are stolen
- Red gradient with gold border
- Pulsing glow animation
- Shows count: "🚨 RESCUE (3 POKÉMON)"

**Location:**
- Above Pokéball selection
- Centered on hunt screen

---

### **5. Rescue Battle**

**Battle Setup:**
- Uses existing battle arena
- Team Rocket as opponent (larger sprite)
- Your healthy Pokémon vs Team Rocket
- Neutral background
- Music: `teamrocket_battle.mp3`

**Battle Mechanics:**
- Questions = number of stolen Pokémon
- Each correct answer damages Team Rocket
- Each wrong answer damages you (-20 HP)
- Win: All Pokémon rescued!
- Lose: Try again (Pokémon stay stolen)

---

## ✨ Animations & Polish

### **Pokéball Disappearing:**
```css
@keyframes pokeball-steal {
    - Spins 360 degrees
    - Shrinks to 0
    - Fades out
    Duration: 1 second
}
```

### **Team Rocket Sprite Slide-In:**
```css
@keyframes slide-in {
    - Slides from left (-100%)
    - Rotates -10deg → 0deg
    - Cubic bezier easing
    Duration: 0.8 seconds
}
```

### **Dialogue Appear:**
```css
@keyframes dialogue-appear {
    - Scales up from 0.8
    - Fades in
    Duration: 0.5 seconds (0.3s delay)
}
```

### **Rescue Button Pulse:**
```css
@keyframes pulse-glow {
    - Scales 1.0 → 1.05
    - Glows brighter/dimmer
    - Box shadow intensity changes
    Duration: 2 seconds (infinite loop)
}
```

### **Victory Sparkles:**
```javascript
- 20 random sparkles (✨⭐💫🌟)
- Spawn across screen
- Scale up → down
- Rotate 360 degrees
- Fade out
```

---

## 🎭 Dialogue System

### **Team Rocket Appears (5 variations):**
1. "Prepare for trouble! Make it double! We're stealing your Pokémon on the double!"
2. "To protect the world from devastation!...and steal some Pokémon while we're at it!"
3. "Your Pokémon are now Team Rocket property! Solve this problem if you dare chase us!"
4. "Meowth! That's right! We're taking these cuties! Catch us if you can!"
5. "Look at all these adorable Pokémon! We'll take good care of them... NOT! Hahahaha!"

### **Team Rocket Defeated (5 variations):**
1. "WHAT?! We've been defeated by a kid! Looks like Team Rocket's blasting off again! ⭐"
2. "No! Our perfect plan foiled by mathematics! We're blasting off agaaaaaain! ✨"
3. "Curse you and your superior math skills! Team Rocket's blasting off! 🌠"
4. "This isn't over! We'll be back!...probably after we study more math! 📚"
5. "Defeated by numbers?! The shame! Looks like we're blasting off! 🎆"

---

## 🎨 Visual Design

### **Team Rocket Theme Colors:**
- **Primary:** Purple (#8A2BE2, #6A0DAD)
- **Secondary:** Crimson (#DC143C, #8B0000)
- **Accent:** Hot Pink (#FF1493)
- **Gold:** (#FFD700)

### **Dialogue Box:**
- Purple gradient background
- Pink border (4px)
- White text (1.3em, bold)
- Speech bubble triangle pointer
- Drop shadow with purple glow

### **Stolen Message:**
- Red gradient background
- Gold text (1.4em, extra bold)
- Gold border (3px)
- Shake animation on appear

### **Stolen Pokémon Card:**
- Purple border (4px)
- Purple gradient overlay (20% opacity)
- 60% opacity (grayed out)
- Red "R" badge (top-right corner)
  - 35px circle
  - White text
  - Gold border
  - Crimson background

---

## 💾 LocalStorage Structure

```javascript
{
  stolenPokemon: [25, 4, 1],     // Array of Pokémon numbers
  huntResetCounter: 7             // Tracks resets for trigger
}
```

---

## 🎯 User Flow Diagram

```
HUNT SCREEN
    ↓
Check 3 Pokéballs
    ↓
All Checked → Reset (Counter++)
    ↓
Counter ≥ 5 → 20% Chance
    ↓
[TEAM ROCKET APPEARS!] 🚨
    ↓
Pokéballs disappear
Team Rocket slides in
Music: teamrocket_show.mp3
Dialogue appears
    ↓
Steal 1-5 Pokémon
Show stolen names
    ↓
Math Problem
    ↓
Solve → Return to Hunt
    ↓
[RESCUE BUTTON APPEARS] 🚨
Pulsing red button
"RESCUE (X POKÉMON)"
    ↓
Click Rescue → BATTLE MODE
    ↓
vs Team Rocket
Music: teamrocket_battle.mp3
Solve X problems
    ↓
Victory → Sparkles! 🎉
Defeat Dialogue
All Pokémon Returned
    ↓
Back to Hunt (normal mode)
```

---

## 📊 Difficulty Balance

| Aspect | Value | Reasoning |
|--------|-------|-----------|
| **Trigger Frequency** | Every 5-7 resets | Not too annoying |
| **Trigger Chance** | 20% | Surprise factor |
| **Steal Amount** | 1-5 Pokémon | Scales with progression |
| **Escape Problem** | 1 problem | Quick, not punishing |
| **Rescue Damage** | 20 HP per wrong | Forgiving (5 mistakes = defeat) |
| **Retry** | Unlimited | Can always try again |

---

## 🔧 Technical Implementation

### **New Variables:**
```javascript
let stolenPokemon = [];         // [25, 4, 1]
let huntResetCounter = 0;       // Tracks resets
let teamRocketActive = false;   // Prevents double trigger
let currentRescueQuestion = 0;  // Progress tracker
let totalRescueQuestions = 0;   // Total to rescue
```

### **New Functions:**
- `checkTeamRocketEvent()` - Trigger logic
- `getHealthyCaughtPokemon()` - Get valid targets
- `triggerTeamRocketEncounter()` - Show Team Rocket
- `stealPokemon()` - Random theft
- `showRocketEscapeProblem()` - Math challenge
- `updatePokedexStolenStatus()` - Mark stolen
- `completeRocketEscape()` - Return to hunt
- `updateRescueButton()` - Show/hide button
- `startRescueBattle()` - Enter rescue mode
- `setupRescueBattle()` - Configure battle
- `showRescueQuestion()` - Display question
- `checkRescueAnswer()` - Validate answer
- `rescueVictory()` - Win sequence
- `rescueDefeat()` - Lose sequence
- `returnToHuntFromRescue()` - Exit rescue
- `createVictorySparkles()` - Celebration

### **Modified Functions:**
- `resetBushes()` - Checks for event trigger
- `navigateTo('hunt')` - Updates rescue button
- `checkAnswer()` - Handles Team Rocket escape
- `submitBattleAnswer()` - Routes to rescue checker
- `initializeGrid()` - Marks stolen Pokémon

---

## 🧪 Testing

### **Trigger Team Rocket Manually:**
```javascript
// In browser console
huntResetCounter = 5;
checkTeamRocketEvent();
// Or force trigger:
triggerTeamRocketEncounter();
```

### **Steal Specific Pokémon:**
```javascript
stolenPokemon = [25, 4, 1]; // Pikachu, Charmander, Bulbasaur
localStorage.setItem('stolenPokemon', JSON.stringify(stolenPokemon));
updateRescueButton();
navigateTo('pokedex'); // See them marked as stolen
```

### **Test Rescue Battle:**
```javascript
stolenPokemon = [25];
startRescueBattle();
```

### **Reset Everything:**
```javascript
stolenPokemon = [];
huntResetCounter = 0;
localStorage.setItem('stolenPokemon', '[]');
localStorage.setItem('huntResetCounter', '0');
updateRescueButton();
```

---

## ✅ Features Implemented

### **Core Mechanics:**
- ✅ Random encounter trigger (5+ resets, 20% chance)
- ✅ Team Rocket sprite slide-in animation
- ✅ Music changes (show + battle themes)
- ✅ Pokémon theft (1-5 healthy Pokémon)
- ✅ Math escape challenge
- ✅ Rescue button (pulsing glow)
- ✅ Rescue battle system
- ✅ Victory/defeat handling
- ✅ LocalStorage persistence

### **Animations:**
- ✅ Pokéballs disappearing (spin + shrink)
- ✅ Team Rocket slide-in
- ✅ Dialogue pop-up
- ✅ Rescue button pulse
- ✅ Victory sparkles (20 random)

### **Visual Indicators:**
- ✅ Stolen Pokémon (purple border + red R)
- ✅ Grayed out in Pokédex
- ✅ Team Rocket theme colors
- ✅ Witty dialogue (randomized)

### **Polish:**
- ✅ 5 appear dialogues
- ✅ 5 defeat dialogues
- ✅ Sound effects integration
- ✅ Smooth transitions
- ✅ Error handling

---

## 🎉 Impact on Gameplay

**Before:**
- Hunt → Catch → Repeat (predictable)

**After:**
- Hunt → Catch → *TEAM ROCKET!* → Chase → Rescue Battle → Victory!
- Adds excitement and unpredictability
- Creates stakes (risk losing Pokémon)
- Rewards skill (rescue battle)
- Encourages continued play
- Memorable moments

---

## 📝 Summary

**Files Modified:**
- `index.html` - Team Rocket encounter HTML + rescue button
- `style.css` - ~250 lines of Team Rocket styling + animations
- `app.js` - ~450 lines of Team Rocket logic

**Assets Required:**
- `teamrocket.png`
- `teamrocket_show.mp3`
- `teamrocket_battle.mp3`

**Result:**
A complete, polished random event system that significantly increases game replayability with iconic Pokémon villains, witty dialogue, dramatic animations, and rewarding gameplay! 🚀✨
