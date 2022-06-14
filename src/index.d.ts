import { Compiler, WebpackPluginInstance } from 'webpack';

interface IOptions {
  enabled: boolean;
  extensions: Array<string> | RegExp,
  ignore: string | RegExp | string[] | RegExp[],
  remove: RegExp,
  verbose: boolean;
}

export type WebpackRemoveEmptyScriptsPluginOptions = Partial<IOptions>;

declare class WebpackRemoveEmptyScriptsPlugin implements WebpackPluginInstance {
  constructor(options: WebpackRemoveEmptyScriptsPluginOptions);
  apply(compiler: Compiler): void;
}

export default WebpackRemoveEmptyScriptsPlugin;
