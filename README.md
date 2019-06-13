# The Urlist - Frontend
[![Build status](https://burkeknowswords.visualstudio.com/The%20Urlist/_apis/build/status/Frontend%20Build)](https://burkeknowswords.visualstudio.com/The%20Urlist/_build/latest?definitionId=7)

The frontend for this project was build with the following libraries and frameworks:
* [TypeScript](https://www.typescriptlang.org/)
* [Vue.js](https://github.com/vuejs/vue) / [Vue CLI](https://github.com/vuejs/vue-cli)
* [Vuelidate](https://github.com/vuelidate/vuelidate)
* [Axios](https://github.com/axios/axios)

Other useful tools
* [Visual Studio Code](https://code.visualstudio.com/?WT.mc_id=theurlist-github-buhollan)
* [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur&WT.mc_id=theurlist-github-buhollan)
* [VS Code Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome&WT.mc_id=theurlist-github-buhollan)
* [Vue VS Code Extension Pack](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-extensionpack&WT.mc_id=theurlist-github-buhollan)
* [Vue browser devtools](https://github.com/vuejs/vue-devtools)


## Build and run the frontend locally

### Install Vue CLI globally
```bash
npm install -g @vue/cli
```

### Install npm packages for frontend project
```bash
npm install
```

### Serve development build

```bash
npm run serve
```
![localhost serve](/docs/localhost_serve.png)

### Create production build

```bash
npm run build
```
*This creates a dist folder under frontend*

### Lints and fixes files

```bash
npm run lint
```
### Running locally vs running on Azure 
The code is optimised to be run in a local environment. If either the frontend or backend are run on Azure, there is one line of code that needs to be changed:
In \frontend\src\services\api.service.ts change line 19 from 

```bash
axios.defaults.withCredentials = false;
```
to

```bash
axios.defaults.withCredentials = true;
```
This should keep you out of CORS troubles
