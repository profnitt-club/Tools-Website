import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Card.css";

const Card = ({
  id,
  type,
  title,
  createdTime,
  description,
  tags,
  trades,
  drawdown,
  minCapital,
  winRate,
  returns,
  monthlyFee,
  contributors,
  params,
  video,
  gitlink,
}) => {
  const navigate = useNavigate();

  // Determine if this card is a Strategy or a Tool
  const normalizedTitle = (title || "").toLowerCase();
  const isStrategy =
    type === "strategy" ||
    normalizedTitle.includes("xauusd") ||
    normalizedTitle.includes("ipo breakout strategy");

  const handleClick = () => {
    if (id) {
      navigate(`/projects/${id}`);
    } else {
      // Fallback for hardcoded data without DB id
      navigate(`/card-details`, {
        state: {
          id,
          type: isStrategy ? "strategy" : "tool",
          title,
          createdTime,
          description,
          tags,
          trades,
          drawdown,
          minCapital,
          winRate,
          returns,
          contributors,
          params,
          video,
          gitlink,
        },
      });
    }
  };

  return (
    <div
      className={`card ${isStrategy ? "card-strategy" : "card-tool"}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {/* Card Top Row: Date, Badge, and Explore Button */}
      <div className="card-top-bar">
        <div className="card-meta-left">
          <span className="created-time">created: {createdTime || "Recent"}</span>
          <span className={`project-badge ${isStrategy ? "badge-strategy" : "badge-tool"}`}>
            {isStrategy ? "Strategy" : "Tool"}
          </span>
        </div>

        <div className="card-actions">
          <button
            className="get-link"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Explore <span>→</span>
          </button>
        </div>
      </div>

      {/* Card Header */}
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        <p className="card-by">
          by: <span>ProfNITT</span>
        </p>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="card-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Conditional Architecture: Metrics ONLY for Strategies */}
      {isStrategy ? (
        <div className="card-details">
          <div className="metric-box">
            <p className="details-title">Winrate</p>
            <p className="value">{winRate || "N/A"}</p>
          </div>
          <div className="metric-box">
            <p className="details-title">Drawdown</p>
            <p className="value">{drawdown || "N/A"}</p>
          </div>
          <div className="metric-box">
            <p className="details-title">Min Capital</p>
            <p className="value">{minCapital || "N/A"}</p>
          </div>
          <div className="metric-box">
            <p className="details-title">Returns</p>
            <p className="value">{returns ? `${returns}` : "N/A"}</p>
          </div>
        </div>
      ) : (
        /* Tools Section: NO win rate, drawdown, min capital, returns! Clean tool info bar */
        <div className="card-tool-details">
          {contributors && contributors.length > 0 ? (
            <div className="tool-info-item">
              <span className="tool-info-label">Contributors:</span>
              <span className="tool-info-value">{contributors.join(", ")}</span>
            </div>
          ) : (
            <div className="tool-info-item">
              <span className="tool-info-label">Category:</span>
              <span className="tool-info-value">Quantitative Analytics & Trading Tool</span>
            </div>
          )}
          {gitlink && (
            <div className="tool-repo-pill">
              <span className="repo-dot">●</span> Source Available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;

