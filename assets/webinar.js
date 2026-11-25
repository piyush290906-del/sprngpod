
const REGISTRATION_ENDPOINT=window.SPRNGPOD_REGISTRATION_ENDPOINT!==undefined?window.SPRNGPOD_REGISTRATION_ENDPOINT:"/api/register";
const heroImage="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=82";
const lobbyImage="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=82";
const sessions=[
  {day:"Tuesday, 24 Nov",fullDate:"Tuesday, 24 November",dateStr:"24 November",time:"2:00 PM",startsAt:"2026-11-24T10:00:00Z",endsAt:"2026-11-24T11:00:00Z",booked:true},
  {day:"Tuesday, 24 Nov",fullDate:"Tuesday, 24 November",dateStr:"24 November",time:"4:00 PM",startsAt:"2026-11-24T12:00:00Z",endsAt:"2026-11-24T13:00:00Z",booked:true},
  {day:"Thursday, 26 Nov",fullDate:"Thursday, 26 November",dateStr:"26 November",time:"2:00 PM",startsAt:"2026-11-26T10:00:00Z",endsAt:"2026-11-26T11:00:00Z",booked:false},
  {day:"Thursday, 26 Nov",fullDate:"Thursday, 26 November",dateStr:"26 November",time:"4:00 PM",startsAt:"2026-11-26T12:00:00Z",endsAt:"2026-11-26T13:00:00Z",booked:false},
  {day:"Tuesday, 1 Dec",fullDate:"Tuesday, 1 December",dateStr:"1 December",time:"2:00 PM",startsAt:"2026-12-01T10:00:00Z",endsAt:"2026-12-01T11:00:00Z",booked:false},
  {day:"Tuesday, 1 Dec",fullDate:"Tuesday, 1 December",dateStr:"1 December",time:"4:00 PM",startsAt:"2026-12-01T12:00:00Z",endsAt:"2026-12-01T13:00:00Z",booked:false},
  {day:"Thursday, 3 Dec",fullDate:"Thursday, 3 December",dateStr:"3 December",time:"2:00 PM",startsAt:"2026-12-03T10:00:00Z",endsAt:"2026-12-03T11:00:00Z",booked:false},
  {day:"Thursday, 3 Dec",fullDate:"Thursday, 3 December",dateStr:"3 December",time:"4:00 PM",startsAt:"2026-12-03T12:00:00Z",endsAt:"2026-12-03T13:00:00Z",booked:false}
];
const sprngpodLogoSvg='<svg class="brand-logo-svg" viewBox="0 0 496 411" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="1" y="160" width="52" height="170" rx="26" fill="#A7DEFE"/><rect x="89" y="82" width="52" height="280" rx="26" fill="#3DB8FF"/><rect x="180" y="180" width="52" height="133" rx="26" fill="#A7DEFE"/><rect x="266" y="1" width="52" height="329" rx="26" fill="#C1F803"/><rect x="357" y="160" width="52" height="249" rx="26" fill="#3DB8FF"/><rect x="443" y="131" width="52" height="201" rx="26" fill="#C1F803"/></svg>';
const icon=(name)=>({entry:'<path d="M3 10h18M5 10V6l7-3 7 3v4M5 21v-7h14v7M9 14v7M15 14v7"/>',id:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h4M8 16h8"/>',lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',shield:'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',spark:'<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1 2.5 2 1-2 1L19 21l-1-2.5-2-1 2-1 1-2.5Z"/>',check:'<path d="m5 12 4 4L19 6"/>'}[name]||'');
const svg=(name)=>'<svg viewBox="0 0 24 24" aria-hidden="true">'+icon(name)+'</svg>';
const learn=[["entry","Smart Visitor Management","Coordinate guest arrivals, keep front desks informed and create a smoother first impression."],["id","Digital Visitor Registration","See how digital check-in can replace paper logs with a clear, consistent arrival flow."],["lock","Smart Access Control","Connect visitor identity and access permissions with secure, controlled entry."],["bell","Automated Visitor Notifications","Keep residents and building teams informed with timely arrival updates."],["shield","Building Security and Safety","Explore practical ways connected tools can support safer building operations."],["spark","Modern Digital Concierge Experiences","Bring visitor services into a helpful, connected experience for every guest."]];

function home(){
  return '<div class="page">'
    +'<section class="hero" id="webinar">'
      +'<div class="wrap hero-grid">'
        +'<div>'
          +'<span class="eyebrow"><i class="dot"></i> SPRNGPOD live webinar</span>'
          +'<h1>The Future of Visitor Management</h1>'
          +'<p class="lead">Discover how intelligent visitor management, smart access control and connected building technology are transforming the visitor experience.</p>'
          +'<div class="perk-highlight-pill">'
            +'<span class="perk-pill-badge"><span class="perk-gift-icon">🎁</span> Attendee Perk</span>'
            +'<span class="perk-pill-text">Receive an <strong>Amazon Gift Voucher</strong> when you attend the live webinar</span>'
          +'</div>'
          +'<div class="actions">'
            +'<a class="btn" data-route="/webinar/register" href="/webinar/register">Register for Webinar <span aria-hidden="true">→</span></a>'
            +'<a class="btn secondary" href="https://sprngpod.ca/" target="_blank" rel="noreferrer">Explore SPRNGPOD</a>'
          +'</div>'
          +'<p class="muted-small">Choose an available session that works for you during registration.</p>'
        +'</div>'
        +'<div class="hero-visual">'
          +'<img src="'+heroImage+'" alt="Bright, modern building reception with collaborative workspace" fetchpriority="high">'
          +'<div class="floating-card"><b>Smarter arrivals start here</b>One connected visitor experience</div>'
          +'<div class="floating-perk-card">'
            +'<div class="gift-icon-bubble">🎁</div>'
            +'<div>'
              +'<b>Amazon Gift Voucher</b>'
              +'<span>Complimentary for all attendees</span>'
            +'</div>'
          +'</div>'
          +'<div class="visual-caption"><strong>Connected buildings.<br>Welcoming experiences.</strong><span>SPRNGPOD · SMART LIVING FOR ALL</span></div>'
        +'</div>'
      +'</div>'
    +'</section>'
    +'<section class="section white" id="schedule">'
      +'<div class="wrap">'
        +'<div class="section-head">'
          +'<span class="eyebrow">Choose your session</span>'
          +'<h2>Find a time that works for you.</h2>'
          +'<p>Live interactive sessions in UAE Time (GST / UTC+4). Choose an available date and time.</p>'
        +'</div>'
        +'<div class="attendee-perk-banner">'
          +'<div class="perk-banner-icon">🎁</div>'
          +'<div class="perk-banner-text">'
            +'<strong>Exclusive Attendee Perk: Amazon Gift Voucher</strong>'
            +'<p>Every verified attendee receives a complimentary Amazon Gift Voucher sent directly to their email after attending the live webinar session.</p>'
          +'</div>'
        +'</div>'
        +'<div class="schedule">'
          +sessions.map((s,i)=>'<div class="session-card '+(s.booked?'is-booked':'')+'">'
            +'<div class="session-icon">'+svg(s.booked?"lock":"entry")+'</div>'
            +'<div style="flex:1">'
              +'<b>'+s.fullDate+' — '+s.time+'</b>'
              +'<div class="session-status-row">'
                +'<span>UAE Time (GST / UTC+4)</span>'
                +(s.booked?'<span class="status-pill booked">Fully Booked</span>':'<span class="status-pill open">Available</span>')
              +'</div>'
            +'</div>'
          +'</div>').join("")
        +'</div>'
        +'<div class="note">Select your preferred session when you register.</div>'
      +'</div>'
    +'</section>'
    +'<section class="section" id="learn">'
      +'<div class="wrap">'
        +'<div class="section-head">'
          +'<span class="eyebrow">What you&#39;ll learn</span>'
          +'<h2>Make every arrival feel effortless.</h2>'
          +'<p>Get a practical look at the connected tools shaping welcoming, secure buildings.</p>'
        +'</div>'
        +'<div class="learn-grid">'
          +learn.map(x=>'<article class="learn-card"><div class="learn-icon">'+svg(x[0])+'</div><h3>'+x[1]+'</h3><p>'+x[2]+'</p></article>').join("")
        +'</div>'
      +'</div>'
    +'</section>'
    +'<section class="section white" id="watch">'
      +'<div class="wrap video-grid">'
        +'<div class="video-copy">'
          +'<span class="eyebrow">See SPRNGPOD in action</span>'
          +'<h2>Connected building experiences, brought to life.</h2>'
          +'<p>Watch how SPRNGPOD helps make building access and everyday interactions feel simpler.</p>'
        +'</div>'
        +'<div class="video-frame" id="video-frame">'
          +'<button class="video-preview" id="video-play" type="button" aria-label="Play SPRNGPOD video">'
            +'<img src="https://img.youtube.com/vi/HH3Q0R3Bo4Y/hqdefault.jpg" alt="SPRNGPOD video thumbnail" loading="lazy">'
            +'<span class="play-button" aria-hidden="true">▶</span>'
            +'<span class="sr-only">Play video</span>'
          +'</button>'
        +'</div>'
      +'</div>'
    +'</section>'
    +'<section class="section white" id="audience">'
      +'<div class="wrap audience">'
        +'<div>'
          +'<span class="eyebrow">Who should attend</span>'
          +'<h2>Built for the people who make buildings work.</h2>'
          +'<p>Whether you oversee one property or a growing portfolio, this webinar offers ideas to take back to your team.</p>'
        +'</div>'
        +'<div class="audience-list">'
          +["Property Managers","Building Owners","Facility Managers","Real Estate Developers","Security Professionals","Residential & Commercial Operators"].map(x=>'<div class="audience-item"><span class="check">'+svg("check")+'</span>'+x+'</div>').join("")
        +'</div>'
      +'</div>'
    +'</section>'
    +'<section class="section" id="about">'
      +'<div class="wrap about">'
        +'<div class="about-img">'
          +'<img src="/assets/sprng-zip-hero.png" alt="SPRNG-ZIP Visitor Management Reimagined" loading="lazy" decoding="async">'
        +'</div>'
        +'<div class="about-copy">'
          +'<span class="eyebrow">About SPRNGPOD</span>'
          +'<h2>A more connected way to experience a building.</h2>'
          +'<p>SPRNGPOD is a smart building technology platform that simplifies visitor management, access control, communication and connected building experiences. We help properties make everyday interactions feel more seamless for residents, teams and visitors.</p>'
          +'<div class="pill-row">'
            +'<span class="pill">Visitor management</span>'
            +'<span class="pill">Smart access</span>'
            +'<span class="pill">Connected experiences</span>'
          +'</div>'
          +'<a class="btn secondary" href="https://sprngpod.ca/" target="_blank" rel="noreferrer">Discover SPRNGPOD <span aria-hidden="true">↗</span></a>'
        +'</div>'
      +'</div>'
    +'</section>'
    +'<section class="section white">'
      +'<div class="wrap">'
        +'<div class="final-cta">'
          +'<div class="perk-pill-badge mb-12"><span class="perk-gift-icon">🎁</span> Special Attendee Gift</div>'
          +'<h2>Ready to Experience Smarter Visitor Management?</h2>'
          +'<p>Save your place today and choose your session. Every verified attendee receives an Amazon Gift Voucher!</p>'
          +'<a class="btn" data-route="/webinar/register" href="/webinar/register">Reserve Your Spot &amp; Claim Voucher <span aria-hidden="true">→</span></a>'
        +'</div>'
      +'</div>'
    +'</section>'
  +'</div>';
}

function register(){
  return '<div class="page register-shell">'
    +'<div class="wrap register-grid">'
      +'<aside class="register-info">'
        +'<a class="brand" href="/" data-route="/"><span class="brand-mark" aria-hidden="true">'+sprngpodLogoSvg+'</span><span class="brand-word">SPRNGPOD</span></a>'
        +'<span class="eyebrow" style="margin-top:28px"><i class="dot"></i> SPRNGPOD live webinar</span>'
        +'<h1>The Future of Visitor Management</h1>'
        +'<p>Discover how intelligent visitor management and connected building technology can make every arrival easier.</p>'
        +'<div class="register-photo"><img src="'+heroImage+'" alt="Modern building reception" loading="lazy"></div>'
        +'<div class="benefit perk-benefit"><span class="check perk-check">🎁</span><div><strong>Amazon Gift Voucher</strong> — gifted to every verified attendee</div></div>'
        +'<div class="benefit"><span class="check">'+svg("check")+'</span>Explore practical smart visitor workflows</div>'
        +'<div class="benefit"><span class="check">'+svg("check")+'</span>Learn how access, notifications and security connect</div>'
        +'<div class="benefit"><span class="check">'+svg("check")+'</span>Join an available session that fits your schedule</div>'
      +'</aside>'
      +'<section class="form-card" aria-labelledby="form-title">'
        +'<h2 id="form-title">Reserve your place</h2>'
        +'<p class="form-intro">Tell us a little about yourself and select an available session.</p>'
        +'<div class="form-perk-card">'
          +'<div class="form-perk-icon">🎁</div>'
          +'<div class="form-perk-content">'
            +'<strong>Webinar Attendee Bonus</strong>'
            +'<p>Attend the live session to receive a complimentary <b>Amazon Gift Voucher</b> delivered directly to your registered email address.</p>'
          +'</div>'
        +'</div>'
        +'<form id="registration-form" novalidate>'
          +'<div class="fields">'
            +'<div class="field"><label for="name">Full name <span aria-hidden="true">*</span></label><input id="name" name="name" autocomplete="name" required placeholder="Your name"><div class="error" id="name-error"></div></div>'
            +'<div class="field"><label for="email">Email address <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" autocomplete="email" required placeholder="you@company.com"><div class="error" id="email-error"></div></div>'
            +'<div class="field"><label for="phone">Phone number</label><input id="phone" name="phone" type="tel" autocomplete="tel" placeholder="+971 50 123 4567 (optional)"><div class="error" id="phone-error"></div></div>'
            +'<div class="field"><label for="company">Company name</label><input id="company" name="company" autocomplete="organization" placeholder="Company (optional)"></div>'
            +'<div class="field full"><label for="designation">Designation</label><input id="designation" name="designation" autocomplete="organization-title" placeholder="Your role (optional)"></div>'
          +'</div>'
          +'<div class="session-label" id="session-label">Choose an available session <span aria-hidden="true">*</span></div>'
          +'<div class="session-options" role="radiogroup" aria-labelledby="session-label">'
            +sessions.map((s,i)=>'<div class="session-option '+(s.booked?'is-booked':'')+'">'
              +'<input type="radio" id="session-'+i+'" name="session" value="'+i+'" '+(s.booked?'disabled aria-disabled="true"':'required')+'>'
              +'<label for="session-'+i+'">'
                +'<div class="session-option-header">'
                  +'<strong>'+s.fullDate+' — '+s.time+'</strong>'
                  +(s.booked?'<span class="status-pill booked">Fully Booked</span>':'<span class="status-pill open">Available</span>')
                +'</div>'
                +'<span>UAE Time (GST / UTC+4)'+(s.booked?' · Not accepting registrations':'')+'</span>'
              +'</label>'
            +'</div>').join("")
          +'</div>'
          +'<div class="error" id="session-error"></div>'
          +'<div id="form-message" role="alert" aria-live="polite"></div>'
          +'<button class="btn" type="submit" id="submit-btn">Complete Registration <span aria-hidden="true">→</span></button>'
          +'<p class="privacy">Your details will only be used to manage this webinar registration.</p>'
        +'</form>'
      +'</section>'
    +'</div>'
  +'</div>';
}

function showSuccessPopup(d){
  const existing=document.getElementById("success-popup");
  if(existing)existing.remove();
  const popup=document.createElement("div");
  popup.className="popup-overlay active";
  popup.id="success-popup";
  popup.setAttribute("role","dialog");
  popup.setAttribute("aria-modal","true");
  popup.setAttribute("aria-labelledby","popup-title");
  const notice=d.localOnly
    ?"Your spot has been reserved for this session. A confirmation email will follow shortly."
    :"Your registration has been confirmed in our system. A confirmation email will follow shortly.";
  popup.innerHTML='<div class="popup-backdrop" id="popup-backdrop"></div>'
    +'<div class="popup-dialog">'
      +'<button class="popup-close" id="popup-close-btn" type="button" aria-label="Close dialog">&times;</button>'
      +'<div class="popup-content">'
        +'<div class="popup-badge">'+svg("check")+'</div>'
        +'<span class="eyebrow"><i class="dot"></i> SPRNGPOD live webinar</span>'
        +'<h2 id="popup-title">Registration Successful!</h2>'
        +'<p class="popup-subtext">Thank you, <strong>'+escapeHtml(d.name)+'</strong>! Your spot has been confirmed for the webinar.</p>'
        +'<div class="popup-details-card">'
          +'<div class="popup-detail-row"><span class="detail-label">Webinar</span><span class="detail-value">The Future of Visitor Management</span></div>'
          +'<div class="popup-detail-row"><span class="detail-label">Session</span><span class="detail-value"><strong>'+escapeHtml(d.fullDate||d.day)+' — '+escapeHtml(d.time)+'</strong></span></div>'
          +'<div class="popup-detail-row"><span class="detail-label">Timezone</span><span class="detail-value">UAE Time (GST / UTC+4)</span></div>'
          +'<div class="popup-detail-row"><span class="detail-label">Email</span><span class="detail-value">'+escapeHtml(d.email)+'</span></div>'
          +(d.phone?'<div class="popup-detail-row"><span class="detail-label">Phone</span><span class="detail-value">'+escapeHtml(d.phone)+'</span></div>':'')
          +(d.company?'<div class="popup-detail-row"><span class="detail-label">Company</span><span class="detail-value">'+escapeHtml(d.company)+'</span></div>':'')
        +'</div>'
        +'<div class="popup-perk-notice">'
          +'<span class="popup-perk-icon">🎁</span>'
          +'<div>'
            +'<strong>Amazon Gift Voucher Reserved!</strong>'
            +'<p>Attend your session live on <b>'+escapeHtml(d.fullDate||d.day)+' ('+escapeHtml(d.time)+' UAE Time)</b> to receive your voucher via email.</p>'
          +'</div>'
        +'</div>'
        +'<p class="popup-notice">'+notice+'</p>'
        +'<div class="popup-actions">'
          +'<button class="btn" id="popup-confirm-btn" type="button">View Confirmation Page <span aria-hidden="true">→</span></button>'
        +'</div>'
      +'</div>'
    +'</div>';
  document.body.appendChild(popup);
  document.body.style.overflow="hidden";
  const close=(toSuccess=false)=>{
    popup.classList.remove("active");
    document.body.style.overflow="";
    setTimeout(()=>popup.remove(),250);
    if(toSuccess)navigate("/webinar/success");
  };
  document.getElementById("popup-close-btn")?.addEventListener("click",()=>close(false));
  document.getElementById("popup-backdrop")?.addEventListener("click",()=>close(false));
  document.getElementById("popup-confirm-btn")?.addEventListener("click",()=>close(true));
  const onKey=(e)=>{if(e.key==="Escape"){close(false);window.removeEventListener("keydown",onKey)}};
  window.addEventListener("keydown",onKey);
}

function success(){
  let d;
  try{d=JSON.parse(sessionStorage.getItem("sprngpodWebinarRegistration")||"null")}catch{}
  if(!d)return '<div class="success-wrap"><div class="wrap success"><h1>Registration details unavailable</h1><p>Please register for the webinar to receive a confirmation.</p><a class="btn" data-route="/webinar/register" href="/webinar/register">Go to registration</a></div></div>';
  const notice="The event time uses UAE Time (GST / UTC+4). Please check your email for joining details.";
  return '<div class="success-wrap">'
    +'<section class="wrap success">'
      +'<div class="success-mark">'+svg("check")+'</div>'
      +'<span class="eyebrow">SPRNGPOD live webinar</span>'
      +'<h1>You&#39;re Registered!</h1>'
      +'<p>Thanks for registering for the webinar, <strong>'+escapeHtml(d.name)+'</strong>! Your selected session is listed below.</p>'
      +'<div class="confirm-box">'
        +'<div><span>Selected date</span><strong>'+escapeHtml(d.fullDate||d.day)+'</strong></div>'
        +'<div><span>Session time</span><strong>'+escapeHtml(d.time)+' UAE Time</strong></div>'
        +'<div><span>Timezone</span><strong>GST / UTC+4</strong></div>'
        +'<div><span>Confirmation email</span><strong>'+escapeHtml(d.email)+'</strong></div>'
      +'</div>'
      +'<div class="success-perk-highlight">'
        +'<div class="success-perk-icon">🎁</div>'
        +'<div class="success-perk-content">'
          +'<h3>Your Amazon Gift Voucher is Reserved!</h3>'
          +'<p>Simply attend your scheduled live session on <strong>'+escapeHtml(d.fullDate||d.day)+' at '+escapeHtml(d.time)+' UAE Time</strong>. Your Amazon Gift Voucher will be emailed to <strong>'+escapeHtml(d.email)+'</strong> following the session.</p>'
        +'</div>'
      +'</div>'
      +'<p class="muted-small">'+notice+'</p>'
      +'<div class="success-actions">'
        +'<a class="btn" data-route="/" href="/">Back to webinar</a>'
        +'<a class="btn secondary" href="https://sprngpod.ca/" target="_blank" rel="noreferrer">Return to SPRNGPOD</a>'
      +'</div>'
    +'</section>'
  +'</div>';
}

function escapeHtml(v){return String(v||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
const app=document.getElementById("app");

function render(){
  const path=location.pathname.replace(/\/$/,"")||"/";
  app.innerHTML=path==="/webinar/register"?register():path==="/webinar/success"?success():home();
  document.querySelectorAll(".brand-mark").forEach(el=>{
    if(!el.querySelector("svg"))el.innerHTML=sprngpodLogoSvg;
  });
  document.querySelectorAll("[data-route]").forEach(a=>a.addEventListener("click",e=>{
    e.preventDefault();
    navigate(a.dataset.route);
  }));
  if(path==="/webinar/register")bindForm();
  document.getElementById("video-play")?.addEventListener("click",()=>{
    const frame=document.createElement("iframe");
    frame.title="SPRNGPOD webinar video";
    frame.src="https://www.youtube-nocookie.com/embed/HH3Q0R3Bo4Y?autoplay=1&rel=0";
    frame.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.allowFullscreen=true;
    frame.referrerPolicy="strict-origin-when-cross-origin";
    document.getElementById("video-frame").replaceChildren(frame);
  });
  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push({event:"page_view",page_path:path});
  window.scrollTo(0,0);
}

function navigate(path){
  try{history.pushState({}, "", path)}catch(e){}
  render();
}
window.addEventListener("popstate",render);

function bindForm(){
  const form=document.getElementById("registration-form");
  if(!form)return;
  form.addEventListener("submit",async e=>{
    e.preventDefault();
    const values=Object.fromEntries(new FormData(form));
    const sIndex=values.session!==undefined?Number(values.session):-1;
    const s=sessions[sIndex];
    const errors={
      name:!values.name.trim()?"Please enter your full name.":"",
      email:!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)?"Enter a valid email address.":"",
      phone:(values.phone&&values.phone.trim()&&!/^\+?[\d\s().-]{7,20}$/.test(values.phone.trim()))?"Enter a valid phone number.":"",
      session:values.session===undefined?"Choose one session.":(s&&s.booked)?"This session is fully booked. Please choose an available slot.":""
    };
    Object.entries(errors).forEach(([k,v])=>{
      const el=document.getElementById(k+"-error");
      if(el)el.textContent=v;
      const input=form.elements[k];
      if(input&&typeof input.setAttribute==="function"&&input.type!=="radio")input.setAttribute("aria-invalid",v?"true":"false");
    });
    const msg=document.getElementById("form-message");
    if(msg){msg.className="";msg.textContent="";}
    if(Object.values(errors).some(Boolean)){
      const first=Object.keys(errors).find(k=>errors[k]);
      const target=first==="session"?form.querySelector('input[name="session"]:not([disabled])'):form.elements[first];
      target?.focus();
      return;
    }
    const btn=document.getElementById("submit-btn");
    btn.disabled=true;
    btn.textContent="Submitting…";
    btn.setAttribute("aria-busy","true");
    try{
      let result={success:true,localOnly:true};
      if(REGISTRATION_ENDPOINT){
        try{
          const response=await fetch(REGISTRATION_ENDPOINT,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
              name:values.name.trim(),
              email:values.email.trim(),
              phone:values.phone?values.phone.trim():"",
              company:values.company?values.company.trim():"",
              designation:values.designation?values.designation.trim():"",
              session:{
                day:s.day,
                fullDate:s.fullDate,
                dateStr:s.dateStr,
                time:s.time,
                timezone:"Asia/Dubai",
                utcOffset:"+04:00",
                startsAt:s.startsAt,
                endsAt:s.endsAt
              }
            })
          });
          let remote={};
          try{remote=await response.json()}catch{}
          if(response.ok&&remote.success===true){
            result=remote;
          }else if(window.SPRNGPOD_REGISTRATION_ENDPOINT||response.status>=400){
            throw new Error(remote.message||"We could not complete your registration. Please try again shortly.");
          }
        }catch(fetchErr){
          if(window.SPRNGPOD_REGISTRATION_ENDPOINT){
            throw fetchErr;
          }
        }
      }
      const regData={
        name:values.name.trim(),
        email:values.email.trim(),
        phone:values.phone?values.phone.trim():"",
        company:values.company?values.company.trim():"",
        designation:values.designation?values.designation.trim():"",
        day:s.day,
        fullDate:s.fullDate,
        time:s.time,
        startsAt:s.startsAt,
        endsAt:s.endsAt,
        localOnly:result.localOnly===true
      };
      sessionStorage.setItem("sprngpodWebinarRegistration",JSON.stringify(regData));
      btn.disabled=false;
      btn.innerHTML='Complete Registration <span aria-hidden="true">→</span>';
      btn.removeAttribute("aria-busy");
      showSuccessPopup(regData);
      window.dataLayer=window.dataLayer||[];
      window.dataLayer.push({
        event:"webinar_registration",
        session_day:s.day,
        session_time:s.time
      });
    }catch(err){
      if(msg){
        msg.className="form-error";
        msg.textContent=err.message||"Registration service is temporarily unavailable. Please try again later.";
      }
      btn.disabled=false;
      btn.innerHTML='Complete Registration <span aria-hidden="true">→</span>';
      btn.removeAttribute("aria-busy");
    }
  });
}

render();
