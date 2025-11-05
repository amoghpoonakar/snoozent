/* app.js (UPDATED: Conditional Media Removal and Modal Logic) */

const slidesData = [
  {
    id: "home",
    title: "Digital Marketing — Team AdMad",
    subtitle: "AdMad Team: Amogh, Aryan, Adithya, Akash, Arjun",
    body: "<p><strong>Event / Team:</strong> Digital Marketing — Team AdMad</p><p><strong>Tagline:</strong> SHAKE – TAKE - WAKE</p>",
    image: ""
  },
  {
    id: "concept",
    title: "Concept & Idea",
    subtitle: "Product overview",
    body: "<p><strong>Concept:</strong> A spray product which will wake up a sleepy person for 1 hour and is useful for exam times and students.</p><p><strong>Not advisable for:</strong> people under 12 years.</p><p><strong>Problem solved:</strong> Feeling sleepy when we should be active.</p>",
    image: ""
  },
  {
    id: "target",
    title: "Target & Goal",
    subtitle: "Audience and aim",
    body: "<p><strong>Target Audience:</strong> Teens and working adults.</p><p><strong>Marketing Goal:</strong> Promote as a rare-use product — not for frequent use as sleep is necessary.</p>",
    image: ""
  },
  {
    id: "strategy",
    title: "Marketing Strategy & Creativity",
    subtitle: "How we'll reach users",
    body: "<p><strong>Advertising Strategy:</strong> Helps people work longer and increases efficiency.</p><p><strong>Platforms/Media:</strong> Online marketing, personal website — mainly B2C.</p><p><strong>Audience Engagement:</strong> Social media campaign <em>#ShakeTakeWake</em>.</p>",
    image: ""
  },
  {
    id: "problems",
    title: "Problems with Caffeine / Energy Drinks",
    subtitle: "Why Snoozent is different",
    body: "<ul><li>Slow effect</li><li>Sugar crash</li><li>Dehydration</li><li>Addiction risk</li></ul>",
    image: ""
  },
  {
    id: "use-cases",
    title: "Product Useful During",
    subtitle: "When people would use it",
    body: "<ul><li>Classes and study sessions</li><li>Office work and long meetings</li><li>Night driving</li><li>Exam preparation</li><li>Late-night projects</li><li>Early-morning travel</li></ul>",
    image: ""
  },
  {
    id: "unique",
    title: "What Makes Us Stand Out",
    subtitle: "USP & safety",
    body: "<p>This is a new conceptual product aimed at boosting adrenaline safely — blending creativity and innovation. Not addictive compared to other options.</p>",
    image: ""
  },
  {
    id: "impact",
    title: "Presentation & Impact",
    subtitle: "Benefits to audience",
    body: "<p>Greatly helps students and working adults who need to stay awake for critical moments — exams, projects, overtime. Empowers productivity and focus when needed most.</p>",
    image: ""
  },
  {
    id: "branding",
    title: "Logo · Slogan · Tagline",
    subtitle: "Brand identity",
    body: "<h3>SNOOZENT</h3><p><strong>Pocket Awakener</strong></p><p><strong>TAGLINE:</strong> SHAKE – TAKE - WAKE</p>",
    image: ""
  },
  {
    id: "marketing-visuals",
    title: "Marketing Visuals",
    subtitle: "Poster & Promotional Video",
    body: "<p>Poster and promotional video from the presentation.</p>",
    image: "assets/poster.png",
    video: "assets/video_add.mp4"
  }
];

/* --- DOM refs --- */
const mainNav = document.getElementById('mainNav');
const mainContent = document.getElementById('mainContent');
const menuToggle = document.getElementById('menuToggle');

// NEW DOM Refs for Modal
const buyButton = document.getElementById('buyProductBtn');
const modalOverlay = document.getElementById('noFundsModal');
const closeModalButton = document.getElementById('closeModalBtn');

function buildFromSlides(data){
  mainNav.innerHTML = '';
  mainContent.innerHTML = '';

  data.forEach((s, idx) => {
    const id = s.id || `slide-${idx+1}`;
    const hasMedia = s.video || s.image; 

    // nav link
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = s.title || `Slide ${idx+1}`;
    link.dataset.index = idx;
    link.addEventListener('click', (e)=>{
      e.preventDefault();
      // Use helper scroll function to handle sticky header offset
      scrollToSection(id);
      setActiveNav(idx);
      closeMobileMenu();
    });
    mainNav.appendChild(link);

    // section
    const sec = document.createElement('section');
    sec.className = 'section';
    if (!hasMedia) {
        sec.classList.add('full-text-section'); // ADD CLASS if no media
    }
    sec.id = id;
    sec.setAttribute('tabindex', '0'); 

    if(s.background) sec.style.background = s.background;

    const left = document.createElement('div');
    left.className = 'content';
    left.innerHTML = `<h2>${escapeHtml(s.title || '')}</h2>
                      <div class="subtitle">${escapeHtml(s.subtitle || '')}</div>
                      <div class="body">${s.body || ''}</div>`;

    sec.appendChild(left);

    // ONLY create and append the media div if media is present
    if(hasMedia){
        const media = document.createElement('div');
        media.className = 'media';

        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.gap = '20px'; 
        wrapper.style.width = '100%';

        if(s.image){
          const img = document.createElement('img');
          img.src = s.image;
          img.alt = s.title || 'Poster';
          img.style.borderRadius = '10px';
          img.style.maxWidth = '100%';
          wrapper.appendChild(img);
        }

        if(s.video){
          // UX Improvement: Responsive Video Embed
          const videoContainer = document.createElement('div');
          videoContainer.className = 'video-responsive-container';
          
          const vid = document.createElement('video');
          vid.controls = true;
          vid.src = s.video;
          vid.style.borderRadius = '10px';
          
          videoContainer.appendChild(vid);
          wrapper.appendChild(videoContainer);
        }

        media.appendChild(wrapper);
        sec.appendChild(media);
    }
    
    mainContent.appendChild(sec);
  });

  setActiveNav(0);
}

function setActiveNav(index){
  const links = mainNav.querySelectorAll('a');
  if (links.length === 0) return; 
  links.forEach((a,i)=> a.classList.toggle('active', i === index));
}

/* helper */
function escapeHtml(str){
  return String(str || '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

function scrollToSection(id) {
    const targetElement = document.getElementById(id);
    const headerHeight = document.querySelector('.site-header').offsetHeight;
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - headerHeight - 10, // Offset for sticky header + small margin
            behavior: 'smooth'
        });
    }
}

/* Mobile menu */
let mobileMenu = null;
function createMobileMenu(){
  if (mobileMenu) return;
  mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-nav';
  mobileMenu.style.display = 'none';
  document.body.appendChild(mobileMenu);

  const navClone = document.createElement('nav');
  navClone.className = 'main-nav'; 
  const cloneLinks = mainNav.cloneNode(true);
  
  cloneLinks.querySelectorAll('a').forEach(a => {
    // Re-attach listeners to cloned links to close the menu
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = a.getAttribute('href').substring(1);
      scrollToSection(targetId);
      
      const idx = parseInt(a.dataset.index);
      setActiveNav(idx); 
      closeMobileMenu(); 
    });
    navClone.appendChild(a);
  });
  
  mobileMenu.appendChild(cloneLinks);
}

function toggleMobileMenu(){
  createMobileMenu();
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  mobileMenu.style.display = isOpen ? 'none' : 'block';
}

function closeMobileMenu(){
  if(!mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.style.display = 'none';
}
menuToggle.addEventListener('click', toggleMobileMenu);

/* Keyboard nav (UX feature) */
document.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowDown' || e.key === 'ArrowRight'){ e.preventDefault(); goRelative(1); }
  else if(e.key === 'ArrowUp' || e.key === 'ArrowLeft'){ e.preventDefault(); goRelative(-1); }
});

function goRelative(delta){
  const sections = Array.from(document.querySelectorAll('.section'));
  const navHeight = document.querySelector('.site-header').offsetHeight;

  // Determine current section index based on scroll position + sticky offset
  let currentIdx = -1;
  const scrollPos = window.scrollY + navHeight + 1; 

  sections.forEach((sec, idx) => {
    if (sec.offsetTop <= scrollPos) {
      currentIdx = idx;
    }
  });

  if (currentIdx === -1) currentIdx = 0; 
  
  let nextIdx = Math.min(Math.max(0, currentIdx + delta), sections.length - 1);

  sections[nextIdx].scrollIntoView({behavior:'smooth', block:'start'});
  setActiveNav(nextIdx);
}

/* Highlight nav based on scroll pos (UX feature) */
const io = new IntersectionObserver(entries => {
  entries.forEach(entry=>{
    // Activate if a section is fully visible or close to the top
    if(entry.isIntersecting && entry.intersectionRatio >= 0.45){ 
      const id = entry.target.id;
      const links = mainNav.querySelectorAll('a');
      links.forEach((a)=> a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    }
  });
}, {root: null, threshold: 0.45}); 

function observeSections(){
  document.querySelectorAll('.section').forEach(sec => io.observe(sec));
}

// Modal Logic Handlers
function openModal() {
    modalOverlay.classList.remove('hidden');
    // Prevent scrolling beneath the modal
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    modalOverlay.classList.add('hidden');
    document.body.style.overflow = '';
}

// Add event listeners for the new buy button and modal
if (buyButton && modalOverlay) {
    buyButton.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeModal);
    
    // Close modal if user clicks outside the content area
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}


/* init */
buildFromSlides(slidesData);
observeSections();

/* optional export helper */
window.exportSlidesData = () => JSON.stringify(slidesData, null, 2);