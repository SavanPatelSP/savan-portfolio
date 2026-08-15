import type * as React from "react";

/**
 * TypeScript support for the <hyvor-talk-comments> Web Component used by
 * the Hyvor Talk embed. The element is registered at runtime by
 * https://talk.hyvor.com/embed/embed.js — this declaration only makes the
 * JSX usage type-safe. See https://talk.hyvor.com/docs/comments.
 */
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "hyvor-talk-comments": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "website-id"?: string;
        "page-id"?: string;
        "page-url"?: string;
        "page-title"?: string;
        /** Color theme palette: "light" | "dark" | "os". See https://talk.hyvor.com/docs/styles */
        colors?: "light" | "dark" | "os";
      };
    }
  }
}
