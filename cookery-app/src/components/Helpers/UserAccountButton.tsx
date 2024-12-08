import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { GetUserIdFromToken } from './Utils';

interface UserAccountButtonProps {
  name: string;
  value: string[];
  onLogOut: () => void;
}

export const UserAccountButton: React.FC<UserAccountButtonProps> = ({ name, value, onLogOut }) => {
  const navigate = useNavigate();
  const userId = GetUserIdFromToken();
  const handleLogOut = () => {
    localStorage.removeItem('userToken');
    onLogOut();
    navigate('/');
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant='outline-success' id='dropdown-basic'>
        {name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to={`/users/userPage/${userId}`}>
          {value[0]}
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogOut}>{value[1]}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
