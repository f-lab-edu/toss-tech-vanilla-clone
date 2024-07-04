document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const sp1 = document.createElement('span');
  const sp1_content = document.createTextNode('new span element.');
  sp1.appendChild(sp1_content);
  root?.appendChild(sp1);
});
