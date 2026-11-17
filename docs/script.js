const isEnglish=document.documentElement.lang.startsWith('en');
const assetBase=isEnglish?'../assets/':'assets/';
const screenImages={"source":"sc_10.jpg?v=927225c61498","profiles":"sc_11.jpg?v=c391ae9afbb8","colors":"sc_12.jpg?v=1e740abb9726","rules":"sc_13.jpg?v=4ba01e11b753"};
const screens=isEnglish?{
  source:['selecting source walls by ID or selection','Enter source wall IDs or use the current selection in Archicad'],
  profiles:['panel and flashing profile settings','Choose the primary and secondary profiles, flashings, and the layer for placing them'],
  colors:['panel thickness and exterior RAL color','Set the panel thickness and exterior color, including exterior flashings'],
  rules:['layout parameters, joints and height','Set the range of vertical gaps between panels, flashing spacing, and the height adjustment method']
}:{source:['выбор исходных стен по ID или выделению','Укажите ID исходных стен или используйте текущую выборку в Archicad'],profiles:['настройка профилей панелей и фасонных элементов','Выберите основной и доборный профиль, фасонные элементы и слой для их размещения'],colors:['выбор толщины и наружного цвета RAL','Задайте толщину панелей и наружный цвет, включая наружные фасонные элементы'],rules:['параметры раскладки, швы и высота','Настройте диапазон вертикальных зазоров между панелями, шаг фасонных элементов и способ подгонки по высоте']};
const tabs=[...document.querySelectorAll('[data-screen]')];
function selectScreen(tab){
  const key=tab.dataset.screen;
  tabs.forEach(t=>{t.classList.toggle('selected',t===tab);t.setAttribute('aria-selected',String(t===tab));t.tabIndex=t===tab?0:-1;});
  const img=document.querySelector('#interface-image');img.src=`${assetBase}${screenImages[key]}`;img.alt=`${isEnglish?'SandwichCreator interface':'Интерфейс SandwichCreator'}: ${screens[key][0]}`;
  document.querySelector('#screen-caption').textContent=screens[key][1];
  document.querySelector('#screen-panel').setAttribute('aria-labelledby',tab.id);
}
tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>selectScreen(tab));
  tab.addEventListener('keydown',e=>{
    let index;if(e.key==='ArrowRight')index=(i+1)%tabs.length;else if(e.key==='ArrowLeft')index=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')index=0;else if(e.key==='End')index=tabs.length-1;else return;
    e.preventDefault();selectScreen(tabs[index]);tabs[index].focus();
  });
});


/* Local image carousel: buttons, keyboard and numbered selectors. */
const carouselSlides=isEnglish?[
 ['sc_01.jpg','Panel corner connection'],
 ['sc_02.jpg','Panel joint and flashings'],
 ['sc_03.jpg','Source walls and finished panel layout'],
 ['sc_04.jpg','GOST sandwich panel schedule']
]:[
 ['sc_01.jpg','Угловое соединение панелей'],
 ['sc_02.jpg','Стык панелей и фасонные элементы'],
 ['sc_03.jpg','Исходные стены и готовая раскладка'],
 ['sc_04.jpg','Ведомость сэндвич-панелей по ГОСТ']
];
const carousel=document.querySelector('#project-carousel');
const slideButtons=[...carousel.querySelectorAll('[data-slide]')];
let activeSlide=0;
function selectSlide(index){
 activeSlide=(index+carouselSlides.length)%carouselSlides.length;
 const [file,caption]=carouselSlides[activeSlide];
 const img=document.querySelector('#carousel-image');img.src=assetBase+file;img.alt=caption;
 document.querySelector('#carousel-caption').textContent=caption;
 document.querySelector('#carousel-count').textContent=String(activeSlide+1).padStart(2,'0')+' / '+String(carouselSlides.length).padStart(2,'0');
 slideButtons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===activeSlide)));
}
slideButtons.forEach(button=>button.addEventListener('click',()=>selectSlide(Number(button.dataset.slide))));
document.querySelector('#carousel-prev').addEventListener('click',()=>selectSlide(activeSlide-1));
document.querySelector('#carousel-next').addEventListener('click',()=>selectSlide(activeSlide+1));
carousel.addEventListener('keydown',event=>{
 if(event.key==='ArrowLeft'){event.preventDefault();selectSlide(activeSlide-1);}
 else if(event.key==='ArrowRight'){event.preventDefault();selectSlide(activeSlide+1);}
 else if(event.key==='Home'){event.preventDefault();selectSlide(0);}
 else if(event.key==='End'){event.preventDefault();selectSlide(carouselSlides.length-1);}
});

/* Download analytics: record the EXE link, not navigation to its section. */
document.querySelectorAll('a[download]').forEach(link=>{
  const fileName=new URL(link.href,document.baseURI).pathname.split('/').pop();
  const version=fileName.match(/^SandwichCreator-([\d.]+)\.exe$/i)?.[1];
  if(!version)return;
  link.addEventListener('click',()=>{
    if(typeof window.ym==='function'){
      window.ym(114266155,'reachGoal','download_exe',{
        app_version:version,
        language:document.documentElement.lang,
        file_name:fileName
      });
    }
  });
});
