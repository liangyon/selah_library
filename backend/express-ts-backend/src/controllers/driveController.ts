import { Request, Response } from "express";
import { google } from "googleapis";
import { authorize } from "../config/googleAuth";

/**
 * Lists up to 10 files from Google Drive.
 */
export async function listFiles(authClient: any) {
  const folderId = "1jDYKsgOWu-PVdd5adlpIDLhyQBppltSv";
  const drive = google.drive({ version: 'v3', auth: authClient });
  const res = await drive.files.list({
    q: `'${folderId}' in parents`, 
    pageSize: 20,
    fields: 'nextPageToken, files(id, name)',
  });
  const files = res.data.files;
  if (files?.length === 0) {
    console.log('No files found.');
    return;
  }

  console.log('Files:');
  files?.map((file: any) => {
    console.log(`${file.name} (${file.id})`);
  });
}
