import React, { useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import './AppointmentForm.css';
import { DAYS_ARRAY, getDayName } from '../constants/days';
import { FREQUENCIES_ARRAY, getFrequencyName } from '../constants/frequencies';
import { TIMES_ARRAY, getTimeName } from '../constants/times';
import logoImage from '../assets/logo.jpg';
import creamyLogoImage from '../assets/creamy-logo.jpg';
import catImage from '../assets/cat.jpg';
import birdImage from '../assets/bird.jpg';
import dogImage from '../assets/dog.jpg';
import rabbitImage from '../assets/rabbit.jpg';
import puppyImage from '../assets/puppy.jpg';

const API_URL = process.env.REACT_APP_API_URL;

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        frequency: "",
        start_date: "",
        days: [],
        times: [],
        notes: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const heroRef = useRef(null);
    const servicesRef = useRef(null);
    const appointmentRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const validateForm = () => {
        const newErrors = {};
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selectedDate = new Date(formData.start_date);
        selectedDate.setHours(0, 0, 0, 0);

        if (!formData.frequency) {
            newErrors.frequency = 'Frequency is required';
        }

        if (!formData.start_date) {
            newErrors.start_date = 'Start date is required';
        } else if (selectedDate < today) {
            newErrors.start_date = 'Start date cannot be in the past';
        }

        if (formData.days.length === 0) {
            newErrors.days = 'Please select at least one day';
        }

        if (formData.times.length === 0) {
            newErrors.times = 'Please select at least one time';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDayTimeSelection = (input, type) => {
        setFormData((prevData) => ({
            ...prevData,
            [type]: prevData[type].includes(input)
                ? prevData[type].filter((d) => d !== input)
                : [...prevData[type], input]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSubmitStatus(null);

        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/appointments`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            setSubmitStatus('success');
            toast.success('Appointment scheduled successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setFormData({
                frequency: "",
                start_date: "",
                days: [],
                times: [],
                notes: ""
            });
        } catch (error) {
            console.error('Error:', error);
            setSubmitStatus('error');
            toast.error('Failed to schedule appointment. Please try again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="appointment-page">
            <ToastContainer />
            <section className="hero" ref={heroRef}>
                <div className="hero-logo">
                    <div className="logo">
                        <img src={logoImage} alt="PAWTASTIC" /> PAWTASTIC
                    </div>
                </div>
                <div className="hero-content">
                    <nav className="hero-nav">
                        <button onClick={() => scrollToSection(servicesRef)}>About Us</button>
                        <button onClick={() => scrollToSection(appointmentRef)}>Schedule a visit</button>
                    </nav>
                    <h1>We care for your furry little loved ones while</h1>
                    <button 
                        className="cta-button"
                        onClick={() => scrollToSection(appointmentRef)}
                    >
                        Schedule a visit
                    </button>
                </div>
            </section>

            <section className="services" ref={servicesRef}>
                <div className="services-content">
                    <div className="services-text">
                        <h2>Expert care for your furry, feathery, or scaley friend</h2>
                        <p>
                            We know how stressful it is to leave your pets at home alone. 
                            We're a team of experienced animal caregivers, well-connected 
                            to local veterinarians. Trust to us to love them like our own 
                            and to keep them safe and happy till you're home.
                        </p>
                        <button 
                            className="secondary-button" 
                            onClick={() => scrollToSection(appointmentRef)}
                        >
                            Schedule a visit
                        </button>
                    </div>
                    <div className="pet-grid">
                        <div className="pet-image"><img src={catImage} alt="Cat" /></div>
                        <div className="pet-image"><img src={birdImage} alt="Bird" /></div>
                        <div className="pet-image"><img src={dogImage} alt="Dog" /></div>
                        <div className="pet-image"><img src={rabbitImage} alt="Rabbit" /></div>
                    </div>
                </div>
            </section>

            <section className="appointment-section">
                <div className="appointment-container" ref={appointmentRef}>
                    <div className="services-info">
                        <div className="logo secondary-logo" onClick={() => scrollToSection(heroRef)}>
                            <img src={creamyLogoImage} alt="PAWTASTIC" className="secondary-logo" /> PAWTASTIC
                        </div>
                        <div className="services-info-text">
                            <h3>All services include:</h3>
                            <ul>
                                <li>A photo update for you along</li>
                                <li>Notifications of sitter arrival</li>
                                <li>Treats for your pets with your</li>
                            </ul>
                        </div>
                        {/*todo fix this <img src={puppyImage} alt="Cute puppy" className="bottom-image" /> */}
                    </div>

                    <div className="form-container">
                        <div className="form-content">
                            <h2>We'll take your dog for a walk. Just tell us when!</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Frequency </label>
                                        <div className="visit-type-toggle">
                                            {FREQUENCIES_ARRAY.map((frequencyNum) => (
                                                <button
                                                    type="button"
                                                    key={frequencyNum}
                                                    className={`visit-type-button ${formData.frequency === frequencyNum ? 'active' : ''}`}
                                                    onClick={() => handleChange({ target: { name: 'frequency', value: frequencyNum } })}
                                                >
                                                    {getFrequencyName(frequencyNum)}
                                                </button>
                                            ))}
                                        </div>
                                        {errors.frequency && <span className="error-message">{errors.frequency}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label>Start date </label>
                                        <div className="date-input-wrapper">
                                            <input
                                                type="date"
                                                name="start_date"
                                                min={today}
                                                onChange={handleChange}
                                                value={formData.start_date}
                                                className={`form-control form-border-box ${errors.start_date ? 'error' : ''}`}
                                                onClick={(e) => e.target.showPicker()}
                                            />
                                        </div>
                                        {errors.start_date && <span className="error-message">{errors.start_date}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Days <span className="select-all-text">Select all that apply</span></label>
                                    <div className="days-selector">
                                        {DAYS_ARRAY.map((dayNum) => (
                                            <button
                                                type="button"
                                                key={dayNum}
                                                onClick={() => handleDayTimeSelection(dayNum, 'days')}
                                                className={`day-button ${formData.days.includes(dayNum) ? 'selected' : ''}`}
                                            >
                                                {getDayName(dayNum)}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.days && <span className="error-message">{errors.days}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Times <span className="select-all-text">Select all that apply</span></label>
                                    <div className="times-selector">
                                        {TIMES_ARRAY.map((timeNum) => (
                                            <button
                                                type="button"
                                                key={timeNum}
                                                onClick={() => handleDayTimeSelection(timeNum, 'times')}
                                                className={`time-button ${formData.times.includes(timeNum) ? 'selected' : ''}`}
                                            >
                                                {getTimeName(timeNum)}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.times && <span className="error-message">{errors.times}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Notes for your pet</label>
                                    <textarea
                                        name="notes"
                                        onChange={handleChange}
                                        value={formData.notes}
                                        className="form-control form-border-box"
                                        placeholder="Route preferences, leash location, treats given, etc."
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    className={`submit-button ${isLoading ? 'loading' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? '' : 'Schedule Service'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AppointmentForm;
