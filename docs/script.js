/* Illustration only: project geometry is calculated in the Windows application. */
const NS='http://www.w3.org/2000/svg';
const isEnglish=document.documentElement.lang.startsWith('en');
const assetBase=isEnglish?'../assets/':'assets/';
function panelLines(profile){
  const count=profile==='1000'?9:7;
  const front=document.querySelector('#panel-lines-front');
  const side=document.querySelector('#panel-lines-side');
  front.replaceChildren();side.replaceChildren();
  for(let i=1;i<count;i++){
    const y=175+210*i/count;
    const a=document.createElementNS(NS,'path');a.setAttribute('d',`M75 ${y}L360 ${y-63}`);front.append(a);
    const b=document.createElementNS(NS,'path');b.setAttribute('d',`M360 ${y-63}L521 ${y+17}`);side.append(b);
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
  source:['selecting source walls by ID or selection','Enter source wall IDs or use the current selection in Archicad.'],
  profiles:['panel and flashing profile settings','Choose the preferred and secondary profiles, flashings and layout layer.'],
  colors:['panel thickness and exterior RAL color','Set the thickness and exterior RAL color. Flashings are colored to match automatically.'],
  rules:['layout rules, joints and height','Set the joint range, flashing spacing and height adjustment method.']
}:{source:['выбор исходных стен по ID или выделению','Укажите ID исходных стен или используйте текущее выделение в Archicad.'],profiles:['настройка профилей панелей и фасонных элементов','Выберите основной и доборный профиль, фасонные элементы и слой для раскладки.'],colors:['выбор толщины и наружного цвета RAL','Задайте толщину и наружный RAL. Цвет фасонных элементов подбирается автоматически.'],rules:['правила раскладки, швы и высота','Настройте диапазон швов, шаг фасонных элементов и способ подгонки высоты.']};
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
