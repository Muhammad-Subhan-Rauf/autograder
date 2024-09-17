import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarTable from './CalendarTable';

const Calendar = () => {

    return (
        <div className="p-8 bg-white rounded-lg shadow-lg max-w-[70%] w-full border border-blue-500 mt-10 md:mt-20">
            <CalendarHeader />
            <CalendarTable />
        </div>
    );
};

export default Calendar;
