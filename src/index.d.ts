import { Compiler, WebpackPluginInstance } from 'webpack';

interface IOptions {
  enabled: boolean;
  extensions: Array<string> | RegExp,
  ignore: string | RegExp | string[] | RegExp[],
  remove: RegExp,
  stage: number,
  verbose: boolean;
}

export type WebpackRemoveEmptyScriptsPluginOptions = Partial<IOptions>;

declare class WebpackRemoveEmptyScriptsPlugin implements WebpackPluginInstance {
  [index: string]: any;

  public static STAGE_BEFORE_PROCESS_PLUGINS: number;
  public static STAGE_AFTER_PROCESS_PLUGINS: number;

  constructor(options: WebpackRemoveEmptyScriptsPluginOptions);

  apply(compiler: Compiler): void;
}

export default WebpackRemoveEmptyScriptsPlugin;
