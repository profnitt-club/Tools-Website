import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Card.css";

const Card = ({ title, createdTime, description, tags, trades, drawdown, minCapital, winRate, returns, monthlyFee, contributors, params, video, gitlink }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/card-details`, {
      state: { title, createdTime, description, tags, trades, drawdown, minCapital, winRate, contributors, params, video, gitlink }
    });
  };
  return (
    <div className="card">
      <div className="card-header">
        <div className="created-time">created: {createdTime}
          <div className="card-actions">
            <button className="get-link" onClick={handleClick}>Explore</button>
          </div>
        </div>
        
        <h2 className="card-title">{title}</h2>
      </div>
      <p className="card-description">{description} </p>
      <p className="card-by">by: <a href="">ProfNITT</a></p>
      <div className="card-tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">{tag}</span>
        ))}
      </div>
      <div className="card-details">
        <div>
          <p className="details-title">Winrate</p>
          <p className="value">{winRate}</p>
        </div>
        <div>
          <p className="details-title">Drawdown</p>
          <p className="value">{drawdown}</p>
        </div>
        <div>
          <p className="details-title">Min Capital</p>
          <p className="value">{minCapital}</p>
        </div>

        <div>
          <p className="details-title">Returns</p>
          <p className="value">{returns}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
