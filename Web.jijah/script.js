// --- 1. PEMILIH BAHASA (ID / EN) ---
const langButtons = document.querySelectorAll('.lang-btn');

function applyLanguage(lang) {
    document.querySelectorAll('[data-id][data-en]').forEach(el => {
        el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-id');
    });

    document.querySelectorAll('[data-id-placeholder][data-en-placeholder]').forEach(el => {
        el.setAttribute('placeholder', lang === 'en'
            ? el.getAttribute('data-en-placeholder')
            : el.getAttribute('data-id-placeholder'));
    });

    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('site-lang', lang);
}

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        applyLanguage(btn.getAttribute('data-lang'));
    });
});

const savedLang = localStorage.getItem('site-lang');
if (savedLang === 'en') {
    applyLanguage('en');
}


// --- 2. TEMA GELAP TERANG ---
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('site-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        if (themeIcon) {
            if (isDark) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('site-theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('site-theme', 'light');
            }
        }
    });
}


// --- 3. HAMBURGER MENU TOGGLE (MOBILE) ---
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent scroll saat menu terbuka
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Tutup menu saat link diklik
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Tutup menu saat klik di luar
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}


// --- 4. SCROLL ACTIVE LINK HIGHLIGHT ---
const sections = document.querySelectorAll('section, header');
const navLi = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});


// --- 5. FORM SUBMIT SIMULATION ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Terima kasih! Pesan Anda berhasil dikirim (Ini hanya simulasi).');
        contactForm.reset();
    });
}


// --- 6. PRELOADER (LOADING SCREEN) ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const percentEl = document.getElementById('loaderPercentNum');
    const barFillEl = document.getElementById('loaderBarFill');

    if (!preloader) return;

    let percent = 0;
    const duration = 1200;
    const stepTime = 20;
    const increment = 100 / (duration / stepTime);

    const counter = setInterval(() => {
        percent += increment;
        if (percent >= 100) {
            percent = 100;
            clearInterval(counter);
            if (percentEl) percentEl.textContent = '100';
            if (barFillEl) barFillEl.style.width = '100%';
            
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.querySelectorAll('.intro-el').forEach(el => {
                    el.classList.add('revealed');
                });
            }, 200);
        } else {
            if (percentEl) percentEl.textContent = Math.floor(percent);
            if (barFillEl) barFillEl.style.width = Math.floor(percent) + '%';
        }
    }, stepTime);
});

// Fallback: paksa hilangkan preloader setelah 3 detik jika macet
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('loaded')) {
        preloader.classList.add('loaded');
        document.querySelectorAll('.intro-el').forEach(el => {
            el.classList.add('revealed');
        });
    }
}, 3000);


// --- 7. SCROLL REVEAL ---
const revealElements = document.querySelectorAll('.reveal:not(.intro-el)');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


// --- 8. WIDGET MUSIK ---
const musicBtn = document.getElementById('musicBtn');
const musicDropdown = document.getElementById('musicDropdown');
const bgAudio = document.getElementById('bgAudio');
const musicPlayBtn = document.getElementById('musicPlayBtn');
const musicVolume = document.getElementById('musicVolume');
const musicDisc = document.getElementById('musicDisc');

if (musicBtn && musicDropdown) {
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        musicDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!musicDropdown.contains(e.target) && !musicBtn.contains(e.target)) {
            musicDropdown.classList.remove('active');
        }
    });
}

if (bgAudio && musicVolume) {
    bgAudio.volume = parseFloat(musicVolume.value);
}

if (musicPlayBtn && bgAudio) {
    musicPlayBtn.addEventListener('click', () => {
        if (bgAudio.paused) {
            bgAudio.play().then(() => {
                musicPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
                musicDisc.classList.add('spinning');
            }).catch(() => {
                alert('Lagu belum ditemukan. Pastikan file lagu.mp3 ada di folder yang sama.');
            });
        } else {
            bgAudio.pause();
            musicPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
            musicDisc.classList.remove('spinning');
        }
    });
}

if (musicVolume && bgAudio) {
    musicVolume.addEventListener('input', () => {
        bgAudio.volume = parseFloat(musicVolume.value);
    });
}


// --- 9. ANIMASI MENGETIK (TYPEWRITER) ---
const typedNameEl = document.getElementById('typed-name');
if (typedNameEl) {
    const typingParts = [
        { text: 'Aidil ', highlight: false },
        { text: 'Azizah', highlight: true }
    ];

    const typeSpeed = 130;
    const deleteSpeed = 70;
    const pauseAfterType = 1800;
    const pauseAfterDelete = 500;

    const allChars = [];
    typingParts.forEach(part => {
        part.text.split('').forEach(char => {
            allChars.push({ char, highlight: part.highlight });
        });
    });

    let charIndex = 0;
    let isDeleting = false;

    function renderTypedText() {
        let html = '';
        let inHighlight = false;

        for (let i = 0; i < charIndex; i++) {
            const item = allChars[i];
            if (item.highlight && !inHighlight) {
                html += '<span class="typed-highlight">';
                inHighlight = true;
            } else if (!item.highlight && inHighlight) {
                html += '</span>';
                inHighlight = false;
            }
            html += item.char;
        }
        if (inHighlight) html += '</span>';

        typedNameEl.innerHTML = html;
    }

    function typeLoop() {
        if (!isDeleting) {
            if (charIndex < allChars.length) {
                charIndex++;
                renderTypedText();
                setTimeout(typeLoop, typeSpeed);
            } else {
                isDeleting = true;
                setTimeout(typeLoop, pauseAfterType);
            }
        } else {
            if (charIndex > 0) {
                charIndex--;
                renderTypedText();
                setTimeout(typeLoop, deleteSpeed);
            } else {
                isDeleting = false;
                setTimeout(typeLoop, pauseAfterDelete);
            }
        }
    }
    typeLoop();
}