import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
<<<<<<< HEAD
      <p>Desculpe, ocorreu um erro inesperado.</p>
=======
      <p>Sorry, an unexpected error has occurred.</p>
>>>>>>> 73b51b75993fe8f92fd706fe2b58ffca7a49f05a
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}