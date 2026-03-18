// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加滚动动画效果
    initScrollAnimation();
    
    // 添加卡片悬停效果
    initCardHoverEffects();
    
    // 添加技能标签动画
    initSkillTagAnimation();
    
    // 添加联系方式点击反馈
    initContactFeedback();
});

// 滚动动画
function initScrollAnimation() {
    const cards = document.querySelectorAll('.card');
    
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
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// 卡片悬停效果
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 技能标签动画
function initSkillTagAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 300 + index * 100);
    });
}

// 联系方式点击反馈
function initContactFeedback() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 添加点击波纹效果
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(102, 126, 234, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// 添加波纹动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 头像点击效果
document.querySelector('.avatar')?.addEventListener('click', function() {
    this.style.transform = 'scale(1.1) rotate(5deg)';
    setTimeout(() => {
        this.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
});

// 标签点击效果
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // 页面重新可见时，重新触发动画
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'none';
                card.offsetHeight; // 触发重排
                card.style.animation = `fadeInUp 0.6s ease forwards`;
            }, index * 100);
        });
    }
});
