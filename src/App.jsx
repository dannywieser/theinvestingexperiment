import React from 'react';
import './index.css';
import { MyResponsiveLine } from './components';
// to try: https://codepen.io/ogre14t/pen/KmWjeo

const App = () => {
  const data = [
    {
      id: 'japan',
      color: 'hsl(183, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 91,
        },
        {
          x: 'helicopter',
          y: 7,
        },
        {
          x: 'boat',
          y: 88,
        },
        {
          x: 'train',
          y: 283,
        },
        {
          x: 'subway',
          y: 158,
        },
        {
          x: 'bus',
          y: 15,
        },
        {
          x: 'car',
          y: 165,
        },
        {
          x: 'moto',
          y: 69,
        },
        {
          x: 'bicycle',
          y: 95,
        },
        {
          x: 'horse',
          y: 273,
        },
        {
          x: 'skateboard',
          y: 54,
        },
        {
          x: 'others',
          y: 196,
        },
      ],
    },
    {
      id: 'france',
      color: 'hsl(132, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 254,
        },
        {
          x: 'helicopter',
          y: 8,
        },
        {
          x: 'boat',
          y: 136,
        },
        {
          x: 'train',
          y: 23,
        },
        {
          x: 'subway',
          y: 281,
        },
        {
          x: 'bus',
          y: 249,
        },
        {
          x: 'car',
          y: 37,
        },
        {
          x: 'moto',
          y: 217,
        },
        {
          x: 'bicycle',
          y: 217,
        },
        {
          x: 'horse',
          y: 44,
        },
        {
          x: 'skateboard',
          y: 276,
        },
        {
          x: 'others',
          y: 197,
        },
      ],
    },
    {
      id: 'us',
      color: 'hsl(283, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 40,
        },
        {
          x: 'helicopter',
          y: 34,
        },
        {
          x: 'boat',
          y: 236,
        },
        {
          x: 'train',
          y: 8,
        },
        {
          x: 'subway',
          y: 166,
        },
        {
          x: 'bus',
          y: 114,
        },
        {
          x: 'car',
          y: 199,
        },
        {
          x: 'moto',
          y: 245,
        },
        {
          x: 'bicycle',
          y: 246,
        },
        {
          x: 'horse',
          y: 9,
        },
        {
          x: 'skateboard',
          y: 96,
        },
        {
          x: 'others',
          y: 79,
        },
      ],
    },
    {
      id: 'germany',
      color: 'hsl(230, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 273,
        },
        {
          x: 'helicopter',
          y: 5,
        },
        {
          x: 'boat',
          y: 242,
        },
        {
          x: 'train',
          y: 109,
        },
        {
          x: 'subway',
          y: 80,
        },
        {
          x: 'bus',
          y: 134,
        },
        {
          x: 'car',
          y: 161,
        },
        {
          x: 'moto',
          y: 145,
        },
        {
          x: 'bicycle',
          y: 296,
        },
        {
          x: 'horse',
          y: 254,
        },
        {
          x: 'skateboard',
          y: 272,
        },
        {
          x: 'others',
          y: 211,
        },
      ],
    },
    {
      id: 'norway',
      color: 'hsl(105, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 113,
        },
        {
          x: 'helicopter',
          y: 228,
        },
        {
          x: 'boat',
          y: 122,
        },
        {
          x: 'train',
          y: 124,
        },
        {
          x: 'subway',
          y: 280,
        },
        {
          x: 'bus',
          y: 73,
        },
        {
          x: 'car',
          y: 192,
        },
        {
          x: 'moto',
          y: 258,
        },
        {
          x: 'bicycle',
          y: 181,
        },
        {
          x: 'horse',
          y: 245,
        },
        {
          x: 'skateboard',
          y: 128,
        },
        {
          x: 'others',
          y: 184,
        },
      ],
    },
  ];

  return (
    <div className="App">
      <div className="header">
        <h1>the investment experiment</h1>
      </div>
      <div className="chart">
        <MyResponsiveLine data={data} />
      </div>
    </div>
  );
};

export default App;
