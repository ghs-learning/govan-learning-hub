/* Shared-password deterrent only. Public GitHub files are not private. */
(()=>{'use strict';
const script=document.currentScript, id=script.dataset.hub, title=script.dataset.title, verifier=script.dataset.verifier;
const key='ghs-hub-access-v1:'+id;
const remembered=()=>{try{return sessionStorage.getItem(key)===verifier}catch{return false}};
const remember=()=>{try{sessionStorage.setItem(key,verifier)}catch{}};
const lock=()=>{try{sessionStorage.removeItem(key)}catch{}location.reload()};
function open(){document.documentElement.classList.remove('ghs-locked');document.getElementById('ghs-access')?.remove();let button=document.getElementById('ghs-lock');if(!button){button=document.createElement('button');button.id='ghs-lock';button.type='button';button.textContent='Lock hub';button.setAttribute('aria-label','Lock '+title);button.addEventListener('click',lock);document.body.append(button)}}
function start(){
if(remembered()){open();return}
const panel=document.createElement('main');panel.id='ghs-access';panel.innerHTML='<div class="ghs-card"><p class="ghs-school">GOVAN HIGH SCHOOL</p><span class="ghs-emblem" aria-hidden="true">G</span><h1></h1><p>Achieving Our Full Potential</p><p class="ghs-intro">Enter the password shared with our learning community.</p><form><label for="ghs-password">Hub password</label><div class="ghs-input"><input id="ghs-password" type="password" autocomplete="off" autocapitalize="none" spellcheck="false" required aria-describedby="ghs-help ghs-error"><button type="button" id="ghs-show" aria-pressed="false">Show</button></div><p id="ghs-help">Use lower-case letters with no spaces.</p><p id="ghs-error" role="alert"></p><button type="submit" class="ghs-enter">Open hub</button></form><p class="ghs-footer">Please keep the password within our learning community.<br>Need access? Contact Govan High School.</p></div>';
panel.querySelector('h1').textContent=title;document.body.append(panel);
const input=panel.querySelector('input'), error=panel.querySelector('#ghs-error'), toggle=panel.querySelector('#ghs-show'), submit=panel.querySelector('[type=submit]');
toggle.addEventListener('click',()=>{const show=input.type==='password';input.type=show?'text':'password';toggle.textContent=show?'Hide':'Show';toggle.setAttribute('aria-pressed',String(show))});
panel.querySelector('form').addEventListener('submit',async event=>{event.preventDefault();error.textContent='';submit.disabled=true;try{const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode('ghs-access-v1:'+id+':'+input.value)))).map(b=>b.toString(16).padStart(2,'0')).join('');if(digest!==verifier){error.textContent='That password was not recognised. Please try again.';input.setAttribute('aria-invalid','true');input.select();return}input.value='';remember();open()}catch{error.textContent='Unable to check the password. Please open the live website in an up-to-date browser.'}finally{submit.disabled=false}});
input.focus();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
