import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    Link, useRouteError,
    isRouteErrorResponse,
} from '@remix-run/react';
import MainNavigation from "./components/MainNavigation.jsx";
import styles from './styles/main.css?url'

export const links = ()=>{
  return [{rel:'stylesheet', href: styles}]
}

export function Layout({children}){
  return (
      <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <Meta/>
        <Links/>
      </head>
      <body>
      <header>
        <MainNavigation/>
      </header>
      {children}
      <ScrollRestoration/>
      <Scripts/>
      </body>
      </html>
  )
}

export default function App() {
  return <Outlet/>;
}

export function ErrorBoundary(){
    const caughtError = useRouteError();

    if (isRouteErrorResponse(caughtError)){
        return (
            <div>
                <p>{caughtError.statusText}</p>
            </div>
        )
    }

    return (
        <main className="error">
            <h1>An error occurred!</h1>
            <p>{caughtError}</p>
            <p>Back to <Link to="/">Back to safety</Link></p>
        </main>
    )
}
