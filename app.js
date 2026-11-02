const titles = [
 {id:1,title:"Além do Horizonte",type:"movie",genre:"Aventura",year:2025,duration:"1h 48min",rating:"Livre",symbol:"AH",colors:["#35466b","#18202f"],description:"Uma jornada por paisagens desconhecidas e escolhas que mudam o destino. Este cadastro é um exemplo visual para demonstrar como os títulos aparecerão no catálogo."},
 {id:2,title:"Entre Mundos",type:"series",genre:"Drama",year:2025,duration:"2 temporadas",rating:"12 anos",symbol:"EM",colors:["#62435d","#201c35"],description:"Duas realidades se cruzam quando uma família precisa recomeçar. Exemplo de cadastro de série com espaço preparado para temporadas e episódios."},
 {id:3,title:"O Código da Terra",type:"movie",genre:"Documentário",year:2024,duration:"1h 32min",rating:"Livre",symbol:"CT",colors:["#39716c","#172d37"],description:"Uma investigação visual sobre os desafios ambientais e as soluções que podem transformar o futuro."},
 {id:4,title:"Última Estação",type:"series",genre:"Drama",year:2026,duration:"1 temporada",rating:"14 anos",symbol:"UE",colors:["#865d38","#30202a"],description:"Em uma cidade em transformação, encontros inesperados conectam histórias que pareciam não ter relação."}
];
let activeFilter="all", currentTitle=null, favorites=JSON.parse(localStorage.getItem("ps-favorites")||"[]"), currentView="home";
const $=id=>document.getElementById(id);
function toast(msg){const el=$("toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2300)}
function render(){
 const query=($("searchInput").value||"").toLowerCase().trim();
 let data=titles.filter(t=>{
  const filterOK=activeFilter==="all"||(activeFilter==="movie"&&t.type==="movie")||(activeFilter==="series"&&t.type==="series")||t.genre===activeFilter;
  const viewOK=currentView==="movies"?t.type==="movie":currentView==="series"?t.type==="series":currentView==="mylist"?favorites.includes(t.id):true;
  const queryOK=[t.title,t.genre,t.description].join(" ").toLowerCase().includes(query);
  return filterOK&&viewOK&&queryOK;
 });
 $("catalogGrid").innerHTML=data.map(t=>`<article class="title-card" data-id="${t.id}" tabindex="0" role="button" aria-label="Ver detalhes de ${t.title}"><div class="poster" style="--c1:${t.colors[0]};--c2:${t.colors[1]}"><span class="poster-badge">${t.type==="movie"?"FILME":"SÉRIE"}</span><span class="poster-symbol">${t.symbol}</span><span class="poster-label">${t.title}</span></div><div class="card-info"><h3 class="card-title">${t.title}</h3><div class="card-meta">${t.year} · ${t.genre} · ${t.duration}</div></div></article>`).join("");
 $("resultCount").textContent=`${String(data.length).padStart(2,"0")} TÍTULOS`;
 $("emptyState").classList.toggle("hidden",data.length!==0);
 $("catalogGrid").classList.toggle("hidden",data.length===0);
 document.querySelectorAll(".title-card").forEach(card=>{const open=()=>showDetails(Number(card.dataset.id));card.addEventListener("click",open);card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open()}})});
}
function showDetails(id){
 currentTitle=titles.find(t=>t.id===id);if(!currentTitle)return;
 $("modalTitle").textContent=currentTitle.title;$("modalType").textContent=currentTitle.type==="movie"?"FILME":"SÉRIE";
 $("modalMeta").textContent=`${currentTitle.year} · ${currentTitle.genre} · ${currentTitle.duration} · ${currentTitle.rating}`;
 $("modalDescription").textContent=currentTitle.description;
 $("modalArt").style.background=`linear-gradient(120deg,${currentTitle.colors[0]},${currentTitle.colors[1]})`;
 $("favoriteButton").textContent=favorites.includes(id)?"✓ Na minha lista":"＋ Minha lista";
 $("detailModal").classList.remove("hidden");
}
function setView(view){
 currentView=view;document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
 $("sectionTitle").textContent=({home:"Explore o catálogo",movies:"Filmes",series:"Séries",mylist:"Minha lista"})[view];
 if(view==="movies")activeFilter="movie";else if(view==="series")activeFilter="series";else activeFilter="all";
 document.querySelectorAll(".filter-chip").forEach(b=>b.classList.toggle("selected",b.dataset.filter===activeFilter));
 render();$("catalogSection").scrollIntoView({behavior:"smooth",block:"start"});
}
document.querySelectorAll(".nav-link").forEach(b=>b.addEventListener("click",()=>setView(b.dataset.view)));
document.querySelectorAll(".filter-chip").forEach(b=>b.addEventListener("click",()=>{activeFilter=b.dataset.filter;currentView="home";document.querySelectorAll(".nav-link").forEach(n=>n.classList.toggle("active",n.dataset.view==="home"));document.querySelectorAll(".filter-chip").forEach(n=>n.classList.toggle("selected",n===b));render()}));
$("searchToggle").addEventListener("click",()=>{$("searchPanel").classList.toggle("hidden");if(!$("searchPanel").classList.contains("hidden")){$("searchInput").focus();$("searchPanel").scrollIntoView({behavior:"smooth"})}});
$("searchInput").addEventListener("input",render);
$("exploreButton").addEventListener("click",()=>$("catalogSection").scrollIntoView({behavior:"smooth"}));
$("aboutButton").addEventListener("click",()=>toast("Projeto Streaming · plataforma privada em desenvolvimento."));
$("profileButton").addEventListener("click",()=>toast("Login e perfis serão ativados na próxima etapa."));
$("modalClose").addEventListener("click",()=>$("detailModal").classList.add("hidden"));
$("detailModal").addEventListener("click",e=>{if(e.target===$("detailModal"))$("detailModal").classList.add("hidden")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("detailModal").classList.add("hidden")});
$("favoriteButton").addEventListener("click",()=>{if(!currentTitle)return;const id=currentTitle.id;favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];localStorage.setItem("ps-favorites",JSON.stringify(favorites));$("favoriteButton").textContent=favorites.includes(id)?"✓ Na minha lista":"＋ Minha lista";toast(favorites.includes(id)?"Adicionado à sua lista":"Removido da sua lista");if(currentView==="mylist")render()});
$("playButton").addEventListener("click",()=>toast("Player aguardando integração com conteúdo licenciado."));
render();