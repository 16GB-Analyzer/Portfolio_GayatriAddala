// Portfolio JavaScript - Interactive Data Analyst Portfolio
// Author: Addala Gayatri Bhavana

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initTypewriter();
    initParticles();
    initCounters();
    initSkillBars();
    initRadarChart();
    initLearningJourney();
    initDashboard();
    initProjects();
    initScrollAnimations();
    initContactForm();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Typewriter effect
function initTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');

    typewriterElements.forEach((element, index) => {
        const raw = element.getAttribute('data-text') || '';
        const delay = parseInt(element.getAttribute('data-delay')) || index * 800;

        setTimeout(() => {
            // If data-text is a JSON array (e.g. ['role1','role2']), parse and cycle
            let parsed = null;
            try {
                parsed = JSON.parse(raw);
            } catch (e) {
                parsed = null;
            }

            if (Array.isArray(parsed)) {
                // Cycle through array items with typing + deleting
                element.classList.add('show');
                let itemIndex = 0;
                let charIndex = 0;
                let isDeleting = false;

                function cycle() {
                    const current = parsed[itemIndex];
                    if (!isDeleting) {
                        element.textContent = current.substring(0, charIndex);
                        if (charIndex < current.length) {
                            charIndex++;
                            setTimeout(cycle, 80);
                        } else {
                            isDeleting = true;
                            setTimeout(cycle, 1200);
                        }
                    } else {
                        element.textContent = current.substring(0, charIndex);
                        if (charIndex > 0) {
                            charIndex--;
                            setTimeout(cycle, 40);
                        } else {
                            isDeleting = false;
                            itemIndex = (itemIndex + 1) % parsed.length;
                            setTimeout(cycle, 200);
                        }
                    }
                }

                cycle();
            } else {
                element.classList.add('show');
                // Plain string: type once
                typewriterEffect(element, raw);
            }
        }, delay);
    });
}


function typewriterEffect(element, text) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50 + Math.random() * 50); // Variable typing speed
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.position = 'relative';
            }, 1000);
        }
    }
    
    type();
}


// Particle background animation
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number, .metric-value');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    if (!target) return;
    
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target >= 1000) {
            element.textContent = Math.floor(current).toLocaleString();
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Animated skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Skills radar chart
function initRadarChart() {
    const canvas = document.getElementById('skills-radar');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;
    
    const skills = [
        { name: 'Python/SQL', value: 95 },
        { name: 'Machine Learning', value: 88 },
        { name: 'Data Visualization', value: 85 },
        { name: 'Deep Learning', value: 87 },
        { name: 'Data Engineering', value: 90 },
        { name: 'Statistical Analysis', value: 82 }
    ];
    
    const center = { x: 200, y: 200 };
    const maxRadius = 150;
    const levels = 5;
    
    function drawRadarChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        for (let level = 1; level <= levels; level++) {
            const radius = (maxRadius / levels) * level;
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < skills.length; i++) {
                const angle = (i * 2 * Math.PI) / skills.length - Math.PI / 2;
                const x = center.x + Math.cos(angle) * radius;
                const y = center.y + Math.sin(angle) * radius;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.stroke();
        }
        
        // Draw axes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        for (let i = 0; i < skills.length; i++) {
            const angle = (i * 2 * Math.PI) / skills.length - Math.PI / 2;
            const x = center.x + Math.cos(angle) * maxRadius;
            const y = center.y + Math.sin(angle) * maxRadius;
            
            ctx.beginPath();
            ctx.moveTo(center.x, center.y);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        
        // Draw skill polygon
        ctx.beginPath();
        ctx.strokeStyle = '#00d4ff';
        ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
        ctx.lineWidth = 2;
        
        for (let i = 0; i < skills.length; i++) {
            const angle = (i * 2 * Math.PI) / skills.length - Math.PI / 2;
            const radius = (skills[i].value / 100) * maxRadius;
            const x = center.x + Math.cos(angle) * radius;
            const y = center.y + Math.sin(angle) * radius;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Draw skill points and labels
        ctx.fillStyle = '#00d4ff';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        
        for (let i = 0; i < skills.length; i++) {
            const angle = (i * 2 * Math.PI) / skills.length - Math.PI / 2;
            const radius = (skills[i].value / 100) * maxRadius;
            const x = center.x + Math.cos(angle) * radius;
            const y = center.y + Math.sin(angle) * radius;
            
            // Draw point
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw label
            const labelRadius = maxRadius + 20;
            const labelX = center.x + Math.cos(angle) * labelRadius;
            const labelY = center.y + Math.sin(angle) * labelRadius;
            
            ctx.fillStyle = '#ffffff';
            ctx.fillText(skills[i].name, labelX, labelY);
            ctx.fillStyle = '#00d4ff';
        }
    }
    
    // Animate radar chart
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                drawRadarChart();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(canvas);
}

// Skills Learning Journey
function initLearningJourney() {
    const journeyBtns = document.querySelectorAll('.journey-btn');
    const canvas = document.getElementById('learning-journey-chart');
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let currentChart = null;
    
    // Skill progression data
    const skillData = {
        python: {
            name: 'Python Programming',
            color: '#3776ab',
            data: [
                { year: '2020', level: 20, milestone: 'Started with basics' },
                { year: '2021', level: 45, milestone: 'Built first projects' },
                { year: '2022', level: 65, milestone: 'Data analysis focus' },
                { year: '2023', level: 80, milestone: 'Advanced libraries' },
                { year: '2024', level: 90, milestone: 'ML frameworks' },
                { year: '2025', level: 95, milestone: 'Expert level' }
            ]
        },
        ml: {
            name: 'Machine Learning',
            color: '#ff6b35',
            data: [
                { year: '2020', level: 5, milestone: 'Introduction to concepts' },
                { year: '2021', level: 25, milestone: 'First algorithms' },
                { year: '2022', level: 50, milestone: 'Practical applications' },
                { year: '2023', level: 70, milestone: 'Advanced techniques' },
                { year: '2024', level: 85, milestone: 'Research projects' },
                { year: '2025', level: 88, milestone: 'Specialized expertise' }
            ]
        },
        'data-viz': {
            name: 'Data Visualization',
            color: '#10b981',
            data: [
                { year: '2020', level: 15, milestone: 'Basic charts' },
                { year: '2021', level: 40, milestone: 'Matplotlib mastery' },
                { year: '2022', level: 60, milestone: 'Interactive plots' },
                { year: '2023', level: 75, milestone: 'Dashboard creation' },
                { year: '2024', level: 82, milestone: 'Advanced visualizations' },
                { year: '2025', level: 85, milestone: 'Professional dashboards' }
            ]
        },
        'deep-learning': {
            name: 'Deep Learning',
            color: '#7c3aed',
            data: [
                { year: '2020', level: 0, milestone: 'No experience' },
                { year: '2021', level: 10, milestone: 'Neural network basics' },
                { year: '2022', level: 35, milestone: 'CNN fundamentals' },
                { year: '2023', level: 60, milestone: 'LSTM and RNNs' },
                { year: '2024', level: 80, milestone: 'GANs and research' },
                { year: '2025', level: 87, milestone: 'Advanced architectures' }
            ]
        }
    };
    
    function createLearningChart(skillKey) {
        const skill = skillData[skillKey];
        
        if (currentChart) {
            currentChart.destroy();
        }
        
        currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: skill.data.map(d => d.year),
                datasets: [{
                    label: `${skill.name} Proficiency`,
                    data: skill.data.map(d => d.level),
                    borderColor: skill.color,
                    backgroundColor: `${skill.color}20`,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: skill.color,
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: skill.color,
                        borderWidth: 1,
                        callbacks: {
                            afterBody: function(context) {
                                const dataIndex = context[0].dataIndex;
                                return `Milestone: ${skill.data[dataIndex].milestone}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: '#a1a1aa',
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        title: {
                            display: true,
                            text: 'Skill Level (%)',
                            color: '#ffffff',
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        }
                    },
                    x: {
                        ticks: {
                            color: '#a1a1aa'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        title: {
                            display: true,
                            text: 'Year',
                            color: '#ffffff',
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }
    
    // Event listeners for journey buttons
    journeyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const skillKey = btn.getAttribute('data-skill');
            
            // Update active button
            journeyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Create new chart
            createLearningChart(skillKey);
        });
    });
    
    // Initialize with Python chart
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                createLearningChart('python');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(canvas);
}

// Dashboard functionality
function initDashboard() {
    const dashboardBtns = document.querySelectorAll('.dashboard-btn');
    const chartContainers = document.querySelectorAll('.chart-container');
    
    dashboardBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const chartType = btn.getAttribute('data-chart');
            
            // Update active button
            dashboardBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show corresponding chart
            chartContainers.forEach(container => {
                container.classList.remove('active');
            });
            
            const targetContainer = document.getElementById(`${chartType}-chart`);
            if (targetContainer) {
                targetContainer.classList.add('active');
                
                // Initialize chart based on type
                setTimeout(() => {
                    switch(chartType) {
                        case 'performance':
                            initPerformanceChart();
                            break;
                        case 'timeseries':
                            initTimeSeriesChart();
                            break;
                        case 'pipeline':
                            initPipelineVisualization();
                            break;
                    }
                }, 300);
            }
        });
    });
    
    // Initialize default chart
    initPerformanceChart();
}

function initPerformanceChart() {
    const canvas = document.getElementById('performance-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['CNN-LSTM', 'Random Forest', 'XGBoost', 'Linear Regression', 'Ensemble'],
            datasets: [{
                label: 'R² Score',
                data: [0.87, 0.78, 0.82, 0.65, 0.91],
                backgroundColor: [
                    'rgba(0, 212, 255, 0.8)',
                    'rgba(124, 58, 237, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    '#00d4ff',
                    '#7c3aed',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1,
                    ticks: {
                        color: '#a1a1aa'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#a1a1aa'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

function initTimeSeriesChart() {
    const canvas = document.getElementById('timeseries-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Generate sample time series data
    const labels = [];
    const actualData = [];
    const predictedData = [];
    
    for (let i = 0; i < 50; i++) {
        labels.push(`Day ${i + 1}`);
        const actual = Math.sin(i * 0.2) * 50 + 100 + Math.random() * 20;
        actualData.push(actual);
        predictedData.push(actual + (Math.random() - 0.5) * 10);
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Actual PV Output',
                data: actualData,
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4
            }, {
                label: 'Predicted Output',
                data: predictedData,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                borderDash: [5, 5]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: '#a1a1aa'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#a1a1aa',
                        maxTicksLimit: 10
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

function initPipelineVisualization() {
    const container = document.getElementById('pipeline-visualization');
    if (!container) return;
    
    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; height: 100%; padding: 2rem;">
            <div class="pipeline-step">
                <div class="pipeline-icon">📊</div>
                <h4>Data Collection</h4>
                <p>500K+ IoT Sensors</p>
            </div>
            <div class="pipeline-arrow">→</div>
            <div class="pipeline-step">
                <div class="pipeline-icon">🧹</div>
                <h4>Data Cleaning</h4>
                <p>Handle Missing Values</p>
            </div>
            <div class="pipeline-arrow">→</div>
            <div class="pipeline-step">
                <div class="pipeline-icon">⚙️</div>
                <h4>Feature Engineering</h4>
                <p>Lag & Rolling Features</p>
            </div>
            <div class="pipeline-arrow">→</div>
            <div class="pipeline-step">
                <div class="pipeline-icon">🤖</div>
                <h4>Model Training</h4>
                <p>CNN-LSTM + GWO</p>
            </div>
            <div class="pipeline-arrow">→</div>
            <div class="pipeline-step">
                <div class="pipeline-icon">📈</div>
                <h4>Prediction</h4>
                <p>R² = 0.91</p>
            </div>
        </div>
    `;
    
    // Add CSS for pipeline visualization
    const style = document.createElement('style');
    style.textContent = `
        .pipeline-step {
            text-align: center;
            padding: 1rem;
            background: rgba(0, 212, 255, 0.1);
            border-radius: 15px;
            border: 1px solid rgba(0, 212, 255, 0.3);
            min-width: 120px;
            transition: all 0.3s ease;
        }
        .pipeline-step:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 212, 255, 0.2);
        }
        .pipeline-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        .pipeline-step h4 {
            color: #00d4ff;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
        }
        .pipeline-step p {
            color: #a1a1aa;
            font-size: 0.8rem;
        }
        .pipeline-arrow {
            font-size: 1.5rem;
            color: #00d4ff;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
}

// Project modals
function initProjects() {
    const projectTitles = document.querySelectorAll('.project-title');
    const projectBtns = document.querySelectorAll('.project-btn');
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close');
    
    const projectData = {
        'pv-forecasting': {
            title: 'CNN-LSTM + Grey Wolf Optimization for PV Forecasting',
            description: 'Advanced time-series forecasting project for photovoltaic energy prediction using deep learning and optimization algorithms.',
            role: 'Lead Data Scientist & ML Engineer',
            duration: 'July 2025 - Present',
            technologies: ['Python', 'TensorFlow', 'Pandas', 'NumPy', 'Scikit-learn', 'Grey Wolf Optimization'],
            responsibilities: [
                'Designed and implemented ETL pipelines for processing PV energy time-series data',
                'Applied advanced feature engineering techniques including lag features, rolling statistics, and temporal resampling',
                'Integrated Grey Wolf Optimization (GWO) algorithm with CNN-LSTM architecture for hyperparameter optimization',
                'Achieved significant improvements in forecasting accuracy with RMSE reduction of 23% and R² score of 0.91',
                'Developed comprehensive evaluation framework with error analysis, residual plots, and confidence intervals',
                'Created automated model deployment pipeline for real-time energy forecasting'
            ],
            achievements: [
                'Improved forecasting accuracy by 23% compared to baseline models',
                'Achieved R² score of 0.91 on test dataset',
                'Reduced RMSE to 0.15 kWh for hourly predictions',
                'Processed and analyzed over 100,000 data points',
                'Developed reusable framework for time-series optimization'
            ]
        },
        'citation-prediction': {
            title: 'Citation Count Prediction using Ensemble Learning',
            description: 'Academic research project focused on predicting citation counts for scientific papers using ensemble machine learning methods.',
            role: 'Data Scientist & Research Analyst',
            duration: 'Spring 2025',
            technologies: ['Python', 'Random Forest', 'XGBoost', 'Linear Regression', 'Pandas', 'Matplotlib', 'Seaborn'],
            responsibilities: [
                'Built comprehensive ensemble regression pipeline combining Random Forest, XGBoost, and Linear Regression',
                'Performed extensive feature engineering on academic paper metadata including abstract analysis, author metrics, and publication venues',
                'Conducted thorough residual and error analysis to identify model limitations and improvement opportunities',
                'Implemented cross-validation strategies to ensure model robustness and prevent overfitting',
                'Identified key predictive features including abstract length and first-author h-index',
                'Developed interpretable model explanations for academic stakeholders'
            ],
            achievements: [
                'Improved R² score from 0.78 to 0.91 through ensemble methods',
                'Achieved 17% improvement in prediction accuracy',
                'Identified abstract length as the strongest predictor of citation count',
                'Developed feature importance ranking for academic impact assessment',
                'Created automated pipeline for early impact estimation of new publications'
            ]
        },
        'iot-forecasting': {
            title: 'Smart City IoT Forecasting System',
            description: 'Large-scale IoT data processing and forecasting system for smart city energy and climate prediction using ensemble learning methods.',
            role: 'Research Volunteer & Data Engineer',
            duration: 'March 2025 - July 2025',
            technologies: ['Python', 'Pandas', 'Ensemble Methods', 'IoT Sensors', 'Data Cleaning', 'Statistical Analysis'],
            responsibilities: [
                'Processed and analyzed over 500,000 IoT sensor readings from distributed smart city infrastructure',
                'Developed robust data cleaning pipelines to handle noisy sensor data and missing values',
                'Implemented ensemble-based forecasting models for energy consumption and climate prediction',
                'Coordinated between Electrical & Computer Engineering and Machine Learning teams',
                'Documented deployment challenges and sensor-level issues affecting model accuracy',
                'Created automated monitoring system for sensor health and data quality assessment'
            ],
            achievements: [
                'Successfully processed 500K+ sensor readings with 99.2% data quality',
                'Reduced data preprocessing time by 60% through automated pipelines',
                'Identified and flagged 15+ critical sensor malfunctions affecting model performance',
                'Improved forecasting accuracy by 25% through ensemble methods',
                'Established cross-functional collaboration framework between ECE and ML teams'
            ]
        },
        'gan-intrusion': {
            title: 'Generative Adversarial Networks for Intrusion Detection',
            description: 'Cybersecurity research project using GANs to generate synthetic intrusion data for improving anomaly detection in autonomous vehicle systems.',
            role: 'Research Assistant & ML Engineer',
            duration: 'October 2024 - January 2025',
            technologies: ['Python', 'GANs', 'TensorFlow', 'CAN Bus', 'Cybersecurity', 'Anomaly Detection'],
            responsibilities: [
                'Preprocessed and balanced over 200,000 time-series CAN Bus entries for intrusion detection training',
                'Contributed to the design and implementation of GAN architecture for synthetic intrusion data generation',
                'Developed data augmentation strategies across 3+ different driving scenarios (highway, urban, parking)',
                'Optimized generator-discriminator training through advanced loss function tuning and regularization',
                'Collaborated with 4-member cross-functional research team on autonomous vehicle security',
                'Implemented evaluation metrics for synthetic data quality and realism assessment'
            ],
            achievements: [
                'Improved generator-discriminator convergence by 17% through loss optimization',
                'Successfully generated realistic synthetic intrusion data across multiple driving scenarios',
                'Processed 200K+ CAN Bus entries with 95% classification accuracy',
                'Enhanced anomaly detection system robustness through synthetic data augmentation',
                'Contributed to 2 research publications in cybersecurity and autonomous vehicle domains'
            ]
        }
    };
    
    function showModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;
        
        modalBody.innerHTML = `
            <h3>${project.title}</h3>
            <div style="margin-bottom: 1.5rem;">
                <strong style="color: #00d4ff;">Role:</strong> ${project.role}<br>
                <strong style="color: #00d4ff;">Duration:</strong> ${project.duration}
            </div>
            <p>${project.description}</p>
            
            <h4>Technologies Used</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                ${project.technologies.map(tech => `<span style="padding: 0.3rem 0.8rem; background: rgba(0, 212, 255, 0.1); color: #00d4ff; border-radius: 15px; font-size: 0.8rem; border: 1px solid rgba(0, 212, 255, 0.2);">${tech}</span>`).join('')}
            </div>
            
            <h4>Key Responsibilities</h4>
            <ul>
                ${project.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
            </ul>
            
            <h4>Key Achievements</h4>
            <ul>
                ${project.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function hideModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners
    projectTitles.forEach(title => {
        title.addEventListener('click', () => {
            const projectId = title.getAttribute('data-project');
            showModal(projectId);
        });
    });
    
    projectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            showModal(projectId);
        });
    });
    
    closeBtn?.addEventListener('click', hideModal);
    
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideModal();
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category, .metric-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Contact form
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
window.addEventListener('scroll', debounce(() => {
    // Handle scroll-based animations
}, 10));

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadResources();

