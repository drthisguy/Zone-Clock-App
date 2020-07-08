import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export function DatePicker({ dst }) {

    const modifiers = {
        highlighted: dst,
      };

    return (
        <div>
            <style>{birthdayStyle}</style>
            <DayPicker modifiers={modifiers} month={new Date(dst.getFullYear(), dst.getMonth())} />
        </div>
    )
}

const birthdayStyle = `.DayPicker-Day--highlighted {
    background-color: #fcaf17;
    color: white;
  }`;