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
        console.log('Loading topics...');
        
        // Try multiple sources for topics data
        const sources = [
            'data/topics.json',
            './data/topics.json',
            '/data/topics.json'
        ];
        
        for (const source of sources) {
            try {
                console.log('Trying to load from:', source);
                const response = await fetch(source);
                console.log('Response status:', response.status);
                
                if (response.ok) {
                    this.topics = await response.json();
                    console.log('Successfully loaded', this.topics.length, 'topics from', source);
                    return;
                }
            } catch (error) {
                console.log('Failed to load from', source, ':', error.message);
            }
        }
        
        // Fallback to hardcoded topics if all sources fail
        console.log('Using fallback topics');
        this.topics = [
            {
                id: 'master-plan-2025',
                title: 'Master Plan 2025 - Financial Freedom Strategy',
                category: 'finance',
                description: 'Seth & Monique\'s comprehensive roadmap to financial independence, including income streams, investment strategy, and timeline for reaching $5K monthly goal',
                date: '2025-12-07',
                views: 0,
                readTime: '8 min',
                file: 'topics/finance/master-plan-2025.html'
            },
            {
                id: 'big-beautiful-bill-2025',
                title: 'The One Big Beautiful Bill Act of 2025',
                category: 'politics',
                description: 'A comprehensive breakdown of the sweeping tax and spending bill that\'s reshaping America\'s economic landscape',
                date: '2025-06-06',
                views: 0,
                readTime: '5 min',
                file: 'topics/politics/big-beautiful-bill-2025.html'
            }
        ];
        console.log('Loaded', this.topics.length, 'fallback topics');
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

        // Modal - close handler will be attached dynamically when content is loaded
        const modal = document.getElementById('topicModal');
        
        // Add click outside modal to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // FAB menu
        document.getElementById('testModal').addEventListener('click', () => {
            this.showSimpleModal(`
                <div style="color: white; padding: 40px; text-align: center;">
                    <h1 style="color: #00d4ff; margin-bottom: 20px;">🧪 Modal Test</h1>
                    <p style="font-size: 18px; margin-bottom: 20px;">This is a test modal!</p>
                    <p>If you can see this, the modal system is working correctly.</p>
                    <button onclick="document.getElementById('topicModal').style.display='none'" 
                            style="margin-top: 20px; padding: 10px 20px; background: #00d4ff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        Close Test
                    </button>
                </div>
            `);
        });

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
            finance: '💰'
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

    async openTopic(topicId) {
        console.log('=== OPENING TOPIC ===');
        console.log('Topic ID:', topicId);
        
        // First, let's test the modal with simple content
        this.showSimpleModal(`
            <div style="color: white; padding: 40px; text-align: center; background: #333; border-radius: 10px;">
                <h1 style="color: #00d4ff; margin-bottom: 20px;">Testing Modal</h1>
                <p>If you can see this, the modal is working!</p>
                <p>Loading content for topic: ${topicId}</p>
                <div id="loadingStatus" style="margin-top: 20px; font-style: italic;">Loading...</div>
            </div>
        `);
        
        const topic = this.topics.find(t => t.id === topicId);
        if (!topic) {
            this.updateModalContent('Topic not found: ' + topicId);
            return;
        }
        
        try {
            console.log('Fetching:', topic.file);
            const response = await fetch(topic.file);
            console.log('Response status:', response.status);
            
            if (response.ok) {
                const content = await response.text();
                console.log('Content loaded, first 100 chars:', content.substring(0, 100));
                
                // Extract just the body content
                const parser = new DOMParser();
                const doc = parser.parseFromString(content, 'text/html');
                const bodyContent = doc.body ? doc.body.innerHTML : content;
                
                this.updateModalContent(bodyContent);
                topic.views++;
                this.saveTopics();
            } else {
                this.updateModalContent(`Error loading content: HTTP ${response.status}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            this.updateModalContent('Network error: ' + error.message);
        }
    }

    showSimpleModal(content) {
        const modal = document.getElementById('topicModal');
        const modalContent = modal.querySelector('.modal-content');
        
        modalContent.innerHTML = `
            <span class="close" style="position: absolute; top: 15px; right: 25px; font-size: 28px; font-weight: bold; color: white; cursor: pointer; z-index: 1000;">&times;</span>
            <div class="modal-body" style="padding: 20px; height: 100%; overflow-y: auto;">
                ${content}
            </div>
        `;
        
        // Add close functionality
        const closeBtn = modalContent.querySelector('.close');
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };
        
        // Show modal
        modal.style.display = 'block';
        console.log('Modal displayed');
    }

    updateModalContent(newContent) {
        const modalBody = document.querySelector('#topicModal .modal-body');
        if (modalBody) {
            modalBody.innerHTML = `
                <span class="close" style="position: absolute; top: 15px; right: 25px; font-size: 28px; font-weight: bold; color: white; cursor: pointer; z-index: 1000;">&times;</span>
                <div style="color: white; background: rgba(0,0,0,0.8); padding: 20px; border-radius: 10px; margin-top: 30px;">
                    ${newContent}
                </div>
            `;
            
            // Re-attach close functionality
            const closeBtn = modalBody.querySelector('.close');
            if (closeBtn) {
                closeBtn.onclick = () => {
                    document.getElementById('topicModal').style.display = 'none';
                };
            }
        }
    }

    showErrorMessage(message) {
        const modal = document.getElementById('topicModal');
        const modalContent = modal.querySelector('.modal-content');
        
        modalContent.innerHTML = `
            <span class="close">&times;</span>
            <div class="error-message">
                <h2>Oops! Something went wrong</h2>
                <p>${message}</p>
                <button onclick="document.getElementById('topicModal').style.display='none'">Close</button>
            </div>
        `;
        
        const closeBtn = modalContent.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        modal.style.display = 'block';
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