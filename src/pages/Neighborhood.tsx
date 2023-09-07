import React, { useState, useEffect } from 'react';

export default function Neighborhood() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
        (error) => {}
      );
    } else {
    }
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행
  return <>{position.longitude}</>;
}
