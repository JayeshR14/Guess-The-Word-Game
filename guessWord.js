const wordArea = document.querySelector(".words");
const btn = document.querySelector("#btn")
const next = document.querySelector("#next")
const hint = document.querySelector("#hint")
let curWord;
let options = {
  headers: { 'X-Api-Key': '4Gfz61ZDgPPWLNLB83T4sg==kXDeHv18i3dtH3md'}
}
const render = async() => {
      const response = await fetch("https://api.api-ninjas.com/v1/randomword",options);
      let data = await response.json();    
        stringOperations(data.word)
}
render();
const stringOperations = (word) => {  
  curWord = word; 
  console.log(curWord);
  generateBoxes(word)
}
const generateBoxes = (word) => {
  let max = word.length;
  let min = 1;
  let rnums = [];
  for(let j = 0;j<word.length/3;j++){
    if(parseInt(word.length/3) <= 2){
      rnums.unshift(Math.floor(Math.random()*(max-min+1))+min);
    }
    if(parseInt(word.length/3) >= 3){
      rnums.unshift(Math.floor(Math.random()*(max-min+1))+min);
    }
  }
  
  for(i=0;i<word.length;i++){
    const textbx = document.createElement('input');
    textbx.setAttribute('text','text');
    textbx.setAttribute('id',`${i+1}`);
    textbx.setAttribute('class','wor');
    textbx.value = word.charAt(i);
    wordArea.appendChild(textbx);
  }
  rnums.forEach((ele)=>{
   let flag = true;
    for(let i = 0;i < word.length;i++){
     if(document.getElementById(`${i+1}`).id == ele){
      document.getElementById(`${i+1}`).value = "";
      if(flag){
        flag = false;
        document.querySelector('#h').innerHTML = word[i];
      }  
    }}
  })
}
const checkWord = (backArray) => {
    let finalWord = backArray.join("");
    if(finalWord == curWord){
      document.querySelector(".state").style.color = "green";
      document.querySelector(".state").innerHTML = "&#10004 Right Answer";
      setTimeout(()=>reload(),1000);
    }
    else{
       document.querySelector(".state").style.color = "red";
       document.querySelector(".state").innerHTML = "X Wrong Answer";
       setTimeout(()=>reload(),1000);
      }
}

btn.addEventListener('click',()=>{
    let backArray = [];
    const alltext = document.querySelectorAll(".wor");
    alltext.forEach((ele)=>{
    backArray.push(ele.value);
    })
    checkWord(backArray);
})
const reload = ()=>{
  location.reload();
}

next.addEventListener('click', reload)
hint.addEventListener('click',()=>{
  document.querySelector('#h').style.visibility = "visible";
})