export function getDaysInMonth(month,year){
  const daysInMonth = new Date(year,month+1,0).getDate();
  const firstDay = new Date(year,month,1).getDay();

  const days = [];
  for(let i=0;i<firstDay; i++){
    days.push(null);
  }

  for(let day=1;day<=daysInMonth;day++){
    days.push(day);
  }
  return days;
}