# Pxtorem CLI

A command line wrapper for the excellent [postcss-pxtorem module](https://www.npmjs.com/package/postcss-pxtorem).


## Install

`npm install --g pxtorem-cli`

## Usage

Pxtorem CLI takes 3 arguments:

|Argument|Alias|Default|Description|
|---|---|---|---|
|`--input`|`-i`|`n/a`|Relative path to the stylesheet to process|
|`--output`|`-o`|`n/a`|Relative path to save the processed stylesheet|
|`--rootvalue`|`-r`|`16`|Default font size for conversion e.g 16px == 1rem|

## Example
cd you style folder

`pxtorem -i style.css -o style.processed.css -r 16`

if you give input arg, you have to give output arg


## without arguments

cd you style folder

`pxtorem`

it will process all style files in you style floder

warining it will use the default options, and it will use .processed as the filename suffix

## default options

as [pxtorem module](https://www.npmjs.com/package/postcss-pxtorem)

`{
    "rootValue": 16,
    "unitPrecision": 5,
    "propWhiteList": [],
    "selectorBlackList": [],
    "replace": true,
    "mediaQuery": false,
    "minPixelValue": 0
}`

but you can create a "pxtorem.json" file in the cwd folder to rewrite the options

## v1.1.2

check for css syntax errors

Add exception handling method


## v1.0.6 Bug fix 

give a value to argument "r" in command line, it dose not work.

