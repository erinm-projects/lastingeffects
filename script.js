const navWrap=document.getElementById('navWrap');
function navState(){if(navWrap)navWrap.classList.toggle('scrolled',window.scrollY>50)}
window.addEventListener('scroll',navState,{passive:true});navState();

const menuBtn=document.querySelector('.menu-btn'),mobileNav=document.querySelector('.mobile-nav');
if(menuBtn&&mobileNav){
  menuBtn.addEventListener('click',()=>{
    const open=menuBtn.getAttribute('aria-expanded')==='true';
    menuBtn.setAttribute('aria-expanded',String(!open));
    mobileNav.hidden=false;mobileNav.classList.toggle('open',!open);
    if(open)mobileNav.hidden=true;
  });
  mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    menuBtn.setAttribute('aria-expanded','false');mobileNav.classList.remove('open');mobileNav.hidden=true;
  }));
}

document.querySelectorAll('.acc-item button').forEach(btn=>btn.addEventListener('click',()=>{
  const item=btn.closest('.acc-item'),open=item.classList.contains('open');
  document.querySelectorAll('.acc-item').forEach(x=>x.classList.remove('open'));
  if(!open)item.classList.add('open');
}));

const track=document.getElementById('reviewTrack'),reviews=track?[...track.children]:[];let idx=0;
function visible(){return innerWidth<=680?1:innerWidth<=980?2:3}
function update(){if(!track)return;const v=visible(),max=Math.max(0,reviews.length-v);idx=Math.min(idx,max);track.style.transform=`translateX(-${idx*(100/v)}%)`}
document.getElementById('reviewPrev')?.addEventListener('click',()=>{idx=Math.max(0,idx-1);update()});
document.getElementById('reviewNext')?.addEventListener('click',()=>{idx=Math.min(Math.max(0,reviews.length-visible()),idx+1);update()});
window.addEventListener('resize',update);update();


const usefulTrack=document.getElementById('usefulTrack');
const usefulItems=usefulTrack?[...usefulTrack.children]:[];
let usefulIdx=0;
function usefulVisible(){return innerWidth<=680?1:innerWidth<=980?2:3}
function updateUseful(){
  if(!usefulTrack)return;
  const v=usefulVisible();
  const max=Math.max(0,usefulItems.length-v);
  usefulIdx=Math.min(usefulIdx,max);
  usefulTrack.style.transform=`translateX(-${usefulIdx*(100/v)}%)`;
}
document.getElementById('usefulPrev')?.addEventListener('click',()=>{
  usefulIdx=Math.max(0,usefulIdx-1);updateUseful();
});
document.getElementById('usefulNext')?.addEventListener('click',()=>{
  usefulIdx=Math.min(Math.max(0,usefulItems.length-usefulVisible()),usefulIdx+1);updateUseful();
});
window.addEventListener('resize',updateUseful);
updateUseful();
