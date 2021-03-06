import { css } from 'lit-element'

export const general = css`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  :host {
    display: block;
  }

  a:focus,
  button:focus,
  select:focus {
    outline: 2px solid var(--secondary-color);
    text-decoration: none;
    outline-offset: 5px;
  }

  a:visited {
    color: var(--blue-light-color);
  }

  p {
    margin-bottom: var(--s);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2rem 0 1rem;
    color: var(--title-color);
    font-family: var(--title-font), sans-serif;
    font-size: var(--title-text);
    font-weight: 900;
    line-height: 1.15;
  }

  h1 {
    margin-top: 0;
    font-size: 2.752rem;
  }

  h2 {
    font-size: 2.441rem;
  }

  h3 {
    font-size: 1.953rem;
  }

  h4 {
    font-size: 1.563rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }
`
