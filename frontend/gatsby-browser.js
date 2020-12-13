/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import './src/assets/scss/main.scss';
import wrapWithProvider from './src/redux/wrap-with-provider'
export const wrapRootElement = wrapWithProvider;
