import { Compiler, WebpackPluginInstance } from 'webpack';

interface IOptions {
  enabled: boolean;
  extensions: Array<string> | RegExp;
  ignore: string | RegExp | string[] | RegExp[];
  remove: RegExp;
  stage: number;
  verbose: boolean;
}

declare namespace WebpackRemoveEmptyScriptsPlugin {
  export type Options = Partial<IOptions>;
}

declare class WebpackRemoveEmptyScriptsPlugin implements WebpackPluginInstance {
  [index: string]: any;

  public static STAGE_BEFORE_PROCESS_PLUGINS: number;
  public static STAGE_AFTER_PROCESS_PLUGINS: number;

  constructor(options?: WebpackRemoveEmptyScriptsPlugin.Options);

  apply(compiler: Compiler): void;
}

export = WebpackRemoveEmptyScriptsPlugin;
