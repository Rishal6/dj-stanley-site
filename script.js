// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE NAVIGATION =====
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== STAGGER REVEAL FOR GRID ITEMS =====
const staggerContainers = document.querySelectorAll('.venues-grid, .skills-grid');

staggerContainers.forEach(container => {
    const items = container.querySelectorAll('.reveal');
    items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
});

// ===== AUDIO PLAYER FOR MIXES =====
(function() {
    let currentAudio = null;
    let currentCard = null;
    let progressInterval = null;

    const mixCards = document.querySelectorAll('.mix-card');

    mixCards.forEach(card => {
        const playBtn = card.querySelector('.mix-play-btn');
        const progressBar = card.querySelector('.mix-progress-bar');
        const progressFill = card.querySelector('.mix-progress-fill');
        const timeDisplay = card.querySelector('.mix-time');
        const src = card.getAttribute('data-src');

        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            // If clicking the same card that's playing, pause it
            if (currentCard === card && currentAudio && !currentAudio.paused) {
                pauseTrack();
                return;
            }

            // Stop any currently playing track
            if (currentAudio) {
                stopTrack();
            }

            // Start new track
            currentAudio = new Audio(src);
            currentCard = card;

            currentAudio.addEventListener('canplay', () => {
                currentAudio.play();
                card.classList.add('playing');
                playBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';

                // Update progress
                progressInterval = setInterval(() => {
                    if (currentAudio && !currentAudio.paused) {
                        const percent = (currentAudio.currentTime / currentAudio.duration) * 100;
                        progressFill.style.width = percent + '%';
                        timeDisplay.textContent = formatTime(currentAudio.currentTime);
                    }
                }, 200);
            });

            currentAudio.addEventListener('ended', () => {
                stopTrack();
            });

            currentAudio.addEventListener('error', () => {
                card.classList.remove('playing');
                timeDisplay.textContent = 'File not found';
            });
        });

        // Click on progress bar to seek
        progressBar.addEventListener('click', (e) => {
            if (currentAudio && currentCard === card) {
                const rect = progressBar.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                currentAudio.currentTime = percent * currentAudio.duration;
            }
        });
    });

    function pauseTrack() {
        if (currentAudio) {
            currentAudio.pause();
            currentCard.classList.remove('playing');
            const playBtn = currentCard.querySelector('.mix-play-btn');
            playBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>';
            clearInterval(progressInterval);
        }
    }

    function stopTrack() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
        if (currentCard) {
            currentCard.classList.remove('playing');
            const playBtn = currentCard.querySelector('.mix-play-btn');
            playBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>';
            const fill = currentCard.querySelector('.mix-progress-fill');
            fill.style.width = '0%';
            const time = currentCard.querySelector('.mix-time');
            time.textContent = '0:00';
            currentCard = null;
        }
        clearInterval(progressInterval);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }
})();
