import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import "../styles/StrategyCard.css";

const StrategyCard = ({
  id,
  title,
  createdTime,
  description,
  tags,
  winRate,
  drawdown,
  minCapital,
  returns,
  gitlink,
  liveLink,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (id) {
      navigate(`/projects/${id}`);
    } else {
      // Fallback for state-based navigation
      navigate(`/card-details`, {
        state: {
          id,
          type: "strategy",
          title,
          createdTime,
          description,
          tags,
          winRate,
          drawdown,
          minCapital,
          returns,
          gitlink,
          liveLink,
        },
      });
    }
  };

  const isExternalLive = liveLink && (liveLink.startsWith("http://") || liveLink.startsWith("https://"));
  const detailUrl = id ? `#/projects/${id}` : null;

  return (
    <div
      className="strategy-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {/* Top Bar: Created Date, Badge, Actions */}
      <div className="strategy-card-top-bar">
        <div className="strategy-card-meta-left">
          {createdTime && <span className="strategy-created-time">created: {createdTime}</span>}
          <span className="strategy-badge">Strategy</span>
        </div>

        <div className="strategy-card-actions">
          {gitlink && (
            <a
              href={gitlink}
              target="_blank"
              rel="noopener noreferrer"
              className="strategy-github-link"
              title="View on GitHub"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub />
            </a>
          )}
          {isExternalLive ? (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="strategy-live-link"
              onClick={(e) => e.stopPropagation()}
            >
              Live <span>↗</span>
            </a>
          ) : detailUrl ? (
            <a
              href={detailUrl}
              className="strategy-live-link"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleClick();
              }}
            >
              Live <span>↗</span>
            </a>
          ) : null}
        </div>
      </div>

      {/* Strategy Title & Author */}
      <div className="strategy-card-header">
        <h2 className="strategy-card-title">{title}</h2>
        <p className="strategy-card-by">
          by: <span>ProfNITT</span>
        </p>
      </div>

      {/* Description */}
      {description && <p className="strategy-card-description">{description}</p>}

      {/* Strategy Tags */}
      {tags && tags.length > 0 && (
        <div className="strategy-card-tags">
          {tags.map((tag, index) => (
            <span key={index} className="strategy-tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Quantitative Trading Performance Metrics ONLY */}
      {(winRate || drawdown || minCapital || returns) ? (
        <div className="strategy-metrics-grid">
          <div className="strategy-metric-box">
            <p className="metric-label">Winrate</p>
            <p className="metric-value">{winRate || "N/A"}</p>
          </div>
          <div className="strategy-metric-box">
            <p className="metric-label">Drawdown</p>
            <p className="metric-value">{drawdown || "N/A"}</p>
          </div>
          <div className="strategy-metric-box">
            <p className="metric-label">Min Capital</p>
            <p className="metric-value">{minCapital || "N/A"}</p>
          </div>
          <div className="strategy-metric-box">
            <p className="metric-label">Returns</p>
            <p className="metric-value">{returns || "N/A"}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default StrategyCard;
