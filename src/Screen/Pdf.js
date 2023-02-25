import React from 'react';
import {Image} from 'react-native';
import {TouchableOpacity, PermissionsAndroid} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import {Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const data = {
  name: 'Tonny Hill',
  address: '101 E. Chapman Ave<br>Orange, CA 92866',
  phone: '98273-***11',
  organization: 'Xyz Company',
  amount: '46899.50',
  amt: '53100.50',
};

const ExportPdf = () => {
  const htmlContent = `
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Laboratory Report PDF</title>
      <!-- CSS only -->
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
        crossorigin="anonymous"
      />
      <!-- JavaScript Bundle with Popper -->
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
        crossorigin="anonymous"
      ></script>
  
      <style>
        .lab_title {
          font-family: poppins;
          font-size: 2rem;
          text-transform: uppercase;
          font-weight: 500;
          color: #1fbba1;
          margin-top: 2rem;
        }
        hr #one {
          color: #1fbba1;
          border-top: 15px solid #1fbba1;
          margin-top: -6px;
        }
        .toplogo {
          height: 70px;
          margin-top: 20px;
        }
        .title2{
          font-family: poppins;
          font-weight: 400;
          font-size: 1.4rem;
        }
         #clienthr{
          color: black;
          border-top: 2px sold black;
        }
        .title3{
          font-size: .8rem;
          font-family: poppins;
          font-weight: 300;
        }
        td{
          border:none;
          outline: none;
        }
        .logofooter{
          width: 100px;
        }
        .footertext{
          font-size: .7rem;
          color: blue;
          text-align: right;
        }
        .table{
          font-size: .8rem;
          font-family: poppins;
          font-weight: 300;
          
        }
        tr{
          height: 4px;
        }
        td{
          height: 4px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-6 lab_title">
            LABORATORY REPORT
            <hr id='one' style="border-top: 5px solid #1fbba1"/>
          </div>
          <div class="col-sm-3">
            <img class="toplogo" src="novalogo.png" alt="" />
          </div>
          <div class="col-sm-1"></div>
        </div>
  
  
        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-6 title2">
            Client Information
            <hr  style= "color:#000; margin-top: -5px; "/>
          </div>
          <div class="col-sm-3">
           
        </div>
  
  
        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-3 title3">
            Client:
          </div>
          <div class="col-sm-3 title3">
            University of south carolina
          </div>
          <div class="col-sm-4">
           
        </div>
        <br/>
        <br/>
      </div>
  
  
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-3 title3">
          Report to:
        </div>
        <div class="col-sm-3 title3">
          Dr. Girish Yajnik <br/> ${data.name} Testing Services <br/>
          1233 Washington Street, <br/> 6th Fl
          Columbia, SC 29201
          
            </div>
        <div class="col-sm-4">
         
      </div>
  
  
  </div>
  </div>
  
      <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-6 title2">
            Sample Information
            <hr  style= "color:#000; margin-top: -5px; "/>
          </div>
          <div class="col-sm-3">
           
        </div>
  <div class="row">
  
      <div class="col-sm-6"></div>
      <div class="col-sm-6"></div>
  </div>
  </div>
        <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-3 title3">
            Donor Id:
          </div>
          <div class="col-sm-3 title3">
           #43534534
          </div>
          <div class="col-sm-4">
           
        </div>
       
      </div>
  
  
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-3 title3">
          Lab Id:
        </div>
        <div class="col-sm-3 title3">
         #5645645
          
            </div>
        <div class="col-sm-4">
         
      </div>
  
  
  </div>
  
  
  <div class="row">
    <div class="col-sm-2"></div>
    <div class="col-sm-3 title3">
      SSN:
    </div>
    <div class="col-sm-3 title3">
     #5645645
      
        </div>
    <div class="col-sm-4">
     
  </div>
  
  
  </div>
  
  
  <div class="row">
    <div class="col-sm-2"></div>
    <div class="col-sm-3 title3">
      Reson for test:
    </div>
    <div class="col-sm-3 title3">
     Not specified
      
        </div>
    <div class="col-sm-4">
     
  </div>
        
  
  
  <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-6 title2">
       Test Requested
        <hr  style= "color:#000; margin-top: -5px; "/>
      </div>
      <div class="col-sm-3">
       
    </div>
  <div class="row">
  
  <div class="col-sm-6"></div>
  <div class="col-sm-6"></div>
  </div>
  </div>
    <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-3 title3">
          20306SP 
      </div>
      <div class="col-sm-3 title3">
          Profile-ZTDT 6 (Alcohol)
      </div>
      <div class="col-sm-4">
       
    </div>
   
  </div>
  
   
  <!-- table start -->
  
  
  
  <div class="row">
  <div class="col-sm-2"></div>
  <div class="col-sm-8">
  
  
      <table class="table">
          <thead>
            <tr>
              
              <th scope="col">Test for</th>
              <th scope="col">Method</th>
              <th scope="col">Result</th>
              <th scope="col">Original</th>
              <th scope="col">Normalized</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              
              <td>TOXICOLOGY</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Alcohol - Ethyl </td>
              <td>Immunoassay </td>
              <td>NEGATIVE</td>
              
            </tr>
            <tr height:5px>
              
              <td>Amphetamines</td>
              <td>Immunoassay</td>
              <td>NONE DETECTED</td>
            </tr>
  
            <tr>
              
              <td>Amphetamines</td>
              <td>Immunoassay</td>
              <td>NONE DETECTED</td>
            </tr>
  
            <tr>
              
              <td>VALIDITY</td>
              <td></td>
              <td></td>
            </tr>
  
            <tr>
              
              <td>Amphetamines</td>
              <td>Immunoassay</td>
              <td> Immunoassay</td>
              <td> </td>
              <td> Immunoassay</td>
            </tr>
          </tbody>
        </table>
  
  
        <table class="table">
          <thead>
            <tr>
              
              <th scope="col">Certification</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              
              <td>Certified By: S. Mirzaev
              </td>
              <td></td>
              <td></td>
            </tr>
           
          </tbody>
        </table>
  
  </div>
  
  </div>
  
  <!-- tabl;e end -->
  <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-2">    <img class="logofooter" src="novalogo.png" alt=""></div>
      <div class="col-sm-2"></div>
      <div class="col-sm-2"></div>
      <div class="col-sm-4 footertext">
          515 Great Circle Road, Nashville, TN 37228 • Phone 615.255.2400 • Fax 615.255.3030
  Copyright © 2019 Aegis Sciences Corporation All Rights Reserved
  
      </div>
  </div>
  
  
   
  
      </div>
    </body>
  </html>
  `;
  const askPermission = () => {
    async function requestExternalWritePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Pdf creator needs External Storage Write Permission',
            message: 'Pdf creator needs access to Storage data in your SD Card',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          createPDF();
        } else {
          alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        alert('Write permission err', err);
        console.warn(err);
      }
    }
    if (Platform.OS === 'android') {
      requestExternalWritePermission();
    } else {
      createPDF();
    }
  };
  const createPDF = async () => {
    let options = {
      //Content to print
      html: htmlContent,
      //File Name
      fileName: 'my-test',
      //File directory
      directory: 'Download',

      base64: true,
    };

    let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    Alert.alert(
      'Successfully Exported',
      'Path:' + file.filePath,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Open', onPress: () => openFile(file.filePath)},
      ],
      {cancelable: true},
    );
  };

  const openFile = filepath => {
    const path = filepath; // absolute-path-to-my-local-file.
    FileViewer.open(path)
      .then(() => {
        // success
        console.log('hgfd');
      })
      .catch(error => {
        // error
      });
  };
  return (
    <SafeAreaView style={styles.MainContainer}>
      <TouchableOpacity onPress={askPermission}>
        <Image
          source={{
            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/pdf.png',
          }}
          style={styles.ImageStyle}
        />
        <Text style={styles.text}>Create PDF</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ExportPdf;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#123',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Poppins-Regular',
  },
  ImageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'center',
  },
});

const htmlStyles = `
*{
  border: 0;
  box-sizing: content-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  vertical-align: top;
}

h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }

/* table */

table { font-size: 75%; table-layout: fixed; width: 100%; }
table { border-collapse: separate; border-spacing: 2px; }
th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }
th, td { border-radius: 0.25em; border-style: solid; }
th { background: #EEE; border-color: #BBB; }
td { border-color: #DDD; }

/* page */

html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; }
html { background: #999; cursor: default; }

body { box-sizing: border-box;margin: 0 auto; overflow: hidden; padding: 0.25in; }
body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }

/* header */

header { margin: 0 0 3em; }
header:after { clear: both; content: ""; display: table; }

header h1 { background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }
header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
header address p { margin: 0 0 0.25em; }
header span, header img { display: block; float: right; }
header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
header img { max-height: 100%; max-width: 100%; }

/* article */

article, article address, table.meta, table.inventory { margin: 0 0 3em; }
article:after { clear: both; content: ""; display: table; }
article h1 { clip: rect(0 0 0 0); position: absolute; }

article address { float: left; font-size: 125%; font-weight: bold; }

/* table meta & balance */

table.meta, table.balance { float: right; width: 36%; }
table.meta:after, table.balance:after { clear: both; content: ""; display: table; }

/* table meta */

table.meta th { width: 40%; }
table.meta td { width: 60%; }

/* table items */

table.inventory { clear: both; width: 100%; }
table.inventory th { font-weight: bold; text-align: center; }

table.inventory td:nth-child(1) { width: 26%; }
table.inventory td:nth-child(2) { width: 38%; }
table.inventory td:nth-child(3) { text-align: right; width: 12%; }
table.inventory td:nth-child(4) { text-align: right; width: 12%; }
table.inventory td:nth-child(5) { text-align: right; width: 12%; }

/* table balance */

table.balance th, table.balance td { width: 50%; }
table.balance td { text-align: right; }

/* aside */

aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
aside h1 { border-color: #999; border-bottom-style: solid; }
`;
