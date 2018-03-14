//injects data from dates and topics into specified HTML file by setting corresponding variables within the first <script></script> in the page

let fs=require('fs');


let htmlFP='c:/users/nickz88/documents/github/cs307/index.html';


let dates=JSON.parse(fs.readFileSync('c:/users/nickz88/documents/github/cs307/tdata/dates.txt'));
let topics=JSON.parse(fs.readFileSync('c:/users/nickz88/documents/github/cs307/tdata/topics.txt'));

let html=fs.readFileSync(htmlFP);

let s=html.indexOf('<script');
let h1=html.slice(0,s);
let h2=html.slice(s);

if (h2.indexOf('var dates')==-1){}
else{h2=h2.slice(h2.indexOf('</script>')+9)}
html=h1+'<script>'+'var dates='+JSON.stringify(dates)+';'+'var topics='+JSON.stringify(topics)+';'+'</script>'+h2;


fs.writeFileSync(htmlFP,html,'utf8');