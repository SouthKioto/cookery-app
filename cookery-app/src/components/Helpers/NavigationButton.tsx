import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface NavigationButtonProps {
  path: string;
  variant: string;
  buttonValue: string;
  onLogin: () => void;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({ path, variant, buttonValue, onLogin }) => {
  const navigate = useNavigate();

  const handleNavigateToPath = () => {
    navigate(path);
    onLogin();
  };

  return (
    <Button onClick={handleNavigateToPath} variant={variant}>
      {buttonValue}
    </Button>
  );
};
