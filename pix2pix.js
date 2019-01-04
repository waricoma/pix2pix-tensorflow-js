'use strict';

const tf = require('@tensorflow/tfjs');
const nj = require('numjs');
const argparse = require('argparse').ArgumentParser;
const os = require('os');
const glob = require('glob');
const { NamedTuple } = require('pycollections');

const parser = new argparse({
  version: '0.0.1',
  addHelp: true,
  description: 'Argparse example',
  argumentDefault: {flip: true}
});
/*
parser.addArgument('--input_dir', {help: 'path to folder containing images'});
parser.addArgument('--mode', {required: true, choices: ['train', 'test', 'export']});
parser.addArgument('--output_dir', {required: true, help: 'where to put output files'});
parser.addArgument('--seed', {type: 'int'});
parser.addArgument('--checkpoint',{defaultValue: null, help: 'directory with checkpoint to resume training from or use for testing'});

parser.addArgument('--max_steps', {type: 'int', help: 'number of training steps (0 to disable)'});
parser.addArgument('--max_epochs', {type: 'int', help: 'number of training epochs'});
parser.addArgument('--summary_freq', {type: 'int', defaultValue: 100, help: 'update summaries every summary_freq steps'});
parser.addArgument('--progress_freq', {type: 'int', defaultValue: 50, help: 'display progress every progress_freq steps'});
parser.addArgument('--trace_freq', {type: 'int', defaultValue: 0, help: 'trace execution every trace_freq steps'});
parser.addArgument('--display_freq', {type: 'int', defaultValue: 0, help: 'write current training images every display_freq steps'});
parser.addArgument('--save_freq', {type: 'int', defaultValue: 5000, help: 'save model every save_freq steps, 0 to disable'});

parser.addArgument('--separable_conv', {action: 'storeTrue', help: 'use separable convolutions in the generator'});
parser.addArgument('--aspect_ratio', {type: 'float', defaultValue: 1.0, help: 'aspect ratio of output images (width/height)'});
parser.addArgument('--lab_colorization', {action: 'storeTrue', help: 'split input image into brightness (A) and color (B)'});
parser.addArgument('--batch_size', {type: 'int', defaultValue: 1, help: 'number of images in batch'});
parser.addArgument('--which_direction', {type: 'string', defaultValue: 'AtoB', choices: ['AtoB', 'BtoA']});
parser.addArgument('--ngf', {type: 'int', defaultValue: 64, help: 'number of generator filters in first conv layer'});
parser.addArgument('--ndf', {type: 'int', defaultValue: 64, help: 'number of discriminator filters in first conv layer'});
parser.addArgument('--scale_size', {type: 'int', defaultValue: 286, help: 'scale images to this size before cropping to 256x256'});
parser.addArgument('--flip', {dest: 'flip', action: 'storeTrue', help: 'flip images horizontally'});
parser.addArgument('--no_flip', {dest: 'flip', action: 'storeFalse', help: "don't flip images horizontally"});
parser.addArgument('--lr', {type: 'float', defaultValue: 0.0002, help: 'initial learning rate for adam'});
parser.addArgument('--beta1', {type: 'float', defaultValue: 0.5, help: 'momentum term of adam'});
parser.addArgument('--l1_weight', {type: 'float', defaultValue: 100.0, help: 'weight on L1 term for generator gradient'});
parser.addArgument('--gan_weight', {type: 'float', defaultValue: 1.0, help: 'weight on GAN term for generator gradient'});
*/

/**
 * export options
 */
// parser.addArgument('--output_filetype', {defaultValue: 'png'});
// const args = parser.parseArgs();

const EPS = 1e-12;
const CROP_SIZE = 256;

const Examples = NamedTuple('Examples', ['paths', 'inputs', 'targets', 'count', 'steps_per_epoch']);
const Model = NamedTuple('Model', ['outputs', 'predict_real', 'predict_fake', 'discrim_loss', 'discrim_grads_and_vars', 'gen_loss_GAN', 'gen_loss_L1', 'gen_grads_and_vars', 'train']);


const preprocess = image => {
  for (let key of Object.keys(tf)) {
    if (!/space/i.test(key)) continue;
    console.log(key);
  }
  return image * 2 - 1;
};

preprocess(1);
