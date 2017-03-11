
// https://www.npmjs.com/package/node-sass

module.exports = {

  /**
   * outputFilename: The filename of the saved CSS file
   * from the sass build. The directory which it is saved in
   * is set within the "buildDir" config options.
   */
  outputFilename: process.env.IONIC_OUTPUT_CSS_FILE_NAME,

  /**
   * sourceMap: If source map should be built or not.
   */
  sourceMap: false,

  /**
   * outputStyle: How node-sass should output the css file.
   */
  outputStyle: 'expanded',

  /**
   * autoprefixer: The config options for autoprefixer.
   * Excluding this config will skip applying autoprefixer.
   * https://www.npmjs.com/package/autoprefixer
   */
 

  /**
   * includePaths: Used by node-sass for additional
   * paths to search for sass imports by just name.
   */
  includePaths: [
    'node_modules/ionic-angular/themes',
    'node_modules/ionicons/dist/scss',
    'node_modules/ionic-angular/fonts',
    'node_modules/ionic2-custom-icons/directive/scss/',
    '.tmp-custom-icons/scss/'
  ],

  /**
   * includeFiles: An array of regex patterns to search for
   * sass files in the same directory as the component module.
   * If a file matches both include and exclude patterns, then
   * the file will be excluded.
   */


  /**
   * excludeFiles: An array of regex patterns for files which
   * should be excluded. If a file matches both include and exclude
   * patterns, then the file will be excluded.
   */

  /**
   * variableSassFiles: Lists out the files which include
   * only sass variables. These variables are the first sass files
   * to be imported so their values override default variables.
   */
  variableSassFiles: 
 [
      '{{SRC}}/theme/variables.scss',
      '.tmp-custom-icons/scss/variables.scss'
   ]


};
