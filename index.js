import path, { resolve } from 'path';
import express, { response } from 'express';
import mysql from "mysql";
import session from "express-session";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mv from 'mv';
import formidable from 'formidable';
import csv from 'fast-csv';
import { request } from 'http';

const app = express();

app.set('view engine', 'ejs');