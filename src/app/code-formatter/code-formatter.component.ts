import { Component } from '@angular/core';
import * as beautify from 'js-beautify';

@Component({
  selector: 'app-code-formatter',
  templateUrl: './code-formatter.component.html',
  styleUrls: ['./code-formatter.component.scss']
})
export class CodeFormatterComponent {

  codeInput!: any;
  beautify!: any;
  language = ''

  /**
   * formate document
   *
   * @memberof CodeFormatterComponent
   */
  formateCode() {
    try {
      const code = this.codeInput.trim();
      let formattedCode = '';
      if (code.startsWith('<') && code.endsWith('>')) {
        this.language = 'html';
        formattedCode = beautify.html(code, {
          indent_size: 2,
          wrap_line_length: 80
        });
      } else if (code.startsWith('/*') && code.endsWith('*/')) {
        this.language = 'css';
        formattedCode = beautify.css(code, {
          indent_size: 2
        });
      } else if (code.startsWith('{') && code.endsWith('}')) {
        this.language = 'json';
        formattedCode = beautify.js(code, {
          indent_size: 2,
          space_in_empty_paren: true,
          unescape_strings: true
        });
      } else {
        this.language = 'js';
        formattedCode = beautify.js(code, {
          indent_size: 2,
          space_in_empty_paren: true
        });
      }
      this.codeInput = formattedCode;
    } catch (error) {
      alert('Error formatting code. Please check your syntax.');
    }
  }
}
