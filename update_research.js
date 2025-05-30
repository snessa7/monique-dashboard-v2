// Research Update Helper for Monique's Dashboard
// This file helps update the research section with new topics

// Example function to update research with new data
function addNewResearch(topic, summary, points, imageUrl, sources) {
    // Get existing research data or create empty array
    const existingData = JSON.parse(localStorage.getItem('researchData') || '[]');
    
    // Create new research item
    const newResearch = {
        topic: topic,
        summary: summary,
        points: points,
        image: imageUrl,
        sources: sources,
        dateAdded: new Date().toISOString()
    };
    
    // Add to beginning of array (newest first)
    existingData.unshift(newResearch);
    
    // Keep only the last 6 research items
    if (existingData.length > 6) {
        existingData.pop();
    }
    
    // Save to localStorage
    localStorage.setItem('researchData', JSON.stringify(existingData));
    
    // If window.updateResearch exists (page is open), update display
    if (typeof window.updateResearch === 'function') {
        window.updateResearch(existingData);
    }
    
    return newResearch;
}

// Example usage:
/*
addNewResearch(
    "AI Investment Opportunities 2025",
    "The AI revolution is creating unprecedented investment opportunities across multiple sectors, from infrastructure to applications.",
    [
        "NVIDIA dominates GPU market with 80%+ share for AI training",
        "Cloud providers (AWS, Azure, GCP) investing $100B+ in AI infrastructure",
        "Energy demand from data centers expected to double by 2026",
        "AI software market projected to reach $1.8 trillion by 2030"
    ],
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
    [
        { name: "Goldman Sachs AI Report", url: "https://www.goldmansachs.com/intelligence/pages/ai-investment-forecast.html" },
        { name: "McKinsey AI Analysis", url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights" },
        { name: "Gartner Research", url: "https://www.gartner.com/en/topics/artificial-intelligence" }
    ]
);
*/

// Function to clear all research
function clearAllResearch() {
    localStorage.removeItem('researchData');
    if (typeof window.updateResearch === 'function') {
        window.updateResearch([]);
    }
}

// Function to get all current research
function getAllResearch() {
    return JSON.parse(localStorage.getItem('researchData') || '[]');
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addNewResearch,
        clearAllResearch,
        getAllResearch
    };
}