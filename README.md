# Egladorcss

Egladorcss is a flexible, customizable, and low-level configurable CSS framework
for modern web projects. It enables you to quickly add CSS properties to your
projects with high performance and minimal output.

## Features

- **Flexible Configuration**: Customize classes, media queries, and much more
  with the `egladorcss.config.js` file.
- **Minimalist Approach**: Only the necessary CSS classes are generated,
  preventing clutter in the project.
- **Dynamic Watch Mode**: Automatically detects changes during development and
  updates the CSS file.
- **PostCSS Support**: Comes with PostCSS support for plugin compatibility.
- **Performance Optimization**: Prevents unnecessary class conflicts and ensures
  fast loading with custom structures.

## Installation

### Installation via NPM

Install Egladorcss in your project by running the following command:

```bash
npm install egladorcss
```

## Usage

### Getting Started

First, create a configuration file. This file will define how Egladorcss works and
which classes it will generate.

```bash
npx egladorcss init
```

This command will create a configuration file named `egladorcss.config.js` in the
root directory of your project.

### Generating CSS

Once your configuration file is ready, run the following command to generate the
CSS output:

```bash
npx egladorcss
```

This command will use the settings in your `egladorcss.config.js` file to generate
the necessary CSS file for your project.

### Watch Mode

To automatically watch your files during development:

```bash
npx egladorcss watch
```

Changes made in watch mode will immediately reflect in the CSS output.

## Configuration

You can customize your project in the `egladorcss.config.js` file. An example
configuration is shown below:

```javascript
export default {
  projects: [
    {
      name: "primary",
      contents: [
        "./dist/**/*.html",
        "./dist/**/*.js",
        "./dist/**/*.php",
        "./dist/**/*.tsx",
      ],
      cssreset: true,
      input: "./dist/css/input-primary.css",
      output: "./dist/css/output-primary.css",
    },
    {
      name: "secondary",
      contents: [
        "./dist/**/*.html",
      ],
      cssreset: true,
      input: "./dist/css/input-secondary.css",
      output: "./dist/css/output-secondary.css",
    },
  ],
};
```

### Supported Features

- **Colors and Themes**: Add project-specific colors and themes.
- **Media Queries**: Create custom media queries for responsive designs.
- **Pseudo-Classes and Pseudo-Elements**: Support for CSS pseudo-classes

## Contributing

Egladorcss is an open-source project. You can contribute by
suggesting new features or reporting issues on our GitHub page.

## License

This project is licensed under the [MIT License](LICENSE).
