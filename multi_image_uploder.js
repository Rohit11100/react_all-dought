// this is the tag that we call in our file

import Imageuploader from '../../../components/Imageuploader';
<Imageuploader index={4} values={formValue.buisnessInfo}  />










///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//this is multi image uploder page 


/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 23/11/2021 - 19:28:36
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 23/11/2021
    * - Author          : 
    * - Modification    : 
**/
import React, { useEffect, useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import api from "../services/api";
import swal from "sweetalert";
import { ErrorMessage } from "formik";
import Input from "../components/input";
import config from "../config";
const Imageuploader = ({
  values,
  index,
  listIndex,
  myList,
  setmyList,
  variantImg
}) => {
  const fileParams = ({ meta }) => {
    console.log("meta ", meta);
    return { url: `${config.api}image` };
  };
  const onFileChange = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };
  const onSubmit = (files, allFiles) => {
    files.forEach(async file => {
      const payload = new FormData();
      payload.append("file", file.file);
      const response = await api.post("/image", payload, {
        headers: {
          "Content-Type": "multipart/form-data "
        }
      });
      const imagedata = api.image(response.path).toString();
      if (index == 1) {
        values.product_SKU_images.push(api.image(response.path).toString());
        if (values.product_SKU_images != "") {
          swal({
            title: "success",
            text: "uploaded successfully",
            icon: "success"
          });
        }
      }
      if (index == 2) {
        // myList[listIndex].images.push(variantImg)
        myList[listIndex].images.push(api.image(response.path).toString());
        if (myList[listIndex].images != "") {
          swal({
            title: "success",
            text: "uploaded successfully",
            icon: "success"
          });
        }
        // values?.varients[listIndex]?.images.push(api.image(response.path).toString());
      }
      if (index == 4) {
        values?.logo_photo?.push(api.image(response.path).toString());
        
      }
      if (index == 3) {
        values?.banner_photo?.push(api.image(response.path).toString());
        
      }
      console.log(api.image(response.path).toString());
    });
  };
  const getFilesFromEvent = e => {
    return new Promise(resolve => {
      getDroppedOrSelectedFiles(e).then(chosenFiles => {
        resolve(chosenFiles.map(f => f.fileObject));
      });
    });
  };
  const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
    const textMsg = files.length > 0 ? "Upload More" : "Select Images";
    return (
      <>
        <label className="btn btn-danger mt-4">
          {textMsg}
          <input
            id="product_SKU_images"
            name="product_SKU_images"
            style={{ display: "none" }}
            type="file"
            accept={accept}
            multiple
            onChange={e => {
              getFilesFromEvent(e).then(chosenFiles => {
                onFiles(chosenFiles);
              });
            }}
          />
        </label>
        <small>Please press SUBMIT button after selecting images</small>
      </>
    );
  };
  <ErrorMessage
    name="product_SKU_images"
    component="div"
    className="text-danger"
  />;

  return (
    <>
      <Dropzone
        onSubmit={onSubmit}
        onChangeStatus={onFileChange}
        InputComponent={selectFileInput}
        getUploadParams={fileParams}
        getFilesFromEvent={getFilesFromEvent}
        accept="image/*"
        // maxFiles={5}

        inputContent="Drop A File"
        styles={{
          dropzone: { height: "auto" },
          dropzoneActive: { borderColor: "green" }
        }}
      />
    </>
  );
  // ,audio/*,video/*
};
export default Imageuploader;
