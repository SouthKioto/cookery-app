import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface UserAccountButtonProps {
  onLogOut: () => void;
}

export const UserAccountButton: React.FC<UserAccountButtonProps> = ({ onLogOut }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('userToken');
    onLogOut();
    navigate('/');
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant='outline-success' id='dropdown-basic'>
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
        <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
        <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
        <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
