import React,{useState} from 'react'
import GaugeChart from 'react-gauge-chart';
import { FiCalendar } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import { Modal, Button, Form } from 'react-bootstrap';



export default function TrackMeter() {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [newTargetAchieved, setNewTargetAchieved] = useState(0);
    const [targetAchieved, setTargetAchieved] = useState(12500);
    const [thisMonthTarget, setThisMonthTarget] = useState(20000);
    const calculateGaugeValue = (current, max) => {
        return current / max;
    };

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const day = ('0' + d.getDate()).slice(-2);
        const month = ('0' + (d.getMonth() + 1)).slice(-2);
        return `${day}-${month}`;
    };

  return (
    
    <div className="card mb-3">
                <div className="card-body">
                    <h5>Saving Goals</h5>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h6>Target Achieved</h6>
                            <GaugeChart
                                id="gauge-chart1"
                                nrOfLevels={1}
                                colors={['#00BFFF', '#1E90FF', '#4169E1']}
                                percent={calculateGaugeValue(targetAchieved, thisMonthTarget)}
                                arcWidth={0.3}
                                arcPadding={0.02}
                                textColor="#000000"
                            />
                            <p className="text-center">${targetAchieved.toLocaleString()}</p>
                            <Button variant="outline-primary" >
                                Adjust Goal
                            </Button>
                        </div>
                        <div className="date-picker-wrapper" style={{ marginTop: '30px' }}>
                            <FiCalendar className="calendar-icon" />
                            <DatePicker
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update) => {
                                    setDateRange(update);
                                }}
                                isClearable={false}
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Select Date Range"
                                customInput={
                                    <button className="date-picker-button">
                                        {startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : 'Select Date Range'}
                                    </button>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

  )
}
