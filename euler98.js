const fs = require('fs')


fs.readFile('p098_words.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  doMath(data.split(",").map(w=>w.substring(1, w.length-1)))
})

function genSquares(){
  n = 1;
  squareList = []
  while (n**2 < 10**14){
    squareList.push(n**2);
    n++;
  }
  return squareList;
}

function checkValid(word1, word2, num){
  //permutate num from word1 to word2 and see if its valid
}

function doMath(words){
  squareList = genSquares();
  sortedWords = {}

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
  console.log(possWords);
}