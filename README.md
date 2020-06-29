# Human-Computer Interaction Papers

Front-end application to give an interface to the articles published in the Brazilian Symposium on Human Factors in Computing Systems.

## Getting Started

### Prerequisites to develop
- Have [NPM](https://www.npmjs.com/get-npm) installed on your machine
- Have IHC Docker Service running on your machine. Check in [this repository](https://github.com/gabibguti/papers-ihc-service) how to do it.

### How to run development mode
1. Clone this repository
2. Open the folder in terminal
3. Check if `src/index.js` is using `DEV_LINK` to run development mode
4. Run `npm install`
5. Run `npm run dev`

The project should be up and running! \
The React App should start automatically at: `http://localhost:3000/papers-ihc-interface/#/` \
Check API at: `http://localhost:9100/graphql`
