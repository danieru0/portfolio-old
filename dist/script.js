!function(){let e=new Image,t=document.getElementById("loader"),n=document.getElementById("hero");e.src="imgs/header.jpg",e.onload=(()=>{t.classList.add("done"),n.classList.add("show")});let l=document.querySelectorAll(".projects__project"),d=document.getElementById("modal-container"),s=document.getElementById("modal"),o=document.getElementById("modal-close"),c=document.getElementById("modal-title"),a=document.getElementById("modal-desc"),i=document.getElementById("modal-list"),m=document.getElementById("modal-image"),r=document.getElementById("modal-live"),u=document.getElementById("modal-src"),y=document.getElementById("focusguard-last"),g=document.getElementById("focusguard-first");function E(){s.classList.remove("active"),d.classList.remove("active"),i.innerHTML=""}function p(e,t){d.classList.add("active"),fetch("assets/projects.json").then(e=>e.json()).then(n=>{let l=n[e];c.textContent=l.title,a.textContent=l.description,m.style.backgroundImage=`url('${l.image}')`,"None"!==l.live?(r.style.display="inline",r.href=l.live):r.style.display="none","None"!==l.src?(u.style.display="inline",u.href=l.src):u.style.display="none",Object.keys(l.languages).map(e=>{let t=l.languages[e],n=document.createElement("li");n.classList.add("modal__item"),n.textContent=t,i.appendChild(n)}),s.classList.add("active"),t&&setTimeout(()=>{o.focus()},400)})}y.addEventListener("focus",()=>{o.focus()}),g.addEventListener("focus",()=>{"inline"===u.style.display?u.focus():"inline"===r.style.display&&r.focus()}),l.forEach(e=>{e.addEventListener("click",()=>p(e.id)),e.addEventListener("keypress",t=>{s.classList.contains("active")||"Enter"===t.key&&p(e.id,!0)})}),o.addEventListener("click",E),d.addEventListener("click",e=>{"project__modalContainer active"===e.target.className&&E()}),document.addEventListener("keyup",e=>{s.classList.contains("active")&&"Escape"===e.key&&E()});let v=document.getElementById("showmore-btn"),f=document.querySelectorAll(".projects__project"),L=4;v.addEventListener("click",()=>{if("Mniej"!==document.querySelector(".more-btn__text").textContent){let e=document.querySelectorAll(".projects__project.disabled");if(e.length)for(let t=0;t<4;t++)L++,e[t]&&e[t].classList.remove("disabled"),L===f.length&&(document.querySelector(".more-btn__text").textContent="Mniej")}else{L=4,document.querySelector(".more-btn__text").textContent="Więcej";for(let e=4;e<f.length;e++)f[e].classList.add("disabled")}})}();