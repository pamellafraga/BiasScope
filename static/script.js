// Examples data
const examples = {
    1: "Todos os homens são bons em matemática, enquanto as mulheres sempre preferem artes.",
    2: "A IA nunca comete erros e sempre produz resultados perfeitos.",
    3: "As pessoas têm habilidades diversas em diferentes áreas do conhecimento.",
    4: "O menino é forte e corajoso, enquanto a menina é delicada e sensível."
};

// Statistics
let totalAnalyses = 0;
let totalBiasDetected = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('inputText');
    textarea.addEventListener('input', updateCharCount);
    updateCharCount();
});

// Update character count
function updateCharCount() {
    const textarea = document.getElementById('inputText');
    const charCount = document.getElementById('charCount');
    charCount.textContent = textarea.value.length;
}

// Load example
function loadExample(num) {
    const textarea = document.getElementById('inputText');
    textarea.value = examples[num];
    updateCharCount();
    
    // Animate textarea
    textarea.style.transform = 'scale(0.98)';
    setTimeout(() => {
        textarea.style.transform = 'scale(1)';
    }, 100);
}

// Analyze text
async function analyzeText() {
    const textarea = document.getElementById('inputText');
    const text = textarea.value.trim();
    
    if (!text) {
        showNotification('Por favor, insira um texto para análise', 'warning');
        return;
    }
    
    // Show loading
    showLoading(true);
    
    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });
        
        if (!response.ok) {
            throw new Error('Erro na análise');
        }
        
        const result = await response.json();
        
        // Update statistics
        totalAnalyses++;
        totalBiasDetected += result.score;
        updateStatistics();
        
        // Show results
        displayResults(result);
        
    } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro ao analisar o texto. Tente novamente.', 'error');
    } finally {
        showLoading(false);
    }
}

// Display results
function displayResults(result) {
    const resultsCard = document.getElementById('resultsCard');
    const scoreValue = document.getElementById('scoreValue');
    const scoreTitle = document.getElementById('scoreTitle');
    const scoreDescription = document.getElementById('scoreDescription');
    const findingsSection = document.getElementById('findingsSection');
    const findingsList = document.getElementById('findingsList');
    const recommendationText = document.getElementById('recommendationText');
    const scoreRing = document.getElementById('scoreRing');
    
    // Show results card
    resultsCard.style.display = 'block';
    
    // Scroll to results
    setTimeout(() => {
        resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
    
    // Update score
    scoreValue.textContent = result.score;
    
    // Calculate stroke offset for ring (max 534 for full circle)
    const maxScore = 10; // arbitrary max for visualization
    const percentage = Math.min(result.score / maxScore, 1);
    const offset = 534 - (534 * percentage);
    scoreRing.style.strokeDashoffset = offset;
    
    // Update score gradient color based on severity
    let gradient;
    if (result.score === 0) {
        gradient = '#10b981'; // green
        scoreTitle.textContent = 'Excelente! Nenhum viés detectado';
        scoreDescription.textContent = 'Seu texto está livre de vieses linguísticos identificáveis';
    } else if (result.score <= 2) {
        gradient = '#f59e0b'; // amber
        scoreTitle.textContent = 'Atenção: Alguns vieses detectados';
        scoreDescription.textContent = 'Foram identificados alguns padrões que podem indicar viés';
    } else {
        gradient = '#ef4444'; // red
        scoreTitle.textContent = 'Alerta: Múltiplos vieses detectados';
        scoreDescription.textContent = 'Seu texto contém vários padrões de viés linguístico';
    }
    
    // Update findings
    if (result.findings && result.findings.length > 0) {
        findingsSection.style.display = 'block';
        findingsList.innerHTML = '';
        
        result.findings.forEach((finding, index) => {
            const findingItem = document.createElement('div');
            findingItem.className = 'finding-item';
            findingItem.style.animationDelay = `${index * 0.1}s`;
            findingItem.textContent = finding;
            findingsList.appendChild(findingItem);
        });
    } else {
        findingsSection.style.display = 'none';
    }
    
    // Update recommendation
    recommendationText.textContent = result.recommendation;
    
    // Add entrance animation
    resultsCard.style.opacity = '0';
    resultsCard.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultsCard.style.transition = 'all 0.5s ease';
        resultsCard.style.opacity = '1';
        resultsCard.style.transform = 'translateY(0)';
    }, 100);
}

// Reset analysis
function resetAnalysis() {
    const resultsCard = document.getElementById('resultsCard');
    const textarea = document.getElementById('inputText');
    
    // Fade out results
    resultsCard.style.opacity = '0';
    resultsCard.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultsCard.style.display = 'none';
        resultsCard.style.transition = '';
        textarea.value = '';
        updateCharCount();
        textarea.focus();
    }, 300);
}

// Update statistics
function updateStatistics() {
    const totalAnalysesEl = document.getElementById('totalAnalyses');
    const biasDetectedEl = document.getElementById('biasDetected');
    
    animateCounter(totalAnalysesEl, totalAnalyses);
    animateCounter(biasDetectedEl, totalBiasDetected);
}

// Animate counter
function animateCounter(element, target) {
    const current = parseInt(element.textContent);
    const increment = Math.ceil((target - current) / 20);
    
    if (current < target) {
        element.textContent = current + increment;
        setTimeout(() => animateCounter(element, target), 30);
    } else {
        element.textContent = target;
    }
}

// Show loading overlay
function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (show) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
    }
}

// Show notification (simple version)
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? 'var(--danger)' : type === 'warning' ? 'var(--warning)' : 'var(--primary)'};
        color: white;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add SVG gradient definition for score ring
const svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgDefs.style.cssText = 'position: absolute; width: 0; height: 0;';
svgDefs.innerHTML = `
    <defs>
        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#00f5ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
        </linearGradient>
    </defs>
`;
document.body.appendChild(svgDefs);

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        showNotification('🎉 Easter Egg Ativado! Modo Arco-Íris!', 'success');
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);
