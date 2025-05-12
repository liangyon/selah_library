import fs from "fs/promises";
import path from "path";
import process from "process";
import { google } from "googleapis";


const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const { authenticate } = require('@google-cloud/local-auth');

/**
 * Reads previously authorized credentials from the saved file.
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content.toString());
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Saves credentials after user authentication.
 */
async function saveCredentials(client:any) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content.toString());
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Handles authentication.
 */
export async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client?.credentials) {
    await saveCredentials(client);
  }
  return client;
}
