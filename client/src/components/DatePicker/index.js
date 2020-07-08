import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export function DatePicker({ dst }) {

    const modifiers = {
        highlighted: new Date('2020, 7, 19'),
      };

    return (
        <div>
            <style>{birthdayStyle}</style>
            <DayPicker modifiers={modifiers} month={new Date(2020, 7)} />
        </div>
    )
}

const birthdayStyle = `.DayPicker-Day--highlighted {
    background-color: orange;
    color: white;
  }`;