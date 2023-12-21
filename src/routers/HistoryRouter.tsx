import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

export const BrowserHistory = createBrowserHistory();

interface HistoryRouterProps {
    history: typeof BrowserHistory;
    children: React.ReactNode;
}

export const HistoryRouter = ({ history, children }: HistoryRouterProps) => {
    const [state, setState] = useState({
        // action: history.action,
        location: history.location,
    });

    useLayoutEffect(() => {
        history.listen(setState);
    }, [history]);
    const props = { children, navigator: history, ...state };
    return <Router {...props}></Router>;
};
