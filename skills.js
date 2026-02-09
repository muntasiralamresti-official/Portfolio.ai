// ==========================================
// SKILLS SECTION - JAVASCRIPT CODE
// স্কিল সেকশনের সম্পূর্ণ JavaScript কোড
// ==========================================

// ==========================================
// 1. BASIC SETUP
// মূল সেটআপ
// ==========================================

// সব skill category cards select করা
const skillCategories = document.querySelectorAll('.skill-category');

// ==========================================
// 2. INTERSECTION OBSERVER
// Scroll detect করার জন্য Observer
// ==========================================

// Observer options - কখন trigger হবে
const skillObserverOptions = {
    threshold: 0.3,      // 30% viewport এ দেখা গেলে
    rootMargin: '0px'    // কোন extra margin নেই
};

// Observer তৈরি করা
const skillObserver = new IntersectionObserver((entries) => {
    // প্রতিটি observed element এর জন্য
    entries.forEach(entry => {
        // যদি element viewport এ আসে
        if (entry.isIntersecting) {
            // 'in-view' class add করা (CSS animation trigger)
            entry.target.classList.add('in-view');
            
            // সেই category এর সব progress bars নেয়া
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            
            // প্রতিটি progress bar animate করা
            progressBars.forEach((bar, index) => {
                // Progress percentage নেয়া (data-progress attribute থেকে)
                const progress = bar.getAttribute('data-progress');
                
                // একটু delay দিয়ে animate করা (এক এক করে দেখানোর জন্য)
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, index * 100); // প্রতিটি bar 100ms পরে animate হবে
            });
            
            // একবার animate হলে আর observe করার দরকার নেই
            // (Performance এর জন্য)
            skillObserver.unobserve(entry.target);
        }
    });
}, skillObserverOptions);

// ==========================================
// 3. START OBSERVING
// Observe শুরু করা
// ==========================================

// প্রতিটি skill category observe করা
skillCategories.forEach(category => {
    skillObserver.observe(category);
});

// ==========================================
// 4. ALTERNATIVE METHOD (Without Observer)
// বিকল্প পদ্ধতি - Scroll event দিয়ে
// ==========================================

/*
// যদি Intersection Observer support না করে browser
// তাহলে এই method use করতে পারেন:

function animateSkillsOnScroll() {
    skillCategories.forEach(category => {
        // Element এর position check করা
        const rect = category.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !category.classList.contains('in-view')) {
            // Visible হলে animate করা
            category.classList.add('in-view');
            
            const progressBars = category.querySelectorAll('.skill-progress');
            progressBars.forEach((bar, index) => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, index * 100);
            });
        }
    });
}

// Scroll event listener
window.addEventListener('scroll', animateSkillsOnScroll);

// Page load হলেও check করা
window.addEventListener('load', animateSkillsOnScroll);
*/

// ==========================================
// 5. MANUAL TRIGGER FUNCTION
// Manual trigger করার function
// ==========================================

// যদি manually animate করতে চান
function animateAllSkills() {
    skillCategories.forEach(category => {
        category.classList.add('in-view');
        
        const progressBars = category.querySelectorAll('.skill-progress');
        progressBars.forEach((bar, index) => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, index * 100);
        });
    });
}

// Console থেকে call করতে পারবেন: animateAllSkills()

// ==========================================
// 6. RESET FUNCTION
// Animation reset করার function
// ==========================================

function resetSkillAnimations() {
    skillCategories.forEach(category => {
        // 'in-view' class remove করা
        category.classList.remove('in-view');
        
        // সব progress bars reset করা
        const progressBars = category.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
            bar.style.width = '0%';
        });
    });
    
    console.log('Skill animations reset!');
}

// Console থেকে call করতে পারবেন: resetSkillAnimations()

// ==========================================
// 7. ADD NEW SKILL DYNAMICALLY
// নতুন skill dynamically add করার function
// ==========================================

function addNewSkill(categoryIndex, skillName, skillLevel, progress) {
    // Category select করা (0-based index)
    const category = skillCategories[categoryIndex];
    if (!category) {
        console.error('Category not found!');
        return;
    }
    
    // Skills list নেয়া
    const skillsList = category.querySelector('.skills-list');
    
    // নতুন skill item তৈরি
    const newSkill = document.createElement('div');
    newSkill.className = 'skill-item';
    newSkill.innerHTML = `
        <div class="skill-info">
            <span class="skill-name">${skillName}</span>
            <span class="skill-level">${skillLevel}</span>
        </div>
        <div class="skill-bar">
            <div class="skill-progress" data-progress="${progress}"></div>
        </div>
    `;
    
    // List এ add করা
    skillsList.appendChild(newSkill);
    
    console.log(`Added: ${skillName} to category ${categoryIndex}`);
}

// Example usage:
// addNewSkill(0, 'Photoshop', 'Intermediate', 75);
// 0 = Design category, 1 = Development, 2 = Marketing, 3 = Tools

// ==========================================
// 8. GET SKILL DATA
// সব skill এর data extract করা
// ==========================================

function getAllSkillsData() {
    const skillsData = [];
    
    skillCategories.forEach((category, catIndex) => {
        const categoryName = category.querySelector('.category-title').textContent;
        const skills = [];
        
        category.querySelectorAll('.skill-item').forEach(item => {
            const name = item.querySelector('.skill-name').textContent;
            const level = item.querySelector('.skill-level').textContent;
            const progress = item.querySelector('.skill-progress').getAttribute('data-progress');
            
            skills.push({
                name: name,
                level: level,
                progress: parseInt(progress)
            });
        });
        
        skillsData.push({
            category: categoryName,
            skills: skills
        });
    });
    
    return skillsData;
}

// Console থেকে call করুন: getAllSkillsData()

// ==========================================
// 9. UPDATE PROGRESS
// Progress percentage update করা
// ==========================================

function updateSkillProgress(categoryIndex, skillIndex, newProgress) {
    const category = skillCategories[categoryIndex];
    if (!category) {
        console.error('Category not found!');
        return;
    }
    
    const skillItems = category.querySelectorAll('.skill-item');
    const skillItem = skillItems[skillIndex];
    
    if (!skillItem) {
        console.error('Skill not found!');
        return;
    }
    
    const progressBar = skillItem.querySelector('.skill-progress');
    progressBar.setAttribute('data-progress', newProgress);
    progressBar.style.width = newProgress + '%';
    
    console.log(`Updated skill progress to ${newProgress}%`);
}

// Example: updateSkillProgress(0, 0, 95); // Design category, Figma, 95%

// ==========================================
// 10. CONSOLE LOG MESSAGE
// Developer console এ helpful message
// ==========================================

console.log('%c🎯 Skills Section Loaded!', 'color: #FFB800; font-size: 16px; font-weight: bold;');
console.log('%cAvailable functions:', 'color: #00FFF7; font-size: 12px;');
console.log('- animateAllSkills()         : Manually trigger all animations');
console.log('- resetSkillAnimations()     : Reset all progress bars to 0');
console.log('- getAllSkillsData()         : Get all skills data as JSON');
console.log('- addNewSkill(cat, name, level, progress) : Add new skill');
console.log('- updateSkillProgress(cat, skill, progress) : Update progress');

// ==========================================
// TUTORIAL COMMENTS (শেখার জন্য)
// ==========================================

/*
===========================================
কিভাবে কাজ করে:
===========================================

1. INTERSECTION OBSERVER:
   - Browser API যা detect করে কখন element viewport এ আসে
   - Scroll event এর চেয়ে efficient
   - threshold: 0.3 মানে 30% দেখা গেলে trigger

2. DATA ATTRIBUTE:
   - HTML এ data-progress="85" থাকে
   - JavaScript এ getAttribute() দিয়ে নিয়ে আসি
   - তারপর CSS width property set করি

3. ANIMATION FLOW:
   Scroll → Observer detect → Add 'in-view' class → 
   CSS transition trigger → Width animate → Done

4. DELAY/STAGGER:
   - index * 100 means:
     - 1st bar: 0ms delay
     - 2nd bar: 100ms delay
     - 3rd bar: 200ms delay
   - এতে একটার পর একটা animate হয়

5. PERFORMANCE:
   - একবার animate হলে unobserve() করি
   - Memory leak prevent করে
   - Smooth performance

===========================================
Common Issues & Solutions:
===========================================

Issue 1: Progress bars not animating
Solution: Check if .skill-progress has data-progress attribute

Issue 2: All bars animate at once
Solution: Check the setTimeout index multiplier

Issue 3: Animation too fast/slow
Solution: Change transition duration in CSS (1.5s)

Issue 4: Not working on scroll
Solution: Check threshold value (try 0.1 to 0.5)

===========================================
*/
