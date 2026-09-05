import React from "react";
import StrategyCard from "./StrategyCard";
import ToolCard from "./ToolCard";

const Card = (props) => {
  const { type, title } = props;
  const normalizedTitle = (title || "").toLowerCase();
  const isStrategy =
    type === "strategy" ||
    normalizedTitle.includes("xauusd") ||
    normalizedTitle.includes("ipo breakout strategy");

  if (isStrategy) {
    return <StrategyCard {...props} />;
  }

  return <ToolCard {...props} />;
};

export default Card;

