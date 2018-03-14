// constructs ordered array of dates objects, each with date attribute and array of names of images fully covered in class that day

let fs=require('fs');
let origDirParent='c:/users/nickz88/documents/cs307';
let destDirParent='c:/users/nickz88/documents/Github/cs307/tdata';

let dates=[];

let childDirs=fs.readdirSync(origDirParent);

for (let i=0;i<childDirs.length;i++){
  let tempImages=[]=fs.readFileSync(origDirParent+'/'+childDirs[i]+'/'+'imagedata.txt').toString().split(/\n?\r/);
  dates[i]={};
  dates[i].date=childDirs[i];
  console.log(childDirs[i]);
  dates[i].images=[];
  for (let j=0;j<tempImages.length;j++){
    if (tempImages[j].indexOf('/')!=-1){
      tempImages[j]=tempImages[j].slice(tempImages[j].indexOf('/')+1);
    }
    else if (tempImages[j].indexOf('\n')!=-1){
      tempImages[j]=tempImages[j].slice(tempImages[j].indexOf('\n')+1);
    }
    if (parseInt(tempImages[j].slice(tempImages[j].indexOf(':')+1))>7000){
      dates[i].images.push(tempImages[j].slice(0,tempImages[j].indexOf('.jpg')));
    }
  }
}

// basic swap sort since some dates are read out of order, could probably also apply built-in array sort to childDirs

function swap(x,y){
  let tx=dates[x];
  dates[x]=dates[y];
  dates[y]=tx;
}

for (let i=0;i<dates.length;i++){
  let m1=parseInt(dates[i].date.slice(0,dates[i].date.indexOf('.')));
  let d1=parseInt(dates[i].date.slice(dates[i].date.indexOf('.')+1,dates[i].date.indexOf('.',dates[i].date.indexOf('.')+1)));
  for (let j=i;j<dates.length;j++){
    let m2=parseInt(dates[j].date.slice(0,dates[j].date.indexOf('.')));
    let d2=parseInt(dates[j].date.slice(dates[j].date.indexOf('.')+1,dates[j].date.indexOf('.',dates[j].date.indexOf('.')+1)));
    if ((m2<m1)||m1==m2&&d2<d1){
      swap(i,j);
      m1=parseInt(dates[i].date.slice(0,dates[i].date.indexOf('.')));
      d1=parseInt(dates[i].date.slice(dates[i].date.indexOf('.')+1,dates[i].date.indexOf('.',dates[i].date.indexOf('.')+1)));
    }
  }
}

fs.writeFileSync(destDirParent+'/dates.txt',JSON.stringify(dates),'utf8');
console.log(dates);
