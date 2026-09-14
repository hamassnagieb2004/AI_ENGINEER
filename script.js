const sections = [...document.querySelectorAll('.story-section')];
const dots = [...document.querySelectorAll('.side-journey i')];
const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const mobileNav = document.getElementById('mobileNav');
const menu = document.getElementById('menu');

// Micro ambient particles floating behind the content
const particles = document.getElementById('particles');
if (particles) {
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.left = (Math.random() * 100) + '%';
    p.style.top = (Math.random() * 100) + '%';
    p.style.setProperty('--x', ((Math.random() - .5) * 60) + 'px');
    p.style.setProperty('--y', ((Math.random() - .5) * 45) + 'px');
    p.style.setProperty('--d', (10 + Math.random() * 10) + 's');
    p.style.animationDelay = (-Math.random() * 10) + 's';
    particles.appendChild(p);
  }
}

// Mobile menu toggle
menu?.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// Optimized IntersectionObserver for smooth section detection
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      const idx = sections.indexOf(entry.target);
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === ('#' + entry.target.id)));
    }
  });
}, { threshold: 0.3 });
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.story-section');
  const progressFill = document.getElementById('progressFill');
  const progressNum = document.getElementById('progressNum');
  const navLinks = document.querySelectorAll('.desktop-nav a');

  const totalSections = sections.length; // إجمالي الأقسام (9)

  function updateProgress() {
    let currentSectionIndex = 0;
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    // تحديد القسم الظاهر حالياً في الشاشة
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionIndex = index;
      }
    });

    // 1. تحريك شريط التقدم (Fill Line)
    const percentage = ((currentSectionIndex + 1) / totalSections) * 100;
    if (progressFill) {
      progressFill.style.height = `${percentage}%`;
    }

    // 2. تحديث الرقم الجانبي (مثال: 02 / 09)
    const formattedIndex = String(currentSectionIndex + 1).padStart(2, '0');
    const formattedTotal = String(totalSections).padStart(2, '0');
    if (progressNum) {
      progressNum.textContent = `${formattedIndex} / ${formattedTotal}`;
    }

    // 3. تحديث الرابط النشط في القائمة العلوية
    const currentId = sections[currentSectionIndex]?.getAttribute('id');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  // تشغيل الوظيفة عند التمرير وعند تحميل الصفحة
  window.addEventListener('scroll', updateProgress);
  updateProgress();
});
sections.forEach(s => observer.observe(s));
// const sections=[...document.querySelectorAll('.story-section')];
// const dots=[...document.querySelectorAll('.side-journey i')];
// const navLinks=[...document.querySelectorAll('.desktop-nav a')];
// const mobileNav=document.getElementById('mobileNav');
// const menu=document.getElementById('menu');
// const theme=document.getElementById('theme');

// // Tiny ambient particles live behind the content only.
// const particles=document.getElementById('particles');
// for(let i=0;i<34;i++){
//   const p=document.createElement('span'); p.className='particle';
//   p.style.left=(Math.random()*100)+'%'; p.style.top=(Math.random()*100)+'%';
//   p.style.setProperty('--x',((Math.random()-.5)*70)+'px');
//   p.style.setProperty('--y',((Math.random()-.5)*55)+'px');
//   p.style.setProperty('--d',(8+Math.random()*12)+'s');
//   p.style.animationDelay=(-Math.random()*12)+'s';
//   particles.appendChild(p);
// }

// menu?.addEventListener('click',()=>mobileNav.classList.toggle('open'));
// mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileNav.classList.remove('open')));

// theme?.addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('hamass-theme',document.body.classList.contains('dark')?'dark':'light');});
// if(localStorage.getItem('hamass-theme')==='dark')document.body.classList.add('dark');

// const observer=new IntersectionObserver(entries=>{
//   entries.forEach(entry=>{
//     if(entry.isIntersecting){
//       entry.target.classList.add('is-visible');
//       const idx=sections.indexOf(entry.target);
//       dots.forEach((d,i)=>d.classList.toggle('active',i===idx));
//       navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===('#'+entry.target.id)));
//     }
//   });
// },{threshold:.38});
// sections.forEach(s=>observer.observe(s));

// // Very subtle pointer response: only the atmosphere shifts, never the readable content.
// let mx=0,my=0,tx=0,ty=0;
// window.addEventListener('pointermove',e=>{tx=(e.clientX/window.innerWidth-.5)*18;ty=(e.clientY/window.innerHeight-.5)*12},{passive:true});
// function ambientParallax(){mx+=(tx-mx)*.025;my+=(ty-my)*.025;document.querySelector('.wave-lines')?.style.setProperty('transform',`translate3d(${mx*.18}px,${my*.12}px,0)`);requestAnimationFrame(ambientParallax)}
// ambientParallax();
