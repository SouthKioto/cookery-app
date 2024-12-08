import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface NavigationButtonProps {
  path: string;
  variant: string;
  buttonValue: string;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({ path, variant, buttonValue }) => {
  const navigate = useNavigate();

  const handleNavigateToPath = () => {
    navigate(path);
  };

  return (
    <Button onClick={handleNavigateToPath} variant={variant}>
      {buttonValue}
    </Button>
  );
};
