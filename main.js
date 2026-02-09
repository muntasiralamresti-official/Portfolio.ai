
// Cursor elements select করা
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// Mouse move হলে cursor update হবে
document.addEventListener('mousemove', (e) => {
    // Main cursor - তাৎক্ষণিক
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Follower cursor - একটু delay সহ
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Interactive elements এ hover করলে cursor বড় হবে
const interactiveElements = document.querySelectorAll('a, button, .cert-item, .expertise-card, .skill-orb, .project-card');

interactiveElements.forEach(el => {
    // Mouse enter - বড় করা
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    // Mouse leave - আবার ছোট করা
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// ==========================================
// 2. 3D TILT CARD EFFECT
// Hero section এর ছবিতে 3D effect
// ==========================================

const tiltCard = document.getElementById('tiltCard');

if (tiltCard) {
    // Mouse move হলে tilt calculate করা
    tiltCard.addEventListener('mousemove', (e) => {
        // Card এর position নেয়া
        const rect = tiltCard.getBoundingClientRect();
        
        // Mouse position (card এর relative)
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Center point calculate করা
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Rotation angle calculate - মাউস কতদূরে সেটা দিয়ে
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        // Transform apply করা
        tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // Mouse leave হলে normal position এ ফিরে আসা
    tiltCard.addEventListener('mouseleave', () => {
        tiltCard.style.transform = 'rotateX(0) rotateY(0)';
    });
}

// ==========================================
// 3. SCROLL REVEAL ANIMATION
// Timeline items scroll এ দেখা যাবে
// ==========================================

// Timeline items select করা
const timelineItems = document.querySelectorAll('.timeline-item');

// Intersection Observer setup
const observerOptions = {
    threshold: 0.3,  // 30% দেখা গেলে trigger হবে
    rootMargin: '0px'
};

// Observer function
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // যদি viewport এ আসে
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// প্রতিটি timeline item observe করা
timelineItems.forEach(item => observer.observe(item));

// ==========================================
// 4. CERTIFICATE ENLARGE MODAL
// Certificate এ click করলে বড় করে দেখাবে
// ==========================================

const certItems = document.querySelectorAll('.cert-item');

certItems.forEach(item => {
    item.addEventListener('click', () => {
        // Certificate image নেয়া
        const img = item.querySelector('img');
        
        // Modal container তৈরি
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(20px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        // বড় image তৈরি
        const enlargedImg = document.createElement('img');
        enlargedImg.src = img.src;
        enlargedImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 20px;
            box-shadow: 0 50px 150px rgba(255, 184, 0, 0.6);
        `;
        
        // Modal এ image add করা
        modal.appendChild(enlargedImg);
        document.body.appendChild(modal);
        
        // Click করলে modal close হবে
        modal.addEventListener('click', () => modal.remove());
    });
});

// ==========================================
// 5. PROJECT MODAL SYSTEM
// Project card এ click করলে full details
// ==========================================

// Project data - এখানে সব project এর info আছে
const projectData = {
    1: {
        title: "EduWave Learning Platform",
        subtitle: "Online Learning UI Design",
        images: ["Edu- 1.jpg"] // full design image
    },
    2: {
        title: "Modern Fashion Website",
        subtitle: "Fashion Landing Page Design",
        images: ["Fashion Brand.png"]
    },
    3: {
        title: "Real Estate Website",
        subtitle: "Property Platform UI",
        images: ["Elan Estate.png"]
    }
};

// সব project card select করা
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const project = projectData[projectId];

        const modal = document.createElement('div');
        modal.className = 'project-modal';

        const closeBtn = document.createElement('div');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '✕';

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 500);
        });

        let imagesHTML = '';
        project.images.forEach(img => {
            imagesHTML += `
                <div class="mockup-item">
                    <img src="${img}" class="full-design" />
                </div>
            `;
        });

        const content = document.createElement('div');
        content.className = 'modal-content';
        content.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title">${project.title}</h2>
                <p class="modal-subtitle">${project.subtitle}</p>
            </div>
            <div class="design-showcase">
                <div class="design-section" data-section="Full Design">
                    <div class="mockup-grid">
                        ${imagesHTML}
                    </div>
                </div>
            </div>
        `;

        modal.appendChild(closeBtn);
        modal.appendChild(content);
        document.body.appendChild(modal);

        setTimeout(() => modal.classList.add('active'), 10);
    });
});


// ==========================================
// CONSOLE MESSAGE
// Developer console এ message দেখানো
// ==========================================
console.log('%c👋 Welcome to Muntasir\'s Portfolio!', 'color: #FFB800; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ using HTML, CSS & Vanilla JavaScript', 'color: #00FFF7; font-size: 14px;');
console.log('%cNo frameworks, just pure code!', 'color: #C77DFF; font-size: 12px;');


