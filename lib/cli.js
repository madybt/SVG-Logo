const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Triangle, Square } = require('./shapes');

class CLI {
  async promptUser() {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for the logo text:',
        validate: input => input.length <= 3 || 'Please enter up to three characters.',
      },
      {
        type: 'input',
        name: 'textColor',
        message: 'Enter a color keyword or hexadecimal for the text color:',
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape for the logo:',
        choices: ['circle', 'triangle', 'square'],
      },
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter a color keyword or hexadecimal for the shape color:',
      }
    ]);
  }

  generateSVG({ text, textColor, shape, shapeColor }) {
    let shapeInstance;
    switch (shape) {
      case 'circle':
        shapeInstance = new Circle(shapeColor);
        break;
      case 'triangle':
        shapeInstance = new Triangle(shapeColor);
        break;
      case 'square':
        shapeInstance = new Square(shapeColor);
        break;
    }

    return `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        ${shapeInstance.render()}
        <text x="150" y="125" font-size="40" text-anchor="middle" fill="${textColor}">${text}</text>
      </svg>
    `;
  }

  saveSVG(content) {
    fs.writeFile('examples/logo.svg', content, (err) => {
      if (err) throw err;
      console.log('Generated logo.svg in examples/ folder');
    });
  }

  async run() {
    try {
      const answers = await this.promptUser();
      const svgContent = this.generateSVG(answers);
      this.saveSVG(svgContent);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
}

module.exports = CLI;
