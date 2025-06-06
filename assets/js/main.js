// Main JavaScript for Monique's Mind Blowers
class MindBlowers {
    constructor() {
        this.topics = [];
        this.currentCategory = 'all';
        this.init();
    }

    async init() {
        await this.loadTopics();
        this.setupEventListeners();
        this.updateStats();
        this.renderTopics();
    }

    async loadTopics() {
        // Load topics from data file
        try {
            const response = await fetch('data/topics.json');
            if (response.ok) {
                this.topics = await response.json();
            } else {
                // Initialize with the big beautiful bill
                this.topics = [{
                    id: 'big-beautiful-bill-2025',
                    title: 'The One Big Beautiful Bill Act of 2025',
                    category: 'politics',
                    description: 'A comprehensive breakdown of the sweeping tax and spending bill that\'s reshaping America\'s economic landscape',
                    date: '2025-06-06',
                    views: 0,
                    readTime: '5 min',
                    file: 'topics/politics/big-beautiful-bill-2025.html'
                }];
                this.saveTopics();
            }
        } catch (error) {
            console.log('Creating initial topic structure');
            this.topics = [{
                id: 'big-beautiful-bill-2025',
                title: 'The One Big Beautiful Bill Act of 2025',
                category: 'politics',
                description: 'A comprehensive breakdown of the sweeping tax and spending bill that\'s reshaping America\'s economic landscape',
                date: '2025-06-06',
                views: 0,
                readTime: '5 min',
                file: 'topics/politics/big-beautiful-bill-2025.html'
            }];
        }
    }

    saveTopics() {
        // In a real app, this would save to a server
        localStorage.setItem('mindblowers_topics', JSON.stringify(this.topics));
    }
    setupEventListeners() {
        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelector('.category-btn.active').classList.remove('active');
                btn.classList.add('active');
                this.currentCategory = btn.dataset.category;
                this.renderTopics();
            });
        });

        // Search functionality
        const searchBox = document.getElementById('searchBox');
        searchBox.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Modal
        const modal = document.getElementById('topicModal');
        const closeBtn = document.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.getElementById('topicFrame').src = '';
        });

        // FAB menu
        document.getElementById('randomTopic').addEventListener('click', () => {
            this.openRandomTopic();
        });

        document.getElementById('toggleTheme').addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
        });

        document.getElementById('fullscreen').addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });
    }

    renderTopics() {
        const grid = document.getElementById('topicsGrid');
        const filteredTopics = this.currentCategory === 'all' 
            ? this.topics 
            : this.topics.filter(t => t.category === this.currentCategory);

        grid.innerHTML = filteredTopics.map(topic => this.createTopicCard(topic)).join('');
        
        // Add click handlers to cards
        grid.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('click', () => this.openTopic(card.dataset.id));
        });
    }
    createTopicCard(topic) {
        const categoryIcons = {
            politics: '🏛️',
            science: '🧬',
            technology: '💻',
            culture: '🎭',
            health: '💊',
            finance: '💰',
            dashboard: '📊'
        };

        return `
            <div class="topic-card" data-id="${topic.id}">
                <div class="topic-header">
                    <h3 class="topic-title">${topic.title}</h3>
                    <span class="topic-category">${categoryIcons[topic.category]} ${topic.category}</span>
                </div>
                <p class="topic-description">${topic.description}</p>
                <div class="topic-meta">
                    <span>${topic.readTime} read</span>
                    <span>${topic.views} views</span>
                </div>
            </div>
        `;
    }

    openTopic(topicId) {
        const topic = this.topics.find(t => t.id === topicId);
        if (topic) {
            topic.views++;
            this.saveTopics();
            
            const modal = document.getElementById('topicModal');
            const frame = document.getElementById('topicFrame');
            frame.src = topic.file;
            modal.style.display = 'block';
        }
    }

    openRandomTopic() {
        const randomIndex = Math.floor(Math.random() * this.topics.length);
        this.openTopic(this.topics[randomIndex].id);
    }

    handleSearch(query) {
        const filtered = this.topics.filter(topic => 
            topic.title.toLowerCase().includes(query.toLowerCase()) ||
            topic.description.toLowerCase().includes(query.toLowerCase())
        );
        
        const grid = document.getElementById('topicsGrid');
        grid.innerHTML = filtered.map(topic => this.createTopicCard(topic)).join('');
        
        grid.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('click', () => this.openTopic(card.dataset.id));
        });
    }

    updateStats() {
        document.getElementById('topicCount').textContent = this.topics.length;
        document.getElementById('viewCount').textContent = 
            this.topics.reduce((total, topic) => total + topic.views, 0);
        document.getElementById('lastUpdate').textContent = 'Today';
    }
}

// Initialize the app
window.addEventListener('DOMContentLoaded', () => {
    new MindBlowers();
});