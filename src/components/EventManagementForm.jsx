import { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import 'react-datepicker/dist/react-datepicker.css';

function EventManagementForm() {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [location, setLocation] = useState('');
    const [requiredSkills, setRequiredSkills] = useState('');
    const [urgency, setUrgency] = useState('');
    const [eventDate, setEventDate] = useState(null);

    // skills (multi-select dropdown)
    const skillsOptions = [
        { value: 'leadership', label: 'Leadership' },
        { value: 'teamwork', label: 'Teamwork' },
        { value: 'flexible schedule', label: 'Flexible Schedule' },
        { value: 'problem solving', label: 'Problem Solving' },
        { value: 'other', label: 'Other' },
    ];

    // urgency (dropdown)
    const urgencyOptions = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
    ];

    // handleSubmit
    const handleSubmit = (event) => {
        event.preventDefault();

        // valid check
        if (!eventName || !eventDescription || !location || !requiredSkills.length || !urgency || !eventDate) {
            alert('Please fill out all required fields.');
            return;
        }

        const eventData = {
            eventName,
            eventDescription,
            location,
            requiredSkills,
            urgency,
            eventDate,
        };

        console.log('Event Data:', formData);
        alert('Event submitted successfully!');
    };
    
    return (
        <form className="" onSubmit={handleSubmit}>
            <div className="form-field">
                <label>
                    Event Name (required):
                    <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    maxLength={100}
                    required
                    style={{ width: '100%', padding: '6px', fontSize: '16px' }}
                    />
                </label>
            </div>  
            <div >
                <label>
                    Event Description (required):
                    <textarea
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', fontSize: '16px', minHeight: '100px' }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Location (required):
                    <textarea
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', fontSize: '16px'}}
                    />
                </label>
            </div>
            <div>
                <label>
                    Required Skills (required):
                    <Select
                    isMulti
                    options={skillsOptions}
                    value={requiredSkills}
                    onChange={(selected) => setRequiredSkills(selected)}
                    required
                    />
                </label>
            </div>
            <div>
                <label>
                    Urgency (required):
                    <Select
                    options={urgencyOptions}
                    value={urgencyOptions.find((option) => option.value === urgency)}
                    onChange={(selected) => setUrgency(selected.value)}
                    required
                    />
                </label>
            </div>
            <div>
                <label>
                    Event Date (required):
                    <DatePicker
                    selected={eventDate}
                    onChange={(date) => setEventDate(date)}
                    dateFormat="yyyy-MM-dd"
                    required
                    />
                </label>
            </div>
            <button>
                Submit
            </button>
        </form>
    );
};

export default EventManagementForm;