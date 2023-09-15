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
  const { kakao } = window;
  const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체

  const mapRef = useRef<any>();
  const { location } = useGeoLocation(geolocationOptions);
  const { user } = useAuthContext();

  const [neighborhood, setNeiborhood] = useState('');

  function getNeighborhood(longitude, latitude) {
    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const address = result[0].address.region_3depth_name;
        setNeiborhood(address);
      }
    };
    geocoder.coord2Address(longitude, latitude, callback);
  }

  useEffect(() => {
    (async () => {
      getNeighborhood(location?.longitude, location?.latitude);
    })();
  }, [getNeighborhood, location?.latitude, location?.longitude]);

  async function handleSearch() {
    const map = mapRef.current;

    getNeighborhood(map.getCenter().getLng(), map.getCenter().getLat());
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
