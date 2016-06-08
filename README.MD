# Pxtorem CLI

A command line wrapper for the excellent [pxtorem module](https://www.npmjs.com/package/pxtorem).


## Install

`npm install --g pxtorem-cli`

## Usage

Pxtorem CLI takes 3 arguments:

|Argument|Alias|Default|Description|
|---|---|---|---|
|`--input`|`-i`|`n/a`|Relative path to the stylesheet to process|
|`--output`|`-o`|`n/a`|Relative path to save the processed stylesheet|
|`--rootvalue`|`-r`|`16px`|Default font size for conversion e.g 16px == 1rem|

## Example
`cd you style folder`
`pxtorem -i style.css -o style.processed.css -r 16px`

if you give input arg, you have to give output arg


## without arguments

`cd you style folder`
`pxtorem`

it will convert all style files in you style floder

warining it will use the default options, and it will cover the file.

## default options

as [pxtorem module](https://www.npmjs.com/package/pxtorem)

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