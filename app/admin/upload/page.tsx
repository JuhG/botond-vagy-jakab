"use client";

import "@uploadthing/react/styles.css";

import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useState } from "react";
import { saveTask } from "@/app/admin/upload/actions";

const Admin = () => {
  const [file, setFile] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <UploadDropzone<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            setFile(res[0].fileUrl);
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      <form className="flex flex-col gap-2" action={saveTask}>
        <label className="flex items-center gap-2">
          <span>Image url: </span>
          <input className="rounded bg-gray-500 p-1" required name="image" value={file} />
        </label>
        <div className="flex gap-2">
          <label className="flex gap-1">
            <span>Botond</span>
            <input required type="radio" name="child" value="botond" />
          </label>
          <label className="flex gap-1">
            <span>Jakab</span>
            <input required type="radio" name="child" value="jakab" />
          </label>
        </div>
        <button>GO</button>
      </form>
    </main>
  );
};

export default Admin;
