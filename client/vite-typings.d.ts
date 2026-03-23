declare module 'vite' {
  export interface ResolveOptions {
    alias?:
      | Record<string, string>
      | Array<{ find: string; replacement: string }>;
  }

  export interface UserConfig {
    plugins?: Plugin[];
    resolve?: ResolveOptions;
    server?: Record<string, unknown>;
    build?: Record<string, unknown>;
    [key: string]: unknown;
  }

  export interface Plugin {
    name?: string;
    enforce?: 'pre' | 'post';
    apply?:
      | 'build'
      | 'serve'
      | ((ctx: { command: 'build' | 'serve' }) => boolean);
    [key: string]: unknown;
  }

  export function defineConfig<T extends UserConfig = UserConfig>(config: T): T;
}

declare module '@vitejs/plugin-react' {
  import type { Plugin } from 'vite';

  export interface ReactPluginOptions {
    jsxRuntime?: 'classic' | 'automatic';
    babel?: Record<string, unknown> | false;
    include?: RegExp | RegExp[];
    exclude?: RegExp | RegExp[];
  }

  const plugin: (options?: ReactPluginOptions) => Plugin;
  export default plugin;
}

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
