/* Illustration only: project geometry is calculated in the Windows application. */
const NS='http://www.w3.org/2000/svg';
const isEnglish=document.documentElement.lang.startsWith('en');
const assetBase=isEnglish?'../assets/':'assets/';
function panelLines(profile){
  const count=profile==='1000'?9:7;
  const front=document.querySelector('#panel-lines-front');
  front.replaceChildren();
  for(let i=1;i<count;i++){
    const y=95+280*i/count;
    const a=document.createElementNS(NS,'path');a.setAttribute('d',`M70 ${y}H530`);front.append(a);
  }
}
panelLines('1190');
document.querySelectorAll('[data-color]').forEach(button=>button.addEventListener('click',()=>{
  document.documentElement.style.setProperty('--facade-color',button.dataset.color);
  document.querySelectorAll('[data-color]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});
  document.querySelector('#ral-note').textContent=`RAL ${button.dataset.ral}`;
}));
document.querySelectorAll('[data-profile]').forEach(button=>button.addEventListener('click',()=>{
  panelLines(button.dataset.profile);
  document.querySelectorAll('[data-profile]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});
  document.querySelector('#profile-note').textContent=`${button.dataset.profile} ${isEnglish?'mm':'мм'}`;
}));
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
  const img=document.querySelector('#interface-image');img.src=`${assetBase}interface-${key}.png`;img.alt=`${isEnglish?'SandwichCreator interface':'Интерфейс SandwichCreator'}: ${screens[key][0]}`;
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
