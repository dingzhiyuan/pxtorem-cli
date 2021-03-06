#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var fs = require('fs');
var node_path=require('path');
var readJson = function(path){
    if(!fs.existsSync(path)){
        return false;
    }
    var t = fs.readFileSync(path);
    return eval('('+ t +')');
};
function cloneObj(oldObj) {
    if (typeof(oldObj) != 'object') return oldObj;
        if (oldObj == null) return oldObj;
            var newObj = new Object();
        for (var i in oldObj)
            newObj[i] = cloneObj(oldObj[i]);
    return newObj;
};
function extendObj() {
    var args = arguments;
    if (args.length < 2) return;
    var temp = cloneObj(args[0]);
    for (var n = 1; n < args.length; n++) {
        for (var i in args[n]) {
            temp[i] = args[n][i];
        }
    }
    return temp;
}
var defaults={
    propWhiteList:[],
    suffix:".processed"
};
program
    .version('1.1.0')
    .option('-i, --input [path]', 'relative path to the stylesheet to process')
    .option('-o, --output [path]', 'the destination to save')
    .option('-r, --rootvalue [rootvalue]', 'Rem root value e.g. 16 <optional> Default: 16')
    .parse(process.argv);

/**
 * Error Handling io
 */
var _configs=readJson("pxtorem.json");

var options={}
options=_configs?extendObj(defaults,_configs):defaults;

if(!program.input && program.output){
    console.log(chalk.red('Error: --input was missing an attribute. Use --help for additional info'));
    process.exit(1);
}

if(!program.output && program.input){
    console.log(chalk.red('Error: --output was missing an attribute. Use --help for additional info'));
    process.exit(1);
}

if(program.rootvalue && isNaN(program.rootvalue)){
    console.log(chalk.red('Error: --rootvalue must be a Number. Use --help for additional info'));
    process.exit(1);
}

if(program.rootvalue){
    options.rootValue = program.rootvalue;
}

/**
 * Execute pxtorem
 */

var __pxtorem=function(path,file,outPath){
    var cwd=process.cwd();
    var outPath=node_path.join(cwd,outPath);
    var postcss = require('postcss');
    var pxtorem = require('postcss-pxtorem');
    var processedCss="";
    try 
    {
        processedCss=postcss(pxtorem(options)).process(file).css;
    } 
    catch (e) 
    { 
        console.log(chalk.red("process file "+path+" encounters an error. "+e.message));
    } 

    if(processedCss){
        fs.writeFile(outPath, processedCss, function (err) {
            if (err) {
                throw err;
            }
            console.log(chalk.green(path+' pxtorem complete'));
        });
    }else{
        console.log(chalk.red(path+' noting to replace'));
    }
}

if(!program.output && !program.input){
    var path=process.cwd();
    fs.readdir(path, function (err, files) {
        if(err){
            return false;
        }
        if(!files||files.length==0){
            return;
        }

        files.forEach(function (e, i) {
            var paths=node_path.join(path,e);
            fs.stat(e, function (err, stat) {
                if(stat.isDirectory()){

                }else{
                    if(/.css/.test(e)){
                        var file = fs.readFileSync(paths, 'utf8'); 
                        console.log(chalk.gray(e+' start pxtorem'));
                        __pxtorem(paths,file,e.replace(/(.*)\.(.*)/,"$1"+options.suffix+".$2"));
                    }
                }
            });
            
        });

    });
}else{
    var file = fs.readFileSync(program.input, 'utf8');
    __pxtorem(program.input,file,program.output);
}
