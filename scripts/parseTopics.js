// organizes images into topics based on their names, creates topics object with topic keys and image array values, refactors dates array to consist of objects
// with a date key and an object with topic keys referencing 2 variable arrays of format [index of first image of posted that day within corresponding topics array, index of last image
//posted that day within corresponding topics array]

let fs=require('fs');

let datesFP='c:/users/nickz88/documents/github/cs307/tdata/dates.txt';
let topicsFP='c:/users/nickz88/documents/github/cs307/tdata/topics.txt';


let dates=JSON.parse(fs.readFileSync(datesFP));

let topics={};

function stripNums(imgStr){
  if (imgStr.indexOf('_')!=-1&&imgStr.lastIndexOf('_')>imgStr.length-5){
    return imgStr.slice(0,imgStr.lastIndexOf('_'));
  }
  else if (imgStr.indexOf('-')!=-1&&imgStr.lastIndexOf('-')>imgStr.length-5){
    return imgStr.slice(0,imgStr.lastIndexOf('-'));
  }
  else{
    let i=imgStr.length-1;
    while (!isNaN(imgStr[i])){
      i--;
    }
    return imgStr.slice(0,i+1);
  }
}

for (let i=0;i<dates.length;i++){
  let tTopics={};
  for (let j=0;j<dates[i].images.length;j++){
    let tTopic=stripNums(dates[i].images[j]);
    if (!tTopics.hasOwnProperty(tTopic)){
      tTopics[tTopic]=[];
      tTopics[tTopic][0]=dates[i].images[j];
    }
    else{
      tTopics[tTopic].push(dates[i].images[j]);
    }
    if (!topics.hasOwnProperty(tTopic)){
      topics[tTopic]=[];
      if (topics[tTopic].indexOf(dates[i].images[j])==-1){
      topics[tTopic][0]=dates[i].images[j];}
    }
    else if (topics[tTopic].indexOf(dates[i].images[j])==-1){
        topics[tTopic].push(dates[i].images[j]);
      }

  }
  dates[i].topics=tTopics;
  delete dates[i].images;
}

for (let i=0;i<dates.length;i++){
  for (let t in dates[i].topics){
    dates[i].topics[t]=[topics[t].indexOf(dates[i].topics[t][0]),topics[t].indexOf(dates[i].topics[t][dates[i].topics[t].length-1])];
  }
}

console.log(JSON.stringify(dates));

fs.writeFileSync(datesFP,JSON.stringify(dates),'utf8');
fs.writeFileSync(topicsFP,JSON.stringify(topics),'utf8');