import React from 'react';

export default function DateDifference({ date }: any) {
  const currentTime: Date = new Date(); // 예시 날짜 및 시간 1
  const date2: Date = new Date(date); // 예시 날짜 및 시간 2

  // 시간 차이 계산
  const timeDifference: number = currentTime.getTime() - date2.getTime(); // 밀리초 단위로 차이 계산

  // 단위별로 차이 계산
  const millisecondsPerSecond: number = 1000;
  const secondsPerMinute: number = 60;
  const minutesPerHour: number = 60;
  const hoursPerDay: number = 24;

  const secondsDifference: number = Math.floor(timeDifference / millisecondsPerSecond);
  const minutesDifference: number = Math.floor(secondsDifference / secondsPerMinute);
  const hoursDifference: number = Math.floor(minutesDifference / minutesPerHour);
  const daysDifference: number = Math.floor(hoursDifference / hoursPerDay);

  let displayDifference: string;

  if (daysDifference > 0) {
    displayDifference = `${daysDifference}일`;
  } else if (hoursDifference > 0) {
    displayDifference = `${hoursDifference}시간`;
  } else if (minutesDifference > 0) {
    displayDifference = `${minutesDifference}분`;
  } else if (secondsDifference > 0) {
    displayDifference = `${secondsDifference}초`;
  } else {
    displayDifference = '0초'; // 차이가 없는 경우
  }

  return <span>{displayDifference} 전</span>;
}
