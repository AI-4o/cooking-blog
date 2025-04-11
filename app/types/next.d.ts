// Override Next.js PageProps type to make params a Promise
import 'next';

declare module 'next' {
  export interface PageProps {
    params: Promise<Record<string, string>>;
    searchParams?: Record<string, string | string[] | undefined>;
  }
}

// Make our Params type satisfy PageProps
export interface RecipeParams {
  slug: string;
  then: any;
  catch: any;
  finally: any;
  [Symbol.toStringTag]: string;
} 