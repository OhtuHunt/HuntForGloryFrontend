[![Build Status](https://travis-ci.org/OhtuHunt/HuntForGloryFrontend.svg?branch=master)](https://travis-ci.org/OhtuHunt/HuntForGloryFrontend)

# Frontend for [HuntForGlory](https://github.com/OhtuHunt/HuntForGlory)

### [Link to production](https://huntforglory.herokuapp.com/)

### [Product backlog](https://docs.google.com/spreadsheets/d/17PduZQHrmnuX6p_RP01JO7bq5TDrcI7-3gSi1h1wwI4/edit?ts=5a5c6da6#gid=0)

### [Drive-folder](https://drive.google.com/open?id=10lK1HtHSuotmiAjwj4vCeRSRPuYMGMyj)

### [Documentation](https://github.com/OhtuHunt/HuntForGlory/blob/development/Documentation)

### Technology

Frontend is implemented with ReactJS, while backend uses Node.js.

### Environment variables

Scripts in package.json contain scripts for running and buildint the application. These scripts contain few environment variables:

| Variable | Description |
| --------- | ----------- |
| REACT_APP_ENV | Environment for running/building |
| REACT_APP_BASE_URL | The URL for backend to connect to |
| REACT_APP_LOCAL | True if running local and connecting to localhost:3001 |

### Building

Run `npm run build` to generate optimized production build. Make sure to do this in the root, since copying the icons is configured so. Run `npm run buildDev` to make optimized development build. `npm run buildLocal` for optimized local build.
Running `npm run buildAll` creates a "builds" folder which contains build folders for production, development and local environments. 

### Running

- `npm start` to run the app connected to production backend.
- `npm run dev` to run the app connected to development backend.
- `npm run localDev` to run the app connected to https://localhost:3001.

### License
Copyright 2018 OhtuHunt

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
