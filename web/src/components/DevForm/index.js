import React, { useState, useEffect } from 'react';


function DevForm({ onSubmit }) {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLongitude(longitude);
                setLatitude(latitude);
            }, (err) => {
                console.log(err);
            }, {
            timeout: 30000,
        }
        );
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        await onSubmit({ github_username, latitude, longitude, techs });
        setGithubUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="username_github">Github Username</label>
                <input name="github_username" id="username_github" required
                    value={github_username} onChange={e => setGithubUsername(e.target.value)}
                />
            </div>
            <div className="input-block">
                <label htmlFor="techs">Skills</label>
                <input name="techs" id="techs" required
                    value={techs} onChange={e => setTechs(e.target.value)}
                />
            </div>
            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input name="latitude"
                        id="latitude" required value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                    />
                </div>
                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input name="longitude"
                        id="longitude" required value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                    />
                </div>
            </div>
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default DevForm;