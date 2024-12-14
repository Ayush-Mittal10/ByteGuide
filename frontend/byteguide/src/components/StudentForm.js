import React, { useState } from 'react';

function StudentForm({ onsubmit }){
    const [formData, setFormData] = useState({
        semester: '',
        languages: '',
        frameworks: '',
        competitiveProgramming: '',
        projects: ''
    });

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onsubmit(formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="semester">Semester:</label>
                <input type="text" id="semester" name="semester" value={formData.semester} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="languages">Languages Known:</label>
                <input type="text" id="languages" name="languages" value={formData.languages} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="frameworks">Frameworks Learned:</label>
                <input type="text" id="frameworks" name="frameworks" value={formData.frameworks} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="competitiveProgramming">Competitive Programming:</label>
                <input type="text" id="competitiveProgramming" name="competitiveProgramming" value={formData.competitiveProgramming} onChange={handleChange} required />
                </div>
            <div>
                <label htmlFor="projects">Projects:</label>
                <input type="text" id="projects" name="projects" value={formData.projects} onChange={handleChange} required />
            </div>
            <button type="submit">Submit</button>
            
        </form>
    )
}