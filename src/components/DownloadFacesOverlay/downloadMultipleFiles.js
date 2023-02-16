import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import saveAs from "save-as";

export const onButtonClick = (urlsCollection, filename = "test") => {
  console.log("onButtonClick: ", urlsCollection);
  var count = 0;
  var zip = new JSZip();
  var zipFilename = "Faces.zip";

  const urls = urlsCollection;
  // var urls = [
  //   'http://image-url-1',
  //   'http://image-url-2',
  //   'http://image-url-3'
  // ];

  urls.forEach(function (url, i) {
    var fileName_custom = `Face${i + 1}`;
    // loading a file and add it in a zip file
    JSZipUtils.getBinaryContent(url, function (err, data) {
      if (err) {
        throw err; // or handle the error
      }
      zip.file(`${fileName_custom}.jpg`, data, { binary: true });
      count++;
      if (count == urls.length) {
        zip.generateAsync({ type: "blob" }).then(function (content) {
          saveAs(content, zipFilename);
        });
      }
    });
  });
};
