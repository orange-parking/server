const db = require('../firebase/index')

var fs = require('fs');

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      let parkiran = []
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, JSON.parse(content))
        for(let i = 0; i < JSON.parse(content).parkiran.length; i++){
          let capacity = Math.round(Math.random()*30) 
          let reserved = []
          for (let j = 0; j < capacity-Number(JSON.parse(content).parkiran[i].avail); j++) {
            reserved.push(j+1)
          }
          parkiran.push({
            ...JSON.parse(content).parkiran[i], 
            capacity,
            reserved
          })
          console.log(JSON.stringify(parkiran,null,2))
        }
        db
        .collection('parking-lots')
        .doc(JSON.parse(content).parkiran[0].id)
        .set({parkiran: parkiran, name: JSON.parse(content).parkiran[0].id})
        .then((data) => {
            console.log(data),'======'
        })
        .catch(err => {
            console.log(err)
        })
      });
    });
  });
}

var data = [];
readFiles('/home/qoyyima/Downloads/drive-download-20190720T155350Z-001/', function(filename, content) {
  data.push(content);
//   console.log(data)
}, function(err) {
  throw err;
});