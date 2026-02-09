// ==========================================
// MUNTASIR'S PORTFOLIO - JAVASCRIPT
// ==========================================
//
// এই ফাইলে আছে:
// 1. Custom Cursor (কাস্টম কার্সার)
// 2. 3D Tilt Card Effect (৩ডি কার্ড ইফেক্ট)
// 3. Scroll Animations (স্ক্রোল এনিমেশন)
// 4. Certificate Modal (সার্টিফিকেট পপআপ)
// 5. Project Modal System (প্রজেক্ট মোডাল)
// ==========================================

// ==========================================
// 1. CUSTOM CURSOR
// কাস্টম কার্সার - মাউস ফলো করবে
// ==========================================

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
        title: "Modern Shopping Experience",
        subtitle: "E-Commerce Mobile Application Design",
        sections: [
            {
                label: "Home Screen",
                description: "Clean, minimal interface with featured products and seamless navigation. Focus on product imagery and easy discovery.",
                mockups: 2
            },
            {
                label: "Product Details",
                description: "Immersive product view with high-quality images, detailed specifications, and intuitive add-to-cart functionality.",
                mockups: 2
            },
            {
                label: "Checkout Flow",
                description: "Streamlined checkout process with progress indicators, multiple payment options, and order confirmation.",
                mockups: 3
            }
        ]
    },
    2: {
        title: "Analytics Platform",
        subtitle: "SaaS Dashboard for Data Visualization",
        sections: [
            {
                label: "Overview Dashboard",
                description: "Real-time metrics with interactive charts and KPI cards. Dark mode optimized for long viewing sessions.",
                mockups: 1
            },
            {
                label: "Data Tables",
                description: "Advanced filtering, sorting, and export capabilities with responsive table design.",
                mockups: 2
            },
            {
                label: "Custom Reports",
                description: "Drag-and-drop report builder with customizable widgets and visualization options.",
                mockups: 2
            }
        ]
    },
    3: {
        title: "Community Platform",
        subtitle: "Social Media Mobile Application",
        sections: [
            {
                label: "Feed & Stories",
                description: "Instagram-inspired feed with stories, likes, comments, and smooth scrolling interactions.",
                mockups: 2
            },
            {
                label: "Profile & Settings",
                description: "User profile with customizable themes, privacy controls, and content management.",
                mockups: 2
            },
            {
                label: "Messaging",
                description: "Real-time chat interface with media sharing, reactions, and group conversations.",
                mockups: 2
            }
        ]
    },
    4: {
        title: "Product Launch",
        subtitle: "High-Converting Landing Page Design",
        sections: [
            {
                label: "Hero Section",
                description: "Attention-grabbing hero with clear value proposition, compelling visuals, and primary CTA.",
                mockups: 1
            },
            {
                label: "Features Showcase",
                description: "Interactive feature cards with icons, animations, and detailed explanations of benefits.",
                mockups: 2
            },
            {
                label: "Social Proof",
                description: "Testimonials, client logos, case studies, and trust indicators to drive conversions.",
                mockups: 2
            }
        ]
    }
};

// সব project card select করা
const projectCards = document.querySelectorAll('.project-card');

// প্রতিটি card এ click listener add করা
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        // কোন project click করা হয়েছে সেটা নেয়া
        const projectId = card.getAttribute('data-project');
        const project = projectData[projectId];
        
        // Modal তৈরি করা
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        
        // Close button তৈরি
        const closeBtn = document.createElement('div');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '✕';
        
        // Close button এ click করলে modal close
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 500);
        });
        
        // Project sections এর HTML তৈরি
        let sectionsHTML = '';
        project.sections.forEach(section => {
            // প্রতিটি section এর জন্য mockup তৈরি
            let mockupsHTML = '';
            for (let i = 0; i < section.mockups; i++) {
                mockupsHTML += `
                    <div class="mockup-item">
                        <div class="mockup-placeholder">📱</div>
                    </div>
                `;
            }
            
            // Section HTML add করা
            sectionsHTML += `
                <div class="design-section" data-section="${section.label}">
                    <p class="design-description">${section.description}</p>
                    <div class="mockup-grid">
                        ${mockupsHTML}
                    </div>
                </div>
            `;
        });
        
        // Modal content তৈরি
        const content = document.createElement('div');
        content.className = 'modal-content';
        content.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title">${project.title}</h2>
                <p class="modal-subtitle">${project.subtitle}</p>
            </div>
            <div class="design-showcase">
                ${sectionsHTML}
            </div>
        `;
        
        // Modal এ সব add করা
        modal.appendChild(closeBtn);
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        // Modal activate করা (animation এর জন্য)
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Background এ click করলে close হবে
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 500);
            }
        });
        
        // ESC key press করলে close হবে
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 500);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    });
});

// ==========================================
// CONSOLE MESSAGE
// Developer console এ message দেখানো
// ==========================================
console.log('%c👋 Welcome to Muntasir\'s Portfolio!', 'color: #FFB800; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ using HTML, CSS & Vanilla JavaScript', 'color: #00FFF7; font-size: 14px;');
console.log('%cNo frameworks, just pure code!', 'color: #C77DFF; font-size: 12px;');


