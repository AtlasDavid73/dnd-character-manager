// D&D 5e API Base URL
const API_BASE = 'https://www.dnd5eapi.co/api';

// Handle monster search form
document.getElementById('monster-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const searchTerm = document.getElementById('monster-search').value.toLowerCase().trim();
    const challengeRating = document.getElementById('challenge-rating').value;
    
    // Show loading
    const resultsDiv = document.getElementById('monster-results');
    resultsDiv.innerHTML = '<div class="loading"><div class="spinner"></div><p>Hunting for monsters...</p></div>';
    
    try {
        // Fetch all monsters
        const response = await fetch(`${API_BASE}/monsters`);
        const data = await response.json();
        
        // Filter monsters based on search term
        let filteredMonsters = data.results;
        
        if (searchTerm) {
            filteredMonsters = filteredMonsters.filter(monster => 
                monster.name.toLowerCase().includes(searchTerm)
            );
        }
        
        // Fetch details for filtered monsters (limit to 15 for performance)
        if (filteredMonsters.length > 0) {
            const monstersToFetch = filteredMonsters.slice(0, 15);
            const monsterDetails = await Promise.all(
                monstersToFetch.map(monster => 
                    fetch(`${API_BASE}/monsters/${monster.index}`).then(res => res.json())
                )
            );
            
            // Filter by challenge rating if specified
            let finalMonsters = monsterDetails;
            if (challengeRating !== '') {
                finalMonsters = monsterDetails.filter(monster => 
                    monster.challenge_rating === parseFloat(challengeRating)
                );
            }
            
            displayMonsters(finalMonsters);
        } else {
            resultsDiv.innerHTML = '<p class="no-results">No monsters found. Try a different search term.</p>';
        }
        
    } catch (error) {
        console.error('Error fetching monsters:', error);
        resultsDiv.innerHTML = '<p class="error">Error loading monsters. Please try again.</p>';
    }
});

// Display monster results
function displayMonsters(monsters) {
    const resultsDiv = document.getElementById('monster-results');
    
    if (monsters.length === 0) {
        resultsDiv.innerHTML = '<p class="no-results">No monsters match your criteria.</p>';
        return;
    }
    
    let html = '';
    monsters.forEach(monster => {
        const cr = monster.challenge_rating || 0;
        const xp = monster.xp || 0;
        const type = monster.type || 'Unknown';
        const size = monster.size || 'Unknown';
        const alignment = monster.alignment || 'Unaligned';
        
        // Get ability scores
        const str = monster.strength || 10;
        const dex = monster.dexterity || 10;
        const con = monster.constitution || 10;
        const int = monster.intelligence || 10;
        const wis = monster.wisdom || 10;
        const cha = monster.charisma || 10;
        
        html += `
            <div class="result-card monster-card">
                <h3>${monster.name}</h3>
                <p class="monster-type">${size} ${type}, ${alignment}</p>
                
                <div class="monster-stats">
                    <div class="stat-row">
                        <span><strong>CR:</strong> ${cr}</span>
                        <span><strong>XP:</strong> ${xp.toLocaleString()}</span>
                    </div>
                    <div class="stat-row">
                        <span><strong>HP:</strong> ${monster.hit_points || 0}</span>
                        <span><strong>AC:</strong> ${monster.armor_class ? monster.armor_class[0]?.value || 0 : 0}</span>
                    </div>
                    <div class="stat-row">
                        <span><strong>Speed:</strong> ${monster.speed?.walk || '0 ft.'}</span>
                    </div>
                </div>
                
                <div class="ability-scores">
                    <div class="ability">
                        <span class="ability-name">STR</span>
                        <span class="ability-value">${str}</span>
                    </div>
                    <div class="ability">
                        <span class="ability-name">DEX</span>
                        <span class="ability-value">${dex}</span>
                    </div>
                    <div class="ability">
                        <span class="ability-name">CON</span>
                        <span class="ability-value">${con}</span>
                    </div>
                    <div class="ability">
                        <span class="ability-name">INT</span>
                        <span class="ability-value">${int}</span>
                    </div>
                    <div class="ability">
                        <span class="ability-name">WIS</span>
                        <span class="ability-value">${wis}</span>
                    </div>
                    <div class="ability">
                        <span class="ability-name">CHA</span>
                        <span class="ability-value">${cha}</span>
                    </div>
                </div>
                
                ${monster.special_abilities && monster.special_abilities.length > 0 ? `
                    <div class="special-abilities">
                        <h4>Special Abilities:</h4>
                        <ul>
                            ${monster.special_abilities.slice(0, 3).map(ability => `
                                <li><strong>${ability.name}:</strong> ${ability.desc}</li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${monster.actions && monster.actions.length > 0 ? `
                    <div class="actions">
                        <h4>Actions:</h4>
                        <ul>
                            ${monster.actions.slice(0, 2).map(action => `
                                <li><strong>${action.name}:</strong> ${action.desc}</li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
    });
    
    resultsDiv.innerHTML = html;
}

// Load some default monsters on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPopularMonsters();
});

// Load popular monsters
async function loadPopularMonsters() {
    const popularMonsterIndexes = ['dragon', 'goblin', 'owlbear', 'beholder', 'tarrasque'];
    const resultsDiv = document.getElementById('monster-results');
    
    try {
        resultsDiv.innerHTML = '<div class="loading"><p>Loading fearsome monsters...</p></div>';
        
        const monsters = await Promise.all(
            popularMonsterIndexes.map(index => 
                fetch(`${API_BASE}/monsters/${index}`)
                    .then(res => res.json())
                    .catch(() => null)
            )
        );
        
        // Filter out any failed requests
        const validMonsters = monsters.filter(m => m !== null);
        displayMonsters(validMonsters);
    } catch (error) {
        console.error('Error loading popular monsters:', error);
        resultsDiv.innerHTML = '<p>Use the search form above to find monsters.</p>';
    }
}

// Add styling for monster cards
const style = document.createElement('style');
style.textContent = `
    .monster-card {
        border-left: 4px solid #dc3545;
    }
    
    .monster-type {
        color: #dc3545;
        font-style: italic;
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }
    
    .monster-stats {
        background: rgba(0, 0, 0, 0.3);
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
    }
    
    .stat-row {
        display: flex;
        justify-content: space-between;
        margin: 0.5rem 0;
        font-size: 0.9rem;
    }
    
    .ability-scores {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 0.5rem;
        margin: 1rem 0;
        padding: 1rem;
        background: rgba(255, 215, 0, 0.1);
        border-radius: 8px;
    }
    
    .ability {
        text-align: center;
        padding: 0.5rem;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
    }
    
    .ability-name {
        display: block;
        color: #ffd700;
        font-weight: bold;
        font-size: 0.8rem;
        margin-bottom: 0.3rem;
    }
    
    .ability-value {
        display: block;
        color: #fff;
        font-size: 1.2rem;
        font-weight: bold;
    }
    
    .special-abilities,
    .actions {
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(220, 53, 69, 0.1);
        border-radius: 8px;
        border-left: 3px solid #dc3545;
    }
    
    .special-abilities h4,
    .actions h4 {
        color: #dc3545;
        margin-bottom: 0.5rem;
        font-size: 1rem;
    }
    
    .special-abilities ul,
    .actions ul {
        list-style: none;
        padding: 0;
    }
    
    .special-abilities li,
    .actions li {
        margin: 0.5rem 0;
        padding: 0.5rem;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        font-size: 0.9rem;
        line-height: 1.4;
    }
    
    @media (max-width: 768px) {
        .ability-scores {
            grid-template-columns: repeat(3, 1fr);
        }
    }
`;
document.head.appendChild(style);