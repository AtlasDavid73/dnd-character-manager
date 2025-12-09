# D&D Character Manager

A web-based application for managing Dungeons & Dragons 5th Edition characters, spells, and monsters using the D&D 5e API.

##  Live Demo
[Add your GitHub Pages link here once deployed]

##  About This Project

The D&D Character Manager is a comprehensive tool for D&D 5e players and dungeon masters. It allows users to:
- Build and customize characters with different races and classes
- Search and browse through hundreds of spells
- Explore monsters with detailed stats and abilities

This project uses the official [D&D 5e API](https://www.dnd5eapi.co/) to fetch real-time data about characters, spells, and monsters.

##  Team Members
- [Team Member David] - Character Builder Page
- [Team Member Elijah] - Spells Library Page
- [Team Member Garrett] - Monster Database Page


##  Page Descriptions

### Homepage (index.html)
**Function:** Serves as the landing page and navigation hub for the entire website.

**Features:**
- Hero section with project introduction
- Feature cards highlighting each main page
- Responsive navigation menu
- Fantasy-themed design with D&D aesthetic

**Technologies:** HTML5, CSS3 with animations, JavaScript

---

### Character Builder (character.html)
**Function:** Allows users to create D&D 5e characters by selecting race and class.

**Form Purpose:**
- Input: Character name, race selection, class selection
- Output: Detailed character information including ability scores, proficiencies, and saving throws

**API Integration:**
- Fetches all available races from `/api/races`
- Fetches all available classes from `/api/classes`
- Retrieves detailed information for selected race and class
- Displays ability score bonuses, proficiencies, and class features

**Animations & Styles:**
- Fade in animations for character display
- Hover effects on form elements
- Gradient backgrounds with glassmorphism effects
- Responsive card layout for character details

---

### Spells Library (spells.html)
**Function:** Provides a searchable database of D&D 5e spells.

**Form Purpose:**
- Input: Spell name search, spell level filter
- Output: List of matching spells with full descriptions and casting details

**API Integration:**
- Fetches complete spell list from `/api/spells`
- Retrieves detailed spell information including:
  - Casting time, range, components, duration
  - Full spell descriptions
  - Higher level casting effects
- Displays popular spells on page load (Fireball, Magic Missile, Cure Wounds, etc.)

**Animations & Styles:**
- Slide in animations for spell cards
- Color coded spell levels
- Hover effects with elevation shadows
- Loading spinner during API calls
- Responsive grid layout

---

### Monster Database (monsters.html)
**Function:** Displays D&D 5e monsters with complete stat blocks.

**Form Purpose:**
- Input: Monster name search, challenge rating filter
- Output: Monster cards with stats, abilities, and actions

**API Integration:**
- Fetches all monsters from `/api/monsters`
- Retrieves detailed monster information including:
  - Ability scores (STR, DEX, CON, INT, WIS, CHA)
  - Hit points, armor class, and speed
  - Special abilities and actions
  - Challenge rating and XP value
- Displays iconic monsters on page load (Dragon, Beholder, Owlbear, etc.)

**Animations & Styles:**
- Card flip animations on hover
- Color coded ability score grids
- Red accent theme for danger/combat
- Responsive stat layout
- Loading indicators

---

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Styling, animations, and responsive design
  - CSS Grid & Flexbox for layouts
  - CSS animations and transitions
  - Glassmorphism effects
  - Mobile first responsive design
- **JavaScript (ES6+)**  Interactivity and API integration
  - Fetch API for HTTP requests
  - Async/await for handling promises
  - DOM manipulation
  - Event handling
- **D&D 5e API**  External data source
- **GitHub Pages**  Deployment platform

## Project Structure

```
dnd-character-manager/
├── index.html              # Homepage
├── character.html          # Character builder page
├── spells.html            # Spells library page
├── monsters.html          # Monster database page
├── assets/
│   ├── css/
│   │   └── main.css       # Main stylesheet
│   ├── js/
│   │   ├── script.js      # Main JavaScript
│   │   ├── character.js   # Character page logic
│   │   ├── spells.js      # Spells page logic
│   │   └── monsters.js    # Monsters page logic
│   └── images/            # Image assets
├── wireframes/            # Design wireframes
└── README.md             # This file
```





## API Documentation

The project uses the [D&D 5e API](https://www.dnd5eapi.co/docs/) which provides:
- No authentication required
- RESTful endpoints
- JSON responses
- Complete D&D 5e SRD content

**Key Endpoints Used:**
- `GET /api/races`  List all races
- `GET /api/classes`  List all classes
- `GET /api/spells`  List all spells
- `GET /api/monsters`   List all monsters
- `GET /api/{resource}/{index}`   Get detailed information

## Contributing

This is a class project. Team members should:
1. Create feature branches for their work
2. Make regular commits with clear messages
3. Test changes before pushing
4. Avoid merge conflicts by communicating
5. Pull latest changes before starting work




