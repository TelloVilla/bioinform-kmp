## Setup

1. Install NodeJS with NPM (Optional: install Yarn as well)
   
2. Git clone the repository
   ```shell
   git clone https://github.com/TelloVilla/bioinform-kmp.git
   ```
3. NPM or Yarn Install in project directory
   ```shell
   npm install
   #or
   yarn install
   ```
4. NPM or Yarn develop to launch into development mode
   ```shell
   npm develop
   #or
   yarn develop
   ```
5. NPM or Yarn build to create optimized build for deployment
    ```shell
    npm build
    #or
    yarn build
    ```
## Use
1. Input desired String and Pattern to search by
2. Steps to create the LPS array will be outputted
3. Steps to perform the KMP search will be outputted

## Known Issues
- Ghost input, Refreshing the page with values inputted will still show the values but they will not be passed to the function
- Values must be reentered upon a refresh to fix the issue  

## Reference
- based on the Pseudocode from this [article](https://www.baeldung.com/cs/knuth-morris-pratt)

### Made with
- [Gatsby](https://www.gatsbyjs.com/)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap](https://getbootstrap.com/)