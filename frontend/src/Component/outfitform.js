import React, { useState } from 'react';
import './OutfitForm.css';

const OutfitForm = () => {
  const [formData, setFormData] = useState({
    Temperature: '',
    Humidity: '',
    WindSpeed: '',
    Weather: 'Sunny',
    TimeOfDay: 'Morning',
    LocationType: 'Urban',
    Gender: 'Male',
    AgeGroup: 'Adult'
  });

  const [prediction, setPrediction] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const imageMap = { 
     Male: {
    Child: {
      "T-shirt": "/images/male_child_tshirt.jpg",
      "Raincoat": "/images/male_child_raincoat.jpg",
      "Jacket": "/images/male_child_jacket.jpg",
      "Sweater": "/images/male_child_sweater.jpg",
      "Shorts": "/images/male_child_shorts.jpg",
      "Vest": "/images/male_child_vest.jpg",
      "Cap": "/images/male_child_cap.jpg",
      "Scarf": "/images/male_child_scarf.jpg",
      "Sneakers": "/images/male_child_sneakers.jpg",
      "Hoodie": "/images/male_child_hoodie.jpg",
      "Shirt with Jeans": "/images/male_child_shirt_jeans.jpg",
      "Track Pants": "/images/male_child_trackpants.jpg",
      "Kurta": "/images/male_child_kurta.jpg",
      "Coat": "/images/male_child_coat.jpg"
    },
    Teen: {
      "T-shirt": "/images/male_teen_tshirt.jpg",
      "Sweater": "/images/male_teen_sweater.jpg",
      "Hoodie": "/images/male_teen_hoodie.jpg",
      "Raincoat": "/images/male_teen_raincoat.jpg",
      "Shirt with Jeans": "/images/male_teen_shirt_jeans.jpg",
      "Winter Coat": "/images/male_teen_wintercoat.jpg",
      "Windbreaker": "/images/male_teen_windbreaker.jpg",
      "Windcheater": "/images/male_teen_windcheater.jpg",
      "Sweatshirt": "/images/male_teen_sweatshirt.jpg",
      "Track Pants": "/images/male_teen_trackpants.jpg",
      "Jeans": "/images/male_teen_jeans.jpg",
      "Kurta": "/images/male_teen_kurta.jpg",
      "Cap": "/images/male_teen_cap.jpg",
      "Vest": "/images/male_teen_vest.jpg",
      "Scarf": "/images/male_teen_scarf.jpg",
      "Sneakers": "/images/male_teen_sneakers.jpg"
    },
    Adult: {
      "T-shirt": "/images/male_adult_tshirt.jpg",
      "Raincoat": "/images/male_adult_raincoat.jpg",
      "Jacket": "/images/male_adult_jacket.jpg",
      "Sweater": "/images/male_adult_sweater.jpg",
      "Winter Coat": "/images/male_adult_wintercoat.jpg",
      "Kurta": "/images/male_adult_kurta.jpg",
      "Shirt with Jeans": "/images/male_adult_shirt_jeans.jpg",
      "Top with Jeans": "/images/male_adult_top_jeans.jpg",
      "Vest": "/images/male_adult_vest.jpg",
      "Cap": "/images/male_adult_cap.jpg",
      "Windbreaker": "/images/male_adult_windbreaker.jpg",
      "Windcheater": "/images/male_adult_windcheater.jpg",
      "Sneakers": "/images/male_adult_sneakers.jpg",
      "Scarf": "/images/male_adult_scarf.jpg",
      "Track Pants": "/images/male_adult_trackpants.jpg",
      "Trousers": "/images/male_adult_trousers.jpg",
      "Boots": "/images/male_adult_boots.jpg",
      "Comfort Fit Pants": "/images/male_adult_comfortpants.jpg",
      "Coat": "/images/male_adult_coat.jpg"
    },
    Senior: {
      "Sweater": "/images/male_senior_sweater.jpg",
      "Coat": "/images/male_senior_coat.jpg",
      "Cardigan": "/images/male_senior_cardigan.jpg",
      "Shawl": "/images/male_senior_shawl.jpg",
      "Kurta": "/images/male_senior_kurta.jpg",
      "Shorts": "/images/male_senior_shorts.jpg",
      "Vest": "/images/male_senior_vest.jpg",
      "Comfort Fit Pants": "/images/male_senior_comfortpants.jpg",
      "T-shirt": "/images/male_senior_tshirt.jpg",
      "Shirt with Jeans": "/images/male_senior_shirt_jeans.jpg",
      "Jacket": "/images/male_senior_jacket.jpg",
      "Jeans": "/images/male_senior_jeans.jpg",
      "Windcheater": "/images/male_senior_windcheater.jpg"
    }
  },
  Female: {
    Child: {
      "T-shirt": "/images/female_child_tshirt.jpg",
      "Raincoat": "/images/female_child_raincoat.jpg",
      "Jacket": "/images/female_child_jacket.jpg",
      "Shorts": "/images/female_child_shorts.jpg",
      "Cap": "/images/female_child_cap.jpg",
      "Leggings": "/images/female_child_leggings.jpg",
      "Salwar Suit": "/images/female_child_salwarsuit.jpg",
      "Top with Jeans": "/images/female_child_top_jeans.jpg",
      "Summer Dress": "/images/female_child_summerdress.jpg",
      "Kurti with Leggings": "/images/female_child_kurti_leggings.jpg",
      "Woolen Kurti": "/images/female_child_woolen_kurti.jpg",
      "Sweater": "/images/female_child_sweater.jpg",
      "Coat": "/images/female_child_coat.jpg",
      "Shirt with Jeans": "/images/female_child_shirt_jeans.jpg",
      "Kurta": "/images/female_child_kurta.jpg",
      "Skirt": "/images/female_child_skirt.jpg",
      "Boots": "/images/female_child_boots.jpg",
      "Windbreaker": "/images/female_child_windbreaker.jpg",
      "Sneakers": "/images/female_child_sneakers.jpg",
      "Winter Coat": "/images/female_child_wintercoat.jpg",
      "Sundress": "/images/female_child_sundress.jpg"
    },
    Teen: {
      "T-shirt": "/images/female_teen_tshirt.jpg",
      "Sweater": "/images/female_teen_sweater.jpg",
      "Raincoat": "/images/female_teen_raincoat.jpg",
      "Hoodie": "/images/female_teen_hoodie.jpg",
      "Kurti with Leggings": "/images/female_teen_kurti_leggings.jpg",
      "Sleeveless Top": "/images/female_teen_sleeveless.jpg",
      "Full-sleeve Shirt": "/images/female_teen_fullsleeve.jpg",
      "Scarf": "/images/female_teen_scarf.jpg",
      "Sneakers": "/images/female_teen_sneakers.jpg",
      "Shawl": "/images/female_teen_shawl.jpg",
      "Track Pants": "/images/female_teen_trackpants.jpg",
      "Summer Dress": "/images/female_teen_summerdress.jpg",
      "Comfort Fit Pants": "/images/female_teen_comfortpants.jpg",
      "Top with Jeans": "/images/female_teen_top_jeans.jpg",
      "Salwar Suit": "/images/female_teen_salwarsuit.jpg",
      "Cardigan": "/images/female_teen_cardigan.jpg",
      "Coat": "/images/female_teen_coat.jpg",
      "Jeans": "/images/female_teen_jeans.jpg",
      "Windcheater": "/images/female_teen_windcheater.jpg",
      "Woolen Kurti": "/images/female_teen_woolen_kurti.jpg",
      "Boots": "/images/female_teen_boots.jpg",
      "Kurta": "/images/female_teen_kurta.jpg",
      "Long Skirt": "/images/female_teen_longskirt.jpg",
      "Wintercoat": "/images/female_teen_wintercoat.jpg",
    },
    Adult: {
      "T-shirt": "/images/female_adult_tshirt.jpg",
      "Raincoat": "/images/female_adult_raincoat.jpg",
      "Woolen Kurti": "/images/female_adult_woolen_kurti.jpg",
      "Kurti with Leggings": "/images/female_adult_kurti_leggings.jpg",
      "Top with Jeans": "/images/female_adult_top_jeans.jpg",
      "Salwar Suit": "/images/female_adult_salwarsuit.jpg",
      "Shirt with Jeans": "/images/female_adult_shirt_jeans.jpg",
      "Vest": "/images/female_adult_vest.jpg",
      "Cap": "/images/female_adult_cap.jpg",
      "Coat": "/images/female_adult_coat.jpg",
      "Scarf": "/images/female_adult_scarf.jpg",
      "Sneakers": "/images/female_adult_sneakers.jpg",
      "Windbreaker": "/images/female_adult_windbreaker.jpg",
      "Windcheater": "/images/female_adult_windcheater.jpg",
      "Cardigan": "/images/female_adult_cardigan.jpg",
      "Stole": "/images/female_adult_stole.jpg"
    },
    Senior: {
      "Raincoat": "/images/female_senior_raincoat.jpg",
      "Sweater": "/images/female_senior_sweater.jpg",
      "Coat": "/images/female_senior_coat.jpg",
      "Cardigan": "/images/female_senior_cardigan.jpg",
      "Kurti": "/images/female_senior_kurti.jpg",
      "Shawl": "/images/female_senior_shawl.jpg",
      "Scarf": "/images/female_senior_scarf.jpg",
      "Top with Jeans": "/images/female_senior_top_jeans.jpg",
      "Summer Dress": "/images/female_senior_summerdress.jpg",
      "Sleeveless Top": "/images/female_senior_sleeveless.jpg",
      "Long Skirt": "/images/female_senior_longskirt.jpg",
      "Salwar Suit": "/images/female_senior_salwarsuit.jpg",
      "Woolen Kurti": "/images/female_senior_woolen_kurti.jpg",
      "Cap": "/images/female_senior_cap.jpg",
      "Winter Coat": "/images/female_senior_wintercoat.jpg"
    }

  }
   };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setPrediction('');
    setImageUrl('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unknown error occurred');
      }

      const gender = formData.Gender;
      const ageGroup = formData.AgeGroup;
      const outfit = result.outfit;

      setPrediction(outfit);

      const localImage = imageMap[gender] && imageMap[gender][ageGroup] && imageMap[gender][ageGroup][outfit];

      setImageUrl(localImage || '');
    } catch (err) {
      console.error('Prediction error:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="outfit-container">
      <h2 className="title">🧥 Weather-Based Outfit Recommendation</h2>
      <form onSubmit={handleSubmit} className="outfit-form">
        <label htmlFor="Temperature">Temperature (°C):</label>
        <input id="Temperature" type="number" name="Temperature" placeholder="🌡️ Temperature" value={formData.Temperature} onChange={handleChange} required />

        <label htmlFor="Humidity">Humidity (%):</label>
        <input id="Humidity" type="number" name="Humidity" placeholder="💧 Humidity" value={formData.Humidity} onChange={handleChange} required />

        <label htmlFor="WindSpeed">Wind Speed (km/h):</label>
        <input id="WindSpeed" type="number" name="WindSpeed" placeholder="🍃 Wind Speed" value={formData.WindSpeed} onChange={handleChange} required />

        <label htmlFor="Weather">Weather:</label>
        <select id="Weather" name="Weather" value={formData.Weather} onChange={handleChange}>
          <option>Sunny</option>
          <option>Windy</option>
          <option>Rainy</option>
          <option>Cloudy</option>
        </select>

        <label htmlFor="TimeOfDay">Time Of Day:</label>
        <select id="TimeOfDay" name="TimeOfDay" value={formData.TimeOfDay} onChange={handleChange}>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Evening</option>
          <option>Night</option>
        </select>

        <label htmlFor="LocationType">Location Type:</label>
        <select id="LocationType" name="LocationType" value={formData.LocationType} onChange={handleChange}>
          <option>Urban</option>
          <option>Coastal</option>
          <option>Rural</option>
        </select>

        <label htmlFor="Gender">Gender:</label>
        <select id="Gender" name="Gender" value={formData.Gender} onChange={handleChange}>
          <option>Male</option>
          <option>Female</option>
        </select>

        <label htmlFor="AgeGroup">Age Group:</label>
        <select id="AgeGroup" name="AgeGroup" value={formData.AgeGroup} onChange={handleChange}>
          <option>Child</option>
          <option>Teen</option>
          <option>Adult</option>
          <option>Senior</option>
        </select>

        <button type="submit" className="submit-btn">🔍 Get Outfit</button>
      </form>

      {prediction && (
        <div className="prediction-box">
          <h3>🎯 Recommended Outfit:</h3>
          <p>{prediction}</p>
          {imageUrl && (
            <img src={imageUrl} alt={prediction} className="outfit-image" />
          )}
        </div>
      )}

      {error && (
        <div className="error-box">
          ⚠️ <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default OutfitForm;
