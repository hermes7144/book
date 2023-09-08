import { Map } from 'react-kakao-maps-sdk';
import { useGeoLocation } from '../hooks/useGeoLocation';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Button from '../components/ui/Button';
import { setNeighborhood } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

export default function Neighborhood() {
  const mapRef = useRef<any>();
  const { location, error } = useGeoLocation(geolocationOptions);
  const { user } = useAuthContext();

  const [neighborhood, setNeiborhood] = useState('');

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/APIAddress?service=address&request=getAddress&version=2.0&crs=epsg:4326&point=${location?.longitude},${location?.latitude}&format=json&type=both&zipcode=true&simple=false&key=12585315-29A2-3983-81D4-BAD9AAA9D5A4`);
      if (res.data.response.result) {
        const address = res.data.response.result[0].text.split(' ')[2];
        setNeiborhood(address);
      }
    })();
  }, [location]);

  async function handleSearch() {
    const map = mapRef.current;

    const res = await axios.get(`/APIAddress?service=address&request=getAddress&version=2.0&crs=epsg:4326&point=${map.getCenter().getLng()},${map.getCenter().getLat()}&format=json&type=both&zipcode=true&simple=false&key=12585315-29A2-3983-81D4-BAD9AAA9D5A4`);
    if (res.data.response.result) {
      const address = res.data.response.result[0].text.split(' ')[2];
      setNeiborhood(address);
    }
  }

  async function handleSubmit() {
    setNeighborhood(user.uid, neighborhood);
  }

  return (
    <>
      <Map
        center={{
          lat: location?.latitude ? location.latitude : 33,
          lng: location?.longitude ? location.longitude : 33,
        }}
        style={{
          // 지도의 크기
          width: '100%',
          height: '450px',
        }}
        level={3}
        ref={mapRef}
      />
      {neighborhood}
      <Button text={'동네 찾기'} onClick={handleSearch} />
      <Button text={'동네 저장하기'} onClick={handleSubmit} />
    </>
  );
}
