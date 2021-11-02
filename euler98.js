const fs = require('fs')


fs.readFile('p098_words.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  doMath(data.split(",").map(w=>w.substring(1, w.length-1)))
})

function genSquares(){
  let n = 1;
  const squareList = []
  while (n**2 < 10**10){
    squareList.push(n**2);
    n++;
  }
  return squareList;
}

function checkValid(word1, word2, num, squareList){
  const lets = word1.split("");
  const lets2 = word2.split("");
  const digs = String(num).split("")
  const genNum = []
  const mapLet2Num = {};
  const chosenNums = {}
  for (let i = 0 ; i < word1.length; i++){
    if (mapLet2Num[lets[i]] && !chosenNums[digs[i]]){//letter has been mapped, number has not, not a legal map
      return false;
    }
    if (!mapLet2Num[lets[i]] && chosenNums[digs[i]]){//letter has not been mapped, number has, not a legal map
      return false;
    }
    if (lets[i] in mapLet2Num){
      //already should b mapped
    }else{
      mapLet2Num[lets[i]] = digs[i]
      chosenNums[digs[i]] = lets[i]
    }
  }
  for (let i = 0 ; i < word1.length; i++){
    genNum.push(mapLet2Num[lets2[i]])
  }
  if (genNum[0] == 0)return false;
  if (squareList.includes(Number(genNum.join("")))){
    return [Number(genNum.join("")), num];
  }
  return false;
}

function pickNums(word, word2, squareList){
  let val = 1;
  let v2 = 1;
  let greatestAns = 0;
  const maxVal = 10**(word.length)
  while (v2 < maxVal){
    if (v2>=maxVal/10){
      if (checkValid(word, word2, v2, squareList)){
        let [a, b] = checkValid(word, word2, v2, squareList)
        if (a > greatestAns) greatestAns = a;
        if (b > greatestAns) greatestAns = b;
      }
    }
    val++;
    v2 += 2*val-1;//slightly better square func
  }
  return greatestAns;
}

function doMath(words){
  const squareList = genSquares();
  const sortedWords = {}

  for(const word of words){
    const sortedWord = word.split("").sort().join("");
    if (sortedWords[sortedWord]){
      sortedWords[sortedWord].push(word);
    }else{
      sortedWords[sortedWord] = [word]
    }
  }

  //console.log(sortedWords);
  const possWords = Object.entries(sortedWords).filter(o => o[1].length>1).sort((a,b)=>a[0].length-b[0].length)
  let greatestAns = 0;
  for (let i = 0 ; i < possWords.length; i++){
    const val = pickNums(possWords[i][1][0], possWords[i][1][1], squareList);
    if (val > greatestAns)greatestAns = val;
  }
  console.log(greatestAns);
}