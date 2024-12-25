import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Modify this component to accept props
export default function ImgMediaCard({ courseName, courseCode, courseCredits, image, onClick }) {
  return (
    <Card
      sx={{
        //width: 345, // Fixed card width
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        alt={courseName}
        image={image || "../public/file.svg"} // Default image if not provided
        sx={{
          width: '100%', // Full width of the card
          height: 200, // Fixed height for the image
          objectFit: 'cover', // Ensures the image fills the space without distortion
          backgroundColor: '#f5f5f5', // Optional: Adds a background color in case the image doesn't fill the space
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {courseName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Code: {courseCode} <br />
          Credits: {courseCredits}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View Details</Button>
      </CardActions>
    </Card>
  );
}
