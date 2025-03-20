import * as React from "react";

export function TypographyH1({ children }) {
  return <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{children}</h1>;
}

export function TypographyH2({ children }) {
  return <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">{children}</h2>;
}

export function TypographyH3({ children }) {
  return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{children}</h3>;
}

export function TypographyH4({ children }) {
  return <h4 className="scroll-m-20 text-lg font-medium tracking-tight">{children}</h4>;
}

export function TypographyP({ children }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}

export function TypographyBlockquote({ children }) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">
      {children}
    </blockquote>
  );
}

export function TypographyList({ children }) {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>;
}