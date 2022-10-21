import {QueryClient, QueryClientProvider} from 'react-query';
import MyRoutes from './routes';
import {UserProvider} from '@/contexts/UserContext';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <MyRoutes />
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
