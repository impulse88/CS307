// aggregates images from date-labeled folders within documents/cs307 into single a single cs307/images folder, ignoring incomplete images and non-.jpg files
// and skipping duplicates

let fs=require('fs');
let origDirParent='c:/users/nickz88/documents/cs307';
let destDirParent='c:/users/nickz88/documents/Github/cs307/images';
let processedImages=[];

fs.readdir(origDirParent,function(e,i){
  for (let j=0;j<i.length;j++){
    let currPI=fs.readdirSync(origDirParent+'/'+i[j]);
    for (let k=0;k<currPI.length;k++){
      if (processedImages.indexOf(currPI[k])==-1){
        if (fs.statSync(origDirParent+'/'+i[j]+'/'+currPI[k]).size>7000&&currPI[k].indexOf('.jpg')!=-1) {
          processedImages.push(currPI[k]);
          let currImage=fs.readFileSync(origDirParent+'/'+i[j]+'/'+currPI[k]);
          fs.writeFileSync(destDirParent+'/'+currPI[k],currImage);
        }}
    }
  }
});