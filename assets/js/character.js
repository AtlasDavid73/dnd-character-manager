// D&D 5e API Base URL
const API_BASE = 'https://www.dnd5eapi.co/api';

// Load races and classes when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadRaces();
    loadClasses();
});

// Fetch and populate races dropdown
async function loadRaces() {
    try {
        const response = await fetch(`${API_BASE}/races`);
        const data = await response.json();
        
        const raceSelect = document.getElementById('race-select');
        data.results.forEach(race => {
            const option = document.createElement('option');
            option.value = race.index;
            option.textContent = race.name;
            raceSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading races:', error);
        alert('Failed to load races. Please refresh the page.');
    }
}

// Fetch and populate classes dropdown
async function loadClasses() {
    try {
        const response = await fetch(`${API_BASE}/classes`);
        const data = await response.json();
        
        const classSelect = document.getElementById('class-select');
        data.results.forEach(charClass => {
            const option = document.createElement('option');
            option.value = charClass.index;
            option.textContent = charClass.name;
            classSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading classes:', error);
        alert('Failed to load classes. Please refresh the page.');
    }
}

// Handle form submission
document.getElementById('character-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const charName = document.getElementById('char-name').value;
    const raceIndex = document.getElementById('race-select').value;
    const classIndex = document.getElementById('class-select').value;
    
    if (!charName || !raceIndex || !classIndex) {
        alert('Please fill in all fields!');
        return;
    }
    
    // Fetch detailed race and class information
    try {
        const [raceData, classData] = await Promise.all([
            fetch(`${API_BASE}/races/${raceIndex}`).then(res => res.json()),
            fetch(`${API_BASE}/classes/${classIndex}`).then(res => res.json())
        ]);
        
        displayCharacter(charName, raceData, classData);
    } catch (error) {
        console.error('Error creating character:', error);
        alert('Failed to create character. Please try again.');
    }
});

// Display the created character
function displayCharacter(name, race, charClass) {
    const display = document.getElementById('character-display');
    const details = document.getElementById('character-details');
    
    // Build character details HTML
    let html = `
        <div class="character-card">
            <h4 class="char-name">${name}</h4>
            <div class="char-info">
                <p><strong>Race:</strong> ${race.name}</p>
                <p><strong>Size:</strong> ${race.size}</p>
                <p><strong>Speed:</strong> ${race.speed} ft.</p>
                <p><strong>Class:</strong> ${charClass.name}</p>
                <p><strong>Hit Die:</strong> d${charClass.hit_die}</p>
            </div>
            
            <div class="char-section">
                <h5>Ability Score Bonuses:</h5>
                <ul>
                    ${race.ability_bonuses.map(bonus => 
                        `<li>${bonus.ability_score.name}: +${bonus.bonus}</li>`
                    ).join('')}
                </ul>
            </div>
            
            <div class="char-section">
                <h5>Proficiencies (${charClass.name}):</h5>
                <ul>
                    ${charClass.proficiencies.slice(0, 5).map(prof => 
                        `<li>${prof.name}</li>`
                    ).join('')}
                </ul>
            </div>
            
            <div class="char-section">
                <h5>Saving Throws:</h5>
                <ul>
                    ${charClass.saving_throws.map(save => 
                        `<li>${save.name}</li>`
                    ).join('')}
                </ul>
            </div>
        </div>
    `;
    
    details.innerHTML = html;
    display.style.display = 'block';
    
    // Scroll to results
    display.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Add some CSS for character display
const style = document.createElement('style');
style.textContent = `
    .character-card {
        background: rgba(255, 255, 255, 0.05);
        padding: 1.5rem;
        border-radius: 10px;
        border: 1px solid rgba(255, 215, 0, 0.3);
    }
    
    .char-name {
        color: #ffd700;
        font-size: 2rem;
        text-align: center;
        margin-bottom: 1.5rem;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    
    .char-info {
        background: rgba(0, 0, 0, 0.3);
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
    }
    
    .char-info p {
        color: #e0e0e0;
        margin: 0.5rem 0;
    }
    
    .char-info strong {
        color: #ffd700;
    }
    
    .char-section {
        margin-top: 1.5rem;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 8px;
    }
    
    .char-section h5 {
        color: #ffd700;
        margin-bottom: 0.8rem;
        font-size: 1.2rem;
    }
    
    .char-section ul {
        list-style: none;
        padding-left: 0;
    }
    
    .char-section li {
        color: #e0e0e0;
        padding: 0.3rem 0;
        border-bottom: 1px solid rgba(255, 215, 0, 0.1);
    }
    
    .char-section li:last-child {
        border-bottom: none;
    }
`;
document.head.appendChild(style);