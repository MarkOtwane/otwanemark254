const API_BASE = 'http://localhost:5000/api';

async function apiCall(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, options);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function loadHero() {
  try {
  const data = await apiCall('/hero');
  const nameEl = document.getElementById('hero-name');
  const subtitleEl = document.getElementById('hero-subtitle');
  const descEl = document.getElementById('hero-description');
  const taglineEl = document.getElementById('hero-tagline');
  const availEl = document.getElementById('hero-availability');
    
    if (nameEl) {
      const parts = (data.name || '').split(' ');
      const firstName = parts[0] || '';
      const lastName = parts.slice(1).join(' ') || '';
      nameEl.innerHTML = data.greeting 
        ? `${data.greeting} <span class="text-primary">${firstName}${lastName ? ' ' + lastName : ''}</span>`
        : `<span class="text-primary">${firstName}${lastName ? ' ' + lastName : ''}</span>`;
    }
    if (subtitleEl) subtitleEl.textContent = data.subtitle || '';
    if (descEl) descEl.innerHTML = data.description || '';
    if (taglineEl) taglineEl.innerHTML = data.tagline || '';
    if (availEl) availEl.classList.toggle('hidden', !data.available);
  } catch (e) { console.log('Hero API not available, using static content'); }
}

async function loadSkills() {
  try {
    const skills = await apiCall('/skills');
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    grid.innerHTML = skills.map(s => `
      <div class="glass-card p-6 rounded-xl text-center flex flex-col items-center gap-3">
        <span class="material-symbols-outlined text-3xl text-primary">${s.icon || 'star'}</span>
        <span class="font-code-sm text-code-sm">${s.name}</span>
      </div>
    `).join('');
  } catch (e) { console.log('Skills API not available'); }
}

async function loadProjects() {
  try {
    const projects = await apiCall('/projects');
    const list = document.getElementById('project-list');
    if (!list) return;
    list.innerHTML = projects.map(p => `
      <div class="project-card glass-card rounded-2xl overflow-hidden flex flex-col" data-tags="${(p.tags || []).map(t => t.name).join(' ')}">
        <div class="project-thumb h-56 overflow-hidden relative">
          <img class="w-full h-full object-cover" src="${p.image_url || ''}" alt="${p.title}" loading="lazy" />
          <div class="overlay absolute inset-0 bg-black/50 flex items-center justify-center gap-4">
            ${p.live_url ? `<a href="${p.live_url}" target="_blank" rel="noopener noreferrer" class="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform" aria-label="Open ${p.title} live demo"><span class="material-symbols-outlined block">open_in_new</span></a>` : ''}
          </div>
        </div>
        <div class="p-8 flex flex-col flex-1">
          <div class="flex gap-2 mb-4 flex-wrap">${(p.tags || []).map(t => `<span class="px-3 py-1 glass-card rounded-full text-[10px] font-mono text-primary uppercase tracking-widest">${t.name}</span>`).join('')}</div>
          <h3 class="text-xl font-bold mb-3">${p.title}</h3>
          <p class="text-on-surface-variant mb-6 text-sm flex-1">${p.description || ''}</p>
          <div class="mt-auto flex justify-between items-center">
            ${p.live_url ? `<a class="text-sm font-bold text-primary hover:underline" href="${p.live_url}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : '<span></span>'}
            <a class="text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors" href="https://github.com/MarkOtwane" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    `).join('');
  } catch (e) { console.log('Projects API not available'); }
}

async function loadTestimonials() {
  try {
    const items = await apiCall('/testimonials');
    const section = document.getElementById('testimonials-section');
    if (!section) return;
    section.innerHTML = `
      <div class="max-w-container-max mx-auto px-gutter">
        <div class="text-center mb-16 reveal">
          <h2 class="font-headline-lg text-3xl sm:text-headline-lg mb-4 font-bold">What <span class="text-primary">Clients</span> Say</h2>
          <p class="text-on-surface-variant">Don't just take my word for it — hear it from the people I've worked with.</p>
        </div>
        <div class="grid md:grid-cols-2 gap-stack-lg reveal">
          ${items.map(t => `
            <blockquote class="glass-card p-8 rounded-2xl">
              <span class="material-symbols-outlined text-primary text-4xl mb-3 block material-symbols-filled">format_quote</span>
              <p class="text-on-surface-variant italic mb-4">"${t.quote}"</p>
              <footer class="font-semibold text-on-surface not-italic">— ${t.client_name}${t.company ? `, ${t.company}` : ''}</footer>
            </blockquote>
          `).join('') || '<p class="text-center text-on-surface-variant">No testimonials yet.</p>'}
        </div>
      </div>
    `;
  } catch (e) { console.log('Testimonials API not available'); }
}

async function loadContact() {
  try {
    const data = await apiCall('/contact');
    const emailEl = document.getElementById('contact-email');
    if (emailEl && data.email) {
      emailEl.href = `mailto:${data.email}`;
      emailEl.textContent = data.email;
    }
  } catch (e) { console.log('Contact API not available'); }
}

async function loadSocials() {
  try {
    const items = await apiCall('/social');
    const container = document.getElementById('social-links');
    if (!container) return;
    container.innerHTML = items.map(s => `
      <a class="text-on-surface-variant hover:text-primary transition-all" href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.platform} profile">
        <span class="material-symbols-outlined">${s.icon || 'link'}</span>
      </a>
    `).join('');
  } catch (e) { console.log('Social API not available'); }
}

document.addEventListener('DOMContentLoaded', () => {
  loadHero();
  loadSkills();
  loadProjects();
  loadTestimonials();
  loadContact();
  loadSocials();
});
