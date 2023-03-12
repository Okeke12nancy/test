import express from "express";

import upload from "../utils/multer.utils";

import Cloudinary from "../utils/cloudinary.utils";

import fs from "fs";

import bodyParser from "body-parser";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

export const uploadFiles = async (req, res) => {
  upload.array("file");
  const upload = async (path) => await Cloudinary.uploads(path, "files");

  const urls = [];
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);

    fs.unlinkSync(path);
  }
  try {
    return handleResponse(201, "image created successfully", { data: urls });
  } catch (e) {
    console.log(e);
    logger.error(e);
    return handleResponse(500, e, null, res);
  }
};
