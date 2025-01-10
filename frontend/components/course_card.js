/*import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export default function ImgMediaCard({ courseName, courseCode, courseCredits, image, onClick }) {
  const [imgSrc, setImgSrc] = useState(image || "/course_helper_sticker.png");

  const handleImageError = () => {
    setImgSrc("/course_helper_sticker.png"); // Fallback image
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        alt={courseName}
        image={imgSrc} // Use imgSrc state instead of image directly
        onError={handleImageError} // Update imgSrc on error
        sx={{
          width: '100%',
          height: 200,
          objectFit: 'cover',
          backgroundColor: '#f5f5f5',
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
}*/

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';

export default function ImgMediaCard({ courseName, courseCode, courseCredits, image, onClick }) {
  // State for the current image source
  const [imgSrc, setImgSrc] = useState(image ? `${image}?timestamp=${Date.now()}` : "/course_helper_sticker.png");

  // Effect to update image dynamically if the `image` prop changes
  useEffect(() => {
    if (image) {
      setImgSrc(`${image}?timestamp=${Date.now()}`); // Force the browser to fetch the latest image
    }
  }, [image]);

  const handleImageError = () => {
    setImgSrc("/course_helper_sticker.png"); // Fallback image if there's an error loading the provided URL
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        alt={courseName}
        image={imgSrc} // Use imgSrc state
        onError={handleImageError} // Handle image loading errors
        sx={{
          width: '100%',
          height: 200,
          objectFit: 'cover',
          backgroundColor: '#f5f5f5',
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

