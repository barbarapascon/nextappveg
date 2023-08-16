import styled from 'styled-components';

export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  color: white; // Changed from lilac to white for better contrast on lilac background
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const Icon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

export const LikeIcon = styled(Icon)`
  background-image: url('/gostar.png'); 

`;

export const UnlikeIcon = styled(Icon)`
  background-image: url('/nao-gosto.png');
`;

export const AddIcon =  styled(Icon)`
background-image: url('/add.png'); 
color:white;
`;


export const AppIcon = styled.div`
  width: 40px; 
  height: 40px;
  background-image: url('/vegetarian.png');
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 1rem; // To provide some space between the icon and the text
`;


// Additional styles for Home.tsx
export const Container = styled.div`
background-image: url('/timeline-backgroud.jpg');
background-attachment: fixed;
  background-color: #C8A2C8;
  min-height: 100vh;
  padding: 5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
`;

export const WelcomeMessage = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif; 
  
  span {
    color: white;
    font-weight: bold;
  }
`;

export const Title = styled.h2`
font-family: 'Poppins', sans-serif; 
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const Subtitle = styled.h3`
  font-size: 1.2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  border-bottom: 1px  white;
  padding-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif; 
`;

export const ToggleButton = styled(Button)`
  position: fixed;
  right: 30px;
  width: 60px;  
  height: 60px; 
  background-color: #C8A2C8;
  color: white; 
  border: 2px solid white; 
  border-radius: 50%;  // makes the button perfectly circular
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);  // This adds a shadow behind the button
  margin-bottom: 20px;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.3s, opacity 0.3s;  // Added transition for box-shadow and opacity
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #C8A2C9;
    color: white;
    opacity: 1;  // This makes the button fully opaque on hover
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);  // This intensifies the shadow on hover
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;  // This will keep the header fixed
  top: 0;  // Ensuring it's at the top
  left: 0;
  width: 100%;  // This ensures the header spans the full viewport width
  padding: 1rem 2rem;
  background-color: #C8A2C8;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  font-family: 'Poppins', sans-serif;
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: white;
    color: #C8A2C8;
  }
`;

// Remember to adjust these styles as per your preferences.
