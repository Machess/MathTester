        // Kanto Pokémon (1-150)
        const pokemon = [
            "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", 
            "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree",
            "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot",
            "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok",
            "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina",
            "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable",
            "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat",
            "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat",
            "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck",
            "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag",
            "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop",
            "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool",
            "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash",
            "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo",
            "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder",
            "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee",
            "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute",
            "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung",
            "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela",
            "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu",
            "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar",
            "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto",
            "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte",
            "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno",
            "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew"
        ];

        let caughtPokemon = JSON.parse(localStorage.getItem('caughtPokemon')) || {};
        let injuredPokemon = JSON.parse(localStorage.getItem('injuredPokemon')) || []; // Track injured Pokemon
        let currentPokemon = null;
        let currentAnswer = 0;
        let isMuted = JSON.parse(localStorage.getItem('isMuted')) || false;
        let operationMode = localStorage.getItem('operationMode') || 'random';
        let gradeLevel = parseInt(localStorage.getItem('gradeLevel')) || 4;
        let allowedOperations = JSON.parse(localStorage.getItem('allowedOperations')) || ['addition', 'subtraction', 'multiplication', 'division'];
        let selectedBush = null;
        let pokemonInBush = false;
        let checkedBushes = []; // Track which bushes have been checked
        
        // Sound system
        let currentMusic = null;
        let isMusicPlaying = false;
        
        // Music tracks
        const musicTracks = {
            menu: 'assets/sounds/opening.mp3',
            hunt: 'assets/sounds/pallet_town_theme.mp3',
            battle: 'assets/sounds/opening.mp3',
            pokedex: 'assets/sounds/opening.mp3',
            pokecenter: 'assets/sounds/pokemon_center.mp3',
            gym: 'assets/sounds/pokemon_gym.mp3',
            catchFanfare: 'assets/sounds/fanfare_item_get.mp3',
            recovery: 'assets/sounds/pokemon_recovery.mp3'
        };

        // ===== GYM CHALLENGE SYSTEM =====
        
        // Gym definitions
        const gyms = [
            {
                id: 1,
                table: 2,
                name: "Pewter Gym",
                leader: "Brock",
                type: "Rock",
                badge: "Boulder Badge",
                icon: "🪨",
                color: "#8B7355",
                darkColor: "#5C4033",
                accentColor: "#A1887F",
                borderColor: "#3E2723",
                dialogue: {
                    entry: "Welcome to Pewter Gym! I'm Brock, the Rock-solid trainer!",
                    training: "Let's warm up! Multiply by 2 - as reliable as stone!",
                    preBattle: "My defenses are rock-hard! Let's see if your math is twice as strong!",
                    victory: "Your calculations crumbled my defense! Take the Boulder Badge!",
                },
                unlock: "healing" // Pokémon healing feature
            },
            {
                id: 2,
                table: 3,
                name: "Celadon Gym",
                leader: "Erika",
                type: "Grass",
                badge: "Rainbow Badge",
                icon: "🌿",
                color: "#81C784",
                darkColor: "#66BB6A",
                accentColor: "#AED581",
                borderColor: "#2E7D32",
                dialogue: {
                    entry: "Nature's beauty requires mathematical harmony!",
                    training: "Like leaves on a tree, multiplication by 3 grows naturally!",
                    preBattle: "My grass Pokémon multiply faster than you think! ×3 speed ahead!",
                    victory: "Your math bloomed beautifully! The Rainbow Badge is yours!",
                },
                unlock: "charmander_voice"
            },
            {
                id: 3,
                table: 4,
                name: "Cerulean Gym",
                leader: "Misty",
                type: "Water",
                badge: "Cascade Badge",
                icon: "💧",
                color: "#4FC3F7",
                darkColor: "#29B6F6",
                accentColor: "#81D4FA",
                borderColor: "#0277BD",
                dialogue: {
                    entry: "I'll show you the flowing power of water!",
                    training: "Water takes many forms - just like 4 × 1, 4 × 2, 4 × 3...",
                    preBattle: "My calculations flow in 4 streams! Can you keep up with the tide?",
                    victory: "You didn't drown in my math! Here's the Cascade Badge!",
                },
                unlock: "articuno" // Pokémon #144
            },
            {
                id: 4,
                table: 5,
                name: "Vermilion Gym",
                leader: "Lt. Surge",
                type: "Electric",
                badge: "Thunder Badge",
                icon: "⚡",
                color: "#FFD54F",
                darkColor: "#FFC107",
                accentColor: "#FFEB3B",
                borderColor: "#F57F17",
                dialogue: {
                    entry: "Hey kid! Ready for a shocking challenge?",
                    training: "Electric power multiplies by 5! ZAP! ZAP! ZAP!",
                    preBattle: "My Pokémon strike 5 times faster! BOOM! Let's battle!",
                    victory: "WHOA! You short-circuited my strategy! Thunder Badge earned!",
                },
                unlock: "zapdos" // Pokémon #145
            },
            {
                id: 5,
                table: 6,
                name: "Fuchsia Gym",
                leader: "Koga",
                type: "Poison",
                badge: "Soul Badge",
                icon: "☠️",
                color: "#9C27B0",
                darkColor: "#7B1FA2",
                accentColor: "#BA68C8",
                borderColor: "#4A148C",
                dialogue: {
                    entry: "Poison spreads silently... like multiplication by 6.",
                    training: "Each toxic drop multiplies. Master the ×6 technique!",
                    preBattle: "My poison compounds 6-fold! Prepare for a venomous challenge!",
                    victory: "Your mind proved immune to my tricks! Soul Badge awarded!",
                },
                unlock: "moltres" // Pokémon #146
            },
            {
                id: 6,
                table: 7,
                name: "Cinnabar Gym",
                leader: "Blaine",
                type: "Fire",
                badge: "Volcano Badge",
                icon: "🔥",
                color: "#FF6F00",
                darkColor: "#E65100",
                accentColor: "#FF9800",
                borderColor: "#BF360C",
                dialogue: {
                    entry: "HAHA! The heat of multiplication burns at ×7!",
                    training: "Fire spreads in 7 directions! Learn to control the blaze!",
                    preBattle: "My flames multiply rapidly! Can you handle the ×7 inferno?",
                    victory: "You extinguished my fire with pure math! Take the Volcano Badge!",
                },
                unlock: "pikachu_voice"
            },
            {
                id: 7,
                table: 8,
                name: "Saffron Gym",
                leader: "Sabrina",
                type: "Psychic",
                badge: "Marsh Badge",
                icon: "🔮",
                color: "#E91E63",
                darkColor: "#C2185B",
                accentColor: "#F48FB1",
                borderColor: "#880E4F",
                dialogue: {
                    entry: "I foresaw your arrival... and your struggle with ×8.",
                    training: "The mind works in 8 dimensions. Expand your calculations!",
                    preBattle: "My psychic power multiplies thought itself by 8! Face your mental challenge!",
                    victory: "Your mind was stronger than I predicted! Marsh Badge is yours!",
                },
                unlock: "jigglypuff_voice"
            },
            {
                id: 8,
                table: 9,
                name: "Seafoam Gym",
                leader: "Lorelei",
                type: "Ice",
                badge: "Glacier Badge",
                icon: "❄️",
                color: "#B3E5FC",
                darkColor: "#81D4FA",
                accentColor: "#E1F5FE",
                borderColor: "#01579B",
                dialogue: {
                    entry: "Welcome to my frozen sanctuary of multiplication!",
                    training: "Ice crystals form in 9-fold patterns. Study them carefully!",
                    preBattle: "My ice Pokémon freeze time! ×9 calculations in zero degrees!",
                    victory: "You melted my icy math! The Glacier Badge belongs to you!",
                },
                unlock: "mewtwo" // Pokémon #150
            },
            {
                id: 9,
                table: 10,
                name: "Dragon's Den",
                leader: "Lance",
                type: "Dragon",
                badge: "Dragon Badge",
                icon: "🐉",
                color: "#FFA726",
                darkColor: "#F57C00",
                accentColor: "#FFB74D",
                borderColor: "#E65100",
                dialogue: {
                    entry: "You've come far, trainer! But dragons multiply power by 10!",
                    training: "Master the table of 10 - the foundation of all multiplication!",
                    preBattle: "Dragon power is legendary! My ×10 mastery is unmatched! Show me your ultimate strength!",
                    victory: "INCREDIBLE! You've mastered the times tables! The Dragon Badge and the title of Math Champion are yours!",
                },
                unlock: "mew" // Pokémon #151
            }
        ];

        // Gym progress from localStorage
        let gymProgress = JSON.parse(localStorage.getItem('gymProgress')) || {
            unlockedGyms: [1],
            completedGyms: [],
            badges: [],
            healingUnlocked: false,
            voicesUnlocked: {
                charmander: false,
                pikachu: false,
                jigglypuff: false
            },
            legendariesUnlocked: {
                articuno: false,
                zapdos: false,
                moltres: false,
                mewtwo: false,
                mew: false
            }
        };

        // Current gym state
        let currentGym = null;
        let gymPhase = null; // 'training' or 'leader'
        let gymQuestions = [];
        let currentGymQuestion = 0;
        let currentGymPlayerIndex = 0; // Track which Pokémon is currently battling
        let gymPlayerHP = 100;
        let gymLeaderHP = 100;
        let gymSelectedTeam = [];
        
        // Battle backgrounds mapping
        const battleBackgrounds = {
            neutral: 'assets/backgrounds/neutral_bg.png',
            grass: 'assets/backgrounds/battle_backgrounds.png',
            water: 'assets/backgrounds/water_bg.png',
            ground: 'assets/backgrounds/ground_rock_bg.png',
            rock: 'assets/backgrounds/ground_rock_bg.png',
            ice: 'assets/backgrounds/ice_bg.png'
        };
        
        // Pokémon voices (audio files)
        const pokemonVoices = {
            'Charmander': 'assets/sounds/charmander.mp3',  // Corrected spelling
            'Pikachu': ['assets/sounds/pikachu.mp3', 'assets/sounds/pikachu2.mp3'],  // 2 variations
            'Jigglypuff': 'assets/sounds/jigglypuff.mp3'   // Lowercase
        };
        
        // Play Pokémon voice/cry
        function playPokemonVoice(pokemonName) {
            if (isMuted) return;
            
            // Check if voice is unlocked
            const voiceKey = pokemonName.toLowerCase();
            if (!gymProgress.voicesUnlocked || !gymProgress.voicesUnlocked[voiceKey]) {
                return; // Voice not unlocked yet
            }
            
            // Get audio file
            let audioFile = null;
            if (pokemonVoices[pokemonName]) {
                const voiceData = pokemonVoices[pokemonName];
                
                // If array (multiple sounds), pick random
                if (Array.isArray(voiceData)) {
                    const randomIndex = Math.floor(Math.random() * voiceData.length);
                    audioFile = voiceData[randomIndex];
                } else {
                    audioFile = voiceData;
                }
            }
            
            // Play sound
            if (audioFile) {
                const audio = new Audio(audioFile);
                audio.volume = 0.7;
                audio.play().catch(err => console.log('Could not play voice:', err));
            }
        }
        
        // ===== POKEBALL CATCH ANIMATION =====
        function playPokeballCatchAnimation(pokemonType = 'normal') {
            const container = document.getElementById('pokeballContainer');
            const pokeball = document.getElementById('pokeball');
            const flashOverlay = document.getElementById('flashOverlay');
            const modalSprite = document.getElementById('modalSprite');
            
            // Get type color for particles
            const typeColors = {
                fire: '#ff4500',
                water: '#4da6ff',
                electric: '#ffeb3b',
                grass: '#4CAF50',
                ice: '#87CEEB',
                fighting: '#C03028',
                poison: '#A040A0',
                ground: '#E0C068',
                flying: '#A890F0',
                psychic: '#F85888',
                bug: '#A8B820',
                rock: '#B8A038',
                ghost: '#705898',
                dragon: '#7038F8',
                dark: '#705848',
                steel: '#B8B8D0',
                fairy: '#EE99AC',
                normal: '#A8A878'
            };
            
            const color = typeColors[pokemonType] || '#ff0000';
            
            // Step 1: Show pokeball and throw it
            container.classList.add('active');
            pokeball.className = 'pokeball throwing';
            
            // Step 2: Flash and shrink Pokemon into ball
            setTimeout(() => {
                flashOverlay.classList.add('active');
                modalSprite.style.transition = 'transform 0.2s ease-out, opacity 0.2s';
                modalSprite.style.transform = 'scale(0)';
                modalSprite.style.opacity = '0';
                
                setTimeout(() => {
                    flashOverlay.classList.remove('active');
                }, 300);
            }, 800);
            
            // Step 3: Ball shakes 3 times
            setTimeout(() => {
                pokeball.className = 'pokeball shaking';
                
                // Create star particles during shakes
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        createParticle('star', '⭐', color, container);
                    }, i * 300);
                }
            }, 1000);
            
            // Step 4: Ball opens - CAUGHT!
            setTimeout(() => {
                pokeball.className = 'pokeball opening';
                flashOverlay.classList.add('active');
                
                // Create particle explosion
                setTimeout(() => {
                    createParticleExplosion(color, container);
                    flashOverlay.classList.remove('active');
                    
                    // Make sprite visible again and bring Pokemon back (zooming in)
                    modalSprite.style.visibility = 'visible';
                    modalSprite.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s';
                    modalSprite.style.transform = 'scale(1.2)';
                    modalSprite.style.opacity = '1';
                    
                    setTimeout(() => {
                        modalSprite.style.transform = 'scale(1)';
                    }, 100);
                }, 200);
            }, 3400);
            
            // Step 5: Cleanup
            setTimeout(() => {
                container.classList.remove('active');
                pokeball.className = 'pokeball';
                modalSprite.style.transform = '';
                modalSprite.style.opacity = '';
                modalSprite.style.transition = '';
            }, 4200);
        }

        function createParticle(type, emoji, color, container) {
            const particle = document.createElement('div');
            particle.className = `particle ${type}-particle`;
            particle.textContent = emoji;
            particle.style.color = color;
            particle.style.left = '50%';
            particle.style.top = '50%';
            
            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            particle.style.setProperty('--x', `${x}px`);
            particle.style.setProperty('--y', `${y}px`);
            
            container.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1500);
        }

        function createParticleExplosion(color, container) {
            // Energy ring
            const ring = document.createElement('div');
            ring.className = 'energy-ring';
            ring.style.borderColor = color;
            container.appendChild(ring);
            setTimeout(() => ring.remove(), 800);
            
            // Confetti particles
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle confetti-particle';
                particle.style.backgroundColor = color;
                particle.style.left = '50%';
                particle.style.top = '50%';
                
                const angle = (i / 20) * Math.PI * 2;
                const distance = 80 + Math.random() * 120;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                particle.style.setProperty('--x', `${x}px`);
                particle.style.setProperty('--y', `${y}px`);
                particle.style.animationDelay = `${Math.random() * 0.2}s`;
                
                container.appendChild(particle);
                setTimeout(() => particle.remove(), 1000);
            }
            
            // Star particles
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    createParticle('star', '⭐', '#FFD700', container);
                }, i * 50);
            }
            
            // Sparkle particles
            for (let i = 0; i < 12; i++) {
                setTimeout(() => {
                    createParticle('sparkle', '✨', color, container);
                }, i * 80);
            }
        }
        // ===== END POKEBALL ANIMATION =====

        // ===== BATTLE ATTACK ANIMATION SYSTEM =====
        
        // Type color mapping for attacks
        const typeColors = {
            fire: '#ff4500',
            water: '#4da6ff',
            electric: '#ffeb3b',
            grass: '#4CAF50',
            ice: '#87CEEB',
            fighting: '#C03028',
            poison: '#A040A0',
            ground: '#E0C068',
            flying: '#A890F0',
            psychic: '#F85888',
            bug: '#A8B820',
            rock: '#B8A038',
            ghost: '#705898',
            dragon: '#7038F8',
            dark: '#705848',
            steel: '#B8B8D0',
            fairy: '#EE99AC',
            normal: '#A8A878'
        };

        function playBattleAttackAnimation(attackerSide, attackType, damage, isSuper, effectiveness) {
            const color = typeColors[attackType] || '#A8A878';
            const attackerSprite = document.getElementById(attackerSide === 'player' ? 'playerSprite' : 'opponentSprite');
            const defenderSprite = document.getElementById(attackerSide === 'player' ? 'opponentSprite' : 'playerSprite');
            const battleField = document.getElementById('battleField');
            const flash = document.getElementById('battleFlash');
            
            // Step 1: Charge up (0.3s)
            attackerSprite.style.setProperty('--attack-color', color);
            attackerSprite.classList.add('charging');
            
            setTimeout(() => {
                attackerSprite.classList.remove('charging');
                
                // Step 2: Launch attack (0.5s)
                createAttackProjectile(attackerSide, attackType, color);
                
                setTimeout(() => {
                    // Step 3: Impact (0.4s)
                    // Screen flash
                    flash.style.setProperty('--flash-color', color);
                    flash.classList.add('active');
                    setTimeout(() => flash.classList.remove('active'), 300);
                    
                    // Screen shake for big hits
                    if (isSuper || damage >= 30) {
                        battleField.classList.add('screen-shake');
                        setTimeout(() => battleField.classList.remove('screen-shake'), 300);
                    }
                    
                    // Impact burst
                    createImpactBurst(defenderSprite, color);
                    
                    // Particles
                    createAttackParticles(defenderSprite, attackType, color, 15);
                    
                    // Damage number
                    showDamageNumber(defenderSprite, damage, color, isSuper);
                    
                    // Defender hit animation
                    defenderSprite.classList.add('hit');
                    setTimeout(() => defenderSprite.classList.remove('hit'), 500);
                    
                }, 500);
            }, 300);
        }

        function createAttackProjectile(attackerSide, attackType, color) {
            const container = document.querySelector('.battle-pokemon-display');
            const attackerDiv = document.querySelector(`.battle-pokemon.${attackerSide}-pokemon`);
            const defenderDiv = document.querySelector(`.battle-pokemon.${attackerSide === 'player' ? 'opponent' : 'player'}-pokemon`);
            
            if (!container || !attackerDiv || !defenderDiv) return;
            
            const projectile = document.createElement('div');
            projectile.className = 'attack-projectile';
            
            const beam = document.createElement('div');
            beam.className = 'attack-beam launching';
            beam.style.setProperty('--attack-color', color);
            beam.style.setProperty('--beam-distance', attackerSide === 'player' ? '400px' : '-400px');
            
            // Position projectile at attacker
            const attackerRect = attackerDiv.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            projectile.style.position = 'absolute';
            projectile.style.left = `${attackerRect.left - containerRect.left + attackerRect.width / 2}px`;
            projectile.style.top = `${attackerRect.top - containerRect.top + attackerRect.height / 2}px`;
            projectile.style.transform = attackerSide === 'player' ? 'rotate(0deg)' : 'rotate(180deg)';
            
            projectile.appendChild(beam);
            container.appendChild(projectile);
            
            setTimeout(() => projectile.remove(), 600);
        }

        function createImpactBurst(targetElement, color) {
            const burst = document.createElement('div');
            burst.className = 'impact-burst exploding';
            burst.style.setProperty('--attack-color', color);
            
            const rect = targetElement.getBoundingClientRect();
            const parent = targetElement.parentElement;
            const parentRect = parent.getBoundingClientRect();
            
            burst.style.position = 'absolute';
            burst.style.left = `${rect.left - parentRect.left + rect.width / 2 - 75}px`;
            burst.style.top = `${rect.top - parentRect.top + rect.height / 2 - 75}px`;
            
            parent.appendChild(burst);
            setTimeout(() => burst.remove(), 400);
        }

        function createAttackParticles(targetElement, attackType, color, count) {
            const parent = targetElement.parentElement;
            const rect = targetElement.getBoundingClientRect();
            const parentRect = parent.getBoundingClientRect();
            
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = `attack-particle ${attackType}-particle burst`;
                
                const angle = (i / count) * Math.PI * 2;
                const distance = 60 + Math.random() * 80;
                const px = Math.cos(angle) * distance;
                const py = Math.sin(angle) * distance;
                
                particle.style.setProperty('--px', `${px}px`);
                particle.style.setProperty('--py', `${py}px`);
                particle.style.position = 'absolute';
                particle.style.left = `${rect.left - parentRect.left + rect.width / 2}px`;
                particle.style.top = `${rect.top - parentRect.top + rect.height / 2}px`;
                particle.style.animationDelay = `${Math.random() * 0.1}s`;
                
                parent.appendChild(particle);
                setTimeout(() => particle.remove(), 900);
            }
        }

        function showDamageNumber(targetElement, damage, color, isSuper) {
            const dmgNum = document.createElement('div');
            dmgNum.className = 'damage-number float-up';
            dmgNum.textContent = `-${damage}`;
            dmgNum.style.setProperty('--damage-color', isSuper ? '#ff6b00' : color);
            
            const rect = targetElement.getBoundingClientRect();
            const parent = targetElement.parentElement;
            const parentRect = parent.getBoundingClientRect();
            
            dmgNum.style.position = 'absolute';
            dmgNum.style.left = `${rect.left - parentRect.left + rect.width / 2}px`;
            dmgNum.style.top = `${rect.top - parentRect.top}px`;
            dmgNum.style.transform = 'translateX(-50%)';
            
            if (isSuper) {
                dmgNum.textContent += ' ★';
                dmgNum.style.fontSize = '3.5em';
            }
            
            parent.appendChild(dmgNum);
            setTimeout(() => dmgNum.remove(), 1200);
        }
        // ===== END BATTLE ATTACK ANIMATION SYSTEM =====

        // Play background music
        function playBackgroundMusic(track) {
            if (isMuted) return;
            
            // Stop current music if playing
            if (currentMusic) {
                currentMusic.pause();
                currentMusic.currentTime = 0;
            }
            
            // Create new audio element
            currentMusic = new Audio(musicTracks[track]);
            currentMusic.loop = true;
            currentMusic.volume = 0.3;
            
            currentMusic.play().catch(err => {
                console.log('Music playback prevented:', err);
            });
            
            isMusicPlaying = true;
        }

        function stopBackgroundMusic() {
            if (currentMusic) {
                currentMusic.pause();
                currentMusic.currentTime = 0;
            }
            isMusicPlaying = false;
        }
        
        // Play catch fanfare (doesn't loop)
        function playCatchFanfare() {
            if (isMuted) return;
            
            const fanfare = new Audio(musicTracks.catchFanfare);
            fanfare.volume = 0.5;
            fanfare.play().catch(err => {
                console.log('Fanfare playback prevented:', err);
            });
        }
        
        // Legendary Pokemon (special fanfare)
        const legendaryPokemon = [144, 145, 146, 150, 151]; // Articuno, Zapdos, Moltres, Mewtwo, Mew
        
        // Battle system
        let selectedTeam = [];
        let currentBattle = null;
        let playerTeamIndex = 0;
        let opponentTeamIndex = 0;
        
        // Type advantage chart (simplified)
        const typeChart = {
            fire: { weak: ['water', 'rock', 'ground'], strong: ['grass', 'ice', 'bug'] },
            water: { weak: ['electric', 'grass'], strong: ['fire', 'ground', 'rock'] },
            electric: { weak: ['ground'], strong: ['water', 'flying'] },
            grass: { weak: ['fire', 'ice', 'poison', 'flying', 'bug'], strong: ['water', 'ground', 'rock'] },
            normal: { weak: ['fighting'], strong: [] },
            fighting: { weak: ['flying', 'psychic'], strong: ['normal', 'ice', 'rock'] },
            poison: { weak: ['ground', 'psychic'], strong: ['grass'] },
            ground: { weak: ['water', 'grass', 'ice'], strong: ['fire', 'electric', 'poison', 'rock'] },
            flying: { weak: ['electric', 'ice', 'rock'], strong: ['fighting', 'bug', 'grass'] },
            psychic: { weak: ['bug', 'ghost'], strong: ['fighting', 'poison'] },
            bug: { weak: ['fire', 'flying', 'rock'], strong: ['grass', 'psychic'] },
            rock: { weak: ['water', 'grass', 'fighting', 'ground'], strong: ['fire', 'ice', 'flying', 'bug'] },
            ghost: { weak: ['ghost'], strong: ['psychic', 'ghost'] },
            ice: { weak: ['fire', 'fighting', 'rock'], strong: ['grass', 'ground', 'flying'] },
            dragon: { weak: ['ice', 'dragon'], strong: ['dragon'] },
            dark: { weak: ['fighting', 'bug'], strong: ['psychic', 'ghost'] },
            steel: { weak: ['fire', 'fighting', 'ground'], strong: ['ice', 'rock'] },
            fairy: { weak: ['poison', 'steel'], strong: ['fighting', 'dragon', 'dark'] }
        };
        
        // Attack names by type
        const attacksByType = {
            fire: ['🔥 Flamethrower', '🔥 Fire Blast', '🔥 Ember'],
            water: ['💧 Hydro Pump', '💧 Water Gun', '💧 Surf'],
            electric: ['⚡ Thunderbolt', '⚡ Thunder', '⚡ Spark'],
            grass: ['🌿 Razor Leaf', '🌿 Solar Beam', '🌿 Vine Whip'],
            normal: ['⭐ Tackle', '⭐ Quick Attack', '⭐ Body Slam'],
            fighting: ['👊 Karate Chop', '👊 Low Kick', '👊 Submission'],
            poison: ['☠️ Poison Sting', '☠️ Sludge Bomb', '☠️ Acid'],
            ground: ['🌍 Earthquake', '🌍 Dig', '🌍 Sand Attack'],
            flying: ['🦅 Wing Attack', '🦅 Aerial Ace', '🦅 Gust'],
            psychic: ['🔮 Psychic', '🔮 Confusion', '🔮 Psybeam'],
            bug: ['🐛 Bug Bite', '🐛 String Shot', '🐛 Twineedle'],
            rock: ['🪨 Rock Throw', '🪨 Rock Slide', '🪨 Stone Edge'],
            ghost: ['👻 Shadow Ball', '👻 Lick', '👻 Night Shade'],
            ice: ['❄️ Ice Beam', '❄️ Blizzard', '❄️ Powder Snow'],
            dragon: ['🐉 Dragon Rage', '🐉 Outrage', '🐉 Dragon Claw'],
            dark: ['🌑 Bite', '🌑 Crunch', '🌑 Dark Pulse'],
            steel: ['⚙️ Iron Tail', '⚙️ Steel Wing', '⚙️ Metal Claw'],
            fairy: ['✨ Moonblast', '✨ Dazzling Gleam', '✨ Fairy Wind']
        };
        
        // Badge and stats system
        let gameStats = JSON.parse(localStorage.getItem('gameStats')) || {
            totalProblems: 0,
            correctAnswers: 0,
            currentStreak: 0,
            bestStreak: 0,
            operationCounts: { addition: 0, subtraction: 0, multiplication: 0, division: 0 },
            unlockedBadges: [],
            battlesWon: 0
        };

        // Sound Effects using Web Audio API and generated tones
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();

        // Sound effect: Success chime
        function playSuccessSound() {
            if (isMuted) return;
            
            const notes = [523.25, 659.25, 783.99]; // C-E-G chord
            notes.forEach((freq, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = freq;
                oscillator.type = 'sine';
                
                const startTime = audioContext.currentTime + (index * 0.1);
                gainNode.gain.setValueAtTime(0.3, startTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
                
                oscillator.start(startTime);
                oscillator.stop(startTime + 0.5);
            });
        }

        // Sound effect: Failure sound
        function playFailureSound() {
            if (isMuted) return;
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
            oscillator.type = 'sawtooth';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }

        // Sound effect: Bush rustling
        function playBushSound() {
            if (isMuted) return;
            
            // Create white noise for rustling effect
            const bufferSize = audioContext.sampleRate * 0.3;
            const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const output = buffer.getChannelData(0);
            
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
            
            const noise = audioContext.createBufferSource();
            noise.buffer = buffer;
            
            const filter = audioContext.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 1000;
            
            const gainNode = audioContext.createGain();
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            noise.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            noise.start(audioContext.currentTime);
            noise.stop(audioContext.currentTime + 0.3);
        }

        // Sound effect: Legendary fanfare
        function playLegendaryFanfare() {
            if (isMuted) return;
            
            const fanfare = [
                {freq: 523.25, duration: 0.2}, // C
                {freq: 659.25, duration: 0.2}, // E
                {freq: 783.99, duration: 0.2}, // G
                {freq: 1046.50, duration: 0.4}, // C (high)
                {freq: 783.99, duration: 0.2}, // G
                {freq: 1046.50, duration: 0.6}, // C (high)
            ];
            
            let currentTime = audioContext.currentTime;
            
            fanfare.forEach((note) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = note.freq;
                oscillator.type = 'triangle';
                
                gainNode.gain.setValueAtTime(0.4, currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);
                
                oscillator.start(currentTime);
                oscillator.stop(currentTime + note.duration);
                
                currentTime += note.duration;
            });
        }

        // Sound effect: Type-specific sounds
        function playTypeSound(types) {
            if (isMuted || !types || types.length === 0) return;
            
            const primaryType = types[0].type.name;
            
            switch(primaryType) {
                case 'electric':
                    // Electric zap - rapid frequency changes
                    for (let i = 0; i < 5; i++) {
                        const oscillator = audioContext.createOscillator();
                        const gainNode = audioContext.createGain();
                        
                        oscillator.connect(gainNode);
                        gainNode.connect(audioContext.destination);
                        
                        const startTime = audioContext.currentTime + (i * 0.05);
                        oscillator.frequency.setValueAtTime(800 + Math.random() * 400, startTime);
                        oscillator.type = 'square';
                        
                        gainNode.gain.setValueAtTime(0.2, startTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.05);
                        
                        oscillator.start(startTime);
                        oscillator.stop(startTime + 0.05);
                    }
                    break;
                    
                case 'fire':
                    // Fire whoosh - rising tone
                    const fireOsc = audioContext.createOscillator();
                    const fireGain = audioContext.createGain();
                    
                    fireOsc.connect(fireGain);
                    fireGain.connect(audioContext.destination);
                    
                    fireOsc.frequency.setValueAtTime(200, audioContext.currentTime);
                    fireOsc.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.4);
                    fireOsc.type = 'sawtooth';
                    
                    fireGain.gain.setValueAtTime(0.3, audioContext.currentTime);
                    fireGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                    
                    fireOsc.start(audioContext.currentTime);
                    fireOsc.stop(audioContext.currentTime + 0.4);
                    break;
                    
                case 'water':
                    // Water splash - low bubbling
                    for (let i = 0; i < 3; i++) {
                        const waterOsc = audioContext.createOscillator();
                        const waterGain = audioContext.createGain();
                        
                        waterOsc.connect(waterGain);
                        waterGain.connect(audioContext.destination);
                        
                        const startTime = audioContext.currentTime + (i * 0.1);
                        waterOsc.frequency.value = 150 + Math.random() * 100;
                        waterOsc.type = 'sine';
                        
                        waterGain.gain.setValueAtTime(0.2, startTime);
                        waterGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
                        
                        waterOsc.start(startTime);
                        waterOsc.stop(startTime + 0.2);
                    }
                    break;
                    
                case 'grass':
                    // Grass rustle - soft noise
                    const bufferSize = audioContext.sampleRate * 0.3;
                    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
                    const output = buffer.getChannelData(0);
                    
                    for (let i = 0; i < bufferSize; i++) {
                        output[i] = (Math.random() * 2 - 1) * 0.5;
                    }
                    
                    const grassNoise = audioContext.createBufferSource();
                    grassNoise.buffer = buffer;
                    
                    const grassFilter = audioContext.createBiquadFilter();
                    grassFilter.type = 'lowpass';
                    grassFilter.frequency.value = 2000;
                    
                    const grassGain = audioContext.createGain();
                    grassGain.gain.setValueAtTime(0.15, audioContext.currentTime);
                    grassGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    
                    grassNoise.connect(grassFilter);
                    grassFilter.connect(grassGain);
                    grassGain.connect(audioContext.destination);
                    
                    grassNoise.start(audioContext.currentTime);
                    grassNoise.stop(audioContext.currentTime + 0.3);
                    break;
                    
                default:
                    // Default sound for other types
                    playSuccessSound();
            }
        }

        // Routing system
        function navigateTo(page) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            
            // Show/hide nav bar
            if (page === 'menu') {
                document.getElementById('navBar').classList.add('hidden');
                document.getElementById('menuPage').classList.add('active');
                // Play menu music (Opening theme)
                if (!isMuted) {
                    playBackgroundMusic('menu');
                }
            } else {
                document.getElementById('navBar').classList.remove('hidden');
                
                // Update active nav button
                document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
                
                if (page === 'hunt') {
                    document.getElementById('huntPage').classList.add('active');
                    document.querySelectorAll('.nav-btn')[1].classList.add('active');
                    resetBushes(); // Reset bushes when returning to hunt page
                    // Play hunt music (Pallet Town)
                    if (!isMuted) {
                        playBackgroundMusic('hunt');
                    }
                } else if (page === 'gym') {
                    document.getElementById('gymPage').classList.add('active');
                    initializeGymMap(); // Show gym selection
                    // Play gym music
                    if (!isMuted) {
                        playBackgroundMusic('gym');
                    }
                } else if (page === 'pokecenter') {
                    document.getElementById('pokecenterPage').classList.add('active');
                    document.querySelectorAll('.nav-btn')[2].classList.add('active');
                    initializePokecenter(); // Show injured Pokemon
                    // Play pokecenter music (Pallet Town)
                    if (!isMuted) {
                        playBackgroundMusic('pokecenter');
                    }
                } else if (page === 'battle') {
                    document.getElementById('battlePage').classList.add('active');
                    document.querySelectorAll('.nav-btn')[3].classList.add('active');
                    initializeBattleMode(); // Initialize battle mode
                    // Play battle music (Opening theme)
                    if (!isMuted) {
                        playBackgroundMusic('battle');
                    }
                } else if (page === 'pokedex') {
                    document.getElementById('pokedexPage').classList.add('active');
                    document.querySelectorAll('.nav-btn')[4].classList.add('active');
                    initializeGrid(); // Refresh the grid when viewing
                    // Play pokedex music (Opening theme)
                    if (!isMuted) {
                        playBackgroundMusic('pokedex');
                    }
                }
            }
        }

        // Reset bushes for new round
        function resetBushes() {
            checkedBushes = [];
            document.querySelectorAll('.bush').forEach(bush => {
                bush.classList.remove('checked');
            });
            document.getElementById('bushHeader').textContent = 'Choose one';
        }

        // ===== POKÉMON CENTER FUNCTIONS =====
        let selectedForHealing = [];

        function initializePokecenter() {
            // Check if healing is unlocked (requires beating Gym 1)
            if (!gymProgress.healingUnlocked) {
                const list = document.getElementById('injuredPokemonList');
                list.innerHTML = `
                    <div class="pokecenter-locked-message">
                        <div class="lock-icon">🔒</div>
                        <h3>Pokémon Center Locked</h3>
                        <p>The healing machine is currently unavailable.</p>
                        <p><strong>Defeat Brock at Pewter Gym</strong> to unlock the Pokémon Center!</p>
                        <div class="unlock-hint">
                            🏛️ Visit the Gym Challenge and beat the first gym to unlock healing.
                        </div>
                    </div>
                `;
                document.getElementById('startHealingBtn').disabled = true;
                updateNurseMessage("I'm sorry, but the healing machine isn't working yet. Please come back after you've proven yourself at Pewter Gym!");
                return;
            }
            
            // Healing is unlocked, proceed normally
            selectedForHealing = [];
            updateInjuredPokemonList();
            resetHealingMachine();
            updateNurseMessage("Welcome to the Pokémon Center! Would you like me to heal your Pokémon?");
        }

        function updateInjuredPokemonList() {
            const list = document.getElementById('injuredPokemonList');
            
            if (injuredPokemon.length === 0) {
                list.innerHTML = '<div class="no-injured-message">All your Pokémon are healthy! 💚</div>';
                document.getElementById('startHealingBtn').disabled = true;
                return;
            }
            
            list.innerHTML = injuredPokemon.map((pokemonName, index) => {
                const pokemonIndex = pokemon.indexOf(pokemonName);
                const pokemonId = pokemonIndex + 1;
                
                return `
                    <div class="injured-pokemon-item" data-pokemon="${pokemonName}">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif" 
                             alt="${pokemonName}" 
                             class="injured-pokemon-sprite"
                             onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png'">
                        <div class="injured-pokemon-info">
                            <div class="injured-pokemon-name">${pokemonName}</div>
                            <div class="injured-status">❤️‍🩹 Fainted</div>
                        </div>
                    </div>
                `;
            }).join('');
            
            // Add event listeners after rendering
            document.querySelectorAll('.injured-pokemon-item').forEach(item => {
                item.addEventListener('click', function() {
                    togglePokemonSelection(this.dataset.pokemon);
                });
            });
        }

        function togglePokemonSelection(pokemonName) {
            const index = selectedForHealing.indexOf(pokemonName);
            
            if (index > -1) {
                // Deselect
                selectedForHealing.splice(index, 1);
            } else {
                // Select (max 3)
                if (selectedForHealing.length < 3) {
                    selectedForHealing.push(pokemonName);
                } else {
                    updateNurseMessage("You can only heal 3 Pokémon at a time!");
                    return;
                }
            }
            
            updateSelectionUI();
        }

        function updateSelectionUI() {
            // Update visual selection
            document.querySelectorAll('.injured-pokemon-item').forEach(item => {
                const pokemonName = item.querySelector('.injured-pokemon-name').textContent;
                if (selectedForHealing.includes(pokemonName)) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            });
            
            // Enable/disable heal button
            document.getElementById('startHealingBtn').disabled = selectedForHealing.length === 0;
            
            // Update message
            if (selectedForHealing.length > 0) {
                updateNurseMessage(`${selectedForHealing.length} Pokémon selected. Ready to heal!`);
            } else {
                updateNurseMessage("Please select Pokémon to heal (up to 3).");
            }
        }

        function startHealing() {
            if (selectedForHealing.length === 0) return;
            
            // Disable button during healing
            document.getElementById('startHealingBtn').disabled = true;
            
            // Update message
            updateNurseMessage("Okay! I'll heal your Pokémon. Just a moment...");
            
            // Place pokeballs on machine
            selectedForHealing.forEach((pokemon, index) => {
                setTimeout(() => {
                    const slot = document.getElementById(`slot${index + 1}`);
                    slot.classList.add('filled');
                }, index * 300);
            });
            
            // Start healing animation after all pokeballs are placed
            setTimeout(() => {
                performHealing();
            }, selectedForHealing.length * 300 + 500);
        }

        function performHealing() {
            // Start blinking animation
            document.querySelectorAll('.machine-pokeball-slot.filled').forEach(slot => {
                slot.classList.add('healing');
            });
            
            // Pulsing machine light
            const machineLight = document.getElementById('machineLight');
            if (machineLight) {
                machineLight.classList.add('healing');
            }
            
            // Play recovery sound
            playRecoverySound();
            
            // Healing takes 6 seconds (recovery sound duration)
            setTimeout(() => {
                completeHealing();
            }, 6000);
        }

        function completeHealing() {
            // Stop animations
            document.querySelectorAll('.machine-pokeball-slot').forEach(slot => {
                slot.classList.remove('healing');
            });
            const machineLight = document.getElementById('machineLight');
            if (machineLight) {
                machineLight.classList.remove('healing');
            }
            
            // Remove from injured list
            selectedForHealing.forEach(pokemonName => {
                const index = injuredPokemon.indexOf(pokemonName);
                if (index > -1) {
                    injuredPokemon.splice(index, 1);
                }
            });
            
            // Save to localStorage
            localStorage.setItem('injuredPokemon', JSON.stringify(injuredPokemon));
            
            // Update message
            updateNurseMessage("Your Pokémon are now fully healed! We hope to see you again! 💚");
            
            // Reset after 2 seconds
            setTimeout(() => {
                selectedForHealing = [];
                resetHealingMachine();
                updateInjuredPokemonList();
                
                if (injuredPokemon.length > 0) {
                    updateNurseMessage("Would you like to heal more Pokémon?");
                }
            }, 2000);
        }

        function resetHealingMachine() {
            document.querySelectorAll('.machine-pokeball-slot').forEach(slot => {
                slot.classList.remove('filled', 'healing');
            });
            const machineLight = document.getElementById('machineLight');
            if (machineLight) {
                machineLight.classList.remove('healing');
            }
            updateNurseMessage("Welcome to the Pokémon Center! Would you like me to heal your Pokémon?");
        }

        function updateNurseMessage(message) {
            document.getElementById('nurseText').textContent = message;
        }

        function playRecoverySound() {
            if (isMuted) return;
            
            const audio = new Audio(musicTracks.recovery);
            audio.volume = 0.5;
            audio.play().catch(err => console.log('Could not play recovery sound:', err));
        }

        // Mark Pokemon as injured after battle loss
        function markPokemonAsInjured(pokemonName) {
            if (!injuredPokemon.includes(pokemonName)) {
                injuredPokemon.push(pokemonName);
                localStorage.setItem('injuredPokemon', JSON.stringify(injuredPokemon));
            }
        }

        // Check if Pokemon can battle
        function canPokemonBattle(pokemonName) {
            return !injuredPokemon.includes(pokemonName);
        }

        // Bush selection - ALWAYS show math problem
        function selectBush(bushIndex) {
            // Don't allow selecting already checked bushes
            if (checkedBushes.includes(bushIndex)) {
                return;
            }

            // Play bush rustling sound
            playBushSound();

            selectedBush = bushIndex;
            
            // Only 1 in 3 bushes has a Pokémon (33% chance)
            pokemonInBush = Math.random() < 0.33;
            
            if (pokemonInBush) {
                // Pokémon found! Pick random uncaught one
                const uncaught = [];
                for (let i = 1; i <= 151; i++) { // Include all 151 Pokémon (including Mew!)
                    if (!caughtPokemon[i]) {
                        // Check if legendary is unlocked before allowing it to spawn
                        if (i === 144 && !gymProgress.legendariesUnlocked.articuno) continue; // Articuno - requires Gym 3
                        if (i === 145 && !gymProgress.legendariesUnlocked.zapdos) continue;   // Zapdos - requires Gym 4
                        if (i === 146 && !gymProgress.legendariesUnlocked.moltres) continue;  // Moltres - requires Gym 5
                        if (i === 150 && !gymProgress.legendariesUnlocked.mewtwo) continue;   // Mewtwo - requires Gym 8
                        if (i === 151 && !gymProgress.legendariesUnlocked.mew) continue;      // Mew - requires Gym 9
                        
                        uncaught.push(i);
                    }
                }
                if (uncaught.length > 0) {
                    const randomIndex = Math.floor(Math.random() * uncaught.length);
                    const pokemonNumber = uncaught[randomIndex];
                    openModalWithPokemon(pokemonNumber, pokemon[pokemonNumber - 1]);
                } else {
                    // All available caught!
                    alert('You\'ve caught all available Pokémon! 🎉\n\nBeat more gyms to unlock legendary Pokémon!');
                    navigateTo('pokedex');
                }
            } else {
                // Empty bush - but still show math problem!
                openModalWithoutPokemon();
            }
        }

        // Open modal with a Pokémon
        function openModalWithPokemon(number, name) {
            currentPokemon = { number, name };
            const mathData = generateMathProblem();
            currentAnswer = mathData.answer;

            // Play Pokémon cry sound
            playPokemonCry(number);

            document.getElementById('modalSprite').src = getPokemonSpriteUrl(number, false);
            document.getElementById('modalSprite').alt = name;
            document.getElementById('mathProblem').textContent = `${mathData.problem} = ?`;
            document.getElementById('submitBtn').textContent = 'Catch Pokémon!';
            document.getElementById('answerInput').value = '';
            document.getElementById('feedback').textContent = '';
            document.getElementById('feedback').className = 'feedback';
            document.getElementById('celebration').style.display = 'none';
            document.getElementById('mathModal').classList.add('active');
            document.getElementById('answerInput').focus();
        }

        // Open modal without a Pokémon (empty bush)
        function openModalWithoutPokemon() {
            currentPokemon = null; // No Pokémon in this bush
            const mathData = generateMathProblem();
            currentAnswer = mathData.answer;

            // Show question mark or empty bush sprite
            document.getElementById('modalSprite').src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
            document.getElementById('modalSprite').alt = 'Empty';
            document.getElementById('mathProblem').textContent = `Nothing here... ${mathData.problem} = ?`;
            document.getElementById('submitBtn').textContent = 'Continue Searching';
            document.getElementById('answerInput').value = '';
            document.getElementById('feedback').textContent = '';
            document.getElementById('feedback').className = 'feedback';
            document.getElementById('celebration').style.display = 'none';
            document.getElementById('mathModal').classList.add('active');
            document.getElementById('answerInput').focus();
        }

        // Helper function to count Pokemon by type
        function countPokemonByType(typeName) {
            let count = 0;
            for (let pokemonNum in caughtPokemon) {
                // We'll need to fetch type data - for now use a simplified approach
                // This will be populated when we catch Pokemon
                if (pokemonTypeCache[pokemonNum] && pokemonTypeCache[pokemonNum].includes(typeName)) {
                    count++;
                }
            }
            return count;
        }
        
        // Cache for Pokemon types (populated as we catch them)
        let pokemonTypeCache = JSON.parse(localStorage.getItem('pokemonTypeCache')) || {};
        
        // Badge definitions
        const badges = [
            // TYPE MASTER BADGES (10 types with 10+ Pokémon in Gen 1)
            { id: 'flame_badge', name: 'Flame Badge', icon: '🔥', description: 'Catch 10 Fire-type Pokémon', requirement: () => countPokemonByType('fire') >= 10 },
            { id: 'wave_badge', name: 'Wave Badge', icon: '💧', description: 'Catch 10 Water-type Pokémon', requirement: () => countPokemonByType('water') >= 10 },
            { id: 'leaf_badge', name: 'Leaf Badge', icon: '🌿', description: 'Catch 10 Grass-type Pokémon', requirement: () => countPokemonByType('grass') >= 10 },
            { id: 'toxic_badge', name: 'Toxic Badge', icon: '☠️', description: 'Catch 10 Poison-type Pokémon', requirement: () => countPokemonByType('poison') >= 10 },
            { id: 'terra_badge', name: 'Terra Badge', icon: '🌍', description: 'Catch 10 Ground-type Pokémon', requirement: () => countPokemonByType('ground') >= 10 },
            { id: 'sky_badge', name: 'Sky Badge', icon: '🦅', description: 'Catch 10 Flying-type Pokémon', requirement: () => countPokemonByType('flying') >= 10 },
            { id: 'mind_badge', name: 'Mind Badge', icon: '🔮', description: 'Catch 10 Psychic-type Pokémon', requirement: () => countPokemonByType('psychic') >= 10 },
            { id: 'swarm_badge', name: 'Swarm Badge', icon: '🐛', description: 'Catch 10 Bug-type Pokémon', requirement: () => countPokemonByType('bug') >= 10 },
            { id: 'stone_badge', name: 'Stone Badge', icon: '🪨', description: 'Catch 10 Rock-type Pokémon', requirement: () => countPokemonByType('rock') >= 10 },
            { id: 'hero_badge', name: 'Hero Badge', icon: '⭐', description: 'Catch 10 Normal-type Pokémon', requirement: () => countPokemonByType('normal') >= 10 },
            
            // COLLECTION MILESTONE BADGES
            { id: 'explorer_badge', name: 'Explorer Badge', icon: '🎒', description: 'Catch 25 different Pokémon', requirement: () => Object.keys(caughtPokemon).length >= 25 },
            { id: 'adventurer_badge', name: 'Adventurer Badge', icon: '🗺️', description: 'Catch 50 different Pokémon', requirement: () => Object.keys(caughtPokemon).length >= 50 },
            { id: 'champion_badge', name: 'Champion Badge', icon: '🏅', description: 'Catch 100 different Pokémon', requirement: () => Object.keys(caughtPokemon).length >= 100 },
            { id: 'master_trainer_badge', name: 'Master Trainer Badge', icon: '👑', description: 'Catch all 150 Pokémon', requirement: () => Object.keys(caughtPokemon).length >= 150 },
            
            // MATH MASTERY BADGES (Total correct answers, not streaks)
            { id: 'scholar_badge', name: 'Scholar Badge', icon: '📚', description: 'Answer 75 math problems correctly', requirement: () => gameStats.correctAnswers >= 75 },
            { id: 'mathematician_badge', name: 'Mathematician Badge', icon: '🧮', description: 'Answer 150 math problems correctly', requirement: () => gameStats.correctAnswers >= 150 },
            { id: 'professor_badge', name: 'Professor Badge', icon: '🎓', description: 'Answer 250 math problems correctly', requirement: () => gameStats.correctAnswers >= 250 },
            
            // PERFECT STREAK BADGES (Different from total count)
            { id: 'boulder_badge', name: 'Boulder Badge', icon: '🥉', description: 'Win 10 in a row', requirement: () => gameStats.currentStreak >= 10 },
            { id: 'cascade_badge', name: 'Cascade Badge', icon: '🥈', description: 'Win 25 in a row', requirement: () => gameStats.currentStreak >= 25 },
            { id: 'thunder_badge', name: 'Thunder Badge', icon: '🥇', description: 'Win 50 in a row', requirement: () => gameStats.currentStreak >= 50 },
            { id: 'rainbow_badge', name: 'Rainbow Badge', icon: '🏆', description: 'Win 100 in a row', requirement: () => gameStats.currentStreak >= 100 },
            
            // BATTLE VICTORY BADGES
            { id: 'rookie_trainer', name: 'Rookie Trainer', icon: '⚔️', description: 'Win your first battle', requirement: () => (gameStats.battlesWon || 0) >= 1 },
            { id: 'experienced_trainer', name: 'Experienced Trainer', icon: '🗡️', description: 'Win 10 battles', requirement: () => (gameStats.battlesWon || 0) >= 10 },
            { id: 'veteran_trainer', name: 'Veteran Trainer', icon: '🛡️', description: 'Win 25 battles', requirement: () => (gameStats.battlesWon || 0) >= 25 },
            { id: 'battle_master', name: 'Battle Master', icon: '👑', description: 'Win 50 battles', requirement: () => (gameStats.battlesWon || 0) >= 50 }
        ];

        // Set grade level
        function setGradeLevel(grade) {
            gradeLevel = parseInt(grade);
            localStorage.setItem('gradeLevel', gradeLevel);
        }

        // Save game stats
        function saveGameStats() {
            localStorage.setItem('gameStats', JSON.stringify(gameStats));
        }

        // Check and unlock badges
        function checkBadges() {
            const newlyUnlocked = [];
            
            badges.forEach(badge => {
                if (!gameStats.unlockedBadges.includes(badge.id) && badge.requirement()) {
                    gameStats.unlockedBadges.push(badge.id);
                    newlyUnlocked.push(badge);
                }
            });

            if (newlyUnlocked.length > 0) {
                saveGameStats();
                updateBadgeCount();
                // Show popup for first new badge
                showNewBadgePopup(newlyUnlocked[0]);
            }
        }

        // Show new badge popup
        function showNewBadgePopup(badge) {
            document.getElementById('newBadgeIcon').textContent = badge.icon;
            document.getElementById('newBadgeName').textContent = badge.name;
            const popup = document.getElementById('newBadgePopup');
            popup.style.display = 'block';
            
            setTimeout(() => {
                popup.style.display = 'none';
            }, 3000);
        }

        // Update badge count display
        function updateBadgeCount() {
            const count = gameStats.unlockedBadges.length;
            const badgeCountEl = document.getElementById('badge-count');
            const badgeCountMenuEl = document.getElementById('badge-count-menu');
            
            if (badgeCountEl) badgeCountEl.textContent = count;
            if (badgeCountMenuEl) badgeCountMenuEl.textContent = count;
        }

        // Update streak display
        function updateStreakDisplay() {
            const streakCountEl = document.getElementById('streak-count');
            if (streakCountEl) {
                streakCountEl.textContent = gameStats.currentStreak;
            }
        }

        // Track operation type from current problem
        let lastOperationType = null;

        // Set operation mode
        function setOperation(mode) {
            operationMode = mode;
            localStorage.setItem('operationMode', mode);
            
            // Update button states (only if operation buttons exist)
            const operationButtons = document.querySelectorAll('.operation-btn');
            if (operationButtons.length > 0) {
                operationButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                const targetBtn = document.querySelector(`[data-operation="${mode}"]`);
                if (targetBtn) {
                    targetBtn.classList.add('active');
                }
            }
        }

        // Toggle mute on/off
        function toggleMute() {
            isMuted = !isMuted;
            localStorage.setItem('isMuted', JSON.stringify(isMuted));
            updateMuteButton();
            
            // Handle background music
            if (isMuted) {
                stopBackgroundMusic();
            } else {
                // Resume audio context if needed
                if (audioContext.state === 'suspended') {
                    audioContext.resume();
                }
            }
        }

        // Update mute button appearance
        function updateMuteButton() {
            const button = document.getElementById('muteButton');
            if (!button) return; // Exit if button doesn't exist
            
            if (isMuted) {
                button.textContent = '🔇';
                button.classList.add('muted');
                button.title = 'Sound Off - Click to Unmute';
            } else {
                button.textContent = '🔊';
                button.classList.remove('muted');
                button.title = 'Sound On - Click to Mute';
            }
        }

        // Generate grade-appropriate math problem
        function generateMathProblem() {
            // Define difficulty parameters by grade level
            const gradeDifficulty = {
                1: { // Age 6 - Very basic addition/subtraction
                    addition: { min: 1, max: 10 },
                    subtraction: { min: 1, max: 10 },
                    multiplication: null, // Not appropriate yet
                    division: null
                },
                2: { // Age 7 - Simple addition/subtraction
                    addition: { min: 1, max: 20 },
                    subtraction: { min: 1, max: 20 },
                    multiplication: { min: 1, max: 5, maxProduct: 25 },
                    division: null
                },
                3: { // Age 8 - Larger numbers, intro multiplication
                    addition: { min: 5, max: 50 },
                    subtraction: { min: 5, max: 50 },
                    multiplication: { min: 2, max: 10, maxProduct: 50 },
                    division: { divisor: [2, 3, 4, 5], quotient: [2, 10] }
                },
                4: { // Age 9 - Standard multiplication tables
                    addition: { min: 10, max: 100 },
                    subtraction: { min: 10, max: 100 },
                    multiplication: { min: 2, max: 12, maxProduct: 144 },
                    division: { divisor: [2, 12], quotient: [2, 12] }
                },
                5: { // Age 10 - Larger multiplication, division
                    addition: { min: 20, max: 200 },
                    subtraction: { min: 20, max: 200 },
                    multiplication: { min: 5, max: 15, maxProduct: 225 },
                    division: { divisor: [2, 15], quotient: [2, 15] }
                },
                6: { // Age 11 - Multi-digit operations
                    addition: { min: 50, max: 500 },
                    subtraction: { min: 50, max: 500 },
                    multiplication: { min: 10, max: 25, maxProduct: 625 },
                    division: { divisor: [5, 20], quotient: [5, 20] }
                },
                7: { // Age 12 - Larger numbers
                    addition: { min: 100, max: 1000 },
                    subtraction: { min: 100, max: 1000 },
                    multiplication: { min: 15, max: 35, maxProduct: 1225 },
                    division: { divisor: [10, 25], quotient: [10, 25] }
                },
                8: { // Age 13 - More complex
                    addition: { min: 200, max: 2000 },
                    subtraction: { min: 200, max: 2000 },
                    multiplication: { min: 20, max: 50, maxProduct: 2500 },
                    division: { divisor: [15, 35], quotient: [15, 35] }
                },
                9: { // Age 14 - Advanced
                    addition: { min: 500, max: 5000 },
                    subtraction: { min: 500, max: 5000 },
                    multiplication: { min: 25, max: 75, maxProduct: 5625 },
                    division: { divisor: [20, 50], quotient: [20, 50] }
                },
                10: { // Age 15-16 - Most challenging
                    addition: { min: 1000, max: 10000 },
                    subtraction: { min: 1000, max: 10000 },
                    multiplication: { min: 50, max: 100, maxProduct: 10000 },
                    division: { divisor: [25, 75], quotient: [25, 75] }
                }
            };

            const difficulty = gradeDifficulty[gradeLevel];

            const operations = {
                addition: () => {
                    if (!difficulty.addition) return null;
                    const a = Math.floor(Math.random() * (difficulty.addition.max - difficulty.addition.min + 1)) + difficulty.addition.min;
                    const b = Math.floor(Math.random() * (difficulty.addition.max - difficulty.addition.min + 1)) + difficulty.addition.min;
                    lastOperationType = 'addition';
                    return { problem: `${a} + ${b}`, answer: a + b };
                },
                subtraction: () => {
                    if (!difficulty.subtraction) return null;
                    const a = Math.floor(Math.random() * (difficulty.subtraction.max - difficulty.subtraction.min + 1)) + difficulty.subtraction.min;
                    const b = Math.floor(Math.random() * a) + 1; // Ensure b < a for positive result
                    lastOperationType = 'subtraction';
                    return { problem: `${a} - ${b}`, answer: a - b };
                },
                multiplication: () => {
                    if (!difficulty.multiplication) return null;
                    const a = Math.floor(Math.random() * (difficulty.multiplication.max - difficulty.multiplication.min + 1)) + difficulty.multiplication.min;
                    const b = Math.floor(Math.random() * (difficulty.multiplication.max - difficulty.multiplication.min + 1)) + difficulty.multiplication.min;
                    lastOperationType = 'multiplication';
                    return { problem: `${a} × ${b}`, answer: a * b };
                },
                division: () => {
                    if (!difficulty.division) return null;
                    const divisor = Math.floor(Math.random() * (difficulty.division.divisor[1] - difficulty.division.divisor[0] + 1)) + difficulty.division.divisor[0];
                    const quotient = Math.floor(Math.random() * (difficulty.division.quotient[1] - difficulty.division.quotient[0] + 1)) + difficulty.division.quotient[0];
                    const dividend = divisor * quotient;
                    lastOperationType = 'division';
                    return { problem: `${dividend} ÷ ${divisor}`, answer: quotient };
                }
            };

            // If random mode, pick a random operation that's available for this grade AND allowed in settings
            if (operationMode === 'random') {
                const availableOps = [];
                if (difficulty.addition && allowedOperations.includes('addition')) availableOps.push('addition');
                if (difficulty.subtraction && allowedOperations.includes('subtraction')) availableOps.push('subtraction');
                if (difficulty.multiplication && allowedOperations.includes('multiplication')) availableOps.push('multiplication');
                if (difficulty.division && allowedOperations.includes('division')) availableOps.push('division');
                
                if (availableOps.length === 0) {
                    // Fallback to addition if nothing available
                    return operations.addition();
                }
                
                const randomType = availableOps[Math.floor(Math.random() * availableOps.length)];
                return operations[randomType]();
            }

            // Otherwise use the selected operation (if available for this grade AND allowed)
            if (!allowedOperations.includes(operationMode)) {
                // If selected operation not allowed, pick from allowed ones
                const availableOps = [];
                if (difficulty.addition && allowedOperations.includes('addition')) availableOps.push('addition');
                if (difficulty.subtraction && allowedOperations.includes('subtraction')) availableOps.push('subtraction');
                if (difficulty.multiplication && allowedOperations.includes('multiplication')) availableOps.push('multiplication');
                if (difficulty.division && allowedOperations.includes('division')) availableOps.push('division');
                
                if (availableOps.length > 0) {
                    const randomType = availableOps[Math.floor(Math.random() * availableOps.length)];
                    return operations[randomType]();
                }
                return operations.addition();
            }
            
            const result = operations[operationMode]();
            
            // If operation not available for this grade, fall back to an allowed operation
            if (!result) {
                const availableOps = [];
                if (difficulty.addition && allowedOperations.includes('addition')) availableOps.push('addition');
                if (difficulty.subtraction && allowedOperations.includes('subtraction')) availableOps.push('subtraction');
                if (difficulty.multiplication && allowedOperations.includes('multiplication')) availableOps.push('multiplication');
                if (difficulty.division && allowedOperations.includes('division')) availableOps.push('division');
                
                if (availableOps.length > 0) {
                    const randomType = availableOps[Math.floor(Math.random() * availableOps.length)];
                    return operations[randomType]();
                }
                return operations.addition();
            }
            
            return result;
        }

        // Screen navigation
        function startGame() {
            // Resume audio context on user interaction
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            
            // Start Pallet Town music for hunt screen
            if (!isMuted) {
                playBackgroundMusic('hunt');
            }
            
            navigateTo('hunt');
        }

        // Start battle mode from menu
        function startBattleFromMenu() {
            // Resume audio context on user interaction
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            
            // Start battle music
            if (!isMuted) {
                playBackgroundMusic('battle');
            }
            
            navigateTo('battle');
        }

        // ===== GYM CHALLENGE SYSTEM FUNCTIONS =====
        
        // Initialize gym map
        function initializeGymMap() {
            // Show map view, hide others
            document.getElementById('gymMapView').style.display = 'block';
            document.getElementById('gymEntranceView').style.display = 'none';
            document.getElementById('gymTrainingView').style.display = 'none';
            document.getElementById('gymBattleView').style.display = 'none';
            document.getElementById('gymVictoryView').style.display = 'none';
            document.getElementById('gymDefeatView').style.display = 'none';
            
            renderGymGrid();
        }

        // Render gym selection grid
        function renderGymGrid() {
            const grid = document.getElementById('gymGrid');
            grid.innerHTML = '';
            
            gyms.forEach(gym => {
                const isUnlocked = gymProgress.unlockedGyms.includes(gym.id);
                const isCompleted = gymProgress.completedGyms.includes(gym.id);
                
                const card = document.createElement('div');
                card.className = `gym-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCompleted ? 'completed' : ''}`;
                card.style.borderColor = gym.borderColor;
                
                card.innerHTML = `
                    <div class="gym-icon">${gym.icon}</div>
                    <div class="gym-name">${gym.name}</div>
                    <div class="gym-leader">Leader: ${gym.leader}</div>
                    <div class="gym-table-info">Times Table: ×${gym.table}</div>
                    ${isCompleted ? `<div class="gym-badge-display">${gym.badge} ✅</div>` : ''}
                    <div class="gym-status ${isCompleted ? 'completed' : (isUnlocked ? 'unlocked' : 'locked')}">
                        ${isCompleted ? '⭐ Completed' : (isUnlocked ? '🔓 Unlocked' : '🔒 Locked')}
                    </div>
                `;
                
                if (isUnlocked) {
                    card.onclick = () => enterGym(gym.id);
                }
                
                grid.appendChild(card);
            });
        }

        // Enter a gym
        function enterGym(gymId) {
            currentGym = gyms.find(g => g.id === gymId);
            if (!currentGym) return;
            
            gymSelectedTeam = [];
            gymPhase = null;
            
            // Show entrance view
            document.getElementById('gymMapView').style.display = 'none';
            document.getElementById('gymEntranceView').style.display = 'block';
            
            renderGymEntrance();
        }

        // Render gym entrance
        function renderGymEntrance() {
            const content = document.getElementById('gymEntranceContent');
            
            // Individual gym leader sprite files
            const leaderSprites = {
                1: 'assets/images/brok.png',      // Brock
                2: 'assets/images/erika.png',     // Erika
                3: 'assets/images/misty.png',     // Misty
                4: 'assets/images/surge.png',     // Lt. Surge
                5: 'assets/images/koga.png',      // Koga
                6: 'assets/images/blaine.png',    // Blaine
                7: 'assets/images/sabrina.png',   // Sabrina
                8: 'assets/images/lorelei.png',   // Lorelei
                9: 'assets/images/lance.png'      // Lance
            };
            
            const spriteFile = leaderSprites[currentGym.id] || 'assets/images/brok.png';
            
            content.innerHTML = `
                <div class="gym-entrance-banner" style="background: linear-gradient(135deg, ${currentGym.color} 0%, ${currentGym.darkColor} 100%); border-color: ${currentGym.borderColor};">
                    <div class="gym-entrance-icon">${currentGym.icon}</div>
                    <div class="gym-leader-sprite-container">
                        <img src="${spriteFile}" alt="${currentGym.leader}" class="gym-leader-sprite-img">
                    </div>
                    <div class="gym-entrance-name">${currentGym.name}</div>
                    <div class="gym-leader-intro">Gym Leader: ${currentGym.leader}</div>
                    <div class="gym-dialogue">"${currentGym.dialogue.entry}"</div>
                </div>
                
                <div class="gym-team-selection">
                    <div class="team-selection-title">Select Your Team (Choose 2 Pokémon)</div>
                    <div class="gym-selected-team" id="gymSelectedTeam">
                        <div class="selected-pokemon-display">Empty</div>
                        <div class="selected-pokemon-display">Empty</div>
                    </div>
                    <div class="gym-pokemon-selection" id="gymPokemonSelection"></div>
                    <button class="start-training-btn" id="startTrainingBtn" onclick="startGymTraining()" disabled>
                        Begin Training! 📚
                    </button>
                </div>
            `;
            
            renderGymPokemonSelection();
        }

        // Render pokemon selection for gym
        function renderGymPokemonSelection() {
            const container = document.getElementById('gymPokemonSelection');
            container.innerHTML = '';
            
            // Loop through all Pokemon and show only caught ones
            pokemon.forEach((pokemonName, index) => {
                const pokemonNumber = index + 1;
                const isCaught = caughtPokemon[pokemonNumber];
                
                if (!isCaught) return; // Skip uncaught Pokemon
                
                const slot = document.createElement('div');
                slot.className = 'gym-pokemon-slot';
                
                const isSelected = gymSelectedTeam.includes(pokemonName);
                if (isSelected) slot.classList.add('selected');
                
                slot.innerHTML = `
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png" 
                         alt="${pokemonName}" style="width: 60px; height: 60px;">
                    <div style="font-size: 0.8em; font-weight: 600;">${pokemonName}</div>
                `;
                
                slot.onclick = () => toggleGymTeamSelection(pokemonName);
                container.appendChild(slot);
            });
            
            // Show message if no Pokemon caught
            if (Object.keys(caughtPokemon).length === 0) {
                container.innerHTML = '<div style="padding: 40px; text-align: center; color: #666;">No Pokémon caught yet! Go hunt some first!</div>';
            }
        }

        // Toggle pokemon selection for gym
        function toggleGymTeamSelection(pokemonName) {
            const index = gymSelectedTeam.indexOf(pokemonName);
            
            if (index > -1) {
                // Remove from team
                gymSelectedTeam.splice(index, 1);
            } else {
                // Add to team (max 2)
                if (gymSelectedTeam.length < 2) {
                    gymSelectedTeam.push(pokemonName);
                }
            }
            
            // Update UI
            updateGymSelectedTeam();
            renderGymPokemonSelection();
        }

        // Update selected team display
        function updateGymSelectedTeam() {
            const teamDisplay = document.getElementById('gymSelectedTeam');
            teamDisplay.innerHTML = '';
            
            for (let i = 0; i < 2; i++) {
                const slot = document.createElement('div');
                slot.className = 'selected-pokemon-display';
                
                if (gymSelectedTeam[i]) {
                    const pokemonIndex = pokemon.indexOf(gymSelectedTeam[i]);
                    slot.innerHTML = `
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex + 1}.png" 
                             alt="${gymSelectedTeam[i]}" style="width: 60px; height: 60px;">
                        <div style="font-size: 0.7em;">${gymSelectedTeam[i]}</div>
                    `;
                } else {
                    slot.innerHTML = '<div style="padding: 30px; color: #999;">Empty</div>';
                }
                
                teamDisplay.appendChild(slot);
            }
            
            // Enable/disable start button
            const startBtn = document.getElementById('startTrainingBtn');
            if (startBtn) {
                startBtn.disabled = gymSelectedTeam.length !== 2;
            }
        }

        // Start gym training phase
        function startGymTraining() {
            if (gymSelectedTeam.length !== 2) return;
            
            gymPhase = 'training';
            currentGymQuestion = 0;
            
            // Generate training questions (sequential 1-12)
            gymQuestions = [];
            for (let i = 1; i <= 12; i++) {
                gymQuestions.push({
                    multiplier: i,
                    answer: currentGym.table * i
                });
            }
            
            // Show training view
            document.getElementById('gymEntranceView').style.display = 'none';
            document.getElementById('gymTrainingView').style.display = 'block';
            
            showGymQuestion();
        }

        // Show current gym question
        function showGymQuestion() {
            if (gymPhase === 'training') {
                const question = gymQuestions[currentGymQuestion];
                document.getElementById('gymQuestion').textContent = 
                    `${currentGym.table} × ${question.multiplier} = ?`;
                document.getElementById('gymAnswerInput').value = '';
                document.getElementById('gymAnswerInput').focus();
                document.getElementById('gymFeedback').className = 'gym-feedback';
                document.getElementById('trainingProgress').textContent = 
                    `Question ${currentGymQuestion + 1} / ${gymQuestions.length}`;
            } else if (gymPhase === 'leader') {
                const question = gymQuestions[currentGymQuestion];
                document.getElementById('gymBattleQuestion').textContent = 
                    `${currentGym.table} × ${question.multiplier} = ?`;
                document.getElementById('gymBattleInput').value = '';
                document.getElementById('gymBattleInput').focus();
                document.getElementById('gymBattleFeedback').className = 'gym-feedback';
            }
        }

        // Check gym training answer
        function checkGymAnswer() {
            const input = document.getElementById('gymAnswerInput');
            const userAnswer = parseInt(input.value);
            const question = gymQuestions[currentGymQuestion];
            const feedback = document.getElementById('gymFeedback');
            
            if (userAnswer === question.answer) {
                feedback.className = 'gym-feedback correct';
                feedback.textContent = '✅ Correct!';
                
                setTimeout(() => {
                    currentGymQuestion++;
                    if (currentGymQuestion >= gymQuestions.length) {
                        // Training complete, start leader battle
                        startLeaderBattle();
                    } else {
                        showGymQuestion();
                    }
                }, 1000);
            } else {
                feedback.className = 'gym-feedback incorrect';
                feedback.textContent = '❌ Try again!';
            }
        }

        // Start gym leader battle
        function startLeaderBattle() {
            gymPhase = 'leader';
            currentGymQuestion = 0;
            currentGymPlayerIndex = 0;  // Track which Pokémon is active
            gymPlayerHP = 100;
            gymLeaderHP = 100;
            
            // Generate randomized questions (same table, 1-12 randomized)
            const multipliers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            shuffleArray(multipliers);
            
            gymQuestions = multipliers.map(mult => ({
                multiplier: mult,
                answer: currentGym.table * mult
            }));
            
            // Show battle view
            document.getElementById('gymTrainingView').style.display = 'none';
            document.getElementById('gymBattleView').style.display = 'block';
            
            // Render Pokémon sprites
            renderGymBattlePokemon();
            
            showGymQuestion();
            
            // Show initial battle message
            document.getElementById('gymBattleMessage').textContent = `${currentGym.leader} challenges you to a battle!`;
        }

        // Render Pokémon sprites in gym battle
        function renderGymBattlePokemon() {
            // Get current active Pokémon for both sides
            const playerPokemonName = gymSelectedTeam[currentGymPlayerIndex];
            const playerPokemonIndex = pokemon.indexOf(playerPokemonName);
            const leaderPokemon = getGymLeaderPokemon(currentGym.type);
            
            // Set background based on gym type
            const gymType = currentGym.type.toLowerCase();
            const backgroundMap = {
                'rock': 'ground',
                'grass': 'grass',
                'water': 'water',
                'electric': 'neutral',
                'poison': 'neutral',
                'fire': 'ground',
                'psychic': 'neutral',
                'ice': 'ice',
                'dragon': 'neutral'
            };
            const bgKey = backgroundMap[gymType] || 'neutral';
            const bgFile = battleBackgrounds[bgKey];
            document.getElementById('gymBattleField').style.backgroundImage = `url('${bgFile}')`;
            
            // Update Player Pokémon sprite and info
            document.getElementById('gymPlayerSprite').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${playerPokemonIndex + 1}.gif`;
            document.getElementById('gymPlayerPokemonName').textContent = playerPokemonName.toUpperCase();
            updateGymHealth('player', gymPlayerHP, 100);
            
            // Update Leader's Pokémon sprite and info
            document.getElementById('gymLeaderSprite').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${leaderPokemon.id}.gif`;
            document.getElementById('gymLeaderPokemonName').textContent = leaderPokemon.name.toUpperCase();
            updateGymHealth('leader', gymLeaderHP, 100);
            
            // Update Pokéball displays
            updateGymPokeballs();
        }

        // Get appropriate Pokémon for gym leader based on type
        function getGymLeaderPokemon(type) {
            const leaderPokemon = {
                'Rock': { id: 95, name: 'Onix' },
                'Grass': { id: 71, name: 'Victreebel' },
                'Water': { id: 121, name: 'Starmie' },
                'Electric': { id: 26, name: 'Raichu' },
                'Poison': { id: 89, name: 'Muk' },
                'Fire': { id: 59, name: 'Arcanine' },
                'Psychic': { id: 65, name: 'Alakazam' },
                'Ice': { id: 87, name: 'Dewgong' },
                'Dragon': { id: 149, name: 'Dragonite' }
            };
            
            return leaderPokemon[type] || { id: 1, name: 'Bulbasaur' };
        }

        // Check battle answer
        function checkBattleAnswer() {
            const input = document.getElementById('gymBattleInput');
            const userAnswer = parseInt(input.value);
            const question = gymQuestions[currentGymQuestion];
            const messageEl = document.getElementById('gymBattleMessage');
            
            if (userAnswer === question.answer) {
                // Correct answer: deal damage to leader, small damage to player
                gymLeaderHP -= 10;
                gymPlayerHP -= 2;
                
                messageEl.textContent = `✅ Critical Hit! ${gymSelectedTeam[currentGymPlayerIndex]} dealt 10 damage!`;
                messageEl.style.color = '#22c55e';
                
                // Update health bars
                updateGymHealth('leader', gymLeaderHP, 100);
                updateGymHealth('player', gymPlayerHP, 100);
                
                // Shake leader's Pokémon
                shakeGymPokemon('leader');
                
            } else {
                // Wrong answer: take damage
                gymPlayerHP -= 15;
                
                messageEl.textContent = `❌ Miss! You took 15 damage!`;
                messageEl.style.color = '#ef4444';
                
                // Update health bars
                updateGymHealth('player', gymPlayerHP, 100);
                
                // Shake player's Pokémon
                shakeGymPokemon('player');
            }
            
            // Update Pokéballs
            updateGymPokeballs();
            
            // Clear input
            input.value = '';
            
            setTimeout(() => {
                // Check win/lose
                if (gymLeaderHP <= 0) {
                    winGym();
                } else if (gymPlayerHP <= 0) {
                    loseGym();
                } else {
                    currentGymQuestion++;
                    if (currentGymQuestion >= gymQuestions.length) {
                        // All questions answered, determine winner
                        if (gymPlayerHP > 0) {
                            winGym();
                        } else {
                            loseGym();
                        }
                    } else {
                        showGymQuestion();
                    }
                }
            }, 1500);
        }

        // Shake Pokémon sprite on damage
        function shakeGymPokemon(side) {
            const sprite = side === 'player' ? 
                document.getElementById('gymPlayerSprite') : 
                document.getElementById('gymLeaderSprite');
            
            sprite.classList.add('hit');
            setTimeout(() => {
                sprite.classList.remove('hit');
            }, 500);
        }

        // Update health bars
        function updateGymHealth(side, hp, maxHp) {
            const healthBar = document.getElementById(side === 'player' ? 'gymPlayerHealthFill' : 'gymLeaderHealthFill');
            const healthText = document.getElementById(side === 'player' ? 'gymPlayerHealthText' : 'gymLeaderHealthText');
            
            const percentage = Math.max(0, (hp / maxHp) * 100);
            healthBar.style.width = percentage + '%';
            healthText.textContent = `${Math.max(0, Math.floor(hp))}/${maxHp} HP`;
            
            // Update health bar color
            healthBar.classList.remove('health-low', 'health-medium');
            if (percentage <= 25) {
                healthBar.classList.add('health-low');
            } else if (percentage <= 50) {
                healthBar.classList.add('health-medium');
            }
        }

        // Update Pokéball displays for gym battle
        function updateGymPokeballs() {
            // Update player Pokéballs (2 Pokéballs for gym)
            const playerBalls = document.querySelectorAll('.team-pokeballs.player-team .pokeball-slot');
            gymSelectedTeam.forEach((p, i) => {
                if (playerBalls[i]) {
                    playerBalls[i].classList.remove('active', 'fainted');
                    if (gymPlayerHP <= 0 && i === currentGymPlayerIndex) {
                        playerBalls[i].classList.add('fainted');
                    } else if (i === currentGymPlayerIndex) {
                        playerBalls[i].classList.add('active');
                    }
                }
            });
            
            // Update leader Pokéballs (always just show 2 - gym leaders have 2 Pokémon in this game)
            const leaderBalls = document.querySelectorAll('.team-pokeballs.opponent-team .pokeball-slot');
            leaderBalls.forEach((ball, i) => {
                ball.classList.remove('active', 'fainted');
                if (i === 0) {  // Leader always uses first Pokémon
                    if (gymLeaderHP <= 0) {
                        ball.classList.add('fainted');
                    } else {
                        ball.classList.add('active');
                    }
                }
            });
        }

        // Add battle log entry
        // Win gym
        function winGym() {
            // Update progress
            if (!gymProgress.completedGyms.includes(currentGym.id)) {
                gymProgress.completedGyms.push(currentGym.id);
                gymProgress.badges.push(currentGym.badge);
                
                // Unlock next gym
                if (currentGym.id < 9 && !gymProgress.unlockedGyms.includes(currentGym.id + 1)) {
                    gymProgress.unlockedGyms.push(currentGym.id + 1);
                }
                
                // Process unlock reward
                processGymReward(currentGym.unlock);
                
                // Save progress
                localStorage.setItem('gymProgress', JSON.stringify(gymProgress));
            }
            
            // Show victory screen
            document.getElementById('gymBattleView').style.display = 'none';
            document.getElementById('gymVictoryView').style.display = 'block';
            
            // Show gym leader sprite
            const leaderSprites = {
                1: 'assets/images/brok.png',      // Brock
                2: 'assets/images/erika.png',     // Erika
                3: 'assets/images/misty.png',     // Misty
                4: 'assets/images/surge.png',     // Lt. Surge
                5: 'assets/images/koga.png',      // Koga
                6: 'assets/images/blaine.png',    // Blaine
                7: 'assets/images/sabrina.png',   // Sabrina
                8: 'assets/images/lorelei.png',   // Lorelei
                9: 'assets/images/lance.png'      // Lance
            };
            
            const spriteFile = leaderSprites[currentGym.id] || 'assets/images/brok.png';
            
            document.getElementById('gymLeaderVictorySprite').innerHTML = `
                <img src="${spriteFile}" alt="${currentGym.leader}" class="gym-leader-sprite-img">
            `;
            
            document.getElementById('badgeEarned').textContent = `${currentGym.icon} ${currentGym.badge}`;
            document.getElementById('victoryMessage').textContent = currentGym.dialogue.victory;
            document.getElementById('unlockMessage').textContent = getUnlockMessage(currentGym.unlock);
            
            // Play fanfare
            playSound(musicTracks.catchFanfare);
        }

        // Lose gym
        function loseGym() {
            document.getElementById('gymBattleView').style.display = 'none';
            document.getElementById('gymDefeatView').style.display = 'block';
            
            document.getElementById('defeatMessage').textContent = 
                `${currentGym.leader} was too strong! Train more and try again!`;
        }

        // Process gym reward
        function processGymReward(reward) {
            if (reward === 'healing') {
                gymProgress.healingUnlocked = true;
            } else if (reward === 'charmander_voice') {
                gymProgress.voicesUnlocked.charmander = true;
            } else if (reward === 'pikachu_voice') {
                gymProgress.voicesUnlocked.pikachu = true;
            } else if (reward === 'jigglypuff_voice') {
                gymProgress.voicesUnlocked.jigglypuff = true;
            } else if (reward === 'articuno') {
                gymProgress.legendariesUnlocked.articuno = true;
            } else if (reward === 'zapdos') {
                gymProgress.legendariesUnlocked.zapdos = true;
            } else if (reward === 'moltres') {
                gymProgress.legendariesUnlocked.moltres = true;
            } else if (reward === 'mewtwo') {
                gymProgress.legendariesUnlocked.mewtwo = true;
            } else if (reward === 'mew') {
                gymProgress.legendariesUnlocked.mew = true;
            }
        }

        // Get unlock message
        function getUnlockMessage(reward) {
            const messages = {
                'healing': '🏥 Pokémon Center Healing Feature Unlocked!',
                'charmander_voice': '🔊 Charmander Voice Unlocked!',
                'pikachu_voice': '🔊 Pikachu Voice Unlocked!',
                'jigglypuff_voice': '🔊 Jigglypuff Voice Unlocked!',
                'articuno': '❄️ Articuno can now appear in bushes!',
                'zapdos': '⚡ Zapdos can now appear in bushes!',
                'moltres': '🔥 Moltres can now appear in bushes!',
                'mewtwo': '🧬 Mewtwo can now appear in bushes!',
                'mew': '✨ Mew can now appear in bushes!'
            };
            return messages[reward] || 'New feature unlocked!';
        }

        // Navigation functions
        function backToGymMap() {
            initializeGymMap();
        }

        function returnToGymMap() {
            initializeGymMap();
        }

        function retryGym() {
            enterGym(currentGym.id);
        }

        // Utility: Shuffle array
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function openSettings() {
            document.getElementById('settingsGrade').value = gradeLevel;
            document.getElementById('opAddition').checked = allowedOperations.includes('addition');
            document.getElementById('opSubtraction').checked = allowedOperations.includes('subtraction');
            document.getElementById('opMultiplication').checked = allowedOperations.includes('multiplication');
            document.getElementById('opDivision').checked = allowedOperations.includes('division');
            document.getElementById('settingsModal').classList.add('active');
        }

        function closeSettings() {
            document.getElementById('settingsModal').classList.remove('active');
        }

        function saveSettings() {
            gradeLevel = parseInt(document.getElementById('settingsGrade').value);
            localStorage.setItem('gradeLevel', gradeLevel);
            
            allowedOperations = [];
            if (document.getElementById('opAddition').checked) allowedOperations.push('addition');
            if (document.getElementById('opSubtraction').checked) allowedOperations.push('subtraction');
            if (document.getElementById('opMultiplication').checked) allowedOperations.push('multiplication');
            if (document.getElementById('opDivision').checked) allowedOperations.push('division');
            
            if (allowedOperations.length === 0) {
                alert('Please select at least one operation!');
                return;
            }
            
            localStorage.setItem('allowedOperations', JSON.stringify(allowedOperations));
            document.getElementById('settingsModal').classList.remove('active');
            
            // Update game screen dropdowns
            document.getElementById('gradeLevel').value = gradeLevel;
        }

        // Close modal
        function closeModal() {
            document.getElementById('mathModal').classList.remove('active');
        }

        // Show Pokemon info modal
        async function showPokemonInfo(number, name) {
            document.getElementById('pokemonInfoModal').classList.add('active');
            document.getElementById('pokemonInfoLoading').style.display = 'block';
            document.getElementById('pokemonInfoDisplay').style.display = 'none';

            try {
                // Fetch Pokemon data from PokeAPI
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
                const data = await response.json();

                // Fetch species data for additional info
                const speciesResponse = await fetch(data.species.url);
                const speciesData = await speciesResponse.json();

                // Play type-specific sound
                playTypeSound(data.types);
                
                // Play Pokémon voice if unlocked
                playPokemonVoice(name);

                // Update modal with Pokemon data
                document.getElementById('infoSprite').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${number}.gif`;
                document.getElementById('infoName').textContent = name;
                document.getElementById('infoNumber').textContent = `#${String(number).padStart(3, '0')}`;

                // Types
                const typesContainer = document.getElementById('infoTypes');
                typesContainer.innerHTML = '';
                data.types.forEach(typeInfo => {
                    const typeEl = document.createElement('span');
                    typeEl.className = `type-badge type-${typeInfo.type.name}`;
                    typeEl.textContent = typeInfo.type.name;
                    typesContainer.appendChild(typeEl);
                });

                // Height and Weight (convert from decimeters and hectograms)
                const heightM = (data.height / 10).toFixed(1);
                const weightKg = (data.weight / 10).toFixed(1);
                document.getElementById('infoHeight').textContent = `${heightM} m`;
                document.getElementById('infoWeight').textContent = `${weightKg} kg`;

                // Habitat
                const habitat = speciesData.habitat ? speciesData.habitat.name : 'Unknown';
                document.getElementById('infoHabitat').textContent = habitat.charAt(0).toUpperCase() + habitat.slice(1);

                // Flavor text (story) - get English entry
                const flavorTexts = speciesData.flavor_text_entries.filter(entry => entry.language.name === 'en');
                let story = 'No description available.';
                if (flavorTexts.length > 0) {
                    // Get a random flavor text for variety
                    const randomIndex = Math.floor(Math.random() * Math.min(3, flavorTexts.length));
                    story = flavorTexts[randomIndex].flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ');
                }
                document.getElementById('infoStory').textContent = story;

                // Show the data
                document.getElementById('pokemonInfoLoading').style.display = 'none';
                document.getElementById('pokemonInfoDisplay').style.display = 'block';

            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
                document.getElementById('pokemonInfoLoading').innerHTML = '❌ Error loading Pokémon data. Please try again.';
            }
        }

        // Close Pokemon info modal
        function closePokemonInfo() {
            document.getElementById('pokemonInfoModal').classList.remove('active');
        }

        // ========== BATTLE MODE FUNCTIONS ==========

        // Initialize battle mode
        function initializeBattleMode() {
            const caughtCount = Object.keys(caughtPokemon).length;
            
            if (caughtCount < 3) {
                alert(`You need at least 3 caught Pokémon to battle! You have ${caughtCount}. Keep catching!`);
                navigateTo('hunt');
                return;
            }
            
            selectedTeam = [];
            showTeamSelection();
        }

        // Show team selection screen
        function showTeamSelection() {
            document.getElementById('teamSelectionScreen').style.display = 'block';
            document.getElementById('battleArenaScreen').style.display = 'none';
            
            const container = document.getElementById('availablePokemon');
            container.innerHTML = '';
            
            pokemon.forEach((name, index) => {
                const number = index + 1;
                if (caughtPokemon[number]) {
                    const card = document.createElement('div');
                    const isInjured = !canPokemonBattle(name);
                    
                    card.className = `selectable-pokemon ${isInjured ? 'injured' : ''}`;
                    card.id = `select-${number}`;
                    
                    if (!isInjured) {
                        card.onclick = () => toggleTeamSelection(number, name);
                    } else {
                        card.title = `${name} is injured! Visit the Pokémon Center to heal.`;
                    }
                    
                    const sprite = document.createElement('img');
                    sprite.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${number}.gif`;
                    sprite.style.width = '60px';
                    sprite.style.height = '60px';
                    if (isInjured) {
                        sprite.style.filter = 'grayscale(1) brightness(0.6)';
                    }
                    
                    const nameEl = document.createElement('div');
                    nameEl.style.fontSize = '0.8em';
                    nameEl.style.marginTop = '5px';
                    nameEl.textContent = name;
                    
                    if (isInjured) {
                        const statusEl = document.createElement('div');
                        statusEl.style.fontSize = '0.7em';
                        statusEl.style.color = '#EF5350';
                        statusEl.style.fontWeight = '600';
                        statusEl.textContent = '❤️‍🩹 Fainted';
                        card.appendChild(sprite);
                        card.appendChild(nameEl);
                        card.appendChild(statusEl);
                    } else {
                        card.appendChild(sprite);
                        card.appendChild(nameEl);
                    }
                    
                    container.appendChild(card);
                }
            });
            
            updateSelectedTeamDisplay();
        }

        // Toggle Pokemon team selection
        function toggleTeamSelection(number, name) {
            const index = selectedTeam.findIndex(p => p.number === number);
            
            if (index > -1) {
                // Deselect
                selectedTeam.splice(index, 1);
                document.getElementById(`select-${number}`).classList.remove('selected');
            } else if (selectedTeam.length < 3) {
                // Select
                selectedTeam.push({ number, name });
                document.getElementById(`select-${number}`).classList.add('selected');
            }
            
            updateSelectedTeamDisplay();
        }

        // Update selected team display
        function updateSelectedTeamDisplay() {
            const container = document.getElementById('selectedTeamDisplay');
            container.innerHTML = '';
            
            for (let i = 0; i < 3; i++) {
                const slot = document.createElement('div');
                slot.className = 'team-slot';
                
                if (selectedTeam[i]) {
                    slot.classList.add('filled');
                    const sprite = document.createElement('img');
                    sprite.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${selectedTeam[i].number}.gif`;
                    const name = document.createElement('div');
                    name.className = 'slot-name';
                    name.textContent = selectedTeam[i].name;
                    slot.appendChild(sprite);
                    slot.appendChild(name);
                } else {
                    slot.textContent = '?';
                }
                
                container.appendChild(slot);
            }
            
            const startBtn = document.getElementById('startBattleModeBtn');
            if (selectedTeam.length === 3) {
                startBtn.disabled = false;
            } else {
                startBtn.disabled = true;
            }
        }

        // Start battle
        async function startBattleMode() {
            if (selectedTeam.length !== 3) return;
            
            try {
                // Show loading
                document.getElementById('battleMessage').textContent = 'Preparing battle...';
                
                console.log('Starting battle with team:', selectedTeam);
                
                // Fetch Pokemon data for selected team
                for (let p of selectedTeam) {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.number}`);
                    const data = await response.json();
                    p.types = data.types;
                    p.hp = 100;
                    p.maxHp = 100;
                    p.fainted = false;
                }
                
                console.log('Player team loaded');
                
                // Generate opponent team - AI gets access to ALL 150 Pokemon!
                const opponentTeam = [];
                const allPokemon = Array.from({length: 150}, (_, i) => i + 1); // 1-150
                
                // Shuffle and pick 3 random Pokemon for opponent
                const shuffled = allPokemon.sort(() => Math.random() - 0.5);
                const opponentPicks = shuffled.slice(0, 3);
                
                console.log('Opponent will use Pokemon:', opponentPicks);
                
                for (let pokemonNumber of opponentPicks) {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
                    const data = await response.json();
                    
                    opponentTeam.push({
                        number: pokemonNumber,
                        name: pokemon[pokemonNumber - 1],
                        types: data.types,
                        hp: 100,
                        maxHp: 100,
                        fainted: false
                    });
                }
                
                console.log('Opponent team loaded:', opponentTeam);
                
                currentBattle = {
                    playerTeam: selectedTeam,
                    opponentTeam: opponentTeam,
                    playerIndex: 0,
                    opponentIndex: 0,
                    turn: 'player'
                };
                
                document.getElementById('teamSelectionScreen').style.display = 'none';
                document.getElementById('battleArenaScreen').style.display = 'block';
                
                console.log('Loading battle Pokemon...');
                loadBattlePokemon();
                startPlayerTurn();
                
            } catch (error) {
                console.error('Error starting battle:', error);
                alert('Error starting battle: ' + error.message + '\nPlease try again.');
                document.getElementById('battleMessage').textContent = 'Error starting battle. Please try again.';
            }
        }

        // Load Pokemon into battle arena
        function loadBattlePokemon() {
            const playerPokemon = currentBattle.playerTeam[currentBattle.playerIndex];
            const opponentPokemon = currentBattle.opponentTeam[currentBattle.opponentIndex];
            
            // Clear any previous fainted classes
            document.getElementById('playerSprite').classList.remove('fainted');
            document.getElementById('opponentSprite').classList.remove('fainted');
            
            // Set random background for normal battles (only on first load)
            if (currentBattle.playerIndex === 0 && currentBattle.opponentIndex === 0) {
                const bgOptions = ['neutral', 'grass', 'water', 'ground', 'ice'];
                const randomBg = bgOptions[Math.floor(Math.random() * bgOptions.length)];
                const bgFile = battleBackgrounds[randomBg];
                document.getElementById('battleField').style.backgroundImage = `url('${bgFile}')`;
            }
            
            // Player Pokemon
            document.getElementById('playerSprite').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${playerPokemon.number}.gif`;
            document.getElementById('playerPokemonName').textContent = playerPokemon.name;
            updateBattleHealth('player', playerPokemon.hp, playerPokemon.maxHp);
            
            // Opponent Pokemon
            document.getElementById('opponentSprite').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${opponentPokemon.number}.gif`;
            document.getElementById('opponentPokemonName').textContent = opponentPokemon.name;
            updateBattleHealth('opponent', opponentPokemon.hp, opponentPokemon.maxHp);
            
            // Update team display
            updateTeamDisplay();
        }

        // Update health bar with color coding
        function updateBattleHealth(side, hp, maxHp) {
            const healthBar = document.getElementById(`${side}HealthFill`);
            const healthText = document.getElementById(`${side}HealthText`);
            
            const percentage = Math.max(0, (hp / maxHp) * 100);
            healthBar.style.width = percentage + '%';
            
            // Show HP numbers for BOTH player and opponent
            healthText.textContent = `${Math.max(0, Math.floor(hp))}/${maxHp} HP`;
            
            // Update health bar color
            healthBar.classList.remove('health-low', 'health-medium');
            if (percentage <= 25) {
                healthBar.classList.add('health-low');
            } else if (percentage <= 50) {
                healthBar.classList.add('health-medium');
            }
        }

        // Update Pokéball team display
        function updateTeamDisplay() {
            // Update player Pokéballs
            const playerBalls = document.querySelectorAll('.team-pokeballs.player-team .pokeball-slot');
            currentBattle.playerTeam.forEach((p, i) => {
                if (playerBalls[i]) {
                    playerBalls[i].classList.remove('active', 'fainted');
                    if (p.fainted) {
                        playerBalls[i].classList.add('fainted');
                    } else if (i === currentBattle.playerIndex) {
                        playerBalls[i].classList.add('active');
                    }
                    // If not fainted and not active, it stays with default visible state (no class needed)
                }
            });
            
            // Update opponent Pokéballs
            const opponentBalls = document.querySelectorAll('.team-pokeballs.opponent-team .pokeball-slot');
            currentBattle.opponentTeam.forEach((p, i) => {
                if (opponentBalls[i]) {
                    opponentBalls[i].classList.remove('active', 'fainted');
                    if (p.fainted) {
                        opponentBalls[i].classList.add('fainted');
                    } else if (i === currentBattle.opponentIndex) {
                        opponentBalls[i].classList.add('active');
                    }
                    // If not fainted and not active, it stays with default visible state (no class needed)
                }
            });
        }

        // Start player turn
        function startPlayerTurn() {
            const mathData = generateMathProblem();
            currentBattle.currentQuestion = mathData.problem;
            currentBattle.currentAnswer = mathData.answer;
            currentBattle.turn = 'player';
            
            const playerPokemon = currentBattle.playerTeam[currentBattle.playerIndex];
            const pokemonType = playerPokemon.types[0].type.name;
            const attacks = attacksByType[pokemonType] || attacksByType.normal;
            const attackName = attacks[Math.floor(Math.random() * attacks.length)];
            
            document.getElementById('attackNameDisplay').textContent = attackName;
            document.getElementById('attackTypeDisplay').textContent = pokemonType.toUpperCase();
            document.getElementById('attackTypeDisplay').className = `attack-type type-${pokemonType}`;
            
            document.getElementById('battleQuestionText').textContent = mathData.problem + ' = ?';
            document.getElementById('battleAnswerInput').value = '';
            document.getElementById('battleAnswerInput').focus();
            document.getElementById('battleMessage').textContent = `Use ${attackName}!`;
        }

        // Submit battle answer
        function submitBattleAnswer() {
            const userAnswer = parseInt(document.getElementById('battleAnswerInput').value);
            
            if (userAnswer === currentBattle.currentAnswer) {
                playSuccessSound();
                playerAttack();
            } else {
                playFailureSound();
                document.getElementById('battleMessage').textContent = 'Wrong answer! Opponent attacks!';
                setTimeout(() => opponentAttack(), 1500);
            }
        }

        // Player attacks
        function playerAttack() {
            const playerPokemon = currentBattle.playerTeam[currentBattle.playerIndex];
            const opponentPokemon = currentBattle.opponentTeam[currentBattle.opponentIndex];
            
            const playerType = playerPokemon.types[0].type.name;
            const opponentType = opponentPokemon.types[0].type.name;
            
            let damage = 20;
            let effectiveness = 'normal';
            
            // Check type advantage
            if (typeChart[playerType]?.strong?.includes(opponentType)) {
                damage = 35;
                effectiveness = 'super';
            } else if (typeChart[playerType]?.weak?.includes(opponentType)) {
                damage = 10;
                effectiveness = 'weak';
            }
            
            const attacks = attacksByType[playerType] || attacksByType.normal;
            const attackName = attacks[Math.floor(Math.random() * attacks.length)];
            
            // Play epic attack animation!
            playBattleAttackAnimation('player', playerType, damage, effectiveness === 'super', effectiveness);
            
            setTimeout(() => {
                opponentPokemon.hp -= damage;
                updateBattleHealth('opponent', opponentPokemon.hp, opponentPokemon.maxHp);
                
                let message = `${playerPokemon.name} used ${attackName}! ${damage} damage!`;
                if (effectiveness === 'super') {
                    message += ' Super effective!';
                } else if (effectiveness === 'weak') {
                    message += ' Not very effective...';
                } else {
                }
                
                document.getElementById('battleMessage').textContent = message;
                
                setTimeout(() => {
                    if (opponentPokemon.hp <= 0) {
                        opponentPokemonFainted();
                    } else {
                        setTimeout(() => opponentAttack(), 1500);
                    }
                }, 800);
            }, 600);
        }

        // Opponent attacks
        function opponentAttack() {
            const playerPokemon = currentBattle.playerTeam[currentBattle.playerIndex];
            const opponentPokemon = currentBattle.opponentTeam[currentBattle.opponentIndex];
            
            const opponentType = opponentPokemon.types[0].type.name;
            const playerType = playerPokemon.types[0].type.name;
            
            let damage = 15;
            let effectiveness = 'normal';
            
            if (typeChart[opponentType]?.strong?.includes(playerType)) {
                damage = 25;
                effectiveness = 'super';
            } else if (typeChart[opponentType]?.weak?.includes(playerType)) {
                damage = 8;
                effectiveness = 'weak';
            }
            
            const attacks = attacksByType[opponentType] || attacksByType.normal;
            const attackName = attacks[Math.floor(Math.random() * attacks.length)];
            
            // Play epic attack animation!
            playBattleAttackAnimation('opponent', opponentType, damage, effectiveness === 'super', effectiveness);
            
            setTimeout(() => {
                playerPokemon.hp -= damage;
                updateBattleHealth('player', playerPokemon.hp, playerPokemon.maxHp);
                
                let message = `${opponentPokemon.name} used ${attackName}! ${damage} damage!`;
                if (effectiveness === 'super') {
                    message += ' Super effective!';
                }
                document.getElementById('battleMessage').textContent = message;
                
                setTimeout(() => {
                    if (playerPokemon.hp <= 0) {
                        playerPokemonFainted();
                    } else {
                        setTimeout(() => startPlayerTurn(), 1000);
                    }
                }, 800);
            }, 1200);
        }

        // Player Pokemon fainted
        function playerPokemonFainted() {
            const playerPokemon = currentBattle.playerTeam[currentBattle.playerIndex];
            playerPokemon.fainted = true;
            
            // Mark Pokemon as injured (needs healing)
            markPokemonAsInjured(playerPokemon.name);
            
            document.getElementById('playerSprite').classList.add('fainted');
            document.getElementById('battleMessage').textContent = `${playerPokemon.name} fainted!`;
            
            setTimeout(() => {
                // Check for next Pokemon
                currentBattle.playerIndex++;
                
                if (currentBattle.playerIndex >= currentBattle.playerTeam.length) {
                    endBattle(false);
                } else {
                    document.getElementById('playerSprite').classList.remove('fainted');
                    loadBattlePokemon();
                    setTimeout(() => startPlayerTurn(), 1500);
                }
            }, 2000);
        }

        // Opponent Pokemon fainted
        function opponentPokemonFainted() {
            const opponentPokemon = currentBattle.opponentTeam[currentBattle.opponentIndex];
            opponentPokemon.fainted = true;
            
            document.getElementById('opponentSprite').classList.add('fainted');
            document.getElementById('battleMessage').textContent = `Enemy ${opponentPokemon.name} fainted!`;
            playSuccessSound();
            
            setTimeout(() => {
                currentBattle.opponentIndex++;
                
                if (currentBattle.opponentIndex >= currentBattle.opponentTeam.length) {
                    endBattle(true);
                } else {
                    document.getElementById('opponentSprite').classList.remove('fainted');
                    loadBattlePokemon();
                    setTimeout(() => startPlayerTurn(), 1500);
                }
            }, 2000);
        }

        // Add entry to battle log
        // End battle
        function endBattle(playerWon) {
            const modal = document.getElementById('battleResultModal');
            const content = document.getElementById('battleResultContent');
            const title = document.getElementById('battleResultTitle');
            const message = document.getElementById('battleResultMessage');
            const reward = document.getElementById('battleRewardDisplay');
            
            modal.classList.add('active');
            
            if (playerWon) {
                content.className = 'battle-result-content victory';
                title.textContent = '🏆 VICTORY! 🏆';
                message.textContent = 'You defeated the opponent trainer!';
                playLegendaryFanfare();
                
                // Increment battles won
                gameStats.battlesWon = (gameStats.battlesWon || 0) + 1;
                saveGameStats();
                checkBadges();
                
                // Check for new battle badges
                const newBadges = [];
                if (gameStats.battlesWon === 1 && !gameStats.unlockedBadges.includes('rookie_trainer')) {
                    newBadges.push({ id: 'rookie_trainer', name: 'Rookie Trainer', icon: '⚔️' });
                }
                if (gameStats.battlesWon === 10 && !gameStats.unlockedBadges.includes('experienced_trainer')) {
                    newBadges.push({ id: 'experienced_trainer', name: 'Experienced Trainer', icon: '🗡️' });
                }
                if (gameStats.battlesWon === 25 && !gameStats.unlockedBadges.includes('veteran_trainer')) {
                    newBadges.push({ id: 'veteran_trainer', name: 'Veteran Trainer', icon: '🛡️' });
                }
                if (gameStats.battlesWon === 50 && !gameStats.unlockedBadges.includes('battle_master')) {
                    newBadges.push({ id: 'battle_master', name: 'Battle Master', icon: '👑' });
                }
                
                if (newBadges.length > 0) {
                    reward.style.display = 'block';
                    reward.innerHTML = newBadges.map(badge => `
                        <h3>🏆 New Badge Unlocked!</h3>
                        <div style="font-size: 3em; margin: 10px 0;">${badge.icon}</div>
                        <div style="font-size: 1.3em; font-weight: bold;">${badge.name}</div>
                        <p>Battles Won: ${gameStats.battlesWon}</p>
                    `).join('<hr style="margin: 20px 0;">');
                } else {
                    reward.style.display = 'none';
                }
            } else {
                content.className = 'battle-result-content defeat';
                title.textContent = '💔 DEFEAT 💔';
                message.textContent = 'You were defeated... Train harder and try again!';
                playFailureSound();
                reward.style.display = 'none';
            }
        }

        // Close battle result
        function closeBattleResult() {
            document.getElementById('battleResultModal').classList.remove('active');
            initializeBattleMode();
        }

        // Get Pokémon sprite URL from PokeAPI
        function getPokemonSpriteUrl(number, isCaught) {
            if (isCaught) {
                // Return pokeball sprite
                return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
            }
            // Return animated pokemon sprite from PokeAPI (Generation V Black/White animated sprites)
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${number}.gif`;
        }

        // Get Pokémon cry/sound URL from PokeAPI
        function getPokemonCryUrl(number) {
            return `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${number}.ogg`;
        }

        // Play Pokémon cry sound
        function playPokemonCry(number) {
            // Don't play if muted
            if (isMuted) {
                return;
            }
            
            const audio = new Audio(getPokemonCryUrl(number));
            audio.volume = 0.5; // Set volume to 50% so it's not too loud
            audio.play().catch(err => {
                console.log('Could not play cry:', err);
                // Fallback: Try legacy cry format
                const legacyAudio = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${number}.ogg`);
                legacyAudio.volume = 0.5;
                legacyAudio.play().catch(e => console.log('Legacy cry also failed:', e));
            });
        }

        // Initialize grid
        function initializeGrid() {
            const grid = document.getElementById('pokemonGrid');
            if (!grid) return; // Exit if grid doesn't exist
            
            grid.innerHTML = '';

            pokemon.forEach((name, index) => {
                const number = index + 1;
                const isCaught = caughtPokemon[number];
                
                // Check if this is a locked legendary
                const isLockedLegendary = (
                    (number === 144 && !gymProgress.legendariesUnlocked.articuno) ||
                    (number === 145 && !gymProgress.legendariesUnlocked.zapdos) ||
                    (number === 146 && !gymProgress.legendariesUnlocked.moltres) ||
                    (number === 150 && !gymProgress.legendariesUnlocked.mewtwo) ||
                    (number === 151 && !gymProgress.legendariesUnlocked.mew)
                );
                
                const card = document.createElement('div');
                card.className = `pokemon-card ${isCaught ? 'caught' : 'uncaught'} ${isLockedLegendary ? 'locked-legendary' : ''}`;
                card.onclick = () => {
                    // Can view caught Pokemon info
                    if (isCaught) {
                        showPokemonInfo(number, name);
                    } else if (isLockedLegendary) {
                        // Show which gym unlocks this legendary
                        const unlockGym = {
                            144: 'Gym 3 (Lt. Surge)',
                            145: 'Gym 4 (Erika)',
                            146: 'Gym 5 (Koga)',
                            150: 'Gym 8 (Lorelei)',
                            151: 'Gym 9 (Lance)'
                        };
                        alert(`🔒 This legendary Pokémon is locked!\n\nDefeat ${unlockGym[number]} to unlock.`);
                    }
                };

                // Add pointer cursor for caught Pokemon or locked legendaries
                if (isCaught || isLockedLegendary) {
                    card.style.cursor = 'pointer';
                }

                const sprite = document.createElement('img');
                sprite.className = 'pokemon-sprite';
                // Show pokeball for uncaught, lock icon for locked legendaries, Pokemon sprite for caught
                if (isCaught) {
                    sprite.src = getPokemonSpriteUrl(number, false);
                    sprite.alt = name;
                } else if (isLockedLegendary) {
                    sprite.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
                    sprite.alt = '🔒 Locked';
                    sprite.style.filter = 'grayscale(1) brightness(0.5)';
                } else {
                    sprite.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
                    sprite.alt = '???';
                }

                const nameEl = document.createElement('div');
                nameEl.className = 'pokemon-name';
                nameEl.textContent = isCaught ? name : (isLockedLegendary ? '🔒 Locked' : '???');

                const numberEl = document.createElement('div');
                numberEl.className = 'pokemon-number';
                numberEl.textContent = `#${String(number).padStart(3, '0')}`;

                card.appendChild(sprite);
                card.appendChild(nameEl);
                card.appendChild(numberEl);
                grid.appendChild(card);
            });

            updateStats();
        }

        // Close modal
        function closeModal() {
            const mathModal = document.getElementById('mathModal');
            mathModal.classList.remove('active');
            currentPokemon = null;
            
            // Reset UI elements that may have been hidden during pokeball animation
            mathModal.querySelector('#modalSprite').style.visibility = 'visible';
            mathModal.querySelector('.speech-bubble').style.display = 'block';
            mathModal.querySelector('.answer-section').style.display = 'block';
        }

        // Check answer
        function checkAnswer() {
            const userAnswer = parseInt(document.getElementById('answerInput').value);
            const feedback = document.getElementById('feedback');
            const celebration = document.getElementById('celebration');
            const modalSprite = document.getElementById('modalSprite');

            gameStats.totalProblems++;
            
            if (userAnswer === currentAnswer) {
                feedback.textContent = '✓ Correct!';
                feedback.className = 'feedback correct';

                // Play success sound
                playSuccessSound();

                // Update stats
                gameStats.correctAnswers++;
                gameStats.currentStreak++;
                if (gameStats.currentStreak > gameStats.bestStreak) {
                    gameStats.bestStreak = gameStats.currentStreak;
                }
                
                // Track operation type
                if (lastOperationType) {
                    gameStats.operationCounts[lastOperationType]++;
                }

                if (currentPokemon) {
                    // There was a Pokémon in this bush!
                    
                    // Hide modal UI for clean pokeball animation
                    const mathModal = document.getElementById('mathModal');
                    mathModal.querySelector('#modalSprite').style.visibility = 'hidden';
                    mathModal.querySelector('.speech-bubble').style.display = 'none';
                    mathModal.querySelector('.answer-section').style.display = 'none';
                    
                    // Trigger Pokeball catch animation!
                    const pokemonType = currentPokemon.types ? currentPokemon.types[0]?.type?.name : 'normal';
                    playPokeballCatchAnimation(pokemonType);
                    
                    // Check if legendary and play special fanfare
                    if (legendaryPokemon.includes(currentPokemon.number)) {
                        setTimeout(() => {
                            playLegendaryFanfare();
                            playCatchFanfare(); // Also play catch fanfare
                        }, 3400); // Synced with pokeball opening
                        celebration.textContent = '🌟 LEGENDARY POKÉMON CAUGHT! 🌟';
                    } else {
                        // Play catch fanfare for normal Pokemon
                        setTimeout(() => {
                            playCatchFanfare();
                        }, 3400); // Synced with pokeball opening
                        celebration.textContent = '🎉 Pokémon Caught! 🎉';
                    }
                    
                    setTimeout(() => {
                        celebration.style.display = 'block';
                    }, 3600); // Show celebration after pokeball opens

                    // Mark as caught
                    caughtPokemon[currentPokemon.number] = true;
                    localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon));
                    
                    // Play Pokémon voice if unlocked (after catch)
                    setTimeout(() => {
                        playPokemonVoice(currentPokemon.name);
                    }, 4000); // Play after celebration shows
                    
                    // Cache Pokemon types for badge tracking
                    fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon.number}`)
                        .then(response => response.json())
                        .then(data => {
                            const types = data.types.map(t => t.type.name);
                            pokemonTypeCache[currentPokemon.number] = types;
                            localStorage.setItem('pokemonTypeCache', JSON.stringify(pokemonTypeCache));
                        })
                        .catch(err => console.log('Could not cache types:', err));
                    
                    saveGameStats();
                    updateStreakDisplay();
                    updateBadgeCount();
                    checkBadges();

                    // Store the caught Pokemon info for display
                    const caughtPokemonNumber = currentPokemon.number;
                    const caughtPokemonName = currentPokemon.name;

                    setTimeout(() => {
                        closeModal();
                        // Reset all bushes for new round after catching Pokemon
                        resetBushes();
                        
                        // Navigate to Pokedex and show the caught Pokemon info
                        setTimeout(() => {
                            navigateTo('pokedex');
                            // Wait for Pokedex to load, then show Pokemon info
                            setTimeout(() => {
                                showPokemonInfo(caughtPokemonNumber, caughtPokemonName);
                            }, 300);
                        }, 500);
                    }, 5000); // Extended to 5 seconds to show celebration
                } else {
                    // Empty bush - mark it as checked
                    celebration.textContent = '✓ Bush checked! Try another!';
                    
                    setTimeout(() => {
                        celebration.style.display = 'block';
                        modalSprite.classList.remove('catching');
                    }, 800);
                    
                    saveGameStats();
                    updateStreakDisplay();
                    updateBadgeCount();
                    checkBadges();

                    // Mark this bush as checked
                    checkedBushes.push(selectedBush);
                    document.getElementById(`bush-${selectedBush}`).classList.add('checked');

                    setTimeout(() => {
                        closeModal();
                        
                        // Check if all bushes are checked
                        if (checkedBushes.length === 3) {
                            // All bushes checked, reset for new round
                            setTimeout(() => {
                                resetBushes();
                            }, 500);
                        }
                    }, 1500);
                }
            } else {
                // Wrong answer - Pokemon runs away or stays in bush
                feedback.textContent = '✗ Wrong answer!';
                feedback.className = 'feedback incorrect';
                
                // Play failure sound
                playFailureSound();
                
                // Reset streak
                gameStats.currentStreak = 0;
                saveGameStats();
                updateStreakDisplay();
                
                if (currentPokemon) {
                    // Pokemon runs away - trigger run animation
                    modalSprite.classList.add('run-away');
                    
                    setTimeout(() => {
                        closeModal();
                        showRanAwayNotification(currentPokemon.name);
                        modalSprite.classList.remove('run-away');
                        // Reset bushes after Pokemon runs away
                        setTimeout(() => {
                            resetBushes();
                        }, 2000);
                    }, 800);
                } else {
                    // Empty bush - just close modal, don't mark as checked
                    setTimeout(() => {
                        closeModal();
                    }, 1500);
                }
            }
        }

        // Show ran away notification
        function showRanAwayNotification(pokemonName) {
            const notification = document.getElementById('ranAwayNotification');
            document.getElementById('pokemonName').textContent = pokemonName;
            notification.style.display = 'block';
            
            setTimeout(() => {
                notification.style.display = 'none';
            }, 2000);
        }

        // Show reset confirmation modal
        function showResetConfirmation() {
            const count = Object.keys(caughtPokemon).length;
            if (count === 0) {
                alert("You haven't caught any Pokémon yet!");
                return;
            }
            document.getElementById('confirmCount').textContent = count;
            document.getElementById('confirmModal').classList.add('active');
        }

        // Close reset confirmation modal
        function closeResetConfirmation() {
            document.getElementById('confirmModal').classList.remove('active');
        }

        // Confirm and execute reset
        function confirmReset() {
            caughtPokemon = {};
            localStorage.setItem('caughtPokemon', JSON.stringify(caughtPokemon));
            closeResetConfirmation();
            initializeGrid();
            
            // Show success notification
            const notification = document.getElementById('ranAwayNotification');
            notification.innerHTML = '🔄 All Pokémon released! Start fresh! 🔄';
            notification.style.display = 'block';
            
            setTimeout(() => {
                notification.style.display = 'none';
                notification.innerHTML = '💨 <span id="pokemonName"></span> ran away! 💨';
            }, 2500);
        }

        // Show full game reset confirmation
        function showFullResetConfirmation() {
            const pokemonCount = Object.keys(caughtPokemon).length;
            const badgeCount = gameStats.unlockedBadges.length;
            const gymsBeaten = gymProgress.completedGyms.length;
            
            document.getElementById('resetPokedexCount').textContent = pokemonCount;
            document.getElementById('resetBadgesCount').textContent = badgeCount;
            document.getElementById('resetGymsCount').textContent = gymsBeaten;
            document.getElementById('fullResetModal').classList.add('active');
        }

        // Close full game reset confirmation
        function closeFullResetConfirmation() {
            document.getElementById('fullResetModal').classList.remove('active');
        }

        // Reset Pokédex only
        function resetPokedex() {
            if (!confirm('⚠️ Reset Pokédex?\n\nThis will release all your caught Pokémon!\n\nThis cannot be undone!')) {
                return;
            }
            
            localStorage.removeItem('caughtPokemon');
            localStorage.removeItem('injuredPokemon');
            caughtPokemon = {};
            injuredPokemon = [];
            
            alert('✅ Pokédex has been reset!\n\nAll Pokémon have been released.');
            closeFullResetConfirmation();
            initializeGrid();
            updateStats();
        }

        // Reset Badges only
        function resetBadges() {
            if (!confirm('⚠️ Reset Badges?\n\nThis will clear all your achievement badges and stats!\n\nThis cannot be undone!')) {
                return;
            }
            
            localStorage.removeItem('gameStats');
            gameStats = {
                totalProblems: 0,
                correctAnswers: 0,
                currentStreak: 0,
                bestStreak: 0,
                operationCounts: { addition: 0, subtraction: 0, multiplication: 0, division: 0 },
                unlockedBadges: []
            };
            
            alert('✅ Badges have been reset!\n\nAll achievements cleared. Time to earn them again!');
            closeFullResetConfirmation();
            updateBadgeCount();
            updateStreakDisplay();
        }

        // Reset Gyms only
        function resetGyms() {
            if (!confirm('⚠️ Reset Gym Progress?\n\nThis will:\n• Lock all gyms except Gym 1\n• Remove all gym badges\n• Lock Pokémon Center\n• Lock all legendary Pokémon\n\nThis cannot be undone!')) {
                return;
            }
            
            localStorage.removeItem('gymProgress');
            gymProgress = {
                unlockedGyms: [1],
                completedGyms: [],
                badges: [],
                healingUnlocked: false,
                voicesUnlocked: {
                    charmander: false,
                    pikachu: false,
                    jigglypuff: false
                },
                legendariesUnlocked: {
                    articuno: false,
                    zapdos: false,
                    moltres: false,
                    mewtwo: false,
                    mew: false
                }
            };
            
            alert('✅ Gym progress has been reset!\n\n• All gyms locked except Gym 1\n• Pokémon Center locked\n• Legendary Pokémon locked\n\nDefeat Brock to begin your journey!');
            closeFullResetConfirmation();
        }

        // Confirm and execute full game reset
        function confirmFullReset() {
            if (!confirm('⚠️⚠️⚠️ FULL RESET ⚠️⚠️⚠️\n\nThis will DELETE EVERYTHING:\n• All Pokémon\n• All Badges\n• All Gym Progress\n• All Stats\n• All Settings\n\nTHIS CANNOT BE UNDONE!\n\nAre you ABSOLUTELY SURE?')) {
                return;
            }
            
            // Clear all data
            localStorage.removeItem('caughtPokemon');
            localStorage.removeItem('injuredPokemon');
            localStorage.removeItem('gameStats');
            localStorage.removeItem('gymProgress');
            localStorage.removeItem('operationMode');
            localStorage.removeItem('gradeLevel');
            localStorage.removeItem('allowedOperations');
            localStorage.removeItem('isMuted');
            
            // Reset all variables to defaults
            caughtPokemon = {};
            injuredPokemon = [];
            gameStats = {
                totalProblems: 0,
                correctAnswers: 0,
                currentStreak: 0,
                bestStreak: 0,
                operationCounts: { addition: 0, subtraction: 0, multiplication: 0, division: 0 },
                unlockedBadges: []
            };
            gymProgress = {
                unlockedGyms: [1],
                completedGyms: [],
                badges: [],
                healingUnlocked: false,
                voicesUnlocked: {
                    charmander: false,
                    pikachu: false,
                    jigglypuff: false
                },
                legendariesUnlocked: {
                    articuno: false,
                    zapdos: false,
                    moltres: false,
                    mewtwo: false,
                    mew: false
                }
            };
            operationMode = 'random';
            gradeLevel = 4;
            allowedOperations = ['addition', 'subtraction', 'multiplication', 'division'];
            isMuted = false;
            
            closeFullResetConfirmation();
            
            // Show success notification
            const notification = document.getElementById('ranAwayNotification');
            notification.innerHTML = '✨ Game completely reset! Welcome back, Trainer! ✨';
            notification.style.display = 'block';
            
            setTimeout(() => {
                notification.style.display = 'none';
                notification.innerHTML = '💨 <span id="pokemonName"></span> ran away! 💨';
            }, 3000);
            
            // Update all displays
            updateBadgeCount();
            updateStreakDisplay();
            updateMuteButton();
            setOperation('random');
            document.getElementById('gradeLevel').value = 4;
            initializeGrid();
        }

        // Open badge modal
        function openBadgeModal() {
            renderBadges();
            updateStatsDisplay();
            document.getElementById('badgeModal').classList.add('active');
        }

        // Close badge modal
        function closeBadgeModal() {
            document.getElementById('badgeModal').classList.remove('active');
        }

        // Render badges in modal
        function renderBadges() {
            const grid = document.getElementById('badgesGrid');
            grid.innerHTML = '';

            badges.forEach(badge => {
                const isUnlocked = gameStats.unlockedBadges.includes(badge.id);
                const progress = getBadgeProgress(badge);
                
                const badgeEl = document.createElement('div');
                badgeEl.className = `badge-item ${isUnlocked ? 'unlocked' : 'locked'}`;
                
                badgeEl.innerHTML = `
                    <div class="badge-icon">${badge.icon}</div>
                    <div class="badge-name">${badge.name}</div>
                    <div class="badge-description">${badge.description}</div>
                    ${!isUnlocked ? `<div class="badge-progress">${progress}</div>` : '<div class="badge-progress">✓ Unlocked!</div>'}
                `;
                
                grid.appendChild(badgeEl);
            });
        }

        // Get badge progress text
        function getBadgeProgress(badge) {
            switch(badge.id) {
                case 'math_trainer':
                    return `${Object.keys(caughtPokemon).length}/10 caught`;
                case 'gym_leader':
                    return `${Object.keys(caughtPokemon).length}/50 caught`;
                case 'champion':
                    return `${Object.keys(caughtPokemon).length}/150 caught`;
                case 'no_mistakes':
                    return `${gameStats.currentStreak}/5 streak`;
                case 'operation_master_add':
                    return `${gameStats.operationCounts.addition}/20 completed`;
                case 'operation_master_sub':
                    return `${gameStats.operationCounts.subtraction}/20 completed`;
                case 'operation_master_mult':
                    return `${gameStats.operationCounts.multiplication}/20 completed`;
                case 'operation_master_div':
                    return `${gameStats.operationCounts.division}/20 completed`;
                case 'perfect_ten':
                    return `${gameStats.bestStreak}/10 best streak`;
                case 'scholar':
                    return `${gameStats.totalProblems}/100 solved`;
                case 'ace_student':
                    const accuracy = gameStats.totalProblems > 0 ? Math.round((gameStats.correctAnswers / gameStats.totalProblems) * 100) : 0;
                    return `${accuracy}% accuracy (need 90%)`;
                default:
                    return 'In progress...';
            }
        }

        // Update stats display in modal
        function updateStatsDisplay() {
            document.getElementById('total-problems').textContent = gameStats.totalProblems;
            
            const accuracy = gameStats.totalProblems > 0 
                ? Math.round((gameStats.correctAnswers / gameStats.totalProblems) * 100) 
                : 0;
            document.getElementById('accuracy-rate').textContent = accuracy + '%';
            
            document.getElementById('best-streak').textContent = gameStats.bestStreak;
            
            // Find favorite operation
            const ops = gameStats.operationCounts;
            const favorite = Object.keys(ops).reduce((a, b) => ops[a] > ops[b] ? a : b);
            const favoriteIcons = {
                addition: '➕ Addition',
                subtraction: '➖ Subtraction',
                multiplication: '✖️ Multiplication',
                division: '➗ Division'
            };
            document.getElementById('favorite-operation').textContent = 
                ops[favorite] > 0 ? favoriteIcons[favorite] : '-';
        }

        // Update stats
        function updateStats() {
            const count = Object.keys(caughtPokemon).length;
            const caughtCountEl = document.getElementById('caught-count');
            if (caughtCountEl) {
                caughtCountEl.textContent = count;
            }
        }

        // Enter key support
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('answerInput').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    checkAnswer();
                }
            });
            
            // Gym answer inputs Enter key support
            document.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const activeElement = document.activeElement;
                    if (activeElement && activeElement.id === 'gymAnswerInput') {
                        checkGymAnswer();
                    } else if (activeElement && activeElement.id === 'gymBattleInput') {
                        checkBattleAnswer();
                    }
                }
            });
            
            // Menu button event listeners
            document.getElementById('startGameBtn').addEventListener('click', startGame);
            document.getElementById('gymChallengeBtn').addEventListener('click', () => navigateTo('gym'));
            document.getElementById('startBattleBtn').addEventListener('click', startBattleFromMenu);
            document.getElementById('openSettingsBtn').addEventListener('click', openSettings);
            document.getElementById('openBadgesBtn').addEventListener('click', openBadgeModal);
            document.getElementById('resetGameBtn').addEventListener('click', showFullResetConfirmation);
            
            // Battle mode start button
            document.getElementById('startBattleModeBtn').addEventListener('click', startBattleMode);
            
            updateMuteButton(); // Initialize mute button state
            setOperation(operationMode); // Initialize operation mode button state
            
            // Initialize grade level dropdown if it exists
            const gradeLevelDropdown = document.getElementById('gradeLevel');
            if (gradeLevelDropdown) {
                gradeLevelDropdown.value = gradeLevel;
            }
            
            updateBadgeCount(); // Initialize badge count
            updateStreakDisplay(); // Initialize streak display
            initializeGrid();
        });
