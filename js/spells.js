// D&D 5e API Base URL
const API_BASE = 'https://www.dnd5eapi.co/api';

// Handle spell search form
document.getElementById('spell-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const searchTerm = document.getElementById('spell-search').value.toLowerCase().trim();
    const spellLevel = document.getElementById('spell-level').value;
    
    // Show loading
    const resultsDiv = document.getElementById('spell-results');
    resultsDiv.innerHTML = '<div class="loading"><div class="spinner"></div><p>Searching for spells...</p></div>';
    
    try {
        // Fetch all spells
        const response = await fetch(`${API_BASE}/spells`);
        const data = await response.json();
        
        // Filter spells based on search criteria
        let filteredSpells = data.results;
        
        if (searchTerm) {
            filteredSpells = filteredSpells.filter(spell => 
                spell.name.toLowerCase().includes(searchTerm)
            );
        }
        
        // If we have filtered spells, fetch their details
        if (filteredSpells.length > 0) {
            // Limit to first 20 results for performance
            const spellsToFetch = filteredSpells.slice(0, 20);
            const spellDetails = await Promise.all(
                spellsToFetch.map(spell => 
                    fetch(`${API_BASE}/spells/${spell.index}`).then(res => res.json())
                )
            );
            
            // Filter by level if specified
            let finalSpells = spellDetails;
            if (spellLevel !== '') {
                finalSpells = spellDetails.filter(spell => 
                    spell.level === parseInt(spellLevel)
                );
            }
            
            displaySpells(finalSpells);
        } else {
            resultsDiv.innerHTML = '<p class="no-results">No spells found. Try a different search term.</p>';
        }
        
    } catch (error) {
        console.error('Error fetching spells:', error);
        resultsDiv.innerHTML = '<p class="error">Error loading spells. Please try again.</p>';
    }
});

// Display spell results
function displaySpells(spells) {
    const resultsDiv = document.getElementById('spell-results');
    
    if (spells.length === 0) {
        resultsDiv.innerHTML = '<p class="no-results">No spells match your criteria.</p>';
        return;
    }
    
    let html = '';
    spells.forEach(spell => {
        const levelText = spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`;
        const components = spell.components ? spell.components.join(', ') : 'None';
        const castingTime = spell.casting_time || 'Unknown';
        const range = spell.range || 'Unknown';
        const duration = spell.duration || 'Unknown';
        
        html += `
            <div class="result-card spell-card">
                <h3>${spell.name}</h3>
                <p class="spell-level">${levelText} ${spell.school ? spell.school.name : ''}</p>
                <div class="spell-details">
                    <p><strong>Casting Time:</strong> ${castingTime}</p>
                    <p><strong>Range:</strong> ${range}</p>
                    <p><strong>Components:</strong> ${components}</p>
                    <p><strong>Duration:</strong> ${duration}</p>
                </div>
                <div class="spell-description">
                    <p><strong>Description:</strong></p>
                    <p>${spell.desc ? spell.desc.join(' ') : 'No description available.'}</p>
                </div>
                ${spell.higher_level ? `
                    <div class="spell-higher">
                        <p><strong>At Higher Levels:</strong></p>
                        <p>${spell.higher_level.join(' ')}</p>
                    </div>
                ` : ''}
            </div>
        `;
    });
    
    resultsDiv.innerHTML = html;
}

// Load some default spells on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPopularSpells();
});

// Load popular/common spells
async function loadPopularSpells() {
    const popularSpellIndexes = ['fireball', 'magic-missile', 'cure-wounds', 'shield', 'counterspell'];
    const resultsDiv = document.getElementById('spell-results');
    
    try {
        resultsDiv.innerHTML = '<div class="loading"><p>Loading popular spells...</p></div>';
        
        const spells = await Promise.all(
            popularSpellIndexes.map(index => 
                fetch(`${API_BASE}/spells/${index}`).then(res => res.json())
            )
        );
        
        displaySpells(spells);
    } catch (error) {
        console.error('Error loading popular spells:', error);
        resultsDiv.innerHTML = '<p>Use the search form above to find spells.</p>';
    }
}

// Add styling for spell cards
const style = document.createElement('style');
style.textContent = `
    .spell-card {
        border-left: 4px solid #ffd700;
    }
    
    .spell-level {
        color: #ffd700;
        font-style: italic;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .spell-details {
        background: rgba(0, 0, 0, 0.3);
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
    }
    
    .spell-details p {
        margin: 0.3rem 0;
        font-size: 0.9rem;
    }
    
    .spell-description {
        margin-top: 1rem;
        line-height: 1.6;
    }
    
    .spell-description p:first-child {
        color: #ffd700;
        margin-bottom: 0.5rem;
    }
    
    .spell-higher {
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(102, 126, 234, 0.2);
        border-radius: 8px;
        border-left: 3px solid #667eea;
    }
    
    .spell-higher p:first-child {
        color: #667eea;
        margin-bottom: 0.5rem;
    }
    
    .no-results, .error {
        text-align: center;
        color: #ffd700;
        padding: 2rem;
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);