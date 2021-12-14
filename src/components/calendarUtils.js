/** @format */

const newWeek = {
  id: null,
  weekNr: 0,
  days: [],
};

const newDay = {
  id: null,
  date: {},
  dayDateExtern: '',
  dayDateIntern: 0,
};

export function getAllDays() {
  var date = new Date(2021, 11, 1);
  var days = [];
  while (date.getMonth() === 11) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function attachDayEntry(day, calendarRW0100Data) {
  calendarRW0100Data[0].operation.container
    .find((container) => container._type === 'SCREEN')
    .grid.rows.row.forEach((row) => {
      console.log('row ', row._nr);
      row.item.forEach((item) => {
        console.log('item._id ', item._id + '  ' + item._value);

        if (item._id === 'MHSDAT' && item._value == day.dayDateIntern) {
          console.log('MATCH - MATCH');
          day.rows.push({ ...row });
        }
      });
    });
}

export function getCalendarDataWithEntries(calendarData, calendarRW0100Data) {
  calendarData.forEach((week) => {
    console.log('week ', week.weekNr);
    week.days.forEach((day) => {
      console.log('dayDateIntern ', day.dayDateIntern);

      day.entries = [];

      //attachDayEntry(day, calendarRW0100Data);

      let dayEntryCounter = 1;
      calendarRW0100Data[0].operation.container
        .find((container) => container._type === 'SCREEN')
        .grid.rows.row.forEach((row) => {
          console.log('row ', row._nr);

          let calEntry = newCalEntry;

          console.log('calEntry app ', calEntry.app);

          if (
            row.item.find(
              (item) =>
                item._id === 'MHSDAT' && item._value == day.dayDateIntern
            )
          ) {
            row.item.forEach((item) => {
              console.log('item._id ', item._id + '  ' + item._value);

              calEntry.id = dayEntryCounter;
              calEntry.app = row.item.find(
                (item) => item._id === 'MDAGP'
              )._value;
              calEntry.lvl = row.item.find(
                (item) => item._id === 'MDLVL'
              )._value;
              calEntry.rfp = row.item.find(
                (item) => item._id === 'MDRFP'
              )._value;
              calEntry.hsdat = row.item.find(
                (item) => item._id === 'MHSDAT'
              )._value;
              calEntry.hstim = row.item.find(
                (item) => item._id === 'MHSTIM'
              )._value;
              calEntry.hrdat = row.item.find(
                (item) => item._id === 'MHRDAT'
              )._value;
              calEntry.hrtim = row.item.find(
                (item) => item._id === 'MHRTIM'
              )._value;
              calEntry.hints = row.item.find(
                (item) => item._id === 'MHINTS'
              )._value;
            });
          }

          if (calEntry.id != null) {
            day.entries.push({ ...calEntry });
            calEntry.id = null;

            console.log('calEntry init ', calEntry.id);

            dayEntryCounter++;
          }
        });
      //   day.entries = entries;
    });
  });

  return calendarData;
}

export function getCalendarData() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  // mondays
  let curWorkDate = new Date();
  curWorkDate.setDate(1);

  while (curWorkDate.getDay() !== 1) {
    curWorkDate.setDate(curWorkDate.getDate() + 1);
  }

  // get all days of month
  let monthData = [];
  let dayCounter = 1;
  let dayWeekCounter = 1;
  let weekCounter = 1;
  const options = {
    Weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  // set the first week
  let curWeek = newWeek;
  let ONE_DAY_IN_MILLIS = 86400000;
  let firstDayOfYear = new Date(curWorkDate.getFullYear(), 0, 1);

  // if last monday in last month
  if (curWorkDate.getDay() < 8) {
    curWorkDate.setDate(curWorkDate.getDate() - 7);
    let tempDay = new Date(curWorkDate.getTime());

    //determine week number
    let pastDaysOfYear = (curWorkDate - firstDayOfYear) / ONE_DAY_IN_MILLIS;
    const weekNr = Math.floor(
      (pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7
    );
    //    const weekNr = Math.ceil(
    //    (pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7
    //);
    curWeek.id = weekCounter;
    weekCounter++;
    curWeek.weekNr = weekNr;

    const weekDay = newDay;
    weekDay.id = dayCounter;
    weekDay.date = { ...curWorkDate };
    dayCounter++;
    dayWeekCounter++;
    weekDay.dayDateExtern = tempDay.toLocaleDateString('en-US', options);

    const fullYear = tempDay.getFullYear();
    const month = tempDay.getMonth() + 1;
    const day = tempDay.getDate();
    const monthString = month < 10 ? '0' + month : month;
    const dayString = day < 10 ? '0' + day : day;
    weekDay.dayDateIntern = '' + fullYear + monthString + dayString;

    curWeek.days.push({ ...weekDay });
  }

  //monthData.push({ ...curWeek });

  let ok = true;
  while (ok) {
    curWorkDate.setDate(curWorkDate.getDate() + 1);
    let tempDay = new Date(curWorkDate.getTime());

    if (dayWeekCounter === 1) {
      //determine week number
      let pastDaysOfYear = (curWorkDate - firstDayOfYear) / ONE_DAY_IN_MILLIS;
      const weekNr = Math.floor(
        (pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7
      );

      curWeek.id = weekCounter;
      weekCounter++;
      curWeek.weekNr = weekNr;
    }

    const weekDay = newDay;
    weekDay.id = dayCounter;
    weekDay.date = { ...curWorkDate };
    dayCounter++;
    dayWeekCounter++;
    weekDay.dayDateExtern = tempDay.toLocaleDateString('en-US', options);

    const fullYear = tempDay.getFullYear();
    const month = tempDay.getMonth() + 1;
    const day = tempDay.getDate();
    const monthString = month < 10 ? '0' + month : month;
    const dayString = day < 10 ? '0' + day : day;
    weekDay.dayDateIntern = '' + fullYear + monthString + dayString;

    curWeek.days.push({ ...weekDay });

    if (dayWeekCounter === 8) {
      dayWeekCounter = 1;
      monthData.push({ ...curWeek });

      curWeek = newWeek;
      curWeek.days = [];
    }

    if (dayCounter >= daysInMonth) {
      if (curWorkDate.getDay() == 0) {
        ok = false;
      }
    }
  }

  console.log('monthData', JSON.stringify(monthData));
  return monthData;
}
