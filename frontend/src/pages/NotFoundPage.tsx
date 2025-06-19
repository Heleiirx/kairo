import {Link} from 'react-router-dom';


export default function NotFoundPage(){
  return (
     <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
      <Link to={"/"}>
        <button>Go back home</button>
      </Link>
    </div>
  );
}