import { Navigate } from 'react-router-dom';

function GuestRoute({ lastVisitedPage, element: Component, isLoggedIn, ...props }) {
  if (isLoggedIn) {
    return <Navigate to='/movies' />
  }
  return <Component {...props} />
}
export default GuestRoute; 