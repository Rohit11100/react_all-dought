/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 23/11/2021 - 13:10:19
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 23/11/2021
    * - Author          : 
    * - Modification    : 
**/
import React, { useState ,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getDroppedOrSelectedFiles } from "html5-file-selector";




function App() {

   
  const [fileNames , setfileNames]=useState([]);
  const clk=()=>{


  }

 useEffect(() => {
  console.log(fileNames);
 }, [fileNames])
 
 
  return (
    <div className="App">
      <h1>hello world</h1>
 

      <input  
                                                      type='file'   
                                                      name='buisnessInfo.logo_photo'
                                                      placeholder='Logo'
                                                      accept="image/*"
                                                      multiple="multiple"
                                                  // onChange={(e)=>{
                                                 //   console.log('hiii')
                                                             // }}
                                            onChange={ e => {
                                              setfileNames([...fileNames,e.target.files[0].name]);
                                                     
                       
                                            //     try {
                                            // if (e.target.files[0]) {
                                            //         const payload = new FormData();
                                            //         payload.append("file", e.target.files[0]);
                                            //         const { path } = await api.post("/image", payload);
                                            //         console.log("Path ", api.image(path).toString());
                                            //         setfileNames(...fileNames ,api.image(path).toString());
                                            //         e.target.value = null;
                                            //                                          }
                                            //     } catch (e) {
                                            //     sweetError(e);
                                            //     console.log("error ", e)
                                            //     }
                                                    }}
                                                            ></input>
                                                {/* <div>
                                                
                                                    <ul>
                                                    {fileNames?.map(fileName => (
                                                    <li key={fileName}>{fileName}</li>
                                                                  ))}
                                                          </ul>
                                                        </div> */}
      <button onClick={clk}> click me </button>

    </div>
  );
}

export default App;
